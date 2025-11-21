import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="privacy" />

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-90">
            Your privacy matters. We're committed to protecting your data and being transparent about our practices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Last Updated:</strong> October 30, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">
                Random Prompts Generator ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains our data practices for our website at{' '}
                <a href="https://randomprompts.org" className="text-blue-600 hover:underline">
                  https://randomprompts.org
                </a>{' '}
                and the services we provide.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-900 font-semibold">
                  ✓ We do NOT collect personal information
                </p>
                <p className="text-green-800 text-sm">
                  ✓ We do NOT use tracking cookies<br />
                  ✓ We do NOT sell or share your data<br />
                  ✓ We do NOT require registration or accounts
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We do NOT collect any personal information. You can use Random Prompts Generator
                completely anonymously without creating an account or providing any personal details.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Data</h3>
              <p className="text-gray-700 mb-4">
                We use Google Analytics to understand how visitors use our website. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Pages visited and time spent on pages</li>
                <li>Browser type and device information</li>
                <li>Referring websites and search terms</li>
                <li>Geographic location (country/city level only)</li>
                <li>IP addresses (anonymized)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This data is anonymized and used solely to improve our service. For more information,
                visit{' '}
                <a
                  href="https://www.cookiebot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google's Privacy Policy
                </a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Generated Prompts</h3>
              <p className="text-gray-700 mb-4">
                All prompts are generated locally in your browser using JavaScript. We do NOT:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Store prompts you generate on our servers</li>
                <li>Track which prompts you create</li>
                <li>Save or analyze your saved prompts</li>
              </ul>
              <p className="text-gray-700 mb-4">
                If you use the "Save" feature, prompts are stored locally in your browser's localStorage
                and remain on your device only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use minimal cookies for essential functionality:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>
                  <strong>Google Analytics cookies:</strong> Used to track anonymous usage statistics.
                  You can opt-out using browser extensions like{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google Analytics Opt-out
                  </a>.
                </li>
                <li>
                  <strong>localStorage:</strong> Used to save your prompts locally on your device (only if you use the Save feature).
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                We do NOT use tracking pixels, advertising cookies, or third-party analytics beyond Google Analytics.
                For more information about cookies, visit{' '}
                <a
                  href="https://www.cookiebot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Cookiebot
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
              <p className="text-gray-700 mb-4">
                The limited data we collect (through Google Analytics) is used to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Understand which features are most popular</li>
                <li>Identify and fix technical issues</li>
                <li>Improve user experience and site performance</li>
                <li>Generate anonymous usage statistics</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We do NOT use your data for advertising, marketing, or profiling.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Third Parties</h2>
              <p className="text-gray-700 mb-4">
                We do NOT sell, rent, or share your data with third parties, except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Anonymized usage data for analytics purposes only
                </li>
                <li>
                  <strong>Vercel (Hosting):</strong> Our hosting provider may process server logs as part of their service
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                We do NOT integrate with social media platforms for tracking purposes (though we provide
                share buttons that work via standard browser APIs).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>HTTPS encryption for all connections</li>
                <li>Regular security updates and monitoring</li>
                <li>Minimal data collection reduces risk exposure</li>
                <li>No user database means no database breaches</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Since we don't collect personal information, there's no personal data to access,
                modify, or delete. However, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Use the site without accepting cookies (though some functionality may be limited)</li>
                <li>Clear your browser's localStorage to delete saved prompts</li>
                <li>Opt out of Google Analytics tracking using browser extensions</li>
                <li>Use ad blockers and privacy extensions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Random Prompts Generator is safe for all ages. We do not knowingly collect personal
                information from anyone, including children under 13. Since we don't collect personal
                information at all, there are no special COPPA compliance requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All prompts generated by our tool are yours to use freely for personal or commercial
                projects. We claim no ownership or rights to the prompts you generate. For more details,
                see our{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links</h2>
              <p className="text-gray-700 mb-4">
                Our website contains links to external resources (e.g., MidJourney, ChatGPT, writing resources).
                We are not responsible for the privacy practices of these external sites. We recommend reviewing
                their privacy policies before providing any personal information.
              </p>
              <p className="text-gray-700 mb-4">
                Some helpful external resources we link to include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>
                  <a
                    href="https://openai.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    OpenAI Blog
                  </a> - AI writing and research updates
                </li>
                <li>
                  <a
                    href="https://midjourney.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MidJourney
                  </a> - AI art generation platform
                </li>
                <li>
                  <a
                    href="https://www.termsfeed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    TermsFeed
                  </a> - Privacy policy resources
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. Changes will be posted on this page
                with an updated "Last Updated" date. Continued use of the service after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none pl-0 text-gray-700 mb-4 space-y-2">
                <li>
                  <strong>GitHub Issues:</strong>{' '}
                  <a
                    href="https://github.com/rakela/random-prompts-generator/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Report an issue or ask a question
                  </a>
                </li>
                <li>
                  <strong>GitHub Discussions:</strong>{' '}
                  <a
                    href="https://github.com/rakela/random-prompts-generator/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Community discussions
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <p className="text-blue-900 font-semibold mb-2">In Plain English:</p>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li>✓ We respect your privacy completely</li>
                  <li>✓ No accounts, no registration, no personal data collection</li>
                  <li>✓ Your prompts stay on your device</li>
                  <li>✓ We only use Google Analytics for anonymous usage stats</li>
                  <li>✓ All prompts you generate are yours to use freely</li>
                  <li>✓ Open source and transparent</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Want to learn more about our service?{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Read our Terms of Service
              </Link>
              {' '}or{' '}
              <Link to="/" className="text-blue-600 hover:underline">
                start generating prompts
              </Link>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
