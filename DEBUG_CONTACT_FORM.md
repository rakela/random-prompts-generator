# Contact Form Debug Guide

Follow these steps to troubleshoot the contact form.

---

## Step 1: Check Browser Console

**Open Developer Tools:**
- Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Firefox: Press `F12`
- Safari: `Cmd+Option+I`

**Go to Console Tab:**
1. Visit: http://localhost:4321/contact
2. Open the form
3. Fill it out and submit
4. Look for any RED error messages in the console

**Common Errors:**

❌ **"Failed to fetch"** or **"NetworkError"**
- The API endpoint isn't responding
- Server might not be running
- Check Step 2 below

❌ **"404 Not Found"**
- The `/api/contact` route isn't found
- Make sure the file exists at: `src/pages/api/contact.ts`
- Restart your dev server

❌ **"500 Internal Server Error"**
- The API endpoint is crashing
- Check server logs (Step 3)
- Usually means SendGrid config is missing or wrong

---

## Step 2: Test API Endpoint Directly

**Option A: Using cURL (Terminal/Command Line)**

```bash
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "general",
    "message": "This is a test message"
  }'
```

**Option B: Using Browser Console**

1. Go to: http://localhost:4321/contact
2. Open browser console (F12)
3. Paste this code and press Enter:

```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'general',
    message: 'This is a test message'
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully..."
}
```

**If you get an error, note the exact message and go to Step 3**

---

## Step 3: Check Server Logs

**In your terminal where you ran `npm run dev`:**

Look for messages starting with `[contact]`

**Common Log Messages:**

✅ **Good:**
```
[contact] Email sent successfully from: test@example.com
```

❌ **Bad - Missing API Key:**
```
[contact] SendGrid API key not configured
```
→ **Fix:** Add `SENDGRID_API_KEY` to your `.env` file

❌ **Bad - SendGrid Error:**
```
[contact] SendGrid error: 401 Unauthorized
```
→ **Fix:** Your API key is wrong. Get a new one from SendGrid

❌ **Bad - Invalid Email:**
```
[contact] SendGrid error: 400 The from email does not contain a valid address
```
→ **Fix:** Verify your sender email in SendGrid (see Step 4)

---

## Step 4: Verify Environment Variables

**Check your `.env` file exists:**

```bash
ls -la .env
```

**Check if variables are set:**

```bash
# On Mac/Linux
cat .env | grep SENDGRID

# On Windows (PowerShell)
Select-String -Path .env -Pattern "SENDGRID"
```

**You should see:**
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxx
CONTACT_EMAIL=hello@randomprompts.org
SENDGRID_FROM_EMAIL=noreply@randomprompts.org
```

**If missing:**
1. Copy `.env.example` to `.env`
2. Add your actual SendGrid API key
3. Restart your dev server

---

## Step 5: Test SendGrid API Key

**Test if your API key works:**

```bash
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer YOUR_SENDGRID_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{"to": [{"email": "your-email@example.com"}]}],
    "from": {"email": "noreply@randomprompts.org"},
    "subject": "SendGrid Test",
    "content": [{"type": "text/plain", "value": "Test email"}]
  }'
```

**Replace:**
- `YOUR_SENDGRID_API_KEY_HERE` with your actual key
- `your-email@example.com` with your email
- `noreply@randomprompts.org` with your verified sender

**Expected Response:**
- Status: `202 Accepted` (empty body is normal)

**Common Errors:**

❌ **401 Unauthorized:**
```json
{"errors": [{"message": "The provided authorization grant is invalid..."}]}
```
→ Your API key is wrong or expired. Create a new one.

❌ **403 Forbidden:**
```json
{"errors": [{"message": "The from email does not contain a valid address"}]}
```
→ The sender email isn't verified in SendGrid.

**To Fix 403:**
1. Go to: https://app.sendgrid.com/settings/sender_auth/senders
2. Click "Create New Sender"
3. Use email: `noreply@randomprompts.org`
4. Check your inbox and verify

---

## Step 6: Check File Structure

**Make sure these files exist:**

```bash
# API endpoint
ls -la src/pages/api/contact.ts

# Contact page
ls -la src/pages/contact.astro
```

**If `contact.ts` is missing:**
- The file should be at: `src/pages/api/contact.ts`
- Check if it was created correctly
- Restart your dev server

---

## Step 7: Restart Dev Server

**Sometimes you just need a fresh start:**

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

**Wait for:**
```
🚀  astro  v4.x.x started in XXXms

  ┃ Local    http://localhost:4321/
```

Then try the form again.

---

## Step 8: Check Network Tab

**In Browser DevTools:**

1. Go to **Network** tab
2. Submit the form
3. Look for request to `/api/contact`

**Click on the request and check:**

- **Status:** Should be `200 OK`
- **Response:** Should show success message
- **Request Payload:** Should show your form data

**Common Issues:**

❌ **Status 404:** API endpoint not found → Restart server

❌ **Status 500:** Server error → Check logs (Step 3)

❌ **Status 400:** Bad request → Check what data is being sent

❌ **No request appears:** JavaScript error → Check Console (Step 1)

---

## Quick Checklist

Run through this quickly:

- [ ] Dev server is running (`npm run dev`)
- [ ] `.env` file exists with `SENDGRID_API_KEY`
- [ ] SendGrid API key is valid (test with Step 5)
- [ ] Sender email is verified in SendGrid
- [ ] File exists: `src/pages/api/contact.ts`
- [ ] File exists: `src/pages/contact.astro`
- [ ] No errors in browser console
- [ ] No errors in server logs

---

## Still Not Working?

### Try This Manual Test:

1. **Create a test file:** `test-contact.js`

```javascript
// test-contact.js
const SENDGRID_API_KEY = 'YOUR_API_KEY_HERE';
const CONTACT_EMAIL = 'hello@randomprompts.org';
const FROM_EMAIL = 'noreply@randomprompts.org';

const emailData = {
  personalizations: [{
    to: [{ email: CONTACT_EMAIL }],
    subject: 'Test Contact Form'
  }],
  from: {
    email: FROM_EMAIL,
    name: 'Random Prompts Contact Form'
  },
  content: [{
    type: 'text/plain',
    value: 'This is a test message from the contact form'
  }]
};

fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(emailData)
})
.then(res => {
  console.log('Status:', res.status);
  if (!res.ok) {
    return res.text().then(text => {
      console.error('Error:', text);
    });
  }
  console.log('✅ Email sent successfully!');
})
.catch(err => console.error('❌ Fetch error:', err));
```

2. **Run it:**
```bash
node test-contact.js
```

3. **Check result:**
- ✅ "Email sent successfully" → SendGrid is working, issue is in the app
- ❌ Error message → SendGrid config is wrong

---

## Get More Help

**Provide this info when asking for help:**

1. **Error message** from browser console
2. **Error message** from server logs
3. **SendGrid test result** from Step 5
4. **Network request details** from Step 8
5. **Your .env variables** (WITHOUT the actual API key!)

Example:
```
Error in console: "500 Internal Server Error"
Server log: "[contact] SendGrid error: 401"
SendGrid test: 401 Unauthorized
.env has: SENDGRID_API_KEY=SG.xxx... (yes, it's set)
```

---

## Common Solutions Summary

| Problem | Solution |
|---------|----------|
| "Failed to fetch" | Restart dev server |
| "404 Not Found" | Check if `src/pages/api/contact.ts` exists |
| "500 Internal Server Error" | Check server logs for SendGrid error |
| "401 Unauthorized" | Get new SendGrid API key |
| "403 Forbidden" | Verify sender email in SendGrid |
| Form submits but no email | Check `CONTACT_EMAIL` in `.env` |
| Email goes to spam | Verify domain in SendGrid (see SENDGRID_SETUP.md) |

---

**Still stuck?** Share your debug results and I'll help! 🚀
