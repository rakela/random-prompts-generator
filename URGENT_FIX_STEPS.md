# 🚨 URGENT: Fix Generation History - Step by Step

## Problem Identified
Your database is **missing critical columns** in the `profiles` table. This causes the credit check to fail, which prevents generations from being saved.

**Missing Columns**:
- `monthly_credits` - Tracks Monthly Pro credits (200/month)
- `monthly_credits_reset_at` - 30-day reset timestamp
- `pro_plan_type` - Distinguishes 'monthly' vs 'yearly' Pro

---

## ✅ Fix Steps (5 minutes)

### Step 1: Add Missing Columns (REQUIRED)

1. Go to: **https://supabase.com/dashboard**
2. Select your project
3. Click **"SQL Editor"** (left sidebar)
4. Click **"New Query"**
5. Copy **ALL contents** from `ADD_MISSING_COLUMNS.sql`
6. Paste into SQL Editor
7. Click **"Run"** (or Cmd/Ctrl + Enter)

**Expected Output**:
```
column_name                | data_type
---------------------------+-----------------------------
purchased_credits          | integer
monthly_credits            | integer
monthly_credits_reset_at   | timestamp with time zone
pro_plan_type              | text
```

✅ If you see all 4 columns, SUCCESS!

---

### Step 2: Verify RLS Policies (RECOMMENDED)

RLS (Row Level Security) policies control who can read/write to the database.

1. In Supabase SQL Editor, create **another new query**
2. Copy contents from `CHECK_RLS_POLICIES.sql`
3. Run it

**Expected Output**:
```
policyname                        | operation
----------------------------------+-----------
Users can view own generations    | SELECT
Users can insert own generations  | INSERT
```

✅ If you see these 2 policies, RLS is configured correctly!

---

### Step 3: Test Generation Saving

Now let's test if saving works:

1. **Make sure you're logged in** to your app
2. **Visit** (while logged in):
   ```
   POST https://your-domain.com/api/debug/test-save
   ```

**How to test**:

**Option A: Using curl (Terminal)**
```bash
# Replace YOUR_ACCESS_TOKEN with your actual token
curl -X POST https://your-domain.com/api/debug/test-save \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Option B: Using browser console (Easier)**
1. Visit your website while logged in
2. Open DevTools (F12)
3. Go to Console tab
4. Paste this:
```javascript
fetch('/api/debug/test-save', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + (await (await fetch('/api/check-credits')).json())
  }
}).then(r => r.json()).then(console.log)
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Test generation saved successfully!",
  "instructions": [...]
}
```

✅ If success = true, generation saving is working!

---

### Step 4: Verify It Saved

Visit: `/api/debug/generations` (while logged in)

**Should show**:
```json
{
  "debug": {
    "database": {
      "yourGenerationsCount": 1,
      "recentGenerations": [
        {
          "type": "test-generation",
          "output_content": "Test generation created at..."
        }
      ]
    },
    "diagnosis": {
      "hasGenerations": "✅ YES"
    }
  }
}
```

✅ If you see the test generation, **IT'S WORKING!**

---

### Step 5: Test Real Generation

1. Go to `/tools/youtube-blog-post-generator`
2. Enter this test video: `https://www.youtube.com/watch?v=UF8uR6Z6KLc`
3. Fill in other fields
4. Click **"Generate"**
5. Wait for completion
6. Go to `/account/history`

✅ Your generation should appear!

---

## 🔍 Troubleshooting

### Error: "column 'monthly_credits' does not exist"
→ Step 1 didn't complete. Run `ADD_MISSING_COLUMNS.sql` again.

### Error: "permission denied for table profiles"
→ You're not connected to the right Supabase project. Check project dropdown.

### Test save fails with "Failed to save generation"
**Check the error details**. Common causes:

1. **Missing columns** → Run Step 1 again
2. **RLS blocking** → Run Step 2 to fix policies
3. **Service role key missing** → Check `.env` has `SUPABASE_SERVICE_ROLE_KEY`

### Test save succeeds but nothing in history
**Possible causes**:

1. **Browser cache** → Hard refresh (Cmd/Ctrl + Shift + R)
2. **Old deployment** → If using Vercel, redeploy
3. **RLS blocking read** → Run Step 2

---

## 📋 Quick Checklist

- [ ] Ran `ADD_MISSING_COLUMNS.sql` in Supabase
- [ ] Verified 4 columns exist (monthly_credits, monthly_credits_reset_at, pro_plan_type, purchased_credits)
- [ ] Ran `CHECK_RLS_POLICIES.sql` (optional but recommended)
- [ ] Tested with `/api/debug/test-save` - got success
- [ ] Verified test generation appears in `/api/debug/generations`
- [ ] Generated real content from YouTube tool
- [ ] Checked `/account/history` - generation appears

---

## Why This Happened

The code was updated to support a 3-tier credit system:
- **Free**: Uses `purchased_credits` only
- **Monthly Pro**: Uses `monthly_credits` (200/month) + `purchased_credits`
- **Yearly Pro**: Unlimited (tracked via `pro_plan_type`)

But your database still had the old schema with only `purchased_credits`. The credit check tried to read `monthly_credits` and `pro_plan_type`, failed, and prevented generation.

---

## After Fixing

Once you complete Steps 1-3, **everything will work**:

✅ Generations save to database
✅ History shows in `/account/history`
✅ Recent activity displays on dashboard
✅ Analytics track your usage
✅ Credits deduct properly
✅ Admin dashboard shows all generations

---

## Need Help?

1. **Check Supabase logs**:
   - Supabase Dashboard → Logs → API Logs
   - Look for errors related to `profiles` or `generations`

2. **Check browser console**:
   - F12 → Console tab
   - Look for red errors

3. **Check server logs**:
   - If using Vercel: Dashboard → Functions → Logs
   - Look for `[saveGeneration]` or `[checkUserCredits]` errors

---

**Last Updated**: 2026-01-11
**Status**: Ready to Fix
