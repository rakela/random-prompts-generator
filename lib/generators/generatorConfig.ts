export interface GeneratorMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  keywords: string;
  category: 'writing' | 'ai-art' | 'drawing' | 'special';
  path: string;
  legacyPath?: string; // Old URL for redirects
  icon?: string; // Lucide icon name
}

export const generatorConfig: Record<string, GeneratorMetadata> = {
  // WRITING GENERATORS
  'writing-prompts': {
    id: 'writing-prompts',
    slug: 'writing-prompts',
    title: 'Random Writing Prompts Generator - Creative Story Ideas',
    description: 'Generate creative writing prompts with unique characters, conflicts, settings, and plot twists. Perfect for overcoming writer\'s block.',
    h1: 'Writing Prompts Generator',
    keywords: 'writing prompts, creative writing, story ideas, plot generator, character ideas',
    category: 'writing',
    path: '/writing-prompts/',
    legacyPath: null,
    icon: 'PenTool'
  },
  'paragraph': {
    id: 'paragraph',
    slug: 'paragraph',
    title: 'Random Paragraph Generator - Create Sample Text',
    description: 'Generate random paragraphs for writing practice, testing, and creative inspiration.',
    h1: 'Random Paragraph Generator',
    keywords: 'random paragraph, text generator, sample text, writing practice',
    category: 'writing',
    path: '/writing-prompts/paragraph/',
    legacyPath: '/random-paragraph-generator',
    icon: 'FileText'
  },
  'sentence': {
    id: 'sentence',
    slug: 'sentence',
    title: 'Random Sentence Generator - Create Unique Sentences',
    description: 'Generate random sentences for creative writing, practice, and inspiration.',
    h1: 'Random Sentence Generator',
    keywords: 'random sentence, sentence generator, writing practice, creative sentences',
    category: 'writing',
    path: '/writing-prompts/sentence/',
    legacyPath: '/random-sentence-generator',
    icon: 'Type'
  },
  'dialogue': {
    id: 'dialogue',
    slug: 'dialogue',
    title: 'Random Dialogue Generator - Create Character Conversations',
    description: 'Generate realistic dialogue prompts for character conversations and story development.',
    h1: 'Random Dialogue Generator',
    keywords: 'dialogue generator, character dialogue, conversation prompts, story dialogue',
    category: 'writing',
    path: '/writing-prompts/dialogue/',
    legacyPath: '/random-dialogue-generator',
    icon: 'MessageSquare'
  },
  'character': {
    id: 'character',
    slug: 'character',
    title: 'Random Character Generator - Create Unique Story Characters',
    description: 'Generate detailed character profiles with personalities, backgrounds, and motivations for your stories.',
    h1: 'Character Generator',
    keywords: 'character generator, character creation, story characters, character traits',
    category: 'writing',
    path: '/writing-prompts/character/',
    legacyPath: '/random-character-generator',
    icon: 'User'
  },
  'story-starter': {
    id: 'story-starter',
    slug: 'story-starter',
    title: 'Random Story Starter Generator - Begin Your Story',
    description: 'Generate engaging story starters and opening lines to kick off your creative writing.',
    h1: 'Story Starter Generator',
    keywords: 'story starter, opening lines, story beginning, writing prompts',
    category: 'writing',
    path: '/writing-prompts/story-starter/',
    legacyPath: '/random-story-starter-generator',
    icon: 'Sparkles'
  },
  'conflict': {
    id: 'conflict',
    slug: 'conflict',
    title: 'Random Conflict Generator - Create Story Conflicts',
    description: 'Generate compelling conflicts and tensions for your stories and characters.',
    h1: 'Conflict Generator',
    keywords: 'conflict generator, story conflict, plot tension, character conflict',
    category: 'writing',
    path: '/writing-prompts/conflict/',
    legacyPath: '/random-conflict-generator',
    icon: 'Zap'
  },
  'plot-twist': {
    id: 'plot-twist',
    slug: 'plot-twist',
    title: 'Random Plot Twist Generator - Surprise Your Readers',
    description: 'Generate unexpected plot twists and revelations to surprise your readers.',
    h1: 'Plot Twist Generator',
    keywords: 'plot twist, story twist, plot surprises, story revelations',
    category: 'writing',
    path: '/writing-prompts/plot-twist/',
    legacyPath: '/random-plot-twist-generator',
    icon: 'RefreshCw'
  },
  'theme': {
    id: 'theme',
    slug: 'theme',
    title: 'Random Theme Generator - Story Themes & Meanings',
    description: 'Generate meaningful themes and messages for your stories and creative writing.',
    h1: 'Theme Generator',
    keywords: 'theme generator, story themes, writing themes, literary themes',
    category: 'writing',
    path: '/writing-prompts/theme/',
    legacyPath: '/random-theme-generator',
    icon: 'BookOpen'
  },
  'setting': {
    id: 'setting',
    slug: 'setting',
    title: 'Random Setting Generator - Create Story Locations',
    description: 'Generate unique and atmospheric settings for your stories and narratives.',
    h1: 'Setting Generator',
    keywords: 'setting generator, story locations, world settings, story places',
    category: 'writing',
    path: '/writing-prompts/setting/',
    legacyPath: '/random-setting-generator',
    icon: 'MapPin'
  },
  'villain': {
    id: 'villain',
    slug: 'villain',
    title: 'Random Villain Generator - Create Story Antagonists',
    description: 'Generate compelling villains and antagonists with motivations and backstories.',
    h1: 'Villain Generator',
    keywords: 'villain generator, antagonist creator, story villains, bad guy generator',
    category: 'writing',
    path: '/writing-prompts/villain/',
    legacyPath: '/random-villain-generator',
    icon: 'Skull'
  },
  'hero': {
    id: 'hero',
    slug: 'hero',
    title: 'Random Hero Generator - Create Story Protagonists',
    description: 'Generate heroic protagonists with unique abilities, flaws, and destinies.',
    h1: 'Hero Generator',
    keywords: 'hero generator, protagonist creator, main character, hero traits',
    category: 'writing',
    path: '/writing-prompts/hero/',
    legacyPath: '/random-hero-generator',
    icon: 'Shield'
  },
  'worldbuilding': {
    id: 'worldbuilding',
    slug: 'worldbuilding',
    title: 'Random Worldbuilding Prompts Generator - Build Your World',
    description: 'Generate detailed worldbuilding prompts for fantasy and sci-fi worlds.',
    h1: 'Worldbuilding Generator',
    keywords: 'worldbuilding, world creation, fantasy worlds, world generator',
    category: 'writing',
    path: '/writing-prompts/worldbuilding/',
    legacyPath: '/random-worldbuilding-prompts-generator',
    icon: 'Globe'
  },
  'magic-system': {
    id: 'magic-system',
    slug: 'magic-system',
    title: 'Random Magic System Generator - Create Unique Magic',
    description: 'Generate unique magic systems with rules, costs, and limitations for fantasy worlds.',
    h1: 'Magic System Generator',
    keywords: 'magic system, fantasy magic, magic rules, magic generator',
    category: 'writing',
    path: '/writing-prompts/magic-system/',
    legacyPath: '/random-magic-system-generator',
    icon: 'Wand2'
  },
  'emotion': {
    id: 'emotion',
    slug: 'emotion',
    title: 'Random Emotion Prompt Generator - Emotional Writing',
    description: 'Generate emotion-focused prompts to create emotional depth in your writing.',
    h1: 'Emotion Prompt Generator',
    keywords: 'emotion prompts, emotional writing, character emotions, feelings generator',
    category: 'writing',
    path: '/writing-prompts/emotion/',
    legacyPath: '/random-emotion-prompt-generator',
    icon: 'Heart'
  },
  'relationship': {
    id: 'relationship',
    slug: 'relationship',
    title: 'Random Relationship Prompt Generator - Character Dynamics',
    description: 'Generate relationship prompts and dynamics between characters in your stories.',
    h1: 'Relationship Prompt Generator',
    keywords: 'relationship prompts, character relationships, romance prompts, character dynamics',
    category: 'writing',
    path: '/writing-prompts/relationship/',
    legacyPath: '/random-relationship-prompt-generator',
    icon: 'Users'
  },
  'short-story': {
    id: 'short-story',
    slug: 'short-story',
    title: 'Short Story Prompts Generator - Quick Story Ideas',
    description: 'Generate complete short story prompts with plots, characters, and twists.',
    h1: 'Short Story Prompts',
    keywords: 'short story prompts, story ideas, flash fiction, short stories',
    category: 'writing',
    path: '/writing-prompts/short-story/',
    legacyPath: '/short-story-prompts-generator',
    icon: 'Book'
  },
  'october-writing': {
    id: 'october-writing',
    slug: 'october',
    title: 'October Writing Prompts - Halloween & Fall Story Ideas',
    description: 'Generate spooky Halloween and autumn-themed writing prompts for October.',
    h1: 'October Writing Prompts',
    keywords: 'october prompts, halloween writing, fall prompts, spooky stories',
    category: 'writing',
    path: '/writing-prompts/october/',
    legacyPath: '/october-writing-prompts',
    icon: 'Ghost'
  },
  'students-writing': {
    id: 'students-writing',
    slug: 'students',
    title: 'Writing Prompts for Students - Educational Prompts',
    description: 'Generate age-appropriate writing prompts for students and classroom use.',
    h1: 'Writing Prompts for Students',
    keywords: 'student writing prompts, education prompts, classroom writing, student exercises',
    category: 'writing',
    path: '/writing-prompts/students/',
    legacyPath: '/writing-prompts-for-students',
    icon: 'GraduationCap'
  },
  'persuasive-topics': {
    id: 'persuasive-topics',
    slug: 'persuasive-topics',
    title: 'Persuasive Writing Topics - Debate & Argument Ideas',
    description: 'Generate persuasive writing topics and debate ideas for essays and discussions.',
    h1: 'Persuasive Writing Topics',
    keywords: 'persuasive topics, debate topics, argument ideas, persuasive writing',
    category: 'writing',
    path: '/writing-prompts/persuasive-topics/',
    legacyPath: '/persuasive-writing-topics',
    icon: 'MessageCircle'
  },
  'persuasive-essays': {
    id: 'persuasive-essays',
    slug: 'persuasive-essays',
    title: 'Persuasive Essay Topics - Essay Writing Ideas',
    description: 'Generate compelling persuasive essay topics for academic writing.',
    h1: 'Persuasive Essay Topics',
    keywords: 'persuasive essays, essay topics, academic writing, essay ideas',
    category: 'writing',
    path: '/writing-prompts/persuasive-essays/',
    legacyPath: '/persuasive-essays-topics',
    icon: 'FileEdit'
  },
  'persuasive-titles': {
    id: 'persuasive-titles',
    slug: 'persuasive-titles',
    title: 'Persuasive Writing Titles - Catchy Essay Titles',
    description: 'Generate attention-grabbing titles for persuasive essays and articles.',
    h1: 'Persuasive Writing Titles',
    keywords: 'persuasive titles, essay titles, catchy titles, writing titles',
    category: 'writing',
    path: '/writing-prompts/persuasive-titles/',
    legacyPath: '/persuasive-writing-titles',
    icon: 'Type'
  },

  // AI ART GENERATORS
  'ai-images': {
    id: 'ai-images',
    slug: 'images',
    title: 'AI Image Prompts Generator - MidJourney & DALL-E Prompts',
    description: 'Generate professional AI art prompts for MidJourney, DALL-E, Stable Diffusion, and other AI image generators.',
    h1: 'AI Image Prompts Generator',
    keywords: 'AI art prompts, MidJourney prompts, DALL-E prompts, AI image generator, Stable Diffusion',
    category: 'ai-art',
    path: '/ai-art-prompts/images/',
    legacyPath: '/ai-images-prompt',
    icon: 'Image'
  },
  'aesthetic': {
    id: 'aesthetic',
    slug: 'aesthetic',
    title: 'Random Aesthetic Prompt Generator - Visual Style Ideas',
    description: 'Generate aesthetic prompts and visual style ideas for AI art and creative projects.',
    h1: 'Aesthetic Prompt Generator',
    keywords: 'aesthetic prompts, visual style, aesthetic generator, art style',
    category: 'ai-art',
    path: '/ai-art-prompts/aesthetic/',
    legacyPath: '/random-aesthetic-prompt-generator',
    icon: 'Palette'
  },
  'art-style': {
    id: 'art-style',
    slug: 'art-style',
    title: 'Random Art Style Generator - Artistic Styles & Techniques',
    description: 'Generate random art styles and techniques for AI art and creative inspiration.',
    h1: 'Art Style Generator',
    keywords: 'art style, art techniques, artistic styles, art generator',
    category: 'ai-art',
    path: '/ai-art-prompts/art-style/',
    legacyPath: '/random-art-style-generator',
    icon: 'Brush'
  },
  'photography': {
    id: 'photography',
    slug: 'photography',
    title: 'Random Photography Prompt Generator - Photo Ideas',
    description: 'Generate photography prompts with composition, lighting, and subject ideas.',
    h1: 'Photography Prompt Generator',
    keywords: 'photography prompts, photo ideas, photography generator, camera angles',
    category: 'ai-art',
    path: '/ai-art-prompts/photography/',
    legacyPath: '/random-photography-prompt-generator',
    icon: 'Camera'
  },
  'character-design': {
    id: 'character-design',
    slug: 'character-design',
    title: 'Random Character Design Prompt Generator - Visual Characters',
    description: 'Generate detailed character design prompts for AI art and illustration.',
    h1: 'Character Design Generator',
    keywords: 'character design, character art, character prompts, design generator',
    category: 'ai-art',
    path: '/ai-art-prompts/character-design/',
    legacyPath: '/random-character-design-prompt-generator',
    icon: 'User'
  },
  'environment': {
    id: 'environment',
    slug: 'environment',
    title: 'Random Environment Design Generator - Scene & Landscape Ideas',
    description: 'Generate environment and landscape design prompts for AI art and concept art.',
    h1: 'Environment Design Generator',
    keywords: 'environment design, landscape generator, scene design, background art',
    category: 'ai-art',
    path: '/ai-art-prompts/environment/',
    legacyPath: '/random-environment-design-generator',
    icon: 'Mountain'
  },
  'sci-fi': {
    id: 'sci-fi',
    slug: 'sci-fi',
    title: 'Random Sci-Fi Prompt Generator - Science Fiction Art',
    description: 'Generate futuristic sci-fi prompts for AI art and creative projects.',
    h1: 'Sci-Fi Prompt Generator',
    keywords: 'sci-fi prompts, science fiction, futuristic art, sci-fi generator',
    category: 'ai-art',
    path: '/ai-art-prompts/sci-fi/',
    legacyPath: '/random-sci-fi-prompt-generator',
    icon: 'Rocket'
  },
  'fantasy-art': {
    id: 'fantasy-art',
    slug: 'fantasy',
    title: 'Random Fantasy Art Prompt Generator - Magic & Dragons',
    description: 'Generate fantasy art prompts with magic, dragons, and mythical creatures.',
    h1: 'Fantasy Art Generator',
    keywords: 'fantasy art, magic art, dragon art, fantasy prompts',
    category: 'ai-art',
    path: '/ai-art-prompts/fantasy/',
    legacyPath: '/random-fantasy-art-prompt-generator',
    icon: 'Crown'
  },
  'anime': {
    id: 'anime',
    slug: 'anime',
    title: 'Random Anime Prompt Generator - Anime Art Ideas',
    description: 'Generate anime and manga art prompts for AI art generators.',
    h1: 'Anime Prompt Generator',
    keywords: 'anime prompts, manga art, anime generator, anime characters',
    category: 'ai-art',
    path: '/ai-art-prompts/anime/',
    legacyPath: '/random-anime-prompt-generator',
    icon: 'Star'
  },
  'portrait': {
    id: 'portrait',
    slug: 'portrait',
    title: 'Random Portrait Prompt Generator - Face & Portrait Art',
    description: 'Generate portrait and face art prompts for AI image generation.',
    h1: 'Portrait Generator',
    keywords: 'portrait prompts, face art, portrait generator, character portraits',
    category: 'ai-art',
    path: '/ai-art-prompts/portrait/',
    legacyPath: '/random-portrait-prompt-generator',
    icon: 'User'
  },
  'lighting': {
    id: 'lighting',
    slug: 'lighting',
    title: 'Random Lighting Style Generator - Lighting Techniques',
    description: 'Generate lighting style and technique prompts for AI art and photography.',
    h1: 'Lighting Style Generator',
    keywords: 'lighting styles, lighting techniques, photo lighting, art lighting',
    category: 'ai-art',
    path: '/ai-art-prompts/lighting/',
    legacyPath: '/random-lighting-style-generator',
    icon: 'Sun'
  },
  'midjourney': {
    id: 'midjourney',
    slug: 'midjourney',
    title: 'MidJourney AI Picture Generator - Professional MidJourney Prompts',
    description: 'Generate optimized prompts specifically for MidJourney AI image generation.',
    h1: 'MidJourney Prompts',
    keywords: 'midjourney prompts, midjourney generator, AI art, midjourney ideas',
    category: 'ai-art',
    path: '/ai-art-prompts/midjourney/',
    legacyPath: '/midjourney-ai-picture-generator',
    icon: 'Sparkles'
  },
  'ghostface': {
    id: 'ghostface',
    slug: 'ghostface',
    title: 'Ghostface AI Trend Prompt Generator - Viral AI Trend',
    description: 'Generate Ghostface AI trend prompts for the viral social media effect.',
    h1: 'Ghostface AI Prompts',
    keywords: 'ghostface AI, AI trend, viral AI, ghostface prompts',
    category: 'ai-art',
    path: '/ai-art-prompts/ghostface/',
    legacyPath: '/ghostface-ai-trend-prompt-generator',
    icon: 'Ghost'
  },
  'gemini-snow': {
    id: 'gemini-snow',
    slug: 'gemini-snow',
    title: 'Gemini AI Snow Prompt Tutorial - Create Snow Effects',
    description: 'Learn to generate snow effect prompts using Google Gemini AI.',
    h1: 'Gemini Snow Prompts',
    keywords: 'gemini AI, snow effects, AI tutorial, gemini prompts',
    category: 'ai-art',
    path: '/ai-art-prompts/gemini-snow/',
    legacyPath: '/gemini-ai-snow-prompt-tutorial',
    icon: 'Snowflake'
  },
  'chatgpt-photo': {
    id: 'chatgpt-photo',
    slug: 'chatgpt-photo',
    title: 'ChatGPT Photo Editing Prompts - AI Photo Enhancement',
    description: 'Generate ChatGPT prompts for photo editing and enhancement instructions.',
    h1: 'ChatGPT Photo Editing',
    keywords: 'chatgpt photo, photo editing, AI photo, chatgpt prompts',
    category: 'ai-art',
    path: '/ai-art-prompts/chatgpt-photo/',
    legacyPath: '/chatgpt-photo-editing-prompts',
    icon: 'Image'
  },
  'gemini-photo': {
    id: 'gemini-photo',
    slug: 'gemini-photo',
    title: 'Gemini Photo Editing Prompts - Google AI Photo Tools',
    description: 'Generate Gemini AI prompts for photo editing and image manipulation.',
    h1: 'Gemini Photo Editing',
    keywords: 'gemini photo, photo editing, google AI, gemini prompts',
    category: 'ai-art',
    path: '/ai-art-prompts/gemini-photo/',
    legacyPath: '/gemini-photo-editing-prompts',
    icon: 'Edit'
  },

  // BLOG/CONTENT GENERATORS
  'blog-post': {
    id: 'blog-post',
    slug: 'blog-post',
    title: 'AI Blog Post Generator - Blog Content Ideas',
    description: 'Generate SEO-optimized blog post ideas with titles, hooks, and content angles.',
    h1: 'Blog Post Generator',
    keywords: 'blog post generator, blog ideas, content ideas, blog topics',
    category: 'writing',
    path: '/ai-blog-post-generator/',
    legacyPath: '/ai-blog-post-generator',
    icon: 'FileText'
  },
  'nano-banana': {
    id: 'nano-banana',
    slug: 'nano-banana',
    title: 'Nano Banana Prompts - Creative Micro Content',
    description: 'Generate nano-sized creative prompts for quick content and micro-blogging.',
    h1: 'Nano Banana Prompts',
    keywords: 'nano prompts, micro content, short prompts, quick ideas',
    category: 'writing',
    path: '/writing-prompts/nano-banana/',
    legacyPath: '/nano-banana-prompts',
    icon: 'Zap'
  },

  // DRAWING/CREATIVE IDEA GENERATORS
  'names': {
    id: 'names',
    slug: 'names',
    title: 'Random Name Generator - Fantasy Character Names',
    description: 'Generate random fantasy names for characters including elvish, dwarven, and human names.',
    h1: 'Random Name Generator',
    keywords: 'name generator, fantasy names, character names, random names',
    category: 'creative',
    path: '/drawing-ideas/names/',
    legacyPath: '/random-name-generator',
    icon: 'User'
  },
  'objects': {
    id: 'objects',
    slug: 'objects',
    title: 'Random Object Generator - Everyday Item Ideas',
    description: 'Generate random objects for creative writing, drawing prompts, and brainstorming.',
    h1: 'Random Object Generator',
    keywords: 'random object, item generator, object prompts, creative objects',
    category: 'creative',
    path: '/drawing-ideas/objects/',
    legacyPath: '/random-object-generator',
    icon: 'Package'
  },
  'hobbies': {
    id: 'hobbies',
    slug: 'hobbies',
    title: 'Random Hobby Generator - Find New Interests',
    description: 'Generate random hobbies and activities to discover new interests and pastimes.',
    h1: 'Random Hobby Generator',
    keywords: 'hobby generator, random hobbies, activity ideas, new interests',
    category: 'creative',
    path: '/drawing-ideas/hobbies/',
    legacyPath: '/random-hobby-generator',
    icon: 'Heart'
  },
  'superpowers': {
    id: 'superpowers',
    slug: 'superpowers',
    title: 'Random Superpower Generator - Unique Abilities',
    description: 'Generate random superpowers and abilities for characters and creative projects.',
    h1: 'Random Superpower Generator',
    keywords: 'superpower generator, random powers, abilities generator, super abilities',
    category: 'creative',
    path: '/drawing-ideas/superpowers/',
    legacyPath: '/random-superpower-generator',
    icon: 'Zap'
  },
  'ideas': {
    id: 'ideas',
    slug: 'ideas',
    title: 'Random Idea Generator - Creative Inspiration',
    description: 'Generate random creative ideas for projects, brainstorming, and innovation.',
    h1: 'Random Idea Generator',
    keywords: 'idea generator, random ideas, creative ideas, brainstorming',
    category: 'creative',
    path: '/drawing-ideas/ideas/',
    legacyPath: '/random-idea-generator',
    icon: 'Lightbulb'
  },
};

// Helper function to get all generators by category
export const getGeneratorsByCategory = (category: 'writing' | 'ai-art' | 'drawing'): GeneratorMetadata[] => {
  return Object.values(generatorConfig).filter(gen => gen.category === category);
};

// Helper function to get generator by slug
export const getGeneratorBySlug = (slug: string, category: string): GeneratorMetadata | undefined => {
  return Object.values(generatorConfig).find(gen => gen.slug === slug && gen.category === category);
};

// Helper function to get generator by legacy path
export const getGeneratorByLegacyPath = (legacyPath: string): GeneratorMetadata | undefined => {
  return Object.values(generatorConfig).find(gen => gen.legacyPath === legacyPath);
};

export default generatorConfig;
