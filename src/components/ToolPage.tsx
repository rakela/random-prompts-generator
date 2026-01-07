import React, { useState, FormEvent, useEffect, useRef } from 'react';
import type { ToolConfig, RunToolResponse } from '../types/workflow';
import { Copy, Loader2, CheckCircle, AlertCircle, ChevronDown, ChevronUp, CreditCard, Zap, Lock } from 'lucide-react';
import { getSupabaseBrowserClient } from '../lib/supabaseBrowser';

interface ToolPageProps {
  tool: ToolConfig;
}

export default function ToolPage({ tool }: ToolPageProps) {
  // Auth and credits state
  const [user, setUser] = useState<any>(null);
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
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
      // Use shared Supabase client to avoid multiple instances
      const supabase = getSupabaseBrowserClient();

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        // Fetch credits
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

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      // Dispatch event to open auth modal
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    // Check if user has credits (unless Pro)
    if (!isPro && credits <= 0) {
      setError('You have run out of credits. Please upgrade to Pro or purchase more credits.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/run-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tool_id: tool.tool_id,
          inputs: inputs
        })
      });

      const data: RunToolResponse = await response.json();

      if (data.success && data.output) {
        setResult(data.output);

        // Refresh credits after successful generation
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
    }
  };

  const handleCopy = async () => {
    if (result) {
      // Strip HTML tags for copying
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
        <div className="space-y-8">
          {/* Blog Post Section */}
          {sections.blogPost && (
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  📝
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Blog Post</h3>
              </div>
              <div
                className="prose prose-lg max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: sections.blogPost }}
              />
              <div className="pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">randomprompts.org</a>
                </p>
              </div>
            </div>
          )}

          {/* LinkedIn Section */}
          {sections.linkedIn && (
            <div className="bg-white border-2 border-blue-600 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl">
                  💼
                </div>
                <h3 className="text-2xl font-bold text-gray-900">LinkedIn Post</h3>
              </div>
              <div
                className="prose prose-lg max-w-none whitespace-pre-wrap font-sans text-gray-800 mb-6"
                dangerouslySetInnerHTML={{ __html: sections.linkedIn }}
              />
              <div className="pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">randomprompts.org</a>
                </p>
              </div>
            </div>
          )}

          {/* Newsletter Section */}
          {sections.newsletter && (
            <div className="bg-white border-2 border-purple-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                  📧
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Newsletter Draft</h3>
              </div>
              <div
                className="prose prose-lg max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: sections.newsletter }}
              />
              <div className="pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">randomprompts.org</a>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default rendering for single-section content
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <div
          className="prose prose-lg max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">randomprompts.org</a>
          </p>
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

      default: // text
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

  // FAQ data based on tool type
  const getFaqData = () => {
    if (tool.tool_id.includes('youtube')) {
      return [
        {
          question: "What YouTube videos can I use?",
          answer: "You can use any public YouTube video that has captions/subtitles enabled. The tool works best with videos from major channels (TED, Khan Academy, BBC, etc.) as they typically have high-quality captions."
        },
        {
          question: "How long does it take to generate content?",
          answer: "Content generation typically takes 30-90 seconds, depending on the video length and current API load. Longer videos may take a bit more time to process."
        },
        {
          question: "Can I edit the generated content?",
          answer: "Yes! The generated content is meant as a starting point. You can copy it and edit it in your preferred text editor or content management system."
        },
        {
          question: "Is the content SEO-optimized?",
          answer: "Yes, blog posts are generated with SEO best practices in mind, including proper heading structure, natural keyword usage, and readability optimization."
        },
        {
          question: "Can I use this for commercial purposes?",
          answer: "Yes, you can use the generated content for commercial purposes. However, always ensure you have the right to reference the original video content and add your own unique insights."
        }
      ];
    }
    return [
      {
        question: "How do I use this tool?",
        answer: "Fill in all required fields marked with an asterisk (*), then click 'Generate Content'. The tool will process your request and display the output."
      },
      {
        question: "Can I regenerate the content?",
        answer: "Yes! You can adjust the parameters and regenerate as many times as you need until you get the desired output."
      },
      {
        question: "How do I save the generated content?",
        answer: "Use the 'Copy' button to copy the content to your clipboard, then paste it into your preferred editor or document."
      }
    ];
  };

  const faqData = getFaqData();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header - Centered */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span>/</span>
            <a href="/tools" className="hover:text-blue-600">Tools</a>
            <span>/</span>
            <span className="text-gray-900">{tool.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {tool.seo_title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {tool.seo_description}
          </p>
        </div>

        {/* Main Content - Single Column, Centered */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          {/* Input Form */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Input Parameters
            </h2>

            {/* Credit Display Banner */}
            {!loadingAuth && (
              <div className="max-w-2xl mx-auto mb-6">
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

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
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
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Content'
                )}
              </button>
            </form>
          </div>

          {/* Output Panel */}
          {(result || loading || error) && (
            <div className="border-t border-gray-200 pt-8">
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

        {/* How to Use */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 How to use this tool
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Fill in all required fields (marked with *)</li>
            <li>• Click "Generate Content" to process your request</li>
            <li>• Copy the generated content using the copy button</li>
            <li>• You can regenerate with different parameters anytime</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
