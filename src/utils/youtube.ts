/**
 * YouTube Transcript Fetcher
 *
 * This utility fetches transcripts from YouTube videos.
 * Uses the youtube-transcript API or a similar service.
 */

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
 * Note: This is a placeholder implementation. In production, you would:
 * 1. Use a service like youtube-transcript or ytdl-core
 * 2. Use YouTube Data API v3
 * 3. Use a third-party API service
 *
 * For now, this returns a simulated response.
 */
export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  try {
    // Option 1: Use a transcript API service (recommended for production)
    // Example using a hypothetical API endpoint
    const response = await fetch(`https://youtube-transcript-api.example.com/transcript?video_id=${videoId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.statusText}`);
    }

    const data = await response.json();

    // Combine transcript segments into a single string
    if (Array.isArray(data.transcript)) {
      return data.transcript
        .map((segment: TranscriptSegment) => segment.text)
        .join(' ');
    }

    return data.transcript || '';

  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);

    // Fallback: Return a helpful error message
    throw new Error(
      `Could not fetch transcript for video ${videoId}. ` +
      'Please ensure the video has captions/subtitles enabled. ' +
      'Error: ' + (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * Fetch video metadata
 */
export async function getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  try {
    // In production, use YouTube Data API v3
    // For now, return empty metadata
    return {
      title: undefined,
      channelName: undefined,
      duration: undefined,
      viewCount: undefined
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return {};
  }
}

/**
 * Alternative implementation using youtube-transcript package
 *
 * Install with: npm install youtube-transcript
 *
 * Example usage:
 *
 * import { YoutubeTranscript } from 'youtube-transcript';
 *
 * export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
 *   const videoId = extractVideoId(videoUrl);
 *   if (!videoId) {
 *     throw new Error('Invalid YouTube URL');
 *   }
 *
 *   const transcript = await YoutubeTranscript.fetchTranscript(videoId);
 *   return transcript.map(item => item.text).join(' ');
 * }
 */

/**
 * Format transcript with timestamps (optional utility)
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
