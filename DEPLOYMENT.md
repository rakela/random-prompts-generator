# Deployment Guide

## Build Status ✅

The application has been successfully built and is ready for deployment!

### Build Output
- **Location**: `dist/` directory
- **Size**: ~672 KB (main bundle)
- **Pages**: 17 prerendered pages for optimal SEO
- **Assets**: CSS, JS, images, sitemap, and OG image

## Deployment Options

### Option 1: Vercel (Recommended)

This project is already configured for Vercel deployment with `vercel.json`.

#### Deploy via GitHub Integration (Automatic)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import the `rakela/random-prompts-old` repository
5. Vercel will automatically detect the configuration
6. Click "Deploy"

**Automatic deployments**: Every push to your main branch will trigger a new deployment.

#### Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in and click "Add new site"
3. Import from Git (select your repository)
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install -g gh-pages

# Deploy to GitHub Pages
gh-pages -d dist
```

Note: Update the `base` in `vite.config.js` if deploying to a subdirectory.

### Option 4: Static Hosting (Any Provider)

Simply upload the contents of the `dist/` directory to any static hosting provider:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- DigitalOcean App Platform
- Cloudflare Pages

## Build Commands

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Individual build steps
npm run generate-og-image    # Generate Open Graph image
npm run generate-sitemap     # Generate sitemap.xml
npm run prerender           # Pre-render pages for SEO
```

## Environment Variables

Currently, no environment variables are required. If you add API keys or secrets in the future:

1. Create a `.env` file (already in .gitignore)
2. Add your variables: `VITE_API_KEY=your_key_here`
3. Access in code: `import.meta.env.VITE_API_KEY`
4. Add to your hosting provider's environment settings

## Domain Configuration

The sitemap is configured for: **https://randomprompts.org**

To change the domain:
1. Update `scripts/generate-sitemap.js` (line with `baseDomain`)
2. Rebuild: `npm run build`
3. Redeploy

## Performance Optimization

The build includes:
- **Code splitting**: Automatic chunking for better loading
- **Minification**: CSS and JS are minified
- **Prerendering**: All routes are prerendered for SEO
- **Asset optimization**: Images and fonts are optimized

**Note**: There's a warning about large chunks (>500KB). Consider code-splitting for even better performance:
```javascript
// In your router, use lazy loading:
const WritingPrompts = lazy(() => import('./WritingPromptsPage'))
```

## Monitoring

Consider adding these monitoring tools:
- **Vercel Analytics**: Already integrated via `@vercel/speed-insights`
- **Google Analytics**: Add to `index.html`
- **Sentry**: For error tracking

## Troubleshooting

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing issues on deployment
Ensure your hosting provider is configured for SPA routing:
- **Vercel**: Already configured in `vercel.json`
- **Netlify**: Add `_redirects` file with `/* /index.html 200`
- **Others**: Configure server to serve `index.html` for all routes

## Next Steps

1. ✅ Build completed successfully
2. ✅ Code committed and pushed to GitHub
3. 🔄 Choose a deployment option above
4. 🚀 Deploy your app
5. 🌐 Configure your domain (optional)
6. 📊 Set up monitoring (optional)

---

**Built with**: React + Vite + Tailwind CSS
**Deployment ready**: Yes ✅
**Date**: 2025-11-20
