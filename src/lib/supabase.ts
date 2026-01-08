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

  // First, get user's email to check for admin/unlimited access
  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);

  // Admin email with unlimited credits
  const ADMIN_EMAIL = 'rakelaroshi@gmail.com';
  if (userData?.user?.email === ADMIN_EMAIL) {
    console.log(`[checkUserCredits] Admin user detected: ${ADMIN_EMAIL} - granting unlimited credits`);
    return {
      canGenerate: true,
      credits: 999999,
      isPro: true,
      isYearly: true
    };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_pro, pro_plan_type, purchased_credits, monthly_credits, monthly_credits_reset_at')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    throw new Error('Failed to fetch user profile');
  }

  // Yearly Pro users have unlimited credits
  if (profile.is_pro && profile.pro_plan_type === 'yearly') {
    return {
      canGenerate: true,
      credits: 999999,
      isPro: true,
      isYearly: true,
      monthlyCredits: 0,
      purchasedCredits: profile.purchased_credits || 0
    };
  }

  // Monthly Pro users have 200 credits/month
  if (profile.is_pro && profile.pro_plan_type === 'monthly') {
    let monthlyCredits = profile.monthly_credits || 0;

    // Check if monthly credits need to be reset (30 days)
    if (profile.monthly_credits_reset_at) {
      const daysSinceReset = (Date.now() - new Date(profile.monthly_credits_reset_at).getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceReset >= 30) {
        // Reset monthly credits to 200
        monthlyCredits = 200;

        // Update database with new reset timestamp and credits
        await supabase
          .from('profiles')
          .update({
            monthly_credits: 200,
            monthly_credits_reset_at: new Date().toISOString()
          })
          .eq('id', userId);

        console.log(`[checkUserCredits] Monthly credits reset for user ${userId}: 200 credits`);
      }
    } else {
      // First time - initialize with 200 credits
      monthlyCredits = 200;
      await supabase
        .from('profiles')
        .update({
          monthly_credits: 200,
          monthly_credits_reset_at: new Date().toISOString()
        })
        .eq('id', userId);
    }

    // Total credits = monthly + purchased
    const totalCredits = monthlyCredits + (profile.purchased_credits || 0);

    return {
      canGenerate: totalCredits > 0,
      credits: totalCredits,
      isPro: true,
      isYearly: false,
      monthlyCredits: monthlyCredits,
      purchasedCredits: profile.purchased_credits || 0
    };
  }

  // Free users: only purchased credits (initial 10 credits given on signup)
  const totalCredits = profile.purchased_credits || 0;

  return {
    canGenerate: totalCredits > 0,
    credits: totalCredits,
    isPro: false,
    isYearly: false,
    monthlyCredits: 0,
    purchasedCredits: profile.purchased_credits || 0
  };
}

// Helper to deduct credit
export async function deductCredit(userId: string) {
  const supabase = createAdminClient();

  // First, get user's email to check for admin/unlimited access
  const { data: userData } = await supabase.auth.admin.getUserById(userId);

  // Admin email with unlimited credits - never deduct
  const ADMIN_EMAIL = 'rakelaroshi@gmail.com';
  if (userData?.user?.email === ADMIN_EMAIL) {
    console.log(`[deductCredit] Admin user detected: ${ADMIN_EMAIL} - skipping credit deduction`);
    return;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro, pro_plan_type, purchased_credits, monthly_credits, monthly_credits_reset_at')
    .eq('id', userId)
    .single();

  if (!profile) {
    throw new Error('User profile not found');
  }

  // Yearly Pro: Never deduct (unlimited)
  if (profile.is_pro && profile.pro_plan_type === 'yearly') {
    console.log(`[deductCredit] Yearly Pro user - skipping credit deduction`);
    return;
  }

  // Monthly Pro: Deduct from monthly credits first, then purchased
  if (profile.is_pro && profile.pro_plan_type === 'monthly') {
    const monthlyCredits = profile.monthly_credits || 0;

    if (monthlyCredits > 0) {
      // Deduct from monthly credits
      const { error } = await supabase
        .from('profiles')
        .update({ monthly_credits: monthlyCredits - 1 })
        .eq('id', userId);

      if (error) {
        throw new Error('Failed to deduct monthly credit');
      }
      console.log(`[deductCredit] Deducted monthly credit. Remaining: ${monthlyCredits - 1}`);
      return;
    } else if (profile.purchased_credits && profile.purchased_credits > 0) {
      // Fall back to purchased credits
      const { error } = await supabase
        .from('profiles')
        .update({ purchased_credits: profile.purchased_credits - 1 })
        .eq('id', userId);

      if (error) {
        throw new Error('Failed to deduct purchased credit');
      }
      console.log(`[deductCredit] Deducted purchased credit. Remaining: ${profile.purchased_credits - 1}`);
      return;
    }
  }

  // Free users: Deduct from purchased credits only
  if (profile.purchased_credits && profile.purchased_credits > 0) {
    const { error } = await supabase
      .from('profiles')
      .update({ purchased_credits: profile.purchased_credits - 1 })
      .eq('id', userId);

    if (error) {
      throw new Error('Failed to deduct purchased credit');
    }
    console.log(`[deductCredit] Deducted purchased credit. Remaining: ${profile.purchased_credits - 1}`);
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
      tool_id: data.type,  // Fixed: use tool_id instead of type
      output: data.outputContent,  // Fixed: use output instead of output_content
      created_at: new Date().toISOString(),
      // Optional fields
      ...(data.videoTitle && { video_title: data.videoTitle }),
      ...(data.tokensUsed && { tokens_used: data.tokensUsed })
    });

  if (error) {
    console.error('Failed to save generation:', error);
    console.error('Error details:', error.message, error.details, error.hint);
    // Don't throw - generation succeeded, just logging failed
  } else {
    console.log('[saveGeneration] Successfully saved generation for user:', data.userId);
  }
}
