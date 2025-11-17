import React, { useState } from 'react';
import { Copy, Check, Sparkles, Image as ImageIcon, BookOpen, Lightbulb, Wand2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';

export default function ChatGPTPhotoEditingPromptsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const prompts = [
    {
      title: "Professional Portrait Enhancement",
      description: "Transform everyday portraits into magazine-quality photos with advanced retouching",
      prompt: "I need you to edit this portrait photo professionally. Please: 1) Enhance skin tone with natural smoothing while keeping texture visible, 2) Brighten eyes and add subtle sparkle, 3) Whiten teeth naturally without making them look artificial, 4) Adjust lighting to create a soft, flattering glow, 5) Slightly blur the background to make the subject stand out, 6) Fix any minor blemishes or distractions, 7) Enhance color vibrancy while maintaining natural tones, 8) Add subtle contrast to make the image pop. Keep all changes natural and realistic.",
      tags: ["Portrait", "Professional", "Enhancement", "Retouching"],
      bestFor: "Headshots, social media profiles, dating apps, professional portfolios"
    },
    {
      title: "Vintage Film Aesthetic",
      description: "Create nostalgic, film-inspired edits with authentic vintage characteristics",
      prompt: "Transform this photo into a vintage film aesthetic. Apply these edits: 1) Add warm, golden-orange tones reminiscent of 1970s film photography, 2) Introduce subtle grain texture to mimic film stock, 3) Slightly reduce contrast for that faded, nostalgic look, 4) Add a gentle vignette around the edges, 5) Desaturate colors slightly but keep warmth in highlights, 6) Create soft, dreamy lighting with reduced sharpness, 7) Add subtle light leaks or film burn effects in corners if appropriate. The final result should look like it was shot on expired Kodak film.",
      tags: ["Vintage", "Film", "Aesthetic", "Retro"],
      bestFor: "Instagram posts, artistic portfolios, nostalgic memories, creative projects"
    },
    {
      title: "Dramatic Cinematic Color Grading",
      description: "Apply Hollywood-style color grading for cinematic, moody photographs",
      prompt: "Apply cinematic color grading to this photo with the following specifications: 1) Implement a teal and orange color scheme (push shadows toward teal/cyan, push highlights toward warm orange), 2) Increase contrast significantly for dramatic depth, 3) Crush blacks slightly for a film-noir inspired look, 4) Add subtle bloom to highlights for a cinematic glow, 5) Desaturate midtones while keeping vibrant accents in highlights and shadows, 6) Create depth with split-toning, 7) Add film grain for texture, 8) Ensure skin tones remain natural despite the dramatic grading. The result should look like a frame from a blockbuster movie.",
      tags: ["Cinematic", "Color Grading", "Dramatic", "Professional"],
      bestFor: "Film stills, dramatic portraits, artistic photography, commercial work"
    },
    {
      title: "Natural Landscape Enhancement",
      description: "Enhance landscape photography while maintaining photographic authenticity",
      prompt: "Enhance this landscape photo with natural, realistic adjustments: 1) Boost sky detail and add drama to clouds without over-processing, 2) Enhance green tones in foliage and grass for richness, 3) Increase overall vibrancy while keeping colors believable, 4) Sharpen details in foreground elements, 5) Add subtle graduated filter from top to bottom for balanced exposure, 6) Enhance golden hour warmth if sunset/sunrise, or cool tones if blue hour, 7) Increase clarity for enhanced texture in rocks, trees, and terrain, 8) Remove any distracting elements like power lines or trash. Keep the scene natural and believable.",
      tags: ["Landscape", "Nature", "Enhancement", "Realistic"],
      bestFor: "Travel photography, nature prints, desktop wallpapers, outdoor portfolios"
    },
    {
      title: "High-Fashion Editorial Look",
      description: "Create bold, editorial-style fashion photography with striking visual impact",
      prompt: "Edit this photo for a high-fashion editorial look: 1) Create bold, saturated colors with emphasis on complementary color palettes, 2) Apply sharp, crisp details with high clarity, 3) Add high contrast with deep blacks and bright highlights, 4) Implement advanced skin retouching with frequency separation technique, 5) Enhance clothing textures and fabric details, 6) Create separation between subject and background with selective focus, 7) Add subtle color grading that matches current fashion trends, 8) Make the overall aesthetic clean, modern, and magazine-ready. The result should look like it belongs in Vogue or Harper's Bazaar.",
      tags: ["Fashion", "Editorial", "High-End", "Bold"],
      bestFor: "Fashion portfolios, editorial submissions, modeling portfolios, brand campaigns"
    },
    {
      title: "Moody Dark & Atmospheric",
      description: "Create mysterious, atmospheric photos with deep shadows and dramatic mood",
      prompt: "Transform this image into a moody, dark, and atmospheric photograph: 1) Lower overall exposure while preserving key highlights, 2) Push shadows to near-black for dramatic depth, 3) Add cool-toned color grading (blues, teals, desaturated greens), 4) Introduce atmospheric haze or fog if scene allows, 5) Use selective dodging to highlight the main subject subtly, 6) Add grain for gritty texture, 7) Reduce color saturation for a desaturated, melancholic feel, 8) Create mystery by obscuring some details in shadow. The mood should feel contemplative, mysterious, and emotionally evocative.",
      tags: ["Moody", "Dark", "Atmospheric", "Dramatic"],
      bestFor: "Artistic portraits, fine art photography, album covers, emotional storytelling"
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <SEO pageKey="chatgptPhotoEditingPrompts" />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-blue-600/10"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Wand2 className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Professional Photo Editing Guide</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              ChatGPT Prompts for Photo Editing
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Master AI-powered photo editing with ChatGPT. Learn how to write effective prompts
              and get professional-quality results with ready-to-use editing templates.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How to Use ChatGPT for Photo Editing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While ChatGPT cannot directly edit images, it excels at providing detailed, professional
                photo editing instructions that you can implement in tools like Photoshop, Lightroom,
                GIMP, or mobile apps. By using well-crafted prompts, you can get expert-level editing
                guidance tailored to your specific photos.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                For AI tools that do edit images directly (like Adobe Firefly, Canva AI, or specialized
                photo editing AI), these prompts serve as perfect templates. Simply describe your image
                and paste the editing instructions for instant professional results.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This page provides six professional photo editing prompt templates covering everything
                from portrait retouching to cinematic color grading. Each template has been optimized
                for clarity and effectiveness.
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
            <h3 className="font-bold text-lg text-purple-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Essential Tips for Writing Photo Editing Prompts
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Be specific about adjustments:</strong> Instead of "make it better," specify "increase contrast by 20% and add warm tones"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Describe your starting image:</strong> Mention lighting conditions, subject matter, and current issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Define your desired outcome:</strong> Reference specific styles (e.g., "cinematic," "vintage film," "editorial fashion")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Use numbered lists:</strong> Break complex edits into step-by-step instructions for clarity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Mention your editing tool:</strong> Specify if you're using Photoshop, Lightroom, or mobile apps for tailored advice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Request natural results:</strong> Add "keep changes realistic and natural" to avoid over-processed looks</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Prompts Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            6 Professional Photo Editing Prompt Templates
          </h2>
          <p className="text-xl text-gray-600">
            Copy any prompt and customize it for your specific photo editing needs
          </p>
        </div>

        <div className="space-y-8">
          {prompts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-purple-100 rounded-full text-xs font-medium text-purple-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">PROMPT:</span>
                    <button
                      onClick={() => copyToClipboard(item.prompt, index)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
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
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.prompt}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-900 mb-1">
                    Best For:
                  </p>
                  <p className="text-sm text-purple-700">
                    {item.bestFor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Use These Prompts Effectively
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Choose Your Editing Tool
                </h3>
                <p className="text-gray-700">
                  Decide whether you're using ChatGPT to get editing instructions for manual editing
                  (Photoshop, Lightroom, GIMP) or pasting prompts into AI editing tools
                  (Adobe Firefly, Canva AI, Photoleap, etc.). For manual editing, ask ChatGPT for
                  step-by-step instructions specific to your software.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Describe Your Photo
                </h3>
                <p className="text-gray-700">
                  Start by describing your current photo to ChatGPT: "I have a portrait photo taken
                  indoors with fluorescent lighting. The subject is a woman in her 30s wearing a blue
                  dress. The background is a white wall." This context helps generate better instructions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Paste and Customize the Prompt
                </h3>
                <p className="text-gray-700">
                  Copy one of the prompt templates above and paste it into ChatGPT. Then customize it
                  based on your specific needs. For example, change "warm tones" to "cool tones" or
                  adjust the intensity of effects based on your preference.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Get Step-by-Step Instructions
                </h3>
                <p className="text-gray-700">
                  If using manual editing software, ask ChatGPT: "Please provide step-by-step instructions
                  for achieving this in Adobe Lightroom Classic" or your preferred tool. ChatGPT will
                  break down each adjustment into specific sliders, tools, and settings.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Iterate and Refine
                </h3>
                <p className="text-gray-700">
                  After your first edit, you can show results back to ChatGPT (if using GPT-4 with vision)
                  or describe the outcome: "The skin looks too smooth" or "The colors are too saturated."
                  ChatGPT will provide refinement suggestions to perfect your edit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Save Your Presets
                </h3>
                <p className="text-gray-700">
                  Once you find editing settings you love, save them as presets in your editing software.
                  This way, you can apply the same professional look to future photos with one click.
                  Ask ChatGPT to document all exact settings for easy recreation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tips Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Advanced Photo Editing Techniques with ChatGPT
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Color Theory Guidance
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>Complementary Colors:</strong> Ask ChatGPT to suggest color schemes that create visual impact</li>
                <li><strong>Split-Toning:</strong> Request specific color combinations for highlights and shadows</li>
                <li><strong>HSL Adjustments:</strong> Get targeted advice for adjusting specific color ranges</li>
                <li><strong>Color Harmony:</strong> Learn which colors work together for balanced compositions</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Technical Corrections
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>Exposure Recovery:</strong> Fix underexposed or overexposed areas without losing detail</li>
                <li><strong>White Balance:</strong> Correct color casts from different lighting sources</li>
                <li><strong>Noise Reduction:</strong> Balance clarity with natural grain for high-ISO photos</li>
                <li><strong>Lens Correction:</strong> Fix distortion, vignetting, and chromatic aberration</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Creative Enhancements
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>Selective Adjustments:</strong> Edit specific areas using masks and layers</li>
                <li><strong>Dodging & Burning:</strong> Add dimension with targeted lightening and darkening</li>
                <li><strong>Frequency Separation:</strong> Retouch skin while preserving texture</li>
                <li><strong>Luminosity Masks:</strong> Make precise selections based on brightness values</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Style Replication
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>Match Reference Photos:</strong> Describe a look you love and get replication steps</li>
                <li><strong>Film Emulation:</strong> Recreate specific film stocks like Portra, Ektar, or Tri-X</li>
                <li><strong>Photographer Styles:</strong> Learn techniques from famous photographers</li>
                <li><strong>Trend Recreation:</strong> Stay current with popular editing trends</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Best Practices for ChatGPT Photo Editing Prompts
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Always Work Non-Destructively</h3>
              <p className="text-gray-700 text-sm">
                Ask ChatGPT for non-destructive editing workflows using adjustment layers, smart objects,
                and history states. This allows you to refine edits without permanently altering your original image.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Request Before/After Comparisons</h3>
              <p className="text-gray-700 text-sm">
                Ask for checkpoints throughout the editing process: "After each major adjustment, I'll check
                the result." This helps catch over-editing early and maintain a natural look.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Learn the "Why" Behind Edits</h3>
              <p className="text-gray-700 text-sm">
                Don't just ask "what to do" – ask "why." Request: "Explain why we're adding teal to shadows
                and orange to highlights." Understanding the reasoning improves your skills long-term.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Specify Output Requirements</h3>
              <p className="text-gray-700 text-sm">
                Mention your final use case: "This will be printed at 16x20 inches" or "This is for Instagram."
                Different outputs require different editing approaches for optimal results.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900 mb-2">Build a Prompt Library</h3>
              <p className="text-gray-700 text-sm">
                Save your most successful prompts and ChatGPT's best responses in a document. Over time,
                you'll build a personalized library of editing techniques that work for your style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="max-w-4xl mx-auto px-4 py-12 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            More AI Prompt Generators & Tools
          </h2>
          <p className="text-gray-700 mb-6">
            Explore our other AI tools and prompt generators for creative projects:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/gemini-photo-editing-prompts"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <Wand2 className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Gemini Photo Editing Prompts</div>
                <div className="text-sm text-gray-600">Edit photos with Google Gemini AI</div>
              </div>
            </a>

            <a
              href="/ai-images-prompt"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <ImageIcon className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">AI Art Prompt Generator</div>
                <div className="text-sm text-gray-600">Create stunning AI art prompts</div>
              </div>
            </a>

            <a
              href="/midjourney-ai-picture-generator"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <Sparkles className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Midjourney AI Generator</div>
                <div className="text-sm text-gray-600">Professional Midjourney prompts</div>
              </div>
            </a>

            <a
              href="/gemini-ai-snow-prompt-tutorial"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <ImageIcon className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">Gemini Snow Portrait Tutorial</div>
                <div className="text-sm text-gray-600">Winter portrait AI generation</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
