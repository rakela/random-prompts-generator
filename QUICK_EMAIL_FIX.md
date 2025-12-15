# Quick Email & Auth Fix Checklist

**Goal**: Fix signup emails, OAuth consent screen, and email deliverability

## 🚨 Do This First (5 minutes)

### 1. Fix OAuth Consent Screen
**Problem**: Shows "Sign in to rwjxyidmhbqlwrtqtaqa.supabase.co"

✅ **Fix Now**:
1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to **Authentication** → **URL Configuration**
3. Set **Site URL**: `https://randomprompts.org`
4. Click **Save**

**Result**: OAuth will now show "Sign in to randomprompts.org"

---

### 2. Add Confirmation Link to Emails
**Problem**: Emails don't have a clickable confirmation link

✅ **Fix Now**:
1. Supabase Dashboard → **Authentication** → **Email Templates**
2. Click **Confirm signup**
3. Replace content with:

```html
<h2>Confirm your signup</h2>

<p>Thanks for signing up for Random Prompts Generator!</p>

<p>Click to confirm your email:</p>

<p>
  <a href="{{ .ConfirmationURL }}"
     style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
    Confirm Email
  </a>
</p>

<p>Or copy this link: {{ .ConfirmationURL }}</p>

<p>Link expires in 24 hours.</p>
```

4. Click **Save**

**Result**: Signup emails now have a working confirmation button

---

### 3. Set Redirect URLs
**Problem**: Redirects might fail after OAuth/email confirmation

✅ **Fix Now**:
1. Still in **Authentication** → **URL Configuration**
2. In **Redirect URLs**, add:
```
https://randomprompts.org/auth/callback
https://randomprompts.org
http://localhost:4321/auth/callback
```
3. Click **Save**

**Result**: Auth redirects work properly

---

## 📧 Fix Spam Issue (30 minutes)

### Option 1: SendGrid (Easiest - Free tier: 100 emails/day)

1. **Sign up**: [sendgrid.com](https://sendgrid.com/)
2. **Get API Key**:
   - Dashboard → Settings → API Keys
   - Create API Key → Copy it
3. **Configure in Supabase**:
   - Project Settings → Auth → SMTP Settings
   - Enable Custom SMTP:
     ```
     Host: smtp.sendgrid.net
     Port: 587
     Username: apikey
     Password: [paste your API key]
     Sender email: noreply@randomprompts.org
     Sender name: Random Prompts Generator
     ```
   - Save

4. **Verify Domain** (to prevent spam):
   - SendGrid → Settings → Sender Authentication
   - Authenticate Your Domain
   - Add the DNS records shown to your domain registrar
   - Wait 1-48 hours for verification

**Result**: Emails sent from your domain, better deliverability

---

### Option 2: Resend (Developer-friendly - Free: 3000 emails/month)

1. **Sign up**: [resend.com](https://resend.com/)
2. **Add Domain**:
   - Dashboard → Domains → Add Domain
   - Enter: `randomprompts.org`
   - Add DNS records to your domain
3. **Get Credentials**:
   - Dashboard → SMTP
   - Copy credentials
4. **Configure in Supabase**:
   ```
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: [your Resend API key]
   Sender email: noreply@randomprompts.org
   Sender name: Random Prompts Generator
   ```

**Result**: Professional email delivery from your domain

---

## 🧪 Test Everything

### Test Signup Email
1. Sign up with a test email
2. Check inbox (and spam first time)
3. Verify:
   - ✅ Email received
   - ✅ Has confirmation button
   - ✅ From "Random Prompts Generator"
   - ✅ Link works

### Test Google Login
1. Click "Continue with Google"
2. Verify:
   - ✅ Shows "Sign in to randomprompts.org"
   - ✅ Redirects back to your site after login

---

## 📋 DNS Records to Add (For Custom SMTP)

If using SendGrid or Resend, add these to your domain DNS:

### SPF Record
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
```
(or use `include:resend.com` for Resend)

### DMARC Record (Optional but recommended)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:admin@randomprompts.org
```

**Where to add**: Your domain registrar (Cloudflare, GoDaddy, Namecheap, etc.)

---

## ⏱️ Timeline

- **Immediate** (5 min): Fix OAuth screen, add confirmation links
- **Same day** (30 min): Set up custom SMTP
- **1-48 hours**: DNS propagation, domain verification
- **Ongoing**: Monitor email deliverability

---

## 🆘 Still Issues?

See detailed guide: [SUPABASE_EMAIL_AND_AUTH_SETUP.md](./SUPABASE_EMAIL_AND_AUTH_SETUP.md)

**Common Issues**:
- Emails still spam → Check domain verification in SMTP provider
- Confirmation link 404 → Check Site URL matches your domain
- OAuth still shows Supabase → Clear browser cache, check Site URL saved

---

**Questions?** Open an issue or check Supabase docs: https://supabase.com/docs/guides/auth
