import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'rakelaroshi@gmail.com';

export const POST: APIRoute = async ({ request }) => {
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

    const body = await request.json();
    const { userId, action, value } = body;

    if (!userId || !action) {
      return new Response(
        JSON.stringify({ error: 'userId and action are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create admin Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Get user profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let updateData: any = {};

    switch (action) {
      case 'add-credits':
        // Add purchased credits
        const currentPurchased = profile.purchased_credits || 0;
        updateData = {
          purchased_credits: currentPurchased + (value || 10)
        };
        break;

      case 'remove-credits':
        // Remove purchased credits (ensure not negative)
        const currentCredits = profile.purchased_credits || 0;
        updateData = {
          purchased_credits: Math.max(0, currentCredits - (value || 10))
        };
        break;

      case 'upgrade-to-monthly':
        // Upgrade to Monthly Pro
        updateData = {
          is_pro: true,
          pro_plan_type: 'monthly',
          monthly_credits: 200,
          monthly_credits_reset_at: new Date().toISOString()
        };
        break;

      case 'upgrade-to-yearly':
        // Upgrade to Yearly Pro
        updateData = {
          is_pro: true,
          pro_plan_type: 'yearly'
        };
        break;

      case 'downgrade-to-free':
        // Downgrade to Free
        updateData = {
          is_pro: false,
          pro_plan_type: null,
          monthly_credits: 0
        };
        break;

      case 'ban':
        // Ban user (you might want to add a banned field to profiles table)
        updateData = {
          is_banned: true
        };
        break;

      case 'unban':
        // Unban user
        updateData = {
          is_banned: false
        };
        break;

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Update user profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (updateError) {
      console.error('[admin/user-action] Error updating user:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to perform action' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[admin] Action '${action}' performed on user ${profile.email}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Action '${action}' completed successfully`
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[admin/user-action] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
