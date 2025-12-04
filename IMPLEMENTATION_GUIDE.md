# Implementation Guide: Authentication, Credits & History

## ✅ What's Been Implemented (Backend Complete)

### 1. Database Schema & Types
- **SQL Schema**: Complete Supabase schema with `profiles` and `generations` tables
- **TypeScript Types**: Type-safe database operations via `src/types/database.ts`
- **RLS Policies**: Row-level security ensuring users only access their own data
- **Triggers**: Auto-create profile on user signup

### 2. Supabase Client Utilities (`src/lib/supabase.ts`)
- ✅ `createBrowserClient()` - For client-side auth and queries
- ✅ `createServerClient()` - For API routes
- ✅ `createAdminClient()` - For privileged operations (bypass RLS)
- ✅ `getUserFromRequest()` - Extract user from JWT token
- ✅ `checkUserCredits()` - Verify user can generate content
- ✅ `deductCredit()` - Deduct 1 credit from non-Pro users
- ✅ `saveGeneration()` - Store generation in history

### 3. Protected API Endpoint (`src/pages/api/run-tool.ts`)
Updated with 5-step flow:
1. **Authentication** - Require valid user session
2. **Credit Check** - Ensure user has credits or is Pro
3. **LLM Call** - Execute AI generation
4. **Credit Deduction** - Deduct 1 credit (if not Pro)
5. **History Save** - Store generation in database

Returns:
- `creditsRemaining: number` - Credits left (-1 = unlimited)
- `isPro: boolean` - Pro status
- `requiresAuth: boolean` - Auth error flag
- `requiresUpgrade: boolean` - Out of credits flag

### 4. Admin API Endpoint (`src/pages/api/admin/upgrade-user.ts`)
- ✅ Manual user upgrade endpoint
- ✅ Secure with ADMIN_API_KEY
- ✅ Set Pro status with expiration date
- ✅ Track payment method

### 5. Upgrade Page (`src/pages/upgrade.astro`)
- ✅ Pricing and features display
- ✅ Payment instructions (bank transfer, card, Apple Pay, etc.)
- ✅ FAQ section
- ✅ Contact information for payments

---

## 📋 What You Need to Do Next

### Step 1: Set Up Supabase

1. **Run SQL Schema**
   - Go to Supabase Dashboard → SQL Editor
   - Run this schema:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  credits INTEGER NOT NULL DEFAULT 1,
  is_pro BOOLEAN NOT NULL DEFAULT false,
  pro_until TIMESTAMPTZ,
  payment_method TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create generations table
CREATE TABLE IF NOT EXISTS generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  input_context JSONB NOT NULL,
  output_content TEXT NOT NULL,
  video_title TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_created_at ON generations(created_at DESC);
CREATE INDEX idx_profiles_pro_until ON profiles(pro_until);

-- Create trigger for auto-profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits, is_pro)
  VALUES (
    NEW.id,
    NEW.email,
    1,  -- Start with 1 free credit
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for generations
CREATE POLICY "Users can view own generations"
  ON generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Helper function for dashboard stats
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
  total_generations BIGINT,
  credits_remaining INTEGER,
  is_pro BOOLEAN,
  pro_until TIMESTAMPTZ,
  recent_generations JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(g.id) as total_generations,
    p.credits as credits_remaining,
    p.is_pro,
    p.pro_until,
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', g.id,
          'type', g.type,
          'video_title', g.video_title,
          'created_at', g.created_at
        ) ORDER BY g.created_at DESC
      )
      FROM (
        SELECT * FROM generations
        WHERE user_id = user_uuid
        ORDER BY created_at DESC
        LIMIT 10
      ) g
    ) as recent_generations
  FROM profiles p
  WHERE p.id = user_uuid
  GROUP BY p.credits, p.is_pro, p.pro_until;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and expire Pro subscriptions
CREATE OR REPLACE FUNCTION check_expired_pro()
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET is_pro = false
  WHERE is_pro = true
    AND pro_until IS NOT NULL
    AND pro_until < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

2. **Configure Environment Variables**
   Add to `.env`:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin API (generate a strong random key)
ADMIN_API_KEY=your-secure-random-key-here

# OpenAI (existing)
OPENAI_API_KEY=sk-xxx
```

3. **Enable Email Authentication**
   - Supabase Dashboard → Authentication → Providers
   - Enable Email provider
   - Configure email templates (optional)

4. **Set Up Cron Job (Optional)**
   - Supabase Dashboard → Database → Cron Jobs
   - Create a job to run `SELECT check_expired_pro()` daily
   - This automatically downgrades users when Pro expires

### Step 2: Configure Payment Methods

1. **Update `/src/pages/upgrade.astro`** with your payment details:
   - Replace `payments@yourdomain.com` with your actual email
   - Add your bank account details for bank transfers
   - Add your Venmo/Cash App/PayPal usernames
   - Update pricing if needed

2. **Set Up Payment Notification System**
   - Create a dedicated email for payments (e.g., `payments@yourdomain.com`)
   - Set up email alerts for incoming payment notifications
   - Use templates for quick responses

### Step 3: Manual User Upgrade Workflow

When a user pays and contacts you:

1. **Verify Payment**
   - Check bank account / payment app for received payment
   - Verify the amount matches ($9.99 or your pricing)

2. **Upgrade User via API**
   Use the admin endpoint to upgrade:

   ```bash
   curl -X POST https://yourdomain.com/api/admin/upgrade-user \
     -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "duration_months": 1,
       "payment_method": "bank_transfer"
     }'
   ```

   Or use this Node.js script:

   ```javascript
   // upgrade-user.js
   const ADMIN_API_KEY = 'your-admin-api-key';
   const API_URL = 'https://yourdomain.com/api/admin/upgrade-user';

   async function upgradeUser(email, months = 1, paymentMethod = 'manual') {
     const response = await fetch(API_URL, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${ADMIN_API_KEY}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email,
         duration_months: months,
         payment_method: paymentMethod
       })
     });

     const data = await response.json();
     console.log(data);
   }

   // Usage:
   upgradeUser('user@example.com', 1, 'bank_transfer');
   ```

3. **Notify User**
   Send a confirmation email:

   ```
   Subject: Your Pro Account is Active! 🎉

   Hi [User],

   Your Pro subscription has been activated! You now have:
   ✅ Unlimited AI generations
   ✅ Access to all YouTube tools
   ✅ Full generation history
   ✅ Priority support

   Your Pro access is valid until: [DATE]

   Start creating amazing content: https://yourdomain.com

   Questions? Reply to this email!

   Best,
   [Your Name]
   ```

### Step 4: Create Frontend Components

#### 4.1 Auth Component (`src/components/AuthModal.tsx`)

Create a React component for login/signup:

```tsx
import React, { useState } from 'react';
import { createBrowserClient } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

#### 4.2 Update Header Component

Add auth status and credits display to `src/components/AstroHeader.astro`:

```astro
---
// Add at the top of the script section
const user = Astro.locals.user; // We'll set this in middleware
---

<!-- Add to header, before existing nav -->
<div class="flex items-center gap-4">
  {user ? (
    <>
      <span class="text-sm">
        {user.isPro ? (
          <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pro</span>
        ) : (
          <span>Credits: {user.credits}</span>
        )}
      </span>
      <a href="/dashboard" class="text-sm hover:text-blue-600">Dashboard</a>
      <button id="signout-btn" class="text-sm hover:text-blue-600">Sign Out</button>
    </>
  ) : (
    <button id="signin-btn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Sign In
    </button>
  )}
</div>
```

#### 4.3 Update ToolPage Component

Modify `src/components/ToolPage.tsx` to handle auth errors:

```tsx
// Add near the top of handleSubmit function
const response = await fetch('/api/run-tool', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token}` // Get from Supabase session
  },
  body: JSON.stringify({
    tool_id: tool.tool_id,
    inputs: inputs
  })
});

const data: RunToolResponse = await response.json();

if (data.requiresAuth) {
  // Show auth modal
  setShowAuthModal(true);
  return;
}

if (data.requiresUpgrade) {
  // Redirect to upgrade page
  window.location.href = '/upgrade';
  return;
}

// Update credits display after successful generation
if (data.success) {
  setResult(data.output);
  setCredits(data.creditsRemaining);
  setIsPro(data.isPro);
}
```

#### 4.4 Create Dashboard Page (`src/pages/dashboard.astro`)

```astro
---
import Layout from '../layouts/Layout.astro';
import { createServerClient } from '../lib/supabase';

// Server-side auth check
const supabase = createServerClient();
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  return Astro.redirect('/');
}

// Fetch user profile and history
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', session.user.id)
  .single();

const { data: generations } = await supabase
  .from('generations')
  .select('*')
  .eq('user_id', session.user.id)
  .order('created_at', { ascending: false })
  .limit(20);
---

<Layout title="Dashboard">
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">Dashboard</h1>

    <!-- Stats Card -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <div class="grid grid-cols-3 gap-6">
        <div>
          <h3 class="text-sm text-gray-600 mb-1">Status</h3>
          <p class="text-2xl font-bold">
            {profile.is_pro ? (
              <span class="text-yellow-600">Pro</span>
            ) : (
              <span class="text-gray-900">Free</span>
            )}
          </p>
          {profile.is_pro && profile.pro_until && (
            <p class="text-xs text-gray-500 mt-1">
              Until {new Date(profile.pro_until).toLocaleDateString()}
            </p>
          )}
        </div>

        <div>
          <h3 class="text-sm text-gray-600 mb-1">Credits</h3>
          <p class="text-2xl font-bold">
            {profile.is_pro ? 'Unlimited' : profile.credits}
          </p>
        </div>

        <div>
          <h3 class="text-sm text-gray-600 mb-1">Total Generations</h3>
          <p class="text-2xl font-bold">{generations.length}</p>
        </div>
      </div>

      {!profile.is_pro && (
        <div class="mt-6 pt-6 border-t">
          <a
            href="/upgrade"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Upgrade to Pro - Unlimited Generations
          </a>
        </div>
      )}
    </div>

    <!-- Generation History -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold mb-4">Generation History</h2>

      <div class="space-y-4">
        {generations.map((gen) => (
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold">{gen.video_title || gen.type}</h3>
                <p class="text-sm text-gray-600">
                  {new Date(gen.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                class="text-blue-600 hover:underline text-sm"
                onclick={`viewGeneration('${gen.id}')`}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</Layout>
```

#### 4.5 Add Middleware for Auth State

Create `src/middleware.ts`:

```typescript
import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from './lib/supabase';

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  const supabase = createServerClient();

  // Get session
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits, is_pro, pro_until')
      .eq('id', session.user.id)
      .single();

    // Check if Pro has expired
    let isPro = profile?.is_pro || false;
    if (isPro && profile?.pro_until && new Date(profile.pro_until) < new Date()) {
      isPro = false;
      // Optionally update database here
    }

    locals.user = {
      id: session.user.id,
      email: session.user.email,
      credits: profile?.credits || 0,
      isPro: isPro
    };
  }

  return next();
});
```

---

## 🧪 How to Test

### 1. Test User Signup
1. Start dev server: `npm run dev`
2. Click "Sign In" → "Sign Up"
3. Create account with email/password
4. Check Supabase → Authentication → Users (should see new user)
5. Check Supabase → Table Editor → profiles (should have 1 credit, is_pro = false)

### 2. Test Free Generation
1. Sign in to the app
2. Go to any YouTube tool
3. Enter a YouTube URL and generate content
4. Should succeed (1 credit → 0 credits)
5. Try generating again → Should show upgrade prompt

### 3. Test Manual Upgrade
1. User visits `/upgrade` page
2. User sends payment via their preferred method
3. User emails you with payment confirmation
4. You verify payment in your bank/payment app
5. Run the upgrade script:
   ```bash
   node upgrade-user.js user@example.com 1 bank_transfer
   ```
6. User refreshes their dashboard → Should see Pro status
7. User generates content → Should work without credit deduction

### 4. Test Pro Expiration
1. Manually set `pro_until` to a past date in database
2. User logs in → Should see Free status (not Pro)
3. Or run: `SELECT check_expired_pro();` in Supabase SQL editor

### 5. Test History
1. Generate some content while signed in
2. Go to Dashboard
3. Should see list of all generations
4. Click "View" to see full content

---

## 🔒 Security Checklist

- ✅ RLS enabled on all tables
- ✅ Service role key only in `.env` (never committed)
- ✅ Admin API key required for user upgrades
- ✅ JWT token validation on all protected endpoints
- ✅ User can only access their own data
- ✅ Pro expiration checking prevents abuse
- ⚠️ Add rate limiting to API routes (recommended)
- ⚠️ Set up payment verification workflow

---

## 📝 Environment Variables Summary

Required in `.env`:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Admin API (generate strong random key)
ADMIN_API_KEY=your-secure-random-key

# OpenAI (existing)
OPENAI_API_KEY=sk-xxx
```

---

## 🚀 Deployment Checklist

Before deploying to production:

1. **Supabase**:
   - ✅ SQL schema executed
   - ✅ RLS policies enabled
   - ✅ Email auth configured
   - ✅ Production keys added to `.env`
   - ✅ Cron job for Pro expiration (optional)

2. **Payment Processing**:
   - ✅ Payment email set up
   - ✅ Bank account / payment methods ready
   - ✅ Upgrade page customized with your details
   - ✅ Email templates prepared for confirmations

3. **Environment Variables**:
   - ✅ All keys added to hosting platform (Vercel, Netlify, etc.)
   - ✅ `SUPABASE_SERVICE_ROLE_KEY` kept secret (server-only)
   - ✅ `ADMIN_API_KEY` kept secret (server-only)

4. **Testing**:
   - ✅ Test signup flow
   - ✅ Test free generation (1 credit)
   - ✅ Test manual upgrade process
   - ✅ Test unlimited Pro generations
   - ✅ Test Pro expiration

---

## 💡 Tips

- **Payment Verification**: Always verify payments before upgrading users
- **Credits Display**: Show remaining credits in header for better UX
- **Error Handling**: Show user-friendly messages for auth/credit errors
- **Email Templates**: Create templates for common responses (payment received, account upgraded, etc.)
- **Analytics**: Track which tools are most popular in `generations` table
- **Refunds**: Keep payment records for at least 90 days for refund requests
- **Annual Plans**: Offer discounts for annual payments to reduce manual work

---

## 🐛 Troubleshooting

**"No credits remaining" immediately after signup:**
- Check if trigger `on_auth_user_created` is firing
- Verify default credits = 1 in profiles table

**User paid but still shows Free:**
- Verify you ran the upgrade API call correctly
- Check Supabase logs for errors
- Verify `pro_until` date is in the future
- Check `is_pro` column is set to `true`

**Can't generate content:**
- Verify `Authorization` header is being sent with JWT token
- Check browser console for auth errors
- Verify Supabase RLS policies allow the operation

**Middleware errors:**
- Ensure `src/middleware.ts` is at project root
- Check Astro config for middleware support

**Admin API returns 401:**
- Verify `ADMIN_API_KEY` in `.env` matches your request
- Check Authorization header format: `Bearer YOUR_KEY`

---

## 📚 Next Steps (Optional Enhancements)

1. **Automated Payment Processing**
   - Integrate with a local payment gateway (if available)
   - Set up webhooks for instant upgrades

2. **Usage Analytics Dashboard**
   - Chart showing generations over time
   - Most popular tool types
   - Token usage tracking

3. **Team Plans**
   - Share credits across team members
   - Admin role for team management

4. **Email Notifications**
   - Welcome email on signup
   - Low credit warnings
   - Pro expiration reminders (7 days before)
   - Monthly usage summary

5. **Export History**
   - Download all generations as CSV/JSON
   - Bulk export for backup

6. **Mobile App**
   - React Native app using same Supabase backend
   - Push notifications for Pro expiration

---

## 💳 Accepting Card Payments & Apple Pay

Since Stripe and PayPal aren't available, here are alternative ways to accept card and Apple Pay:

### Option 1: Local Payment Gateway (Recommended)
Research payment gateways available in your country:
- **Razorpay** (India, SEA)
- **Paystack** (Africa)
- **Mollie** (Europe)
- **2Checkout/Verifone** (Global)
- **Paddle** (Global, merchant of record)
- **LemonSqueezy** (Global, merchant of record)

### Option 2: Manual Card Processing
1. Use a Square/Clover terminal (if available)
2. User contacts you for upgrade
3. You process payment in person or via phone
4. Upgrade user via admin API

### Option 3: Cryptocurrency
1. Accept Bitcoin/USDT/other crypto
2. User sends payment to your wallet
3. Verify on blockchain
4. Upgrade user via admin API

For **Apple Pay specifically**: Apple Pay requires integration with a payment processor. It cannot be used standalone. If you find a local payment gateway that supports Apple Pay (like the ones listed above), you can integrate it using their SDK.

---

Backend is complete! Follow the steps above to complete the frontend and set up your payment workflow.
