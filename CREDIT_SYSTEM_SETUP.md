# Credit System & Feature Implementation Guide

This guide covers all the changes made and steps required to complete the setup.

## 🎉 What's Been Implemented

### ✅ Batch 1: Menu & Navigation Reorganization
- Created `UserMenu.tsx` component with authentication state management
- Reorganized header with "Creative Prompts" mega menu (750px width, 2-column layout)
- Added "Pricing" link to navigation
- Removed "Specialized Prompts" section from footer
- Mobile-responsive menu updates

### ✅ Batch 2-3: Credit System Backend
- **Database Schema** (`supabase/migrations/20251211_add_daily_credits.sql`):
  - Added `daily_credits_reset_at` timestamp field
  - Added `purchased_credits` integer field
  - Created PostgreSQL functions for credit management
  - Migration includes data migration for existing users

- **TypeScript Types** (`src/types/database.ts`):
  - Updated with new credit fields

- **Credit Management Functions** (`src/lib/supabase.ts`):
  - `checkUserCredits()` - Calculates total available credits (daily + purchased)
  - `deductCredit()` - Handles 24-hour daily reset logic
  - `addPurchasedCredits()` - Adds purchased credits to user account

- **PayPal Integration** (`src/pages/api/paypal/capture-order.ts`):
  - Extended to handle both subscriptions AND credit pack purchases
  - Automatically adds purchased credits to user account

### ✅ Batch 4: YouTube Tools UX
- **Enhanced ToolPage Component** (`src/components/ToolPage.tsx`):
  - Shows credit balance banner (different states for logged out, Pro, with credits, out of credits)
  - Auth check before generation (opens auth modal if not logged in)
  - Blocks generation when out of credits
  - Shows upgrade/purchase CTAs when depleted
  - Auto-decrements credits after successful generation

- **New API Endpoint** (`src/pages/api/check-credits.ts`):
  - GET endpoint to fetch user credits and Pro status
  - Used by frontend to display credit balance

### ✅ Batch 5: Google OAuth
- **Enhanced AuthModal** (`src/components/AuthModal.tsx`):
  - Added "Continue with Google" button
  - Official Google branding
  - OAuth flow integration

- **OAuth Callback** (`src/pages/auth/callback.astro`):
  - Handles OAuth redirects
  - Exchanges code for session
  - Redirects users back after authentication

## 🔧 Required Setup Steps

### 1. Apply Database Migration

Run the SQL migration in your Supabase database:

```bash
# Option A: Using Supabase CLI
supabase db push

# Option B: Manual application
# Copy contents of supabase/migrations/20251211_add_daily_credits.sql
# Execute in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
```

**What this migration does:**
- Adds new columns to `profiles` table
- Creates database functions for credit management
- Migrates existing user credits to the new system
- Sets up indexes for performance

### 2. Configure Google OAuth (Supabase Dashboard)

**Step 1: Get Google OAuth Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure consent screen
6. Create OAuth 2.0 Client ID (Application type: Web application)
7. Add authorized redirect URI: `https://[your-project-id].supabase.co/auth/v1/callback`
8. Copy Client ID and Client Secret

**Step 2: Configure in Supabase**
1. Navigate to your Supabase project dashboard
2. Go to "Authentication" → "Providers"
3. Find "Google" and click to configure
4. Toggle "Enable Sign in with Google"
5. Paste Client ID and Client Secret
6. Save changes

**Step 3: Update Auth Settings**
1. Go to "Authentication" → "URL Configuration"
2. Add your site URL (e.g., `https://randomprompts.org`)
3. Add redirect URLs:
   - `https://randomprompts.org/auth/callback`
   - `http://localhost:4321/auth/callback` (for development)

### 3. Verify Environment Variables

Ensure these are set in your `.env` file:

```bash
# Supabase
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_MODE=sandbox  # or 'production'
```

### 4. Test the Credit System

**Test Flow:**
1. **Sign Up / Sign In**
   - Test email/password signup
   - Test Google OAuth sign in
   - Verify session persists across page refreshes

2. **Check Credits**
   - New user should have 1 credit available
   - Navigate to a YouTube tool page
   - Verify credit banner shows "1 Credit Remaining"

3. **Generate Content**
   - Fill in form on YouTube tool page
   - Click "Generate Content"
   - Verify generation succeeds
   - Verify credit count decrements to 0

4. **Out of Credits Flow**
   - After using credit, banner should show "Out of Credits"
   - Should display upgrade/purchase CTAs
   - Click "Generate" button → should show error message

5. **Daily Reset**
   - Wait 24 hours OR manually update `daily_credits_reset_at` in database:
     ```sql
     UPDATE profiles
     SET daily_credits_reset_at = NOW() - INTERVAL '25 hours'
     WHERE email = 'test@example.com';
     ```
   - Refresh page → should show 1 credit available again

6. **Purchase Credits**
   - Navigate to `/buy-credits`
   - Select a credit pack
   - Complete PayPal payment (in sandbox mode)
   - Verify credits added to account
   - Verify can generate content

7. **Pro Subscription**
   - Navigate to `/upgrade`
   - Complete PayPal payment
   - Verify "Pro Plan - Unlimited Generations" banner appears
   - Verify can generate without limit

## 📊 Credit System Logic

### How Credits Work

**Free Users:**
- Get 1 credit every 24 hours (daily reset)
- Reset time tracked per user via `daily_credits_reset_at`
- Can purchase additional credits that never expire

**Credit Deduction Order:**
1. First: Use daily credit (if available, i.e., 24+ hours since last reset)
2. Then: Use purchased credits
3. Pro users: Skip deduction entirely (unlimited)

**Calculation:**
```typescript
const hoursSinceReset = (now - daily_credits_reset_at) / 3600;
const dailyCredit = hoursSinceReset >= 24 ? 1 : 0;
const totalCredits = dailyCredit + purchased_credits;
```

### Database Schema

```sql
profiles table:
  - daily_credits_reset_at: timestamp  -- When daily credit was last given
  - purchased_credits: integer         -- Credits bought separately
  - is_pro: boolean                    -- Pro subscription status
  - pro_until: timestamp               -- Pro expiration date
```

## 🎨 UI/UX States

### ToolPage Credit Banners

**1. Not Logged In (Blue)**
- Icon: Lock
- Message: "Sign in required"
- CTA: "Sign In" button → Opens auth modal

**2. Pro User (Purple Gradient)**
- Icon: Zap
- Message: "Pro Plan - Unlimited Generations"
- No CTA needed

**3. Has Credits (Green)**
- Icon: CreditCard
- Message: "X Credits Remaining"
- CTA: "View Plans →" link

**4. Out of Credits (Orange)**
- Icon: AlertCircle
- Message: "Out of Credits"
- CTAs: "Upgrade to Pro" + "Buy Credits" buttons

## 🔍 Troubleshooting

### Credits Not Resetting
**Issue:** User still shows 0 credits after 24 hours

**Solutions:**
1. Check `daily_credits_reset_at` value in database
2. Verify system time is correct
3. Check credit calculation logic in `checkUserCredits()`

**Debug Query:**
```sql
SELECT
  id,
  email,
  daily_credits_reset_at,
  purchased_credits,
  EXTRACT(EPOCH FROM (NOW() - daily_credits_reset_at)) / 3600 as hours_since_reset
FROM profiles
WHERE email = 'user@example.com';
```

### Google OAuth Not Working
**Issue:** OAuth redirect fails or user not authenticated

**Solutions:**
1. Verify Google OAuth credentials in Supabase dashboard
2. Check redirect URI matches exactly: `https://[project-id].supabase.co/auth/v1/callback`
3. Ensure site URL is configured in Supabase Auth settings
4. Check browser console for errors
5. Verify Google OAuth consent screen is published (not in testing mode)

### PayPal Credit Purchase Not Adding Credits
**Issue:** Payment succeeds but credits not added

**Solutions:**
1. Check server logs for errors in `/api/paypal/capture-order`
2. Verify `purchaseType: 'credits'` is sent in request body
3. Check `addPurchasedCredits()` function executed successfully
4. Query database to verify credits were added

**Debug:**
```sql
SELECT email, purchased_credits, updated_at
FROM profiles
WHERE email = 'user@example.com'
ORDER BY updated_at DESC;
```

### Auth Modal Not Opening
**Issue:** Click "Generate" but nothing happens

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify AuthModal component is included in layout
3. Check custom event listener: `window.addEventListener('openAuthModal', ...)`
4. Ensure Supabase config is properly passed to AuthModal

## 📝 API Endpoints Reference

### GET /api/check-credits
**Description:** Returns user's current credit balance

**Auth:** Required (Bearer token)

**Response:**
```json
{
  "credits": 5,
  "isPro": false,
  "canGenerate": true
}
```

### POST /api/paypal/capture-order
**Description:** Captures PayPal payment and adds credits or upgrades account

**Auth:** Required

**Request Body:**
```json
{
  "orderId": "paypal_order_id",
  "purchaseType": "credits",  // or "subscription"
  "credits": 10,              // for credit purchases
  "plan": "monthly"           // for subscriptions
}
```

**Response (Credits):**
```json
{
  "success": true,
  "message": "Payment successful! 10 credits have been added to your account.",
  "credits": 10
}
```

**Response (Subscription):**
```json
{
  "success": true,
  "message": "Payment successful! Your account has been upgraded to Pro.",
  "proUntil": "2025-01-11T..."
}
```

## 🚀 Next Steps

1. **Apply the database migration** (most important!)
2. **Configure Google OAuth** in Supabase dashboard
3. **Test the complete flow** end-to-end
4. **Monitor logs** for any errors during initial rollout
5. **Consider adding:**
   - Email notifications when credits run out
   - Credit usage analytics dashboard
   - Referral system for bonus credits
   - Promo codes for free credits

## 📊 Monitoring Recommendations

### Key Metrics to Track
- Daily active users
- Credit usage patterns
- Conversion rate (free → Pro)
- Credit pack purchases
- Daily credit reset effectiveness

### Database Queries for Analytics

**Credit usage over time:**
```sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as generations,
  COUNT(DISTINCT user_id) as unique_users
FROM generations
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

**Pro conversion rate:**
```sql
SELECT
  COUNT(*) FILTER (WHERE is_pro = true) * 100.0 / COUNT(*) as pro_percentage,
  COUNT(*) FILTER (WHERE is_pro = true) as pro_users,
  COUNT(*) as total_users
FROM profiles;
```

**Credit pack revenue:**
```sql
SELECT
  SUM(purchased_credits) as total_credits_sold,
  COUNT(DISTINCT id) FILTER (WHERE purchased_credits > 0) as users_who_bought
FROM profiles;
```

## 💡 Tips

- **Free tier is generous:** 1 credit/day allows users to test the service
- **Clear upgrade path:** Prominent CTAs when credits run out drive conversions
- **Pro vs Credits:** Pro is better for power users, credits for occasional use
- **Daily reset:** Keeps free users engaged without overwhelming the system
- **Google OAuth:** Reduces friction in sign-up process

## 🆘 Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review server logs for errors
3. Check Supabase dashboard for auth/database errors
4. Verify environment variables are set correctly

For questions specific to this implementation, refer to the commit messages which contain detailed explanations of each change.
