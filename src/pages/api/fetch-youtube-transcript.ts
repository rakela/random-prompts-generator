/**
 * API Endpoint: /api/fetch-youtube-transcript
 *
 * Complete server-side YouTube transcript fetching using Innertube API
 * This bypasses ALL CORS restrictions by running entirely on the server
 *
 * @route POST /api/fetch-youtube-transcript
 * @param {string} videoId - YouTube video ID
 * @returns {Object} Transcript data
 */

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { videoId } = body;

    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'videoId required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('[fetch-youtube-transcript] Processing video:', videoId);

    // Step 1: Fetch YouTube video page to extract API key
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const htmlResponse = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!htmlResponse.ok) {
      console.error('[fetch-youtube-transcript] Failed to fetch video page:', htmlResponse.status);
      return new Response(
        JSON.stringify({ error: 'Could not fetch video page' }),
        {
          status: htmlResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const html = await htmlResponse.text();
    console.log('[fetch-youtube-transcript] Fetched video page');

    // Step 2: Extract INNERTUBE_API_KEY
    const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
    if (!apiKeyMatch) {
      console.error('[fetch-youtube-transcript] Could not find API key in HTML');
      return new Response(
        JSON.stringify({ error: 'Could not extract YouTube API key' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const apiKey = apiKeyMatch[1];
    console.log('[fetch-youtube-transcript] Extracted API key');

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
      console.error('[fetch-youtube-transcript] Innertube API error:', playerResponse.status);
      return new Response(
        JSON.stringify({ error: 'YouTube API request failed' }),
        {
          status: playerResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const playerData = await playerResponse.json();

    // Step 4: Extract caption tracks
    const tracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || tracks.length === 0) {
      console.error('[fetch-youtube-transcript] No caption tracks found');
      return new Response(
        JSON.stringify({ error: 'This video does not have captions/subtitles available' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('[fetch-youtube-transcript] Found', tracks.length, 'caption tracks');

    // Find English track (or first available)
    const englishTrack = tracks.find((t: any) =>
      t.languageCode === 'en' || t.languageCode.startsWith('en')
    ) || tracks[0];

    console.log('[fetch-youtube-transcript] Using track:', englishTrack.name?.simpleText || englishTrack.languageCode);

    // Step 5: Fetch transcript XML
    const transcriptResponse = await fetch(englishTrack.baseUrl);
    if (!transcriptResponse.ok) {
      console.error('[fetch-youtube-transcript] Failed to fetch transcript:', transcriptResponse.status);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch transcript data' }),
        {
          status: transcriptResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const transcriptXml = await transcriptResponse.text();
    console.log('[fetch-youtube-transcript] Fetched transcript XML');

    // Step 6: Parse XML (simple regex parsing on server)
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
      console.error('[fetch-youtube-transcript] No text segments found in XML');
      return new Response(
        JSON.stringify({ error: 'Could not parse transcript data' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const transcript = textSegments.join(' ').trim();

    if (transcript.length < 50) {
      console.error('[fetch-youtube-transcript] Transcript too short:', transcript.length);
      return new Response(
        JSON.stringify({ error: 'Transcript is too short' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('[fetch-youtube-transcript] ✓ SUCCESS:', transcript.length, 'characters');

    return new Response(
      JSON.stringify({
        success: true,
        transcript: transcript,
        length: transcript.length,
        trackLanguage: englishTrack.languageCode
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      }
    );

  } catch (error) {
    console.error('[fetch-youtube-transcript] Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
