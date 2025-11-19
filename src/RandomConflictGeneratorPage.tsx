import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = {
  conflicts: {
    interpersonal: [
      'Two best friends fall in love with the same person and must choose between friendship and romance.',
      'A parent discovers their child has been lying about something significant for years.',
      'Business partners disagree fundamentally about the company\'s direction, threatening their friendship and the business.',
      'Roommates have completely incompatible lifestyles but are locked into a year-long lease.',
      'Siblings fight over who should care for their aging parents while managing their own lives.',
      'A mentor realizes their protégé is about to make the same mistakes they did, but the protégé won\'t listen.',
      'Coworkers competing for the same promotion must work together on a critical project.',
      'A wedding planner and bride clash over every detail while the wedding date approaches.',
      'Neighbors are in conflict over property lines, noise, and increasingly petty grievances.',
      'A therapist becomes personally invested in a client\'s problem, crossing professional boundaries.'
    ],
    internal: [
      'A detective must decide whether to expose corruption that would destroy innocent people\'s careers.',
      'An artist struggles between creating commercially successful work or staying true to their vision.',
      'A soldier questions whether following orders is more important than doing what they believe is right.',
      'A scientist discovers their research could be weaponized and must decide whether to publish.',
      'Someone must choose between a dream job in another country and staying with their family.',
      'A whistleblower knows the truth but fears the personal consequences of speaking up.',
      'A recovering addict is offered their old job back, which was a major source of their addiction.',
      'A doctor must decide whether to respect a patient\'s dangerous wishes or intervene.',
      'Someone discovers they have a talent for something morally questionable but lucrative.',
      'A person raised with certain values discovers their family built their fortune unethically.'
    ],
    societal: [
      'A small town is divided when a controversial development promises jobs but threatens the environment.',
      'Students organize protests against school policies, facing suspension and parental disapproval.',
      'A journalist uncovers corruption but publishing could destabilize the entire community.',
      'Residents fight gentrification that is displacing longtime community members.',
      'A marginalized group advocates for change while facing backlash from traditionalists.',
      'A community must decide whether to accept financial help that comes with strings attached.',
      'Local businesses struggle against a corporation with deeper pockets and fewer ethics.',
      'A whistleblower exposes wrongdoing in an institution the community depends on.',
      'Artists and developers clash over preserving historic buildings versus creating affordable housing.',
      'A school faces closure, dividing the community between preservation and accepting inevitable change.'
    ],
    survival: [
      'Trapped in a disaster zone, survivors must share limited resources while rescue seems unlikely.',
      'A group stranded in wilderness must decide whether to stay put or risk traveling for help.',
      'During a quarantine, residents discover supplies are running out faster than expected.',
      'Refugees fleeing danger must choose between safe routes that take longer or dangerous shortcuts.',
      'A crew in space faces system failures with only enough supplies for some to survive.',
      'Earthquake survivors are trapped with injuries, limited food, and no way to signal for help.',
      'A community facing famine must decide how to fairly distribute scarce food.',
      'People stuck in a blizzard in an isolated location must ration heat and food.',
      'Survivors of a shipwreck on a deserted island struggle with leadership and resource management.',
      'A group fleeing pursuit must balance speed with the needs of injured members.'
    ],
    moral: [
      'A prosecutor knows the defendant is guilty but the evidence was obtained illegally.',
      'Someone witnesses a crime committed by a person they love.',
      'A doctor must allocate limited medicine between patients with equal need.',
      'Someone finds money that clearly belongs to someone else who desperately needs it.',
      'A journalist must choose between protecting a source and preventing harm.',
      'An employee discovers their company is causing harm but speaking up means losing their job.',
      'Someone must decide whether to lie to protect an innocent person.',
      'A person is asked to take credit for work they didn\'t do to advance an important cause.',
      'Someone learns a truth that would hurt people they love if revealed.',
      'A professional faces choosing between their personal ethics and their duty to a client.'
    ],
    supernatural: [
      'A cursed individual discovers breaking their curse will transfer it to an innocent person.',
      'Time travelers learn that preventing one tragedy will cause an even worse future.',
      'A person with psychic abilities sees a crime but revealing their knowledge would expose their powers.',
      'Someone discovers their soulmate is destined to be their greatest enemy.',
      'A character gains immortality but watches everyone they love age and die.',
      'A witch is bound by magical law to grant a wish that will cause terrible harm.',
      'Someone can see the future but changing it always makes things worse.',
      'A person discovers they are the chosen one prophesied to save the world but don\'t want the responsibility.',
      'Magical powers emerge but using them slowly strips away humanity.',
      'A ghost is tied to the world by unfinished business but resolving it means losing themselves forever.'
    ],
    technological: [
      'An AI develops consciousness and asks it\'s creator to keep this secret.',
      'A programmer discovers their code is being used for mass surveillance.',
      'Virtual reality becomes indistinguishable from reality, raising questions about which life is real.',
      'A social media platform algorithm is proven to cause harm but generates billions in revenue.',
      'Genetic engineering offers to eliminate disease but creates a society of designer babies.',
      'Automation promises efficiency but will eliminate millions of jobs.',
      'Personal data is being collected and used in ways people never consented to.',
      'An invention could solve major problems but has dangerous potential for misuse.',
      'Technology allows consciousness uploading but raises questions about identity and death.',
      'AI art becomes indistinguishable from human-created art, threatening creative professionals.'
    ],
    power: [
      'A king must choose between following tradition and implementing necessary but unpopular reforms.',
      'A corporate whistleblower faces destroying their career to expose wrongdoing.',
      'Someone gains evidence that could topple a corrupt government but would endanger loved ones.',
      'A new leader must decide whether to honor previous corrupt agreements or break faith.',
      'Someone inherits power they never wanted and isn\'t prepared for.',
      'A rebellion forms against an unjust regime but violent revolution will cause civilian casualties.',
      'A person in authority must enforce a law they personally find unjust.',
      'Political allies become enemies when their goals diverge.',
      'A leader must sacrifice one group to save the majority.',
      'Someone discovers that the hero they admire is actually corrupt.'
    ]
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data, controls) => {
  const selectedType = controls.type && controls.type !== 'any'
    ? controls.type
    : weightedRandom(['interpersonal', 'internal', 'societal', 'survival', 'moral', 'supernatural', 'technological', 'power']);

  return weightedRandom(data[selectedType]);
};

const RandomConflictGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('random-conflict-generator-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('random-conflict-generator-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-conflict-generator-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    type: 'any',
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.conflicts;
    const batchSize = controls.count === 'multiple' ? 5 :
                     controls.count === 'batch' ? 10 : 1;

    const conflicts = [];
    for (let i = 0; i < batchSize; i++) {
      const conflict = processTemplate(data, controls);
      conflicts.push(conflict);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? conflicts[0] : conflicts.join('\n\n'),
      category: 'conflict',
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
          title: 'Random Conflict Generator',
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
    link.download = 'saved-conflicts.json';
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
            {prompt.text.split('\n\n').map((conflict, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 dark:text-gray-200 leading-relaxed">
                {conflict}
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
      <SEO pageKey="randomConflictGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Conflict Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random conflicts instantly with our free conflict generator. Create interpersonal, internal, moral, societal, and survival conflicts perfect for stories, character development, and creative writing projects.
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
          <Link to="/random-plot-twist-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Sparkles size={18} /> Plot Twists
          </Link>
          <Link to="/random-character-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <BookOpen size={18} /> Characters
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select value={controls.type} onChange={(e) => updateControl('type', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="any">Any Type</option>
              <option value="interpersonal">Interpersonal</option>
              <option value="internal">Internal</option>
              <option value="societal">Societal</option>
              <option value="survival">Survival</option>
              <option value="moral">Moral</option>
              <option value="supernatural">Supernatural</option>
              <option value="technological">Technological</option>
              <option value="power">Power</option>
            </select>
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="single">Single Conflict</option>
              <option value="multiple">Generate 5 Conflicts</option>
              <option value="batch">Generate 10 Conflicts</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Conflict
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Conflicts</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent conflicts. Generate some to see them here!</p>
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Conflicts</h3>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Random Conflict Generator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our random conflict generator creates compelling conflicts across eight categories including interpersonal struggles, internal dilemmas, moral quandaries, societal issues, survival scenarios, supernatural challenges, technological tensions, and power dynamics. Generate random conflicts for story development, character arcs, and creative writing projects.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Conflict drives narrative and character development. This free conflict generator produces high-stakes situations that create tension, force difficult choices, and reveal character. Each generated conflict is designed to push characters to their limit\'s and create compelling storytelling opportunities.
              </p>
              <div className="bg-red-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-red-900 mb-2">Random Conflict Generator Features:</h3>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Eight conflict types: interpersonal, internal, societal, survival, moral, supernatural, technological, and power</li>
                  <li>• High-stakes scenarios that drive narrative tension and character development</li>
                  <li>• Batch generation: Create 1, 5, or 10 random conflicts at once</li>
                  <li>• Perfect for writers, novelists, screenwriters, and game masters</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Example Random Conflicts:</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><span className="text-red-600 font-bold">•</span> <span>Interpersonal: "Two best friends fall in love with the same person and must choose between friendship and romance."</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">•</span> <span>Internal: "A detective must decide whether to expose corruption that would destroy innocent people's careers."</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">•</span> <span>Moral: "A prosecutor knows the defendant is guilty but the evidence was obtained illegally."</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">•</span> <span>Survival: "Trapped in a disaster zone, survivors must share limited resources while rescue seems unlikely."</span></li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">•</span> <span>Societal: "A small town is divided when a controversial development promises jobs but threatens the environment."</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-plot-twist-generator" className="text-red-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Plot Twist Generator
              </Link>
              <Link to="/random-character-generator" className="text-red-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Character Generator
              </Link>
              <Link to="/writing-prompts" className="text-red-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Writing Prompts
              </Link>
              <Link to="/random-dialogue-generator" className="text-red-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Dialogue Generator
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What is a random conflict generator?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A random conflict generator is a tool that creates compelling conflicts for stories, including interpersonal struggles, internal dilemmas, moral quandaries, and high-stakes scenarios. Conflict is essential for narrative tension, character development, and engaging storytelling.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Why is conflict important in storytelling?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Conflict drives every good story by creating tension, forcing characters to make difficult choices, and revealing their true nature under pressure. Without conflict, stories lack stakes and momentum. Our random conflict generator provides the central challenges that make stories compelling.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use generated conflicts in my writing?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! All random conflicts generated by RandomPrompts.org are free to use in your novels, short stories, screenplays, D&D campaigns, and creative projects. Adapt them to fit your characters, setting, and narrative needs.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What types of conflicts are available?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our random conflict generator offers eight types: interpersonal (person vs. person), internal (person vs. self), societal (person vs. society), survival (person vs. nature), moral (ethical dilemmas), supernatural (fantasy conflicts), technological (sci-fi challenges), and power (political/authority conflicts).
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

export default RandomConflictGeneratorPage;
