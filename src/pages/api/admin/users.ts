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

    // Get all users with their profile data
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/users] Error fetching users:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch users' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get generation counts for each user
    const usersWithStats = await Promise.all(
      (profiles || []).map(async (profile) => {
        const { count: totalGenerations } = await supabase
          .from('generations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', profile.id);

        return {
          id: profile.id,
          email: profile.email,
          created_at: profile.created_at,
          is_pro: profile.is_pro,
          pro_plan_type: profile.pro_plan_type,
          monthly_credits: profile.monthly_credits || 0,
          purchased_credits: profile.purchased_credits || 0,
          total_generations: totalGenerations || 0
        };
      })
    );

    return new Response(
      JSON.stringify({
        users: usersWithStats
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[admin/users] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
