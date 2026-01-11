-- ============================================
-- ADD MISSING COLUMNS TO PROFILES TABLE
-- Run this in Supabase SQL Editor
-- ============================================

-- Add missing columns for 3-tier credit system
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS monthly_credits INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_credits_reset_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pro_plan_type TEXT;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_pro_plan ON profiles(is_pro, pro_plan_type);

-- Verify columns were added successfully
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('monthly_credits', 'monthly_credits_reset_at', 'pro_plan_type', 'purchased_credits')
ORDER BY ordinal_position;

-- Expected output:
-- column_name                | data_type                   | is_nullable | column_default
-- ---------------------------+-----------------------------+-------------+---------------
-- purchased_credits          | integer                     | YES         | 0
-- monthly_credits            | integer                     | YES         | 0
-- monthly_credits_reset_at   | timestamp with time zone    | YES         | NULL
-- pro_plan_type              | text                        | YES         | NULL
