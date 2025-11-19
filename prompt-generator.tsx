import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Copy, RefreshCw, Save, Download, Sparkles, Wand2, PenTool, BookOpen, Crown, Zap, History, Share2, Star } from 'lucide-react';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import SEO from './src/components/SEO';

// High-quality data dictionaries for generation
const promptData = {
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

  persuasive: {
    // Persuasive Essay Topics
    topics: [
      '🎓 Should schools eliminate homework and replace it with hands-on projects?',
      '🎓 Should students be graded on creativity and participation as much as test scores?',
      '🎓 Is online learning as effective as classroom learning?',
      '🎓 Should schools require financial literacy courses for graduation?',
      '🎓 Should smartphones be banned in schools to improve focus?',
      '🌍 Should governments ban single-use plastics completely?',
      '🌍 Is climate change primarily a government issue or a personal responsibility?',
      '🌍 Should fast fashion brands be held accountable for environmental damage?',
      '🌍 Should public transportation be free to reduce pollution?',
      '🌍 Should zoos be replaced with virtual or open sanctuaries?',
      '💻 Should AI-generated content be labeled to protect creative industries?',
      '💻 Does social media do more harm than good for young people?',
      '💻 Should governments regulate the use of artificial intelligence?',
      '💻 Are smartphones making people less social and more isolated?',
      '💻 Should influencers be legally responsible for misleading product promotions?',
      '⚖️ Should voting be mandatory in democratic countries?',
      '⚖️ Should everyone become vegetarian to protect the planet?',
      '⚖️ Is it ethical to use animals for medical or cosmetic testing?',
      '⚖️ Should college education be free for all students?',
      '⚖️ Should people who spread fake news online face legal consequences?'
    ],

    // Persuasive Writing Titles
    titles: [
      '🌎 Should governments impose a carbon tax to fight climate change?',
      '🌎 Is space exploration worth the environmental cost?',
      '🌎 Should countries ban bottled water to reduce plastic waste?',
      '🌎 Is nuclear energy a safe alternative to fossil fuels?',
      '🌎 Should wealthy nations be required to help poorer countries fight climate change?',
      '🧠 Should mental health days be mandatory in schools and workplaces?',
      '🧠 Is social media addiction as harmful as substance abuse?',
      '🧠 Should fast food companies be held responsible for obesity?',
      '🧠 Should junk food advertising to children be banned?',
      '🧠 Should therapy be free and accessible for everyone?',
      '⚙️ Should AI be allowed to create art, music, and literature?',
      '⚙️ Are privacy rights more important than national security in the digital age?',
      '⚙️ Should robots be granted legal rights if they become sentient?',
      '⚙️ Should schools teach prompt engineering as a core skill?',
      '⚙️ Should deepfake technology be banned completely?',
      '💬 Should celebrities and influencers be role models for society?',
      '💬 Should cancel culture be seen as accountability or censorship?',
      '💬 Is traditional media still trustworthy in the digital era?',
      '💬 Should cultural appropriation be punished by law?',
      '💬 Should patriotism be taught in schools, or does it create division?'
    ],

    templates: [
      '{topics}',
      '{titles}'
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
const weightedRandom = (items, weights = null) => {
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
const processTemplate = (template, data, category, controls = {}) => {
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

  if (category === 'persuasive') {
    // Special handling for persuasive prompts
    const type = controls.type || 'all';

    let sourceArray = [];
    if (type === 'topics') {
      sourceArray = data.topics;
    } else if (type === 'titles') {
      sourceArray = data.titles;
    } else {
      // 'all' - combine both
      sourceArray = [...data.topics, ...data.titles];
    }

    return weightedRandom(sourceArray);
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
const enhanceWritingPrompt = (prompt) => {
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

const enhanceAIArtPrompt = (prompt) => {
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

const enhanceBlogPrompt = (prompt) => {
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

const enhanceFantasyPrompt = (prompt) => {
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

const PromptGenerator = () => {
  const [activeTab, setActiveTab] = useState('writing');
  const [generatedPrompts, setGeneratedPrompts] = useState({});
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    writing: { genre: 'any', tone: 'any', length: 'medium' },
    aiArt: { style: 'any', mood: 'any', quality: 'high' },
    blog: { topic: 'any', format: 'any', angle: 'any' },
    fantasy: { race: 'any', magic: 'any', setting: 'any' },
    persuasive: { type: 'all' },
    names: { type: 'full', origin: 'any', count: 'single' }
  });

  const tabs = [
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'aiArt', label: 'AI Art', icon: Wand2 },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'fantasy', label: 'Fantasy', icon: Crown },
    { id: 'persuasive', label: 'Persuasive', icon: Zap },
    { id: 'names', label: 'Names', icon: Sparkles }
  ];

  const generatePrompt = useCallback((category = activeTab, count = 1) => {
    const data = promptData[category];
    if (!data) return;

    const categoryControls = controls[category];
    
    // Special handling for names with multiple generation
    if (category === 'names') {
      const batchSize = categoryControls.count === 'multiple' ? 5 : 
                       categoryControls.count === 'batch' ? 10 : 1;
      
      const names = [];
      for (let i = 0; i < batchSize; i++) {
        const name = processTemplate('', data, category, categoryControls);
        names.push(name);
      }
      
      const prompt = {
        id: Date.now(),
        text: batchSize === 1 ? names[0] : names.join('\n'),
        category,
        timestamp: new Date().toISOString(),
        isMultiple: batchSize > 1
      };
      
      setGeneratedPrompts(prev => ({
        ...prev,
        [category]: prompt
      }));
      return;
    }

    const prompts = [];
    for (let i = 0; i < count; i++) {
      const template = weightedRandom(data.templates);
      let prompt = processTemplate(template, data, category, categoryControls);
      
      // Apply category-specific enhancements
      switch (category) {
        case 'writing':
          prompt = enhanceWritingPrompt(prompt);
          break;
        case 'aiArt':
          prompt = enhanceAIArtPrompt(prompt);
          break;
        case 'blog':
          prompt = enhanceBlogPrompt(prompt);
          break;
        case 'fantasy':
          prompt = enhanceFantasyPrompt(prompt);
          break;
      }

      prompts.push({
        id: Date.now() + i,
        text: prompt,
        category,
        timestamp: new Date().toISOString()
      });
    }

    const newPrompt = count === 1 ? prompts[0] : prompts;
    
    setGeneratedPrompts(prev => ({
      ...prev,
      [category]: newPrompt
    }));

    // Add to history
    if (count === 1) {
      setPromptHistory(prev => [prompts[0], ...prev.slice(0, 19)]); // Keep last 20
    }
  }, [activeTab, controls]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt) => {
    setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  };

  const toggleFavorite = (prompt) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true }]);
    }
  };

  const sharePrompt = async (prompt) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creative Prompt',
          text: prompt.text,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderControls = (category) => {
    const categoryControls = controls[category];
    const updateControl = (key, value) => {
      setControls(prev => ({
        ...prev,
        [category]: { ...prev[category], [key]: value }
      }));
    };

    const data = promptData[category];

    switch (category) {
      case 'writing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select 
              value={categoryControls.genre}
              onChange={(e) => updateControl('genre', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Story Type</option>
              <option value="character-driven">Character-Driven</option>
              <option value="plot-driven">Plot-Driven</option>
              <option value="experimental">Experimental</option>
              <option value="traditional">Traditional</option>
            </select>
            <select 
              value={categoryControls.tone}
              onChange={(e) => updateControl('tone', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Complexity</option>
              <option value="simple">Simple Conflict</option>
              <option value="complex">Complex Conflict</option>
              <option value="moral">Moral Dilemma</option>
              <option value="psychological">Psychological</option>
            </select>
            <select 
              value={categoryControls.length}
              onChange={(e) => updateControl('length', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Length</option>
              <option value="flash">Flash Fiction</option>
              <option value="short">Short Story</option>
              <option value="novella">Novella</option>
              <option value="novel">Novel</option>
            </select>
          </div>
        );

      case 'aiArt':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select 
              value={categoryControls.style}
              onChange={(e) => updateControl('style', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="any">Any Medium</option>
              <option value="digital">Digital Art</option>
              <option value="traditional">Traditional Art</option>
              <option value="photography">Photography</option>
              <option value="3d">3D Render</option>
            </select>
            <select 
              value={categoryControls.mood}
              onChange={(e) => updateControl('mood', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="any">Any Subject</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="fantasy">Fantasy</option>
              <option value="scifi">Sci-Fi</option>
              <option value="abstract">Abstract</option>
            </select>
            <select 
              value={categoryControls.quality}
              onChange={(e) => updateControl('quality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="standard">Standard Quality</option>
              <option value="high">High Quality</option>
              <option value="professional">Professional</option>
              <option value="masterpiece">Masterpiece</option>
            </select>
          </div>
        );

      case 'blog':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select 
              value={categoryControls.topic}
              onChange={(e) => updateControl('topic', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="any">Any Niche</option>
              {data.niches.slice(0, 8).map((niche, index) => (
                <option key={index} value={niche}>{niche}</option>
              ))}
            </select>
            <select 
              value={categoryControls.format}
              onChange={(e) => updateControl('format', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="any">Any Format</option>
              {data.formats.slice(0, 8).map((format, index) => (
                <option key={index} value={format}>{format}</option>
              ))}
            </select>
            <select 
              value={categoryControls.angle}
              onChange={(e) => updateControl('angle', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="any">Any Angle</option>
              {data.angles.slice(0, 8).map((angle, index) => (
                <option key={index} value={angle}>{angle}</option>
              ))}
            </select>
          </div>
        );

      case 'fantasy':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select 
              value={categoryControls.race}
              onChange={(e) => updateControl('race', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="any">Any Magic System</option>
              {data.magicSystems.slice(0, 8).map((magic, index) => (
                <option key={index} value={magic}>{magic}</option>
              ))}
            </select>
            <select 
              value={categoryControls.magic}
              onChange={(e) => updateControl('magic', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="any">Any Culture</option>
              {data.cultures.slice(0, 8).map((culture, index) => (
                <option key={index} value={culture}>{culture}</option>
              ))}
            </select>
            <select 
              value={categoryControls.setting}
              onChange={(e) => updateControl('setting', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="any">Any Location</option>
              {data.locations.slice(0, 8).map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        );

      case 'persuasive':
        return (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Persuasive Topics</option>
              <option value="topics">Essay Topics Only</option>
              <option value="titles">Writing Titles Only</option>
            </select>
          </div>
        );

      case 'names':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="full">Full Name</option>
              <option value="first">First Name Only</option>
              <option value="title">With Title</option>
              <option value="house">With House</option>
            </select>
            <select
              value={categoryControls.origin}
              onChange={(e) => updateControl('origin', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="any">Any Culture</option>
              <option value="elvish">Elvish</option>
              <option value="dwarven">Dwarven</option>
              <option value="human">Human</option>
              <option value="exotic">Exotic</option>
            </select>
            <select
              value={categoryControls.count}
              onChange={(e) => updateControl('count', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="single">Single Name</option>
              <option value="multiple">Generate 5 Names</option>
              <option value="batch">Batch of 10</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;

    const isMultipleNames = prompt.category === 'names' && prompt.isMultiple;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultipleNames ? (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Generated Names:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {prompt.text.split('\n').map((name, index) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded border text-gray-800">
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(prompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy {isMultipleNames ? 'All' : ''}
          </button>
          <button
            onClick={() => savePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"
          >
            <Save size={14} />
            Save
          </button>
          <button
            onClick={() => toggleFavorite(prompt)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              favorites.some(fav => fav.id === prompt.id)
                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
            Favorite
          </button>
          <button
            onClick={() => sharePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            onClick={() => generatePrompt(prompt.category)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"
          >
            <RefreshCw size={14} />
            Regenerate
          </button>
        </div>
      </div>
    );
  };

  const getTabColor = (tabId) => {
    const colors = {
      writing: 'blue',
      aiArt: 'purple',
      blog: 'green',
      fantasy: 'amber',
      persuasive: 'orange',
      names: 'pink'
    };
    return colors[tabId] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <SEO pageKey="home" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random Prompts Generator
          </h1>
          
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
Random Prompts Generator for writing, AI art, blogging, stories, and character creation, all in one clean, powerful tool. Instantly generate professional-quality prompts for ChatGPT, MidJourney, and creative writing.          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link
            to="/writing-prompts"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <PenTool size={18} />
            Writing
          </Link>
          <Link
            to="/ai-images-prompt"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Wand2 size={18} />
            AI Images
          </Link>
          <Link
            to="/ai-blog-post-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <BookOpen size={18} />
            Blog post
          </Link>
          <Link
            to="/short-story-prompts-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Crown size={18} />
            Short stories
          </Link>
          <Link
            to="/random-name-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Sparkles size={18} />
            Names
          </Link>
        </div>

        {/* Generator Section */}
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          {renderControls(activeTab)}

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => generatePrompt()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Generate Prompt
            </button>
          </div>

          {/* Result */}
          {generatedPrompts[activeTab] && renderPromptCard(generatedPrompts[activeTab])}

          {/* History Panel */}
          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Prompts</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent prompts. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt, index) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed">{prompt.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full bg-${getTabColor(prompt.category)}-100 text-${getTabColor(prompt.category)}-700`}>
                              {prompt.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(prompt.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.text)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => toggleFavorite(prompt)}
                            className={`p-1 transition-colors ${
                              favorites.some(fav => fav.id === prompt.id)
                                ? 'text-yellow-600 hover:text-yellow-700'
                                : 'text-gray-400 hover:text-yellow-600'
                            }`}
                            title="Favorite"
                          >
                            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Prompts Section */}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Prompts</h3>
                <button
                  onClick={exportPrompts}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <p className="text-gray-800 flex-1">{prompt.text}</p>
                      <span className={`px-2 py-1 text-xs rounded-full bg-${getTabColor(prompt.category)}-100 text-${getTabColor(prompt.category)}-700 ml-4`}>
                        {prompt.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Sections */}
          <div className="mt-16 space-y-8">
            {activeTab === 'writing' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Prompts Generator for Writing - Professional Story Ideas</h2>
                <p className="text-gray-700 mb-4">
                  Our random prompts generator creates professional writing prompts designed to spark creativity and overcome writer's block. This free writing prompt generator delivers unlimited story ideas featuring unique conflicts, emotional stakes, and compelling plot twists. Each randomly generated prompt combines proven story elements with sophisticated narratives perfect for creative writers, novelists, and storytellers.
                </p>
                <p className="text-gray-700 mb-4">
                  Generate random writing prompts with detailed character archetypes (memory thieves, dream architects, retired superheroes), specific story conflicts, and creative plot twists that go beyond generic writing prompts. This random story prompt generator tool is ideal for daily writing practice, NaNoWriMo preparation, creative writing exercises, and exploring new narrative ideas.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Quality Features:</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Emotional stakes and internal conflicts</li>
                    <li>• Specific, evocative settings beyond generic locations</li>
                    <li>• Complex character archetypes with built-in motivations</li>
                    <li>• Plot twists that recontextualize the entire story</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'aiArt' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional AI Art Prompt Generator</h2>
                <p className="text-gray-700 mb-4">
                  Create gallery-quality AI art with professionally crafted prompts optimized for MidJourney, Stable Diffusion, DALL-E, and other platforms. Our prompts include specific technical terminology, professional lighting setups, composition techniques, and artist style references.
                </p>
                <p className="text-gray-700 mb-4">
                  Each prompt combines detailed subject descriptions, professional art techniques (chiaroscuro lighting, rule of thirds composition), quality modifiers (trending on ArtStation, museum quality), and specific artist style references to produce consistent, high-quality results.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Technical Features:</h3>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Professional lighting terminology (volumetric rays, rim lighting)</li>
                    <li>• Composition techniques (dutch angle, bird's eye view)</li>
                    <li>• Quality modifiers and resolution specifications</li>
                    <li>• Specific artist style references for consistency</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">SEO-Optimized Blog Idea Generator</h2>
                <p className="text-gray-700 mb-4">
                  Generate blog post ideas with built-in SEO value, compelling hooks, and proven content formats. Our generator creates specific, searchable topics with ready-made angles that drive traffic and engage readers from the first sentence.
                </p>
                <p className="text-gray-700 mb-4">
                  Each idea includes specific niches (remote work productivity for developers, sustainable fashion on a budget), proven content formats, data-driven angles, and compelling hooks that encourage clicks and social shares.
                </p>
                <div className="bg-green-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-green-900 mb-2">SEO Features:</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Long-tail keyword opportunities</li>
                    <li>• Proven content formats that rank well</li>
                    <li>• Emotional hooks that drive engagement</li>
                    <li>• Specific, searchable niche topics</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'fantasy' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Fantasy Worldbuilding Generator</h2>
                <p className="text-gray-700 mb-4">
                  Create intricate fantasy worlds with unique magic systems, rich cultures, and compelling conflicts that go beyond typical fantasy tropes. Our generator combines innovative magical concepts with specific cultural details and world-threatening conflicts.
                </p>
                <p className="text-gray-700 mb-4">
                  Each prompt features original magic systems with built-in limitations (emotion-based magic, memory-trading), detailed cultures with specific practices, and conflicts that create interesting political and social dynamics.
                </p>
                <div className="bg-amber-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-amber-900 mb-2">Worldbuilding Features:</h3>
                  <ul className="text-amber-800 text-sm space-y-1">
                    <li>• Original magic systems with clear rules and costs</li>
                    <li>• Unique cultures with specific practices and beliefs</li>
                    <li>• Complex conflicts with political implications</li>
                    <li>• Evocative locations beyond standard fantasy settings</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'names' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fantasy Character Name Generator</h2>
                <p className="text-gray-700 mb-4">
                  Generate authentic fantasy character names with cultural consistency and meaningful combinations. Our name generator creates names that sound natural within their fantasy cultures while suggesting character backgrounds and personalities.
                </p>
                <p className="text-gray-700 mb-4">
                  Each name is crafted from culturally consistent elements (Elvish, Dwarven, Human, Exotic) with optional titles and house affiliations that suggest the character's role, background, and social status within their world.
                </p>
              </div>
            )}

            {/* More Seasonal Writing Resources Section */}
            <div className="prose prose-gray max-w-none mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">More Seasonal Writing Resources</h2>
              <p className="text-gray-700 mb-4">
                For additional fall-themed ideas check out <a href="https://www.writersdigest.com/write-better-fiction/50-fall-writing-prompts" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">50 Fall Writing Prompts – WritersDigest</a> and <a href="https://blog.reedsy.com/halloween-writing-prompts/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Halloween Writing Prompts – Reedsy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Prompt Generator?</h2>
            <p className="text-xl text-gray-600 mb-12">Professional-quality prompts designed for real-world creative work</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
                <p className="text-gray-600">Generate unlimited prompts instantly with our advanced algorithms</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
                <p className="text-gray-600">Prompts crafted with industry terminology and proven techniques</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Save & Export</h3>
                <p className="text-gray-600">Save your favorite prompts and export them for future use</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Creators, By Creators</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our prompt generator was created by writers, artists, and content creators who understand the challenge of creative blocks.
              Every prompt is designed to spark genuine inspiration and produce professional results. Perfect for use with <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ChatGPT</a>, <a href="https://www.midjourney.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MidJourney</a>, and other AI tools. Stay updated on AI developments by following the <a href="https://openai.com/blog" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Blog</a>.
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">∞</div>
                <div className="text-sm text-gray-600">Unlimited Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Free Forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a random prompts generator?</h3>
                <p className="text-gray-700">
                  It's a tool that instantly creates unique ideas for writing, AI art, blogs, and worldbuilding using curated templates and parameters like genre, tone, and style.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Is the Random Prompts Generator free to use?</h3>
                <p className="text-gray-700">
                  Yes. You can generate unlimited prompts for free. Optional pro features may include saving, bulk export, and an API.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use the generated prompts commercially?</h3>
                <p className="text-gray-700">
                  Yes. Prompts are yours to use for personal or commercial projects; attribution is appreciated but not required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Helpful Resources Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Helpful Resources</h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Learn more about AI creativity at <a href="https://openai.com/blog" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Blog</a>, explore AI models at <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HuggingFace</a>, stay updated with <a href="https://openai.com/research" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Research</a>, and master SEO fundamentals with <a href="https://moz.com/beginners-guide-to-seo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Moz's Beginner's Guide to SEO</a>.
            </p>
          </div>
        </section>

        {/* All Tools Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore All Our Free Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/writing-prompts" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Writing Prompts</h3>
                <p className="text-gray-600">Generate creative writing prompts with conflicts and plot twists</p>
              </Link>
              <Link to="/ai-images-prompt" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Art Prompts</h3>
                <p className="text-gray-600">Professional prompts for MidJourney, DALL-E, and Stable Diffusion</p>
              </Link>
              <Link to="/ai-blog-post-generator" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Post Generator</h3>
                <p className="text-gray-600">SEO-optimized blog post ideas and content strategies</p>
              </Link>
              <Link to="/short-story-prompts-generator" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Short Story Prompts</h3>
                <p className="text-gray-600">Fantasy worldbuilding and short fiction prompts</p>
              </Link>
              <Link to="/random-name-generator" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Character Names</h3>
                <p className="text-gray-600">Generate unique fantasy and character names</p>
              </Link>
              <Link to="/october-writing-prompts" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">October Prompts</h3>
                <p className="text-gray-600">Halloween and fall-themed writing prompts</p>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PromptGenerator;
