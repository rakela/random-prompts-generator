/**
 * Diagnostic endpoint to check environment variables
 * Visit: /api/check-config to see what's configured
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const config = {
    supabase: {
      url: !!import.meta.env.PUBLIC_SUPABASE_URL || !!import.meta.env.SUPABASE_URL || !!import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY || !!import.meta.env.SUPABASE_ANON_KEY,
      serviceRole: !!import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    },
    paypal: {
      clientId: !!import.meta.env.PAYPAL_CLIENT_ID,
      publicClientId: !!import.meta.env.PUBLIC_PAYPAL_CLIENT_ID,
      clientSecret: !!import.meta.env.PAYPAL_CLIENT_SECRET,
      mode: import.meta.env.PAYPAL_MODE || 'not-set'
    },
    admin: {
      apiKey: !!import.meta.env.ADMIN_API_KEY
    }
  };

  return new Response(
    JSON.stringify({
      status: 'ok',
      config,
      message: 'true means variable is set, false means missing'
    }, null, 2),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};

export const prerender = false;
