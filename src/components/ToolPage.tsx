import React, { useState, FormEvent, useEffect, useRef } from 'react';
import type { ToolConfig, RunToolResponse } from '../types/workflow';
import { Copy, Loader2, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ToolPageProps {
  tool: ToolConfig;
}

export default function ToolPage({ tool }: ToolPageProps) {
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

  const handleInputChange = (inputId: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
                  <div
                    className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: result }}
                  />
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
