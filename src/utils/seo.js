/**
 * SEO Utilities for Random Prompts Generator
 * Handles canonical URLs, domain verification, and robots meta tags
 */

// Primary domain configuration
const PRIMARY_DOMAIN = 'randomprompts.org';
const PRIMARY_URL = `https://${PRIMARY_DOMAIN}`;

/**
 * Get the current domain from window.location
 * @returns {string} Current domain (e.g., 'randomprompts.org')
 */
export const getCurrentDomain = () => {
  if (typeof window === 'undefined') return PRIMARY_DOMAIN;
  return window.location.hostname;
};

/**
 * Check if current domain is the primary domain
 * @returns {boolean} True if on primary domain
 */
export const isPrimaryDomain = () => {
  const currentDomain = getCurrentDomain();
  return currentDomain === PRIMARY_DOMAIN || currentDomain === `www.${PRIMARY_DOMAIN}`;
};

/**
 * Get canonical URL for a given path
 * Always returns the primary domain URL regardless of where the page is accessed
 * @param {string} path - The path (e.g., '/writing-prompts')
 * @returns {string} Full canonical URL
 */
export const getCanonicalUrl = (path = '') => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanPath ? `${PRIMARY_URL}/${cleanPath}` : PRIMARY_URL;
};

/**
 * Get robots meta tag content based on domain
 * Non-primary domains should not be indexed
 * @returns {string} Robots meta content
 */
export const getRobotsMeta = () => {
  if (isPrimaryDomain()) {
    return 'index, follow';
  }
  // Block all non-primary domains from indexing
  return 'noindex, nofollow';
};

/**
 * Get structured data for WebApplication
 * @param {string} path - Current page path
 * @returns {object} JSON-LD structured data
 */
export const getWebApplicationSchema = (path = '') => {
  return ;
};

/**
 * SEO configuration object generator
 * Use this to get all SEO meta tags for a page
 * @param {object} options - Page-specific SEO options
 * @param {string} options.path - Current page path
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Page keywords
 * @returns {object} Complete SEO configuration
 */
export const getPageSEO = ({ path = '', title, description, keywords = '' }) => {
  const canonicalUrl = getCanonicalUrl(path);
  const robotsMeta = getRobotsMeta();

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    robotsMeta,
    ogUrl: canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
  };
};

/**
 * Log SEO warnings in development
 */
export const logSEOStatus = () => {
  if (process.env.NODE_ENV === 'development') {
    const isDomainPrimary = isPrimaryDomain();
    const domain = getCurrentDomain();

    console.log('🔍 SEO Status:');
    console.log(`   Domain: ${domain}`);
    console.log(`   Is Primary: ${isDomainPrimary}`);
    console.log(`   Robots: ${getRobotsMeta()}`);

    if (!isDomainPrimary) {
      console.warn('⚠️  Non-primary domain detected - Pages will have noindex,nofollow');
    }
  }
};
