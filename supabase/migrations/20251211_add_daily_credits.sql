-- Add daily credit reset tracking to profiles table
-- This migration adds fields to support daily free credits (1 per day) and purchased credits

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS daily_credits_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS purchased_credits INTEGER DEFAULT 0;

-- Update existing credits column comment
COMMENT ON COLUMN profiles.credits IS 'Legacy field - will be calculated from daily_credits_reset_at + purchased_credits';

-- Create a function to check and reset daily credits
CREATE OR REPLACE FUNCTION get_available_credits(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  profile_record RECORD;
  daily_credit INTEGER;
  hours_since_reset NUMERIC;
BEGIN
  -- Fetch user profile
  SELECT * INTO profile_record FROM profiles WHERE id = user_id;

  -- If user not found, return 0
  IF NOT FOUND THEN
    RETURN 0;
  END IF;

  -- Pro users have unlimited credits
  IF profile_record.is_pro = TRUE THEN
    RETURN 999999;
  END IF;

  -- Calculate hours since last daily credit reset
  hours_since_reset := EXTRACT(EPOCH FROM (NOW() - profile_record.daily_credits_reset_at)) / 3600;

  -- If more than 24 hours have passed, user gets 1 daily credit
  IF hours_since_reset >= 24 THEN
    daily_credit := 1;
  ELSE
    daily_credit := 0;
  END IF;

  -- Total credits = daily credit + purchased credits
  RETURN daily_credit + profile_record.purchased_credits;
END;
$$ LANGUAGE plpgsql;

-- Create a function to deduct a credit (handles daily credit reset)
CREATE OR REPLACE FUNCTION deduct_user_credit(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  profile_record RECORD;
  hours_since_reset NUMERIC;
  available_credits INTEGER;
BEGIN
  -- Fetch user profile with row lock
  SELECT * INTO profile_record FROM profiles WHERE id = user_id FOR UPDATE;

  -- If user not found, return false
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Pro users don't deduct credits
  IF profile_record.is_pro = TRUE THEN
    RETURN TRUE;
  END IF;

  -- Calculate hours since last daily credit reset
  hours_since_reset := EXTRACT(EPOCH FROM (NOW() - profile_record.daily_credits_reset_at)) / 3600;

  -- If more than 24 hours, reset the daily credit timestamp and use that credit
  IF hours_since_reset >= 24 THEN
    UPDATE profiles
    SET daily_credits_reset_at = NOW()
    WHERE id = user_id;
    RETURN TRUE;
  END IF;

  -- Otherwise, try to use a purchased credit
  IF profile_record.purchased_credits > 0 THEN
    UPDATE profiles
    SET purchased_credits = purchased_credits - 1
    WHERE id = user_id;
    RETURN TRUE;
  END IF;

  -- No credits available
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Create a function to add purchased credits
CREATE OR REPLACE FUNCTION add_purchased_credits(user_id UUID, amount INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE profiles
  SET purchased_credits = purchased_credits + amount
  WHERE id = user_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_daily_credits_reset ON profiles(daily_credits_reset_at);
CREATE INDEX IF NOT EXISTS idx_profiles_purchased_credits ON profiles(purchased_credits);

-- Update existing users to have the new fields with sensible defaults
UPDATE profiles
SET
  daily_credits_reset_at = NOW() - INTERVAL '25 hours',  -- Set to 25 hours ago so they get a daily credit immediately
  purchased_credits = GREATEST(credits - 1, 0)  -- Convert existing credits to purchased_credits (minus the 1 daily credit they'll get)
WHERE daily_credits_reset_at IS NULL;

COMMENT ON FUNCTION get_available_credits IS 'Returns total available credits for a user (daily + purchased)';
COMMENT ON FUNCTION deduct_user_credit IS 'Deducts one credit from user. Returns true if successful, false if no credits available.';
COMMENT ON FUNCTION add_purchased_credits IS 'Adds purchased credits to a user account';
