import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = {
  paragraphs: {
    descriptive: [
      'The ancient forest stretched endlessly before them, it's canopy so thick that only scattered rays of golden sunlight pierced through to the moss-covered ground below. Every breath carried the scent of pine and earth, while the distant call of unknown birds echoed through the towering trees.',
      'Waves crashed against the rocky shore with relentless fury, sending spray high into the air where it caught the afternoon light. The sea stretched to the horizon, a vast expanse of blue-green water that seemed to hold secrets in it's depths.',
      'The abandoned mansion stood atop the hill, it's weathered facade a testament to decades of neglect. Ivy crawled up the crumbling walls, and broken windows stared out like empty eyes over the overgrown gardens below.',
      'In the heart of the city, neon lights flickered to life as evening descended. The streets filled with people, their faces illuminated by screens and storefronts, each lost in their own world yet moving in synchronized chaos.',
      'The desert stretched out in all directions, an endless sea of sand beneath a burning sky. Heat waves distorted the horizon, making distant dunes appear to shimmer and dance like mirages.',
      'Snow blanketed the mountain village, transforming it into a winter wonderland. Smoke curled from chimneys, and warm light spilled from frosted windows, promising shelter from the bitter cold outside.',
      'The underground library was a labyrinth of towering bookshelves, each one packed with leather-bound volumes. The air smelled of old paper and dust, and the only sound was the soft echo of footsteps on the stone floor.',
      'Autumn had painted the countryside in shades of gold and crimson. Leaves drifted lazily through the crisp air, settling on winding paths that meandered through the rolling hills.',
      'The space station orbited silently above the planet, it's metal hull gleaming in the starlight. Through it's viewports, Earth hung like a blue marble against the infinite black of space.',
      'The marketplace bustled with activity, vendors calling out their wares over the din of haggling customers. Colorful fabrics hung from stalls, spices filled the air with exotic scents, and the crowd moved like a living river through the narrow lanes.'
    ],
    narrative: [
      'She had always known this day would come. The letter sat on the table, unopened, it's presence filling the room with a tension that made breathing difficult. Whatever it contained would change everything.',
      'The old man sat on the park bench, watching children play as he did every afternoon. But today was different. Today, he carried a secret that would soon shake the foundations of everything these people believed.',
      'When the power went out across the entire city, most people assumed it was just a temporary glitch. But Sarah knew better. She had seen the warning signs, the strange patterns in the data. This was only the beginning.',
      'The package arrived on a Tuesday, addressed to someone who hadnt lived at this address for three years. Inside, Marcus found something that would lead him on a journey he never imagined.',
      'Rain poured down as Elena ran through the empty streets, her heart pounding in her chest. Behind her, footsteps echoed off the wet pavement. She didnt dare look back.',
      'The last train of the night pulled into the station right on schedule. Only three passengers got off, and one of them carried a briefcase that would change the course of history.',
      'He woke to find himself in a room he didnt recognize, with no memory of how he got there. On the nightstand, a note in his own handwriting read: "Trust no one, not even yourself."',
      'The discovery happened by accident, as the best ones often do. Dr. Chen was simply running a routine test when the impossible appeared on her screen, forcing her to question everything she thought she knew about reality.',
      'At precisely midnight, the phenomenon began. First in Tokyo, then spreading westward as the Earth turned, bringing with it questions that science could not answer.',
      'She found the diary hidden beneath the floorboards of her new house, it's pages filled with entries from someone who lived there fifty years ago. The last entry was dated the day before a tragedy that was never solved.'
    ],
    expository: [
      'Climate change represents one of the most significan't challenges facing humanity today. Rising global temperatures affect weather patterns, sea levels, and ecosystems worldwide, requiring immediate and coordinated action from governments, businesses, and individuals alike.',
      'The human brain contains approximately 86 billion neurons, each capable of forming thousands of connections with other neurons. This complex network enables everything from basic motor functions to abstract thought, making it the most sophisticated organ in the known universe.',
      'Artificial intelligence has evolved rapidly over the past decade, moving from simple pattern recognition to systems that can generate art, write code, and even engage in creative problem-solving. This advancement raises important questions about the future of work and human-machine interaction.',
      'The concept of democracy traces it's roots to ancient Greece, where citizens gathered to debate and vote on matters of state. While modern democratic systems have evolved significan'tly, they still embody the fundamental principle that government derives it's authority from the consent of the governed.',
      'Renewable energy sources, including solar, wind, and hydroelectric power, offer sustainable alternatives to fossil fuels. As technology improves and costs decrease, these clean energy solutions become increasingly viable for meeting global energy demands.',
      'The internet has fundamentally transformed how humans communicate, share information, and conduct business. What began as a military research project has evolved into a global network connecting billions of devices and people.',
      'Ocean ecosystems support an incredible diversity of life, from microscopic plankton to the largest animals ever to exist on Earth. These marine environments also play a crucial role in regulating the planets climate and providing food for billions of people.',
      'The human immune system functions as a complex defense network, identifying and neutralizing threats from viruses, bacteria, and other pathogens. Understanding how this system works has led to breakthroughs in medicine, including the development of vaccines.',
      'Urban planning shapes the development and organization of cities, influencing everything from traffic patterns to community health. Effective planning balances economic growth with environmental sustainability and quality of life for residents.',
      'The scientific method provides a systematic approach to investigating questions and testing hypotheses. Through observation, experimentation, and peer review, scientists build a body of knowledge that advances human understanding of the natural world.'
    ],
    persuasive: [
      'Schools should eliminate standardized testing in favor of more comprehensive assessment methods. These high-stakes exams fail to measure creativity, critical thinking, or real-world problem-solving skills, instead creating stress and encouraging teachers to "teach to the test" rather than fostering genuine learning.',
      'The four-day work week represents the future of employment. Studies consistently show that shorter work weeks increase productivity, improve employee well-being, and reduce burnout, all while maintaining or even improving business outcomes.',
      'Every citizen should learn at least one additional language beyond their native tongue. Multilingualism enhances cognitive abilities, fosters cultural understanding, and opens doors to personal and professional opportunities in an increasingly connected world.',
      'Cities must prioritize pedestrian and bicycle infrastructure over automobile traffic. By creating walkable communities with safe cycling lanes, we can reduce pollution, improve public health, and create more vibrant, connected neighborhoods.',
      'The voting age should be lowered to sixteen. Young people demonstrate the maturity and engagement necessary for voting, and allowing them to participate in democracy earlier would increase civic engagement and give voice to those most affected by long-term policy decisions.',
      'Universal basic income is not just idealistic but necessary in an age of increasing automation. As artificial intelligence and robotics displace traditional jobs, UBI provides a safety net while enabling people to pursue education, entrepreneurship, and creative endeavors.',
      'Social media platforms must be held accountable for the content they host. While free speech remains paramount, companies that profit from user engagement should bear responsibility for preventing the spread of misinformation and hate speech.',
      'Public libraries remain essential community resources in the digital age. Beyond books, they provide internet access, educational programs, and safe spaces for learning and gathering, serving as great equalizers in communities of all sizes.',
      'The traditional college degree is becoming obsolete for many careers. We should embrace alternative credentials, apprenticeships, and skill-based certifications that better prepare students for modern employment while reducing the burden of student debt.',
      'Mandatory community service should be required for high school graduation. Volunteer work teache's empathy, builds character, and connects young people with their communities in meaningful ways that benefit both the individual and society.'
    ],
    creative: [
      'Time moved differently in the space between heartbeats. In that infinitesimal moment, entire universes were born and died, stories unfolded and concluded, and possibilities stretched out like threads in an infinite tapestry.',
      'The color blue tasted like forgotten memories, sweet and melancholic. At least, that was how she always described it to people who thought her synesthesia was a gift rather than a curse.',
      'Every star in the night sky was a wish someone forgot to make, hanging there in the darkness, waiting patiently for the moment someone would finally notice and give them purpose.',
      'The library existed outside of time, accessible through doorways that appeared and disappeared without warning. Its shelves contained every book that had ever been written, and more importantly, every book that ever would be.',
      'Dreams, he discovered, were not created by the sleeping mind but collected from a vast reservoir of shared unconsciousness. Each night, people borrowed from this pool, returning their dreams upon waking, slightly altered by their personal experiences.',
      'She painted with shadows instead of light, her artwork visible only in darkness. Galleries struggled to display her work, but those who saw it in proper conditions claimed it revealed truths that daylight deliberately hid.',
      'The city grew itself, streets extending overnight like roots seeking water, buildings sprouting where they were needed most. The architects role had shifted from designer to gardener, pruning and guiding rather than creating.',
      'Music existed long before humans arrived to hear it. The songs of planets orbiting stars, of atoms bonding and breaking, of gravity itself – an eternal symphony playing to an empty audience until consciousness evolved to appreciate it.',
      'The last human thought would be preserved forever, encoded in the spin of particles scattered across the universe. In a way, humanity would never truly end, just transform into something more subtle.',
      'Mirrors didnt reflect reality but showed possibilities – parallel versions of the viewer, each one having made different choices, living different lives. Most people simply saw what they expected to see.'
    ],
    dialogue: [
      '"I can't believe you did this," she said, her voice barely above a whisper. He tried to meet her eyes but found himself looking at his shoes instead. "I can explain," he started, but they both knew some actions went beyond explanation.',
      '"The data doesnt lie," Marcus insisted, spreading the documents across the table. "Someone in this room is the leak, and I intend to find out who." The silence that followed was deafening.',
      '"You don't understand," she said, gripping the steering wheel tighter. "If we turn back now, everything weve worked for-" "I understand perfectly," he interrupted. "The question is, do you?"',
      '"Tell me again about the day we met," the old woman asked her husband of sixty years. He smiled, ready to tell the story one more time, the same way he had hundreds of times before, each telling a gift.',
      '"This is impossible," the scientist muttered, checking her calculations for the third time. Her assistant looked over her shoulder and gasped. "Its not impossible," he said slowly. "Its just highly improbable. And it's happening anyway."',
      '"I brought coffee," he said, holding up two cups. She looked up from her computer, exhaustion evident in her eyes. "What time is it?" "Time for you to take a break," he replied with a gentle smile.',
      '"You promised," the child said, lower lip trembling. "I know, sweetheart," her mother replied, kneeling down to eye level. "And Ill make it up to you, I swear. This time will be different."',
      '"The package," the stranger said, "contains something that belongs to you. Or rather, something you will need." Before she could respond, he was gone, leaving only the mysterious box on her doorstep.',
      '"Do you ever wonder," he asked, staring up at the stars, "if were looking at the same thing everyone else sees?" She considered this. "I think we all see something slightly different, and that's okay."',
      '"Last call," the bartender announced, wiping down the counter. The only remaining patron nodded slowly. "Funny how last calls always come too soon," he mused, "except when they don't come soon enough."'
    ]
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data, controls) => {
  const selectedType = controls.type && controls.type !== 'any'
    ? controls.type
    : weightedRandom(['descriptive', 'narrative', 'expository', 'persuasive', 'creative', 'dialogue']);

  return weightedRandom(data[selectedType]);
};

const RandomParagraphGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    type: 'any',
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.paragraphs;
    const batchSize = controls.count === 'multiple' ? 3 :
                     controls.count === 'batch' ? 5 : 1;

    const paragraphs = [];
    for (let i = 0; i < batchSize; i++) {
      const paragraph = processTemplate(data, controls);
      paragraphs.push(paragraph);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? paragraphs[0] : paragraphs.join('\n\n'),
      category: 'paragraph',
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
          title: 'Random Paragraph Generator',
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
    link.download = 'saved-paragraphs.json';
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
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultiple ? (
          <div className="mb-4 space-y-4">
            {prompt.text.split('\n\n').map((paragraph, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 leading-relaxed">
                {paragraph}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors">
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
      <SEO pageKey="randomParagraphGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Paragraph Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random paragraphs instantly with our free paragraph generator. Create descriptive, narrative, expository, persuasive, or creative paragraphs perfect for writing practice, content creation, and creative projects.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Crown size={18} /> Short stories
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select value={controls.type} onChange={(e) => updateControl('type', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="any">Any Type</option>
              <option value="descriptive">Descriptive</option>
              <option value="narrative">Narrative</option>
              <option value="expository">Expository</option>
              <option value="persuasive">Persuasive</option>
              <option value="creative">Creative</option>
              <option value="dialogue">Dialogue</option>
            </select>
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="single">Single Paragraph</option>
              <option value="multiple">Generate 3 Paragraphs</option>
              <option value="batch">Generate 5 Paragraphs</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Paragraph
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Paragraphs</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent paragraphs. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => copyToClipboard(prompt.text)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
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
                <h3 className="text-2xl font-bold text-gray-900">Saved Paragraphs</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Paragraph Generator</h2>
              <p className="text-gray-700 mb-4">
                Our random paragraph generator creates diverse, well-structured paragraphs across multiple writing styles including descriptive, narrative, expository, persuasive, creative, and dialogue-based content. Generate random paragraphs for writing practice, content inspiration, or creative brainstorming sessions.
              </p>
              <p className="text-gray-700 mb-4">
                This free paragraph generator produces high-quality random paragraphs suitable for various purposes: creative writing exercises, blog content ideas, story development, academic writing practice, and more. Each generated paragraph is unique and designed to inspire your next writing project.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Random Paragraph Generator Features:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Multiple paragraph types: descriptive, narrative, expository, persuasive, creative, and dialogue</li>
                  <li>• High-quality content suitable for writing practice and inspiration</li>
                  <li>• Batch generation: Create 1, 3, or 5 random paragraphs at once</li>
                  <li>• Perfect for writers, students, content creators, and creative projects</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example Random Paragraphs:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Descriptive: "The ancient forest stretched endlessly before them, it's canopy so thick that only scattered rays of golden sunlight pierced through..."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Narrative: "She had always known this day would come. The letter sat on the table, unopened, it's presence filling the room with tension..."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Expository: "Climate change represents one of the most significan't challenges facing humanity today..."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Persuasive: "Schools should eliminate standardized testing in favor of more comprehensive assessment methods..."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Creative: "Time moved differently in the space between heartbeats. In that infinitesimal moment, entire universes were born and died..."</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-sentence-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Sentence Generator
              </Link>
              <Link to="/writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Writing Prompts Generator
              </Link>
              <Link to="/random-story-starter-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Story Starter Generator
              </Link>
              <Link to="/random-dialogue-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Dialogue Generator
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a random paragraph generator?</h3>
                <p className="text-gray-700">
                  A random paragraph generator is a tool that creates well-structured paragraphs across different writing styles including descriptive, narrative, expository, persuasive, creative, and dialogue-based content. Its perfect for writing practice, inspiration, and creative projects.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use generated paragraphs in my writing projects?</h3>
                <p className="text-gray-700">
                  Yes! All random paragraphs generated by RandomPrompts.org are free to use for inspiration, practice, or as starting points for your creative writing, blog posts, stories, and other projects. Use them to overcome writers block or spark new ideas.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What paragraph types can I generate?</h3>
                <p className="text-gray-700">
                  Our random paragraph generator offers six different types: descriptive paragraphs for vivid imagery, narrative paragraphs for storytelling, expository paragraphs for informational content, persuasive paragraphs for arguments, creative paragraphs for imaginative writing, and dialogue paragraphs for conversations.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How can random paragraphs help with writing practice?</h3>
                <p className="text-gray-700">
                  Random paragraphs provide excellent writing prompts and examples of different writing styles. Use them to study paragraph structure, practice rewriting in different tones, analyze writing techniques, or as inspiration for your own creative work. They re ideal for students, teachers, and writers developing their skills.
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

export default RandomParagraphGeneratorPage;
