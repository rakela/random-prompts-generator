import React, { useState, FormEvent, useEffect, useRef } from 'react';
import type { ToolConfig, RunToolResponse } from '../types/workflow';
import { Copy, Loader2, CheckCircle, AlertCircle, ChevronDown, ChevronUp, CreditCard, Zap, Lock, Upload } from 'lucide-react';
import { getSupabaseBrowserClient } from '../lib/supabaseBrowser';

interface ToolPageProps {
  tool: ToolConfig;
  freeGenerations?: number; // Daily free generation limit for this tool (default: 1)
  hideChrome?: boolean; // Hide header, how-to-use, and FAQ sections (for custom page layouts)
}

export default function ToolPage({ tool, freeGenerations = 1, hideChrome = false }: ToolPageProps) {
  // Auth and credits state
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
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
  const [copiedMidjourney, setCopiedMidjourney] = useState(false);
  const [copiedGemini, setCopiedGemini] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [proMode, setProMode] = useState(false);
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
        setAccessToken(session.access_token);

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
        setAccessToken(session?.access_token ?? null);
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

  const handleFileUpload = (inputId: string, file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Please upload an image under 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      handleInputChange(inputId, dataUrl);
    };
    reader.readAsDataURL(file);
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

        // Refresh credits after successful generation (each generation costs 1 credit)
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

  const getPlainResult = () => {
    if (!result) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = result;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleCopy = async () => {
    const textContent = getPlainResult();
    if (textContent) {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyMidjourney = async () => {
    const text = getPlainResult();
    if (text) {
      const mjPrompt = `/imagine prompt: ${text.trim()} --ar 16:9 --v 6`;
      await navigator.clipboard.writeText(mjPrompt);
      setCopiedMidjourney(true);
      setTimeout(() => setCopiedMidjourney(false), 2000);
    }
  };

  const handleCopyGemini = async () => {
    const text = getPlainResult();
    if (text) {
      const geminiPrompt = `Generate an image: ${text.trim()}`;
      await navigator.clipboard.writeText(geminiPrompt);
      setCopiedGemini(true);
      setTimeout(() => setCopiedGemini(false), 2000);
    }
  };

  const handleCopyTemplate = async () => {
    const template = `Task: Perform a deep-dive reverse engineering of this image's visual DNA. Analyze: 1. Genre, 2. Spatial Geometry, 3. Material Science/Textures, 4. Lighting Physics (Kelvin/Direction). Output a 1:1 replica prompt.`;
    await navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
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
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <div
          className="prose prose-lg max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            This content is generated by <a href="https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold underline">randomprompts.org</a>
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

      case 'file':
        return (
          <div>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => document.getElementById(`file-${input.id}`)?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(input.id, file);
              }}
            >
              {value ? (
                <div>
                  <img src={value} alt="Uploaded preview" className="max-h-48 mx-auto mb-3 rounded-lg" />
                  <p className="text-sm text-gray-600">Click or drag to replace</p>
                </div>
              ) : (
                <div>
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP supported (max 10MB)</p>
                </div>
              )}
            </div>
            <input
              id={`file-${input.id}`}
              type="file"
              accept={input.accept || 'image/*'}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(input.id, file);
              }}
            />
          </div>
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
    <div className={hideChrome ? '' : 'min-h-screen bg-gray-50 py-12'}>
      <div className={hideChrome ? '' : 'max-w-4xl mx-auto px-4'}>
        {/* Header - Centered (hidden when embedded in custom page) */}
        {!hideChrome && (
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
        )}

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
                      <p className="text-blue-700 text-sm">Sign in to generate content. Free users get {freeGenerations} {freeGenerations === 1 ? 'generation' : 'generations'} per day!</p>
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
                      <p className="text-green-700 text-sm">Free users get {freeGenerations} {freeGenerations === 1 ? 'credit' : 'credits'} per day. Need more? Upgrade or buy credits!</p>
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

            {/* Pro Mode Template (only for image-to-prompt) */}
            {tool.tool_id === 'image-to-prompt' && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">Pro Mode</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Advanced</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProMode(!proMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${proMode ? 'bg-purple-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${proMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Visual DNA Reverse Engineering Template</h3>
                  {proMode && (
                    <div className="mt-3">
                      <div className="bg-white border border-purple-200 rounded-lg p-4 font-mono text-sm text-gray-700 leading-relaxed">
                        Task: Perform a deep-dive reverse engineering of this image's visual DNA. Analyze: 1. Genre, 2. Spatial Geometry, 3. Material Science/Textures, 4. Lighting Physics (Kelvin/Direction). Output a 1:1 replica prompt.
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyTemplate}
                        className={`mt-3 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          copiedTemplate ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {copiedTemplate ? 'Template Copied!' : 'Copy Template'}
                      </button>
                    </div>
                  )}
                </div>
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
                  tool.tool_id === 'image-to-prompt' ? 'Generate Prompt' : 'Generate Content'
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
                  <div className="flex items-center gap-2 flex-wrap">
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
                          Copy
                        </>
                      )}
                    </button>
                    {tool.tool_id === 'image-to-prompt' && (
                      <>
                        <button
                          onClick={handleCopyMidjourney}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                            copiedMidjourney ? 'bg-green-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {copiedMidjourney ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            'Copy for Midjourney'
                          )}
                        </button>
                        <button
                          onClick={handleCopyGemini}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                            copiedGemini ? 'bg-green-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {copiedGemini ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            'Copy for Gemini'
                          )}
                        </button>
                      </>
                    )}
                  </div>
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

        {/* How to Use (hidden when embedded in custom page) */}
        {!hideChrome && (
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
        )}

        {/* FAQ Section (hidden when embedded in custom page) */}
        {!hideChrome && (
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
        )}
        {/* SEO Section for Image-to-Prompt */}
        {tool.tool_id === 'image-to-prompt' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 mt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Reverse Engineer an AI Image
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Image reverse engineering is the process of analyzing an AI-generated image to extract the original prompt, style parameters, and technical settings used to create it. Our <strong>image to text prompt generator</strong> automates this process using advanced vision AI.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What is an Image Reverse Engineering Template?</h3>
              <p>
                An <strong>image reverse engineering template</strong> is a structured framework for analyzing visual elements systematically. Instead of guessing, the template breaks the analysis into categories: genre identification, spatial geometry, material science, lighting physics, and color theory. This produces a prompt that can replicate the original image with high fidelity.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Upload your image</strong> — any AI-generated or reference image</li>
                <li><strong>AI analyzes visual DNA</strong> — genre, textures, lighting, composition</li>
                <li><strong>Get a detailed prompt</strong> — ready to use in Midjourney, Stable Diffusion, or Gemini</li>
                <li><strong>Copy for your platform</strong> — use the Midjourney or Gemini copy buttons for formatted output</li>
              </ol>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Use Cases</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Recreate a style you found on social media</li>
                <li>Learn prompt engineering by studying what works</li>
                <li>Build a library of proven prompt templates</li>
                <li>Analyze competitor AI art for prompt patterns</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
