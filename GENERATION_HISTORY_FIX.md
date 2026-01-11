# Generation History Not Showing - Complete Fix Guide

## Problem
After generating content from YouTube videos, the generations aren't appearing in your account history.

## Root Causes Identified & Fixed

### 1. ✅ FIXED: Database Field Name Mismatch
**Issue**: Code was using wrong database column names
- Code was trying to save to `tool_id` and `output`
- Database expects `type` and `output_content`

**Fix**: Updated `src/lib/supabase.ts` saveGeneration() function to use correct field names.

### 2. ✅ FIXED: Workflow API Missing Generation Saving
**Issue**: Workflow API wasn't saving generations to history
**Fix**: Added saveGeneration() calls to run-workflow.ts

### 3. ❓ POSSIBLE: Database Table Doesn't Exist
**Issue**: The `generations` table might not exist in your Supabase database yet
**Fix**: Run the database migration (see below)

## Step-by-Step Fix

### Step 1: Run Database Migration

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**
3. **Click "SQL Editor"** in the left sidebar
4. **Click "New Query"**
5. **Copy and paste** the contents of `DATABASE_MIGRATION.sql`
6. **Click "Run"** (or press Cmd/Ctrl + Enter)

**Expected Output**:
```
Success. No rows returned
```

This migration will:
- ✅ Create the `generations` table if it doesn't exist
- ✅ Add missing columns to `profiles` table
- ✅ Set up correct indexes for performance
- ✅ Configure Row Level Security (RLS) policies
- ✅ Grant necessary permissions

### Step 2: Verify Database Setup

After running the migration, run this debug endpoint:

1. **Make sure you're logged in** to your app
2. **Visit**: `https://your-domain.com/api/debug/generations`
   - Example: `https://randomprompts.org/api/debug/generations`

**Expected Response**:
```json
{
  "success": true,
  "debug": {
    "diagnosis": {
      "tableExists": "✅ YES",
      "hasGenerations": "❌ NO",  // Will be NO initially
      "message": "Table exists but no generations saved yet..."
    }
  }
}
```

If you see `tableExists: "❌ NO"`, the migration didn't run successfully. Check Supabase SQL Editor for errors.

### Step 3: Test Generation Saving

1. **Go to any YouTube tool** on your website
   - Example: `/tools/youtube-blog-post-generator`
2. **Enter a YouTube URL** (use a video with captions)
   - Good test video: `https://www.youtube.com/watch?v=UF8uR6Z6KLc` (TED Talk)
3. **Fill in other required fields**
4. **Click "Generate"**
5. **Wait for generation to complete**

### Step 4: Check If It Saved

**Option A: Visit debug endpoint again**
```
https://your-domain.com/api/debug/generations
```

Look for:
```json
{
  "diagnosis": {
    "hasGenerations": "✅ YES",
    "yourGenerationsCount": 1
  },
  "database": {
    "recentGenerations": [...]  // Should see your generation here
  }
}
```

**Option B: Check Account History**
1. Go to `/account/history`
2. You should see your recent generation listed

## Troubleshooting

### Issue: Debug endpoint returns 401 Unauthorized
**Solution**: You're not logged in. Sign in first, then try again.

### Issue: Debug shows "Table does not exist"
**Solution**:
1. Go back to Supabase SQL Editor
2. Run the `DATABASE_MIGRATION.sql` again
3. Check for any error messages in red
4. If you see errors about permissions, make sure you're connected to the right project

### Issue: Table exists but generations still don't show up
**Possible Causes**:
1. **RLS Policy Issue**: Service role might not have proper access
   - Check in Supabase: Authentication > Policies
   - Should see policies for `generations` table

2. **Code Still Has Errors**:
   - Check browser console for JavaScript errors
   - Check Vercel/hosting logs for API errors

3. **Old Deployment**: Code changes not deployed
   - If using Vercel, check latest deployment has your fixes
   - Redeploy if necessary

### Issue: Generations save but don't display in UI
**Check**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit `/account/history`
4. Look for request to `/api/account/recent-activity`
5. Check the response - does it include your generations?

If response is empty but debug endpoint shows generations exist:
- Clear browser cache
- Hard refresh (Cmd/Ctrl + Shift + R)
- Try incognito/private window

## How to Verify Everything Works

### ✅ Checklist:

- [ ] Database migration completed successfully
- [ ] Debug endpoint shows `tableExists: "✅ YES"`
- [ ] Generated content from a YouTube video
- [ ] Debug endpoint shows `hasGenerations: "✅ YES"`
- [ ] Generation appears at `/account/history`
- [ ] Generation appears on `/account` dashboard (recent activity)

## Database Schema Reference

### Generations Table Structure:
```sql
CREATE TABLE generations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,              -- Tool identifier (e.g., 'youtube-blog-post-generator')
  input_context JSONB NOT NULL,    -- Input parameters
  output_content TEXT NOT NULL,    -- Generated content
  video_title TEXT,                -- Optional: YouTube video title
  tokens_used INTEGER,             -- Optional: LLM tokens
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Profiles Table (Credit Fields):
```sql
ALTER TABLE profiles ADD COLUMN:
  - monthly_credits INTEGER DEFAULT 0
  - purchased_credits INTEGER DEFAULT 10
  - monthly_credits_reset_at TIMESTAMPTZ
  - pro_plan_type TEXT  -- 'monthly' or 'yearly'
  - daily_credits_reset_at TIMESTAMPTZ
```

## Code Changes Summary

### Files Modified:
1. **src/lib/supabase.ts** - Fixed saveGeneration() field names
2. **src/pages/api/run-workflow.ts** - Added auth, credits, and saving
3. **src/pages/api/account/recent-activity.ts** - Fixed field mapping
4. **src/pages/api/account/analytics.ts** - Fixed field references
5. **src/pages/api/admin/activity.ts** - Fixed field references

### Files Added:
1. **DATABASE_MIGRATION.sql** - Database setup script
2. **src/pages/api/debug/generations.ts** - Debug endpoint
3. **GENERATION_HISTORY_FIX.md** - This guide

## Still Having Issues?

### Check Logs:

**Supabase Logs**:
1. Go to Supabase Dashboard
2. Click "Logs" > "API Logs"
3. Look for errors related to `generations` table
4. Filter by your user ID

**Vercel Logs** (if using Vercel):
1. Go to Vercel Dashboard
2. Select your project
3. Click "Logs" or "Functions"
4. Look for `/api/run-tool` or `/api/run-workflow` calls
5. Check for error messages

### Manual Database Check:

Run this in Supabase SQL Editor:
```sql
-- Check if table exists
SELECT * FROM generations LIMIT 10;

-- Count your generations
SELECT COUNT(*) FROM generations WHERE user_id = 'YOUR-USER-ID';

-- View recent generations
SELECT id, type, video_title, created_at
FROM generations
WHERE user_id = 'YOUR-USER-ID'
ORDER BY created_at DESC;
```

Replace `'YOUR-USER-ID'` with your actual user ID from the debug endpoint.

## Success Indicators

✅ **Everything is working if you see**:
1. Generations table exists in Supabase
2. New rows appear in `generations` table after each generation
3. `/account/history` page shows your generations
4. `/account` dashboard shows recent activity
5. No errors in browser console
6. No errors in server logs

---

**Last Updated**: 2026-01-11
**Status**: Ready to Deploy
