/**
 * PayPal Capture Order Endpoint
 * Captures payment and upgrades user to Pro
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest, createAdminClient } from '../../../lib/supabase';

// PayPal SDK
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// PayPal environment
function environment() {
  const clientId = import.meta.env.PAYPAL_CLIENT_ID;
  const clientSecret = import.meta.env.PAYPAL_CLIENT_SECRET;
  const mode = import.meta.env.PAYPAL_MODE || 'sandbox';

  if (mode === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  }
}

// PayPal client
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
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

    // Capture the order
    const captureRequest = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    captureRequest.requestBody({});

    const paypalClient = client();
    const capture = await paypalClient.execute(captureRequest);

    // Check if payment was successful
    if (capture.result.status !== 'COMPLETED') {
      console.error('[paypal] Payment not completed:', capture.result.status);
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
