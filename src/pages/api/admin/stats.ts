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

    // Get total users count
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Get pro users count
    const { count: proUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_pro', true);

    // Get monthly pro users count
    const { count: monthlyProUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_pro', true)
      .eq('pro_plan_type', 'monthly');

    // Get yearly pro users count
    const { count: yearlyProUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_pro', true)
      .eq('pro_plan_type', 'yearly');

    // Calculate MRR (Monthly Recurring Revenue)
    // Monthly Pro: $19/month, Yearly Pro: $199/12 = $16.58/month
    const mrr = (monthlyProUsers || 0) * 19 + (yearlyProUsers || 0) * 16.58;

    // Calculate total revenue (approximate based on current subscriptions)
    const totalRevenue = (monthlyProUsers || 0) * 19 + (yearlyProUsers || 0) * 199;

    // Get total generations
    const { count: totalGenerations } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true });

    // Get today's generations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: generationsToday } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    // Get this month's generations
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const { count: generationsThisMonth } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString());

    // Calculate average credits per user
    const { data: profiles } = await supabase
      .from('profiles')
      .select('monthly_credits, purchased_credits');

    let totalCredits = 0;
    if (profiles) {
      totalCredits = profiles.reduce((sum, p) => {
        return sum + (p.monthly_credits || 0) + (p.purchased_credits || 0);
      }, 0);
    }

    const avgCreditsPerUser = totalUsers ? totalCredits / totalUsers : 0;

    return new Response(
      JSON.stringify({
        totalUsers: totalUsers || 0,
        proUsers: proUsers || 0,
        monthlyProUsers: monthlyProUsers || 0,
        yearlyProUsers: yearlyProUsers || 0,
        mrr: Math.round(mrr * 100) / 100,
        totalRevenue: Math.round(totalRevenue),
        totalGenerations: totalGenerations || 0,
        generationsToday: generationsToday || 0,
        generationsThisMonth: generationsThisMonth || 0,
        avgCreditsPerUser: Math.round(avgCreditsPerUser * 100) / 100
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[admin/stats] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
