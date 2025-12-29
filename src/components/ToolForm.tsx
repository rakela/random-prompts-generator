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
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
              <div
                className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
