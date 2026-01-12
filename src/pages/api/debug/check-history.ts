/**
 * COMPREHENSIVE DEBUG API: Check why history isn't showing
 * Access: /api/debug/check-history
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { getToolById } from '../../../config/tools';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Get user from request
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Not authenticated',
          fix: 'Log in first, then try again'
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[check-history] Checking for user:', user.id, user.email);

    // Create admin Supabase client (same as the API uses)
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // 1. Check what's in the database for this user (RAW)
    const { data: rawGenerations, error: rawError } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    console.log('[check-history] Raw generations:', rawGenerations?.length || 0);

    // 2. Check what recent-activity API would return (PROCESSED)
    const { data: apiGenerations, error: apiError } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    const processedGenerations = (apiGenerations || []).map(gen => {
      const tool = getToolById(gen.type);
      return {
        ...gen,
        tool_id: gen.type,
        tool_name: tool?.seo_title || tool?.category || gen.type,
        output: gen.output_content
      };
    });

    console.log('[check-history] Processed generations:', processedGenerations.length);

    // 3. Check total count in entire database
    const { count: totalInDB } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true });

    // 4. Check if any generations exist for ANY user
    const { data: anyGenerations, count: anyCount } = await supabase
      .from('generations')
      .select('user_id, type, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    // 5. Check user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        currentUser: {
          id: user.id,
          email: user.email
        },
        database: {
          totalGenerationsInDB: totalInDB || 0,
          yourGenerationsCount: rawGenerations?.length || 0,
          rawGenerations: rawGenerations?.map(g => ({
            id: g.id,
            user_id: g.user_id,
            type: g.type,
            created_at: g.created_at,
            has_output: !!g.output_content,
            output_length: g.output_content?.length || 0
          })),
          processedForAPI: processedGenerations.map(g => ({
            id: g.id,
            tool_id: g.tool_id,
            tool_name: g.tool_name,
            has_output: !!g.output,
            output_length: g.output?.length || 0,
            created_at: g.created_at
          })),
          recentInDB: anyGenerations
        },
        errors: {
          rawError: rawError?.message || null,
          apiError: apiError?.message || null
        },
        diagnosis: {
          databaseHasGenerations: (totalInDB || 0) > 0 ? '✅ YES' : '❌ NO',
          yourUserHasGenerations: (rawGenerations?.length || 0) > 0 ? '✅ YES' : '❌ NO',
          dataProcessedCorrectly: processedGenerations.length > 0 ? '✅ YES' : '❌ NO',
          issue:
            (rawGenerations?.length || 0) === 0
              ? '❌ No generations found for your user_id. Check if saveGeneration is using correct user_id.'
              : processedGenerations.length === 0
              ? '❌ Generations exist but processing failed. Check getToolById() function.'
              : '✅ Data exists and processes correctly. Issue is in the UI/frontend.'
        },
        nextSteps:
          (rawGenerations?.length || 0) === 0
            ? [
                '1. Generate content from a YouTube tool',
                '2. Check browser console for errors during generation',
                '3. Check if saveGeneration is being called (server logs)',
                '4. Verify user_id matches between save and fetch'
              ]
            : processedGenerations.length === 0
            ? [
                '1. Check if tool types match available tools',
                '2. Verify getToolById() returns valid tools',
                '3. Check tool configuration in src/config/tools.ts'
              ]
            : [
                '1. Open /account/history page',
                '2. Open browser DevTools (F12) → Console',
                '3. Look for JavaScript errors',
                '4. Check Network tab → look for /api/account/recent-activity request',
                '5. Verify the response matches this debug data',
                '6. If response is correct but UI is empty, check React component rendering'
              ],
        userProfile: profile
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[check-history] Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
