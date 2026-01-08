import React, { useState, useEffect } from 'react';
import {
  Users, DollarSign, Zap, TrendingUp, Search, Download,
  Mail, RefreshCw, UserPlus, UserMinus, Shield, Ban,
  Activity, Calendar, CreditCard, Eye, ArrowUpCircle, ArrowDownCircle
} from 'lucide-react';
import { getSupabaseBrowserClient } from '../../lib/supabaseBrowser';

interface AdminDashboardProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

interface Stats {
  totalUsers: number;
  proUsers: number;
  monthlyProUsers: number;
  yearlyProUsers: number;
  mrr: number;
  totalRevenue: number;
  totalGenerations: number;
  generationsToday: number;
  generationsThisMonth: number;
  avgCreditsPerUser: number;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  is_pro: boolean;
  pro_plan_type: string | null;
  monthly_credits: number;
  purchased_credits: number;
  total_generations: number;
}

interface ActivityItem {
  id: string;
  type: 'signup' | 'subscription' | 'generation' | 'error';
  user_email: string;
  description: string;
  created_at: string;
}

export default function AdminDashboard({ supabaseUrl, supabaseAnonKey }: AdminDashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    proUsers: 0,
    monthlyProUsers: 0,
    yearlyProUsers: 0,
    mrr: 0,
    totalRevenue: 0,
    totalGenerations: 0,
    generationsToday: 0,
    generationsThisMonth: 0,
    avgCreditsPerUser: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'monthly' | 'yearly'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const ADMIN_EMAIL = 'rakelaroshi@gmail.com';

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchAllData();
      // Set up auto-refresh every 10 seconds
      const interval = setInterval(fetchAllData, 10000);
      return () => clearInterval(interval);
    }
  }, [authorized]);

  const checkAuth = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      window.location.href = '/?login=required';
      return;
    }

    // Check if user is admin
    if (session.user.email !== ADMIN_EMAIL) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    setUser(session.user);
    setAuthorized(true);
    setLoading(false);
  };

  const fetchAllData = async () => {
    setRefreshing(true);
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.access_token) return;

    try {
      // Fetch stats
      const statsResponse = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      if (statsResponse.ok) {
        const data = await statsResponse.json();
        setStats(data);
      }

      // Fetch users
      const usersResponse = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      if (usersResponse.ok) {
        const data = await usersResponse.json();
        setUsers(data.users || []);
      }

      // Fetch activity feed
      const activityResponse = await fetch('/api/admin/activity', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      if (activityResponse.ok) {
        const data = await activityResponse.json();
        setActivityFeed(data.activities || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleExportUsers = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.access_token) return;

    try {
      const response = await fetch('/api/admin/export-users', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Error exporting users:', error);
    }
  };

  const handleUserAction = async (userId: string, action: string, value?: any) => {
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.access_token) return;

    try {
      const response = await fetch('/api/admin/user-action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, action, value })
      });

      if (response.ok) {
        // Refresh data
        await fetchAllData();
      }
    } catch (error) {
      console.error('Error performing user action:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return formatDate(dateString);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan =
      filterPlan === 'all' ? true :
      filterPlan === 'free' ? !u.is_pro :
      filterPlan === 'monthly' ? u.is_pro && u.pro_plan_type === 'monthly' :
      filterPlan === 'yearly' ? u.is_pro && u.pro_plan_type === 'yearly' : true;

    return matchesSearch && matchesPlan;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-md text-center">
          <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Overview and management of all platform data</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleExportUsers}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Users
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats.proUsers} Pro users ({Math.round((stats.proUsers / stats.totalUsers) * 100)}%)
            </p>
          </div>

          {/* MRR */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${stats.mrr.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              Monthly: {stats.monthlyProUsers} • Yearly: {stats.yearlyProUsers}
            </p>
          </div>

          {/* Total Generations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Generations</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalGenerations.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              Today: {stats.generationsToday} • This month: {stats.generationsThisMonth}
            </p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              Avg: ${(stats.totalRevenue / stats.totalUsers).toFixed(2)}/user
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users Table - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Plans</option>
                    <option value="free">Free</option>
                    <option value="monthly">Monthly Pro</option>
                    <option value="yearly">Yearly Pro</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">User</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Plan</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Credits</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Generations</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Joined</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium text-gray-900">{u.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            u.is_pro
                              ? u.pro_plan_type === 'yearly'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {u.is_pro
                              ? u.pro_plan_type === 'yearly' ? 'Yearly Pro' : 'Monthly Pro'
                              : 'Free'
                            }
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">
                            {u.is_pro && u.pro_plan_type === 'yearly'
                              ? '∞'
                              : u.is_pro
                                ? `${u.monthly_credits}/200`
                                : u.purchased_credits
                            }
                          </div>
                          {u.purchased_credits > 0 && u.is_pro && u.pro_plan_type !== 'yearly' && (
                            <div className="text-xs text-gray-500">+{u.purchased_credits} bonus</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{u.total_generations || 0}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(u.created_at)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUserAction(u.id, 'add-credits', 10)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Add 10 credits"
                            >
                              <ArrowUpCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(u.id, 'remove-credits', 10)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Remove 10 credits"
                            >
                              <ArrowDownCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No users found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Activity Feed - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                {activityFeed.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No recent activity</p>
                  </div>
                ) : (
                  activityFeed.map((activity) => (
                    <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'signup' ? 'bg-green-100 text-green-600' :
                        activity.type === 'subscription' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'generation' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {activity.type === 'signup' && <UserPlus className="w-5 h-5" />}
                        {activity.type === 'subscription' && <CreditCard className="w-5 h-5" />}
                        {activity.type === 'generation' && <Zap className="w-5 h-5" />}
                        {activity.type === 'error' && <Ban className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.user_email}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDateTime(activity.created_at)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
