# Email Going to Spam - Debugging & Solutions

Your emails are still going to spam even after setting up custom SMTP. This guide will help you debug and fix the issue.

---

## 🔍 Quick Diagnosis

### Step 1: Check Your Current Setup

Run these checks in order:

**A. DNS Records Verification**

Go to [MXToolbox](https://mxtoolbox.com/SuperTool.aspx) and check:

1. **SPF Record** - Enter: `randomprompts.org`
   - Should show: `v=spf1 include:[your-smtp-provider].net ~all`
   - ❌ If missing or wrong → Fix in Step 2

2. **DKIM Record** - Enter: `default._domainkey.randomprompts.org`
   - Should show your DKIM public key
   - ❌ If missing → Fix in Step 2

3. **DMARC Record** - Enter: `_dmarc.randomprompts.org`
   - Should show: `v=DMARC1; p=quarantine;` or similar
   - ❌ If missing → Fix in Step 2

**B. Email Authentication Test**

Send a test email to: [mail-tester.com](https://www.mail-tester.com/)

1. Get a unique test address from mail-tester.com
2. Trigger a signup email from your site to that address
3. Check your score (aim for 9/10 or 10/10)
4. Review issues reported

**C. SMTP Configuration Check**

Log into Supabase Dashboard:
1. Project Settings → Auth → SMTP Settings
2. Verify:
   - ✅ Custom SMTP is enabled
   - ✅ Host, port, username, password are correct
   - ✅ Sender email matches your verified domain
   - ✅ Sender name is set

---

## 🛠️ Step 2: Fix DNS Records

### If Using SendGrid:

**1. Add SPF Record**
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
TTL: 3600
```

**2. Add DKIM Records** (Get from SendGrid Dashboard)
```
SendGrid Dashboard → Settings → Sender Authentication → Authenticate Your Domain

You'll get 3 CNAME records like:
Type: CNAME
Name: s1._domainkey
Value: s1.domainkey.u12345.wl.sendgrid.net
TTL: 3600

Type: CNAME
Name: s2._domainkey
Value: s2.domainkey.u12345.wl.sendgrid.net
TTL: 3600

Type: CNAME
Name: em1234
Value: u12345.wl.sendgrid.net
TTL: 3600
```

**3. Add DMARC Record**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:admin@randomprompts.org; ruf=mailto:admin@randomprompts.org; fo=1
TTL: 3600
```

### If Using Resend:

**1. Add SPF Record**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
TTL: 3600
```

**2. Add DKIM Record** (Get from Resend Dashboard)
```
Resend Dashboard → Domains → Your Domain → DNS Records

Type: TXT
Name: resend._domainkey
Value: [provided by Resend]
TTL: 3600
```

**3. Add DMARC Record** (Same as above)

### If Using AWS SES:

**1. Add SPF Record**
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all
TTL: 3600
```

**2. Add DKIM Records** (Get from SES Console)
```
SES → Verified Identities → Your Domain → DKIM

You'll get 3 CNAME records to add
```

**3. Add DMARC Record** (Same as above)

---

## 🔧 Step 3: Additional Fixes

### A. Domain Warmup (CRITICAL for New Domains)

If your domain is new or hasn't sent emails before:

**Week 1:**
- Send 20-50 emails/day
- Only to engaged users
- Avoid spam complaints

**Week 2:**
- Increase to 100-200 emails/day

**Week 3-4:**
- Gradually increase to your normal volume

**Why?** Email providers throttle new senders to prevent spam.

### B. Improve Email Content

Check your email templates for spam triggers:

**❌ Avoid:**
- ALL CAPS SUBJECT LINES
- Multiple exclamation marks!!!
- Spam words: "Free", "Act now", "Limited time", "Click here"
- Large images without text
- Too many links
- Broken HTML

**✅ Use:**
- Professional subject lines
- Balanced text-to-image ratio
- Plain text alternative
- Unsubscribe link (for marketing emails)
- Your real physical address (for marketing)

### C. Email Reputation Monitoring

**Monitor Your IP/Domain Reputation:**

1. **Google Postmaster Tools**
   - Add and verify: randomprompts.org
   - Monitor spam rate (should be < 0.1%)
   - Check domain reputation

2. **Microsoft SNDS** (for Outlook/Hotmail)
   - Sign up: https://sendersupport.olc.protection.outlook.com/snds/
   - Monitor complaints

3. **MXToolbox Blacklist Check**
   - Check if your domain/IP is blacklisted
   - URL: https://mxtoolbox.com/blacklists.aspx

### D. Ask Recipients to Whitelist

**Temporary Fix While Building Reputation:**

Send instructions to early users:
```
If our emails are in spam:
1. Move the email to your inbox
2. Mark it as "Not Spam"
3. Add noreply@randomprompts.org to your contacts
```

---

## 📊 Step 4: Test & Verify

### Test Email Delivery to Major Providers

Create test accounts and sign up:

1. **Gmail** - test@gmail.com
   - Check inbox/spam
   - Check "Promotions" tab

2. **Outlook/Hotmail** - test@outlook.com
   - Check inbox/junk

3. **Yahoo** - test@yahoo.com
   - Check inbox/spam

4. **Apple Mail** - test@icloud.com
   - Check inbox/junk

### Use Email Testing Tools

1. **Mail Tester**
   - URL: https://www.mail-tester.com/
   - Send test email
   - Get detailed report
   - Fix issues listed

2. **GlockApps** (Paid but thorough)
   - Tests deliverability across all providers
   - Shows exactly where emails land

---

## 🚨 Common Issues & Fixes

### Issue 1: SPF Record Conflict

**Symptom:** Multiple SPF records or existing record

**Fix:**
```
# Wrong (multiple SPF records):
v=spf1 include:example.com ~all
v=spf1 include:sendgrid.net ~all

# Right (single combined record):
v=spf1 include:example.com include:sendgrid.net ~all
```

### Issue 2: DKIM Not Signing

**Symptom:** Mail-tester shows "DKIM not signed"

**Fix:**
1. Verify DKIM records in DNS (check exact values)
2. Wait 24-48 hours for propagation
3. Check if records are public: `nslookup -type=TXT default._domainkey.randomprompts.org`

### Issue 3: Domain Not Verified

**Symptom:** Emails from "via supabase" or "via sendgrid"

**Fix:**
1. Complete domain authentication in SMTP provider
2. Add ALL DNS records (don't skip any)
3. Wait for verification (can take 48 hours)
4. Resend verification email if needed

### Issue 4: High Spam Rate

**Symptom:** Emails marked as spam by recipients

**Fix:**
1. Review email content (remove spam triggers)
2. Add unsubscribe link
3. Verify email addresses before sending
4. Remove inactive users
5. Monitor complaint rate (should be < 0.1%)

---

## 📈 Expected Timeline

| Time | Status | Action |
|------|--------|--------|
| **Day 1** | DNS records added | Wait for propagation |
| **Day 2-3** | Records propagating | Run tests, verify records |
| **Day 3-7** | Building reputation | Send low volume, monitor |
| **Week 2** | Improving delivery | Increase volume gradually |
| **Week 3-4** | Normal delivery | Monitor and maintain |

---

## ✅ Final Checklist

Before considering the issue "fixed":

- [ ] SPF record verified (MXToolbox)
- [ ] DKIM records verified (MXToolbox)
- [ ] DMARC record added
- [ ] Domain verified in SMTP provider
- [ ] Mail-tester score 9/10 or higher
- [ ] Test emails to Gmail → inbox ✓
- [ ] Test emails to Outlook → inbox ✓
- [ ] No blacklist warnings
- [ ] Google Postmaster Tools showing good reputation
- [ ] Email templates reviewed for spam triggers
- [ ] Unsubscribe link added (if marketing emails)

---

## 🆘 Still Having Issues?

### Debug Checklist:

1. **Check Recent Changes**
   - Did you change DNS records?
   - Did you switch SMTP providers?
   - Did you change email templates?

2. **Check Error Logs**
   - Supabase Dashboard → Logs
   - SMTP provider dashboard → Delivery logs
   - Look for bounces, complaints

3. **Get Help**
   - SendGrid Support: https://support.sendgrid.com/
   - Resend Support: https://resend.com/support
   - Supabase Discord: https://discord.supabase.com/

---

## 📚 Resources

- **SPF Record Generator**: https://www.spfwizard.net/
- **DMARC Generator**: https://dmarcian.com/dmarc-inspector/
- **Email Headers Analyzer**: https://toolbox.googleapps.com/apps/messageheader/
- **DNS Propagation Checker**: https://www.whatsmydns.net/
- **Blacklist Check**: https://mxtoolbox.com/blacklists.aspx

---

## 💡 Pro Tips

1. **Monitor Daily** (First 2 Weeks)
   - Check spam rates
   - Monitor bounce rates
   - Watch for complaints

2. **Segment Your Users**
   - Send to engaged users first
   - Avoid inactive users initially
   - Build reputation gradually

3. **Keep Records Clean**
   - Validate email addresses
   - Remove bounced emails
   - Honor unsubscribe requests

4. **Test Before Major Sends**
   - Send to yourself first
   - Check spam score
   - Verify links work

5. **Document Everything**
   - Keep record of DNS changes
   - Track spam rates
   - Note what works/doesn't work

---

**Last Updated**: December 2024

Need more help? Check the main guide: [SUPABASE_EMAIL_AND_AUTH_SETUP.md](./SUPABASE_EMAIL_AND_AUTH_SETUP.md)
