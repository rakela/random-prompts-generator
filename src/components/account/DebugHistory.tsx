/**
 * DEBUG COMPONENT: Shows what's happening with generation history
 * Add this to the history page temporarily to debug
 */

import React, { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '../../lib/supabaseBrowser';

export default function DebugHistory() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkHistory();
  }, []);

  const checkHistory = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setDebugInfo({ error: 'Not logged in' });
      setLoading(false);
      return;
    }

    const info: any = {
      user: {
        id: session.user.id,
        email: session.user.email
      },
      apiCalls: {}
    };

    // Test 1: Call recent-activity API
    try {
      console.log('[DEBUG] Calling /api/account/recent-activity...');
      const response = await fetch('/api/account/recent-activity?limit=10', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      info.apiCalls.recentActivity = {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      };

      if (response.ok) {
        const data = await response.json();
        info.apiCalls.recentActivity.data = data;
        info.apiCalls.recentActivity.generationsCount = data.generations?.length || 0;

        console.log('[DEBUG] API Response:', data);
        console.log('[DEBUG] Generations count:', data.generations?.length || 0);

        if (data.generations && data.generations.length > 0) {
          info.apiCalls.recentActivity.firstGeneration = {
            id: data.generations[0].id,
            tool_id: data.generations[0].tool_id,
            tool_name: data.generations[0].tool_name,
            has_output: !!data.generations[0].output,
            created_at: data.generations[0].created_at
          };
        }
      } else {
        const errorText = await response.text();
        info.apiCalls.recentActivity.error = errorText;
        console.error('[DEBUG] API Error:', errorText);
      }
    } catch (error) {
      info.apiCalls.recentActivity.error = error instanceof Error ? error.message : String(error);
      console.error('[DEBUG] Fetch error:', error);
    }

    // Test 2: Call debug endpoint
    try {
      console.log('[DEBUG] Calling /api/debug/check-history...');
      const response = await fetch('/api/debug/check-history', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (response.ok) {
        const data = await response.json();
        info.apiCalls.debugCheck = data;
        console.log('[DEBUG] Debug check:', data);
      }
    } catch (error) {
      info.apiCalls.debugCheck = { error: error instanceof Error ? error.message : String(error) };
    }

    setDebugInfo(info);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 font-semibold">🔍 Loading debug info...</p>
      </div>
    );
  }

  if (!debugInfo) {
    return null;
  }

  const hasGenerations = debugInfo.apiCalls?.recentActivity?.generationsCount > 0;
  const dbHasGenerations = debugInfo.apiCalls?.debugCheck?.database?.yourGenerationsCount > 0;

  return (
    <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4">🔍 Debug Information</h2>

      {/* Quick Status */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">Quick Status:</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>User ID:</strong> {debugInfo.user?.id}
          </li>
          <li>
            <strong>Email:</strong> {debugInfo.user?.email}
          </li>
          <li>
            <strong>API Response Status:</strong>{' '}
            <span className={debugInfo.apiCalls?.recentActivity?.ok ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.apiCalls?.recentActivity?.status} {debugInfo.apiCalls?.recentActivity?.statusText}
            </span>
          </li>
          <li>
            <strong>Generations in API Response:</strong>{' '}
            <span className={hasGenerations ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
              {debugInfo.apiCalls?.recentActivity?.generationsCount || 0}
              {hasGenerations ? ' ✅' : ' ❌'}
            </span>
          </li>
          <li>
            <strong>Generations in Database:</strong>{' '}
            <span className={dbHasGenerations ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
              {debugInfo.apiCalls?.debugCheck?.database?.yourGenerationsCount || 0}
              {dbHasGenerations ? ' ✅' : ' ❌'}
            </span>
          </li>
        </ul>
      </div>

      {/* Diagnosis */}
      <div className={`rounded-lg p-4 mb-4 ${
        hasGenerations ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'
      }`}>
        <h3 className="font-semibold mb-2">
          {hasGenerations ? '✅ API Returns Data' : '❌ Problem Identified'}
        </h3>
        <p className="text-sm">
          {hasGenerations ? (
            <>
              The API is returning {debugInfo.apiCalls?.recentActivity?.generationsCount} generation(s).
              If you don't see them on the page, check the browser console for React rendering errors.
            </>
          ) : dbHasGenerations ? (
            <>
              ❌ Database has {debugInfo.apiCalls?.debugCheck?.database?.yourGenerationsCount} generation(s)
              but API returns 0. This means the API query or processing is failing.
              <br/><br/>
              <strong>Possible causes:</strong>
              <ul className="list-disc ml-5 mt-2">
                <li>getToolById() returning null</li>
                <li>Field mapping issue in recent-activity.ts</li>
                <li>Response filtering out results</li>
              </ul>
            </>
          ) : (
            <>
              ❌ No generations found in database for your user ID.
              <br/><br/>
              <strong>Next steps:</strong>
              <ul className="list-disc ml-5 mt-2">
                <li>Generate content from a YouTube tool</li>
                <li>Check if saveGeneration() is being called</li>
                <li>Verify user_id matches</li>
              </ul>
            </>
          )}
        </p>
      </div>

      {/* Sample Generation */}
      {hasGenerations && debugInfo.apiCalls?.recentActivity?.firstGeneration && (
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Sample Generation (First Result):</h3>
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
            {JSON.stringify(debugInfo.apiCalls.recentActivity.firstGeneration, null, 2)}
          </pre>
        </div>
      )}

      {/* Raw Debug Data */}
      <details className="bg-white rounded-lg p-4">
        <summary className="font-semibold text-gray-900 cursor-pointer">
          📊 View Full Debug Data (Click to expand)
        </summary>
        <pre className="text-xs bg-gray-100 p-3 rounded mt-3 overflow-auto max-h-96">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </details>

      {/* Instructions */}
      <div className="mt-4 text-sm text-blue-800">
        <p><strong>Remove this component</strong> from the page once debugging is complete.</p>
      </div>
    </div>
  );
}
