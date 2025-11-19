import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://randomprompts.org'),
  title: {
    default: 'Random Prompts Generator - Free AI & Writing Prompts',
    template: '%s | Random Prompts'
  },
  description: 'Generate endless creative prompts for writing, AI art, and stories. Perfect for ChatGPT, MidJourney, and creative writing. Free random prompt generator for writers, artists, and creators.',
  keywords: [
    'random prompts',
    'writing prompts',
    'AI art prompts',
    'creative writing',
    'story generator',
    'character generator',
    'MidJourney prompts',
    'ChatGPT prompts',
    'prompt generator',
    'writing ideas',
    'creative prompts',
  ],
  authors: [{ name: 'Random Prompts' }],
  creator: 'Random Prompts',
  publisher: 'Random Prompts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://randomprompts.org',
    siteName: 'Random Prompts',
    title: 'Random Prompts Generator - Free AI & Writing Prompts',
    description: 'Generate endless creative prompts for writing, AI art, and stories. Perfect for ChatGPT, MidJourney, and creative writing.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Random Prompts Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Prompts Generator',
    description: 'Generate endless creative prompts for writing, AI art, and stories',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here if needed
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3B82F6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
