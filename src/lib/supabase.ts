/**
 * Supabase Client Utilities for Astro
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Environment variable helpers with fallbacks for multiple naming conventions
function getSupabaseUrl(): string {
  // Try different variable names in order of preference
  const url = import.meta.env.PUBLIC_SUPABASE_URL ||
              import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
              import.meta.env.SUPABASE_URL;

  if (!url) {
    throw new Error('Supabase URL not found. Please set PUBLIC_SUPABASE_URL in your .env file.');
  }

  return url;
}

function getSupabaseAnonKey(): string {
  // Try different variable names in order of preference
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
              import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
              import.meta.env.SUPABASE_ANON_KEY ||
              import.meta.env.SUPABASE_PUBLISHABLE_KEY;

  if (!key) {
    throw new Error('Supabase Anon Key not found. Please set PUBLIC_SUPABASE_ANON_KEY in your .env file.');
  }

  return key;
}

function getSupabaseServiceRoleKey(): string {
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
              import.meta.env.SUPABASE_SECRET_KEY;

  if (!key) {
    throw new Error('Supabase Service Role Key not found. Please set SUPABASE_SERVICE_ROLE_KEY in your .env file.');
  }

  return key;
}

// Client-side Supabase client (for browser)
export function createBrowserClient() {
  return createClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    }
  );
}

// Server-side Supabase client (for API routes)
export function createServerClient() {
  return createClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey()
  );
}

// Admin client with service role (for privileged operations)
export function createAdminClient() {
  return createClient<Database>(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

// Helper to get user from request
export async function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  const supabase = createServerClient();

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return user;
}

// Helper to check user credits and permissions
export async function checkUserCredits(userId: string) {
  const supabase = createAdminClient();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_pro, purchased_credits, daily_credits_reset_at')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    throw new Error('Failed to fetch user profile');
  }

  // Pro users have unlimited credits
  if (profile.is_pro) {
    return {
      canGenerate: true,
      credits: 999999,
      isPro: true
    };
  }

  // Calculate if user has daily credit available
  const hoursSinceReset = profile.daily_credits_reset_at
    ? (Date.now() - new Date(profile.daily_credits_reset_at).getTime()) / (1000 * 60 * 60)
    : 999; // If null, give them a credit

  const hasDailyCredit = hoursSinceReset >= 24;
  const dailyCredits = hasDailyCredit ? 1 : 0;
  const totalCredits = dailyCredits + profile.purchased_credits;

  return {
    canGenerate: totalCredits > 0,
    credits: totalCredits,
    isPro: false
  };
}

// Helper to deduct credit
export async function deductCredit(userId: string) {
  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro, purchased_credits, daily_credits_reset_at')
    .eq('id', userId)
    .single();

  if (!profile || profile.is_pro) {
    // Pro users don't lose credits
    return;
  }

  // Calculate if user has daily credit available
  const hoursSinceReset = profile.daily_credits_reset_at
    ? (Date.now() - new Date(profile.daily_credits_reset_at).getTime()) / (1000 * 60 * 60)
    : 999; // If null, they get a credit

  // If more than 24 hours since last reset, use daily credit and reset timestamp
  if (hoursSinceReset >= 24) {
    const { error } = await supabase
      .from('profiles')
      .update({ daily_credits_reset_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      throw new Error('Failed to reset daily credit');
    }
    return;
  }

  // Otherwise, deduct a purchased credit
  if (profile.purchased_credits > 0) {
    const { error } = await supabase
      .from('profiles')
      .update({ purchased_credits: profile.purchased_credits - 1 })
      .eq('id', userId);

    if (error) {
      throw new Error('Failed to deduct purchased credit');
    }
    return;
  }

  // No credits available
  throw new Error('No credits available');
}

// Helper to add purchased credits
export async function addPurchasedCredits(userId: string, amount: number) {
  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('purchased_credits')
    .eq('id', userId)
    .single();

  if (!profile) {
    throw new Error('User not found');
  }

  const { error } = await supabase
    .from('profiles')
    .update({ purchased_credits: profile.purchased_credits + amount })
    .eq('id', userId);

  if (error) {
    throw new Error('Failed to add purchased credits');
  }
}

// Helper to save generation
export async function saveGeneration(data: {
  userId: string;
  type: string;
  inputContext: any;
  outputContent: string;
  videoTitle?: string;
  tokensUsed?: number;
}) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('generations')
    .insert({
      user_id: data.userId,
      type: data.type,
      input_context: data.inputContext,
      output_content: data.outputContent,
      video_title: data.videoTitle,
      tokens_used: data.tokensUsed
    });

  if (error) {
    console.error('Failed to save generation:', error);
    // Don't throw - generation succeeded, just logging failed
  }
}
