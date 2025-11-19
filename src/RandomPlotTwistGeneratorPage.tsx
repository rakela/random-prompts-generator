import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = {
  twists: [
    'The trusted mentor who has been guiding the protagonist is actually the main antagonist.',
    'The missing person everyone is searching for has been dead since the beginning-the person they\'ve been following is an imposter.',
    'The protagonist discovers they are an unreliable narrator suffering from amnesia, and they\'ve been remembering events incorrectly.',
    'The "villain" the hero defeated was actually trying to prevent a much greater catastrophe.',
    'Everyone the protagonist knows is an actor hired for an elaborate experiment or reality show.',
    'The entire story has been taking place in a virtual reality simulation.',
    'The protagonist is actually the antagonist from the future trying to prevent their own dark path.',
    'The love interest is working undercover for the enemy organization.',
    'The prophecy everyone believed was actually misinterpreted, and its true meaning changes everything.',
    'The main character has been dead the entire time and is a ghost unaware of their own death.',
    'The trusted sidekick has been sabotaging the mission from within.',
    'The world they\'re trying to save is actually a prison for dangerous beings, and "saving" it means releasing them.',
    'The protagonist\'s memories are fabricated, implanted by someone else.',
    'The person believed to be dead staged their own death and has been orchestrating events from the shadows.',
    'The cure they\'ve been seeking will actually make the problem worse.',
    'The protagonist discovers they\'re the clone, not the original.',
    'The antagonist is actually the protagonist from a different timeline trying to prevent disaster.',
    'The alien invasion is actually a rescue mission from humanities future.',
    'The magical/supernatural elements are actually advanced technology misunderstood.',
    'The chosen one prophecy was created as manipulation, not divine prediction.',
    'The protagonist\'s closest ally has been mind-controlled the entire time.',
    'The treasure/artifact/goal they\'ve been seeking doesn\'t actually exist-it\'s a test or distraction.',
    'The sanctuary they\'ve been trying to reach is actually more dangerous than where they fled from.',
    'The protagonist discovers they\'re not human-they\'re an advanced AI, android, or alien.',
    'The person who seemed powerless has actually been the most powerful character all along.',
    'The "real world" scenes are actually the dream/simulation, not the other way around.',
    'The villain\'s evil plan is actually necessary to prevent an even worse outcome.',
    'The organization fighting the protagonists is actually on the side of good.',
    'The character presumed to be the main protagonist is actually just a side character in someone else\'s story.',
    'The apocalypse they\'re trying to prevent already happened-they\'re living in the aftermath.',
    'The protagonist\'s special ability is actually a curse placed by an enemy, not a gift.',
    'The historical records everyone believes are completely fabricated.',
    'The child being protected is actually more dangerous than any threat they face.',
    'The multiverse they discover reveals they\'re the villain in most timelines.',
    'The rescue mission is actually a trap, and the captive is bait.',
    'The protagonist\'s perfect life is a simulation created while their body is used for something sinister.',
    'The mysterious disease/curse affecting everyone was created by the heroes, not the villains.',
    'The person they thought betrayed them was actually protecting them all along.',
    'The protagonist realizes they\'re the reincarnation of the ancient evil they\'re fighting.',
    'The utopia they\'ve reached is maintained by secretly terrible means.',
    'The protagonist discovers they\'ve been time-looping and forgetting-this is attempt number 1,000.',
    'The friendly AI has been manipulating events to ensure it\'s own existence.',
    'The protagonist\'s tragic backstory never actually happened-it was implanted.',
    'The two enemies discover they\'re actually the same person from different timelines.',
    'The magical system they rely on is powered by something deeply unethical.',
    'The "prophetic visions" are actually memories from a past timeline.',
    'The different characters are actually different personalities of the same person.',
    'The hero\'s victory actually fulfills the villain\'s ultimate plan.',
    'The quest was designed to fail from the beginning-the journey itself was the real goal.',
    'The character they killed earlier is revealed to be alive and crucial to the solution.',
    'The protagonist discovers they\'re narrating their own trial or judgment.',
    'The advanced civilization they discovered is actually humanity\'s forgotten past.',
    'The monsters they\'ve been fighting are actually victims trying to warn them.',
    'The protagonist realizes they\'re the only real person in a world of NPCs.',
    'The "escape" was actually them being led exactly where the enemy wanted.',
    'The love story was engineered by others to produce a specific outcome.',
    'The protagonist\'s greatest enemy is actually their future self trying to communicate.',
    'The magical/fantasy world is real, and the "real world" is the illusion.',
    'The character who seemed to be helping is actually farming the protagonist\'s experiences for entertainment.',
    'The protagonist discovers they\'re a character in a story and can see the author/reader.',
    'The apocalypse isn\'t being prevented-it\'s being caused by their attempts to stop it.',
    'The protagonist was never special-they were just in the right place at the right time.',
    'The war both sides are fighting is actually being orchestrated by a third party.',
    'The protagonist\'s entire personality is based on someone else they absorbed/killed.',
    'The "evil empire" is actually from the future trying to prevent a worse timeline.',
    'The protagonist discovers they\'re the monster from someone else\'s horror story.',
    'The magic/powers everyone uses has terrible long-term consequences no one knows about.',
    'The protagonist has been solving the wrong mystery-the real crime is something else entirely.',
    'The character everyone thought was ordinary was actually a god/demon/powerful being in disguise.',
    'The protagonist\'s memories of being the hero are false-they were actually the villain.',
    'The seemingly random events were all orchestrated as an elaborate message or test.',
    'The person they\'ve been talking to doesn\'t exist-it\'s their own fractured psyche.',
    'The protagonist is patient zero of the catastrophe they\'re trying to stop.',
    'The happy ending they achieved is actually the beginning of something terrible.',
    'The entire cast realizes they\'re in a time loop someone else is controlling.',
    'The protagonist discovers the "right choice" they made led to a worse outcome.',
    'The ancient evil they\'re fighting is actually a future version of their civilization.',
    'The protagonist\'s family has been replaced by duplicates, and they\'re just noticing.',
    'The mentor who died is still alive but had to fake their death for a greater purpose.',
    'The protagonist is actually the antagonist\'s puppet, controlled without realizing it.'
  ]
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const RandomPlotTwistGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('random-plot-twist-generator-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('random-plot-twist-generator-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-plot-twist-generator-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.twists;
    const batchSize = controls.count === 'multiple' ? 5 :
                     controls.count === 'batch' ? 10 : 1;

    const twists = [];
    for (let i = 0; i < batchSize; i++) {
      const twist = weightedRandom(data);
      twists.push(twist);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? twists[0] : twists.join('\n\n'),
      category: 'plot-twist',
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
          title: 'Random Plot Twist Generator',
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
    link.download = 'saved-plot-twists.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateControl = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultiple = prompt.isMultiple;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
        {isMultiple ? (
          <div className="mb-4 space-y-3">
            {prompt.text.split('\n\n').map((twist, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 dark:text-gray-200 leading-relaxed">
                {twist}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors">
            <Copy size={14} /> Copy {isMultiple ? 'All' : ''}
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
      <SEO pageKey="randomPlotTwistGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Plot Twist Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random plot twists instantly with our free plot twist generator. Create shocking revelations, surprise endings, and mind-bending turns perfect for stories, novels, screenplays, and creative writing projects.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Crown size={18} /> Short stories
          </Link>
          <Link to="/random-conflict-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <BookOpen size={18} /> Conflicts
          </Link>
          <Link to="/random-story-starter-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Sparkles size={18} /> Story Starters
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent">
              <option value="single">Single Plot Twist</option>
              <option value="multiple">Generate 5 Plot Twists</option>
              <option value="batch">Generate 10 Plot Twists</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Plot Twist
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Plot Twists</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent plot twists. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-2">{prompt.text}</p>
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Plot Twists</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Random Plot Twist Generator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our random plot twist generator creates shocking revelations, surprise endings, and mind-bending narrative turns that subvert expectations and keep readers engaged. Generate random plot twists for novels, short stories, screenplays, and creative writing projects across all genres.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A great plot twist recontextualizes everything that came before, forcing readers to reconsider assumptions and creating memorable storytelling moments. This free plot twist generator produces twists involving identity revelations, betrayals, reality subversions, time paradoxes, and more.
              </p>
              <div className="bg-violet-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-violet-900 mb-2">Random Plot Twist Generator Features:</h3>
                <ul className="text-violet-800 text-sm space-y-1">
                  <li>• Over 80 unique plot twist scenarios across all genres</li>
                  <li>• Shocking revelations that recontextualize entire narratives</li>
                  <li>• Batch generation: Create 1, 5, or 10 random plot twists at once</li>
                  <li>• Perfect for writers, screenwriters, novelists, and storytellers</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Example Random Plot Twists:</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><span className="text-violet-600 font-bold">•</span> <span>"The trusted mentor who has been guiding the protagonist is actually the main antagonist."</span></li>
                <li className="flex gap-2"><span className="text-violet-600 font-bold">•</span> <span>"The protagonist discovers they are an unreliable narrator suffering from amnesia."</span></li>
                <li className="flex gap-2"><span className="text-violet-600 font-bold">•</span> <span>"The villain they defeated was actually trying to prevent a much greater catastrophe."</span></li>
                <li className="flex gap-2"><span className="text-violet-600 font-bold">•</span> <span>"The entire story has been taking place in a virtual reality simulation."</span></li>
                <li className="flex gap-2"><span className="text-violet-600 font-bold">•</span> <span>"The protagonist\'s memories are fabricated, implanted by someone else."</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-conflict-generator" className="text-violet-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Conflict Generator
              </Link>
              <Link to="/writing-prompts" className="text-violet-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Writing Prompts
              </Link>
              <Link to="/random-story-starter-generator" className="text-violet-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Story Starter Generator
              </Link>
              <Link to="/short-story-prompts-generator" className="text-violet-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Short Story Prompts
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What makes a good plot twist?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A good plot twist is both surprising and inevitable-it shocks readers while making perfect sense in retrospect. The best twists recontextualize earlier events, forcing readers to reconsider what they thought they knew. Our random plot twist generator creates twists with these qualities.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use generated plot twists in my stories?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! All random plot twists generated by RandomPrompts.org are free to use in your novels, short stories, screenplays, and creative writing projects. Adapt them to fit your specific narrative, characters, and genre.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do I incorporate a plot twist effectively?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Effective plot twists require careful foreshadowing-plant subtle clues throughout your story that readers will only recognize in hindsight. The twist should feel earned, not arbitrary. Use our generated twists as frameworks, then build your narrative to support and justify the revelation.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Do plot twists work in all genres?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! Plot twists enhance stories across all genres including mystery, thriller, fantasy, science fiction, romance, horror, and literary fiction. The type of twist should match your genre conventions-mysteries might reveal whodunit, while sci-fi might subvert reality itself.
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

export default RandomPlotTwistGeneratorPage;
