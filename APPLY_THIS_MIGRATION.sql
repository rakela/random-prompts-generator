-- Combined Credits System Migration
-- Run this ONCE in Supabase SQL Editor to set up the entire credits system correctly

-- Step 1: Add the columns if they don't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS daily_credits_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS purchased_credits INTEGER DEFAULT 0;

-- Step 2: Update any existing users who might have the wrong timestamp
-- Give them credit immediately by setting timestamp to 25 hours ago
UPDATE profiles
SET daily_credits_reset_at = NOW() - INTERVAL '25 hours'
WHERE daily_credits_reset_at IS NOT NULL
  AND daily_credits_reset_at > NOW() - INTERVAL '24 hours'
  AND is_pro = FALSE;

-- Step 3: Ensure the default is NULL for new users
ALTER TABLE profiles
ALTER COLUMN daily_credits_reset_at SET DEFAULT NULL;

-- Step 4: Add helpful comments
COMMENT ON COLUMN profiles.daily_credits_reset_at IS
'Timestamp of last daily credit usage. NULL = never used = 1 free credit available. After 24 hours, credit resets.';

COMMENT ON COLUMN profiles.purchased_credits IS
'Number of purchased credits available. These do not expire.';

-- Step 5: Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_daily_credits_reset ON profiles(daily_credits_reset_at);
CREATE INDEX IF NOT EXISTS idx_profiles_purchased_credits ON profiles(purchased_credits);

-- Done! Your credits system is now set up correctly.
