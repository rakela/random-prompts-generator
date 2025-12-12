/**
 * Shared Supabase Client for Browser
 * Creates a singleton instance to avoid multiple client warnings
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

// Get Supabase config from environment
function getSupabaseConfig() {
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
