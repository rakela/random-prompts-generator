# Supabase Email and Authentication Setup Guide

This guide addresses common issues with Supabase authentication:
- ✉️ Confirmation emails going to spam
- 📧 Emails sent from Supabase domain instead of your domain
- 🔗 Missing confirmation links in emails
- 🔐 OAuth consent screen showing Supabase domain

## Quick Fix Checklist

- [ ] Configure Site URL in Supabase
- [ ] Set up Redirect URLs for OAuth
- [ ] Customize email templates
- [ ] Configure custom SMTP (recommended for production)
- [ ] Test email delivery

---

## 1. Fix OAuth Consent Screen ("Sign in to rwjxyidmhbqlwrtqtaqa.supabase.co")

### Problem
When users sign in with Google, they see "Sign in to rwjxyidmhbqlwrtqtaqa.supabase.co" instead of your domain name.

### Solution

**Step 1: Configure Site URL in Supabase Dashboard**

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Set the **Site URL** to your production domain:
   ```
   https://randomprompts.org
   ```
4. Click **Save**

**Step 2: Configure Redirect URLs**

Add these redirect URLs to the **Additional Redirect URLs** section:

```
https://randomprompts.org/auth/callback
https://randomprompts.org
http://localhost:4321/auth/callback
http://localhost:4321
```

**Step 3: Update Google OAuth Settings**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **Credentials** → Your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, ensure you have:
   ```
   https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
   https://randomprompts.org/auth/callback
   ```
5. Under **Authorized JavaScript origins**, add:
   ```
   https://randomprompts.org
   ```
6. Save changes

---

## 2. Fix Email Confirmation Link Missing

### Problem
Confirmation emails don't contain a clickable confirmation link.

### Solution

**Customize Email Templates in Supabase Dashboard:**

1. Go to **Authentication** → **Email Templates**
2. Select **Confirm signup**
3. Replace the template with this:

```html
<h2>Confirm your signup</h2>

<p>Hi there,</p>

<p>Thanks for signing up for Random Prompts Generator!</p>

<p>Please click the link below to confirm your email address:</p>

<p>
  <a href="{{ .ConfirmationURL }}"
     style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
    Confirm Email Address
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link expires in 24 hours.</p>

<p>If you didn't create an account, you can safely ignore this email.</p>

<p>
  Best regards,<br>
  The Random Prompts Generator Team
</p>
```

4. Click **Save**

**Also update these templates:**

**Magic Link Template:**
```html
<h2>Your magic link</h2>

<p>Hi there,</p>

<p>Click the link below to sign in to Random Prompts Generator:</p>

<p>
  <a href="{{ .ConfirmationURL }}"
     style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
    Sign In
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link expires in 1 hour.</p>

<p>If you didn't request this, you can safely ignore this email.</p>

<p>
  Best regards,<br>
  The Random Prompts Generator Team
</p>
```

**Password Reset Template:**
```html
<h2>Reset your password</h2>

<p>Hi there,</p>

<p>You requested to reset your password for Random Prompts Generator.</p>

<p>Click the link below to choose a new password:</p>

<p>
  <a href="{{ .ConfirmationURL }}"
     style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
    Reset Password
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link expires in 1 hour.</p>

<p>If you didn't request this, you can safely ignore this email.</p>

<p>
  Best regards,<br>
  The Random Prompts Generator Team
</p>
```

---

## 3. Fix Emails Going to Spam & Sent from Supabase Domain

### Problem
- Emails are being marked as spam
- Emails show "from Supabase" instead of your domain

### Solution: Configure Custom SMTP

**Option A: Using SendGrid (Recommended)**

1. **Create SendGrid Account**
   - Go to [SendGrid](https://sendgrid.com/)
   - Sign up for free tier (100 emails/day)

2. **Get API Key**
   - Dashboard → Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key

3. **Get SMTP Credentials**
   - Go to Settings → **API Keys**
   - Or use these settings:
     - Host: `smtp.sendgrid.net`
     - Port: `587` (TLS) or `465` (SSL)
     - Username: `apikey`
     - Password: Your API Key

4. **Configure in Supabase**
   - Go to **Project Settings** → **Auth**
   - Scroll to **SMTP Settings**
   - Enable **Enable Custom SMTP**
   - Fill in:
     ```
     Host: smtp.sendgrid.net
     Port: 587
     Username: apikey
     Password: [Your SendGrid API Key]
     Sender email: noreply@randomprompts.org
     Sender name: Random Prompts Generator
     ```
   - Click **Save**

5. **Verify Your Domain (Important!)**
   - In SendGrid: Settings → Sender Authentication
   - Click **Verify a Single Sender** or **Authenticate Your Domain**
   - Add DNS records to your domain
   - Wait for verification (can take up to 48 hours)

**Option B: Using AWS SES (Production-Grade)**

1. **Create AWS Account & Enable SES**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Search for "SES" (Simple Email Service)
   - Request production access (important!)

2. **Verify Your Domain**
   - SES → Verified Identities → Create Identity
   - Choose "Domain"
   - Enter: `randomprompts.org`
   - Add the DKIM and verification records to your DNS

3. **Create SMTP Credentials**
   - SES → SMTP Settings
   - Click **Create SMTP Credentials**
   - Copy username and password

4. **Configure in Supabase**
   ```
   Host: email-smtp.[your-region].amazonaws.com
   Port: 587
   Username: [AWS SMTP Username]
   Password: [AWS SMTP Password]
   Sender email: noreply@randomprompts.org
   Sender name: Random Prompts Generator
   ```

**Option C: Using Resend (Developer-Friendly)**

1. **Create Resend Account**
   - Go to [Resend.com](https://resend.com/)
   - Sign up (3,000 free emails/month)

2. **Add & Verify Domain**
   - Dashboard → Domains → Add Domain
   - Add DNS records provided by Resend

3. **Get API Key**
   - Dashboard → API Keys → Create API Key

4. **Get SMTP Credentials**
   - Dashboard → SMTP
   - Copy credentials

5. **Configure in Supabase**
   ```
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: [Your Resend API Key]
   Sender email: noreply@randomprompts.org
   Sender name: Random Prompts Generator
   ```

---

## 4. Additional Email Deliverability Tips

### Set Up SPF Record
Add to your DNS:
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
```
(Replace `sendgrid.net` with your SMTP provider's SPF record)

### Set Up DMARC Record
Add to your DNS:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:postmaster@randomprompts.org
```

### Configure Rate Limits in Supabase

1. Go to **Authentication** → **Rate Limits**
2. Adjust if needed (default is fine for most cases)

---

## 5. Testing Email Configuration

### Test Signup Email

1. Use a test email address
2. Sign up on your site
3. Check:
   - ✅ Email received (check spam folder first time)
   - ✅ Email shows from "Random Prompts Generator"
   - ✅ Confirmation link is present and clickable
   - ✅ Link redirects to your domain (not Supabase)

### Test Password Reset

1. Click "Forgot Password" on login
2. Check:
   - ✅ Email received
   - ✅ Reset link works
   - ✅ Redirects to your site

### Test Magic Link (if enabled)

1. Sign in with email (no password)
2. Check magic link email

---

## 6. Environment Variables Update

Make sure your `.env` file has:

```bash
# Site Configuration
PUBLIC_SITE_URL=https://randomprompts.org

# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## 7. Troubleshooting

### Emails Still Going to Spam

1. **Domain Reputation**: New domains often go to spam initially
   - Send emails consistently over time
   - Ask users to mark as "not spam"
   - Use domain warmup services

2. **Check Email Content**
   - Avoid spam trigger words
   - Include unsubscribe link (for marketing emails)
   - Use plain text + HTML versions

3. **Verify All DNS Records**
   - SPF record
   - DKIM records
   - DMARC record
   - MX records (if applicable)

### Confirmation Link Not Working

1. Check **Site URL** in Supabase is correct
2. Check **Redirect URLs** include your callback URL
3. Verify email template has `{{ .ConfirmationURL }}` placeholder

### OAuth Still Shows Supabase Domain

1. Clear browser cache and cookies
2. Verify **Site URL** is saved in Supabase
3. Check Google OAuth consent screen settings
4. Try in incognito mode

---

## 8. Quick Reference: Where to Configure

| Issue | Fix Location |
|-------|--------------|
| OAuth consent screen | Supabase → Authentication → URL Configuration |
| Email templates | Supabase → Authentication → Email Templates |
| Custom SMTP | Supabase → Project Settings → Auth → SMTP |
| Redirect URLs | Supabase → Authentication → URL Configuration |
| Domain verification | Your SMTP provider dashboard |
| DNS records | Your domain registrar (Cloudflare, GoDaddy, etc.) |

---

## Need Help?

- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **SendGrid Docs**: https://docs.sendgrid.com/
- **AWS SES Docs**: https://docs.aws.amazon.com/ses/
- **DNS Help**: https://www.whatsmydns.net/ (to verify DNS propagation)

---

**Last Updated**: December 2024
