# randomprompts.org — SEO Automation Context

## What this project is
Free AI prompt generator platform at **randomprompts.org**. Built with Astro 5 + Tailwind + Vercel.
Generates prompts for writing, AI art (MidJourney, DALL-E, GPT Image 2, Veo 3, Kling 3), blogs, and more.

## Stack quick reference
- Pages: `src/pages/*.astro` (static) + `src/pages/blog/[slug].astro` (dynamic)
- SEO metadata: `src/data/seo.ts` — single source of truth for all page titles/descriptions/keywords
- Blog content: `src/data/blogPosts.ts` — title + excerpt feed meta tags; slug must match URL
- Sitemap: `src/pages/sitemap.xml.js` — add every new URL here with correct priority
- www redirect: `vercel.json` — 301 from www → non-www already in place

## Git workflow
- Feature branch: `claude/bold-bell-w5Uqi`
- Always merge to `main` after committing. Vercel auto-deploys from `main`.
- Push command: `git push -u origin claude/bold-bell-w5Uqi && git checkout main && git merge claude/bold-bell-w5Uqi && git push origin main && git checkout claude/bold-bell-w5Uqi`

---

## Daily SEO routine — self-select and execute each session

Each session, run steps 1–4, then pick the highest-priority task from the backlog and execute it.

### Step 1 — Keyword scan (run every session)
Search for:
- New AI model launches in the last 7 days (image, video, text, multimodal)
- Trending AI prompt queries (check `kwrds.ai/top-google-searches`, `trends.google.com`)
- Viral AI trends on X/Twitter or TikTok that have search intent

### Step 2 — Decision logic
1. New AI model/feature released in last 7 days? → **Create new page (P0)** — highest priority always
2. Any page >5K impressions AND <3% CTR in GSC? → **CTR title/description fix (P1)**
3. Page at position 15–25 with decent impressions? → **Content expansion (P2)**
4. None of the above → **New content page from backlog (P3)** or **blog post (P4)**

### Step 3 — Execute
- New page: keyword must appear in slug, H1, meta description, and first paragraph. Add to `seo.ts` and `sitemap.xml.js`.
- CTR fix: rewrite title and description in `seo.ts` only — no page content changes needed.
- Content expansion: add intro copy, more prompts, a usage guide section, and FAQ block.

### Step 4 — Commit and push to main
```
git add -A
git commit -m "seo: [description of change]"
git push -u origin claude/bold-bell-w5Uqi && git checkout main && git merge claude/bold-bell-w5Uqi && git push origin main && git checkout claude/bold-bell-w5Uqi
```

---

## What access is needed to fully automate this

To run this loop autonomously without manual GSC checks:

1. **Google Search Console API** — read impressions, CTR, and position per page programmatically. Needed to self-identify P1/P2 targets without manual data exports. OAuth2 service account, scoped to `https://www.googleapis.com/auth/webmasters.readonly`.
2. **Google Analytics API (GA4)** — read real-time traffic data and landing page performance. Needed to validate whether new pages are being indexed and receiving traffic.
3. **Keyword research API** — SEMrush, Ahrefs, or Moz API for search volume and keyword difficulty data. Needed to validate new keywords before building pages.
4. **Scheduled trigger** — a cron job or GitHub Actions workflow that runs this Claude session daily at a set time (e.g., 9 AM UTC) and auto-pushes results.

With items 1–4 in place, the entire daily loop (scan → decide → execute → push) can run without any human input.

---

## Backlog (ordered by priority)

### P1 — CTR fixes (title + description rewrites in seo.ts or blogPosts.ts)

- [ ] `/writing-prompts-generator` — pos 19.4, 4,165 impressions, 2.6% CTR
  - Current title: `Writing Prompt Generator — Random Prompts for Every Genre`
  - Problem: position too deep AND title is generic. Needs both title fix and content improvement.
  - Action: rewrite title to `Random Writing Prompt Generator — Free, Unlimited (No Signup)` + add more content to the hub page to improve ranking.

- [ ] `/prompts/coquette-aesthetic` — pos 3.7, 318 impressions, 1.9% CTR
  - Small volume but at position 3.7 the CTR should be 8%+. Check what the dynamic page title is and fix it.

- [ ] `/prompts/dark-academia-aesthetic` — pos 4.5, 430 impressions, 1.6% CTR (28-day)
  - Same issue as coquette. Dynamic page — check `src/pages/prompts/[category].astro` title generation.

### P2 — Content improvements (add more content to improve rank)

- [ ] `/writing-prompts-generator` hub page — pos 19.4
  - Add a proper intro section, more generator links, and an FAQ block targeting "random writing prompt generator" queries.
  - File: `src/pages/writing-prompts-generator/index.astro`

- [ ] `/generators/paragraph` — pos 9.2, 10,923 impressions
  - Title fixed (2026-04-27). Now improve page content: add more prompts, a usage guide, and FAQ targeting "random paragraph generator" exact match.
  - File: `src/pages/generators/paragraph.astro`

### P3 — New content pages (trending keywords, no page exists yet)

- [x] `kling-3-prompt-generator` — created 2026-04-29. Kling 3.0 is top AI video model in 2026. 20 prompts, FAQs, comparison table vs Veo 3 / Runway / Seedance.

- [ ] `grok-imagine-prompt-generator` — "grok imagine prompts" trending since Elon Musk viral post (April 3, 2026). No page on site. Model is FLUX.1-based, responds to natural language. Slug must be `/grok-imagine-prompt-generator`.

- [ ] `chibi-ai-prompt-generator` — Chibi style consistently trending in 2026 for AI image generation. Multiple platforms competing but no clear SEO winner. Slug: `/chibi-ai-prompt-generator`.

- [ ] `seedance-2-prompt-generator` — ByteDance's Seedance 2.0 went viral (Feb 2026), API live April 9 on fal.ai. Hottest image-to-video model. Slug: `/seedance-2-prompt-generator`.

### P4 — Blog posts (informational intent, long-tail)

- [ ] Blog post: "Kling 3 vs Veo 3: Which AI Video Model Should You Use in 2026?" — targets high-volume comparison query, links to both pages.
- [ ] Blog post: "GPT Image 2 vs MidJourney: Which Should You Use in 2026?" — targets comparison searches, links to new GPT Image 2 page.
- [ ] Blog post: "How to Write Prompts for Grok Imagine" — targets tutorial intent, links to new Grok page once created.

---

## Search Console benchmarks (last updated 2026-04-27)

| Page | Impressions (3mo) | Position | CTR | Status |
|---|---|---|---|---|
| `/chatgpt-photo-editing-prompts` | 28,220 | 3.4 | 1.1% → fixed 2026-04-27 |
| `/generators/paragraph` | 10,923 | 9.2 | 1.1% → fixed 2026-04-27 |
| `/blog/best-chatgpt-gemini-photo-editing-prompts` | 11,666 | 5.7 | 2.3% → fixed 2026-04-27 |
| `/gemini-photo-editing-prompts` | 5,995 | 9.4 | 2% → fixed 2026-04-27 |
| `/generators/idea` | 11,089 | 16.2 | 7.5% | Top performer — protect |
| `/writing-prompts-generator/theme` | 9,744 | 8.7 | 5% | Healthy |
| `/gemini-ai-snow-prompt-tutorial` | 15,738 | 6.2 | 2.7% | Seasonal, fading |
| `/writing-prompts-generator` | 4,165 | 19.4 | 2.6% | Needs content work |

## Pages created (this sprint)

- `/gpt-image-2-prompt-generator` — created 2026-04-27. Exploding keyword (GPT Image 2 released April 21, 2026).
- `/kling-3-prompt-generator` — created 2026-04-29. Top AI video model in 2026. 20 prompts, multi-shot guide, comparison table, FAQs, cross-links to Veo 3.

## Technical fixes applied

- `vercel.json`: 301 redirect www → non-www (2026-04-27)
- `seo.js`: `isPrimaryDomain()` now only matches exact non-www domain (2026-04-27)
