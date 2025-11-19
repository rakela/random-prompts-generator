import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = { items: ['What unique method do people in your world use to tell time?', 'How does magic or technology affect daily life?', 'What is the most valuable resource in your world and why?', 'What taboo exists that everyone respects?', 'How do different species or cultures view death?', 'What ancient mystery still puzzles scholars?', 'What is the origin story of your worlds creation?', 'How do people travel long distances?', 'What role does religion or spirituality play?', 'What happened during the last great war?', 'How is social hierarchy determined?', 'What natural phenomenon is unique to your world?', 'How do people communicate across vast distances?', 'What legendary creature is real but rare?', 'What discovery changed everything?', 'How do seasons or climate affect society?', 'What is forbidden and why?', 'How does law and justice work?', 'What unites different kingdoms or nations?', 'What divides them?', 'How has history shaped current politics?', 'What ruins remain from ancient civilizations?', 'How do people entertain themselves?', 'What childhood rite of passage is universal?', 'What recent event changed everything?', 'How does education work?', 'What supernatural threat exists?', 'How do people mark important life events?', 'What technological innovation is most important?', 'What aspect of your world breaks our reality rules?'] };
const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const RandomWorldbuildingPromptsGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('random-worldbuilding-prompts-generator-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('random-worldbuilding-prompts-generator-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-worldbuilding-prompts-generator-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({ count: 'single' });

  const generatePrompt = useCallback(() => {
    const data = promptData.items;
    const batchSize = controls.count === 'multiple' ? 5 : controls.count === 'batch' ? 10 : 1;
    const items = [];
    for (let i = 0; i < batchSize; i++) { items.push(weightedRandom(data)); }
    const prompt = { id: Date.now(), text: batchSize === 1 ? items[0] : items.join('\n\n'), category: 'randomworldbuildingpromptsgenerator', timestamp: new Date().toISOString(), isMultiple: batchSize > 1 };
    setGeneratedPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]);
  }, [controls]);

  const copyToClipboard = async (text) => { try { await navigator.clipboard.writeText(text); } catch (err) { console.error('Failed to copy:', err); } };
  const savePrompt = (prompt) => setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  const toggleFavorite = (prompt) => { const isFavorite = favorites.some(fav => fav.id === prompt.id); if (isFavorite) { setFavorites(prev => prev.filter(fav => fav.id !== prompt.id)); } else { setFavorites(prev => [...prev, { ...prompt, favorited: true }]); } };
  const sharePrompt = async (prompt) => { if (navigator.share) { try { await navigator.share({ title: 'Random Worldbuilding Prompts Generator', text: prompt.text, url: window.location.href }); } catch (err) { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } } else { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } };
  const exportPrompts = () => { const dataStr = JSON.stringify(savedPrompts, null, 2); const dataBlob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(dataBlob); const link = document.createElement('a'); link.href = url; link.download = 'saved-randomworldbuildingpromptsgenerator.json'; link.click(); URL.revokeObjectURL(url); };
  const updateControl = (key, value) => setControls(prev => ({ ...prev, [key]: value }));

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultiple = prompt.isMultiple;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
        {isMultiple ? (
          <div className="mb-4 space-y-3">
            {prompt.text.split('\n\n').map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded border text-gray-800 dark:text-gray-200 leading-relaxed">{item}</div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors"><Copy size={14} /> Copy</button>
          <button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"><Save size={14} /> Save</button>
          <button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}><Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite</button>
          <button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"><Share2 size={14} /> Share</button>
          <button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"><RefreshCw size={14} /> Regenerate</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <SEO pageKey="randomWorldbuildingPromptsGenerator" />
      <Header promptHistory={promptHistory} showHistory={showHistory} onHistoryToggle={() => setShowHistory(!showHistory)} />
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Worldbuilding Prompts Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">Generate worldbuilding prompts for creating rich, detailed fictional worlds.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"><PenTool size={18} /> Writing</Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"><Sparkles size={18} /> AI Art</Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"><Crown size={18} /> Stories</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100">
              <option value="single">Single Item</option>
              <option value="multiple">Generate 5 Items</option>
              <option value="batch">Generate 10 Items</option>
            </select>
          </div>
          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">Generate</button>
          </div>
          {generatedPrompt && renderPromptCard(generatedPrompt)}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Items</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"><Download size={16} /> Export All</button>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Random Worldbuilding Prompts Generator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Generate worldbuilding prompts for creating rich, detailed fictional worlds.</p>
            </div>
          </div>
        </div>
        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use generated content in my projects?</h3>
                <p className="text-gray-700 dark:text-gray-300">Yes! All content generated by RandomPrompts.org is free to use in your creative projects.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RandomWorldbuildingPromptsGeneratorPage;
