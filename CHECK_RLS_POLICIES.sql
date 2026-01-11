-- ============================================
-- CHECK AND FIX RLS POLICIES FOR GENERATIONS
-- Run this in Supabase SQL Editor
-- ============================================

-- First, let's see what policies currently exist
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'generations'
ORDER BY policyname;

-- ============================================
-- Drop any existing policies (to avoid conflicts)
-- ============================================

DROP POLICY IF EXISTS "Users can view own generations" ON public.generations;
DROP POLICY IF EXISTS "Users can insert own generations" ON public.generations;
DROP POLICY IF EXISTS "Service role can manage all generations" ON public.generations;
DROP POLICY IF EXISTS "Enable read access for users based on user_id" ON public.generations;
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON public.generations;

-- ============================================
-- Create correct RLS policies
-- ============================================

-- Allow users to view their own generations
CREATE POLICY "Users can view own generations"
  ON public.generations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own generations
-- IMPORTANT: Service role bypasses RLS, so our API can insert with service_role key
CREATE POLICY "Users can insert own generations"
  ON public.generations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Ensure RLS is enabled
-- ============================================

ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Verify policies were created
-- ============================================

SELECT
  policyname,
  cmd as operation,
  roles,
  CASE
    WHEN qual IS NOT NULL THEN 'USING: ' || qual::text
    WHEN with_check IS NOT NULL THEN 'WITH CHECK: ' || with_check::text
    ELSE 'No condition'
  END as condition
FROM pg_policies
WHERE tablename = 'generations'
ORDER BY policyname;

-- Expected output:
-- policyname                        | operation | roles         | condition
-- ----------------------------------+-----------+---------------+----------------------------------
-- Users can view own generations    | SELECT    | {authenticated} | USING: (auth.uid() = user_id)
-- Users can insert own generations  | INSERT    | {authenticated} | WITH CHECK: (auth.uid() = user_id)
