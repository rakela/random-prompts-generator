/**
 * Centralized SEO Meta Descriptions for Random Prompts Generator
 * All descriptions are kept under 160 characters for optimal SEO performance
 * Each entry includes: title, description (max 160 chars), keywords, and path
 */

export const seoDescriptions = {
  home: {
    path: '',
    title: 'Random Prompts Generator - Writing, Stories, & AI Art',
    description: 'Generate unlimited random prompts for writing, AI art, blogs, stories & names. Free prompt generator for ChatGPT, MidJourney & creative projects.',
    keywords: 'random prompts generator, random writing prompts, random story prompts, ai art prompts, random prompt generator'
  },

  writingPrompts: {
    path: 'writing-prompts',
    title: 'Random Writing Prompt Generator - Free Writing Prompts',
    description: 'Free random writing prompt generator with unique conflicts, plot twists & emotional stakes. Break through writer\'s block with creative story prompts.',
    keywords: 'writing prompts, random writing prompts, writing prompt generator, story prompts, creative writing prompts, random story prompt generator'
  },

  aiImagesPrompt: {
    path: 'ai-images-prompt',
    title: 'AI Images Prompt Generator - Free AI Art Prompts for MidJourney & DALL-E',
    description: 'Generate professional AI art prompts for MidJourney, DALL-E & Stable Diffusion. Free AI images prompt with lighting, composition & artistic styles.',
    keywords: 'ai images prompt, ai art prompt generator, midjourney prompts, dall-e prompts, stable diffusion prompts, ai image generation'
  },

  blogPostGenerator: {
    path: 'ai-blog-post-generator',
    title: 'AI Blog Post Generator - Free Blog Post Ideas & Topics',
    description: 'Generate SEO-optimized blog post ideas instantly. Free blog topic generator with proven formats, compelling hooks & keyword-rich content strategies.',
    keywords: 'blog post generator, blog post ideas, blog topic generator, seo blog ideas, content ideas generator, blog writing prompts'
  },

  shortStoryPrompts: {
    path: 'short-story-prompts-generator',
    title: 'Short Story Prompts Generator - Free Random Story Ideas',
    description: 'Generate creative short story prompts with compelling conflicts & plot twists. Free random story prompt generator for flash fiction & short stories.',
    keywords: 'short story prompts, story prompts generator, random story prompts, flash fiction prompts, short story ideas, creative story generator'
  },

  randomNameGenerator: {
    path: 'random-name-generator',
    title: 'Random Name Generator - Fantasy & Character Names',
    description: 'Generate unique fantasy character names for stories & games. Random name generator with elvish, dwarven, human & exotic names. Free & unlimited.',
    keywords: 'random name generator, fantasy name generator, character name generator, random character names, fantasy names, dnd name generator'
  },

  midjourneyPrompts: {
    path: 'midjourney-ai-prompts',
    title: 'MidJourney AI Prompts Generator - Free MidJourney Prompts',
    description: 'Generate professional MidJourney prompts with advanced techniques. Free MidJourney AI prompt generator optimized for stunning V6 AI art results.',
    keywords: 'midjourney prompts, midjourney ai prompts, midjourney prompt generator, midjourney v6 prompts, ai art prompts, midjourney ideas'
  },

  ghostfacePrompt: {
    path: 'ghostface-ai-prompt',
    title: 'Ghostface AI Prompt Generator - Horror Character Prompts',
    description: 'Generate Ghostface AI art prompts for horror-themed images. Free Ghostface prompt generator for MidJourney, DALL-E & Stable Diffusion Halloween art.',
    keywords: 'ghostface ai prompt, ghostface prompts, horror ai prompts, scream prompts, halloween ai art, horror character generator'
  },

  geminiAISnowPromptTutorial: {
    path: 'gemini-ai-snow-prompt-tutorial',
    title: 'Gemini AI Snow Prompt Tutorial - Professional Winter Portrait Prompts',
    description: 'Master Gemini AI snow portraits with professional prompts. Create stunning winter photography with ready-to-use templates & advanced techniques.',
    keywords: 'gemini ai snow prompt tutorial, gemini ai snow, winter portrait prompts, snow photography ai, gemini ai winter, ai snow portraits, google gemini prompts'
  },

  nanoBananaPrompts: {
    path: 'nano-banana-prompts',
    title: 'Nano Banana Prompts - NaNoWriMo Writing Prompts Generator',
    description: 'Nano Banana Prompts for NaNoWriMo! Generate creative writing prompts to hit your 50k word goal. Free NaNoWriMo prompt generator for novelists.',
    keywords: 'nano banana prompts, nanowrimo prompts, nano prompts, writing prompts nanowrimo, novel writing prompts, nanowrimo ideas'
  },

  octoberWritingPrompts: {
    path: 'october-writing-prompts',
    title: 'October Writing Prompts - Halloween & Fall Story Ideas',
    description: 'Generate spooky October writing prompts for Halloween & autumn stories. Free fall writing prompt generator with horror, mystery & seasonal themes.',
    keywords: 'october writing prompts, halloween writing prompts, fall writing prompts, spooky prompts, october story ideas, autumn writing prompts'
  },

  persuasiveEssaysTopics: {
    path: 'persuasive-essays-topics',
    title: 'Persuasive Essays Topics Generator - Argumentative Essay Ideas',
    description: 'Generate compelling persuasive essay topics for students. Free argumentative essay topic generator with debate-worthy ideas & controversial subjects.',
    keywords: 'persuasive essays topics, argumentative essay topics, debate topics, persuasive writing topics, essay topic generator, persuasive topics'
  },

  persuasiveWritingTopics: {
    path: 'persuasive-writing-topics',
    title: 'Persuasive Writing Topics Generator - Debate & Opinion Topics',
    description: 'Generate engaging persuasive writing topics for essays & debates. Free persuasive topic generator with controversial & thought-provoking subjects.',
    keywords: 'persuasive writing topics, persuasive topics, debate topics, opinion writing topics, argumentative topics, persuasive essay ideas'
  },

  persuasiveWritingTitles: {
    path: 'persuasive-writing-titles',
    title: 'Persuasive Writing Titles Generator - Compelling Essay Titles',
    description: 'Generate attention-grabbing persuasive writing titles. Free essay title generator with powerful headlines for argumentative & persuasive essays.',
    keywords: 'persuasive writing titles, essay titles generator, argumentative titles, persuasive headlines, essay title ideas, writing titles'
  },

  writingPromptsForStudents: {
    path: 'writing-prompts-for-students',
    title: 'Writing Prompts for Students - Creative Writing Ideas for School',
    description: 'Free writing prompts for students K-12. Generate age-appropriate creative writing ideas for essays, stories & classroom assignments. Educational prompts.',
    keywords: 'writing prompts for students, student writing prompts, creative writing for students, school writing prompts, classroom writing ideas'
  },

  privacy: {
    path: 'privacy',
    title: 'Privacy Policy - Random Prompts Generator',
    description: 'Privacy Policy for RandomPrompts.org. Learn how we protect your data and privacy when using our free random prompt generator tools.',
    keywords: 'privacy policy, data protection, privacy, random prompts generator privacy'
  },

  terms: {
    path: 'terms',
    title: 'Terms of Service - Random Prompts Generator',
    description: 'Terms of Service for RandomPrompts.org. Review our usage terms and conditions for the free random prompts generator platform.',
    keywords: 'terms of service, terms and conditions, usage terms, random prompts generator terms'
  }
};

/**
 * Get SEO data for a specific page by key
 * @param {string} pageKey - The key identifier for the page (e.g., 'home', 'writingPrompts')
 * @returns {object} SEO data object containing title, description, keywords, and path
 */
export const getSEOData = (pageKey) => {
  return seoDescriptions[pageKey] || seoDescriptions.home;
};

/**
 * Get SEO data by path
 * @param {string} path - The URL path (e.g., 'writing-prompts', 'ai-images-prompt')
 * @returns {object} SEO data object or home page data if not found
 */
export const getSEODataByPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const entry = Object.values(seoDescriptions).find(seo => seo.path === cleanPath);
  return entry || seoDescriptions.home;
};

export default seoDescriptions;
