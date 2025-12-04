/**
 * Stripe Webhook Handler
 * Listens for checkout.session.completed and updates user to Pro
 */

import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createAdminClient } from '../../../lib/supabase';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia'
});

const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return new Response('Webhook signature missing', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  console.log(`[stripe-webhook] Event received: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log(`[stripe-webhook] Checkout completed for session: ${session.id}`);

        // Get customer email and metadata
        const customerEmail = session.customer_details?.email || session.customer_email;
        const userId = session.metadata?.user_id;

        if (!customerEmail && !userId) {
          console.error('[stripe-webhook] No email or user_id in session');
          return new Response('Missing customer info', { status: 400 });
        }

        const supabase = createAdminClient();

        // Find user by email or user_id
        let profile;
        if (userId) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
          profile = data;
        } else if (customerEmail) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', customerEmail)
            .single();
          profile = data;
        }

        if (!profile) {
          console.error('[stripe-webhook] User not found:', { userId, customerEmail });
          return new Response('User not found', { status: 404 });
        }

        // Update user to Pro
        const { error } = await supabase
          .from('profiles')
          .update({
            is_pro: true,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_status: 'active'
          })
          .eq('id', profile.id);

        if (error) {
          console.error('[stripe-webhook] Failed to update profile:', error);
          return new Response('Database update failed', { status: 500 });
        }

        console.log(`[stripe-webhook] User ${profile.id} upgraded to Pro`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        console.log(`[stripe-webhook] Subscription updated: ${subscription.id}`);

        const supabase = createAdminClient();

        // Find user by stripe_subscription_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (!profile) {
          console.error('[stripe-webhook] User not found for subscription:', subscription.id);
          return new Response('User not found', { status: 404 });
        }

        // Update subscription status
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            is_pro: subscription.status === 'active'
          })
          .eq('id', profile.id);

        if (error) {
          console.error('[stripe-webhook] Failed to update subscription status:', error);
          return new Response('Database update failed', { status: 500 });
        }

        console.log(`[stripe-webhook] Subscription status updated for user ${profile.id}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        console.log(`[stripe-webhook] Subscription canceled: ${subscription.id}`);

        const supabase = createAdminClient();

        // Find user by stripe_subscription_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (!profile) {
          console.error('[stripe-webhook] User not found for subscription:', subscription.id);
          return new Response('User not found', { status: 404 });
        }

        // Downgrade to free
        const { error } = await supabase
          .from('profiles')
          .update({
            is_pro: false,
            subscription_status: 'canceled',
            credits: 0 // No free credits after Pro cancellation
          })
          .eq('id', profile.id);

        if (error) {
          console.error('[stripe-webhook] Failed to downgrade user:', error);
          return new Response('Database update failed', { status: 500 });
        }

        console.log(`[stripe-webhook] User ${profile.id} downgraded to free`);
        break;
      }

      default:
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[stripe-webhook] Error processing webhook:', error);
    return new Response('Webhook processing failed', { status: 500 });
  }
};

export const prerender = false;
