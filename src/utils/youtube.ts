/**
 * YouTube Transcript Fetcher - Using Official YouTube Data API v3
 *
 * This utility fetches transcripts from YouTube videos using multiple methods
 * with the YouTube Data API v3 as the primary reliable source.
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
 * Method 1: Using YouTube Data API v3 with Caption Download
 * This is the most reliable method
 */
async function fetchTranscriptMethod1(videoId: string): Promise<string> {
  console.log(`[YouTube] Method 1: Trying YouTube Data API v3`);

  const apiKey = process.env.YOUTUBE_DATA_API_KEY;

  if (!apiKey) {
    console.log(`[YouTube] Method 1: No API key found, skipping`);
    throw new Error('YouTube Data API key not configured');
  }

  try {
    // First, get the list of available captions
    const captionsListUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;

    const captionsResponse = await fetch(captionsListUrl);

    if (!captionsResponse.ok) {
      throw new Error(`API request failed: ${captionsResponse.status}`);
    }

    const captionsData = await captionsResponse.json();

    console.log(`[YouTube] Method 1: Found ${captionsData.items?.length || 0} caption tracks`);

    if (!captionsData.items || captionsData.items.length === 0) {
      throw new Error('No captions available for this video');
    }

    // Find English caption track
    let captionTrack = captionsData.items.find((track: any) =>
      track.snippet.language === 'en' ||
      track.snippet.language === 'en-US' ||
      track.snippet.language === 'en-GB'
    ) || captionsData.items[0];

    console.log(`[YouTube] Method 1: Using caption track: ${captionTrack.snippet.language}`);

    // Download the caption track
    const captionId = captionTrack.id;
    const captionDownloadUrl = `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=srt&key=${apiKey}`;

    const captionResponse = await fetch(captionDownloadUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!captionResponse.ok) {
      throw new Error(`Caption download failed: ${captionResponse.status}`);
    }

    const captionText = await captionResponse.text();

    // Parse SRT format and extract text
    const transcript = parseSRT(captionText);

    if (!transcript || transcript.length < 50) {
      throw new Error('Transcript is too short or empty');
    }

    console.log(`[YouTube] Method 1 SUCCESS: ${transcript.length} characters`);
    return transcript;

  } catch (error) {
    console.error('[YouTube] Method 1 failed:', error);
    throw error;
  }
}

/**
 * Method 2: Using youtube-transcript package (fallback)
 */
async function fetchTranscriptMethod2(videoId: string): Promise<string> {
  console.log(`[YouTube] Method 2: Trying youtube-transcript package`);

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    console.log(`[YouTube] Method 2: Received ${transcript?.length || 0} segments`);

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

    console.log(`[YouTube] Method 2 SUCCESS: ${fullTranscript.length} characters`);
    return fullTranscript;

  } catch (error) {
    console.error('[YouTube] Method 2 failed:', error);
    throw error;
  }
}

/**
 * Parse SRT format captions into plain text
 */
function parseSRT(srtText: string): string {
  const lines = srtText.split('\n');
  const textLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines, sequence numbers, and timestamps
    if (line === '' || /^\d+$/.test(line) || /^\d{2}:\d{2}:\d{2}/.test(line)) {
      continue;
    }

    // This is actual caption text
    textLines.push(line);
  }

  return textLines.join(' ').trim();
}

/**
 * Main function: Fetch transcript with multiple fallback methods
 */
export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL. Could not extract video ID.');
  }

  console.log(`[YouTube] ========================================`);
  console.log(`[YouTube] Fetching transcript for video ID: ${videoId}`);
  console.log(`[YouTube] Video URL: https://www.youtube.com/watch?v=${videoId}`);
  console.log(`[YouTube] ========================================`);

  const methods = [
    { name: 'YouTube Data API v3', fn: () => fetchTranscriptMethod1(videoId) },
    { name: 'youtube-transcript', fn: () => fetchTranscriptMethod2(videoId) }
  ];

  let lastError: Error | null = null;

  // Try each method in order
  for (const method of methods) {
    try {
      console.log(`[YouTube] Trying ${method.name}...`);
      const transcript = await method.fn();

      if (transcript && transcript.length > 50) {
        console.log(`[YouTube] ✓ Success with ${method.name}: ${transcript.length} characters`);
        console.log(`[YouTube] Preview: ${transcript.substring(0, 200)}...`);
        return transcript;
      } else {
        console.log(`[YouTube] ✗ ${method.name} returned insufficient content: ${transcript?.length || 0} chars`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[YouTube] ✗ ${method.name} failed:`, error);
      // Continue to next method
    }
  }

  // All methods failed
  console.error('[YouTube] ========================================');
  console.error('[YouTube] All transcript fetch methods failed');
  console.error('[YouTube] ========================================');

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

  if (errorMessage.includes('API key not configured')) {
    throw new Error(
      `YouTube Data API key is not configured. ` +
      `Please add YOUTUBE_DATA_API_KEY to your environment variables. ` +
      `Get an API key at: https://console.cloud.google.com/`
    );
  }

  throw new Error(
    `Failed to fetch transcript for video ${videoId}. ` +
    `This might be due to: (1) No captions available, (2) Video is private/restricted, ` +
    `(3) Regional restrictions, (4) API key issues, or (5) Temporary API issues. ` +
    `Original error: ${errorMessage}`
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
 * Fetch video metadata
 */
export async function getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  return {
    title: undefined,
    channelName: undefined,
    duration: undefined,
    viewCount: undefined
  };
}

/**
 * Format transcript with timestamps
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
 * Clean transcript text
 */
export function cleanTranscript(transcript: string): string {
  return transcript
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
}
