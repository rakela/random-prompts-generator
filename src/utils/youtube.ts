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
 * Fetch transcript from YouTube video
 *
 * Uses the youtube-transcript package to fetch captions/subtitles
 */
export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  try {
    console.log(`[YouTube] Fetching transcript for video ID: ${videoId}`);

    // Fetch the transcript using youtube-transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Combine all transcript segments into a single string
    const fullTranscript = transcript
      .map((segment: any) => segment.text)
      .join(' ')
      .trim();

    console.log(`[YouTube] Transcript fetched successfully: ${fullTranscript.length} characters`);

    if (!fullTranscript || fullTranscript.length === 0) {
      throw new Error('Transcript is empty. The video may not have captions available.');
    }

    return fullTranscript;

  } catch (error) {
    console.error('[YouTube] Error fetching transcript:', error);

    // Provide helpful error message
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('Could not find captions') || errorMessage.includes('Transcript is disabled')) {
      throw new Error(
        `This video does not have captions/subtitles available. ` +
        `Please ensure the video (${videoId}) has captions enabled.`
      );
    }

    throw new Error(
      `Failed to fetch transcript for video ${videoId}. ` +
      `Error: ${errorMessage}`
    );
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
