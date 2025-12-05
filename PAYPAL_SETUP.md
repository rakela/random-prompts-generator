# PayPal Integration Setup Guide

## 🎯 Overview

Your app now accepts payments via **PayPal Smart Payment Buttons**, which automatically include:
- 💳 **Credit/Debit Cards** (Visa, Mastercard, Amex, Discover)
- 🍎 **Apple Pay** (on supported devices)
- 💰 **PayPal Balance**
- 🏦 **Bank Accounts** (via PayPal)

## 📋 Required Environment Variables

Add these to your `.env` file:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your-client-id-here
PAYPAL_CLIENT_SECRET=your-client-secret-here
PAYPAL_MODE=sandbox  # Use 'production' for live payments

# Public PayPal Client ID (for frontend buttons)
PUBLIC_PAYPAL_CLIENT_ID=your-client-id-here
```

**Important:**
- `PAYPAL_CLIENT_ID` and `PUBLIC_PAYPAL_CLIENT_ID` should be the **same value**
- Use `PAYPAL_MODE=sandbox` for testing, `production` for live payments

---

## 🚀 Step-by-Step Setup

### Step 1: Create PayPal Business Account

1. **Go to PayPal Developer**: https://developer.paypal.com
2. **Log in** with your existing PayPal account (or create one)
3. If you don't have a business account yet:
   - Click your profile → **Upgrade to Business Account**
   - Fill in business information
   - Complete verification

### Step 2: Create Sandbox Test Account (For Testing)

1. Go to **Dashboard** → **Apps & Credentials**
2. Toggle to **Sandbox** mode at the top
3. Click **Sandbox** → **Accounts** (left sidebar)
4. You'll see two default test accounts:
   - **Business Account** (your test merchant account)
   - **Personal Account** (for testing purchases)
5. Note down the credentials or create new test accounts if needed

### Step 3: Get API Credentials

#### For Sandbox (Testing):

1. Go to **Apps & Credentials**
2. Make sure **Sandbox** toggle is selected at the top
3. Under **REST API apps**, click **Create App**
4. Enter app name (e.g., "YouTube Content Generator Sandbox")
5. Select **Merchant** as the app type
6. Click **Create App**
7. You'll see:
   - **Client ID** - Copy this
   - **Secret** - Click "Show" and copy this

#### For Production (Live Payments):

1. Go to **Apps & Credentials**
2. Toggle to **Live** at the top
3. Click **Create App**
4. Enter app name (e.g., "YouTube Content Generator")
5. Select **Merchant** as the app type
6. Click **Create App**
7. Copy the **Client ID** and **Secret**

### Step 4: Configure Environment Variables

Create or update your `.env` file:

**For Sandbox Testing:**
```env
PAYPAL_CLIENT_ID=AeA1pLx... (your sandbox client ID)
PAYPAL_CLIENT_SECRET=EJJx... (your sandbox secret)
PAYPAL_MODE=sandbox
PUBLIC_PAYPAL_CLIENT_ID=AeA1pLx... (same as PAYPAL_CLIENT_ID)
```

**For Production:**
```env
PAYPAL_CLIENT_ID=AZy9... (your live client ID)
PAYPAL_CLIENT_SECRET=EMP... (your live secret)
PAYPAL_MODE=production
PUBLIC_PAYPAL_CLIENT_ID=AZy9... (same as PAYPAL_CLIENT_ID)
```

### Step 5: Enable Apple Pay (Optional but Recommended)

Apple Pay is automatically available in PayPal Smart Payment Buttons when:
1. User is on an Apple device (iPhone, iPad, Mac with Safari)
2. User has Apple Pay set up
3. Your PayPal business account is verified

**To ensure Apple Pay works:**
1. Complete PayPal business account verification
2. No additional setup needed - PayPal handles it automatically!

---

## 🧪 Testing Your Integration

### Test with Sandbox Account

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Make sure `.env` has sandbox credentials:**
   ```env
   PAYPAL_MODE=sandbox
   ```

3. **Navigate to upgrade page:**
   ```
   http://localhost:4321/upgrade
   ```

4. **Click PayPal button** and use sandbox test account:
   - **Email:** sb-buyer@business.example.com (from your sandbox accounts)
   - **Password:** (check in PayPal Developer Dashboard → Sandbox → Accounts)

5. **Complete test payment** and verify:
   - Payment processes successfully
   - User is redirected to dashboard
   - User's Pro status is activated in database
   - `pro_until` date is set correctly

### Test Cards (Sandbox Only)

PayPal sandbox accepts these test cards:

| Card Type | Number | CVV | Expiry |
|-----------|--------|-----|--------|
| Visa | 4032039603696304 | 123 | Any future date |
| Mastercard | 5425233430109903 | 123 | Any future date |
| Amex | 374245455400126 | 1234 | Any future date |

### Test Apple Pay (Sandbox)

1. Use Safari on Mac with Touch ID or iPhone
2. Make sure Apple Pay is configured in Wallet
3. Visit upgrade page - Apple Pay button should appear
4. Click and complete payment with test credentials

---

## 🔧 Troubleshooting

### PayPal Buttons Not Showing

**Problem:** The PayPal button container is empty

**Solutions:**
1. Check browser console for errors
2. Verify `PUBLIC_PAYPAL_CLIENT_ID` is set in `.env`
3. Make sure you're using the correct Client ID (sandbox vs production)
4. Check if the PayPal SDK script is loading:
   ```javascript
   console.log(window.paypal); // Should not be undefined
   ```

### "Authentication Required" Error

**Problem:** User gets auth error when clicking PayPal button

**Solutions:**
1. Make sure user is signed in
2. Check if Supabase session is valid
3. Verify `Authorization` header is being sent with requests
4. Check browser console for auth token errors

### Payment Succeeds but User Not Upgraded

**Problem:** PayPal payment completes but user stays on Free plan

**Solutions:**
1. Check server logs for errors in `/api/paypal/capture-order`
2. Verify Supabase `SUPABASE_SERVICE_ROLE_KEY` is set correctly
3. Check database connection
4. Verify `profiles` table has correct structure with `pro_until` column

### Apple Pay Not Showing

**Problem:** Apple Pay button doesn't appear on the page

**Solutions:**
1. Apple Pay only shows on Apple devices (iPhone, iPad, Mac with Safari)
2. User must have Apple Pay set up in Wallet
3. Site must be accessed via HTTPS (localhost is OK for testing)
4. PayPal business account must be verified

### "Invalid Client ID" Error

**Problem:** PayPal returns invalid client ID error

**Solutions:**
1. Make sure you're using the correct environment (sandbox vs production)
2. Verify `PAYPAL_MODE` matches your credentials (sandbox/production)
3. Check for typos in Client ID
4. Ensure Client ID is from the correct PayPal account

---

## 💰 Pricing Configuration

Current pricing is set to **$9.99/month** in the code. To change:

### Update Backend API

Edit `/src/pages/api/paypal/create-order.ts`:

```typescript
// Line ~31
const prices = {
  monthly: '9.99',  // Change this
  annual: '99.99'   // Or add annual option
};
```

### Update Frontend Display

Edit `/src/pages/upgrade.astro`:

```astro
<!-- Line ~17 -->
<div class="text-5xl font-bold mb-2">$9.99</div>
```

---

## 🌍 Supported Countries

PayPal is available in **200+ countries**. Check availability:
https://www.paypal.com/en/webapps/mpp/country-worldwide

**Payment Methods by Region:**
- 🇺🇸 **USA**: All major cards, PayPal, Apple Pay, Venmo
- 🇪🇺 **Europe**: Cards, PayPal, Apple Pay, SEPA, Bancontact, iDEAL
- 🇬🇧 **UK**: Cards, PayPal, Apple Pay
- 🇨🇦 **Canada**: Cards, PayPal, Apple Pay
- 🇦🇺 **Australia**: Cards, PayPal, Apple Pay
- 🇮🇳 **India**: Cards, PayPal, UPI, Net Banking
- 🇨🇳 **China**: UnionPay (via PayPal)

---

## 📊 Monitoring & Logs

### Server Logs

Your API endpoints log important events:

```bash
# Successful order creation
[paypal] Order created: ORDER-123... for user: user-uuid

# Successful payment capture
[paypal] Payment captured: ORDER-123... for user: user-uuid
[paypal] User user-uuid upgraded to Pro until 2024-02-01T...
```

Watch logs during testing:
```bash
npm run dev
# Check terminal for [paypal] logs
```

### PayPal Dashboard

Monitor transactions in PayPal:
1. Go to https://www.paypal.com
2. Click **Activity** to see all transactions
3. For sandbox: Go to https://www.sandbox.paypal.com

---

## 🔒 Security Best Practices

1. **Never commit secrets:**
   ```bash
   # Make sure .env is in .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use environment variables:**
   - Never hardcode Client ID or Secret in code
   - Always use `import.meta.env.PAYPAL_CLIENT_SECRET`

3. **Validate on server:**
   - All payment capture happens server-side
   - Never trust client-side payment confirmation

4. **Use production credentials only in production:**
   - Keep sandbox and production credentials separate
   - Use `PAYPAL_MODE` to switch environments

---

## 🚀 Going Live Checklist

Before accepting real payments:

- [ ] PayPal business account verified
- [ ] Business information complete in PayPal
- [ ] Bank account linked to PayPal
- [ ] Production Client ID and Secret obtained
- [ ] Environment variables updated with production credentials
- [ ] `PAYPAL_MODE=production` in production `.env`
- [ ] Test payment in production with small amount
- [ ] Verify user upgrade works correctly
- [ ] Monitor first few real transactions
- [ ] Set up PayPal email notifications
- [ ] Configure payout preferences in PayPal

---

## 💡 Pro Tips

1. **Test Thoroughly in Sandbox:**
   - Test successful payments
   - Test cancelled payments
   - Test error scenarios
   - Test on different devices (desktop, mobile, Apple devices)

2. **Monitor PayPal Activity:**
   - Check PayPal dashboard daily for the first week
   - Set up email notifications for payments
   - Review transaction details regularly

3. **Handle Refunds:**
   - Go to PayPal Activity → Find transaction → Issue Refund
   - Manually downgrade user in database after refund

4. **Customer Support:**
   - Keep PayPal transaction IDs for reference
   - Use transaction ID to look up payments quickly
   - PayPal provides buyer protection automatically

5. **Optimize Conversion:**
   - Keep checkout flow simple (fewer clicks = more conversions)
   - Show trust badges (PayPal, secure payment, etc.)
   - Clearly show what's included with Pro

---

## 📞 Support

### PayPal Support
- Developer docs: https://developer.paypal.com/docs
- Community: https://www.paypal-community.com
- Support: https://www.paypal.com/us/smarthelp/contact-us

### Common Questions

**Q: Do I need a business account?**
A: Yes, to accept payments you need a PayPal Business account.

**Q: What are PayPal's fees?**
A: Typically 2.9% + $0.30 per transaction in the US. Varies by country.

**Q: How long until I receive funds?**
A: Instant to PayPal balance. Bank transfers take 1-3 business days.

**Q: Can I accept payments internationally?**
A: Yes! PayPal supports 25+ currencies and 200+ countries.

**Q: Is Apple Pay free?**
A: Yes, same PayPal transaction fees apply. No extra cost for Apple Pay.

---

## 📝 Quick Reference

### Environment Variables
```env
PAYPAL_CLIENT_ID=AeA1pLx...
PAYPAL_CLIENT_SECRET=EJJx...
PAYPAL_MODE=sandbox
PUBLIC_PAYPAL_CLIENT_ID=AeA1pLx...
```

### API Endpoints
- `POST /api/paypal/create-order` - Creates PayPal order
- `POST /api/paypal/capture-order` - Captures payment & upgrades user

### Files Modified
- `/src/pages/api/paypal/create-order.ts` - Order creation
- `/src/pages/api/paypal/capture-order.ts` - Payment capture
- `/src/pages/upgrade.astro` - PayPal buttons UI

---

Ready to accept payments! 🎉
