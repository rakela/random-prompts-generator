import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook to handle prompt sharing via URL parameters
 * Supports:
 * - ?prompt=<encoded-text> - Direct prompt text
 * - ?id=<timestamp> - Prompt ID for saved prompts
 */
export function usePromptFromUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sharedPrompt, setSharedPrompt] = useState<string | null>(null);

  useEffect(() => {
    // Check for prompt in URL
    const promptParam = searchParams.get('prompt');
    if (promptParam) {
      try {
        const decodedPrompt = decodeURIComponent(promptParam);
        setSharedPrompt(decodedPrompt);
      } catch (error) {
        console.error('Failed to decode prompt from URL:', error);
      }
    }
  }, [searchParams]);

  /**
   * Add a prompt to the current URL for sharing
   */
  const sharePromptViaUrl = (promptText: string) => {
    try {
      const encoded = encodeURIComponent(promptText);
      // Limit URL length to ~2000 characters for compatibility
      if (encoded.length > 1800) {
        console.warn('Prompt too long for URL sharing');
        return null;
      }

      const newParams = new URLSearchParams(searchParams);
      newParams.set('prompt', encoded);
      setSearchParams(newParams, { replace: true });

      return `${window.location.origin}${window.location.pathname}?${newParams.toString()}`;
    } catch (error) {
      console.error('Failed to create shareable URL:', error);
      return null;
    }
  };

  /**
   * Clear prompt from URL
   */
  const clearPromptFromUrl = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('prompt');
    newParams.delete('id');
    setSearchParams(newParams, { replace: true });
  };

  return {
    sharedPrompt,
    sharePromptViaUrl,
    clearPromptFromUrl,
  };
}

export default usePromptFromUrl;
