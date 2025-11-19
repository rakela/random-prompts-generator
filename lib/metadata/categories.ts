export interface CategoryMetadata {
  id: string;
  title: string;
  description: string;
  h1: string;
  keywords: string;
  relatedGenerators: string[]; // IDs from generatorConfig
  color: 'purple' | 'pink' | 'blue' | 'green' | 'orange' | 'red';
}

export const categories: Record<string, CategoryMetadata> = {
  fantasy: {
    id: 'fantasy',
    title: 'Fantasy Writing Prompts & Story Ideas | Random Prompts',
    description: '500+ fantasy writing prompts featuring magic systems, dragons, medieval worlds, and epic adventures. Perfect for fantasy authors and worldbuilders.',
    h1: 'Fantasy Writing Prompts',
    keywords: 'fantasy writing prompts, fantasy story ideas, magic prompts, dragon stories, medieval fantasy, epic fantasy',
    relatedGenerators: ['writing-prompts', 'fantasy-art', 'worldbuilding', 'magic-system', 'character', 'setting'],
    color: 'purple'
  },
  romance: {
    id: 'romance',
    title: 'Romance Writing Prompts & Love Story Ideas | Random Prompts',
    description: 'Generate romantic story prompts, relationship dynamics, and love story ideas for your romance novels and creative writing.',
    h1: 'Romance Writing Prompts',
    keywords: 'romance writing prompts, love story ideas, relationship prompts, romantic fiction, romance novels',
    relatedGenerators: ['writing-prompts', 'relationship', 'emotion', 'character', 'dialogue'],
    color: 'pink'
  },
  'sci-fi': {
    id: 'sci-fi',
    title: 'Sci-Fi Writing Prompts & Science Fiction Ideas | Random Prompts',
    description: 'Generate futuristic sci-fi prompts with space exploration, advanced technology, and alien encounters for your science fiction stories.',
    h1: 'Sci-Fi Writing Prompts',
    keywords: 'sci-fi prompts, science fiction writing, futuristic stories, space stories, alien prompts',
    relatedGenerators: ['writing-prompts', 'sci-fi', 'worldbuilding', 'character', 'setting'],
    color: 'blue'
  },
  horror: {
    id: 'horror',
    title: 'Horror Writing Prompts & Scary Story Ideas | Random Prompts',
    description: 'Generate spine-chilling horror prompts, creepy scenarios, and terrifying story ideas for horror fiction and scary tales.',
    h1: 'Horror Writing Prompts',
    keywords: 'horror writing prompts, scary story ideas, creepy prompts, horror fiction, thriller prompts',
    relatedGenerators: ['writing-prompts', 'october-writing', 'villain', 'conflict', 'setting'],
    color: 'red'
  },
  mystery: {
    id: 'mystery',
    title: 'Mystery Writing Prompts & Detective Story Ideas | Random Prompts',
    description: 'Generate intriguing mystery prompts, detective plots, and suspenseful whodunit story ideas.',
    h1: 'Mystery Writing Prompts',
    keywords: 'mystery prompts, detective stories, whodunit ideas, mystery writing, thriller prompts',
    relatedGenerators: ['writing-prompts', 'conflict', 'plot-twist', 'character', 'villain'],
    color: 'orange'
  },
  adventure: {
    id: 'adventure',
    title: 'Adventure Writing Prompts & Quest Story Ideas | Random Prompts',
    description: 'Generate exciting adventure prompts, quest storylines, and action-packed scenarios for thrilling narratives.',
    h1: 'Adventure Writing Prompts',
    keywords: 'adventure prompts, quest ideas, action stories, adventure writing, journey prompts',
    relatedGenerators: ['writing-prompts', 'hero', 'conflict', 'setting', 'worldbuilding'],
    color: 'green'
  },
  thriller: {
    id: 'thriller',
    title: 'Thriller Writing Prompts & Suspense Story Ideas | Random Prompts',
    description: 'Generate high-stakes thriller prompts, suspenseful scenarios, and edge-of-your-seat story ideas.',
    h1: 'Thriller Writing Prompts',
    keywords: 'thriller prompts, suspense writing, thriller ideas, suspense stories, action thriller',
    relatedGenerators: ['writing-prompts', 'conflict', 'plot-twist', 'villain', 'dialogue'],
    color: 'red'
  },
  'historical-fiction': {
    id: 'historical-fiction',
    title: 'Historical Fiction Prompts & Period Story Ideas | Random Prompts',
    description: 'Generate historical fiction prompts set in different time periods and historical events.',
    h1: 'Historical Fiction Prompts',
    keywords: 'historical fiction, period stories, history prompts, historical writing, time period stories',
    relatedGenerators: ['writing-prompts', 'character', 'setting', 'conflict', 'worldbuilding'],
    color: 'orange'
  },
  dystopian: {
    id: 'dystopian',
    title: 'Dystopian Writing Prompts & Post-Apocalyptic Ideas | Random Prompts',
    description: 'Generate dystopian and post-apocalyptic story prompts for dark future narratives.',
    h1: 'Dystopian Writing Prompts',
    keywords: 'dystopian prompts, post-apocalyptic stories, dystopian fiction, future dystopia, apocalypse writing',
    relatedGenerators: ['writing-prompts', 'sci-fi', 'worldbuilding', 'conflict', 'setting'],
    color: 'blue'
  },
  comedy: {
    id: 'comedy',
    title: 'Comedy Writing Prompts & Funny Story Ideas | Random Prompts',
    description: 'Generate humorous writing prompts, comedy scenarios, and funny story ideas.',
    h1: 'Comedy Writing Prompts',
    keywords: 'comedy prompts, funny stories, humor writing, comedy ideas, humorous prompts',
    relatedGenerators: ['writing-prompts', 'character', 'dialogue', 'conflict', 'plot-twist'],
    color: 'green'
  },
  drama: {
    id: 'drama',
    title: 'Drama Writing Prompts & Emotional Story Ideas | Random Prompts',
    description: 'Generate dramatic story prompts with emotional depth, complex relationships, and character-driven narratives.',
    h1: 'Drama Writing Prompts',
    keywords: 'drama prompts, emotional stories, dramatic writing, character drama, relationship drama',
    relatedGenerators: ['writing-prompts', 'emotion', 'relationship', 'character', 'conflict'],
    color: 'purple'
  },
  'young-adult': {
    id: 'young-adult',
    title: 'Young Adult Writing Prompts & YA Story Ideas | Random Prompts',
    description: 'Generate YA-appropriate writing prompts for young adult fiction, coming-of-age stories, and teen narratives.',
    h1: 'Young Adult Writing Prompts',
    keywords: 'YA prompts, young adult fiction, teen stories, YA writing, coming of age',
    relatedGenerators: ['writing-prompts', 'students-writing', 'character', 'emotion', 'relationship'],
    color: 'pink'
  },
  'short-story': {
    id: 'short-story',
    title: 'Short Story Prompts & Flash Fiction Ideas | Random Prompts',
    description: 'Generate concise prompts perfect for short stories, flash fiction, and quick creative writing exercises.',
    h1: 'Short Story Prompts',
    keywords: 'short story prompts, flash fiction, short stories, quick prompts, brief stories',
    relatedGenerators: ['short-story', 'writing-prompts', 'story-starter', 'plot-twist', 'character'],
    color: 'blue'
  },
};

// Helper function to get all categories
export const getAllCategories = (): CategoryMetadata[] => {
  return Object.values(categories);
};

// Helper function to get category by ID
export const getCategoryById = (id: string): CategoryMetadata | undefined => {
  return categories[id];
};

// Helper function to get categories by related generator
export const getCategoriesByGenerator = (generatorId: string): CategoryMetadata[] => {
  return Object.values(categories).filter(cat =>
    cat.relatedGenerators.includes(generatorId)
  );
};

export default categories;
