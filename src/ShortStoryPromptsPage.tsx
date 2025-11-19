import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = {
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
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (template, data) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

const enhanceFantasyPrompt = (prompt) => {
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

const ShortStoryPromptsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('short-story-prompts-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('short-story-prompts-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('short-story-prompts-favorites', []);
  const [showHistory, setShowHistory] = useState(false);

  const generatePrompt = useCallback(() => {
    const data = promptData.fantasy;
    const template = weightedRandom(data.templates);
    let prompt = processTemplate(template, data);
    prompt = enhanceFantasyPrompt(prompt);

    const newPrompt = {
      id: Date.now(),
      text: prompt,
      category: 'fantasy',
      timestamp: new Date().toISOString()
    };

    setGeneratedPrompt(newPrompt);
    setPromptHistory(prev => [newPrompt, ...prev.slice(0, 19)]);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
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
          title: 'Short Story Prompts Generator',
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
    link.download = 'saved-short-story-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
        <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4">{prompt.text}</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors">
            <Copy size={14} /> Copy
          </button>
          <button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors">
            <Save size={14} /> Save
          </button>
          <button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite
          </button>
          <button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors">
            <Share2 size={14} /> Share
          </button>
          <button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors">
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="shortStoryPrompts" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Short Story Prompts Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate creative short story prompts instantly with our free short story prompts generator. Create unique fantasy and fiction story ideas with intricate magic systems, rich cultures, and compelling conflicts for your next short story or creative writing project.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-amber-600 border-b-2 border-amber-600 bg-amber-50">
            <Crown size={18} /> Short stories
          </Link>
          <Link to="/random-name-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <Sparkles size={18} /> Names
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Short Story Prompt
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Prompts</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent prompts. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => copyToClipboard(prompt.text)} className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors" title="Copy">
                            <Copy size={14} />
                          </button>
                          <button onClick={() => toggleFavorite(prompt)} className={`p-1 transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'}`} title="Favorite">
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

          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Prompts</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Advanced Short Story Prompts Generator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our short story prompts generator creates intricate short story prompts with unique magic systems, rich cultures, and compelling conflicts that go beyond typical fantasy tropes. This free short story prompts generator combines innovative magical concepts with specific cultural details and world-threatening conflicts perfect for fantasy fiction and creative short stories.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Each short story prompt features original magic systems with built-in limitations like emotion-based magic and memory-trading, detailed cultures with specific practices including sky nomads and time keepers, plus conflicts that create interesting political and social dynamics. Ideal for fantasy writers, NaNoWriMo participants, and anyone creating short story fiction or worldbuilding projects.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-amber-900 mb-2">Short Story Prompts Generator Features:</h3>
                <ul className="text-amber-800 text-sm space-y-1">
                  <li>• Original magic systems with clear rules and costs for believable fantasy</li>
                  <li>• Unique cultures with specific practices and beliefs for rich worldbuilding</li>
                  <li>• Complex conflicts with political implications perfect for short stories</li>
                  <li>• Evocative locations beyond standard fantasy settings</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8">More Seasonal Writing Resources</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For additional fall-themed ideas check out <a href="https://www.writersdigest.com/write-better-fiction/50-fall-writing-prompts" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">50 Fall Writing Prompts – WritersDigest</a> and <a href="https://blog.reedsy.com/halloween-writing-prompts/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Halloween Writing Prompts – Reedsy</a>.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">More Writing Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/writing-prompts" className="text-amber-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/writing-prompts-for-students" className="text-amber-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Writing Prompts for Students
              </Link>
              <Link to="/october-writing-prompts" className="text-amber-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                October Writing Prompts
              </Link>
              <Link to="/ai-blog-post-generator" className="text-amber-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Blog Post Generator
              </Link>
            </div>

            <div className="mt-8 bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Helpful Resources</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Explore fantasy prompt examples at <a href="https://reedsy.com/writing-prompts/fantasy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Reedsy Fantasy Writing Prompts</a> and join the worldbuilding community at <a href="https://reddit.com/r/worldbuilding" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Reddit r/worldbuilding</a>.
              </p>
            </div>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What is a short story prompts generator?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A short story prompts generator is a tool that creates creative story ideas specifically designed for short fiction. Our short story prompts generator produces detailed fantasy and fiction prompts with magic systems, cultures, conflicts, and settings that provide a complete foundation for your next short story.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do I use short story prompts effectively?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Start with a generated short story prompt, identify the key elements (magic system, culture, conflict, location), and expand on the aspects that intrigue you most. Use the short story prompt as a foundation and add your own characters, plot twists, and personal creative touches to develop a complete short story.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use these short story prompts for published work?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! All short story prompts generated by RandomPrompts.org are free to use for personal or commercial projects, including published short stories, novels, screenplays, and creative writing submissions. The resulting stories you write from these prompts are entirely yours.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What makes these short story prompts different?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our short story prompts generator creates detailed, multi-layered prompts with specific magic systems, unique cultures, compelling conflicts, and evocative settings. Instead of simple one-line prompts, you get complete worldbuilding foundations with interconnected elements perfect for developing rich short stories and fantasy fiction.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Are short story prompts only for fantasy genre?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  While our short story prompts generator currently focuses on fantasy and speculative fiction with magic systems and unique cultures, these prompts can be adapted to other genres. The worldbuilding elements, conflicts, and cultural details work well for science fiction, dystopian stories, and even literary fiction with creative modifications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ShortStoryPromptsPage;
