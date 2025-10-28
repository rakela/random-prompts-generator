# SEO Setup Documentation

## Overview

This document describes the SEO infrastructure for the Random Prompts Generator application. The setup ensures proper canonical URLs, blocks non-primary domains from indexing, and keeps the sitemap synchronized with routes.

## Primary Domain

**Primary Domain:** `randomprompts.org`

All canonical URLs point to this domain, regardless of where the page is accessed from.

## Key Components

### 1. SEO Utility (`src/utils/seo.js`)

Core utility functions for SEO management:

- **`getCanonicalUrl(path)`** - Generates canonical URLs always pointing to primary domain
- **`isPrimaryDomain()`** - Checks if current domain is the primary domain
- **`getRobotsMeta()`** - Returns `noindex, nofollow` for non-primary domains
- **`getPageSEO(options)`** - Complete SEO configuration generator for pages

### 2. SEO Component (`src/components/SEO.jsx`)

Reusable React component that wraps react-helmet-async to provide:

- Canonical URLs (always pointing to primary domain)
- Meta descriptions and keywords
- Open Graph tags
- Twitter Card tags
- Robots meta tags (blocks non-primary domains)
- JSON-LD structured data

**Usage Example:**

```jsx
import SEO from './components/SEO';

function MyPage() {
  return (
    <div>
      <SEO
        path="my-page"
        title="My Page Title - Site Name"
        description="Page description for SEO"
        keywords="keyword1, keyword2, keyword3"
      />
      {/* Page content */}
    </div>
  );
}
```

### 3. Domain Blocking

**Multiple layers of protection:**

#### Layer 1: index.html Script
```javascript
// Runs immediately on page load
// Blocks non-primary domains by setting robots meta to noindex,nofollow
```

#### Layer 2: React Components
```javascript
// Each page using SEO component automatically gets correct robots meta
// Based on domain check via isPrimaryDomain()
```

**Result:** Non-primary domains (staging, preview, alternative domains) are automatically blocked from search engine indexing.

### 4. Sitemap Generation

**Automated sitemap generation** via Node.js script.

#### Location
`scripts/generate-sitemap.js`

#### Features
- Generates sitemap.xml with all routes
- Automatically updates lastmod date to current date
- Validates route configuration
- Outputs summary of URLs included

#### Usage

```bash
# Generate sitemap manually
npm run generate-sitemap

# Sitemap is automatically generated during build
npm run build
```

#### Adding New Pages to Sitemap

Edit `scripts/generate-sitemap.js` and add the route to the `routes` array:

```javascript
const routes = [
  // ... existing routes ...
  {
    path: 'new-page-url',
    priority: '0.9',
    changefreq: 'weekly'
  }
];
```

### 5. robots.txt

Location: `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://randomprompts.org/sitemap.xml
```

Allows all crawlers on primary domain. Non-primary domains are blocked via meta robots tags.

## Migration Guide

### Updating Existing Pages

Replace the old Helmet implementation with the new SEO component:

**Before:**
```jsx
import { Helmet } from 'react-helmet-async';

function MyPage() {
  return (
    <div>
      <Helmet>
        <title>My Page Title</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="https://randomprompts.org/my-page" />
        {/* ... more meta tags ... */}
      </Helmet>
      {/* content */}
    </div>
  );
}
```

**After:**
```jsx
import SEO from './components/SEO';

function MyPage() {
  return (
    <div>
      <SEO
        path="my-page"
        title="My Page Title - Site Name"
        description="..."
        keywords="keyword1, keyword2"
      />
      {/* content */}
    </div>
  );
}
```

### Pages to Update

The following pages still need to be migrated to use the new SEO component:

- [ ] `src/AIImagesPromptPage.tsx`
- [ ] `src/BlogPostGeneratorPage.tsx`
- [ ] `src/ShortStoryPromptsPage.tsx`
- [ ] `src/RandomNameGeneratorPage.tsx`
- [ ] `src/GhostfaceAIPromptPage.tsx`
- [ ] `src/OctoberWritingPromptsPage.tsx`
- [ ] `src/WritingPromptsForStudentsPage.tsx`
- [ ] `src/PersuasiveWritingTopicsPage.tsx`
- [ ] `src/NanoBananaPromptsPage.tsx`
- [ ] `prompt-generator.tsx` (home page)

**Reference:** `src/WritingPromptsPage.tsx` has been updated as an example.

## Verification Checklist

### ✅ Domain Blocking

Test non-primary domain blocking:

1. Deploy to staging/preview URL
2. View page source
3. Check for `<meta name="robots" content="noindex, nofollow">`
4. Open DevTools console - should see warning message

### ✅ Canonical URLs

Verify canonical URLs:

1. View page source on any domain
2. Check `<link rel="canonical">` tag
3. Should always point to `https://randomprompts.org/[path]`

### ✅ Sitemap

Validate sitemap:

1. Visit `https://randomprompts.org/sitemap.xml`
2. Verify all pages are listed
3. Check lastmod dates are current
4. Validate XML format

### ✅ robots.txt

Check robots.txt:

1. Visit `https://randomprompts.org/robots.txt`
2. Verify sitemap URL is correct
3. Verify User-agent rules are appropriate

## Build Process

The sitemap is automatically regenerated during the build process:

```json
{
  "scripts": {
    "build": "npm run generate-sitemap && vite build"
  }
}
```

This ensures the sitemap is always up-to-date with the latest routes and current date.

## Development Notes

### Testing Locally

To test domain blocking locally:

1. Add entry to `/etc/hosts`: `127.0.0.1 test-domain.local`
2. Access app via `http://test-domain.local:5173`
3. Check console for domain blocking warning
4. Verify robots meta is set to noindex,nofollow

### Adding Structured Data

To add page-specific structured data:

```jsx
<SEO
  path="my-page"
  title="..."
  description="..."
  structuredData={{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "...",
    "datePublished": "..."
  }}
/>
```

## Troubleshooting

### Sitemap Not Updating

1. Run `npm run generate-sitemap` manually
2. Check if route is added to `scripts/generate-sitemap.js`
3. Verify build process completes successfully

### Domain Not Being Blocked

1. Check browser console for warnings
2. Verify robots meta tag in page source
3. Clear cache and hard reload
4. Check if PRIMARY_DOMAIN constant matches in:
   - `src/utils/seo.js`
   - `index.html` (domain verification script)

### Canonical URLs Incorrect

1. Verify path parameter in SEO component
2. Check PRIMARY_URL constant in `src/utils/seo.js`
3. Inspect page source to verify Helmet is working

## Best Practices

1. **Always use the SEO component** for new pages
2. **Update sitemap script** when adding new routes
3. **Test on non-primary domains** to verify blocking
4. **Regenerate sitemap** before major releases
5. **Monitor Search Console** for indexing issues

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Sitemap Protocol](https://www.sitemaps.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)

---

**Last Updated:** October 28, 2025
**Maintained By:** Development Team
