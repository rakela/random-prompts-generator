/**
 * YouTube Transcript Fetcher
 *
 * This utility fetches transcripts from YouTube videos with multiple fallback methods.
 */

import { YoutubeTranscript } from 'youtube-transcript';
import { Innertube } from 'youtubei.js';

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
 * Method 1: Using youtube-transcript package
 */
async function fetchTranscriptMethod1(videoId: string): Promise<string> {
  console.log(`[YouTube] Method 1: Trying youtube-transcript package`);

  try {
    // Try without language option first (auto-detect)
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      throw new Error('Transcript array is empty');
    }

    const fullTranscript = transcript
      .map((segment: any) => segment.text || segment.snippet || '')
      .filter((text: string) => text.trim().length > 0)
      .join(' ')
      .trim();

    if (!fullTranscript || fullTranscript.length === 0) {
      throw new Error('Transcript text is empty after processing');
    }

    console.log(`[YouTube] Method 1 SUCCESS: ${fullTranscript.length} characters`);
    return fullTranscript;

  } catch (error) {
    console.error('[YouTube] Method 1 failed:', error);
    throw error;
  }
}

/**
 * Method 2: Using youtubei.js (more reliable)
 */
async function fetchTranscriptMethod2(videoId: string): Promise<string> {
  console.log(`[YouTube] Method 2: Trying youtubei.js`);

  try {
    const youtube = await Innertube.create();
    const info = await youtube.getInfo(videoId);

    if (!info.captions) {
      throw new Error('No captions available');
    }

    // Get the first available caption track
    const captionTrack = info.captions.caption_tracks?.[0];

    if (!captionTrack) {
      throw new Error('No caption tracks found');
    }

    // Fetch the caption content
    const captions = await captionTrack.fetch();

    if (!captions) {
      throw new Error('Failed to fetch caption content');
    }

    // Extract text from captions
    const transcript = captions.text || '';

    if (!transcript || transcript.length === 0) {
      throw new Error('Caption text is empty');
    }

    console.log(`[YouTube] Method 2 SUCCESS: ${transcript.length} characters`);
    return transcript;

  } catch (error) {
    console.error('[YouTube] Method 2 failed:', error);
    throw error;
  }
}

/**
 * Main function: Fetch transcript with multiple fallback methods
 */
export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  console.log(`[YouTube] Fetching transcript for video ID: ${videoId}`);
  console.log(`[YouTube] Video URL: https://www.youtube.com/watch?v=${videoId}`);

  const methods = [
    { name: 'youtube-transcript', fn: () => fetchTranscriptMethod1(videoId) },
    { name: 'youtubei.js', fn: () => fetchTranscriptMethod2(videoId) }
  ];

  let lastError: Error | null = null;

  // Try each method in order
  for (const method of methods) {
    try {
      console.log(`[YouTube] Trying ${method.name}...`);
      const transcript = await method.fn();

      if (transcript && transcript.length > 50) {
        console.log(`[YouTube] ✓ Success with ${method.name}: ${transcript.length} characters`);
        return transcript;
      } else {
        console.log(`[YouTube] ✗ ${method.name} returned insufficient content`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[YouTube] ✗ ${method.name} failed:`, error);
      // Continue to next method
    }
  }

  // All methods failed
  console.error('[YouTube] All transcript fetch methods failed');

  // Provide helpful error message
  const errorMessage = lastError?.message || 'Unknown error';

  if (errorMessage.includes('Could not find captions') ||
      errorMessage.includes('Transcript is disabled') ||
      errorMessage.includes('No captions available') ||
      errorMessage.includes('does not have captions')) {
    throw new Error(
      `This video does not have captions/subtitles available. ` +
      `Please ensure the video has captions enabled. ` +
      `Video: https://www.youtube.com/watch?v=${videoId}`
    );
  }

  if (errorMessage.includes('Video unavailable') ||
      errorMessage.includes('private') ||
      errorMessage.includes('not available')) {
    throw new Error(
      `This video is unavailable, private, or restricted. ` +
      `Video: https://www.youtube.com/watch?v=${videoId}`
    );
  }

  throw new Error(
    `Failed to fetch transcript for video ${videoId}. ` +
    `This might be due to: (1) No captions available, (2) Video is private/restricted, ` +
    `(3) Regional restrictions, or (4) Temporary API issues. ` +
    `Original error: ${errorMessage}`
  );
}

/**
 * Fetch transcript with explicit language code (using method 1 only)
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
      .filter((text: string) => text.trim().length > 0)
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
