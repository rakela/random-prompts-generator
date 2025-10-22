import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, PenTool, Wand2, BookOpen, FileText, User, Github, History } from 'lucide-react';

interface HeaderProps {
  promptHistory: any[];
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ promptHistory, showHistory, setShowHistory }) => {
  const location = useLocation();

  const tabs = [
    { id: 'writing', label: 'Writing', icon: PenTool, path: '/writing-prompts' },
    { id: 'aiArt', label: 'AI Images', icon: Wand2, path: '/ai-images-prompt' },
    { id: 'blog', label: 'Blog Post', icon: BookOpen, path: '/ai-blog-post-generator' },
    { id: 'fantasy', label: 'Short Stories', icon: FileText, path: '/short-story-prompts-generator' },
    { id: 'names', label: 'Names', icon: User, path: '/random-name-generator' }
  ];

  const getTabColor = (tabId: string) => {
    const colors: Record<string, string> = {
      writing: 'blue',
      aiArt: 'purple',
      blog: 'green',
      fantasy: 'amber',
      names: 'pink'
    };
    return colors[tabId] || 'gray';
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="text-blue-600" size={24} />
              <span className="text-xl font-bold text-gray-900">Random Prompts</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Github size={16} />
                GitHub
              </a>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <History size={16} />
                History ({promptHistory.length})
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const color = getTabColor(tab.id);
              const isActive = location.pathname === tab.path;

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                    isActive
                      ? `text-${color}-600 border-b-2 border-${color}-600 bg-${color}-50`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
