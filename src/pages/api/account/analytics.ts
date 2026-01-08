import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7);
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get all generations for the user
    const { data: generations, error: genError } = await supabase
      .from('generations')
      .select('tool_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (genError) {
      console.error('Error fetching generations:', genError);
      return new Response(JSON.stringify({ error: 'Failed to fetch analytics' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Process analytics data
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Daily generations for the last 30 days
    const dailyGenerations: Record<string, number> = {};
    const last30Days: { date: string; count: number }[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split('T')[0];
      dailyGenerations[dateKey] = 0;
    }

    // Tool usage breakdown
    const toolUsage: Record<string, number> = {};

    // Hourly distribution (0-23)
    const hourlyDistribution: number[] = new Array(24).fill(0);

    // Process each generation
    (generations || []).forEach(gen => {
      const createdAt = new Date(gen.created_at);
      const dateKey = createdAt.toISOString().split('T')[0];

      // Count daily generations (last 30 days)
      if (dailyGenerations.hasOwnProperty(dateKey)) {
        dailyGenerations[dateKey]++;
      }

      // Count tool usage
      toolUsage[gen.tool_id] = (toolUsage[gen.tool_id] || 0) + 1;

      // Count hourly distribution
      const hour = createdAt.getHours();
      hourlyDistribution[hour]++;
    });

    // Convert daily generations to array
    Object.keys(dailyGenerations).forEach(date => {
      last30Days.push({
        date,
        count: dailyGenerations[date]
      });
    });

    // Get top 5 tools
    const topTools = Object.entries(toolUsage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([toolId, count]) => ({ toolId, count }));

    // Calculate peak hour
    const peakHour = hourlyDistribution.indexOf(Math.max(...hourlyDistribution));

    // Calculate totals
    const totalGenerations = generations?.length || 0;
    const last7DaysCount = (generations || []).filter(
      gen => new Date(gen.created_at) >= sevenDaysAgo
    ).length;
    const last30DaysCount = (generations || []).filter(
      gen => new Date(gen.created_at) >= thirtyDaysAgo
    ).length;

    // Calculate average per day
    const avgPerDay = last30DaysCount > 0 ? Math.round(last30DaysCount / 30) : 0;

    return new Response(JSON.stringify({
      totalGenerations,
      last7DaysCount,
      last30DaysCount,
      avgPerDay,
      dailyGenerations: last30Days,
      topTools,
      hourlyDistribution,
      peakHour,
      toolUsage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in analytics API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
