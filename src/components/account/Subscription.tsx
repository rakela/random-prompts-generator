import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { CreditCard, Check, X, Zap, Star, Shield, Sparkles } from 'lucide-react';
import { getSupabaseBrowserClient } from '../../lib/supabaseBrowser';

interface SubscriptionProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function Subscription({ supabaseUrl, supabaseAnonKey }: SubscriptionProps) {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

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
      const response = await fetch('/api/check-credits', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits || 0);
        setIsPro(data.isPro || false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const freePlanFeatures = [
    { text: '10 free credits to start', included: true },
    { text: 'Access to all content tools', included: true },
    { text: 'Blog post generation', included: true },
    { text: 'LinkedIn post creation', included: true },
    { text: 'Newsletter drafts', included: true },
    { text: 'Content briefs', included: true },
    { text: 'Generation history', included: true },
    { text: 'Unlimited generations', included: false },
    { text: 'Priority support', included: false },
    { text: 'Early access to new tools', included: false },
  ];

  const proPlanFeatures = [
    { text: 'Unlimited credits', included: true },
    { text: 'Access to all content tools', included: true },
    { text: 'Blog post generation', included: true },
    { text: 'LinkedIn post creation', included: true },
    { text: 'Newsletter drafts', included: true },
    { text: 'Content briefs', included: true },
    { text: 'Generation history', included: true },
    { text: 'Unlimited generations', included: true },
    { text: 'Priority support', included: true },
    { text: 'Early access to new tools', included: true },
  ];

  return (
    <AccountLayout activePage="subscription" user={user} credits={credits} isPro={isPro}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription & Billing</h1>
          <p className="text-gray-600">
            Manage your plan and billing preferences.
          </p>
        </div>

        {/* Current Plan Status */}
        <div className={`rounded-2xl p-8 mb-8 ${
          isPro
            ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
            : 'bg-white border-2 border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {isPro ? (
                  <>
                    <Star className="w-8 h-8 fill-current" />
                    <h2 className="text-3xl font-bold">Pro Plan</h2>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-8 h-8 text-gray-400" />
                    <h2 className="text-3xl font-bold text-gray-900">Free Plan</h2>
                  </>
                )}
              </div>

              {isPro ? (
                <div>
                  <p className="text-indigo-100 mb-4">
                    You have unlimited access to all features and tools.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="text-indigo-200">Status</p>
                      <p className="font-semibold">Active</p>
                    </div>
                    <div>
                      <p className="text-indigo-200">Plan Type</p>
                      <p className="font-semibold">Pro - Unlimited</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    You're currently on the free plan with {credits} credits remaining.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Credits used</span>
                        <span>{10 - credits}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2 transition-all"
                          style={{ width: `${((10 - credits) / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`p-4 rounded-xl ${
              isPro ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-100'
            }`}>
              {isPro ? (
                <Zap className="w-12 h-12" />
              ) : (
                <CreditCard className="w-12 h-12 text-gray-400" />
              )}
            </div>
          </div>

        </div>

        {/* Plan Comparison */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Free Plan Card */}
          <div className={`bg-white rounded-2xl p-8 border-2 ${
            !isPro ? 'border-blue-600 shadow-lg' : 'border-gray-200'
          }`}>
            {!isPro && (
              <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                CURRENT PLAN
              </div>
            )}

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600">/month</span>
            </div>

            <p className="text-gray-600 mb-6">
              Perfect for trying out our content generation tools.
            </p>

            <ul className="space-y-3 mb-8">
              {freePlanFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              disabled={!isPro}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                !isPro
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {!isPro ? 'Current Plan' : 'Downgrade'}
            </button>
          </div>

          {/* Pro Plan Card */}
          <div className={`bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden ${
            isPro ? 'ring-4 ring-indigo-400' : ''
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              {isPro && (
                <div className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  CURRENT PLAN
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <Star className="w-6 h-6 fill-current" />
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-indigo-100">/month</span>
              </div>

              <p className="text-indigo-100 mb-6">
                Unlimited content generation for serious creators.
              </p>

              <ul className="space-y-3 mb-8">
                {proPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {!isPro ? (
                <a
                  href="/upgrade"
                  className="block w-full py-3 px-6 bg-white text-indigo-600 rounded-lg font-semibold text-center hover:bg-indigo-50 transition-colors"
                >
                  Upgrade to Pro
                </a>
              ) : (
                <button
                  disabled
                  className="w-full py-3 px-6 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold cursor-not-allowed"
                >
                  Current Plan
                </button>
              )}
            </div>
          </div>
        </div>


        {/* Upgrade CTA for Free Users */}
        {!isPro && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center shadow-xl">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Unlock Unlimited Content Creation</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upgrade to Pro and never worry about credits again. Generate unlimited blog posts, LinkedIn updates, newsletters, and more.
            </p>
            <a
              href="/upgrade"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <Star className="w-5 h-5" />
              Upgrade to Pro for $29/month
            </a>
            <p className="text-sm text-blue-100 mt-4">Cancel anytime. No questions asked.</p>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
