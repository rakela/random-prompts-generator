/**
 * YouTube Transcript Fetcher
 *
 * This utility fetches transcripts from YouTube videos using the youtube-transcript package.
 */

import { YoutubeTranscript } from 'youtube-transcript';

export interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

export interface VideoMetadata {
  title?: string;
  channelName?: string;
  duration?: string;
  viewCount?: string;
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
    console.error('Invalid YouTube URL:', error);
    return null;
  }
}

/**
 * Fetch transcript from YouTube video with retry logic and multiple language attempts
 *
 * Uses the youtube-transcript package to fetch captions/subtitles
 */
export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  console.log(`[YouTube] Fetching transcript for video ID: ${videoId}`);

  // Try multiple language codes in case the video has non-English captions
  const languagesToTry = ['en', 'en-US', 'en-GB', undefined]; // undefined = auto-detect
  let lastError: Error | null = null;

  for (const lang of languagesToTry) {
    try {
      const options = lang ? { lang } : {};
      console.log(`[YouTube] Attempting to fetch transcript${lang ? ` in language: ${lang}` : ' (auto-detect)'}`);

      // Fetch the transcript using youtube-transcript
      const transcript = await YoutubeTranscript.fetchTranscript(videoId, options);

      if (!transcript || transcript.length === 0) {
        console.log(`[YouTube] Transcript array is empty for language: ${lang || 'auto'}`);
        continue;
      }

      // Combine all transcript segments into a single string
      const fullTranscript = transcript
        .map((segment: any) => {
          // Handle both .text and .snippet properties
          return segment.text || segment.snippet || '';
        })
        .filter(text => text.trim().length > 0)
        .join(' ')
        .trim();

      console.log(`[YouTube] Raw transcript segments: ${transcript.length}`);
      console.log(`[YouTube] Transcript sample:`, transcript.slice(0, 2));

      if (fullTranscript && fullTranscript.length > 0) {
        console.log(`[YouTube] Transcript fetched successfully: ${fullTranscript.length} characters`);
        return fullTranscript;
      } else {
        console.log(`[YouTube] Transcript text is empty after processing for language: ${lang || 'auto'}`);
      }

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[YouTube] Error with language ${lang || 'auto'}:`, error);
      // Continue to try next language
    }
  }

  // If we got here, all language attempts failed
  console.error('[YouTube] All transcript fetch attempts failed');

  // Provide helpful error message
  const errorMessage = lastError?.message || 'Unknown error';

  if (errorMessage.includes('Could not find captions') ||
      errorMessage.includes('Transcript is disabled') ||
      errorMessage.includes('does not have captions')) {
    throw new Error(
      `This video does not have captions/subtitles available. ` +
      `Please ensure the video (${videoId}) has captions enabled. ` +
      `Video URL: https://www.youtube.com/watch?v=${videoId}`
    );
  }

  if (errorMessage.includes('Video unavailable') || errorMessage.includes('private')) {
    throw new Error(
      `This video is unavailable, private, or restricted. ` +
      `Video ID: ${videoId}`
    );
  }

  throw new Error(
    `Failed to fetch transcript for video ${videoId}. ` +
    `This might be due to: (1) No captions available, (2) Video is private/restricted, ` +
    `(3) Regional restrictions, or (4) YouTube API limitations. ` +
    `Error: ${errorMessage}`
  );
}

/**
 * Fetch transcript with explicit language code
 */
export async function getYouTubeTranscriptWithLang(
  videoUrl: string,
  languageCode: string = 'en'
): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  try {
    console.log(`[YouTube] Fetching transcript for video ${videoId} in language: ${languageCode}`);

    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: languageCode
    });

    const fullTranscript = transcript
      .map((segment: any) => segment.text || segment.snippet || '')
      .filter(text => text.trim().length > 0)
      .join(' ')
      .trim();

    if (!fullTranscript || fullTranscript.length === 0) {
      throw new Error(`Transcript is empty for language: ${languageCode}`);
    }

    return fullTranscript;

  } catch (error) {
    console.error(`[YouTube] Error fetching transcript in ${languageCode}:`, error);
    throw error;
  }
}

/**
 * Fetch video metadata (optional - not implemented)
 *
 * To implement this, you would need to use YouTube Data API v3
 * which requires an API key.
 */
export async function getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  // This would require YouTube Data API v3
  // For now, return empty metadata
  return {
    title: undefined,
    channelName: undefined,
    duration: undefined,
    viewCount: undefined
  };
}

/**
 * Format transcript with timestamps (utility function)
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
 * Clean transcript text (remove extra spaces, etc.)
 */
export function cleanTranscript(transcript: string): string {
  return transcript
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .trim();
}
