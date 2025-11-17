// Random Prompts Generator - Chrome Extension
// Prompt data dictionaries
const promptData = {
  writing: {
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
    techniques: [
      'hyperrealistic digital painting', 'concept art', 'matte painting', 'photorealistic 3D render',
      'oil painting masterpiece', 'watercolor illustration', 'pencil sketch portrait',
      'acrylic painting', 'charcoal drawing', 'digital art illustration'
    ],

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

    lighting: [
      'dramatic chiaroscuro lighting', 'golden hour rim lighting', 'volumetric god rays',
      'neon accent lighting', 'soft box studio lighting', 'harsh spotlight from above',
      'bioluminescent ambient glow', 'candlelight and shadows', 'aurora borealis backdrop',
      'lens flare and bloom effects', 'moody atmospheric lighting', 'backlit silhouette'
    ],

    composition: [
      'extreme close-up portrait', 'wide establishing shot', 'dramatic low angle',
      'bird\'s eye view', 'dutch angle composition', 'symmetrical framing',
      'rule of thirds composition', 'leading lines', 'depth of field focus',
      'macro detail shot', 'panoramic landscape', 'tilt-shift miniature effect'
    ],

    quality: [
      'trending on ArtStation', 'highly detailed', 'award-winning photography',
      'museum quality', 'photorealistic', 'hyper-detailed',
      'studio quality', 'masterpiece', '8K resolution', 'ultra-realistic'
    ],

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

    templates: ['{topics}', '{titles}']
  },

  names: {
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

// Helper functions
const weightedRandom = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const processTemplate = (template, data, category) => {
  if (category === 'names') {
    const cultures = ['elvish', 'dwarven', 'human', 'exotic'];
    const selectedCulture = weightedRandom(cultures);
    const cultureData = data[selectedCulture];

    const firstName = weightedRandom(cultureData.first);
    const lastName = weightedRandom(cultureData.last);

    return `${firstName} ${lastName}`;
  }

  if (category === 'persuasive') {
    const allTopics = [...data.topics, ...data.titles];
    return weightedRandom(allTopics);
  }

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

const enhancePrompt = (prompt, category) => {
  const enhancements = {
    writing: [
      ' Focus on the internal conflict.',
      ' Include a ticking clock element.',
      ' Show the cost of failure.',
      ' Add a moral dilemma.',
      ' Include sensory details.'
    ],
    aiArt: [
      ', ultra detailed, 8k resolution',
      ', professional photography',
      ', award winning composition',
      ', cinematic lighting',
      ', sharp focus, detailed textures'
    ],
    blog: [
      ' Target long-tail keywords.',
      ' Include actionable takeaways.',
      ' Add personal anecdotes.',
      ' Use data and statistics.',
      ' Include expert quotes.'
    ],
    fantasy: [
      ' Consider the economic implications.',
      ' Think about the cultural conflicts.',
      ' Explore the magic system\'s limitations.',
      ' Add political intrigue.',
      ' Include ancient history.'
    ]
  };

  if (enhancements[category] && Math.random() < 0.3) {
    return prompt + weightedRandom(enhancements[category]);
  }

  return prompt;
};

const generatePrompt = (category) => {
  const data = promptData[category];
  if (!data) return null;

  let prompt;

  // Names category doesn't use templates
  if (category === 'names') {
    prompt = processTemplate(null, data, category);
  } else {
    const template = weightedRandom(data.templates);
    prompt = processTemplate(template, data, category);
  }

  prompt = enhancePrompt(prompt, category);

  return {
    text: prompt,
    category: category,
    timestamp: new Date().toISOString()
  };
};

// UI State
let currentCategory = 'writing';
let currentPrompt = null;
let savedPrompts = [];

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const generateBtn = document.getElementById('generate-btn');
const resultArea = document.getElementById('result-area');
const promptText = document.getElementById('prompt-text');
const copyBtn = document.getElementById('copy-btn');
const saveBtn = document.getElementById('save-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const savedList = document.getElementById('saved-list');
const clearSavedBtn = document.getElementById('clear-saved-btn');

// Event Listeners
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    resultArea.classList.add('hidden');
  });
});

generateBtn.addEventListener('click', () => {
  currentPrompt = generatePrompt(currentCategory);
  if (currentPrompt) {
    promptText.textContent = currentPrompt.text;
    resultArea.classList.remove('hidden');
  }
});

copyBtn.addEventListener('click', () => {
  if (currentPrompt) {
    navigator.clipboard.writeText(currentPrompt.text).then(() => {
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Copied!
      `;
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy
        `;
      }, 2000);
    });
  }
});

saveBtn.addEventListener('click', () => {
  if (currentPrompt) {
    savedPrompts.push(currentPrompt);
    saveToChromeStorage();
    renderSavedPrompts();

    saveBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Saved!
    `;
    setTimeout(() => {
      saveBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Save
      `;
    }, 2000);
  }
});

regenerateBtn.addEventListener('click', () => {
  generateBtn.click();
});

clearSavedBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all saved prompts?')) {
    savedPrompts = [];
    saveToChromeStorage();
    renderSavedPrompts();
  }
});

// Chrome Storage Functions
const saveToChromeStorage = () => {
  chrome.storage.local.set({ savedPrompts: savedPrompts });
};

const loadFromChromeStorage = () => {
  chrome.storage.local.get(['savedPrompts'], (result) => {
    if (result.savedPrompts) {
      savedPrompts = result.savedPrompts;
      renderSavedPrompts();
    }
  });
};

const renderSavedPrompts = () => {
  if (savedPrompts.length === 0) {
    savedList.innerHTML = '<p class="no-saved">No saved prompts yet</p>';
    return;
  }

  savedList.innerHTML = savedPrompts.slice(-5).reverse().map((prompt, index) => `
    <div class="saved-item">
      <div class="saved-content">
        <span class="saved-category ${prompt.category}">${prompt.category}</span>
        <p class="saved-text">${prompt.text}</p>
      </div>
      <button class="delete-btn" data-index="${savedPrompts.length - 1 - index}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
      </button>
    </div>
  `).join('');

  // Add delete listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      savedPrompts.splice(index, 1);
      saveToChromeStorage();
      renderSavedPrompts();
    });
  });
};

// Initialize
loadFromChromeStorage();
