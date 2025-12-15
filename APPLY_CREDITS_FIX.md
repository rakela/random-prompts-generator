# Apply Daily Credits Fix

Your daily credits system wasn't working because new users were getting their `daily_credits_reset_at` timestamp set to NOW() on signup, which meant they started with 0 credits.

## What Was Fixed

1. **Database Migration**: Changed default from NOW() to NULL
2. **Existing Users**: Reset timestamp to 25 hours ago (gives them 1 credit)
3. **Code Logic**: Improved to handle NULL properly (NULL = never used = 1 credit)

---

## How to Apply the Fix

### Option 1: Using Supabase Dashboard (Easiest)

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of:
   ```
   supabase/migrations/20251215_fix_daily_credits_default.sql
   ```
5. Click **Run**
6. You should see: "Success. No rows returned"

### Option 2: Using Supabase CLI

```bash
# Make sure you're in the project directory
cd /path/to/random-prompts-generator

# Apply the migration
supabase db push

# Or apply specific migration
supabase db execute --file supabase/migrations/20251215_fix_daily_credits_default.sql
```

---

## What the Migration Does

1. **Fixes Existing Users**:
   - Finds users with `daily_credits_reset_at` within last 24 hours
   - Sets it to 25 hours ago
   - They immediately get 1 credit

2. **Fixes New Users**:
   - Changes table default from `NOW()` to `NULL`
   - New signups will have `NULL` timestamp
   - NULL = never used = 1 free credit available

3. **Updates Documentation**:
   - Adds clear comment explaining the logic

---

## Testing After Migration

### Test 1: Check Your Current Credits

1. Log into your site
2. You should see: **1 credit** (if you haven't used one in 24h)

### Test 2: Use a Credit

1. Generate YouTube content
2. Credits should drop to: **0 credits**
3. Timestamp gets set to NOW

### Test 3: Wait 24 Hours

1. Come back after 24 hours
2. Credits should reset to: **1 credit**

### Test 4: New User Signup

1. Create a test account
2. Should immediately have: **1 credit**
3. No generation needed to get the credit

---

## How the System Works Now

### Credit States:

| State | `daily_credits_reset_at` | Credits Shown |
|-------|-------------------------|---------------|
| New user (never used) | `NULL` | 1 |
| Just used credit | `NOW()` | 0 |
| After 1 hour | `1 hour ago` | 0 |
| After 24+ hours | `25 hours ago` | 1 (reset!) |
| Has purchased credits | any value | daily + purchased |
| Pro user | any value | Unlimited |

### Credit Deduction Logic:

1. Check if daily credit available:
   - `NULL` = Yes (never used)
   - `>= 24 hours ago` = Yes (reset)
   - `< 24 hours ago` = No (used recently)

2. If daily credit available:
   - Use it
   - Set `daily_credits_reset_at` to NOW
   - Done

3. If no daily credit:
   - Try to use purchased credit
   - Deduct 1 from `purchased_credits`
   - Done

4. If no credits at all:
   - Show error
   - Prompt to upgrade or buy credits

---

## Verification Queries

Run these in SQL Editor to verify:

### Check All Users' Credit Status

```sql
SELECT
  id,
  email,
  is_pro,
  purchased_credits,
  daily_credits_reset_at,
  CASE
    WHEN is_pro THEN 'Unlimited (Pro)'
    WHEN daily_credits_reset_at IS NULL THEN '1 (never used)'
    WHEN (EXTRACT(EPOCH FROM (NOW() - daily_credits_reset_at)) / 3600) >= 24 THEN '1 (reset available)'
    ELSE '0 (used within 24h)'
  END as daily_credit_status,
  CASE
    WHEN is_pro THEN 999999
    WHEN daily_credits_reset_at IS NULL THEN 1 + COALESCE(purchased_credits, 0)
    WHEN (EXTRACT(EPOCH FROM (NOW() - daily_credits_reset_at)) / 3600) >= 24 THEN 1 + COALESCE(purchased_credits, 0)
    ELSE COALESCE(purchased_credits, 0)
  END as total_credits
FROM auth.users
JOIN profiles ON profiles.id = auth.users.id
ORDER BY created_at DESC;
```

### Check Default Value

```sql
SELECT column_name, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name = 'daily_credits_reset_at';
```

Should show: `NULL` (not `now()`)

---

## Rollback (If Needed)

If something goes wrong, you can rollback:

```sql
-- Rollback to old default
ALTER TABLE profiles
ALTER COLUMN daily_credits_reset_at SET DEFAULT NOW();

-- Reset all users to old state
UPDATE profiles
SET daily_credits_reset_at = NOW() - INTERVAL '25 hours'
WHERE is_pro = FALSE;
```

---

## Next Steps

1. ✅ Apply the migration (Option 1 or 2 above)
2. ✅ Deploy the updated code (already committed)
3. ✅ Test with your account
4. ✅ Monitor for issues
5. ✅ Celebrate working credits! 🎉

---

**Questions?** Check the credit functions in:
- `src/lib/supabase.ts` - `checkUserCredits()` and `deductCredit()`
- `supabase/migrations/20251215_fix_daily_credits_default.sql` - Migration
