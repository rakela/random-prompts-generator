# Pre-Merge Testing Checklist

**Branch:** `claude/youtube-content-generator-01YbuqQeArKmTrvzyr1zHQUa`
**Target:** `main`
**Date:** December 5, 2025

---

## ✅ Environment Setup Verification

### Step 1: Environment Variables

Check that your `.env` file has all required variables:

```bash
# Run this command to check which variables are set:
grep -E "^(PUBLIC_SUPABASE|SUPABASE|PAYPAL|ADMIN_API)" .env | sed 's/=.*/=***/'
```

**Required Variables:**
- [ ] `PUBLIC_SUPABASE_URL` (or `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL`)
- [ ] `PUBLIC_SUPABASE_ANON_KEY` (or `SUPABASE_ANON_KEY` / `SUPABASE_PUBLISHABLE_KEY`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `PAYPAL_CLIENT_ID`
- [ ] `PAYPAL_CLIENT_SECRET`
- [ ] `PAYPAL_MODE` (should be `sandbox` for testing)
- [ ] `PUBLIC_PAYPAL_CLIENT_ID` (same as `PAYPAL_CLIENT_ID`)
- [ ] `ADMIN_API_KEY` (generate if missing: `openssl rand -base64 32`)
- [ ] `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`)

### Step 2: Database Setup

Run the Supabase SQL schema if you haven't already:

- [ ] **SQL Schema Executed:**
  - Go to Supabase Dashboard → SQL Editor
  - Run the schema from `IMPLEMENTATION_GUIDE.md` (lines 56-177)
  - Tables created: `profiles`, `generations`
  - Triggers created: `on_auth_user_created`
  - RLS policies enabled

- [ ] **Verify Tables Exist:**
  ```sql
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'generations');
  ```
  Should return 2 rows

### Step 3: Dependencies

- [ ] **Install Dependencies:**
  ```bash
  npm install
  ```

- [ ] **Verify PayPal SDK:**
  ```bash
  npm list | grep paypal
  ```
  Should show `@paypal/checkout-server-sdk`

---

## 🧪 Functional Testing

### Test 1: Build & Start

- [ ] **Build succeeds:**
  ```bash
  npm run build
  ```
  Expected: No errors, build completes successfully

- [ ] **Dev server starts:**
  ```bash
  npm run dev
  ```
  Expected: Server starts on http://localhost:4321

### Test 2: Authentication Flow

- [ ] **Signup Flow:**
  1. Visit http://localhost:4321
  2. Click "Sign In" button (if you have it)
  3. Create a new account with test email
  4. Expected: Email confirmation sent (check Supabase Auth → Users)

- [ ] **Verify User in Database:**
  ```sql
  SELECT id, email, credits, is_pro FROM profiles ORDER BY created_at DESC LIMIT 1;
  ```
  Expected: New user with `credits = 1`, `is_pro = false`

- [ ] **Sign In:**
  1. Sign in with test account
  2. Expected: Redirects to homepage or dashboard
  3. Check browser localStorage for Supabase session

### Test 3: Free Credit Generation

- [ ] **First Generation (1 credit):**
  1. Sign in as test user
  2. Go to any YouTube tool
  3. Enter a valid YouTube URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
  4. Click "Generate"
  5. Expected:
     - Generation succeeds
     - Content displayed
     - Credits decrease from 1 → 0

- [ ] **Verify in Database:**
  ```sql
  SELECT credits FROM profiles WHERE email = 'your-test-email@example.com';
  SELECT COUNT(*) FROM generations WHERE user_id = (SELECT id FROM profiles WHERE email = 'your-test-email@example.com');
  ```
  Expected: `credits = 0`, `generations count = 1`

- [ ] **Second Generation (out of credits):**
  1. Try to generate again
  2. Expected: Error message "You have no credits remaining. Please upgrade to Pro."
  3. Redirect to `/upgrade` page

### Test 4: PayPal Payment (Sandbox)

- [ ] **Upgrade Page Loads:**
  1. Visit http://localhost:4321/upgrade
  2. Expected: PayPal button visible
  3. Check browser console for errors

- [ ] **PayPal Button Click:**
  1. Click PayPal button
  2. Expected: PayPal popup opens (sandbox mode)
  3. If error: Check `PAYPAL_CLIENT_ID` and `PUBLIC_PAYPAL_CLIENT_ID` match

- [ ] **Complete Sandbox Payment:**
  1. Use PayPal sandbox test account:
     - Email: (from PayPal Developer Dashboard → Sandbox → Accounts → Personal)
     - Password: (from same page)
  2. Complete payment
  3. Expected:
     - Success message appears
     - Redirects to dashboard after 2 seconds

- [ ] **Verify Pro Upgrade in Database:**
  ```sql
  SELECT is_pro, pro_until, payment_method FROM profiles
  WHERE email = 'your-test-email@example.com';
  ```
  Expected: `is_pro = true`, `pro_until = [future date]`, `payment_method = 'paypal'`

- [ ] **Test Pro Generation:**
  1. Go to any YouTube tool
  2. Generate content
  3. Expected: Works without credit deduction
  4. Check database: `credits` should still be 0 (Pro users don't use credits)

### Test 5: Admin API

- [ ] **Manual User Upgrade:**
  ```bash
  curl -X POST http://localhost:4321/api/admin/upgrade-user \
    -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "another-user@example.com",
      "duration_months": 1,
      "payment_method": "manual"
    }'
  ```
  Expected: `{"success": true, ...}`

- [ ] **Verify Admin Upgrade:**
  ```sql
  SELECT is_pro, pro_until, payment_method FROM profiles
  WHERE email = 'another-user@example.com';
  ```
  Expected: `is_pro = true`, `payment_method = 'manual'`

### Test 6: Error Handling

- [ ] **Unauthenticated API Call:**
  ```bash
  curl -X POST http://localhost:4321/api/run-tool \
    -H "Content-Type: application/json" \
    -d '{"tool_id": "test", "inputs": {}}'
  ```
  Expected: `{"success": false, "requiresAuth": true}`

- [ ] **Out of Credits:**
  1. Create new user (gets 1 free credit)
  2. Use the credit
  3. Try to generate again
  4. Expected: `{"success": false, "requiresUpgrade": true}`

- [ ] **Invalid Admin API Key:**
  ```bash
  curl -X POST http://localhost:4321/api/admin/upgrade-user \
    -H "Authorization: Bearer invalid-key" \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com"}'
  ```
  Expected: `401 Unauthorized`

---

## 🔒 Security Verification

- [ ] **Environment Variables Not Exposed:**
  1. Build for production: `npm run build`
  2. Check built files: `grep -r "SUPABASE_SERVICE_ROLE_KEY" dist/`
  3. Expected: No matches (private keys should not be in client bundle)

- [ ] **`.env` Not Committed:**
  ```bash
  git status
  ```
  Expected: `.env` should NOT appear in git status

- [ ] **`.gitignore` Includes `.env`:**
  ```bash
  grep "^\.env$" .gitignore
  ```
  Expected: Should match

- [ ] **RLS Policies Active:**
  ```sql
  SELECT tablename, policyname FROM pg_policies
  WHERE schemaname = 'public' AND tablename IN ('profiles', 'generations');
  ```
  Expected: Multiple rows (RLS policies for both tables)

- [ ] **Test RLS Isolation:**
  1. Create two test users
  2. User A generates content
  3. Sign in as User B
  4. Try to query User A's generations via API
  5. Expected: Cannot access other user's data

---

## 📊 Performance & Monitoring

- [ ] **API Response Times:**
  - `/api/run-tool` (with auth): < 5s for typical generation
  - `/api/paypal/create-order`: < 2s
  - `/api/paypal/capture-order`: < 3s

- [ ] **Database Queries:**
  ```sql
  -- Check for missing indexes
  SELECT schemaname, tablename, indexname
  FROM pg_indexes
  WHERE schemaname = 'public' AND tablename IN ('profiles', 'generations');
  ```
  Expected: Indexes on `user_id`, `email`, `created_at`, `pro_until`

- [ ] **Error Logs:**
  - Check browser console: No JavaScript errors on `/upgrade`
  - Check server logs: No unexpected errors during payment flow

---

## 🌐 Cross-Browser Testing (Optional)

- [ ] **Chrome/Edge:** PayPal button renders correctly
- [ ] **Safari:** PayPal button renders correctly (Apple Pay may appear)
- [ ] **Firefox:** PayPal button renders correctly
- [ ] **Mobile Safari (iOS):** Apple Pay button appears

---

## 📝 Documentation Review

- [ ] **IMPLEMENTATION_GUIDE.md** is up to date
- [ ] **PAYPAL_SETUP.md** has correct instructions
- [ ] **.env.example** has all required variables
- [ ] **README** mentions new features (if applicable)

---

## 🚀 Pre-Merge Final Checks

### Code Quality

- [ ] **No TypeScript Errors:**
  ```bash
  npx tsc --noEmit
  ```
  Expected: No errors (if tsconfig exists)

- [ ] **No Linting Errors:**
  ```bash
  npm run lint
  ```
  Expected: No critical errors

- [ ] **Code Review:**
  - All new files reviewed
  - No hardcoded secrets
  - No console.logs in production code (except intentional logging)
  - Error handling in place

### Git

- [ ] **All Changes Committed:**
  ```bash
  git status
  ```
  Expected: Working tree clean

- [ ] **Descriptive Commit Messages:**
  ```bash
  git log --oneline -10
  ```
  Expected: Clear, descriptive messages

- [ ] **Branch Up to Date:**
  ```bash
  git fetch origin
  git log main..HEAD
  ```
  Check if there are conflicts with main

### Deployment Readiness

- [ ] **Environment Variables Documented:**
  - All required vars in `.env.example`
  - Clear instructions in `IMPLEMENTATION_GUIDE.md`

- [ ] **Migration Path:**
  - SQL schema provided for new installations
  - No breaking changes for existing users

- [ ] **Rollback Plan:**
  - Can revert to previous version if needed
  - No destructive database migrations

---

## 📋 Test Results Summary

Fill this out after testing:

**Date Tested:** _______________
**Tested By:** _______________

### Results:

- [ ] All tests passed ✅
- [ ] Some tests failed ❌ (list below)
- [ ] Blockers found 🚫 (describe below)

**Failed Tests / Issues Found:**
```
1.
2.
3.
```

**Resolution:**
```
1.
2.
3.
```

---

## ✅ Final Approval

- [ ] All tests passed
- [ ] Documentation complete
- [ ] Security verified
- [ ] No blockers
- [ ] Ready to merge to `main`

**Approved By:** _______________
**Date:** _______________

---

## 🔄 Merge Instructions

Once all tests pass:

1. **Merge to main:**
   ```bash
   git checkout main
   git merge claude/youtube-content-generator-01YbuqQeArKmTrvzyr1zHQUa
   git push origin main
   ```

2. **Tag the release (optional):**
   ```bash
   git tag -a v1.0.0-auth -m "Add authentication, credits, and PayPal payments"
   git push origin v1.0.0-auth
   ```

3. **Deploy to production** (if applicable)

4. **Monitor:**
   - Check error logs
   - Monitor first few real payments
   - Verify auth flow works in production

---

## 🆘 Troubleshooting

Common issues and solutions:

**PayPal Button Not Showing:**
- Check `PUBLIC_PAYPAL_CLIENT_ID` is set
- Check browser console for errors
- Verify PayPal SDK loads: `console.log(window.paypal)`

**Database Connection Errors:**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check Supabase project is not paused
- Test connection in Supabase Dashboard

**Build Failures:**
- Clear cache: `rm -rf .astro node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

**Auth Errors:**
- Verify Supabase email auth is enabled
- Check RLS policies are correct
- Verify session tokens in localStorage

---

For detailed setup instructions, see:
- `IMPLEMENTATION_GUIDE.md` - Full implementation guide
- `PAYPAL_SETUP.md` - PayPal integration guide
- `.env.example` - Environment variable reference
