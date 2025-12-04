/**
 * PayPal Create Order Endpoint
 * Creates a PayPal order for Pro subscription
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';

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

    // Get pricing from request or use default
    const body = await request.json().catch(() => ({}));
    const { plan = 'monthly' } = body;

    // Pricing
    const prices = {
      monthly: '9.99',
      annual: '99.99'
    };

    const price = prices[plan as keyof typeof prices] || prices.monthly;
    const planName = plan === 'annual' ? 'Pro Annual' : 'Pro Monthly';

    // Create PayPal order request
    const orderRequest = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    orderRequest.prefer('return=representation');
    orderRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: price,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: price
              }
            }
          },
          items: [
            {
              name: planName,
              description: 'Unlimited AI generations for YouTube content',
              unit_amount: {
                currency_code: 'USD',
                value: price
              },
              quantity: '1'
            }
          ],
          custom_id: user.id, // Store user ID for webhook processing
        }
      ],
      application_context: {
        brand_name: 'YouTube Content Generator',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${new URL(request.url).origin}/dashboard?payment=success`,
        cancel_url: `${new URL(request.url).origin}/upgrade?payment=cancelled`
      }
    });

    // Execute PayPal request
    const paypalClient = client();
    const order = await paypalClient.execute(orderRequest);

    console.log(`[paypal] Order created: ${order.result.id} for user: ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.result.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[paypal] Error creating order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create PayPal order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
