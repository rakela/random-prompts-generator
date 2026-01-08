import React, { useState, FormEvent, useEffect, useRef } from 'react';
import type { ToolConfig, RunToolResponse } from '../types/workflow';
import { Copy, Loader2, CheckCircle, AlertCircle, CreditCard, Zap, Lock } from 'lucide-react';
import { getSupabaseBrowserClient } from '../lib/supabaseBrowser';

interface ToolFormProps {
  tool: ToolConfig;
}

export default function ToolForm({ tool }: ToolFormProps) {
  // Auth and credits state
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [credits, setCredits] = useState<number>(0);
  const [isPro, setIsPro] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    // Initialize with default values
    const defaults: Record<string, string> = {};
    tool.inputs.forEach(input => {
      if (input.default) {
        defaults[input.id] = input.default;
      }
    });
    return defaults;
  });

  const [loading, setLoading] = useState(false);
  const [fetchingTranscript, setFetchingTranscript] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Ref for first input to autofocus
  const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  // Autofocus first input on mount
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Check auth and credits on mount
  useEffect(() => {
    const checkAuthAndCredits = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        setAccessToken(session.access_token);

        try {
          const response = await fetch('/api/check-credits', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setCredits(data.credits || 0);
            setIsPro(data.isPro || false);
          }
        } catch (err) {
          console.error('Failed to fetch credits:', err);
        }
      }

      setLoadingAuth(false);

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setAccessToken(session?.access_token ?? '');
        if (!session?.user) {
          setCredits(0);
          setIsPro(false);
        }
      });

      return () => subscription.unsubscribe();
    };

    checkAuthAndCredits();
  }, []);

  const handleInputChange = (inputId: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  // Check if this is a YouTube tool
  const isYouTubeTool = tool.inputs.some(input => input.id === 'youtube_url');

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      }
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }
      return null;
    } catch {
      return null;
    }
  };

  // Fetch YouTube transcript via server-side endpoint (bypasses CORS completely)
  const fetchYouTubeTranscript = async (videoUrl: string): Promise<string> => {
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      throw new Error('Invalid YouTube URL. Please enter a valid YouTube video URL.');
    }

    console.log('[ToolForm] Fetching transcript server-side for:', videoId);

    try {
      // Call our server-side transcript fetching endpoint
      const response = await fetch('/api/fetch-youtube-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch transcript');
      }

      console.log('[ToolForm] ✓ Transcript fetched:', data.length, 'characters');
      console.log('[ToolForm] Language:', data.trackLanguage);

      return data.transcript;

    } catch (error) {
      console.error('[ToolForm] Transcript fetch error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    if (!isPro && credits <= 0) {
      setError('You have run out of credits. Please upgrade to Pro or purchase more credits.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call the API directly - let server handle transcript fetching
      const response = await fetch('/api/run-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          tool_id: tool.tool_id,
          inputs: inputs
        })
      });

      const data: RunToolResponse = await response.json();

      if (data.success && data.output) {
        setResult(data.output);

        if (!isPro) {
          setCredits(prev => Math.max(0, prev - 1));
        }
      } else {
        setError(data.error || 'Failed to generate content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setFetchingTranscript(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderFormattedResult = (content: string) => {
    // Check if this is a multi-section output (Content Repurposing Package)
    if (content.includes('## 📝 BLOG POST') || content.includes('## 💼 LINKEDIN POST')) {
      // Split into sections
      const sections = {
        blogPost: '',
        linkedIn: '',
        newsletter: ''
      };

      // Extract blog post section
      const blogMatch = content.match(/## 📝 BLOG POST([\s\S]*?)(?=## 💼 LINKEDIN POST|---\s*## 💼|$)/);
      if (blogMatch) {
        sections.blogPost = blogMatch[1].trim();
      }

      // Extract LinkedIn section
      const linkedInMatch = content.match(/## 💼 LINKEDIN POST([\s\S]*?)(?=## 📧 NEWSLETTER|---\s*## 📧|$)/);
      if (linkedInMatch) {
        sections.linkedIn = linkedInMatch[1].trim();
      }

      // Extract newsletter section
      const newsletterMatch = content.match(/## 📧 NEWSLETTER DRAFT([\s\S]*?)$/);
      if (newsletterMatch) {
        sections.newsletter = newsletterMatch[1].trim();
      }

      return (
        <div className="space-y-10">
          {/* Blog Post Section */}
          {sections.blogPost && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-md">
                    📝
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Blog Post</h3>
                    <p className="text-blue-100 text-sm">SEO-optimized article ready to publish</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div
                  className="prose prose-lg max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: sections.blogPost }}
                />
                <div className="pt-6 mt-6 border-t-2 border-blue-200 text-center">
                  <p className="text-sm text-gray-600">
                    This content is generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold underline">randomprompts.org</a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LinkedIn Section */}
          {sections.linkedIn && (
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-400 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-cyan-600 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-md">
                    💼
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">LinkedIn Post</h3>
                    <p className="text-sky-100 text-sm">Professional social media content</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-sky-500 mb-6">
                  <div
                    className="prose prose-lg max-w-none whitespace-pre-wrap font-sans text-gray-800"
                    dangerouslySetInnerHTML={{ __html: sections.linkedIn }}
                  />
                </div>
                <div className="pt-6 mt-6 border-t-2 border-sky-200 text-center">
                  <p className="text-sm text-gray-600">
                    This content is generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 font-semibold underline">randomprompts.org</a>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter Section */}
          {sections.newsletter && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-md">
                    📧
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Newsletter Draft</h3>
                    <p className="text-purple-100 text-sm">Email-ready format for your subscribers</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div
                  className="prose prose-lg max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: sections.newsletter }}
                />
                <div className="pt-6 mt-6 border-t-2 border-purple-200 text-center">
                  <p className="text-sm text-gray-600">
                    This content is generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-semibold underline">randomprompts.org</a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default rendering for single-section content
    // Format plain text with proper line breaks and structure
    const formattedContent = content
      .split('\n')
      .map(line => {
        line = line.trim();
        if (!line) return '<br/>';

        // Check for headers (lines starting with # or all caps)
        if (line.startsWith('###')) {
          return `<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">${line.replace(/^###\s*/, '')}</h3>`;
        }
        if (line.startsWith('##')) {
          return `<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4">${line.replace(/^##\s*/, '')}</h2>`;
        }
        if (line.startsWith('#')) {
          return `<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${line.replace(/^#\s*/, '')}</h1>`;
        }

        // Check for list items
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return `<li class="ml-6 mb-2">${line.replace(/^[-*]\s*/, '')}</li>`;
        }
        if (line.match(/^\d+\.\s/)) {
          return `<li class="ml-6 mb-2">${line.replace(/^\d+\.\s*/, '')}</li>`;
        }

        // Check for bold text **text**
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');

        // Regular paragraph
        return `<p class="mb-4 text-gray-700 leading-relaxed">${line}</p>`;
      })
      .join('\n');

    return (
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-md">
              📄
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Generated Content</h3>
              <p className="text-gray-300 text-sm">Your content is ready to use</p>
            </div>
          </div>
        </div>
        <div className="p-8 bg-gray-50">
          <div
            className="prose prose-lg max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
          <div className="pt-6 mt-6 border-t-2 border-gray-300 text-center">
            <p className="text-sm text-gray-600">
              This content is generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold underline">randomprompts.org</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderInput = (input: typeof tool.inputs[0], index: number) => {
    const value = inputs[input.id] || '';
    const baseClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const isFirst = index === 0;

    switch (input.type) {
      case 'textarea':
        return (
          <textarea
            ref={isFirst ? firstInputRef as React.RefObject<HTMLTextAreaElement> : null}
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            rows={6}
            className={baseClasses}
          />
        );

      case 'select':
        return (
          <select
            ref={isFirst ? firstInputRef as React.RefObject<HTMLSelectElement> : null}
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            required={input.required}
            className={baseClasses}
          >
            <option value="">Select an option...</option>
            {input.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            ref={isFirst ? firstInputRef as React.RefObject<HTMLInputElement> : null}
            type="number"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            className={baseClasses}
          />
        );

      case 'url':
        return (
          <input
            ref={isFirst ? firstInputRef as React.RefObject<HTMLInputElement> : null}
            type="url"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            className={baseClasses}
          />
        );

      default:
        return (
          <input
            ref={isFirst ? firstInputRef as React.RefObject<HTMLInputElement> : null}
            type="text"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div>
      {/* Credit Display Banner */}
      {!loadingAuth && (
        <div className="mb-6">
          {!user ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-blue-900 font-medium">Sign in required</p>
                <p className="text-blue-700 text-sm">Sign in to generate content. Free users get 1 generation per day!</p>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal'))}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Sign In
              </button>
            </div>
          ) : isPro ? (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-purple-900 font-semibold">Pro Plan - Unlimited Generations</p>
                <p className="text-purple-700 text-sm">Generate as much content as you need!</p>
              </div>
            </div>
          ) : credits > 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-900 font-semibold">{credits} {credits === 1 ? 'Credit' : 'Credits'} Remaining</p>
                <p className="text-green-700 text-sm">Free users get 1 credit per day. Need more? Upgrade or buy credits!</p>
              </div>
              <a
                href="/pricing"
                className="text-green-700 hover:text-green-800 text-sm font-semibold whitespace-nowrap"
              >
                View Plans →
              </a>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-orange-900 font-semibold">Out of Credits</p>
                  <p className="text-orange-700 text-sm">You've used your free daily credit. Upgrade for unlimited generations or buy more credits!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="/upgrade"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                >
                  Upgrade to Pro - $9.99/mo
                </a>
                <a
                  href="/buy-credits"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center font-semibold"
                >
                  Buy Credits - From $5
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {tool.inputs.map((input, index) => (
          <div key={input.id}>
            <label
              htmlFor={input.id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {input.label}
              {input.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderInput(input, index)}
            {input.help_text && (
              <p className="mt-1 text-sm text-gray-500">{input.help_text}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading || fetchingTranscript}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-lg"
        >
          {fetchingTranscript ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Fetching Video Transcript...
            </>
          ) : loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Generating Content...
            </>
          ) : (
            'Generate Content'
          )}
        </button>
      </form>

      {/* Output Panel */}
      {(result || loading || error) && (
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Generated Content
            </h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </button>
            )}
          </div>

          <div className="min-h-[300px]">
            {loading && (
              <div className="flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-lg text-gray-700 font-medium">Generating your content...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take 30-90 seconds</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div>
                {renderFormattedResult(result)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
