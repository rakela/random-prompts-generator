import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { getToolById } from '../../../config/tools';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Authenticate user
    const user = await getUserFromRequest(request);

    if (!user) {
      console.log('[recent-activity] ❌ No user authenticated');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[recent-activity] ✅ User authenticated:', user.id, user.email);

    // Get limit from query params (default: 5)
    const limit = parseInt(url.searchParams.get('limit') || '5');

    // Create admin Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Fetch recent generations
    const { data: generations, error } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[recent-activity] ❌ Database error:', error);
      throw error;
    }

    console.log('[recent-activity] 📊 Raw generations from DB:', generations?.length || 0);
    if (generations && generations.length > 0) {
      console.log('[recent-activity] First generation:', {
        id: generations[0].id,
        type: generations[0].type,
        user_id: generations[0].user_id,
        has_output_content: !!generations[0].output_content,
        created_at: generations[0].created_at
      });
    }

    // Add tool names and map database fields to component-expected fields
    const generationsWithNames = (generations || []).map(gen => {
      const tool = getToolById(gen.type);
      return {
        ...gen,
        tool_id: gen.type,  // Map 'type' field to 'tool_id' for component compatibility
        tool_name: tool?.seo_title || tool?.category || gen.type,
        output: gen.output_content  // Map 'output_content' to 'output' for component compatibility
      };
    });

    console.log('[recent-activity] ✅ Processed generations:', generationsWithNames.length);
    if (generationsWithNames.length > 0) {
      console.log('[recent-activity] First processed:', {
        tool_id: generationsWithNames[0].tool_id,
        tool_name: generationsWithNames[0].tool_name,
        has_output: !!generationsWithNames[0].output
      });
    }

    return new Response(
      JSON.stringify({ generations: generationsWithNames }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[account/recent-activity] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
