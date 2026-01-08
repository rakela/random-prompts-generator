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

    // Create admin Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Get total generations
    const { count: totalGenerations } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get today's generations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: generationsToday } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    // Get this month's generations
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const { count: generationsThisMonth } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString());

    // Calculate next reset date (24 hours from last generation for free users)
    const { data: profile } = await supabase
      .from('profiles')
      .select('daily_credits_reset_at, is_pro')
      .eq('id', user.id)
      .single();

    let nextResetDate = '';
    if (!profile?.is_pro && profile?.daily_credits_reset_at) {
      const resetDate = new Date(profile.daily_credits_reset_at);
      resetDate.setHours(resetDate.getHours() + 24);
      nextResetDate = resetDate.toISOString();
    }

    return new Response(
      JSON.stringify({
        totalGenerations: totalGenerations || 0,
        generationsToday: generationsToday || 0,
        generationsThisMonth: generationsThisMonth || 0,
        nextResetDate,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[account/stats] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
