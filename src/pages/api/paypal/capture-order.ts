/**
 * PayPal Capture Order Endpoint
 * Captures payment and upgrades user to Pro using REST API
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest, createAdminClient } from '../../../lib/supabase';

// PayPal API base URLs
function getPayPalBaseURL() {
  const mode = import.meta.env.PAYPAL_MODE || 'sandbox';
  return mode === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

// Get PayPal access token
async function getAccessToken() {
  const clientId = import.meta.env.PAYPAL_CLIENT_ID;
  const clientSecret = import.meta.env.PAYPAL_CLIENT_SECRET;
  const baseURL = getPayPalBaseURL();

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${baseURL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await response.json();
  return data.access_token;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Require authentication
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { orderId, plan = 'monthly' } = body;

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'Order ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get PayPal access token
    const accessToken = await getAccessToken();
    const baseURL = getPayPalBaseURL();

    // Capture the order
    const captureResponse = await fetch(`${baseURL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!captureResponse.ok) {
      const errorData = await captureResponse.json();
      console.error('[paypal] Error capturing order:', errorData);
      throw new Error('Failed to capture PayPal order');
    }

    const capture = await captureResponse.json();

    // Check if payment was successful
    if (capture.status !== 'COMPLETED') {
      console.error('[paypal] Payment not completed:', capture.status);
      return new Response(
        JSON.stringify({ error: 'Payment not completed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[paypal] Payment captured: ${orderId} for user: ${user.id}`);

    // Calculate pro_until date based on plan
    const durationMonths = plan === 'annual' ? 12 : 1;
    const proUntil = new Date();
    proUntil.setMonth(proUntil.getMonth() + durationMonths);

    // Upgrade user to Pro
    const supabase = createAdminClient();
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        is_pro: true,
        pro_until: proUntil.toISOString(),
        payment_method: 'paypal'
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('[paypal] Failed to upgrade user:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to upgrade user' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[paypal] User ${user.id} upgraded to Pro until ${proUntil.toISOString()}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment successful! Your account has been upgraded to Pro.',
        proUntil: proUntil.toISOString()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[paypal] Error capturing order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to capture payment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
