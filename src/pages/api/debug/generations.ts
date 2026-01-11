/**
 * DEBUG API: Check generations table
 * Access: /api/debug/generations
 *
 * This endpoint helps debug generation saving issues
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Authenticate user
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create admin Supabase client (bypasses RLS)
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Check if generations table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('generations')
      .select('*')
      .limit(1);

    if (tableError) {
      return new Response(
        JSON.stringify({
          error: 'Database Error',
          message: tableError.message,
          hint: tableError.hint,
          details: tableError.details,
          code: tableError.code,
          suggestion: 'The generations table might not exist. Run DATABASE_MIGRATION.sql in Supabase SQL Editor.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get total count of user's generations
    const { count: totalCount, error: countError } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get recent generations for this user
    const { data: recentGenerations, error: recentError } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get all generations (to check if any exist at all)
    const { count: allGenerationsCount } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true });

    // Get user profile info
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        debug: {
          user: {
            id: user.id,
            email: user.email,
            profile: profile
          },
          database: {
            tableExists: !tableError,
            totalGenerationsInDB: allGenerationsCount || 0,
            yourGenerationsCount: totalCount || 0,
            recentGenerations: recentGenerations || [],
            errors: {
              countError: countError?.message || null,
              recentError: recentError?.message || null
            }
          },
          diagnosis: {
            tableExists: !tableError ? '✅ YES' : '❌ NO',
            hasGenerations: (totalCount || 0) > 0 ? '✅ YES' : '❌ NO',
            message:
              !tableError && (totalCount || 0) === 0
                ? 'Table exists but no generations saved yet. Try generating content from a YouTube video.'
                : !tableError && (totalCount || 0) > 0
                ? 'Table exists and generations are saved! Check your account/history page.'
                : 'Table does not exist. Run DATABASE_MIGRATION.sql in Supabase SQL Editor.'
          }
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[debug/generations] Error:', error);
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
