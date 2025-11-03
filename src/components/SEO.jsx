import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getPageSEO } from '../utils/seo';
import { getSEOData } from '../data/seoDescriptions';

/**
 * SEO Component
 * Handles all meta tags, canonical URLs, and structured data
 * Automatically blocks non-primary domains from indexing
 *
 * @param {object} props - SEO properties
 * @param {string} props.pageKey - Page identifier key (e.g., 'writingPrompts', 'home') - if provided, uses centralized SEO data
 * @param {string} props.path - Current page path (e.g., 'writing-prompts') - used if pageKey not provided
 * @param {string} props.title - Page title - used if pageKey not provided
 * @param {string} props.description - Page description - used if pageKey not provided
 * @param {string} props.keywords - Page keywords (comma-separated) - used if pageKey not provided
 * @param {object} props.structuredData - Optional structured data (JSON-LD)
 * @param {string} props.ogImage - Optional Open Graph image URL
 */
const SEO = ({
  pageKey = null,
  path = '',
  title,
  description,
  keywords = '',
  structuredData = null,
  ogImage = null
}) => {
  // If pageKey is provided, use centralized SEO data
  let seoData;
  if (pageKey) {
    const centralizedData = getSEOData(pageKey);
    seoData = getPageSEO({
      path: centralizedData.path,
      title: centralizedData.title,
      description: centralizedData.description,
      keywords: centralizedData.keywords
    });
  } else {
    // Fall back to manual props
    seoData = getPageSEO({ path, title, description, keywords });
  }

  const seo = seoData;

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
