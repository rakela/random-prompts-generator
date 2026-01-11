-- IMPORTANT: Run this migration in your Supabase SQL Editor
-- This ensures all tables and columns exist with the correct structure

-- ============================================
-- STEP 1: Update profiles table with new fields
-- ============================================

-- Add new credit-related columns if they don't exist
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS monthly_credits INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS purchased_credits INTEGER DEFAULT 10,
  ADD COLUMN IF NOT EXISTS monthly_credits_reset_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pro_plan_type TEXT,
  ADD COLUMN IF NOT EXISTS daily_credits_reset_at TIMESTAMPTZ;

-- Remove old credits column if it exists (we use monthly_credits and purchased_credits now)
-- ALTER TABLE profiles DROP COLUMN IF EXISTS credits;

-- ============================================
-- STEP 2: Ensure generations table exists with correct schema
-- ============================================

CREATE TABLE IF NOT EXISTS generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  input_context JSONB NOT NULL DEFAULT '{}'::jsonb,
  output_content TEXT NOT NULL,
  video_title TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- STEP 3: Create indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generations_type ON generations(type);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_pro_plan ON profiles(is_pro, pro_plan_type);

-- ============================================
-- STEP 4: Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own generations" ON generations;
DROP POLICY IF EXISTS "Users can insert own generations" ON generations;
DROP POLICY IF EXISTS "Service role can manage all generations" ON generations;

-- Create RLS policies for generations
CREATE POLICY "Users can view own generations"
  ON generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow service role to bypass RLS (for admin operations)
CREATE POLICY "Service role can manage all generations"
  ON generations FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- STEP 5: Verify table structure
-- ============================================

-- Run this to see the current table structure:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'generations'
-- ORDER BY ordinal_position;

-- ============================================
-- STEP 6: Grant necessary permissions
-- ============================================

-- Grant permissions to authenticated users
GRANT SELECT, INSERT ON generations TO authenticated;
GRANT SELECT, UPDATE ON profiles TO authenticated;

-- ============================================
-- STEP 7: Add sample data (for testing - REMOVE IN PRODUCTION)
-- ============================================

-- Uncomment to add test data:
-- INSERT INTO generations (user_id, type, input_context, output_content, video_title)
-- VALUES (
--   auth.uid(),  -- Your user ID
--   'youtube-blog-post-generator',
--   '{"youtube_url": "https://youtube.com/watch?v=test", "test": true}'::jsonb,
--   'This is a test blog post generated from a YouTube video...',
--   'Test Video Title'
-- );

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if generations table exists
-- SELECT EXISTS (
--   SELECT FROM information_schema.tables
--   WHERE table_schema = 'public'
--   AND table_name = 'generations'
-- );

-- Count total generations
-- SELECT COUNT(*) as total_generations FROM generations;

-- View recent generations
-- SELECT id, user_id, type, video_title, created_at
-- FROM generations
-- ORDER BY created_at DESC
-- LIMIT 10;

-- Check RLS policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename = 'generations';
