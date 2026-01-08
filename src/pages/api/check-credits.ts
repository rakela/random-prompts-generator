/**
 * Check Credits API Endpoint
 * Returns user's current credit balance and Pro status
 */

import type { APIRoute } from 'astro';
import { getUserFromRequest, checkUserCredits } from '../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Require authentication
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check user credits
    const { credits, isPro, canGenerate, isYearly, monthlyCredits, purchasedCredits } = await checkUserCredits(user.id);

    return new Response(
      JSON.stringify({
        credits: credits,
        isPro: isPro,
        canGenerate: canGenerate,
        isYearly: isYearly,
        monthlyCredits: monthlyCredits,
        purchasedCredits: purchasedCredits
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[check-credits] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to check credits' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
