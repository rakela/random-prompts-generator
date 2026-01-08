import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { Zap, TrendingUp, Clock, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { getSupabaseBrowserClient } from '../../lib/supabaseBrowser';

interface AccountDashboardProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function AccountDashboard({ supabaseUrl, supabaseAnonKey }: AccountDashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGenerations: 0,
    generationsToday: 0,
    generationsThisMonth: 0,
    nextResetDate: '',
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      window.location.href = '/?login=required';
      return;
    }

    setUser(session.user);

    // Fetch credits and profile
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

      // Fetch generation stats
      await fetchStats(session.access_token);
      await fetchRecentActivity(session.access_token);

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  const fetchStats = async (accessToken: string) => {
    try {
      const response = await fetch('/api/account/stats', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentActivity = async (accessToken: string) => {
    try {
      const response = await fetch('/api/account/recent-activity?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data.generations || []);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
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
    <AccountLayout activePage="dashboard" user={user} credits={credits} isPro={isPro}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Credits/Pro Status */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8" />
              {isPro && <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">PRO</span>}
            </div>
            <p className="text-sm opacity-90 mb-1">Credits Available</p>
            <p className="text-3xl font-bold">
              {isPro ? '∞' : credits}
            </p>
            {!isPro && credits === 0 && (
              <a href="/upgrade" className="mt-4 block text-center text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors">
                Get More Credits →
              </a>
            )}
          </div>

          {/* Total Generations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Generations</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalGenerations}
            </p>
          </div>

          {/* Today's Generations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Generations Today</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.generationsToday}
            </p>
          </div>

          {/* This Month */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">This Month</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.generationsThisMonth}
            </p>
          </div>
        </div>

        {/* Upgrade CTA for Free Users */}
        {!isPro && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 mb-8 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Upgrade to Pro</h2>
                </div>
                <p className="text-white/90 mb-4 max-w-xl">
                  Get unlimited generations, priority support, and access to all premium features for just $9.99/month.
                </p>
                <a
                  href="/upgrade"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Upgrade Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <a href="/account/history" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {recentActivity.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">No generations yet</p>
              <a
                href="/tools"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Create Your First Content
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((generation, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-3xl">{getToolIcon(generation.tool_id)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {generation.tool_name || generation.tool_id}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {generation.output?.substring(0, 100)}...
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(generation.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <a
            href="/tools"
            className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-600 transition-colors shadow-sm group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <Sparkles className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Create Content</h3>
            <p className="text-sm text-gray-600">
              Generate blog posts, LinkedIn updates, and more
            </p>
          </a>

          <a
            href="/account/history"
            className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-600 transition-colors shadow-sm group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <Clock className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">View History</h3>
            <p className="text-sm text-gray-600">
              Access your past generations and exports
            </p>
          </a>

          <a
            href="/account/settings"
            className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-600 transition-colors shadow-sm group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <TrendingUp className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600">
              Manage your profile and preferences
            </p>
          </a>
        </div>
      </div>
    </AccountLayout>
  );
}
