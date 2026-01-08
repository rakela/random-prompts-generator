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

    // Get all users
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/export-users] Error fetching users:', error);
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
          pro_plan_type: profile.pro_plan_type || 'free',
          monthly_credits: profile.monthly_credits || 0,
          purchased_credits: profile.purchased_credits || 0,
          total_generations: totalGenerations || 0
        };
      })
    );

    // Generate CSV
    const headers = [
      'ID',
      'Email',
      'Plan Type',
      'Is Pro',
      'Monthly Credits',
      'Purchased Credits',
      'Total Generations',
      'Joined Date'
    ];

    const csvRows = [
      headers.join(','),
      ...usersWithStats.map(u => [
        u.id,
        u.email,
        u.is_pro ? u.pro_plan_type : 'free',
        u.is_pro ? 'Yes' : 'No',
        u.monthly_credits,
        u.purchased_credits,
        u.total_generations,
        new Date(u.created_at).toLocaleDateString()
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('[admin/export-users] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
