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

  // Try multiple language variants for better compatibility
  const languageVariants = [
    languageCode,
    'en',
    'en-US',
    'en-GB',
    'a.en',  // auto-generated English
  ];

  const uniqueLanguages = [...new Set(languageVariants)];
  let lastError: any = null;

  for (const lang of uniqueLanguages) {
    try {
      console.log(`[YouTube] Trying language: ${lang}`);

      const subtitles = await getSubtitles({
        videoID: videoId,
        lang: lang
      });

      console.log(`[YouTube] DEBUG - Subtitles response:`, {
        type: typeof subtitles,
        isArray: Array.isArray(subtitles),
        length: subtitles?.length,
        isNull: subtitles === null,
        isUndefined: subtitles === undefined
      });

      if (!subtitles || subtitles.length === 0) {
        console.log(`[YouTube] No captions for language: ${lang}`);
        lastError = new Error(`No captions available for language: ${lang}`);
        continue;
      }

      console.log(`[YouTube] ✓ Received ${subtitles.length} caption segments for ${lang}`);

      const fullTranscript = subtitles
        .map((segment: any) => segment.text || '')
        .filter((text: string) => text.trim().length > 0)
        .join(' ')
        .trim();

      if (!fullTranscript || fullTranscript.length < 50) {
        console.log(`[YouTube] Transcript too short for ${lang}: ${fullTranscript.length} chars`);
        lastError = new Error(`Transcript too short for language: ${lang}`);
        continue;
      }

      console.log(`[YouTube] ✓ SUCCESS: ${fullTranscript.length} characters (language: ${lang})`);
      console.log(`[YouTube] ========================================`);

      return fullTranscript;

    } catch (error) {
      console.error(`[YouTube] ERROR with language ${lang}:`);
      console.error(`[YouTube] Error type:`, typeof error);
      console.error(`[YouTube] Error instance:`, error instanceof Error);
      console.error(`[YouTube] Error object:`, error);
      console.error(`[YouTube] Error message:`, error instanceof Error ? error.message : String(error));
      if (error instanceof Error) {
        console.error(`[YouTube] Error stack:`, error.stack);
      }
      lastError = error;
      continue;
    }
  }

  // Try one final time without specifying language (auto-detect)
  console.log(`[YouTube] All language codes failed. Trying auto-detect (no lang param)...`);
  try {
    const subtitles = await getSubtitles({
      videoID: videoId
      // No lang parameter - let library auto-detect
    });

    console.log(`[YouTube] DEBUG - Auto-detect response:`, {
      type: typeof subtitles,
      isArray: Array.isArray(subtitles),
      length: subtitles?.length
    });

    if (subtitles && subtitles.length > 0) {
      console.log(`[YouTube] ✓ Auto-detect found ${subtitles.length} caption segments`);

      const fullTranscript = subtitles
        .map((segment: any) => segment.text || '')
        .filter((text: string) => text.trim().length > 0)
        .join(' ')
        .trim();

      if (fullTranscript && fullTranscript.length >= 50) {
        console.log(`[YouTube] ✓ SUCCESS with auto-detect: ${fullTranscript.length} characters`);
        console.log(`[YouTube] ========================================`);
        return fullTranscript;
      }
    }
  } catch (autoError) {
    console.error(`[YouTube] Auto-detect also failed:`, autoError);
    lastError = autoError;
  }

  // All attempts failed
  const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  console.error('[YouTube] ✗ ALL ATTEMPTS FAILED (including auto-detect)');
  console.error('[YouTube] Last error:', errorMessage);
  console.error('[YouTube] ========================================');

  if (errorMessage.includes('Could not find captions') ||
        errorMessage.includes('No captions available') ||
        errorMessage.includes('Transcript is disabled')) {
      throw new Error(
        `This video does not have ${languageCode} captions/subtitles available. ` +
        `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
        `Suggestions:\n` +
        `1. Check if the video has captions enabled on YouTube\n` +
        `2. Try a video from a major channel (TED, Khan Academy, BBC, etc.)\n` +
        `3. Try with language code 'en-US' or 'en-GB' if 'en' doesn't work\n\n` +
        `Note: Auto-generated captions should work, but must be enabled by the creator.`
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

    throw new Error(
      `Failed to fetch transcript: ${errorMessage}\n` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `If this error persists, the video may not have accessible captions.`
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
    const subtitles = await getSubtitles({
      videoID: videoId,
      lang: languageCode
    });

    if (!subtitles || subtitles.length === 0) {
      throw new Error('No captions available');
    }

    const segments = subtitles.map((segment: any) => ({
      text: segment.text || '',
      start: segment.start || 0,
      duration: segment.dur || 0
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
