# Supadata API Setup Guide

## 🎯 What is Supadata?

Supadata is a free API service that fetches YouTube transcripts and handles YouTube's cloud IP blocking automatically. No VPS, no servers, no maintenance required.

### FREE Tier:
- **100 transcripts per month**
- **No credit card required**
- **AI fallback** if native captions unavailable

---

## 📝 Step 1: Sign Up for Supadata

1. Go to https://supadata.ai
2. Click **"Sign Up"** or **"Get Started"**
3. Create your account (email + password)
4. **No credit card required!**

---

## 🔑 Step 2: Get Your API Key

1. After signing up, go to https://supadata.ai/dashboard
2. You'll see your **API Key** displayed on the dashboard
3. Copy the API key (format: `sd_xxxxxxxxxxxxxxxxxx`)

---

## ⚙️ Step 3: Add API Key to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project (randomprompts-org)
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `SUPADATA_API_KEY`
   - **Value**: Your API key from Step 2 (e.g., `sd_xxxxxxxxxxxxxxxxxx`)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your project

### Option B: Via Command Line (Alternative)

```bash
# Add environment variable via Vercel CLI
vercel env add SUPADATA_API_KEY

# Paste your API key when prompted
# Select: Production, Preview, Development (all)
```

---

## 🚀 Step 4: Deploy

After adding the environment variable, redeploy your project:

1. Go to Vercel dashboard → Your project
2. Click **"Deployments"** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**

Or via command line:
```bash
git add .
git commit -m "Switch to Supadata API for YouTube transcripts"
git push
```

Vercel will automatically redeploy.

---

## ✅ Step 5: Test It!

1. Go to your live site: https://randomprompts.org
2. Navigate to any YouTube tool (e.g., YouTube Content Brief Generator)
3. Enter a YouTube URL (try: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
4. Click **"Generate"**

### Expected Result:
You should see the transcript successfully generated!

### Check Vercel Logs:
1. Go to Vercel dashboard → Your project → **Deployments**
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Look for logs showing:
   ```
   [YouTube] Using: Supadata API
   [YouTube] ✓ SUCCESS: 15234 characters
   ```

---

## 📊 Monitor Your Usage

1. Go to https://supadata.ai/dashboard
2. Check your **Credits Remaining** (out of 100 per month)
3. Usage resets monthly

### If You Exceed 100/month:
- You can upgrade to a paid plan (starting at $10/month for 1000 credits)
- Or wait until next month (usage resets)

---

## 🆘 Troubleshooting

### Error: "SUPADATA_API_KEY environment variable is not set"

**Solution:**
- Make sure you added the environment variable in Vercel
- Make sure you redeployed after adding the variable
- Check spelling: `SUPADATA_API_KEY` (all uppercase, underscore)

### Error: "Failed to fetch YouTube transcript"

**Possible causes:**
1. Video doesn't have captions → Try a different video (TED Talks always have captions)
2. Video is private/age-restricted → Use a public video
3. Invalid API key → Check your API key in Supadata dashboard
4. Exceeded free tier (100/month) → Check usage in dashboard

### Error: "Authentication failed" or "Invalid API key"

**Solution:**
- Go to https://supadata.ai/dashboard
- Copy your API key again (make sure no extra spaces)
- Update the environment variable in Vercel
- Redeploy

---

## 💡 Tips

### Good Test Videos (Always Have Captions):
- TED Talks: https://www.youtube.com/watch?v=UF8uR6Z6KLc
- CNN News: Any recent CNN video
- Educational channels: Khan Academy, Crash Course, etc.

### Monitoring Usage:
- Check your Supadata dashboard regularly
- 100 transcripts/month = ~3 per day
- Adjust your usage if approaching limit

### Upgrading (Optional):
If you need more than 100 transcripts/month:
- **Starter Plan**: $10/month for 1,000 credits
- **Pro Plan**: $50/month for 10,000 credits
- **Custom Plan**: Contact Supadata for higher volumes

---

## 📈 Advantages of Supadata

✅ **No VPS required** - Pure API, no server maintenance
✅ **Reliable** - Handles YouTube blocking automatically
✅ **FREE tier** - 100/month with no credit card
✅ **AI Fallback** - Generates transcript if YouTube blocks
✅ **Simple** - Just add API key, works immediately
✅ **No quotas** on YouTube API - Uses Supadata's infrastructure

---

## 🔐 Security Note

Your API key should be kept secret. Never commit it to GitHub or share it publicly. That's why we use environment variables in Vercel.

---

## 📚 Additional Resources

- **Supadata Documentation**: https://docs.supadata.ai/
- **Supadata Dashboard**: https://supadata.ai/dashboard
- **Supadata Pricing**: https://supadata.ai/pricing
- **Support**: contact@supadata.ai

---

## Summary

1. Sign up at https://supadata.ai (no credit card)
2. Copy your API key from dashboard
3. Add `SUPADATA_API_KEY` to Vercel environment variables
4. Redeploy
5. Test with a YouTube video
6. Monitor usage at dashboard

That's it! Your YouTube transcript fetching now works reliably through Supadata. 🎉
