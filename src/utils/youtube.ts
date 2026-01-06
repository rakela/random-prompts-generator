/**
 * YouTube Transcript Fetcher - Production-Grade Serverless Approach
 *
 * Uses YouTube's Innertube API for server-side transcript fetching.
 * Works in serverless environments (Vercel, AWS Lambda, Netlify).
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
  console.log(`[YouTube] Using: YouTube Innertube API (server-side)`);
  console.log(`[YouTube] ========================================`);

  try {
    // Step 1: Fetch YouTube video page
    const videoPageUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const htmlResponse = await fetch(videoPageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!htmlResponse.ok) {
      throw new Error(`Failed to fetch video page: ${htmlResponse.status}`);
    }

    const html = await htmlResponse.text();
    console.log(`[YouTube] Fetched video page`);

    // Step 2: Extract INNERTUBE_API_KEY
    const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
    if (!apiKeyMatch) {
      throw new Error('Could not extract YouTube API key from page');
    }

    const apiKey = apiKeyMatch[1];
    console.log(`[YouTube] Extracted API key`);

    // Step 3: Call Innertube player API
    const playerResponse = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'WEB',
            clientVersion: '2.20250106.01.00'
          }
        },
        videoId: videoId
      })
    });

    if (!playerResponse.ok) {
      throw new Error(`Innertube API error: ${playerResponse.status}`);
    }

    const playerData = await playerResponse.json();

    // Step 4: Extract caption tracks
    const tracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || tracks.length === 0) {
      throw new Error('No caption tracks found for this video');
    }

    console.log(`[YouTube] Found ${tracks.length} caption tracks`);

    // Find English track or first available
    const englishTrack = tracks.find((t: any) =>
      t.languageCode === 'en' || t.languageCode.startsWith('en')
    ) || tracks[0];

    console.log(`[YouTube] Using track:`, englishTrack.name?.simpleText || englishTrack.languageCode);

    // Step 5: Fetch transcript XML
    const transcriptResponse = await fetch(englishTrack.baseUrl);
    if (!transcriptResponse.ok) {
      throw new Error(`Failed to fetch transcript: ${transcriptResponse.status}`);
    }

    const transcriptXml = await transcriptResponse.text();
    console.log(`[YouTube] Fetched transcript XML`);

    // Step 6: Parse XML (simple regex parsing)
    const textMatches = transcriptXml.matchAll(/<text[^>]*>([^<]+)<\/text>/g);
    const textSegments = Array.from(textMatches).map(match => {
      // Decode HTML entities
      return match[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
    }).filter(text => text.length > 0);

    if (textSegments.length === 0) {
      throw new Error('No text segments found in transcript');
    }

    const fullTranscript = textSegments.join(' ').trim();

    if (fullTranscript.length < 50) {
      throw new Error('Transcript is too short');
    }

    console.log(`[YouTube] ✓ SUCCESS: ${fullTranscript.length} characters`);
    console.log(`[YouTube] Track language: ${englishTrack.languageCode}`);
    console.log(`[YouTube] ========================================`);

    return fullTranscript;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[YouTube] ✗ ERROR:', errorMessage);
    console.error('[YouTube] ========================================');

    // Generic error with helpful message
    throw new Error(
      `Failed to fetch YouTube transcript: ${errorMessage}\n\n` +
      `Video: https://www.youtube.com/watch?v=${videoId}\n\n` +
      `This could mean:\n` +
      `1. The video doesn't have captions enabled\n` +
      `2. The video is private or age-restricted\n` +
      `3. YouTube is blocking automated access\n\n` +
      `Please try a different video or try again later.`
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
