export const PRIMARY_DOMAIN = 'randomprompts.org';
export const PRIMARY_URL = `https://${PRIMARY_DOMAIN}`;

export interface SEOData {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage?: string; // Optional custom OG image URL
}

export const seoData: Record<string, SEOData> = {
  home: {
    path: '',
    title: 'Random Prompt Generator - Writing, Stories, & AI Art',
    description: 'Generate unlimited random prompts for writing, AI art, blogs, stories & names. Free prompt generator for ChatGPT, MidJourney & creative projects.',
    keywords: 'random prompts generator, random writing prompts, random story prompts, ai art prompts, random prompt generator'
  },
  writingPrompts: {
    path: 'writing-prompts',
    title: 'Random Writing Prompt Generator - Free Writing Prompts',
    description: 'Free random writing prompt generator with unique conflicts, plot twists & emotional stakes. Break through writer\'s block with creative story prompts.',
    keywords: 'writing prompts, random writing prompts, writing prompt generator, story prompts, creative writing prompts, random story prompt generator'
  },
  writingPromptsGenerators: {
    path: 'writing-prompts-generator',
    title: 'Writing Prompt Generator — Random Prompts for Every Genre',
    description: 'Generate random writing prompts instantly. Choose from story starters, conflict, character, dialogue, villain, emotion, and more. Free generator.',
    keywords: 'writing prompt generator, random writing prompts, story ideas, creative writing, writing prompt generators, character generator, plot generator'
  },
  aiImagesPrompt: {
    path: 'ai-images-prompt',
    title: 'AI Image Prompt Generator — Random Prompts for Any Style',
    description: 'Generate detailed AI image prompts for Midjourney, DALL-E, and Stable Diffusion. Aesthetic, fantasy, anime, cyberpunk, and more. Free.',
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
    path: 'midjourney-ai-picture-generator',
    title: 'MidJourney AI Prompts Generator - Free MidJourney Prompts',
    description: 'Generate professional MidJourney prompts with advanced techniques. Free MidJourney AI prompt generator optimized for stunning V6 AI art results.',
    keywords: 'midjourney prompts, midjourney ai prompts, midjourney prompt generator, midjourney v6 prompts, ai art prompts, midjourney ideas'
  },
  gptImage2PromptGenerator: {
    path: 'gpt-image-2-prompt-generator',
    title: 'GPT Image 2 Prompt Generator — Free Copy-Paste Prompts (2026)',
    description: 'GPT Image 2 prompt generator with 20 free, copy-ready prompts for OpenAI\'s latest image model. Portraits, products, posters, UI design, and more — updated April 2026.',
    keywords: 'gpt image 2 prompts, gpt image 2 prompt generator, chatgpt images 2.0 prompts, gpt image 2 examples, gpt image 2 free prompts, openai gpt image 2, gpt image 2 guide'
  },
  ghostfacePrompt: {
    path: 'ghostface-ai-trend-prompt-generator',
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
  chatgptPhotoEditingPrompts: {
    path: 'chatgpt-photo-editing-prompts',
    title: 'ChatGPT Photo Editing Prompts — 30+ Free Templates (Copy & Paste)',
    description: '30+ ChatGPT photo editing prompts — copy and paste directly. Portrait retouching, cinematic color grading, background removal, vintage film & more. Free, no signup. Works with GPT Image 2.',
    keywords: 'chatgpt photo editing prompts, chatgpt photo editing, ai photo editing prompts, photo editing ai, chatgpt for photo editing, chatgpt prompts for editing photos'
  },
  geminiPhotoEditingPrompts: {
    path: 'gemini-photo-editing-prompts',
    title: 'Gemini Photo Editing Prompts — 20+ Free Templates (Copy & Paste)',
    description: '20+ Gemini AI photo editing prompts — copy and paste directly. Portrait retouching, cinematic color grading, background swap & more. Free, no signup. Updated April 2026.',
    keywords: 'gemini photo editing prompts, gemini ai photo editing, google gemini photo editor, gemini prompts for photos, ai photo editing gemini, gemini image editing'
  },
  nanoBananaPrompts: {
    path: 'nano-banana-prompts',
    title: 'Nano Banana Prompts — Best Cat Figurine Templates (Copy & Paste)',
    description: 'Get the best Nano Banana AI prompts for cat figurines, chef scenes, and collectible-style renders. Copy and paste directly into ChatGPT or Gemini.',
    keywords: 'nano banana prompts, nano banana cat, viral cat figurine ai, nano banana ai prompts, cat figurine prompts, nano banana trend'
  },
  octoberWritingPrompts: {
    path: 'october-writing-prompts',
    title: 'October Writing Prompts - Halloween & Fall Story Ideas',
    description: 'Generate spooky October writing prompts for Halloween & autumn stories. Free fall writing prompt generator with horror, mystery & seasonal themes.',
    keywords: 'october writing prompts, halloween writing prompts, fall writing prompts, spooky prompts, october story ideas, autumn writing prompts'
  },
  christmasWritingPrompts: {
    path: 'christmas-writing-prompts',
    title: 'Christmas Writing Prompts - Holiday & Winter Story Ideas',
    description: 'Discover heartwarming Christmas writing prompts for holiday stories & winter tales. Free festive writing prompt generator with cozy, magical seasonal themes.',
    keywords: 'christmas writing prompts, holiday writing prompts, winter writing prompts, festive prompts, christmas story ideas, holiday story prompts'
  },
  // Generator Category Pages
  writingGenerators: {
    path: 'writing-generators',
    title: 'Writing Generators - Character, Plot, Setting & Story Tools',
    description: 'Explore 15+ writing generators for characters, plots, settings, conflicts, and worldbuilding. Professional tools for authors, storytellers, and creative writers.',
    keywords: 'writing generators, story generators, character generator, plot generator, writing tools, creative writing generators, fiction generators'
  },
  aiArtGenerators: {
    path: 'art-prompts',
    title: 'AI Art Generators - MidJourney & DALL-E Prompt Tools',
    description: 'Professional AI art prompt generators for MidJourney, DALL-E, Stable Diffusion. Create aesthetic, photography, fantasy, sci-fi, and anime prompts.',
    keywords: 'ai art generators, midjourney prompts, dall-e prompts, ai art tools, aesthetic prompts, ai image generators, prompt generators'
  },
  creativeIdeaGenerators: {
    path: 'generators',
    title: 'Creative Idea Generators - Random Ideas for Projects & Stories',
    description: 'Random idea generators for hobbies, objects, superpowers, fantasy names, and creative brainstorming. Spark inspiration for writing, games, and art.',
    keywords: 'creative idea generators, random idea generator, brainstorming tools, creative tools, random generators, idea prompts, creativity generators'
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
    title: 'Privacy Policy - Random Prompt Generator',
    description: 'Privacy Policy for RandomPrompts.org. Learn how we protect your data and privacy when using our free random prompt generator tools.',
    keywords: 'privacy policy, data protection, privacy, random prompts generator privacy'
  },
  terms: {
    path: 'terms',
    title: 'Terms of Service - Random Prompt Generator',
    description: 'Terms of Service for RandomPrompts.org. Review our usage terms and conditions for the free random prompts generator platform.',
    keywords: 'terms of service, terms and conditions, usage terms, random prompts generator terms'
  },
  // Writing Generators
  randomParagraphGenerator: {
    path: 'generators/paragraph',
    title: 'Random Paragraph Generator — Free, Unlimited, No Signup',
    description: 'Random paragraph generator — instant results, no signup, unlimited use. Perfect for writing practice, ESL exercises, creative drafts, and placeholder text. Free forever.',
    keywords: 'random paragraph generator, paragraph generator, random text generator, writing practice, creative writing exercises'
  },
  randomSentenceGenerator: {
    path: 'generators/sentence',
    title: 'Random Sentence Generator - Random Prompts',
    description: 'Create random sentences for writing warmups, ESL practice, and creativity boosts. Free random sentence generator for writers and learners.',
    keywords: 'random sentence generator, sentence generator, random sentences, writing warmup, creative sentences'
  },
  randomDialogueGenerator: {
    path: 'writing-prompts-generator/random-dialogue',
    title: 'Random Dialogue Generator - Random Prompts',
    description: 'Generate random dialogue lines and conversations to practice character voices and scenes. Free dialogue prompt generator for fiction writers.',
    keywords: 'random dialogue generator, dialogue prompts, conversation generator, character dialogue, fiction dialogue'
  },
  randomCharacterGenerator: {
    path: 'writing-prompts-generator/character',
    title: 'Random Character Generator - Random Prompts',
    description: 'Create random characters with traits, goals, and flaws. Free character generator for stories, RPGs, and worldbuilding.',
    keywords: 'random character generator, character creator, character traits, rpg characters, story characters'
  },
  randomStoryStarterGenerator: {
    path: 'writing-prompts-generator/story-starters',
    title: 'Random Story Starter Generator - Random Prompts',
    description: 'Get random story starters and opening lines to kick off your next story. Free story starter generator for writers and students.',
    keywords: 'random story starter, story starters, story opening, writing prompts, story beginning'
  },
  randomConflictGenerator: {
    path: 'writing-prompts-generator/conflict',
    title: 'Random Conflict Generator - Random Prompts',
    description: 'Generate random story conflicts and problems for your characters to face. Free conflict generator for fiction and screenwriting.',
    keywords: 'random conflict generator, story conflict, plot conflict, character problems, narrative tension'
  },
  randomPlotTwistGenerator: {
    path: 'writing-prompts-generator/plot-twist',
    title: 'Random Plot Twist Generator - Random Prompts',
    description: 'Discover random plot twists that surprise readers and raise the stakes. Free plot twist generator for novels and short stories.',
    keywords: 'random plot twist, plot twist generator, story twists, surprise endings, narrative twists'
  },
  randomThemeGenerator: {
    path: 'writing-prompts-generator/theme',
    title: 'Random Theme Generator - Random Prompts',
    description: 'Generate random story themes and big ideas to explore in your writing. Free theme generator for stories, essays, and journaling.',
    keywords: 'random theme generator, story themes, writing themes, narrative themes, thematic ideas'
  },
  randomSettingGenerator: {
    path: 'writing-prompts-generator/setting',
    title: 'Random Setting Generator - Random Prompts',
    description: 'Create random settings with time, place, and atmosphere for your stories. Free setting generator for fiction and RPG campaigns.',
    keywords: 'random setting generator, story setting, scene setting, location generator, world setting'
  },
  randomVillainGenerator: {
    path: 'writing-prompts-generator/villain',
    title: 'Random Villain Generator - Random Prompts',
    description: 'Generate random villains with motives, flaws, and backstories. Free villain generator for fantasy, sci-fi, and thrillers.',
    keywords: 'random villain generator, villain creator, antagonist generator, bad guy generator, villain backstory'
  },
  randomHeroGenerator: {
    path: 'writing-prompts-generator/hero',
    title: 'Random Hero Generator - Random Prompts',
    description: 'Create random heroes and protagonists with goals and inner conflicts. Free hero generator for stories, comics, and games.',
    keywords: 'random hero generator, hero creator, protagonist generator, character hero, hero traits'
  },
  randomWorldbuildingPromptsGenerator: {
    path: 'writing-prompts-generator/worldbuilding',
    title: 'Random Worldbuilding Prompts Generator - Random Prompts',
    description: 'Generate worldbuilding prompts for cultures, magic, politics, and history. Free worldbuilding prompt generator for fantasy and sci-fi.',
    keywords: 'worldbuilding prompts, world building generator, fantasy worldbuilding, sci-fi worldbuilding, culture creation'
  },
  randomMagicSystemGenerator: {
    path: 'writing-prompts-generator/magic-system',
    title: 'Random Magic System Generator - Random Prompts',
    description: 'Create random magic system ideas with rules, limits, and costs. Free magic system generator for fantasy writers and RPG creators.',
    keywords: 'magic system generator, fantasy magic, magic rules, magic system ideas, rpg magic system'
  },
  randomEmotionPromptGenerator: {
    path: 'writing-prompts-generator/emotion',
    title: 'Random Emotion Prompt Generator - Random Prompts',
    description: 'Generate emotion-based writing prompts focused on feelings, tension, and inner conflict. Free emotion prompt generator for deep scenes.',
    keywords: 'emotion prompts, feeling prompts, emotional writing, character emotions, inner conflict prompts'
  },
  randomRelationshipPromptGenerator: {
    path: 'writing-prompts-generator/relationship',
    title: 'Random Relationship Prompt Generator - Random Prompts',
    description: 'Create random relationship prompts for friendships, families, and romance. Free relationship prompt generator for character-driven stories.',
    keywords: 'relationship prompts, character relationships, romance prompts, friendship prompts, family dynamics'
  },
  // AI Art Generators
  randomDrawingPromptGenerator: {
    path: 'art-prompts/drawing',
    title: 'Random Drawing Prompt Generator - Creative Art Ideas & Sketching Prompts',
    description: 'Generate random drawing prompts for sketching, illustration practice, and creative art inspiration. Free drawing prompt generator with subjects, styles, and themes for artists.',
    keywords: 'random drawing prompt, drawing prompts, art prompts, sketching ideas, drawing ideas, illustration prompts, art practice, creative drawing'
  },
  randomAestheticPromptGenerator: {
    path: 'art-prompts/aesthetic',
    title: 'Random Aesthetic Prompt Generator (For Art, Photography & AI)',
    description: 'Generate aesthetic prompts for AI art, Pinterest boards, photography, and moodboards. Free random aesthetic generator with Dark Academia, Cottagecore, Y2K, and 30+ aesthetic styles.',
    keywords: 'aesthetic prompt generator, random aesthetic generator, aesthetic prompts for ai art, pinterest aesthetic prompt, aesthetic photo prompt generator, aesthetic layout prompt'
  },
  randomArtStyleGenerator: {
    path: 'art-prompts/art-style',
    title: 'Random Art Style Generator — Discover Your Next Style',
    description: 'Spin a random art style — impressionism, cyberpunk, watercolor, and 100+ more. Great for artists, AI prompts, and creative challenges. Free.',
    keywords: 'art style generator, random art style, art styles for drawing, ai art styles, illustration styles, drawing styles generator'
  },
  randomPhotographyPromptGenerator: {
    path: 'art-prompts/photography',
    title: 'Random Photography Prompt Generator - Random Prompts',
    description: 'Generate random photography prompts with subjects, locations, and lighting ideas. Free photo prompt generator for creators and AI images.',
    keywords: 'photography prompts, photo ideas, photography generator, photo shoot ideas, camera prompts'
  },
  randomCharacterDesignPromptGenerator: {
    path: 'art-prompts/character-design',
    title: 'Random Character Design Prompt Generator - Random Prompts',
    description: 'Create random character design prompts for outfits, poses, and personalities. Perfect for concept artists and AI character generation.',
    keywords: 'character design prompts, character design generator, concept art prompts, character art ideas, visual character design'
  },
  randomEnvironmentDesignGenerator: {
    path: 'art-prompts/environment',
    title: 'Random Environment Design Generator - Random Prompts',
    description: 'Generate random environment design prompts for landscapes, interiors, and worlds. Free tool for environment artists and AI art prompts.',
    keywords: 'environment design, landscape prompts, scene design, location art, world design prompts'
  },
  randomSciFiPromptGenerator: {
    path: 'art-prompts/sci-fi-art',
    title: 'Random Sci-Fi Prompt Generator - Random Prompts',
    description: 'Get random sci-fi prompts for stories and AI art with tech, space, and future worlds. Free sci-fi prompt generator for writers and creators.',
    keywords: 'sci-fi prompts, science fiction prompts, futuristic ideas, space prompts, tech prompts'
  },
  randomFantasyArtPromptGenerator: {
    path: 'art-prompts/fantasy-art',
    title: 'Fantasy Art Prompt Generator — 100+ Random Ideas',
    description: 'Generate random fantasy art prompts instantly. Landscapes, creatures, characters, and scenes. Click to get a new idea. Free, no signup needed.',
    keywords: 'fantasy art prompts, fantasy prompts, magical art, fantasy creatures, medieval art prompts'
  },
  randomAnimePromptGenerator: {
    path: 'art-prompts/anime',
    title: 'Random Anime Prompt Generator - Random Prompts',
    description: 'Create random anime prompts for characters, scenes, and aesthetics. Free anime prompt generator for artists and AI anime images.',
    keywords: 'anime prompts, anime generator, anime art prompts, manga prompts, anime character ideas'
  },
  randomPortraitPromptGenerator: {
    path: 'art-prompts/portrait',
    title: 'Random Portrait Prompt Generator - Random Prompts',
    description: 'Generate random portrait prompts with styles, angles, and moods. Free portrait prompt generator for photography and AI image tools.',
    keywords: 'portrait prompts, portrait ideas, portrait photography, face art prompts, character portraits'
  },
  randomLightingStyleGenerator: {
    path: 'art-prompts/lighting',
    title: 'Random Lighting Style Generator - Random Prompts',
    description: 'Discover random lighting styles for scenes and photos, from soft sunset to harsh neon. Free lighting style generator for artists and AI visuals.',
    keywords: 'lighting styles, lighting prompts, photo lighting, scene lighting, cinematic lighting'
  },
  // Creative Idea Generators
  randomFantasyNameGenerator: {
    path: 'generators/fantasy-name',
    title: 'Random Fantasy Name Generator - Random Prompts',
    description: 'Generate random fantasy names for characters, places, and creatures. Free fantasy name generator for novels, games, and DnD campaigns.',
    keywords: 'fantasy name generator, fantasy names, character names, place names, dnd names'
  },
  randomObjectGenerator: {
    path: 'generators/object',
    title: 'Random Object Generator - Random Prompts',
    description: 'Get random objects to spark story ideas, drawing prompts, and writing exercises. Free random object generator for creatives and teachers.',
    keywords: 'random object generator, object prompts, random items, creative objects, drawing objects'
  },
  randomHobbyGenerator: {
    path: 'generators/hobby',
    title: 'Random Hobby Generator - Random Prompts',
    description: 'Discover random hobbies for characters or real life inspiration. Free hobby generator for writers, coaches, and self-discovery.',
    keywords: 'random hobby generator, hobby ideas, character hobbies, hobby inspiration, activity generator'
  },
  randomSuperpowerGenerator: {
    path: 'generators/superpower',
    title: 'Random Superpower Generator - Random Prompts',
    description: 'Generate random superpowers with strengths, limits, and drawbacks. Free superpower generator for comics, films, and RPGs.',
    keywords: 'superpower generator, random superpowers, power ideas, superhero powers, ability generator'
  },
  randomIdeaGenerator: {
    path: 'generators/idea',
    title: 'Random Idea Generator - Random Prompts',
    description: 'Create random ideas for projects, stories, content, and brainstorming. Free random idea generator for creators, students, and entrepreneurs.',
    keywords: 'random idea generator, creative ideas, brainstorming tool, idea prompts, inspiration generator'
  },
  randomBookPromptGenerator: {
    path: 'random-book-prompt-generator',
    title: 'Random Book Prompt Generator - Free Novel Writing Ideas',
    description: 'Generate creative book prompts for novels with unique plot ideas, mind-bending concepts, and compelling narratives. Free random book prompt generator for authors and fiction writers.',
    keywords: 'random book prompt generator, book prompts, novel writing prompts, book ideas, fiction prompts, novel ideas generator, creative book ideas'
  },
  moviePromptsGenerator: {
    path: 'movie-prompts-generator',
    title: 'Movie Prompts Generator - Film & Screenplay Ideas',
    description: 'Generate movie prompts for screenwriters and filmmakers with drama, thriller, sci-fi, horror, and romance ideas. Free film prompt generator for creative screenwriting.',
    keywords: 'movie prompts generator, film prompts, screenplay ideas, movie ideas, screenwriting prompts, film story ideas, cinema prompts'
  },
  // New AI Tools
  textToPrompt: {
    path: 'tools/text-to-prompt',
    title: 'Prompt Expander & Logic | AI Text-to-Prompt Generator',
    description: 'Transform short ideas into detailed prompts or structured JSON objects. Expand brief concepts into comprehensive prompts optimized for ChatGPT, Claude, Gemini, Midjourney, and more.',
    keywords: 'prompt expander, text to prompt, ai prompt generator, prompt engineering, chatgpt prompts, claude prompts, midjourney prompts, prompt logic, structured prompts'
  },
  imageToPrompt: {
    path: 'tools/image-to-prompt',
    title: 'Image Analyzer | Reverse Engineer Images to AI Prompts',
    description: 'Upload images and get detailed text prompts that describe them. Perfect for recreating images with AI, understanding visual composition, or learning prompt engineering.',
    keywords: 'image to prompt, reverse engineer images, image analyzer, ai image prompts, image description, visual analysis, prompt from image, recreate images'
  },
  videoAIGeneration: {
    path: 'tools/video-ai-generation',
    title: 'Sora & Veo Prompts | AI Video Generation Optimizer',
    description: 'Generate optimized prompts for Sora, Veo, and RunwayML. Create cinematic AI video prompts with perfect camera movements, physics control, and visual styling.',
    keywords: 'sora prompts, veo prompts, ai video generation, video ai prompts, runway ml prompts, sora ai, veo ai, video generation prompts, cinematic ai prompts'
  },
  veo3PromptGenerator: {
    path: 'veo-3-prompt-generator',
    title: 'Veo 3 Prompt Generator — Free Google Veo 3 Video Prompts',
    description: 'Free Veo 3 prompt generator for Google\'s AI video model. Generate cinematic, viral, and professional video prompts for Veo 3 and Veo 3.1. Copy and use instantly.',
    keywords: 'veo 3 prompt generator, veo 3 prompts, google veo 3 prompt, veo 3.1 prompts, ai video prompts, veo 3 prompt examples, google veo prompts, veo 3 video generator prompts'
  },
  blog: {
    path: 'blog',
    title: 'Articles | AI Prompting Guides, Tutorials & Inspiration',
    description: 'Expert guides on AI prompting, video generation, prompt engineering, and creative inspiration. Learn from tutorials and discover new techniques for ChatGPT, Claude, Midjourney, and more.',
    keywords: 'ai prompting guides, prompt engineering tutorials, ai art tutorials, video ai guides, chatgpt tutorials, claude guides, midjourney tips, ai inspiration'
  }
};

export function getSEOData(pageKey: string): SEOData {
  return seoData[pageKey] || seoData.home;
}

export function getSEODataByPath(path: string): SEOData {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const entry = Object.values(seoData).find(seo => seo.path === cleanPath);
  return entry || seoData.home;
}

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanPath ? `${PRIMARY_URL}/${cleanPath}` : PRIMARY_URL;
}
