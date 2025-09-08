import React, { useState, useCallback, useMemo } from 'react';
import { Copy, RefreshCw, Save, Download, Sparkles, Wand2, PenTool, BookOpen, Crown } from 'lucide-react';

// Data dictionaries for generation
const promptData = {
  writing: {
    genres: ['fantasy', 'sci-fi', 'mystery', 'romance', 'horror', 'thriller', 'adventure', 'drama', 'comedy', 'historical'],
    tones: ['dark', 'light', 'mysterious', 'romantic', 'humorous', 'serious', 'whimsical', 'gritty', 'uplifting', 'melancholic'],
    settings: ['ancient castle', 'space station', 'small town', 'post-apocalyptic world', 'magical forest', 'underwater city', 'boarding school', 'parallel dimension', 'remote island', 'cyberpunk metropolis'],
    conflicts: ['discover a hidden secret', 'overcome their greatest fear', 'choose between two loves', 'save their community', 'find their true identity', 'break an ancient curse', 'solve a mysterious disappearance', 'prevent a catastrophe', 'reunite with a lost family member', 'master forbidden knowledge'],
    twists: ['the villain is their best friend', 'they have been dead all along', 'it was all a simulation', 'they are the chosen one', 'the past repeats itself', 'their memory has been altered', 'they can time travel', 'everyone else has vanished', 'they have a secret twin', 'the world is not what it seems'],
    protagonists: ['a reluctant hero', 'a mysterious stranger', 'a young apprentice', 'an exiled noble', 'a skilled thief', 'a powerful mage', 'a humble farmer', 'a seasoned warrior', 'a curious scholar', 'a lost traveler'],
    templates: [
      'Write a {tone} {genre} story about {protagonist} who must {conflict} in {setting}, but {twist}.',
      'Create a {genre} tale where {protagonist} discovers {conflict} in {setting} with a {tone} atmosphere.',
      'In {setting}, {protagonist} faces the challenge to {conflict}, leading to a {tone} revelation that {twist}.',
      'A {tone} {genre} story unfolds as {protagonist} navigates {setting} and must {conflict} when {twist}.',
      'Set in {setting}, this {tone} {genre} follows {protagonist} as they {conflict} and discover that {twist}.'
    ]
  },
  aiArt: {
    styles: ['photorealistic', 'digital art', 'oil painting', 'watercolor', 'anime', 'cartoon', 'steampunk', 'cyberpunk', 'surreal', 'minimalist'],
    subjects: ['majestic dragon', 'futuristic cityscape', 'enchanted forest', 'space explorer', 'mythical creature', 'ancient temple', 'robot companion', 'magical portal', 'cosmic phenomenon', 'underwater palace'],
    moods: ['ethereal', 'dramatic', 'peaceful', 'mysterious', 'vibrant', 'dark', 'dreamy', 'epic', 'serene', 'intense'],
    lighting: ['golden hour', 'neon lights', 'candlelight', 'moonlight', 'aurora borealis', 'dramatic shadows', 'soft diffused', 'backlit', 'volumetric rays', 'bioluminescent'],
    artists: ['in the style of Hayao Miyazaki', 'reminiscent of H.R. Giger', 'inspired by Bob Ross', 'like Studio Ghibli', 'in Greg Rutkowski style', 'as painted by Van Gogh', 'trending on ArtStation', 'concept art quality', 'matte painting style', 'digital illustration'],
    templates: [
      '{subject} in {style} art style, {mood} atmosphere, {lighting}, {artists}',
      'A {mood} scene of {subject} rendered in {style}, featuring {lighting}, {artists}',
      '{subject} with {lighting} and {mood} vibes, created in {style}, {artists}',
      'Stunning {style} artwork depicting {subject}, {mood} mood, beautiful {lighting}, {artists}',
      '{artists} interpretation of {subject} in {style}, capturing a {mood} essence with {lighting}'
    ]
  },
  blog: {
    topics: ['productivity', 'technology', 'lifestyle', 'business', 'health', 'travel', 'food', 'finance', 'education', 'relationships'],
    formats: ['how-to guide', 'listicle', 'case study', 'opinion piece', 'review', 'tutorial', 'interview', 'comparison', 'beginner\'s guide', 'trend analysis'],
    angles: ['data-driven', 'personal story', 'contrarian view', 'beginner-friendly', 'expert insights', 'controversial', 'inspiring', 'practical', 'research-based', 'humorous'],
    hooks: ['surprising statistic', 'common myth debunked', 'personal failure story', 'counter-intuitive truth', 'industry secret revealed', 'bold prediction', 'universal struggle', 'success story', 'shocking revelation', 'simple solution'],
    templates: [
      'Write a {format} about {topics} from a {angles} perspective, starting with {hooks}',
      'Create a {angles} {format} on {topics} that opens with {hooks}',
      'Develop a {format} exploring {topics} using {angles} approach, hooking readers with {hooks}',
      'A {angles} take on {topics} in {format} style, beginning with {hooks}',
      '{format} about {topics}: {angles} insights starting with {hooks}'
    ]
  },
  fantasy: {
    races: ['elves', 'dwarves', 'dragons', 'orcs', 'fairies', 'centaurs', 'merfolk', 'phoenixes', 'werewolves', 'ancient spirits'],
    magicSystems: ['elemental magic', 'blood magic', 'runic enchantments', 'divine blessings', 'necromancy', 'illusion arts', 'time manipulation', 'soul binding', 'crystal magic', 'wild magic'],
    locations: ['floating islands', 'underground kingdoms', 'magical academies', 'ancient libraries', 'enchanted forests', 'crystal caves', 'sky cities', 'dimensional rifts', 'sacred temples', 'cursed wastelands'],
    conflicts: ['war between kingdoms', 'magical plague spreading', 'ancient evil awakening', 'prophecy coming true', 'magic disappearing', 'portal to another realm', 'divine intervention needed', 'cursed artifact found', 'balance of power shifting', 'forgotten knowledge surfacing'],
    artifacts: ['legendary sword', 'crystal of power', 'ancient tome', 'magical crown', 'enchanted ring', 'staff of elements', 'mirror of truth', 'cloak of shadows', 'amulet of protection', 'orb of destiny'],
    templates: [
      'In a world where {races} practice {magicSystems}, {conflicts} threatens {locations} and only {artifacts} can restore balance.',
      'Create a fantasy realm where {races} in {locations} must face {conflicts} using {magicSystems} and {artifacts}.',
      'A tale of {races} wielding {magicSystems} in {locations}, where {conflicts} leads to the discovery of {artifacts}.',
      'In {locations}, {races} master {magicSystems} to overcome {conflicts} with the help of {artifacts}.',
      'When {conflicts} strikes {locations}, {races} must unite their {magicSystems} and seek {artifacts}.'
    ]
  },
  names: {
    firstNames: ['Aeliana', 'Thorgar', 'Mystral', 'Korven', 'Seraphina', 'Drakon', 'Lyralei', 'Vorthak', 'Celestine', 'Grimjaw'],
    surnames: ['Stormwind', 'Shadowbane', 'Frostborn', 'Goldheart', 'Nightwhisper', 'Ironforge', 'Starweaver', 'Bloodthorn', 'Moonstrider', 'Firebeard'],
    titles: ['the Brave', 'the Wise', 'the Feared', 'the Just', 'the Silent', 'the Bold', 'the Ancient', 'the Pure', 'the Wild', 'the Chosen'],
    origins: ['of the Northern Peaks', 'from the Whispering Woods', 'of the Crystal Caverns', 'from the Emerald Isles', 'of the Golden Desert', 'from the Shadowlands', 'of the Starlit Valley', 'from the Frozen Reaches', 'of the Mystic Falls', 'from the Burning Steppes'],
    templates: [
      '{firstNames} {surnames}',
      '{firstNames} {titles}',
      '{firstNames} {surnames} {titles}',
      '{firstNames} {origins}',
      '{firstNames} {surnames} {origins}'
    ]
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

// Template processor
const processTemplate = (template, data) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

const PromptGenerator = () => {
  const [activeTab, setActiveTab] = useState('writing');
  const [generatedPrompts, setGeneratedPrompts] = useState({});
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [controls, setControls] = useState({
    writing: { genre: 'any', tone: 'any', length: 'medium' },
    aiArt: { style: 'any', mood: 'any', quality: 'high' },
    blog: { topic: 'any', format: 'any', angle: 'any' },
    fantasy: { race: 'any', magic: 'any', setting: 'any' },
    names: { type: 'full', origin: 'any', gender: 'any' }
  });

  const tabs = [
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'aiArt', label: 'AI Art', icon: Wand2 },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'fantasy', label: 'Fantasy', icon: Crown },
    { id: 'names', label: 'Names', icon: Sparkles }
  ];

  const generatePrompt = useCallback((category = activeTab, count = 1) => {
    const data = promptData[category];
    if (!data) return;

    const prompts = [];
    for (let i = 0; i < count; i++) {
      const template = weightedRandom(data.templates);
      const prompt = processTemplate(template, data);
      prompts.push({
        id: Date.now() + i,
        text: prompt,
        category,
        timestamp: new Date().toISOString()
      });
    }

    setGeneratedPrompts(prev => ({
      ...prev,
      [category]: count === 1 ? prompts[0] : prompts
    }));
  }, [activeTab]);

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
    const categoryData = promptData[category];
    if (!categoryData) return null;

    const categoryControls = controls[category];
    const updateControl = (key, value) => {
      setControls(prev => ({
        ...prev,
        [category]: { ...prev[category], [key]: value }
      }));
    };

    switch (category) {
      case 'writing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select 
              value={categoryControls.genre}
              onChange={(e) => updateControl('genre', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Genre</option>
              {categoryData.genres.map(genre => (
                <option key={genre} value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</option>
              ))}
            </select>
            <select 
              value={categoryControls.tone}
              onChange={(e) => updateControl('tone', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Tone</option>
              {categoryData.tones.map(tone => (
                <option key={tone} value={tone}>{tone.charAt(0).toUpperCase() + tone.slice(1)}</option>
              ))}
            </select>
            <select 
              value={categoryControls.length}
              onChange={(e) => updateControl('length', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
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
              <option value="any">Any Style</option>
              {categoryData.styles.map(style => (
                <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
              ))}
            </select>
            <select 
              value={categoryControls.mood}
              onChange={(e) => updateControl('mood', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="any">Any Mood</option>
              {categoryData.moods.map(mood => (
                <option key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</option>
              ))}
            </select>
            <select 
              value={categoryControls.quality}
              onChange={(e) => updateControl('quality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="standard">Standard</option>
              <option value="high">High Quality</option>
              <option value="ultra">Ultra HD</option>
            </select>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Choose options...</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>More options...</option>
            </select>
          </div>
        );
    }
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(prompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy
          </button>
          <button
            onClick={() => savePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"
          >
            <Save size={14} />
            Save
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
      names: 'pink'
    };
    return colors[tabId] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random Prompt Generator
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">
            Writing, AI Art, Blog & Fantasy
          </p>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique, high-quality prompts for writing, AI art, blogging, and worldbuilding — in one clean tool. Free, fast, unlimited.
          </p>
          <button
            onClick={() => generatePrompt()}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Generating
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const color = getTabColor(tab.id);
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                  isActive
                    ? `text-${color}-600 border-b-2 border-${color}-600 bg-${color}-50`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Generator Section */}
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          {renderControls(activeTab)}

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => generatePrompt()}
              className={`bg-${getTabColor(activeTab)}-600 hover:bg-${getTabColor(activeTab)}-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg`}
            >
              Generate Prompt
            </button>
          </div>

          {/* Result */}
          {generatedPrompts[activeTab] && renderPromptCard(generatedPrompts[activeTab])}

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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Writing Prompt Generator</h2>
                <p className="text-gray-700 mb-4">
                  Overcome writer's block with our intelligent writing prompt generator. Whether you're working on short stories, novels, or creative exercises, our tool provides endless inspiration across multiple genres and tones.
                </p>
                <p className="text-gray-700">
                  Each prompt combines carefully curated elements including genres, settings, conflicts, and plot twists to create unique story ideas that spark creativity and get your imagination flowing.
                </p>
              </div>
            )}

            {activeTab === 'aiArt' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Art Prompt Generator</h2>
                <p className="text-gray-700 mb-4">
                  Create stunning AI artwork with professionally crafted prompts optimized for MidJourney, Stable Diffusion, DALL-E, and other AI art platforms. Our prompts include style references, lighting descriptions, and artistic techniques.
                </p>
                <p className="text-gray-700">
                  From photorealistic portraits to fantastical landscapes, generate prompts that produce gallery-worthy AI art with the perfect balance of detail and creative freedom.
                </p>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Idea Generator</h2>
                <p className="text-gray-700 mb-4">
                  Never run out of blog content ideas again. Our generator creates engaging post concepts with built-in hooks, angles, and formats that drive traffic and engage readers.
                </p>
                <p className="text-gray-700">
                  Perfect for content marketers, bloggers, and businesses looking to maintain consistent, compelling content across multiple topics and industries.
                </p>
              </div>
            )}

            {activeTab === 'fantasy' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fantasy Worldbuilding Generator</h2>
                <p className="text-gray-700 mb-4">
                  Build rich, immersive fantasy worlds with our comprehensive worldbuilding prompts. From magical systems to ancient conflicts, create the foundation for epic fantasy stories and campaigns.
                </p>
                <p className="text-gray-700">
                  Ideal for fantasy writers, game masters, and worldbuilders who need inspiration for creating detailed, believable fantasy realms filled with magic, adventure, and wonder.
                </p>
              </div>
            )}

            {activeTab === 'names' && (
              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Character Name Generator</h2>
                <p className="text-gray-700 mb-4">
                  Generate memorable character names that fit perfectly into your fantasy worlds. Our name generator combines first names, surnames, titles, and origins to create authentic-sounding characters.
                </p>
                <p className="text-gray-700">
                  Whether you need heroic protagonists, mysterious villains, or colorful side characters, find the perfect name that captures your character's essence and background.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;