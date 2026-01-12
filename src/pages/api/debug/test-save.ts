/**
 * DEBUG API: Test generation saving
 * Access: /api/debug/test-save
 *
 * This endpoint tests if generation saving works
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest, saveGeneration } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Authenticate user
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Please log in first' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[test-save] Testing generation save for user:', user.id);

    // Try to save a test generation
    try {
      await saveGeneration({
        userId: user.id,
        type: 'test-generation',
        inputContext: {
          test: true,
          timestamp: new Date().toISOString(),
          source: 'debug-endpoint'
        },
        outputContent: `Test generation created at ${new Date().toISOString()}. If you can see this in your history, generation saving is working!`,
        videoTitle: 'Test Video - Debug',
        tokensUsed: 0
      });

      console.log('[test-save] ✅ Generation saved successfully');

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Test generation saved successfully!',
          userId: user.id,
          instructions: [
            '1. Visit /account/history to see if the test generation appears',
            '2. Or visit /api/debug/generations to see the count',
            '3. If it appears, your setup is working correctly!'
          ]
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );

    } catch (saveError) {
      console.error('[test-save] ❌ Failed to save generation:', saveError);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to save test generation',
          details: saveError instanceof Error ? saveError.message : String(saveError),
          possibleCauses: [
            '1. Missing columns in profiles table (run ADD_MISSING_COLUMNS.sql)',
            '2. RLS policies blocking insert',
            '3. Database permissions issue'
          ]
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('[test-save] Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
