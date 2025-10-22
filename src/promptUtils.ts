// High-quality data dictionaries for generation
export const promptData = {
  writing: {
    // Story structures and hooks
    openings: [
      'A mysterious letter arrives with no return address',
      'The last person on Earth hears a knock at the door',
      'Your character wakes up with someone else\'s memories',
      'A child finds a door in their bedroom that wasn\'t there yesterday',
      'The GPS leads your character to a place that doesn\'t exist on any map',
      'Your character receives a phone call from themselves',
      'A time capsule is opened 50 years early',
      'Your character discovers their reflection is acting independently',
      'A stranger approaches claiming to be from the future',
      'Your character finds a diary that predicts their life perfectly'
    ],

    // Specific conflicts with emotional stakes
    conflicts: [
      'must choose between saving their child or saving a thousand strangers',
      'discovers their life-saving medication is slowly poisoning someone they love',
      'learns their memory of a traumatic event was deliberately implanted',
      'finds out their soulmate is their mortal enemy in disguise',
      'realizes they\'re the only one who remembers the world before it changed',
      'must betray their deepest principles to save their family',
      'discovers they\'re living in a simulation but escaping means abandoning everyone inside',
      'learns their healing powers come at the cost of shortening others\' lives',
      'finds out their deceased parent is alive but has become their greatest enemy',
      'must use their fear of heights to rescue someone from a collapsing tower'
    ],

    // Rich, specific settings
    settings: [
      'a floating city that only appears during solar eclipses',
      'an underground library where books rewrite themselves',
      'a small town where time moves backward every midnight',
      'a space station orbiting a dying star',
      'a school for children who remember their past lives',
      'a hospital where patients\' dreams become reality',
      'a lighthouse that guides souls instead of ships',
      'a coffee shop that exists in multiple dimensions simultaneously',
      'an antique store where every item has a dangerous history',
      'a forest where the trees whisper secrets of the dead'
    ],

    // Character archetypes with depth
    protagonists: [
      'a memory thief who can steal and experience others\' recollections',
      'a retired superhero living under witness protection',
      'a therapist who absorbs their patients\' traumas',
      'a time loop victim who ages while everyone else resets',
      'a prophet who sees multiple futures but can\'t control which becomes real',
      'a ghost who doesn\'t know they\'re dead',
      'a dream architect who builds worlds in people\'s sleep',
      'a voice actor who discovers their recordings can alter reality',
      'a cartographer mapping places that exist only in stories',
      'a funeral director who can speak with the recently deceased'
    ],

    // High-impact plot twists
    revelations: [
      'the narrator has been the villain all along',
      'everyone except the protagonist is an AI',
      'the story is happening in reverse chronological order',
      'the protagonist is their own time-traveling descendant',
      'the entire conflict was manufactured by the protagonist\'s future self',
      'death in this world just means waking up in another',
      'the protagonist is the only real person in a philosophical thought experiment',
      'the story is being told by the protagonist to their killer',
      'each chapter is a different iteration of the same day',
      'the protagonist has been dead since chapter one'
    ],

    templates: [
      '{openings}, but when your protagonist {conflicts}, they discover that {revelations}. Set in {settings}.',
      'Your protagonist is {protagonists} who lives in {settings}. When they {conflicts}, {revelations}.',
      'In {settings}, {openings}. Your protagonist, {protagonists}, must {conflicts} while facing the truth that {revelations}.',
      'Write about {protagonists} in {settings}. The story begins when {openings}, forcing them to {conflicts}, ultimately revealing that {revelations}.',
      '{protagonists} discovers {revelations} when {openings} in {settings}. Now they must {conflicts} to set things right.'
    ]
  },

  aiArt: {
    // Professional art techniques and styles
    techniques: [
      'hyperrealistic digital painting', 'concept art', 'matte painting', 'photorealistic 3D render',
      'oil painting masterpiece', 'watercolor illustration', 'pencil sketch portrait',
      'acrylic painting', 'charcoal drawing', 'digital art illustration'
    ],

    // Specific subjects with visual appeal
    subjects: [
      'ethereal elven warrior with glowing tattoos',
      'steampunk airship soaring through storm clouds',
      'cyberpunk samurai in neon-lit alleyway',
      'ancient dragon perched atop crystalline mountains',
      'space marine battling alien creatures on distant planet',
      'mystical forest guardian with antler crown',
      'robotic angel with mechanical wings',
      'underwater palace with bioluminescent details',
      'post-apocalyptic survivor in gas mask',
      'celestial being made of stars and nebulae'
    ],

    // Professional lighting setups
    lighting: [
      'dramatic chiaroscuro lighting', 'golden hour rim lighting', 'volumetric god rays',
      'neon accent lighting', 'soft box studio lighting', 'harsh spotlight from above',
      'bioluminescent ambient glow', 'candlelight and shadows', 'aurora borealis backdrop',
      'lens flare and bloom effects', 'moody atmospheric lighting', 'backlit silhouette'
    ],

    // Camera and composition terms
    composition: [
      'extreme close-up portrait', 'wide establishing shot', 'dramatic low angle',
      'bird\'s eye view', 'dutch angle composition', 'symmetrical framing',
      'rule of thirds composition', 'leading lines', 'depth of field focus',
      'macro detail shot', 'panoramic landscape', 'tilt-shift miniature effect'
    ],

    // Quality and style modifiers
    quality: [
      'trending on ArtStation', 'highly detailed', 'award-winning photography',
      'museum quality', 'photorealistic', 'hyper-detailed',
      'studio quality', 'masterpiece', '8K resolution', 'ultra-realistic'
    ],

    // Artist style references
    artists: [
      'painted by Greg Rutkowski', 'in the style of Alphonse Mucha',
      'reminiscent of H.R. Giger', 'inspired by Hayao Miyazaki',
      'like a John Singer Sargent portrait', 'in Caravaggio\'s style',
      'digital art by Loish', 'concept art by Feng Zhu',
      'illustration by James Jean', 'photography by Annie Leibovitz'
    ],

    templates: [
      '{subjects}, {techniques}, {lighting}, {composition}, {quality}, {artists}',
      '{composition} of {subjects}, {techniques} with {lighting}, {quality}, {artists}',
      '{subjects} rendered as {techniques}, featuring {lighting} and {composition}, {quality}, {artists}',
      'Professional {techniques} showing {subjects}, {lighting}, {composition}, {quality}, {artists}',
      '{artists} style {techniques} of {subjects}, {lighting}, {composition}, {quality}'
    ]
  },

  blog: {
    // Specific, searchable topics
    niches: [
      'remote work productivity for developers',
      'sustainable fashion on a budget',
      'cryptocurrency for beginners over 50',
      'plant-based meal prep for busy families',
      'digital minimalism for social media addicts',
      'freelance writing for introverts',
      'smart home automation for renters',
      'meditation techniques for anxiety relief',
      'side hustles for teachers',
      'budget travel for digital nomads'
    ],

    // Proven content formats
    formats: [
      'step-by-step tutorial with screenshots',
      'ultimate beginner\'s guide',
      'myth-busting listicle',
      'before and after case study',
      'tool comparison and review',
      'interview with industry expert',
      'personal transformation story',
      'data-driven research analysis',
      'controversial opinion piece',
      'seasonal trend prediction'
    ],

    // Compelling hooks that drive clicks
    hooks: [
      'I tried [topic] for 30 days and here\'s what happened',
      'The [number] mistakes everyone makes with [topic]',
      'Why [common belief] is completely wrong',
      'How I [achieved result] in [timeframe] using [method]',
      'The [industry] secret that [companies] don\'t want you to know',
      '[Number] signs you\'re doing [topic] wrong',
      'What [expert] taught me about [topic] that changed everything',
      'The uncomfortable truth about [topic] that no one talks about',
      'How to [achieve goal] even if [common obstacle]',
      'Why [year] is the perfect time to start [topic]'
    ],

    // SEO-focused angles
    angles: [
      'beginner-friendly with no prior experience needed',
      'backed by scientific research and studies',
      'contrarian viewpoint challenging conventional wisdom',
      'personal experience with honest failures included',
      'expert roundup with multiple professional opinions',
      'data-driven analysis with charts and statistics',
      'actionable tips you can implement today',
      'comprehensive comparison of all available options',
      'controversial stance on widely accepted practices',
      'industry insider perspective with behind-the-scenes details'
    ],

    templates: [
      'Write a {formats} about {niches} with a {angles} approach. Hook: "{hooks}"',
      'Create a {formats} targeting "{niches}" using {angles} perspective. Start with "{hooks}"',
      '{formats} for {niches}: {angles} insights. Opening hook: "{hooks}"',
      'Develop a {angles} {formats} about {niches}. Lead with: "{hooks}"',
      '{hooks} - Turn this into a {formats} about {niches} from a {angles} standpoint'
    ]
  },

  fantasy: {
    // Unique magic systems with rules
    magicSystems: [
      'emotion-based magic that requires genuine feelings to cast',
      'blood magic that ages the caster with each spell',
      'word magic where spells are spoken in a dying language',
      'tattoo magic where spells are permanently inked on skin',
      'music magic that requires perfect pitch and rhythm',
      'memory magic that trades personal memories for power',
      'symbiotic magic requiring partnership with magical creatures',
      'elemental magic tied to specific geographic locations',
      'dream magic that only works while the caster sleeps',
      'contract magic that requires binding agreements with spirits'
    ],

    // Compelling fantasy conflicts
    conflicts: [
      'the gods are dying and their magic is failing',
      'a plague turns magical creatures into stone',
      'children are being born without souls',
      'time is fracturing, causing past and future to collide',
      'the boundary between dreams and reality is dissolving',
      'an ancient treaty between races is being violated',
      'magic is becoming sentient and rebelling against users',
      'the world\'s magic is being stolen by an unknown force',
      'a prophesy is coming true but was deliberately mistranslated',
      'the afterlife is overflowing, sending spirits back to earth'
    ],

    // Rich, detailed cultures
    cultures: [
      'sky nomads who live on floating islands connected by rope bridges',
      'underground dwellers who communicate through bioluminescent fungi',
      'desert people who store their memories in crystal formations',
      'forest folk who age backward and are born with ancient wisdom',
      'sea nomads who can breathe underwater but die if they stay on land too long',
      'mountain clans who bind their souls to ancestral weapons',
      'shadow people who exist partially in another dimension',
      'star worshippers who can only use magic during specific celestial events',
      'bone smiths who craft tools from the remains of mythical creatures',
      'time keepers who experience all moments of their lives simultaneously'
    ],

    // Specific, evocative settings
    locations: [
      'a library where books write themselves based on readers\' thoughts',
      'floating ruins of an ancient city suspended in a perpetual storm',
      'a marketplace that exists in multiple dimensions simultaneously',
      'a forest where the trees are actually sleeping giants',
      'crystal caves that amplify magical abilities but trap visitors\' reflections',
      'a city built inside the fossilized remains of a colossal dragon',
      'floating islands connected by chains forged from starlight',
      'an underwater realm where air-breathers are the minority',
      'a desert where sand dunes shift to reveal buried civilizations',
      'a mountain range that phases between seasons every few hours'
    ],

    templates: [
      'In a world where {cultures} practice {magicSystems}, {conflicts} threatens to destroy {locations}.',
      'The {cultures} of {locations} must master {magicSystems} when {conflicts} begins to unravel reality itself.',
      'Create a fantasy where {magicSystems} is failing because {conflicts}, forcing {cultures} to abandon their home in {locations}.',
      'In {locations}, the {cultures} discover that {magicSystems} is connected to {conflicts} in ways they never imagined.',
      'When {conflicts} strikes {locations}, the {cultures} must evolve their understanding of {magicSystems} to survive.'
    ]
  },

  names: {
    // Culturally consistent fantasy names
    elvish: {
      first: ['Aelindra', 'Thalorin', 'Silvanis', 'Elenion', 'Mirithel', 'Caelynn', 'Faelivrin', 'Galathil'],
      last: ['Moonwhisper', 'Starweaver', 'Dawnbringer', 'Nightbreeze', 'Silverleaf', 'Goldensong', 'Stormwind', 'Brightblade']
    },
    dwarven: {
      first: ['Thorek', 'Grimvar', 'Baelin', 'Dwalin', 'Nala', 'Vera', 'Kili', 'Dori'],
      last: ['Ironforge', 'Stonebeard', 'Goldaxe', 'Mountainheart', 'Deepdelver', 'Forgehammer', 'Rockbreaker', 'Steelshield']
    },
    human: {
      first: ['Alaric', 'Seraphina', 'Gareth', 'Evangeline', 'Roderick', 'Cordelia', 'Matthias', 'Isadora'],
      last: ['Blackwood', 'Ravencrest', 'Goldmane', 'Stormborn', 'Brightwater', 'Shadowmere', 'Swiftarrow', 'Ironhand']
    },
    exotic: {
      first: ['Zephyria', 'Vorthak', 'Nyxaria', 'Kaelthas', 'Ysara', 'Drakmor', 'Selvara', 'Xerion'],
      last: ['Voidcaller', 'Soulrender', 'Dreamwalker', 'Mindshaper', 'Flameweaver', 'Iceheart', 'Stormcaller', 'Netherbane']
    },

    titles: ['the Bold', 'the Wise', 'the Fierce', 'the Just', 'Dragonbane', 'Lightbringer', 'the Ancient', 'the Swift', 'the Pure', 'Shadowhunter']
  }
};

// Weighted random selection
export const weightedRandom = (items: any[], weights: number[] | null = null) => {
  if (!weights) return items[Math.floor(Math.random() * items.length)];

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
};

// Enhanced template processor with quality controls
export const processTemplate = (template: string, data: any, category: string, controls: any = {}) => {
  if (category === 'names') {
    // Special handling for names
    const selectedCulture = controls.origin && controls.origin !== 'any'
      ? controls.origin
      : weightedRandom(['elvish', 'dwarven', 'human', 'exotic']);

    const cultureData = data[selectedCulture];
    const nameType = controls.type || 'full';

    const firstName = weightedRandom(cultureData.first);
    const lastName = weightedRandom(cultureData.last);
    const title = weightedRandom(data.titles);

    switch (nameType) {
      case 'first':
        return firstName;
      case 'title':
        return `${firstName} ${title}`;
      case 'house':
        return `${firstName} of House ${lastName}`;
      default:
        return `${firstName} ${lastName}`;
    }
  }

  // Regular template processing for other categories
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

// Quality enhancement functions
export const enhanceWritingPrompt = (prompt: string) => {
  // Add emotional stakes and specificity
  const enhancements = [
    ' Focus on the internal conflict.',
    ' Include a ticking clock element.',
    ' Show the cost of failure.',
    ' Add a moral dilemma.',
    ' Include sensory details.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(enhancements);
  }

  return prompt;
};

export const enhanceAIArtPrompt = (prompt: string) => {
  // Add technical quality modifiers
  const qualityModifiers = [
    ', ultra detailed, 8k resolution',
    ', professional photography',
    ', award winning composition',
    ', cinematic lighting',
    ', sharp focus, detailed textures'
  ];

  return prompt + weightedRandom(qualityModifiers);
};

export const enhanceBlogPrompt = (prompt: string) => {
  // Add SEO and engagement tips
  const seoTips = [
    ' Target long-tail keywords.',
    ' Include actionable takeaways.',
    ' Add personal anecdotes.',
    ' Use data and statistics.',
    ' Include expert quotes.'
  ];

  if (Math.random() < 0.4) {
    prompt += weightedRandom(seoTips);
  }

  return prompt;
};

export const enhanceFantasyPrompt = (prompt: string) => {
  // Add worldbuilding depth
  const worldbuilding = [
    ' Consider the economic implications.',
    ' Think about the cultural conflicts.',
    ' Explore the magic system\'s limitations.',
    ' Add political intrigue.',
    ' Include ancient history.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(worldbuilding);
  }

  return prompt;
};
