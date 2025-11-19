import React, { useState } from 'react';
import { Copy, Check, Sparkles, Image as ImageIcon, BookOpen, Lightbulb } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import SEO from './components/SEO';

export default function GeminiAISnowPromptTutorialPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const prompts = [
    {
      title: "Cinematic Triptych Snow Portrait",
      description: "Create a stunning vertical composite with three emotional frames showcasing winter elegance",
      prompt: "Create a vertical 9:16 cinematic composite in winter snow, split into three stacked frames. Top: close-up of her eye and cheek, snowflakes on lashes and rosy skin. Middle: ¾ profile gazing upward, holding a clear umbrella as snow falls. Bottom: chest-up portrait facing camera with quiet melancholy. Lighting: soft daylight, HDR tone, shallow depth (Canon EOS R5, 85mm f/1.2). Outfit: black wool coat, thick white scarf, hair tucked in, no hat. Mood: emotional, calm, Korean winter romance style.",
      imageUrl: "https://i.ibb.co/Vc7HXTp6/1-690ee56168e0f76857084-1200.png",
      tags: ["Cinematic", "Vertical Format", "Triptych", "Emotional"],
      bestFor: "Social media stories, vertical displays, artistic portfolios"
    },
    {
      title: "Warm Winter Serenity Portrait",
      description: "A cozy, golden-hour winter scene that radiates warmth and tranquility",
      prompt: "Create a warm winter portrait of me wearing a cream sweater, with delicate snowflakes gently falling around me. Soft golden light bathes the scene, and the background is a blurred snowy landscape. The atmosphere should feel serene and cozy. The face remains exactly the same as in the provided reference photo, with no alterations.",
      imageUrl: "https://i.ibb.co/ZR9NPtNx/Gemini-Generated-Image-nyn6hznyn6hznyn6.png",
      tags: ["Warm Lighting", "Cozy", "Golden Hour", "Natural"],
      bestFor: "Personal portraits, holiday cards, lifestyle content"
    },
    {
      title: "Urban Winter Fashion Portrait",
      description: "Sophisticated city-style winter photography with modern urban elegance",
      prompt: "Create a chic city portrait of me in a fashionable winter look, with snow gently falling around modern streetlights. I'm wearing a stylish long coat, a cozy scarf, and fashionable boots. The scene should have an urban vibe with a touch of winter elegance. The face remains exactly the same as in the provided reference photo, with no alterations.",
      imageUrl: "https://i.ibb.co/67XyYWfV/Gemini-Generated-Image-9upitg9upitg9upi.png",
      tags: ["Urban Fashion", "City Vibe", "Stylish", "Modern"],
      bestFor: "Fashion photography, urban lifestyle, professional headshots"
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 dark:from-gray-900 via-blue-50 dark:via-gray-800 to-indigo-50 dark:to-gray-900">
      <SEO pageKey="geminiAISnowPromptTutorial" />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 dark:from-blue-400/5 via-indigo-500/10 dark:via-indigo-400/5 to-purple-600/10 dark:to-purple-400/5"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Professional Tutorial</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Gemini AI Snow Prompt Tutorial
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Master the art of creating stunning winter snow portraits with Google's Gemini AI.
              Learn professional techniques and ready-to-use prompts for breathtaking winter photography.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Why Gemini AI for Snow Portrait Generation?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Google's Gemini AI has revolutionized image generation with its advanced understanding of natural language
                and ability to create photorealistic winter scenes. Unlike other AI tools, Gemini excels at capturing the
                delicate nuances of snow, lighting, and atmospheric mood that make winter portraits truly captivating.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This tutorial provides you with three professional-grade prompts designed specifically for creating
                stunning winter snow portraits. Each prompt has been carefully crafted to maximize Gemini AI's capabilities
                and deliver consistent, high-quality results.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h3 className="font-bold text-lg text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Pro Tips for Best Results
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Upload a reference photo</strong> when using face-specific prompts for consistent results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Adjust lighting details</strong> based on your desired mood (golden hour for warmth, blue hour for drama)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Experiment with clothing colors</strong> to create contrast against the snowy background</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Generate multiple variations</strong> to find the perfect composition for your needs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Prompts Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            3 Professional Snow Portrait Prompts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Copy any prompt below and paste it directly into Gemini AI to create stunning winter portraits
          </p>
        </div>

        <div className="space-y-8">
          {prompts.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transition-colors"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ImageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PROMPT:</span>
                      <button
                        onClick={() => copyToClipboard(item.prompt, index)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.prompt}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-indigo-900 mb-1">
                      Best For:
                    </p>
                    <p className="text-sm text-indigo-700">
                      {item.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            How to Use These Prompts with Gemini AI
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Access Gemini AI
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit <a href="https://gemini.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">gemini.google.com</a> and
                  sign in with your Google account. Make sure you have access to Gemini's image generation features (available in supported regions).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Upload Your Reference Photo (Optional)
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  For prompts that specify "the face remains exactly the same as in the provided reference photo,"
                  upload a clear, well-lit photo of the person you want in the portrait. This ensures facial consistency.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Copy and Paste the Prompt
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click the "Copy" button on any prompt above, then paste it into Gemini AI's chat interface.
                  Press Enter to generate your image.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Refine and Iterate
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If you want to adjust the result, you can modify specific details like clothing colors,
                  lighting intensity, or background elements. Generate multiple versions to find your perfect shot.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Download and Share
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Once you're satisfied with your result, download the high-resolution image and share it on social media,
                  use it in your portfolio, or print it for physical display.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tips Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-purple-50 dark:from-gray-800 to-indigo-50 dark:to-gray-700 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Advanced Techniques for Winter Portrait Prompts
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Lighting Mastery
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Golden Hour:</strong> Use "warm golden light" for cozy, inviting portraits</li>
                <li><strong>Blue Hour:</strong> Specify "twilight blue tones" for dramatic, moody scenes</li>
                <li><strong>Overcast:</strong> "Soft diffused light" creates even, flattering illumination</li>
                <li><strong>Backlit:</strong> "Backlit snowflakes" adds magical bokeh effects</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Composition Tricks
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Rule of Thirds:</strong> Position subject off-center for dynamic balance</li>
                <li><strong>Leading Lines:</strong> Use "snow-covered path" to guide viewer's eye</li>
                <li><strong>Frame Within Frame:</strong> "Through frosted window" adds depth</li>
                <li><strong>Negative Space:</strong> Let snow-covered backgrounds breathe</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Color Palette Ideas
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Cool Tones:</strong> Navy, charcoal, and ice blue for sophistication</li>
                <li><strong>Warm Accents:</strong> Burgundy, mustard, rust for visual pop</li>
                <li><strong>Neutrals:</strong> Cream, beige, camel for timeless elegance</li>
                <li><strong>Bold Contrast:</strong> Red coat on white snow for dramatic impact</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Mood & Emotion
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Serene:</strong> "Peaceful expression, gentle snowfall"</li>
                <li><strong>Joyful:</strong> "Laughing, catching snowflakes"</li>
                <li><strong>Contemplative:</strong> "Quiet melancholy, gazing into distance"</li>
                <li><strong>Romantic:</strong> "Soft smile, intimate moment"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="max-w-4xl mx-auto px-4 py-12 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Explore More AI Prompt Generators
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Looking for more creative prompts? Check out our other AI generators and tools:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/ai-images-prompt"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 dark:from-gray-800 to-indigo-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <ImageIcon className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">AI Art Prompt Generator</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Create stunning AI art prompts</div>
              </div>
            </a>

            <a
              href="/midjourney-ai-picture-generator"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 dark:from-gray-800 to-pink-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <Sparkles className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Midjourney AI Generator</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Professional Midjourney prompts</div>
              </div>
            </a>

            <a
              href="/writing-prompts"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 dark:from-gray-800 to-emerald-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <BookOpen className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Writing Prompts</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Spark your creativity</div>
              </div>
            </a>

            <a
              href="/ghostface-ai-trend-prompt-generator"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 dark:from-gray-800 to-red-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <ImageIcon className="w-6 h-6 text-orange-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Ghostface AI Trend</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Trending AI portrait style</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
