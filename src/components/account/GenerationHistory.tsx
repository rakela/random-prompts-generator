import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { Search, Filter, Copy, Eye, Download, Calendar, X, CheckCircle } from 'lucide-react';
import { getSupabaseBrowserClient } from '../../lib/supabaseBrowser';
import { getToolById } from '../../config/tools';

interface GenerationHistoryProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function GenerationHistory({ supabaseUrl, supabaseAnonKey }: GenerationHistoryProps) {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generations, setGenerations] = useState<any[]>([]);
  const [filteredGenerations, setFilteredGenerations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedGeneration, setSelectedGeneration] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toolFilters = [
    { id: 'all', label: 'All Tools' },
    { id: 'youtube-blog-post-generator', label: 'Blog Posts' },
    { id: 'youtube-linkedin-post-generator', label: 'LinkedIn Posts' },
    { id: 'youtube-to-blog-and-linkedin', label: 'Repurposing' },
    { id: 'youtube-content-brief', label: 'Content Briefs' },
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    filterGenerations();
  }, [searchQuery, selectedTool, generations]);

  const checkAuth = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      window.location.href = '/?login=required';
      return;
    }

    setUser(session.user);

    try {
      const response = await fetch('/api/check-credits', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits || 0);
        setIsPro(data.isPro || false);
      }

      await fetchGenerations(session.access_token);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  const fetchGenerations = async (accessToken: string) => {
    try {
      const response = await fetch('/api/account/recent-activity?limit=100', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (response.ok) {
        const data = await response.json();
        setGenerations(data.generations || []);
        setFilteredGenerations(data.generations || []);
      }
    } catch (error) {
      console.error('Error fetching generations:', error);
    }
  };

  const filterGenerations = () => {
    let filtered = generations;

    if (selectedTool !== 'all') {
      filtered = filtered.filter(gen => gen.tool_id === selectedTool);
    }

    if (searchQuery) {
      filtered = filtered.filter(gen =>
        gen.output?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gen.tool_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGenerations(filtered);
  };

  const handleCopy = async (content: string, id: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    await navigator.clipboard.writeText(textContent);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (generation: any) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generation.output;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${generation.tool_id}-${new Date(generation.created_at).getTime()}.txt`;
    element.click();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getToolIcon = (toolId: string) => {
    if (toolId.includes('blog')) return '📝';
    if (toolId.includes('linkedin')) return '💼';
    if (toolId.includes('newsletter')) return '📧';
    if (toolId.includes('content-brief')) return '📋';
    return '✨';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AccountLayout activePage="history" user={user} credits={credits} isPro={isPro}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generation History</h1>
          <p className="text-gray-600">
            View and manage all your past content generations.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search generations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tool Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedTool}
                  onChange={(e) => setSelectedTool(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {toolFilters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredGenerations.length} of {generations.length} generations
            </span>
            {(searchQuery || selectedTool !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTool('all');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Generations List */}
        {filteredGenerations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No generations found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedTool !== 'all'
                ? 'Try adjusting your filters'
                : 'Start creating content to see your history here'}
            </p>
            <a
              href="/tools"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Content
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGenerations.map((generation) => (
              <div key={generation.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{getToolIcon(generation.tool_id)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {generation.tool_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(generation.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {generation.output?.replace(/<[^>]*>/g, '').substring(0, 300)}...
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(generation.output, generation.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        {copiedId === generation.id ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedGeneration(generation)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>

                      <button
                        onClick={() => handleDownload(generation)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        {selectedGeneration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedGeneration(null)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">{selectedGeneration.tool_name}</h2>
                <button
                  onClick={() => setSelectedGeneration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedGeneration.output }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
