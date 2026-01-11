import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'rakelaroshi@gmail.com';

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

    // Check if user is admin
    if (user.email !== ADMIN_EMAIL) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create admin Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const activities: any[] = [];

    // Get recent signups (last 50)
    const { data: recentSignups } = await supabase
      .from('profiles')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (recentSignups) {
      recentSignups.forEach(profile => {
        activities.push({
          id: `signup-${profile.id}`,
          type: 'signup',
          user_email: profile.email,
          description: 'New user signed up',
          created_at: profile.created_at
        });
      });
    }

    // Get recent pro subscriptions (users who upgraded in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentProUsers } = await supabase
      .from('profiles')
      .select('id, email, created_at, pro_plan_type')
      .eq('is_pro', true)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(20);

    if (recentProUsers) {
      recentProUsers.forEach(profile => {
        const planType = profile.pro_plan_type === 'yearly' ? 'Yearly Pro' : 'Monthly Pro';
        activities.push({
          id: `subscription-${profile.id}`,
          type: 'subscription',
          user_email: profile.email,
          description: `Upgraded to ${planType}`,
          created_at: profile.created_at
        });
      });
    }

    // Get recent generations (last 30)
    const { data: recentGenerations } = await supabase
      .from('generations')
      .select('id, user_id, type, created_at')
      .order('created_at', { ascending: false })
      .limit(30);

    if (recentGenerations) {
      // Get user emails for generations
      const userIds = [...new Set(recentGenerations.map(g => g.user_id))];
      const { data: users } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds);

      const userEmailMap = new Map(users?.map(u => [u.id, u.email]) || []);

      recentGenerations.forEach(generation => {
        const userEmail = userEmailMap.get(generation.user_id) || 'Unknown';
        activities.push({
          id: `generation-${generation.id}`,
          type: 'generation',
          user_email: userEmail,
          description: `Generated content using ${generation.type}`,
          created_at: generation.created_at
        });
      });
    }

    // Sort all activities by created_at (most recent first)
    activities.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    // Return top 50 activities
    return new Response(
      JSON.stringify({
        activities: activities.slice(0, 50)
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[admin/activity] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
