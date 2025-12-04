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

### 4. Stripe Webhook Handler (`src/pages/api/webhooks/stripe.ts`)
Handles:
- ✅ `checkout.session.completed` - Upgrade to Pro
- ✅ `customer.subscription.updated` - Update subscription status
- ✅ `customer.subscription.deleted` - Downgrade to free (0 credits)

---

## 📋 What You Need to Do Next

### Step 1: Set Up Supabase

1. **Run SQL Schema**
   - Go to Supabase Dashboard → SQL Editor
   - Run this schema (from initial response):

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  credits INTEGER NOT NULL DEFAULT 1,
  is_pro BOOLEAN NOT NULL DEFAULT false,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
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
CREATE INDEX idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_created_at ON generations(created_at DESC);

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
  recent_generations JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(g.id) as total_generations,
    p.credits as credits_remaining,
    p.is_pro,
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
  GROUP BY p.credits, p.is_pro;
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

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. **Enable Email Authentication**
   - Supabase Dashboard → Authentication → Providers
   - Enable Email provider
   - Configure email templates (optional)

### Step 2: Set Up Stripe

1. **Create Product & Price**
   - Stripe Dashboard → Products → Create Product
   - Name: "Pro Subscription"
   - Price: $9.99/month (or your pricing)
   - Copy the Price ID (e.g., `price_xxx`)

2. **Configure Webhook**
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy Webhook Secret → Add to `.env` as `STRIPE_WEBHOOK_SECRET`

### Step 3: Create Frontend Components

#### 3.1 Auth Component (`src/components/AuthModal.tsx`)

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

#### 3.2 Update Header Component

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

#### 3.3 Update ToolPage Component

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
  // Show upgrade prompt
  setShowUpgradeModal(true);
  return;
}

// Update credits display after successful generation
if (data.success) {
  setResult(data.output);
  setCredits(data.creditsRemaining);
  setIsPro(data.isPro);
}
```

#### 3.4 Create Dashboard Page (`src/pages/dashboard.astro`)

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
          <button
            id="upgrade-btn"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Upgrade to Pro - Unlimited Generations
          </button>
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

  <script>
    // Add upgrade button handler
    document.getElementById('upgrade-btn')?.addEventListener('click', async () => {
      // Call Stripe checkout endpoint (create this next)
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const { url } = await response.json();
      window.location.href = url;
    });
  </script>
</Layout>
```

#### 3.5 Create Stripe Checkout Endpoint (`src/pages/api/create-checkout.ts`)

```typescript
import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getUserFromRequest } from '../../lib/supabase';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia'
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_YOUR_STRIPE_PRICE_ID', // Replace with your Price ID
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${request.headers.get('origin')}/dashboard?canceled=true`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      { status: 500 }
    );
  }
};

export const prerender = false;
```

### Step 4: Add Middleware for Auth State

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
      .select('credits, is_pro')
      .eq('id', session.user.id)
      .single();

    locals.user = {
      id: session.user.id,
      email: session.user.email,
      credits: profile?.credits || 0,
      isPro: profile?.is_pro || false
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
5. Try generating again → Should show "Upgrade required" message

### 3. Test Stripe Upgrade (Test Mode)
1. Use Stripe test card: `4242 4242 4242 4242`
2. Click "Upgrade to Pro" on dashboard
3. Complete checkout with test card
4. Webhook should fire → Check Supabase profiles table
5. User should have `is_pro = true`
6. Try generating content → Should work without credit deduction

### 4. Test History
1. Generate some content while signed in
2. Go to Dashboard
3. Should see list of all generations
4. Click "View" to see full content

### 5. Test Webhook Locally (Using Stripe CLI)
```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local server
stripe listen --forward-to http://localhost:4321/api/webhooks/stripe

# Trigger test webhook
stripe trigger checkout.session.completed
```

---

## 🔒 Security Checklist

- ✅ RLS enabled on all tables
- ✅ Service role key only in `.env` (never committed)
- ✅ Webhook signature verification
- ✅ JWT token validation on all protected endpoints
- ✅ User can only access their own data
- ⚠️ Add rate limiting to API routes (recommended)
- ⚠️ Add CORS configuration if needed

---

## 📝 Environment Variables Summary

Required in `.env`:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

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

2. **Stripe**:
   - ✅ Product and price created
   - ✅ Webhook endpoint configured with production URL
   - ✅ Production keys added to `.env`

3. **Environment Variables**:
   - ✅ All keys added to hosting platform (Vercel, Netlify, etc.)
   - ✅ `SUPABASE_SERVICE_ROLE_KEY` kept secret (server-only)

4. **Testing**:
   - ✅ Test signup flow
   - ✅ Test free generation (1 credit)
   - ✅ Test upgrade flow
   - ✅ Test unlimited Pro generations
   - ✅ Test webhook with Stripe CLI

---

## 💡 Tips

- **Local Development**: Use ngrok or Stripe CLI to test webhooks locally
- **Credits Display**: Show remaining credits in header for better UX
- **Error Handling**: Show user-friendly messages for auth/credit errors
- **Email Verification**: Consider enabling email confirmation in Supabase
- **Analytics**: Track which tools are most popular in `generations` table
- **Refunds**: Add `customer.subscription.deleted` handler to reset credits

---

## 🐛 Troubleshooting

**"No credits remaining" immediately after signup:**
- Check if trigger `on_auth_user_created` is firing
- Verify default credits = 1 in profiles table

**Webhook not updating Pro status:**
- Check Stripe webhook logs for errors
- Verify `STRIPE_WEBHOOK_SECRET` matches dashboard
- Check Supabase logs for database errors

**Can't generate content:**
- Verify `Authorization` header is being sent with JWT token
- Check browser console for auth errors
- Verify Supabase RLS policies allow the operation

**Middleware errors:**
- Ensure `src/middleware.ts` is at project root
- Check Astro config for middleware support

---

## 📚 Next Steps (Optional Enhancements)

1. **Usage Analytics Dashboard**
   - Chart showing generations over time
   - Most popular tool types
   - Token usage tracking

2. **Team Plans**
   - Share credits across team members
   - Admin role for team management

3. **API Access**
   - Generate API keys for external access
   - Rate limiting per API key

4. **Email Notifications**
   - Welcome email on signup
   - Low credit warnings
   - Monthly usage summary

5. **Export History**
   - Download all generations as CSV/JSON
   - Bulk export for backup

---

Backend is complete and committed! Follow the steps above to complete the frontend integration.
