/**
 * YouTube Transcript Fetcher - Production-Grade Serverless Approach
 *
 * Uses TubeText API - a free, unlimited YouTube transcript API.
 * Hosted on Vercel, works reliably in serverless environments.
 * No quotas, no API keys required.
 *
 * API: https://tubetext.vercel.app
 */

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
  console.log(`[YouTube] Using: TubeText API (Free, Unlimited)`);
  console.log(`[YouTube] ========================================`);

  try {
    // Call TubeText API - free, unlimited, no API key required
    const apiUrl = `https://tubetext.vercel.app/youtube/transcript-with-timestamps?video_id=${videoId}`;
    console.log(`[YouTube] API Request: ${apiUrl}`);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`TubeText API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    console.log(`[YouTube] DEBUG - API Response:`, {
      success: result.success,
      hasData: !!result.data,
      hasFullText: !!result.data?.full_text,
      fullTextLength: result.data?.full_text?.length
    });

    if (!result.success || !result.data) {
      throw new Error('TubeText API returned unsuccessful response');
    }

    const fullTranscript = result.data.full_text;

    if (!fullTranscript || fullTranscript.length < 50) {
      throw new Error('Transcript is too short or empty');
    }

    console.log(`[YouTube] ✓ SUCCESS: ${fullTranscript.length} characters`);
    console.log(`[YouTube] Video: ${result.data.details?.title || 'Unknown'}`);
    console.log(`[YouTube] Channel: ${result.data.details?.channel || 'Unknown'}`);
    console.log(`[YouTube] First 200 chars:`, fullTranscript.substring(0, 200));
    console.log(`[YouTube] ========================================`);

    return fullTranscript;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[YouTube] ✗ ERROR:', errorMessage);
    console.error('[YouTube] Full error:', error);
    console.error('[YouTube] ========================================');

    // Check for specific error types
    if (errorMessage.includes('TubeText API error: 404')) {
      throw new Error(
        `This video does not have captions/subtitles available. ` +
        `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
        `The video must have captions enabled (auto-generated or manual).`
      );
    }

    if (errorMessage.includes('TubeText API error: 429')) {
      throw new Error(
        `Too many requests. Please wait a moment and try again.\n` +
        `Video: https://www.youtube.com/watch?v=${videoId}`
      );
    }

    if (errorMessage.includes('fetch failed') || errorMessage.includes('ECONNREFUSED')) {
      throw new Error(
        `Network error: Could not connect to transcript service.\n` +
        `Please check your internet connection and try again.`
      );
    }

    // Generic error
    throw new Error(
      `Failed to fetch transcript: ${errorMessage}\n` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `This could mean:\n` +
      `1. The video doesn't have captions enabled\n` +
      `2. The video is private or restricted\n` +
      `3. There's a temporary service issue\n\n` +
      `Please try again or use a different video.`
    );
  }
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
    const apiUrl = `https://tubetext.vercel.app/youtube/transcript-with-timestamps?video_id=${videoId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`TubeText API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !result.data || !result.data.transcript) {
      throw new Error('No captions available');
    }

    // TubeText returns transcript array with timestamps
    // Convert to our TranscriptSegment format
    const segments: TranscriptSegment[] = result.data.transcript.map((item: any, index: number) => ({
      text: typeof item === 'string' ? item : (item.text || ''),
      start: item.start || index * 2, // Fallback: estimate 2 seconds per segment
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
