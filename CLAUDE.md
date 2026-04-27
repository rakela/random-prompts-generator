# randomprompts.org — SEO Automation Context

## What this project is
Free AI prompt generator platform at **randomprompts.org**. Built with Astro 5 + Tailwind + Vercel.
Generates prompts for writing, AI art (MidJourney, DALL-E, GPT Image 2, Veo 3), blogs, and more.

## Stack quick reference
- Pages: `src/pages/*.astro` (static) + `src/pages/blog/[slug].astro` (dynamic)
- SEO metadata: `src/data/seo.ts` — single source of truth for all page titles/descriptions/keywords
- Blog content: `src/data/blogPosts.ts` — title + excerpt feed meta tags; slug must match URL
- Sitemap: `src/pages/sitemap.xml.js` — add every new URL here with correct priority
- www redirect: `vercel.json` — 301 from www → non-www already in place

## Git workflow
- Feature branch: `claude/bold-bell-lkOFO`
- Always merge to `main` after committing. Vercel auto-deploys from `main`.
- Push command: `git push origin claude/bold-bell-lkOFO && git checkout main && git merge claude/bold-bell-lkOFO && git push origin main && git checkout claude/bold-bell-lkOFO`

---

## Daily SEO task — self-select from this backlog

Each session, pick the **highest-priority pending task** below, execute it, mark it done, and push to main.
If a new trending keyword appears (AI model launch, viral trend), prioritize that as P0 over everything.

### Decision logic
1. Is there a brand-new AI model/feature released in the last 7 days? → **Create a new page (P0)**
2. Any page with >5K impressions and <3% CTR in GSC? → **CTR fix (P1)**
3. Any page sitting position 15–25 with decent impressions? → **Content improvement (P2)**
4. Otherwise → **Internal linking or blog post (P3)**

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

- [ ] `grok-imagine-prompt-generator` — "grok imagine prompts" trending since Elon Musk viral post (April 3, 2026). No page on site. Model is FLUX.1-based, responds to natural language. Slug must be `/grok-imagine-prompt-generator`.

- [ ] `chibi-ai-prompt-generator` — Chibi style consistently trending in 2026 for AI image generation. Multiple platforms competing but no clear SEO winner. Slug: `/chibi-ai-prompt-generator`.

- [ ] `kling-3-prompt-generator` — Kling 3.0 is a top AI video model in 2026, site has Veo 3 but not Kling. Slug: `/kling-3-prompt-generator`.

### P4 — Blog posts (informational intent, long-tail)

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

## Technical fixes applied

- `vercel.json`: 301 redirect www → non-www (2026-04-27)
- `seo.js`: `isPrimaryDomain()` now only matches exact non-www domain (2026-04-27)
