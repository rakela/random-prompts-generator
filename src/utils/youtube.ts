/**
 * YouTube Transcript Fetcher - Production-Grade Serverless Approach
 *
 * Uses youtube-caption-extractor optimized for Vercel/serverless environments.
 * This package automatically adapts for serverless platforms and uses YouTube's
 * modern Innertube API for better bot detection resistance.
 */

import { getSubtitles } from 'youtube-caption-extractor';

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
 * Automatically adapts for serverless environments (Vercel, AWS Lambda, Netlify).
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

  console.log(`[YouTube] ========================================`);
  console.log(`[YouTube] Fetching transcript for video ID: ${videoId}`);
  console.log(`[YouTube] Video URL: https://www.youtube.com/watch?v=${videoId}`);
  console.log(`[YouTube] Language: ${languageCode}`);
  console.log(`[YouTube] Using: youtube-caption-extractor (serverless-optimized)`);
  console.log(`[YouTube] ========================================`);

  // Try multiple language code variants for better compatibility
  const languageVariants = [
    languageCode,           // Try the provided language code first
    'en',                   // Standard English
    'en-US',                // US English
    'en-GB',                // UK English
    'a.en',                 // Auto-generated English (common format)
    'en-us',                // lowercase variant
    'en-gb',                // lowercase variant
  ];

  // Remove duplicates
  const uniqueLanguages = [...new Set(languageVariants)];

  let lastError: Error | null = null;

  // Try each language variant
  for (const lang of uniqueLanguages) {
    try {
      console.log(`[YouTube] Trying language code: ${lang}`);

      const subtitles = await getSubtitles({
        videoID: videoId,
        lang: lang
      });

      if (!subtitles || subtitles.length === 0) {
        console.log(`[YouTube] No captions found for language: ${lang}`);
        continue;
      }

      console.log(`[YouTube] ✓ Received ${subtitles.length} caption segments for language: ${lang}`);

      // Combine all subtitle segments into full transcript
      const fullTranscript = subtitles
        .map((segment: any) => segment.text || '')
        .filter((text: string) => text.trim().length > 0)
        .join(' ')
        .trim();

      if (!fullTranscript || fullTranscript.length < 50) {
        console.log(`[YouTube] Transcript too short for language: ${lang}`);
        continue;
      }

      console.log(`[YouTube] ✓ SUCCESS: ${fullTranscript.length} characters (language: ${lang})`);
      console.log(`[YouTube] ========================================`);

      return fullTranscript;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[YouTube] Failed with language ${lang}:`, error);
      console.error(`[YouTube] Error type: ${typeof error}`);
      console.error(`[YouTube] Error message: ${errorMessage}`);
      if (error instanceof Error && error.stack) {
        console.error(`[YouTube] Error stack:`, error.stack);
      }
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  // If we get here, all language variants failed
  const errorMessage = lastError ? (lastError instanceof Error ? lastError.message : String(lastError)) : 'Unknown error';
  console.error('[YouTube] ✗ ERROR: All language variants failed');
  console.error('[YouTube] Last error:', errorMessage);
  console.error('[YouTube] ========================================');

  // Provide helpful error messages based on error type
  if (errorMessage.includes('Could not find captions') ||
      errorMessage.includes('No captions available') ||
      errorMessage.includes('Transcript is disabled')) {
    throw new Error(
      `Could not find captions for this video in any supported language. ` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `Tried language codes: ${uniqueLanguages.join(', ')}\n\n` +
      `Suggestions:\n` +
      `1. Check if the video has captions/subtitles enabled on YouTube\n` +
      `2. Captions must be either manually added or auto-generated by YouTube\n` +
      `3. Try a different video with confirmed captions\n\n` +
      `Note: The video creator must enable captions for this to work.`
    );
  }

  if (errorMessage.includes('Video unavailable') ||
      errorMessage.includes('private') ||
      errorMessage.includes('not available')) {
    throw new Error(
      `This video is unavailable, private, or restricted. ` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `The video must be public and accessible.`
    );
  }

  if (errorMessage.includes('Sign in to confirm') ||
      errorMessage.includes('bot')) {
    throw new Error(
      `YouTube is temporarily blocking automated access. ` +
      `This is usually temporary. Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `Suggestions:\n` +
      `1. Wait 2-3 minutes and try again\n` +
      `2. Try a different video from a major channel\n` +
      `3. Contact support if this persists\n\n` +
      `Note: This is a YouTube rate-limiting measure, not an issue with the tool.`
    );
  }

  // Generic error with original message
  throw new Error(
    `Failed to fetch transcript: ${errorMessage}\n` +
    `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
    `Tried ${uniqueLanguages.length} language variants without success.\n` +
    `If this error persists, the video may not have accessible captions.`
  );
}

/**
 * Fetch transcript with timing segments
 *
 * Returns an array of segments with timing information, useful for
 * displaying transcripts with timestamps or creating synchronized content.
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

  console.log(`[YouTube] Fetching transcript segments for: ${videoId}`);

  try {
    const subtitles = await getSubtitles({
      videoID: videoId,
      lang: languageCode
    });

    if (!subtitles || subtitles.length === 0) {
      throw new Error('No captions available');
    }

    const segments = subtitles.map((segment: any) => ({
      text: segment.text || '',
      start: parseFloat(segment.start) || 0,
      duration: parseFloat(segment.dur) || 0
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
