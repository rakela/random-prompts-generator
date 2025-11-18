import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = {
  themes: [
    'The corrupting influence of power and ambition',
    'The struggle between individual freedom and societal expectations',
    'The nature of identity and self-discovery',
    'The cost of revenge and the cycle of violence',
    'The complexity of human morality—good and evil are not absolute',
    'The destructive nature of obsession',
    'The importance of sacrifice for the greater good',
    'The search for meaning and purpose in life',
    'The conflict between tradition and progress',
    'The consequences of isolation and loneliness',
    'The power of love to redeem and transform',
    'The inevitability of change and the fear it brings',
    'The price of knowledge and forbidden truth',
    'The illusion of control in a chaotic universe',
    'The conflict between appearance and reality',
    'The burden of guilt and the possibility of redemption',
    'The nature of heroism—ordinary people in extraordinary circumstances',
    'The destruction caused by unchecked greed',
    'The tension between justice and mercy',
    'The loss of innocence and coming of age',
    'The power dynamics in relationships and society',
    'The consequences of playing god',
    'The search for belonging and home',
    'The inevitability of death and how we face mortality',
    'The danger of ignorance and willful blindness',
    'The strength found in vulnerability',
    'The impact of trauma across generations',
    'The complexity of family loyalty',
    'The price of conformity versus authenticity',
    'The nature of time—how it heals or destroys',
    'The consequences of technology without wisdom',
    'The struggle between faith and doubt',
    'The power of memory and nostalgia',
    'The danger of absolute certainty',
    'The resilience of the human spirit',
    'The cost of perfection and unattainable ideals',
    'The nature of truth in a world of perspectives',
    'The weight of legacy and expectations',
    'The duality of human nature—capacity for both good and evil',
    'The illusion of happiness in material wealth',
    'The power of art and creativity to change the world',
    'The importance of empathy in understanding others',
    'The consequences of secrets and lies',
    'The struggle between destiny and free will',
    'The nature of consciousness and what makes us human',
    'The impact of war on humanity',
    'The search for redemption after unforgivable acts',
    'The tension between logic and emotion',
    'The consequences of environmental destruction',
    'The power of hope in desperate situations',
    'The complexity of justice versus revenge',
    'The nature of reality and perception',
    'The cost of ambition and success',
    'The importance of community and connection',
    'The struggle between heart and duty',
    'The nature of sanity and madness',
    'The power of language and communication',
    'The consequences of pride and hubris',
    'The search for redemption through sacrifice',
    'The nature of beauty and its fleeting quality',
    'The conflict between past and future',
    'The price of loyalty and betrayal',
    'The impact of choices—butterfly effect',
    'The nature of evil—is it born or made?',
    'The power of forgiveness',
    'The struggle between order and chaos',
    'The cost of survival',
    'The nature of courage—facing fear',
    'The impact of prejudice and discrimination',
    'The search for justice in an unjust world',
    'The complexity of parent-child relationships',
    'The nature of leadership and responsibility',
    'The consequences of blind faith',
    'The power of storytelling and myth',
    'The tension between science and spirituality',
    'The cost of maintaining secrets',
    'The nature of sanity in an insane world',
    'The impact of social class on opportunity',
    'The search for identity in displacement',
    'The power of education and knowledge',
    'The consequences of dehumanization',
    'The nature of friendship and loyalty'
  ]
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const RandomThemeGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.themes;
    const batchSize = controls.count === 'multiple' ? 5 : controls.count === 'batch' ? 10 : 1;
    const themes = [];
    for (let i = 0; i < batchSize; i++) {
      themes.push(weightedRandom(data));
    }
    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? themes[0] : themes.join('\n\n'),
      category: 'theme',
      timestamp: new Date().toISOString(),
      isMultiple: batchSize > 1
    };
    setGeneratedPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]);
  }, [controls]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt) => setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
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
        await navigator.share({ title: 'Random Theme Generator', text: prompt.text, url: window.location.href });
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
    link.download = 'saved-themes.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  const updateControl = (key, value) => setControls(prev => ({ ...prev, [key]: value }));

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultiple = prompt.isMultiple;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultiple ? (
          <div className="mb-4 space-y-3">
            {prompt.text.split('\n\n').map((theme, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 leading-relaxed">{theme}</div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"><Copy size={14} /> Copy {isMultiple ? 'All' : ''}</button>
          <button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"><Save size={14} /> Save</button>
          <button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}><Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite</button>
          <button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"><Share2 size={14} /> Share</button>
          <button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"><RefreshCw size={14} /> Regenerate</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="randomThemeGenerator" />
      <Header promptHistory={promptHistory} showHistory={showHistory} onHistoryToggle={() => setShowHistory(!showHistory)} />
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Theme Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random themes instantly with our free theme generator. Create powerful story themes, literary motifs, and narrative ideas perfect for novels, short stories, essays, and creative writing projects.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><PenTool size={18} /> Writing</Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><Crown size={18} /> Short stories</Link>
          <Link to="/random-conflict-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><BookOpen size={18} /> Conflicts</Link>
          <Link to="/random-character-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><Sparkles size={18} /> Characters</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="single">Single Theme</option>
              <option value="multiple">Generate 5 Themes</option>
              <option value="batch">Generate 10 Themes</option>
            </select>
          </div>
          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">Generate Random Theme</button>
          </div>
          {generatedPrompt && renderPromptCard(generatedPrompt)}
          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Themes</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent themes. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed line-clamp-2">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => copyToClipboard(prompt.text)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy"><Copy size={14} /></button>
                          <button onClick={() => toggleFavorite(prompt)} className={`p-1 transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'}`} title="Favorite"><Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /></button>
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
                <h3 className="text-2xl font-bold text-gray-900">Saved Themes</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"><Download size={16} /> Export All</button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4"><p className="text-gray-800">{prompt.text}</p></div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Theme Generator</h2>
              <p className="text-gray-700 mb-4">Our random theme generator creates powerful literary themes and universal truths perfect for novels, short stories, essays, and creative writing. Generate random themes exploring human nature, morality, society, and the human condition.</p>
              <p className="text-gray-700 mb-4">Themes provide depth and meaning to stories by exploring universal ideas through specific narratives. This free theme generator produces thought-provoking concepts that resonate across cultures and time periods.</p>
              <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-emerald-900 mb-2">Random Theme Generator Features:</h3>
                <ul className="text-emerald-800 text-sm space-y-1">
                  <li>• 80+ universal themes exploring human nature and society</li>
                  <li>• Thought-provoking concepts for literary depth</li>
                  <li>• Batch generation: Create 1, 5, or 10 random themes at once</li>
                  <li>• Perfect for writers, students, and creative projects</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example Random Themes:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span>"The corrupting influence of power and ambition"</span></li>
                <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span>"The struggle between individual freedom and societal expectations"</span></li>
                <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span>"The complexity of human morality—good and evil are not absolute"</span></li>
                <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span>"The power of love to redeem and transform"</span></li>
                <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span>"The resilience of the human spirit"</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/writing-prompts" className="text-emerald-600 hover:underline flex items-center gap-2"><PenTool size={16} />Writing Prompts</Link>
              <Link to="/random-conflict-generator" className="text-emerald-600 hover:underline flex items-center gap-2"><Sparkles size={16} />Conflict Generator</Link>
              <Link to="/random-character-generator" className="text-emerald-600 hover:underline flex items-center gap-2"><Crown size={16} />Character Generator</Link>
              <Link to="/short-story-prompts-generator" className="text-emerald-600 hover:underline flex items-center gap-2"><BookOpen size={16} />Short Story Prompts</Link>
            </div>
          </div>
        </div>
        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a literary theme?</h3>
                <p className="text-gray-700">A literary theme is a universal idea or message explored throughout a story. Themes give stories depth and meaning by examining fundamental aspects of human experience like love, power, identity, mortality, and morality.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I use a theme in my writing?</h3>
                <p className="text-gray-700">Use themes as the foundation for your story's meaning. Let the theme inform your plot, characters, and conflicts. Show the theme through actions and consequences rather than stating it directly. Our random theme generator provides starting points for meaningful narratives.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can a story have multiple themes?</h3>
                <p className="text-gray-700">Yes! Most complex stories explore multiple related themes. You might have one primary theme and several secondary themes that complement and enrich the main idea. Use our generator to find connected themes for your narrative.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are generated themes free to use?</h3>
                <p className="text-gray-700">Yes! All random themes generated by RandomPrompts.org are free to use in your creative writing, novels, short stories, essays, and academic work. These universal concepts are meant to inspire your unique storytelling.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RandomThemeGeneratorPage;
