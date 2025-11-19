import type { Metadata } from 'next';
import Link from 'next/link';
import { PenTool, FileText, Type, MessageSquare, User, Sparkles, Zap, RefreshCw, BookOpen, MapPin, Skull, Shield, Globe, Wand2, Heart, Users, Book, Ghost, GraduationCap, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Writing Generators - Random Story & Creative Writing Tools',
  description: 'Explore our complete collection of 22+ writing generators including story prompts, character generators, plot tools, and more. Perfect for creative writers, novelists, and storytellers.',
  keywords: 'writing generators, story generators, character generator, plot generator, creative writing tools, writing prompts, fiction tools',
  openGraph: {
    title: 'Writing Generators - Random Story & Creative Writing Tools | Random Prompts',
    description: 'Explore our complete collection of 22+ writing generators for creative writing, stories, and fiction.',
    url: 'https://randomprompts.org/generators/writing/',
  },
};

const generators = [
  {
    title: 'Writing Prompts',
    description: 'Generate creative writing prompts with unique characters, conflicts, and plot twists',
    href: '/generators/writing/prompts/',
    icon: PenTool,
    color: 'blue'
  },
  {
    title: 'Paragraph Generator',
    description: 'Create random paragraphs for writing practice and creative inspiration',
    href: '/generators/writing/paragraph/',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Sentence Generator',
    description: 'Generate random sentences for creative writing and practice',
    href: '/generators/writing/sentence/',
    icon: Type,
    color: 'blue'
  },
  {
    title: 'Dialogue Generator',
    description: 'Create realistic dialogue prompts for character conversations',
    href: '/generators/writing/dialogue/',
    icon: MessageSquare,
    color: 'blue'
  },
  {
    title: 'Character Generator',
    description: 'Generate detailed character profiles with personalities and backgrounds',
    href: '/generators/writing/character/',
    icon: User,
    color: 'purple'
  },
  {
    title: 'Story Starter Generator',
    description: 'Create engaging story starters and opening lines',
    href: '/generators/writing/story-starter/',
    icon: Sparkles,
    color: 'purple'
  },
  {
    title: 'Conflict Generator',
    description: 'Generate compelling conflicts and tensions for your stories',
    href: '/generators/writing/conflict/',
    icon: Zap,
    color: 'orange'
  },
  {
    title: 'Plot Twist Generator',
    description: 'Create unexpected plot twists and revelations',
    href: '/generators/writing/plot-twist/',
    icon: RefreshCw,
    color: 'orange'
  },
  {
    title: 'Theme Generator',
    description: 'Generate meaningful themes and messages for your stories',
    href: '/generators/writing/theme/',
    icon: BookOpen,
    color: 'green'
  },
  {
    title: 'Setting Generator',
    description: 'Create unique and atmospheric settings for your narratives',
    href: '/generators/writing/setting/',
    icon: MapPin,
    color: 'green'
  },
  {
    title: 'Villain Generator',
    description: 'Generate compelling villains and antagonists',
    href: '/generators/writing/villain/',
    icon: Skull,
    color: 'red'
  },
  {
    title: 'Hero Generator',
    description: 'Create heroic protagonists with unique abilities',
    href: '/generators/writing/hero/',
    icon: Shield,
    color: 'blue'
  },
  {
    title: 'Worldbuilding Generator',
    description: 'Generate detailed worldbuilding prompts for fantasy and sci-fi',
    href: '/generators/writing/worldbuilding/',
    icon: Globe,
    color: 'purple'
  },
  {
    title: 'Magic System Generator',
    description: 'Create unique magic systems with rules and limitations',
    href: '/generators/writing/magic-system/',
    icon: Wand2,
    color: 'purple'
  },
  {
    title: 'Emotion Prompt Generator',
    description: 'Generate emotion-focused prompts for emotional depth',
    href: '/generators/writing/emotion/',
    icon: Heart,
    color: 'pink'
  },
  {
    title: 'Relationship Prompt Generator',
    description: 'Create relationship prompts and character dynamics',
    href: '/generators/writing/relationship/',
    icon: Users,
    color: 'pink'
  },
  {
    title: 'Short Story Prompts',
    description: 'Generate complete short story prompts with plots',
    href: '/generators/writing/short-story/',
    icon: Book,
    color: 'blue'
  },
  {
    title: 'October Writing Prompts',
    description: 'Spooky Halloween and autumn-themed writing prompts',
    href: '/generators/writing/october/',
    icon: Ghost,
    color: 'orange'
  },
  {
    title: 'Writing Prompts for Students',
    description: 'Age-appropriate prompts for students and classroom use',
    href: '/generators/writing/students/',
    icon: GraduationCap,
    color: 'green'
  },
  {
    title: 'Persuasive Writing Topics',
    description: 'Generate persuasive topics and debate ideas',
    href: '/generators/writing/persuasive-topics/',
    icon: MessageCircle,
    color: 'blue'
  },
  {
    title: 'Persuasive Essay Topics',
    description: 'Create compelling persuasive essay topics',
    href: '/generators/writing/persuasive-essays/',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Persuasive Writing Titles',
    description: 'Generate attention-grabbing persuasive titles',
    href: '/generators/writing/persuasive-titles/',
    icon: Type,
    color: 'blue'
  },
];

export default function WritingGeneratorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">Writing Generators</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Writing Generators</h1>
          <p className="text-xl opacity-90 max-w-3xl mb-6">
            Explore our complete collection of 22+ writing generators designed to spark creativity,
            overcome writer's block, and help you craft compelling stories.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Story Prompts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Character Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Plot Generators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Worldbuilding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generators Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generators.map((generator) => {
            const Icon = generator.icon;
            return (
              <Link
                key={generator.href}
                href={generator.href}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-lg group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${generator.color}-100 dark:bg-${generator.color}-900/30 text-${generator.color}-600 dark:text-${generator.color}-400 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {generator.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {generator.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>About Our Writing Generators</h2>
          <p className="text-lg">
            Our comprehensive suite of writing generators is designed to help writers at every level—from
            beginners finding their voice to experienced authors seeking fresh inspiration. Each tool
            is crafted to spark creativity and help you overcome writer's block.
          </p>

          <h3>Why Use Writing Generators?</h3>
          <p>
            Writing generators are powerful tools that can transform your creative process. They help you:
          </p>
          <ul>
            <li>Break through writer's block with instant inspiration</li>
            <li>Explore new genres and writing styles</li>
            <li>Develop complex characters with depth and authenticity</li>
            <li>Create compelling plots with unexpected twists</li>
            <li>Practice daily writing with varied prompts</li>
            <li>Build rich, immersive worlds for your stories</li>
          </ul>

          <h3>Categories of Writing Tools</h3>
          <p>
            Our writing generators are organized into several categories to help you find exactly
            what you need:
          </p>

          <h4>Story Development Tools</h4>
          <p>
            Generate complete story prompts, plots, conflicts, and resolutions. Perfect for novelists,
            short story writers, and creative writing students.
          </p>

          <h4>Character Creation Tools</h4>
          <p>
            Develop multi-dimensional characters with our character, hero, and villain generators.
            Create protagonists and antagonists with unique motivations and backstories.
          </p>

          <h4>Worldbuilding Tools</h4>
          <p>
            Build immersive fantasy and sci-fi worlds with our worldbuilding, magic system, and
            setting generators. Perfect for epic fantasy and speculative fiction.
          </p>

          <h4>Writing Practice Tools</h4>
          <p>
            Improve your craft with paragraph, sentence, and dialogue generators. Ideal for daily
            writing exercises and skill development.
          </p>

          <h3>How to Get the Most from These Tools</h3>
          <p>
            To maximize your creative output:
          </p>
          <ol>
            <li><strong>Combine multiple generators:</strong> Use character + setting + conflict for complete stories</li>
            <li><strong>Set daily challenges:</strong> Generate a new prompt each day and write for 15 minutes</li>
            <li><strong>Don't overthink:</strong> Go with the first prompt that sparks an idea</li>
            <li><strong>Adapt freely:</strong> Modify prompts to fit your style and genre preferences</li>
            <li><strong>Save favorites:</strong> Use the save feature to build your personal prompt library</li>
          </ol>

          <h3>Perfect for All Writers</h3>
          <p>
            Whether you're writing novels, short stories, flash fiction, or just practicing your
            craft, our generators provide endless inspiration. Use them for NaNoWriMo, creative
            writing classes, or personal projects.
          </p>
        </div>
      </div>
    </div>
  );
}
