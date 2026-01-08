import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { TrendingUp, Calendar, Clock, Zap, BarChart3, PieChart } from 'lucide-react';
import { getSupabaseBrowserClient } from '../../lib/supabaseBrowser';
import { getToolById } from '../../config/tools';

interface AnalyticsProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function Analytics({ supabaseUrl, supabaseAnonKey }: AnalyticsProps) {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [monthlyCredits, setMonthlyCredits] = useState(0);
  const [purchasedCredits, setPurchasedCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

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

    try {
      // Fetch credits
      const creditsResponse = await fetch('/api/check-credits', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (creditsResponse.ok) {
        const data = await creditsResponse.json();
        setCredits(data.credits || 0);
        setIsPro(data.isPro || false);
        setIsYearly(data.isYearly || false);
        setMonthlyCredits(data.monthlyCredits || 0);
        setPurchasedCredits(data.purchasedCredits || 0);
      }

      // Fetch analytics
      const analyticsResponse = await fetch('/api/account/analytics', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (analyticsResponse.ok) {
        const data = await analyticsResponse.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  const getToolName = (toolId: string) => {
    const tool = getToolById(toolId);
    return tool?.seo_title || tool?.category || toolId;
  };

  const getToolIcon = (toolId: string) => {
    if (toolId.includes('blog')) return '📝';
    if (toolId.includes('linkedin')) return '💼';
    if (toolId.includes('newsletter')) return '📧';
    if (toolId.includes('content-brief')) return '📋';
    if (toolId.includes('repurposing')) return '🔄';
    return '✨';
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const maxDailyCount = analytics?.dailyGenerations ? Math.max(...analytics.dailyGenerations.map((d: any) => d.count)) : 1;
  const maxHourlyCount = analytics?.hourlyDistribution ? Math.max(...analytics.hourlyDistribution) : 1;

  return (
    <AccountLayout activePage="analytics" user={user} credits={credits} isPro={isPro}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Usage Analytics</h1>
          <p className="text-gray-600">
            Track your content generation patterns and usage insights.
          </p>
        </div>

        {/* Credits Card - Prominent Display */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              {isPro ? (
                isYearly ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-blue-100 text-sm font-medium">Available Credits</p>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">YEARLY PRO</span>
                    </div>
                    <h2 className="text-5xl font-bold">∞</h2>
                    <p className="text-blue-100 text-sm mt-2">Unlimited generations</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-blue-100 text-sm font-medium">Monthly Credits</p>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">MONTHLY PRO</span>
                    </div>
                    <h2 className="text-5xl font-bold">{monthlyCredits}/200</h2>
                    {purchasedCredits > 0 && (
                      <p className="text-blue-100 text-sm mt-2">+ {purchasedCredits} bonus credits available</p>
                    )}
                  </>
                )
              ) : (
                <>
                  <p className="text-blue-100 text-sm font-medium mb-2">Available Credits</p>
                  <h2 className="text-5xl font-bold">{credits.toLocaleString()}</h2>
                  <p className="text-blue-100 text-sm mt-2">
                    {credits > 0 ? 'Generate more content with your remaining credits' : 'Upgrade to Pro for more credits'}
                  </p>
                </>
              )}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <Zap className="w-12 h-12" />
            </div>
          </div>

          {!isPro && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Credit Usage</span>
                <span className="text-sm font-semibold">{credits} remaining</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${Math.min((credits / 10) * 100, 100)}%` }}
                ></div>
              </div>
              {credits < 3 && (
                <p className="text-sm text-yellow-200 mt-3">
                  ⚠️ Running low on credits. <a href="/upgrade" className="underline font-semibold hover:text-white">Upgrade to Pro</a> for more credits.
                </p>
              )}
            </div>
          )}

          {isPro && isYearly && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-lg font-semibold">🎉 You have unlimited credits!</p>
              <p className="text-sm text-blue-100 mt-1">Generate as much content as you need</p>
            </div>
          )}

          {isPro && !isYearly && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Monthly Credit Usage</span>
                <span className="text-sm font-semibold">{monthlyCredits}/200</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${(monthlyCredits / 200) * 100}%` }}
                ></div>
              </div>
              {monthlyCredits < 20 && monthlyCredits > 0 && (
                <p className="text-sm text-yellow-200 mt-3">
                  ⚠️ Running low on monthly credits. Consider <a href="/account/subscription" className="underline font-semibold hover:text-white">upgrading to Yearly Pro</a> for unlimited access.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Generations</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{analytics?.totalGenerations || 0}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Last 7 Days</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{analytics?.last7DaysCount || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Recent activity</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Last 30 Days</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{analytics?.last30DaysCount || 0}</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Daily Average</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{analytics?.avgPerDay || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Per day (30d avg)</p>
          </div>
        </div>

        {/* Generation Trends Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Generation Trends</h2>
          </div>

          <div className="space-y-2">
            {analytics?.dailyGenerations?.slice(-14).map((day: any, index: number) => {
              const date = new Date(day.date);
              const percentage = maxDailyCount > 0 ? (day.count / maxDailyCount) * 100 : 0;

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 text-xs text-gray-600 text-right">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${Math.max(percentage, 3)}%` }}
                    >
                      {day.count > 0 && (
                        <span className="text-white text-xs font-semibold">{day.count}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">Last 14 days of activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Tools */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Most Used Tools</h2>
            </div>

            {analytics?.topTools && analytics.topTools.length > 0 ? (
              <div className="space-y-4">
                {analytics.topTools.map((tool: any, index: number) => {
                  const percentage = analytics.totalGenerations > 0
                    ? Math.round((tool.count / analytics.totalGenerations) * 100)
                    : 0;

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getToolIcon(tool.toolId)}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {getToolName(tool.toolId)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">
                          {tool.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No tool usage data yet</p>
                <a
                  href="/tools"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Start creating content →
                </a>
              </div>
            )}
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Peak Activity Hours</h2>
            </div>

            {analytics?.peakHour !== undefined && (
              <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-900">
                  <strong>Most Active:</strong> {formatHour(analytics.peakHour)}
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  You generate the most content during this hour
                </p>
              </div>
            )}

            <div className="space-y-1">
              {analytics?.hourlyDistribution?.map((count: number, hour: number) => {
                const percentage = maxHourlyCount > 0 ? (count / maxHourlyCount) * 100 : 0;
                const isPeak = hour === analytics.peakHour;

                return (
                  <div key={hour} className="flex items-center gap-2">
                    <div className={`w-12 text-xs ${isPeak ? 'font-bold text-orange-600' : 'text-gray-600'} text-right`}>
                      {formatHour(hour)}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPeak ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-300'
                        }`}
                        style={{ width: `${Math.max(percentage, count > 0 ? 2 : 0)}%` }}
                      >
                        {count > 0 && percentage > 15 && (
                          <span className="text-white text-xs font-semibold absolute right-2 top-1/2 transform -translate-y-1/2">
                            {count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">24-hour activity distribution</p>
          </div>
        </div>

        {/* Upgrade CTA for Free Users */}
        {!isPro && (
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-3">Unlock Pro Analytics</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Choose the plan that fits your needs: 200 credits monthly at $19/month or unlimited with our yearly plan at $199/year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/upgrade?plan=monthly"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Monthly Pro - $19/month
              </a>
              <a
                href="/upgrade?plan=annual"
                className="inline-flex items-center justify-center gap-2 bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-900 transition-colors border-2 border-yellow-400"
              >
                Yearly Pro - $199/year
              </a>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
