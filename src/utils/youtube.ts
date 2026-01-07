/**
 * YouTube Transcript Fetcher - Supadata API Integration
 *
 * Uses Supadata API for reliable YouTube transcript fetching.
 * Supadata handles YouTube's cloud IP blocking automatically.
 *
 * FREE Tier: 100 transcripts/month, no credit card required
 * Sign up: https://supadata.ai
 */

import { Supadata } from '@supadata/js';

export interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

export interface VideoMetadata {
  title?: string;
  description?: string;
  channelName?: string;
  duration?: string;
}

/**
 * Extract video ID from YouTube URL
 */
export function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // Standard youtube.com watch URL
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }

    // Shortened youtu.be URL
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1);
    }

    return null;
  } catch (error) {
    console.error('[YouTube] Invalid URL:', error);
    return null;
  }
}

/**
 * Main function: Fetch YouTube transcript
 *
 * This is the primary function used throughout the application.
 * Uses Supadata API to reliably fetch transcripts without cloud IP blocking.
 *
 * Environment Variable Required:
 * - SUPADATA_API_KEY: Your Supadata API key (get from https://supadata.ai)
 *
 * @param videoUrl - Full YouTube URL (youtube.com/watch?v=... or youtu.be/...)
 * @param languageCode - Language code for captions (default: 'en')
 * @returns Full transcript as a single string
 */
export async function getYouTubeTranscript(
  videoUrl: string,
  languageCode: string = 'en'
): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  // Check for API key
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) {
    throw new Error(
      'SUPADATA_API_KEY environment variable is not set. Get your free API key at https://supadata.ai'
    );
  }

  console.log(`[YouTube] ========================================`);
  console.log(`[YouTube] Fetching transcript for video ID: ${videoId}`);
  console.log(`[YouTube] Video URL: https://www.youtube.com/watch?v=${videoId}`);
  console.log(`[YouTube] Using: Supadata API`);
  console.log(`[YouTube] ========================================`);

  try {
    // Initialize Supadata client
    const supadata = new Supadata({ apiKey });

    // Fetch transcript
    const result = await supadata.transcript({
      url: videoUrl,
      lang: languageCode,
      text: true, // Return plain text instead of timestamped chunks
      mode: 'auto', // Try native transcript, fallback to AI generation if needed
    });

    // Extract transcript text
    const transcript = result.transcript || result.text || '';

    if (!transcript || transcript.length < 50) {
      throw new Error('Transcript is empty or too short');
    }

    console.log(`[YouTube] ✓ SUCCESS: ${transcript.length} characters`);
    console.log(`[YouTube] ========================================`);

    return transcript;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[YouTube] ✗ ERROR:', errorMessage);
    console.error('[YouTube] ========================================');

    // Provide helpful error message
    throw new Error(
      `Failed to fetch YouTube transcript: ${errorMessage}\n\n` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `This could mean:\n` +
      `1. The video doesn't have captions enabled\n` +
      `2. The video is private or age-restricted\n` +
      `3. Your Supadata API key is invalid or you've exceeded the free tier (100/month)\n\n` +
      `Check your Supadata dashboard at https://supadata.ai/dashboard`
    );
  }
}

/**
 * Fetch transcript with timing segments
 *
 * Returns an array of segments with timing information.
 *
 * @param videoUrl - Full YouTube URL
 * @param languageCode - Language code for captions (default: 'en')
 * @returns Array of transcript segments with timing data
 */
export async function getYouTubeTranscriptSegments(
  videoUrl: string,
  languageCode: string = 'en'
): Promise<TranscriptSegment[]> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) {
    throw new Error('SUPADATA_API_KEY environment variable is not set');
  }

  console.log(`[YouTube] Fetching transcript segments for: ${videoId}`);

  try {
    const supadata = new Supadata({ apiKey });

    // Fetch transcript with timestamps (text: false)
    const result = await supadata.transcript({
      url: videoUrl,
      lang: languageCode,
      text: false, // Return timestamped chunks
      mode: 'auto',
    });

    // Convert Supadata format to our TranscriptSegment format
    const segments: TranscriptSegment[] = (result.segments || result.chunks || []).map((item: any) => ({
      text: item.text || '',
      start: item.start || item.timestamp || 0,
      duration: item.duration || 2
    }));

    console.log(`[YouTube] ✓ Retrieved ${segments.length} segments`);
    return segments;

  } catch (error) {
    console.error('[YouTube] Error fetching segments:', error);
    throw error;
  }
}

/**
 * Format transcript with timestamps
 *
 * Converts segment array into a formatted string with timestamps.
 * Example output: "[0:15] This is the first line\n[0:20] This is the second line"
 *
 * @param segments - Array of transcript segments
 * @returns Formatted transcript string with timestamps
 */
export function formatTranscriptWithTimestamps(segments: TranscriptSegment[]): string {
  return segments
    .map(segment => {
      const minutes = Math.floor(segment.start / 60);
      const seconds = Math.floor(segment.start % 60);
      const timestamp = `[${minutes}:${seconds.toString().padStart(2, '0')}]`;
      return `${timestamp} ${segment.text}`;
    })
    .join('\n');
}

/**
 * Clean and normalize transcript text
 *
 * Removes extra whitespace and normalizes line breaks.
 *
 * @param transcript - Raw transcript text
 * @returns Cleaned transcript text
 */
export function cleanTranscript(transcript: string): string {
  return transcript
    .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
    .replace(/\n+/g, '\n')          // Replace multiple newlines with single newline
    .trim();                         // Remove leading/trailing whitespace
}

/**
 * Check if URL is a valid YouTube URL
 *
 * @param url - URL to validate
 * @returns true if valid YouTube URL, false otherwise
 */
export function isValidYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.includes('youtube.com') ||
      urlObj.hostname.includes('youtu.be')
    );
  } catch {
    return false;
  }
}

/**
 * Get supported language codes
 *
 * Returns a list of commonly supported language codes.
 * Note: Actual availability depends on the specific video.
 *
 * @returns Array of common language codes
 */
export function getSupportedLanguages(): string[] {
  return [
    'en',      // English
    'en-US',   // English (US)
    'en-GB',   // English (UK)
    'es',      // Spanish
    'fr',      // French
    'de',      // German
    'it',      // Italian
    'pt',      // Portuguese
    'ru',      // Russian
    'ja',      // Japanese
    'ko',      // Korean
    'zh',      // Chinese
    'ar',      // Arabic
    'hi',      // Hindi
    'nl',      // Dutch
    'pl',      // Polish
    'sv',      // Swedish
    'tr',      // Turkish
  ];
}
