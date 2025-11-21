import { useState, useCallback, useEffect } from 'react';
import { Lock, Unlock, Copy, ArrowLeft, RefreshCw, Check } from 'lucide-react';

/**
 * Interactive Prompt Generator Component
 *
 * Features:
 * - Random prompt generation from provided dataset
 * - Lock functionality to freeze current prompt
 * - Copy to clipboard with visual feedback
 * - History navigation to revisit previous prompts
 * - Responsive design with smooth animations
 */
export default function CategoryPromptGenerator({ initialPrompts, category }) {
  // State Management
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize with a random prompt on component mount
  useEffect(() => {
    if (initialPrompts && initialPrompts.length > 0 && !currentPrompt) {
      const randomPrompt = getRandomPrompt();
      setCurrentPrompt(randomPrompt);
    }
  }, [initialPrompts]);

  /**
   * Get a random prompt from the available prompts
   * Ensures we don't repeat the current prompt
   */
  const getRandomPrompt = useCallback(() => {
    if (!initialPrompts || initialPrompts.length === 0) return null;

    // If there's only one prompt, return it
    if (initialPrompts.length === 1) {
      return initialPrompts[0];
    }

    // Get a different prompt than the current one
    let newPrompt;
    do {
      const randomIndex = Math.floor(Math.random() * initialPrompts.length);
      newPrompt = initialPrompts[randomIndex];
    } while (newPrompt.id === currentPrompt?.id && initialPrompts.length > 1);

    return newPrompt;
  }, [initialPrompts, currentPrompt]);

  /**
   * Generate a new prompt
   * Respects the locked state and adds to history
   */
  const generateNewPrompt = useCallback(() => {
    // Don't generate if locked
    if (isLocked) {
      return;
    }

    setIsGenerating(true);

    // Add current prompt to history if it exists
    if (currentPrompt) {
      setHistory(prev => [currentPrompt, ...prev].slice(0, 20)); // Keep last 20 prompts
    }

    // Simulate generation delay for better UX
    setTimeout(() => {
      const newPrompt = getRandomPrompt();
      setCurrentPrompt(newPrompt);
      setIsGenerating(false);
    }, 300);
  }, [currentPrompt, isLocked, getRandomPrompt]);

  /**
   * Toggle lock state
   * Provides visual feedback that the prompt is frozen
   */
  const toggleLock = useCallback(() => {
    setIsLocked(prev => !prev);
  }, []);

  /**
   * Copy current prompt to clipboard
   * Shows success feedback for 2 seconds
   */
  const copyToClipboard = useCallback(async () => {
    if (!currentPrompt) return;

    try {
      await navigator.clipboard.writeText(currentPrompt.text);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentPrompt.text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  }, [currentPrompt]);

  /**
   * Navigate to previous prompt in history
   * Moves current prompt back to top of history
   */
  const goToPrevious = useCallback(() => {
    if (history.length === 0) return;

    const [previousPrompt, ...restHistory] = history;

    // Add current prompt back to history
    if (currentPrompt) {
      setHistory([currentPrompt, ...restHistory]);
    } else {
      setHistory(restHistory);
    }

    setCurrentPrompt(previousPrompt);
  }, [history, currentPrompt]);

  // Loading state
  if (!currentPrompt) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Capitalize category for display
  const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Prompt Display Card */}
      <div className={`
        relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-6
        transition-all duration-300 transform
        ${isLocked ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}
        ${isGenerating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
      `}>
        {/* Lock Indicator Badge */}
        {isLocked && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Locked</span>
          </div>
        )}

        {/* Prompt Text Display */}
        <div className="mb-6">
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
              {capitalizedCategory}
            </span>
            {currentPrompt.tags && currentPrompt.tags.length > 0 && (
              <>
                {currentPrompt.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </>
            )}
          </div>

          <p className="text-lg md:text-xl leading-relaxed text-gray-800">
            {currentPrompt.text}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap gap-3">
          {/* Lock/Unlock Button */}
          <button
            onClick={toggleLock}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${isLocked
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
            title={isLocked ? 'Unlock prompt' : 'Lock prompt'}
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Unlock</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                <span>Lock</span>
              </>
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${copied
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
            `}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={history.length === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${history.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
            title="Go to previous prompt"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        </div>
      </div>

      {/* Generate New Prompt Button - Primary CTA */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={generateNewPrompt}
          disabled={isGenerating}
          className={`
            w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg
            transition-all duration-300 transform
            ${isLocked
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isGenerating
              ? 'bg-blue-400 text-white scale-95'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
            }
          `}
          title={isLocked ? 'Unlock to generate new prompt' : 'Generate a new prompt'}
        >
          <span className="flex items-center justify-center gap-3">
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate New Prompt'}</span>
          </span>
        </button>

        {/* Lock Warning Message */}
        {isLocked && (
          <p className="text-sm text-yellow-600 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Prompt is locked. Click "Unlock" to generate a new one.</span>
          </p>
        )}

        {/* History Counter */}
        {history.length > 0 && (
          <p className="text-sm text-gray-500">
            {history.length} prompt{history.length !== 1 ? 's' : ''} in history
          </p>
        )}
      </div>

      {/* Optional: Display Tags Legend */}
      {currentPrompt.tags && currentPrompt.tags.length > 3 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">All tags:</p>
          <div className="flex flex-wrap gap-2">
            {currentPrompt.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
