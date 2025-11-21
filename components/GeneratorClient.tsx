'use client';

import { useState, useCallback } from 'react';
import { Copy, RefreshCw, Save, Share2, Star } from 'lucide-react';
import { GeneratorMetadata } from '@/lib/generators/generatorConfig';
import { generatePrompt as generatePromptFn } from '@/lib/generators/promptEngine';
import { PromptCategory } from '@/lib/generators/promptData';
import useLocalStorage from '@/lib/utils/useLocalStorage';

interface Prompt {
  id: number;
  text: string;
  timestamp: string;
  isMultiple?: boolean;
}

interface GeneratorClientProps {
  generator: GeneratorMetadata;
  category: PromptCategory;
  buttonColor?: string;
}

export default function GeneratorClient({ generator, category, buttonColor = "bg-purple-600 hover:bg-purple-700" }: GeneratorClientProps) {
  const [generatedPrompt, setGeneratedPrompt] = useState<Prompt | null>(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage<Prompt[]>(`saved-${generator.id}`, []);
  const [favorites, setFavorites] = useLocalStorage<Prompt[]>(`favorites-${generator.id}`, []);

  const generatePrompt = useCallback(() => {
    const text = generatePromptFn(category, {});

    const prompt: Prompt = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString(),
    };

    setGeneratedPrompt(prompt);
  }, [category]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt: Prompt) => {
    setSavedPrompts(prev => [...prev, prompt]);
  };

  const toggleFavorite = (prompt: Prompt) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, prompt]);
    }
  };

  const sharePrompt = async (prompt: Prompt) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: generator.title,
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Generate Button */}
      <div className="text-center mb-8">
        <button
          onClick={generatePrompt}
          className={`${buttonColor} text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg`}
        >
          Generate {generator.h1}
        </button>
      </div>

      {/* Result */}
      {generatedPrompt && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-8">
          <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed mb-4">
            {generatedPrompt.text}
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => copyToClipboard(generatedPrompt.text)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm transition-colors"
            >
              <Copy size={14} />
              Copy
            </button>
            <button
              onClick={() => savePrompt(generatedPrompt)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-md text-sm transition-colors"
            >
              <Save size={14} />
              Save
            </button>
            <button
              onClick={() => toggleFavorite(generatedPrompt)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                favorites.some(fav => fav.id === generatedPrompt.id)
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
              }`}
            >
              <Star size={14} fill={favorites.some(fav => fav.id === generatedPrompt.id) ? 'currentColor' : 'none'} />
              Favorite
            </button>
            <button
              onClick={() => sharePrompt(generatedPrompt)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-md text-sm transition-colors"
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              onClick={generatePrompt}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-md text-sm transition-colors"
            >
              <RefreshCw size={14} />
              Regenerate
            </button>
          </div>
        </div>
      )}

      {/* Saved Prompts */}
      {savedPrompts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Saved Prompts</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {savedPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                <p className="text-sm text-gray-800 dark:text-gray-100">{prompt.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
