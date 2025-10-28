import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getPageSEO } from '../utils/seo';

/**
 * SEO Component
 * Handles all meta tags, canonical URLs, and structured data
 * Automatically blocks non-primary domains from indexing
 *
 * @param {object} props - SEO properties
 * @param {string} props.path - Current page path (e.g., 'writing-prompts')
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords (comma-separated)
 * @param {object} props.structuredData - Optional structured data (JSON-LD)
 * @param {string} props.ogImage - Optional Open Graph image URL
 */
const SEO = ({
  path = '',
  title,
  description,
  keywords = '',
  structuredData = null,
  ogImage = null
}) => {
  const seo = getPageSEO({ path, title, description, keywords });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}

      {/* Robots - Critical for domain blocking */}
      <meta name="robots" content={seo.robotsMeta} />

      {/* Canonical URL - Always points to primary domain */}
      <link rel="canonical" href={seo.canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.ogUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
