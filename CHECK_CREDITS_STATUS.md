# Check Your Credits Status

The credits system requires a database migration to work properly. Here's how to check and fix it:

## Step 1: Check Your Current Credit Status

Run this query in your Supabase SQL Editor:

```sql
-- Check your credit status
SELECT
  email,
  is_pro,
  purchased_credits,
  daily_credits_reset_at,
  CASE
    WHEN daily_credits_reset_at IS NULL THEN 'Never used - has 1 credit'
    WHEN (EXTRACT(EPOCH FROM (NOW() - daily_credits_reset_at)) / 3600) >= 24 THEN 'Reset available - has 1 credit'
    ELSE 'Used within 24h - 0 credits'
  END as daily_credit_status,
  ROUND(EXTRACT(EPOCH FROM (NOW() - daily_credits_reset_at)) / 3600, 2) as hours_since_last_use
FROM auth.users
JOIN profiles ON profiles.id = auth.users.id
WHERE email = 'your-email@example.com';  -- Replace with your email
```

## Step 2: Apply the Credits Fix Migration

If the query shows you have 0 credits but it's been more than 24 hours, apply this migration:

### Go to Supabase Dashboard → SQL Editor → Run this:

```sql
-- Fix daily credits default value and reset existing users

-- First, fix existing users who have a recent reset timestamp
UPDATE profiles
SET daily_credits_reset_at = NOW() - INTERVAL '25 hours'
WHERE daily_credits_reset_at IS NOT NULL
  AND daily_credits_reset_at > NOW() - INTERVAL '24 hours'
  AND is_pro = FALSE;

-- Change the default for new users
ALTER TABLE profiles
ALTER COLUMN daily_credits_reset_at SET DEFAULT NULL;
```

## Step 3: Verify It Worked

Run the first query again. You should now see:
- `daily_credit_status`: "Reset available - has 1 credit"
- Your app should show 1 credit available

## Understanding the Credits System

**How Daily Credits Work:**
- You get 1 free credit every 24 hours
- After using it, you must wait 24 hours for the next one
- The timer starts from when you USED the credit, not from midnight

**Example:**
- Monday 3:00 PM: Use your credit → Timer starts
- Tuesday 3:00 PM (24h later): Credit resets → You get 1 new credit
- Tuesday 5:00 PM: Use your credit → Timer starts again
- Wednesday 5:00 PM (24h later): Credit resets → You get 1 new credit

**Check Exact Reset Time:**
```sql
SELECT
  email,
  daily_credits_reset_at as last_used,
  daily_credits_reset_at + INTERVAL '24 hours' as next_credit_at,
  NOW() as current_time,
  CASE
    WHEN daily_credits_reset_at IS NULL THEN 'Ready now!'
    WHEN NOW() >= daily_credits_reset_at + INTERVAL '24 hours' THEN 'Ready now!'
    ELSE TO_CHAR(daily_credits_reset_at + INTERVAL '24 hours' - NOW(), 'HH24:MI:SS') || ' remaining'
  END as time_until_next_credit
FROM auth.users
JOIN profiles ON profiles.id = auth.users.id
WHERE email = 'your-email@example.com';  -- Replace with your email
```

This will show you exactly when your next credit becomes available!
