import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Package, Heart, Zap, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creative Generators - Random Ideas, Names & Inspiration Tools',
  description: 'Explore creative generators for names, objects, hobbies, superpowers, and ideas. Perfect for brainstorming, character creation, and creative inspiration.',
  keywords: 'creative generators, name generator, random ideas, hobby generator, brainstorming tools, creative inspiration',
  openGraph: {
    title: 'Creative Generators - Random Ideas, Names & Inspiration Tools | Random Prompts',
    description: 'Generate creative names, objects, hobbies, superpowers, and ideas for your projects and creative endeavors.',
    url: 'https://randomprompts.org/generators/creative/',
  },
};

const generators = [
  {
    title: 'Random Name Generator',
    description: 'Fantasy character names including elvish, dwarven, and human names',
    href: '/generators/creative/names/',
    icon: User,
    color: 'purple'
  },
  {
    title: 'Random Object Generator',
    description: 'Everyday item ideas for creative writing and drawing prompts',
    href: '/generators/creative/objects/',
    icon: Package,
    color: 'blue'
  },
  {
    title: 'Random Hobby Generator',
    description: 'Discover new hobbies and activities to explore',
    href: '/generators/creative/hobbies/',
    icon: Heart,
    color: 'pink'
  },
  {
    title: 'Random Superpower Generator',
    description: 'Unique superpowers and abilities for characters',
    href: '/generators/creative/superpowers/',
    icon: Zap,
    color: 'orange'
  },
  {
    title: 'Random Idea Generator',
    description: 'Creative inspiration for projects and brainstorming',
    href: '/generators/creative/ideas/',
    icon: Lightbulb,
    color: 'green'
  },
];

export default function CreativeGeneratorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">Creative Generators</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Creative Generators</h1>
          <p className="text-xl opacity-90 max-w-3xl mb-6">
            Spark your creativity with our collection of random generators. From character names
            to superpowers, discover new ideas and inspiration for your creative projects.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Creative Inspiration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Free Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Perfect for Brainstorming</span>
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
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600 transition-all hover:shadow-lg group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${generator.color}-100 dark:bg-${generator.color}-900/30 text-${generator.color}-600 dark:text-${generator.color}-400 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
          <h2>Creative Generator Tools for Inspiration</h2>
          <p className="text-lg">
            Our creative generators help you overcome creative blocks, brainstorm new ideas, and
            discover unexpected inspiration. Whether you're working on a story, game, art project,
            or just looking for creative fun, these random generators spark imagination.
          </p>

          <h3>Character Name Generator</h3>
          <p>
            Create unique fantasy character names with our random name generator. Choose from
            different cultures including elvish, dwarven, human, and exotic names. Perfect for:
          </p>
          <ul>
            <li>Fantasy novel characters and protagonists</li>
            <li>RPG and tabletop gaming characters</li>
            <li>Video game character creation</li>
            <li>Creative writing and worldbuilding</li>
            <li>Username and pseudonym generation</li>
          </ul>
          <p>
            Our name generator combines first names, last names, and titles to create memorable
            character names that feel authentic to different fantasy cultures.
          </p>

          <h3>Random Object Generator</h3>
          <p>
            Generate random everyday objects for creative prompts and exercises. Use this tool for:
          </p>
          <ul>
            <li>Drawing practice and artistic challenges</li>
            <li>Creative writing prompts and story elements</li>
            <li>Design inspiration and product ideas</li>
            <li>Educational games and classroom activities</li>
            <li>Brainstorming sessions and ideation</li>
          </ul>
          <p>
            Random objects can spark unexpected creative directions and help you think outside
            the box. Challenge yourself to incorporate random items into your creative projects.
          </p>

          <h3>Hobby Generator</h3>
          <p>
            Discover new hobbies and interests with our random hobby generator. Perfect for:
          </p>
          <ul>
            <li>Finding new pastimes and activities to try</li>
            <li>Character development in creative writing</li>
            <li>Breaking out of routine and trying something new</li>
            <li>Gift ideas and activity suggestions</li>
            <li>Personal growth and skill development</li>
          </ul>
          <p>
            Sometimes the best hobbies are the ones you never expected to enjoy. Let randomness
            guide you to new experiences and interests.
          </p>

          <h3>Superpower Generator</h3>
          <p>
            Create unique superpowers and abilities for characters in your stories, games, or
            creative projects. Use this generator for:
          </p>
          <ul>
            <li>Superhero character creation and development</li>
            <li>Game character abilities and skill systems</li>
            <li>Fantasy and sci-fi worldbuilding</li>
            <li>Creative challenges and constraints</li>
            <li>Fun party games and icebreakers</li>
          </ul>
          <p>
            Random superpowers often lead to more interesting character concepts than the usual
            suspects. Challenge yourself to create compelling characters with unusual abilities.
          </p>

          <h3>Random Idea Generator</h3>
          <p>
            Spark creative inspiration with random ideas for projects, stories, and brainstorming.
            This versatile tool helps with:
          </p>
          <ul>
            <li>Overcoming creative blocks and writer's block</li>
            <li>Business and startup ideation</li>
            <li>Art and design project concepts</li>
            <li>Innovation and problem-solving sessions</li>
            <li>Content creation and marketing campaigns</li>
          </ul>

          <h3>How to Use Random Generators Effectively</h3>
          <ol>
            <li><strong>Stay Open-Minded:</strong> Don't dismiss unusual combinations - they often lead to the most creative results</li>
            <li><strong>Combine Elements:</strong> Use multiple generators together for richer ideas</li>
            <li><strong>Iterate:</strong> Generate multiple results and mix and match elements</li>
            <li><strong>Add Personal Touches:</strong> Use generated ideas as starting points and customize them</li>
            <li><strong>Regular Practice:</strong> Make random generation part of your creative routine</li>
          </ol>

          <h3>Why Use Random Generators?</h3>
          <p>
            Random generators are powerful creative tools because they:
          </p>
          <ul>
            <li><strong>Break Patterns:</strong> Help you escape predictable thinking and habitual choices</li>
            <li><strong>Spark Connections:</strong> Force unexpected combinations that lead to innovation</li>
            <li><strong>Save Time:</strong> Quickly generate starting points instead of staring at a blank page</li>
            <li><strong>Reduce Pressure:</strong> Take decision-making burden off your shoulders</li>
            <li><strong>Inspire Exploration:</strong> Encourage you to try ideas you wouldn't normally consider</li>
          </ul>

          <h3>Creative Applications</h3>
          <p>
            Our creative generators support a wide range of activities:
          </p>
          <ul>
            <li>Fiction writing and storytelling</li>
            <li>Game design and development</li>
            <li>Art and illustration projects</li>
            <li>Educational activities and exercises</li>
            <li>Party games and social activities</li>
            <li>Personal development and self-discovery</li>
            <li>Marketing and content creation</li>
            <li>Brainstorming and ideation sessions</li>
          </ul>

          <h3>Start Generating Creative Ideas</h3>
          <p>
            Choose a generator above and start exploring. Whether you need a character name,
            a random object for inspiration, a new hobby to try, a unique superpower, or
            just a spark of creative inspiration, our generators are here to help.
          </p>
        </div>
      </div>
    </div>
  );
}
