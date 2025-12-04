/**
 * Admin API - Upgrade User to Pro
 * Manually upgrade a user to Pro status after payment verification
 *
 * Requires ADMIN_API_KEY in Authorization header
 */

import type { APIRoute } from 'astro';
import { createAdminClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check admin API key
    const authHeader = request.headers.get('Authorization');
    const adminKey = import.meta.env.ADMIN_API_KEY;

    if (!authHeader || !adminKey || authHeader !== `Bearer ${adminKey}`) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { email, duration_months = 1, payment_method = 'manual' } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createAdminClient();

    // Find user by email
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !profile) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calculate pro_until date
    const proUntil = new Date();
    proUntil.setMonth(proUntil.getMonth() + duration_months);

    // Update user to Pro
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        is_pro: true,
        pro_until: proUntil.toISOString(),
        payment_method: payment_method
      })
      .eq('id', profile.id);

    if (updateError) {
      console.error('[admin] Failed to upgrade user:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to upgrade user' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[admin] User ${email} upgraded to Pro until ${proUntil.toISOString()}`);

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: profile.id,
          email: email,
          is_pro: true,
          pro_until: proUntil.toISOString()
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[admin] Error upgrading user:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
