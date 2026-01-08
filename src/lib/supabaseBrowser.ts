/**
 * Shared Supabase Client for Browser
 * Creates a singleton instance to avoid multiple client warnings
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

// Extend window interface to include Supabase config
declare global {
  interface Window {
    __SUPABASE_URL__?: string;
    __SUPABASE_ANON_KEY__?: string;
  }
}

// Get Supabase config from global window object or environment
function getSupabaseConfig() {
  // First, try to get from global window object (set by inline script in header)
  if (typeof window !== 'undefined') {
    const url = window.__SUPABASE_URL__;
    const key = window.__SUPABASE_ANON_KEY__;

    if (url && key) {
      return { url, key };
    }
  }

  // Fallback to environment variables (for dev/build time)
  const url = (import.meta as any).env.PUBLIC_SUPABASE_URL ||
               (import.meta as any).env.NEXT_PUBLIC_SUPABASE_URL ||
               (import.meta as any).env.SUPABASE_URL || '';

  const key = (import.meta as any).env.PUBLIC_SUPABASE_ANON_KEY ||
               (import.meta as any).env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
               (import.meta as any).env.SUPABASE_ANON_KEY ||
               (import.meta as any).env.SUPABASE_PUBLISHABLE_KEY || '';

  return { url, key };
}

/**
 * Get or create shared Supabase client
 * This ensures only one client instance exists across all components
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    console.error('Supabase Config Error:', { url: !!url, key: !!key });
    console.error('Window vars:', {
      hasUrl: !!(typeof window !== 'undefined' && window.__SUPABASE_URL__),
      hasKey: !!(typeof window !== 'undefined' && window.__SUPABASE_ANON_KEY__)
    });
    throw new Error('Supabase URL or Anon Key not found in environment');
  }

  supabaseInstance = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });

  return supabaseInstance;
}

/**
 * Reset the singleton instance (useful for testing or auth changes)
 */
export function resetSupabaseClient() {
  supabaseInstance = null;
}
