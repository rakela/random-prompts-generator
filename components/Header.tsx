'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, History, Menu, X, Moon, Sun } from 'lucide-react';
import Logo from '@/components/Logo';
import { useTheme } from '@/lib/utils/useTheme';

interface HeaderProps {
  promptHistory?: any[];
  showHistory?: boolean;
  onHistoryToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ promptHistory = [], showHistory = false, onHistoryToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo size={28} />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Random Prompts</span>
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                Prompts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/ghostface-ai-trend-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Ghostface AI Trend
                </Link>
                <Link href="/gemini-ai-snow-prompt-tutorial" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Gemini AI Snow Tutorial
                </Link>
                <Link href="/chatgpt-photo-editing-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  ChatGPT Photo Editing
                </Link>
                <Link href="/gemini-photo-editing-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Gemini Photo Editing
                </Link>
                <Link href="/october-writing-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  October Writing Prompts
                </Link>
                <Link href="/writing-prompts-for-students" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Writing Prompts for Students
                </Link>
                <div className="relative group/submenu">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    Persuasive Writing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                    <Link href="/persuasive-writing-topics" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Persuasive Writing Topics
                    </Link>
                    <Link href="/persuasive-essays-topics" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Persuasive Essays Topics
                    </Link>
                    <Link href="/persuasive-writing-titles" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                      Persuasive Writing Titles
                    </Link>
                  </div>
                </div>
                <Link href="/midjourney-ai-picture-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Midjourney AI Prompts
                </Link>
                <Link href="/nano-banana-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                  Nano Banana Prompts
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                Generators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {/* Writing Generators */}
                <div className="relative group/submenu">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    Writing Generators
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                    <Link href="/random-paragraph-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Paragraph
                    </Link>
                    <Link href="/random-sentence-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Sentence
                    </Link>
                    <Link href="/random-story-starter-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Story Starter
                    </Link>
                    <Link href="/random-dialogue-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Dialogue
                    </Link>
                    <Link href="/random-theme-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Theme
                    </Link>
                    <Link href="/random-conflict-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Conflict
                    </Link>
                    <Link href="/random-plot-twist-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Plot Twist
                    </Link>
                    <Link href="/random-character-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Character
                    </Link>
                    <Link href="/random-relationship-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                      Relationships
                    </Link>
                  </div>
                </div>
                {/* AI Art Generators */}
                <div className="relative group/submenu">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    AI Art Generators
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                    <Link href="/random-aesthetic-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Aesthetic
                    </Link>
                    <Link href="/random-art-style-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Style
                    </Link>
                    <Link href="/random-photography-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Photography
                    </Link>
                    <Link href="/random-sci-fi-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Sci-Fi
                    </Link>
                    <Link href="/random-fantasy-art-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Fantasy
                    </Link>
                    <Link href="/random-environment-design-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Environment
                    </Link>
                    <Link href="/random-anime-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                      Anime
                    </Link>
                  </div>
                </div>
                {/* Creative Idea Generators */}
                <div className="relative group/submenu">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center justify-between">
                    Creative Idea Generators
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                    <Link href="/random-hobby-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Hobby
                    </Link>
                    <Link href="/random-object-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Object
                    </Link>
                    <Link href="/random-superpower-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Superpower
                    </Link>
                    <Link href="/random-idea-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Idea
                    </Link>
                    <Link href="/random-name-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                      Fantasy Names
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Github size={16} />
              GitHub
            </a>
            {onHistoryToggle && (
              <button
                onClick={onHistoryToggle}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <History size={16} />
                History ({promptHistory.length})
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Prompts Section */}
              <div className="border-t border-gray-100 pt-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Prompts</div>
                <div className="flex flex-col space-y-2 pl-3">
                  <Link href="/ghostface-ai-trend-prompt-generator"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ghostface AI Trend
                  </Link>
                  <Link href="/gemini-ai-snow-prompt-tutorial"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gemini AI Snow Tutorial
                  </Link>
                  <Link href="/chatgpt-photo-editing-prompts"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ChatGPT Photo Editing
                  </Link>
                  <Link href="/gemini-photo-editing-prompts"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gemini Photo Editing
                  </Link>
                  <Link href="/october-writing-prompts"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    October Writing Prompts
                  </Link>
                  <Link href="/writing-prompts-for-students"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Writing Prompts for Students
                  </Link>

                  {/* Persuasive Writing Submenu */}
                  <div className="pl-3 border-l-2 border-gray-200 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Persuasive Writing</div>
                    <Link href="/persuasive-writing-topics"
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Writing Topics
                    </Link>
                    <Link href="/persuasive-essays-topics"
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Essays Topics
                    </Link>
                    <Link href="/persuasive-writing-titles"
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Writing Titles
                    </Link>
                  </div>

                  <Link href="/midjourney-ai-picture-generator"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Midjourney AI Prompts
                  </Link>
                  <Link href="/nano-banana-prompts"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nano Banana Prompts
                  </Link>
                </div>
              </div>

              {/* Generators Section */}
              <div className="border-t border-gray-100 pt-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Generators</div>
                <div className="flex flex-col space-y-2 pl-3">
                  {/* Writing Generators Submenu */}
                  <div className="pl-3 border-l-2 border-gray-200 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Writing Generators</div>
                    <Link href="/random-paragraph-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Paragraph
                    </Link>
                    <Link href="/random-sentence-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Sentence
                    </Link>
                    <Link href="/random-story-starter-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Story Starter
                    </Link>
                    <Link href="/random-dialogue-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Dialogue
                    </Link>
                    <Link href="/random-theme-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Theme
                    </Link>
                    <Link href="/random-conflict-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Conflict
                    </Link>
                    <Link href="/random-plot-twist-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Plot Twist
                    </Link>
                    <Link href="/random-character-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Character
                    </Link>
                    <Link href="/random-relationship-prompt-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Relationships
                    </Link>
                  </div>

                  {/* AI Art Generators Submenu */}
                  <div className="pl-3 border-l-2 border-gray-200 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Art Generators</div>
                    <Link href="/random-aesthetic-prompt-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Aesthetic
                    </Link>
                    <Link href="/random-art-style-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Style
                    </Link>
                    <Link href="/random-photography-prompt-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Photography
                    </Link>
                    <Link href="/random-sci-fi-prompt-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Sci-Fi
                    </Link>
                    <Link href="/random-fantasy-art-prompt-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Fantasy
                    </Link>
                    <Link href="/random-environment-design-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Environment
                    </Link>
                    <Link href="/random-anime-prompt-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Anime
                    </Link>
                  </div>

                  {/* Creative Idea Generators Submenu */}
                  <div className="pl-3 border-l-2 border-gray-200 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Creative Idea Generators</div>
                    <Link href="/random-hobby-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Hobby
                    </Link>
                    <Link href="/random-object-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Object
                    </Link>
                    <Link href="/random-superpower-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Superpower
                    </Link>
                    <Link href="/random-idea-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Idea
                    </Link>
                    <Link href="/random-name-generator" className="block text-gray-600 hover:text-blue-600 transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                      Fantasy Names
                    </Link>
                  </div>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 border-t border-gray-100 dark:border-gray-700 pt-3 text-left"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>

              <a
                href="https://github.com/rakela/random-prompts-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                <Github size={16} />
                GitHub
              </a>

              {onHistoryToggle && (
                <button
                  onClick={() => {
                    onHistoryToggle();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 text-left"
                >
                  <History size={16} />
                  History ({promptHistory.length})
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
