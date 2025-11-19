/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for hosting on any platform
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // SEO-friendly URLs with trailing slashes

  // Disable TypeScript errors during build (for now, during migration)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Note: Redirects are handled client-side for static exports
  // See middleware.ts for redirect logic
};

export default nextConfig;
