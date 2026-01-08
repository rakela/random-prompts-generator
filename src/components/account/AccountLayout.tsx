import React from 'react';
import { User, CreditCard, Settings, BarChart3, History, LogOut } from 'lucide-react';

interface AccountLayoutProps {
  children: React.ReactNode;
  activePage: 'dashboard' | 'history' | 'subscription' | 'settings' | 'analytics';
  user?: any;
  credits?: number;
  isPro?: boolean;
}

export default function AccountLayout({ children, activePage, user, credits = 0, isPro = false }: AccountLayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User, href: '/account' },
    { id: 'history', label: 'History', icon: History, href: '/account/history' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/account/analytics' },
    { id: 'subscription', label: 'Subscription', icon: CreditCard, href: '/account/subscription' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/account/settings' },
  ];

  const handleLogout = async () => {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      window.__SUPABASE_URL__ || '',
      window.__SUPABASE_ANON_KEY__ || ''
    );
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.email || 'Account'}</p>
            <p className="text-xs text-gray-500">
              {isPro ? '⭐ Pro' : `${credits} credits`}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="lg:flex">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            {/* User Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.email || 'User'}
                  </p>
                  {isPro ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                      ⭐ Pro Member
                    </span>
                  ) : (
                    <p className="text-xs text-gray-500">{credits} credits</p>
                  )}
                </div>
              </div>

              {/* Credits Card */}
              {!isPro && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-900">Credits</span>
                    <span className="text-lg font-bold text-blue-600">{credits}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(credits * 10, 100)}%` }}
                    />
                  </div>
                  <a
                    href="/upgrade"
                    className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Upgrade to Pro →
                  </a>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
