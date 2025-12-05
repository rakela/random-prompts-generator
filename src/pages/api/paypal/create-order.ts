/**
 * PayPal Create Order Endpoint
 * Creates a PayPal order for Pro subscription using REST API
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest } from '../../../lib/supabase';

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

    // Get PayPal access token
    const accessToken = await getAccessToken();
    const baseURL = getPayPalBaseURL();

    // Create order
    const orderResponse = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
            custom_id: user.id // Store user ID for webhook processing
          }
        ],
        application_context: {
          brand_name: 'YouTube Content Generator',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${new URL(request.url).origin}/dashboard?payment=success`,
          cancel_url: `${new URL(request.url).origin}/upgrade?payment=cancelled`
        }
      })
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('[paypal] Error creating order:', errorData);
      throw new Error('Failed to create PayPal order');
    }

    const order = await orderResponse.json();

    console.log(`[paypal] Order created: ${order.id} for user: ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id
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
