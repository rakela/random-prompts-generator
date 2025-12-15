-- Fix daily credits default value and reset existing users
-- This migration ensures all users get their daily credit

-- First, fix existing users who have a recent reset timestamp
-- Set their reset timestamp to 25 hours ago so they get a credit immediately
UPDATE profiles
SET daily_credits_reset_at = NOW() - INTERVAL '25 hours'
WHERE daily_credits_reset_at IS NOT NULL
  AND daily_credits_reset_at > NOW() - INTERVAL '24 hours'
  AND is_pro = FALSE;

-- Change the default for the column to be NULL instead of NOW()
-- This ensures new users get a credit on signup
ALTER TABLE profiles
ALTER COLUMN daily_credits_reset_at SET DEFAULT NULL;

-- For any users with NULL, they'll get a credit automatically
-- (The application code handles NULL as "hasn't used daily credit yet")

COMMENT ON COLUMN profiles.daily_credits_reset_at IS
'Timestamp of last daily credit usage. NULL = never used = 1 free credit available. After 24 hours, credit resets.';
