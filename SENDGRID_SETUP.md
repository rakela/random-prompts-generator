# SendGrid Setup Guide for Contact Form

This guide will help you configure SendGrid to handle contact form submissions.

---

## Prerequisites

- ✅ SendGrid account (you already have one!)
- ✅ A verified domain (randomprompts.org)
- ✅ Access to your DNS settings

---

## Step 1: Get Your SendGrid API Key

1. **Go to SendGrid Dashboard**
   - Visit: https://app.sendgrid.com/

2. **Navigate to API Keys**
   - Click **Settings** (bottom left)
   - Click **API Keys**

3. **Create New API Key**
   - Click **Create API Key**
   - Name: `Random Prompts Contact Form`
   - Permission Level: **Full Access** (or at minimum **Mail Send**)
   - Click **Create & View**

4. **Copy Your API Key**
   - ⚠️ **IMPORTANT**: Copy this key NOW - you won't be able to see it again!
   - Save it somewhere secure temporarily

---

## Step 2: Verify Your Domain (If Not Done)

For emails to be sent from `@randomprompts.org`, you need to authenticate your domain:

1. **Go to Sender Authentication**
   - In SendGrid Dashboard → Settings → Sender Authentication

2. **Authenticate Your Domain**
   - Click **Authenticate Your Domain**
   - Choose your DNS host (e.g., Cloudflare, GoDaddy, etc.)
   - Enter your domain: `randomprompts.org`

3. **Add DNS Records**
   - SendGrid will give you DNS records to add (usually CNAME records)
   - Add these to your DNS provider:
     - Example records might look like:
       ```
       em123.randomprompts.org → CNAME → u123.wl.sendgrid.net
       s1._domainkey.randomprompts.org → CNAME → s1.domainkey.u123.wl.sendgrid.net
       s2._domainkey.randomprompts.org → CNAME → s2.domainkey.u123.wl.sendgrid.net
       ```

4. **Verify Domain**
   - Wait 24-48 hours for DNS propagation (usually faster)
   - Click **Verify** in SendGrid
   - ✅ Status should show "Verified"

---

## Step 3: Create a Verified Sender (Alternative to Domain)

If you don't want to verify the full domain, you can verify a single email address:

1. **Go to Sender Identity**
   - Settings → Sender Authentication → Single Sender Verification

2. **Create New Sender**
   - Click **Create New Sender**
   - Fill in:
     - From Name: `Random Prompts`
     - From Email: `noreply@randomprompts.org` (or any email you control)
     - Reply To: `hello@randomprompts.org`
     - Company Name: `Random Prompts`
     - Address, City, State, Zip, Country: Your business address

3. **Verify Email**
   - Check your inbox for verification email
   - Click the verification link

---

## Step 4: Configure Environment Variables

Add these to your `.env` file:

```bash
# SendGrid API Key (from Step 1)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email that receives contact form submissions
CONTACT_EMAIL=hello@randomprompts.org

# "From" email for contact form (must be verified in SendGrid)
SENDGRID_FROM_EMAIL=noreply@randomprompts.org
```

**Important Notes:**
- `SENDGRID_FROM_EMAIL` must be:
  - Either from your verified domain (if you did Step 2), OR
  - A single verified sender (if you did Step 3)
- Use the exact email you verified in SendGrid

---

## Step 5: Test the Contact Form

1. **Restart Your Dev Server**
   ```bash
   npm run dev
   ```

2. **Visit Contact Page**
   - Go to: http://localhost:4321/contact

3. **Fill Out the Form**
   - Use a real email address
   - Fill all fields
   - Click "Send Message"

4. **Check for Success**
   - ✅ You should see: "Message sent successfully!"
   - ❌ If you see an error, check the logs

5. **Check Your Inbox**
   - Check `CONTACT_EMAIL` inbox
   - You should receive the contact form submission

---

## Troubleshooting

### Error: "Email service not configured"

**Solution:** Make sure `SENDGRID_API_KEY` is set in your `.env` file

### Error: "The from email does not contain a valid address"

**Solution:**
1. Verify that `SENDGRID_FROM_EMAIL` matches a verified sender or domain
2. Check SendGrid → Settings → Sender Authentication
3. Make sure the email is verified (green checkmark)

### Error: "403 Forbidden"

**Solution:**
1. Your API key might be wrong or expired
2. Go to SendGrid → Settings → API Keys
3. Create a new key with **Mail Send** permission
4. Update your `.env` file

### Emails Going to Spam

**Solutions:**
1. **Authenticate Your Domain** (Step 2 above) - This is the best solution!
2. **Check DNS Records**: Make sure DKIM, SPF, and DMARC are configured
3. **Warm Up Your Domain**: Start with low volume and gradually increase
4. **Avoid Spam Triggers**: Don't use ALL CAPS, excessive punctuation, spam words

### DNS Verification Taking Too Long

**Check DNS Propagation:**
```bash
# Check if DNS records are live
nslookup -type=CNAME em123.randomprompts.org
dig CNAME em123.randomprompts.org
```

Or use online tools:
- https://dnschecker.org/
- https://mxtoolbox.com/

---

## Production Deployment

When deploying to production:

1. **Add Environment Variables to Your Host**
   - For Vercel: Project Settings → Environment Variables
   - For Netlify: Site Settings → Build & Deploy → Environment
   - For AWS/DigitalOcean: Add to your deployment config

2. **Use Production Domain**
   - Make sure `SENDGRID_FROM_EMAIL` uses your production domain
   - Example: `noreply@randomprompts.org` (not localhost)

3. **Test Production Contact Form**
   - Visit: https://randomprompts.org/contact
   - Send a test message
   - Verify it arrives at `CONTACT_EMAIL`

---

## SendGrid Best Practices

### Rate Limits (Free Tier)
- **100 emails/day** on free plan
- **40,000 emails/month** on Essentials ($19.95/mo)

### Monitor Your Sending
- Dashboard → Activity
- Watch for bounces, spam reports, blocks
- Keep bounce rate < 5%
- Keep spam rate < 0.1%

### Email Content Tips
- Use plain, professional language
- Include unsubscribe link (for newsletters, not contact forms)
- Keep HTML simple and responsive
- Test emails on different clients (Gmail, Outlook, etc.)

---

## Security Checklist

- ✅ Never commit `.env` file to git
- ✅ Keep `SENDGRID_API_KEY` secret (server-side only)
- ✅ Use Full Access or Mail Send permission only
- ✅ Rotate API keys every 90 days
- ✅ Monitor SendGrid Activity dashboard for suspicious sends

---

## Support Resources

- **SendGrid Documentation**: https://docs.sendgrid.com/
- **API Reference**: https://docs.sendgrid.com/api-reference/mail-send/mail-send
- **SendGrid Status**: https://status.sendgrid.com/
- **Support**: https://support.sendgrid.com/

---

## Quick Command Reference

```bash
# Test your SendGrid API key
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{"to": [{"email": "test@example.com"}]}],
    "from": {"email": "noreply@randomprompts.org"},
    "subject": "Test Email",
    "content": [{"type": "text/plain", "value": "This is a test"}]
  }'

# Check DNS records
dig CNAME em123.randomprompts.org
nslookup -type=TXT _domainkey.randomprompts.org
```

---

## Next Steps

1. ✅ Get SendGrid API key (Step 1)
2. ✅ Verify your domain or sender email (Step 2 or 3)
3. ✅ Add environment variables (Step 4)
4. ✅ Test the contact form (Step 5)
5. 🎉 Deploy to production!

**Questions?** Email the support team or check the SendGrid docs linked above.
