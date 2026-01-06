/**
 * API Endpoint: /api/youtube-proxy
 *
 * Simple proxy to fetch YouTube video pages (bypasses CORS restrictions)
 * This endpoint ONLY fetches the HTML - all transcript processing happens client-side
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const videoId = url.searchParams.get('videoId');

    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'videoId parameter required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('[youtube-proxy] Fetching page for video:', videoId);

    // Fetch YouTube video page
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await fetch(youtubeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) {
      console.error('[youtube-proxy] YouTube fetch failed:', response.status);
      return new Response(
        JSON.stringify({ error: `YouTube returned status ${response.status}` }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const html = await response.text();

    console.log('[youtube-proxy] Successfully fetched YouTube page:', html.length, 'bytes');

    // Return the HTML with CORS headers
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('[youtube-proxy] Error:', error);
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
