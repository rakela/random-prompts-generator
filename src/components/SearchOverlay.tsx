import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchItem {
  title: string;
  path: string;
  description: string;
  type: 'page' | 'post';
}

const searchIndex: SearchItem[] = [
  // Tools & Generators
  { title: 'Random Writing Prompt Generator', path: '/writing-prompts', description: 'Creative writing prompts with conflicts and plot twists', type: 'page' },
  { title: 'AI Images Prompt Generator', path: '/ai-images-prompt', description: 'AI art prompts for MidJourney, DALL-E & Stable Diffusion', type: 'page' },
  { title: 'AI Blog Post Generator', path: '/ai-blog-post-generator', description: 'SEO-optimized blog post ideas and topics', type: 'page' },
  { title: 'Short Story Prompts Generator', path: '/short-story-prompts-generator', description: 'Flash fiction and short story prompts', type: 'page' },
  { title: 'Random Name Generator', path: '/random-name-generator', description: 'Fantasy and character names for stories and games', type: 'page' },
  { title: 'MidJourney AI Prompts Generator', path: '/midjourney-ai-picture-generator', description: 'Professional MidJourney prompts for AI art', type: 'page' },
  { title: 'Random Paragraph Generator', path: '/generators/paragraph', description: 'Random paragraphs for writing practice and exercises', type: 'page' },
  { title: 'Random Sentence Generator', path: '/generators/sentence', description: 'Random sentences for writing warmups and ESL practice', type: 'page' },
  { title: 'Random Fantasy Name Generator', path: '/generators/fantasy-name', description: 'Fantasy names for characters, places, and creatures', type: 'page' },
  { title: 'Random Superpower Generator', path: '/generators/superpower', description: 'Random superpowers with strengths, limits, and drawbacks', type: 'page' },
  { title: 'Random Idea Generator', path: '/generators/idea', description: 'Random ideas for projects, stories, and brainstorming', type: 'page' },
  { title: 'Random Object Generator', path: '/generators/object', description: 'Random objects to spark story ideas and drawing prompts', type: 'page' },
  { title: 'Random Hobby Generator', path: '/generators/hobby', description: 'Random hobbies for characters or real life inspiration', type: 'page' },
  { title: 'Story Starter Generator', path: '/writing-prompts-generator/story-starters', description: 'Opening lines and scenarios to kick off your story', type: 'page' },
  { title: 'Random Character Generator', path: '/writing-prompts-generator/character', description: 'Characters with traits, goals, and flaws', type: 'page' },
  { title: 'Random Conflict Generator', path: '/writing-prompts-generator/conflict', description: 'Story conflicts and problems for your characters', type: 'page' },
  { title: 'Random Plot Twist Generator', path: '/writing-prompts-generator/plot-twist', description: 'Plot twists that surprise readers and raise stakes', type: 'page' },
  { title: 'Random Theme Generator', path: '/writing-prompts-generator/theme', description: 'Story themes and big ideas to explore in writing', type: 'page' },
  { title: 'Random Villain Generator', path: '/writing-prompts-generator/villain', description: 'Villains with motives, flaws, and backstories', type: 'page' },
  { title: 'Random Hero Generator', path: '/writing-prompts-generator/hero', description: 'Heroes and protagonists with goals and inner conflicts', type: 'page' },
  { title: 'Random Emotion Prompt Generator', path: '/writing-prompts-generator/emotion', description: 'Emotion-based writing prompts for deep scenes', type: 'page' },
  { title: 'Random Dialogue Generator', path: '/writing-prompts-generator/random-dialogue', description: 'Dialogue lines and conversations for fiction writers', type: 'page' },
  { title: 'Random Setting Generator', path: '/writing-prompts-generator/setting', description: 'Settings with time, place, and atmosphere', type: 'page' },
  { title: 'Worldbuilding Prompts Generator', path: '/writing-prompts-generator/worldbuilding', description: 'Worldbuilding prompts for cultures, magic, and politics', type: 'page' },
  { title: 'Magic System Generator', path: '/writing-prompts-generator/magic-system', description: 'Magic system ideas with rules, limits, and costs', type: 'page' },
  { title: 'Random Relationship Prompt Generator', path: '/writing-prompts-generator/relationship', description: 'Relationship prompts for friendships, families, romance', type: 'page' },
  { title: 'Drawing Prompt Generator', path: '/art-prompts/drawing', description: 'Drawing prompts for sketching and illustration practice', type: 'page' },
  { title: 'Aesthetic Prompt Generator', path: '/art-prompts/aesthetic', description: 'Aesthetic prompts for AI art, Pinterest, photography', type: 'page' },
  { title: 'Art Style Generator', path: '/art-prompts/art-style', description: '100+ art styles for drawing and AI image generation', type: 'page' },
  { title: 'Photography Prompt Generator', path: '/art-prompts/photography', description: 'Photography prompts with subjects, locations, lighting', type: 'page' },
  { title: 'Character Design Generator', path: '/art-prompts/character-design', description: 'Character design prompts for concept art and AI', type: 'page' },
  { title: 'Fantasy Art Prompt Generator', path: '/art-prompts/fantasy-art', description: 'Fantasy art prompts with creatures, castles, magic', type: 'page' },
  { title: 'Anime Prompt Generator', path: '/art-prompts/anime', description: 'Anime prompts for characters, scenes, aesthetics', type: 'page' },
  { title: 'Portrait Prompt Generator', path: '/art-prompts/portrait', description: 'Portrait prompts with styles, angles, and moods', type: 'page' },
  { title: 'Environment Design Generator', path: '/art-prompts/environment', description: 'Environment design prompts for landscapes and worlds', type: 'page' },
  { title: 'Sci-Fi Prompt Generator', path: '/art-prompts/sci-fi-art', description: 'Sci-fi prompts for stories and AI art', type: 'page' },
  { title: 'Lighting Style Generator', path: '/art-prompts/lighting', description: 'Lighting styles from soft sunset to harsh neon', type: 'page' },
  { title: 'Nano Banana Prompts', path: '/nano-banana-prompts', description: 'Viral cat figurine and collectible AI prompts', type: 'page' },
  { title: 'Ghostface AI Prompt Generator', path: '/ghostface-ai-trend-prompt-generator', description: 'Horror-themed Ghostface AI art prompts', type: 'page' },
  { title: 'Gemini AI Snow Prompt Tutorial', path: '/gemini-ai-snow-prompt-tutorial', description: 'Professional winter portrait prompts for Gemini', type: 'page' },
  { title: 'ChatGPT Photo Editing Prompts', path: '/chatgpt-photo-editing-prompts', description: 'AI photo editor prompts and tips', type: 'page' },
  { title: 'Gemini Photo Editing Prompts', path: '/gemini-photo-editing-prompts', description: 'Google AI photo editor guide', type: 'page' },
  { title: 'Prompt Expander', path: '/tools/text-to-prompt', description: 'Transform short ideas into detailed AI prompts', type: 'page' },
  { title: 'Image to Prompt', path: '/tools/image-to-prompt', description: 'Reverse-engineer images to AI prompts', type: 'page' },
  { title: 'AI Video Generation', path: '/tools/video-ai-generation', description: 'Sora, Veo, and RunwayML prompt optimizer', type: 'page' },
  { title: 'Fanfic Prompt Generator', path: '/fanfic-prompt-generator', description: 'Fanfiction writing prompts by category', type: 'page' },
  { title: 'Morning Journal Prompts', path: '/morning-journal-prompts', description: '24 prompts to start your day with intention', type: 'page' },
  { title: 'October Writing Prompts', path: '/october-writing-prompts', description: 'Halloween and fall-themed story ideas', type: 'page' },
  { title: 'Christmas Writing Prompts', path: '/christmas-writing-prompts', description: 'Holiday and winter story ideas', type: 'page' },
  { title: 'Writing Prompts for Students', path: '/writing-prompts-for-students', description: 'Creative writing ideas for school K-12', type: 'page' },
  { title: 'Persuasive Essays Topics', path: '/persuasive-essays-topics', description: 'Argumentative essay ideas and debate topics', type: 'page' },
  { title: 'Persuasive Writing Topics', path: '/persuasive-writing-topics', description: 'Debate and opinion topics for essays', type: 'page' },
  { title: 'Persuasive Writing Titles', path: '/persuasive-writing-titles', description: 'Compelling essay titles and headlines', type: 'page' },
  { title: 'Movie Prompts Generator', path: '/movie-prompts-generator', description: 'Film and screenplay ideas', type: 'page' },
  { title: 'Book Prompt Generator', path: '/random-book-prompt-generator', description: 'Novel writing ideas and book prompts', type: 'page' },
  { title: 'Drawing Challenge Generator', path: '/art-prompts/drawing-challenge', description: 'Random drawing challenges to improve skills', type: 'page' },
  // Blog Posts
  { title: 'Best ChatGPT & Gemini Photo Editing Prompts', path: '/blog/best-chatgpt-gemini-photo-editing-prompts', description: 'Copy-and-paste prompts for professional photo editing', type: 'post' },
  { title: 'Trending ChatGPT Image Prompts', path: '/blog/trending-chatgpt-image-prompts', description: 'Viral 3D caricatures, memes, and AI art trends', type: 'post' },
  { title: 'How to Make Animation Stickman Videos', path: '/blog/how-to-make-animation-stickman-ai-guide', description: 'AI workflow for creating viral stickman animations', type: 'post' },
  { title: 'Free Gemini AI Snow Photo Editing Prompts', path: '/blog/gemini-ai-snow-photo-editing-prompts-free', description: 'Turn summer photos into winter scenes with AI', type: 'post' },
  { title: 'Gemini vs ChatGPT AI Comparison', path: '/blog/gemini-vs-chatgpt-ai-comparison', description: 'Which AI should you use?', type: 'post' },
  { title: 'Gemini AI Image Editing Prompts', path: '/blog/gemini-prompts-for-image-editing', description: 'Game-changing Gemini prompts for image editing', type: 'post' },
  { title: 'Funny Random Sentence Generator Prompts', path: '/blog/funny-random-sentence-generator-prompts', description: 'Break writer\'s block with hilarious prompts', type: 'post' },
  { title: 'ChatGPT Mental Health Museum Portrait', path: '/blog/asked-chat-to-make-an-interpretive-image', description: 'AI interprets mental health as a museum portrait', type: 'post' },
  { title: 'ChatGPT Knows Me Caricature Trend', path: '/blog/chatgpt-knows-me-caricature-trend', description: 'The viral AI caricature challenge', type: 'post' },
  { title: 'SEO Optimized Blog Post Generator for Gemini', path: '/blog/seo-optimized-blog-post-generator', description: 'Free SEO blog post prompt for Gemini AI', type: 'post' },
  { title: 'ChatGPT Caricature Prompt', path: '/blog/chatgpt-caricature-prompt', description: 'The exact prompt for the ChatGPT caricature trend', type: 'post' },
  { title: 'Viral AI Caricature Trend', path: '/blog/viral-chatgpt-caricature-trend', description: 'This viral AI caricature trend is everywhere', type: 'post' },
];

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const terms = q.toLowerCase().split(/\s+/);
    const filtered = searchIndex.filter(item => {
      const text = `${item.title} ${item.description}`.toLowerCase();
      return terms.every(term => text.includes(term));
    });
    setResults(filtered.slice(0, 10));
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    search(val);
  };

  const pageResults = results.filter(r => r.type === 'page');
  const postResults = results.filter(r => r.type === 'post');

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Search"
        title="Search (Ctrl+K)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999]"
          onClick={(e) => { if (e.target === overlayRef.current) setIsOpen(false); }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            style={{ animation: 'searchFadeIn 0.15s ease-out' }}
          />

          {/* Search panel */}
          <div
            className="relative max-w-2xl mx-auto mt-[10vh] bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{ animation: 'searchSlideDown 0.2s ease-out' }}
          >
            {/* Input */}
            <div className="flex items-center border-b border-gray-200 px-4">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search tools, generators, articles..."
                className="w-full px-3 py-4 text-lg outline-none bg-transparent"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200 flex-shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">No results for "<strong>{query}</strong>"</p>
                </div>
              )}

              {pageResults.length > 0 && (
                <div className="px-3 pt-3 pb-1">
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools & Pages</div>
                  {pageResults.map(item => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">{item.title}</div>
                        <div className="text-xs text-gray-500 truncate">{item.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {postResults.length > 0 && (
                <div className="px-3 pt-3 pb-1">
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Articles</div>
                  {postResults.map(item => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors group"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors truncate">{item.title}</div>
                        <div className="text-xs text-gray-500 truncate">{item.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {!query.trim() && (
                <div className="px-6 py-8 text-center text-gray-400">
                  <p className="text-sm">Type to search across all tools and articles</p>
                  <p className="text-xs mt-1">Use <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 text-gray-500">Ctrl+K</kbd> to open search anytime</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-gray-500 mr-1">Enter</kbd>
                  to select
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes searchFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes searchSlideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
