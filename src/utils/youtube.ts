/**
 * YouTube Transcript Fetcher - Reliable Multi-Method Approach
 *
 * Uses multiple methods to fetch transcripts without requiring API keys
 */

import { YoutubeTranscript } from 'youtube-transcript';
import ytdl from '@distube/ytdl-core';

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
 * Method 1: Using ytdl-core to get captions
 */
async function fetchTranscriptMethod1(videoId: string): Promise<string> {
  console.log(`[YouTube] Method 1: Trying ytdl-core`);

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoUrl);

    console.log(`[YouTube] Method 1: Got video info for: ${info.videoDetails.title}`);

    // Get available caption tracks
    const captionTracks = info.player_response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!captionTracks || captionTracks.length === 0) {
      throw new Error('No caption tracks available');
    }

    console.log(`[YouTube] Method 1: Found ${captionTracks.length} caption tracks`);

    // Find English captions or use first available
    let captionTrack = captionTracks.find((track: any) =>
      track.languageCode === 'en' ||
      track.languageCode === 'en-US' ||
      track.languageCode === 'en-GB'
    ) || captionTracks[0];

    console.log(`[YouTube] Method 1: Using caption track: ${captionTrack.languageCode}`);

    // Fetch the caption content
    const captionUrl = captionTrack.baseUrl;
    const response = await fetch(captionUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch caption: ${response.status}`);
    }

    const captionXML = await response.text();

    // Parse XML and extract text
    const transcript = parseYouTubeCaptionXML(captionXML);

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
      .map((segment: any) => segment.text || '')
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
 * Parse YouTube caption XML format
 */
function parseYouTubeCaptionXML(xml: string): string {
  // YouTube captions are in XML format with <text> tags
  // Example: <text start="0.0" dur="2.5">Hello world</text>

  const textMatches = xml.match(/<text[^>]*>([^<]*)<\/text>/g);

  if (!textMatches) {
    return '';
  }

  const texts = textMatches.map(match => {
    // Extract text content
    const content = match.replace(/<text[^>]*>/, '').replace(/<\/text>/, '');
    // Decode HTML entities
    return decodeHTMLEntities(content);
  });

  return texts.join(' ').trim();
}

/**
 * Decode HTML entities
 */
function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
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
    { name: 'ytdl-core', fn: () => fetchTranscriptMethod1(videoId) },
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
      errorMessage.includes('No caption tracks available') ||
      errorMessage.includes('does not have captions')) {
    throw new Error(
      `This video does not have captions/subtitles available. ` +
      `Please ensure the video has captions enabled. ` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `Try using a video from a major channel (TED, Khan Academy, etc.) ` +
      `which typically have captions enabled.`
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
    `(3) Regional restrictions, or (4) Temporary YouTube issues. ` +
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
      .map((segment: any) => segment.text || '')
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

  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);

    return {
      title: info.videoDetails.title,
      channelName: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      viewCount: info.videoDetails.viewCount
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return {
      title: undefined,
      channelName: undefined,
      duration: undefined,
      viewCount: undefined
    };
  }
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
