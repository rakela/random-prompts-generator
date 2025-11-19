import React, { useState } from 'react';
import { Copy, Check, Sparkles, Image as ImageIcon, BookOpen, Lightbulb, Zap } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import SEO from './components/SEO';

export default function GeminiPhotoEditingPromptsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const prompts = [
    {
      title: "AI Portrait Transformation",
      description: "Transform portraits with AI-powered enhancements and artistic effects",
      prompt: "Transform this portrait with professional AI enhancements: Apply natural skin smoothing while preserving texture and pores. Enhance eye brightness and add subtle catchlights. Perfect the lighting to create a soft, flattering glow from the front-left direction. Slightly blur the background using depth-of-field effect to isolate the subject. Adjust colors for warm, natural skin tones. Fix any minor blemishes or distractions. Add subtle contrast and clarity to make features pop. Keep all edits photorealistic and natural-looking, avoiding the over-processed appearance.",
      tags: ["Portrait", "AI Enhancement", "Natural", "Professional"],
      bestFor: "Profile photos, professional headshots, social media, dating profiles"
    },
    {
      title: "Artistic Style Transfer",
      description: "Apply artistic painting styles while maintaining photo characteristics",
      prompt: "Apply an artistic style transformation to this photo: Transform the image with impressionist painting characteristics, similar to Monet's style, while keeping the main subject recognizable. Use visible brushstroke textures and soften edges. Enhance colors to be more vibrant and saturated, with particular emphasis on blues, purples, and warm golden tones. Blend colors together naturally as if painted with oils. Keep the subject's facial features clear and identifiable, but give the background and surroundings a dreamy, painted quality. Balance between artistic interpretation and photographic realism.",
      tags: ["Artistic", "Style Transfer", "Impressionist", "Creative"],
      bestFor: "Artistic portraits, creative projects, wall art, unique social media content"
    },
    {
      title: "HDR Landscape Enhancement",
      description: "Create stunning HDR landscape photos with enhanced dynamic range",
      prompt: "Enhance this landscape photo with HDR processing: Recover detail in both highlights and shadows to create balanced exposure throughout. Enhance sky drama by increasing cloud definition and adding depth to blue tones. Boost color vibrancy in natural elements—greens should be rich, blues deep and saturated. Add clarity and texture to foreground elements like rocks, grass, and trees. Implement graduated toning from sky to ground. Increase sharpness and microcontrast for enhanced detail. Add slight warmth to sunlit areas while keeping shadows cool. Create depth and dimension while maintaining natural, believable appearance. Avoid haloing or over-processing artifacts.",
      tags: ["Landscape", "HDR", "Nature", "Dynamic Range"],
      bestFor: "Travel photography, landscape prints, nature portfolios, scenic wallpapers"
    },
    {
      title: "Vintage Photo Restoration & Aging",
      description: "Either restore old photos or add authentic vintage effects to modern images",
      prompt: "Apply vintage photo aging effects with authentic characteristics: Add sepia or warm-toned color grading reminiscent of 1960s-70s photography. Introduce fine film grain texture throughout. Create slight fading in colors, particularly in shadows. Add subtle vignetting around edges. Include minor imperfections like slight light leaks, dust specks, or corner darkening to simulate aged film. Reduce overall contrast slightly for that faded, nostalgic appearance. Add slight color shifts—push yellows toward orange and blues toward teal. Soften overall sharpness to mimic older lens characteristics. Result should authentically replicate vintage film photography from 50+ years ago.",
      tags: ["Vintage", "Retro", "Sepia", "Nostalgic"],
      bestFor: "Nostalgic projects, retro aesthetics, artistic portfolios, throwback posts"
    },
    {
      title: "Professional Product Photography Edit",
      description: "Create clean, professional product photos perfect for e-commerce",
      prompt: "Edit this product photo for professional e-commerce use: Remove or replace the background with pure white (255, 255, 255) for clean presentation. Enhance product colors to be accurate and vibrant without oversaturation. Eliminate any dust, scratches, or imperfections on the product surface. Add subtle shadow beneath the product for grounding and dimension. Enhance lighting to be bright and even, eliminating harsh shadows or hotspots. Sharpen product details and textures so materials are clearly visible. Adjust perspective to ensure the product looks straight and professionally composed. Enhance metallic or reflective surfaces to show appropriate shine. Final result should meet marketplace standards for Amazon, Etsy, or professional catalogs.",
      tags: ["Product", "E-commerce", "Professional", "Commercial"],
      bestFor: "Online stores, product catalogs, marketplace listings, commercial photography"
    },
    {
      title: "Dramatic Black and White Conversion",
      description: "Create powerful monochrome images with rich tonal range and contrast",
      prompt: "Convert this photo to dramatic black and white with professional tonal control: Create rich, deep blacks and bright, detailed whites with full tonal range in between. Enhance contrast significantly to create visual impact and depth. Use dodging and burning techniques to sculpt light and shadow, adding dimension to the subject. Increase texture and clarity to emphasize details, particularly in skin, fabric, and architectural elements. Apply subtle grain for a classic film photography aesthetic. Enhance separation between subject and background through contrast and tonal adjustments. Pay special attention to eyes, making them bright and captivating. Create emotional impact through strategic use of light and shadow. The result should feel timeless, powerful, and artistically compelling.",
      tags: ["Black & White", "Monochrome", "Dramatic", "Artistic"],
      bestFor: "Fine art photography, portrait artistry, emotional storytelling, classic aesthetics"
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 dark:from-gray-900 via-cyan-50 dark:via-gray-800 to-blue-50 dark:to-gray-900">
      <SEO pageKey="geminiPhotoEditingPrompts" />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 dark:from-cyan-400/5 via-blue-500/10 dark:via-blue-400/5 to-indigo-600/10 dark:to-indigo-400/5"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full mb-6">
              <Zap className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-900">Google Gemini AI Photo Editing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Gemini Photo Editing Prompts
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Harness the power of Google Gemini AI for professional photo editing.
              Expert prompts and tutorials for stunning image transformations.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Why Use Gemini AI for Photo Editing?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Google's Gemini AI brings advanced multimodal capabilities to photo editing, combining
                powerful image understanding with natural language processing. Whether you're editing
                with AI-powered tools or getting expert guidance for manual editing, Gemini excels
                at providing detailed, professional-quality editing instructions.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Gemini can analyze your photos, understand context, and provide tailored editing advice
                that considers lighting, composition, subject matter, and artistic intent. For AI editing
                tools that accept text prompts, Gemini's suggestions can be directly applied for
                instant professional results.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This page provides six professional photo editing prompt templates optimized for Gemini AI,
                covering everything from portrait enhancement to artistic transformations. Each template
                is crafted for clarity and maximum effectiveness with Google's AI technology.
              </p>
            </div>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 rounded-r-lg">
            <h3 className="font-bold text-lg text-cyan-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Pro Tips for Gemini Photo Editing Prompts
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span><strong>Upload your image first:</strong> Gemini can analyze your actual photo and provide contextual advice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span><strong>Use descriptive language:</strong> Gemini understands nuanced descriptions like "soft golden-hour glow" or "moody cinematic tones"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span><strong>Specify your skill level:</strong> Tell Gemini if you're a beginner or advanced user for appropriately detailed guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span><strong>Ask for software-specific steps:</strong> Request instructions for your exact editing tool (Photoshop, Lightroom, GIMP, Snapseed, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span><strong>Request explanations:</strong> Ask "why" behind each edit to improve your understanding of photo editing principles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span><strong>Iterate with feedback:</strong> Show Gemini your edited result and ask for refinement suggestions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Prompts Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            6 Professional Gemini Photo Editing Prompts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Copy these prompts and use them with Gemini AI for professional photo editing guidance
          </p>
        </div>

        <div className="space-y-8">
          {prompts.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transition-colors"
            >
              <div className="p-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-cyan-100 rounded-full text-xs font-medium text-cyan-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PROMPT:</span>
                    <button
                      onClick={() => copyToClipboard(item.prompt, index)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium"
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

                <div className="bg-cyan-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-cyan-900 mb-1">
                    Best For:
                  </p>
                  <p className="text-sm text-cyan-700">
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            How to Use These Prompts with Gemini AI
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Access Gemini AI
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit <a href="https://gemini.google.com" className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">gemini.google.com</a> and
                  sign in with your Google account. Gemini's advanced model (Gemini Advanced) offers enhanced
                  image understanding capabilities, though the free version works well for most editing guidance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Upload Your Photo
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click the image upload button in Gemini's chat interface and upload the photo you want
                  to edit. Gemini will analyze the image and provide contextual editing advice based on
                  the actual content, lighting, composition, and subject matter of your photo.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Paste Your Editing Prompt
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Copy one of the prompt templates above and paste it into Gemini's chat. Customize the
                  prompt based on your specific needs. For example, you might add: "I'm using Adobe Lightroom"
                  or "I want this for Instagram" to get more tailored advice.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Review Gemini's Analysis & Guidance
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Gemini will provide detailed editing instructions tailored to your specific image. It may
                  identify issues you hadn't noticed (like slight color casts or composition problems) and
                  suggest specific adjustments with reasoning behind each recommendation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Apply Edits in Your Software
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Take Gemini's guidance and apply the edits in your chosen software (Photoshop, Lightroom,
                  GIMP, Snapseed, etc.). If you're using an AI editing tool that accepts text prompts,
                  you can often use Gemini's suggestions directly as editing instructions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Get Feedback and Refine
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Upload your edited result back to Gemini and ask: "How does this look? What could be
                  improved?" Gemini can compare the before and after, identify any issues (like over-processing
                  or unnatural colors), and suggest refinements to perfect your edit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tips Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-blue-50 dark:from-gray-800 to-cyan-50 dark:to-gray-700 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Advanced Gemini Photo Editing Techniques
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Contextual Analysis
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Scene Understanding:</strong> Gemini can identify the scene type and suggest appropriate edits</li>
                <li><strong>Lighting Assessment:</strong> Get analysis of current lighting and how to improve it</li>
                <li><strong>Composition Advice:</strong> Receive suggestions for cropping and reframing</li>
                <li><strong>Subject Recognition:</strong> Gemini identifies subjects and provides targeted editing advice</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Style Matching
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Reference Matching:</strong> Upload a reference photo and ask Gemini to match the style</li>
                <li><strong>Artist Emulation:</strong> Request editing in the style of famous photographers</li>
                <li><strong>Trend Analysis:</strong> Ask about current photo editing trends and how to achieve them</li>
                <li><strong>Brand Consistency:</strong> Get advice for maintaining consistent aesthetic across photos</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Technical Problem Solving
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Exposure Issues:</strong> Fix underexposed, overexposed, or unbalanced lighting</li>
                <li><strong>Color Correction:</strong> Correct color casts, white balance problems, and skin tones</li>
                <li><strong>Noise & Grain:</strong> Balance noise reduction with detail preservation</li>
                <li><strong>Sharpness Recovery:</strong> Rescue slightly out-of-focus images when possible</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Workflow Optimization
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Batch Editing:</strong> Get consistent editing approaches for photo series</li>
                <li><strong>Preset Creation:</strong> Ask for preset values to replicate looks across photos</li>
                <li><strong>Efficiency Tips:</strong> Learn keyboard shortcuts and workflow optimizations</li>
                <li><strong>Quality Control:</strong> Get checklists for ensuring consistent quality</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Good Prompts Guide */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            How to Write Effective Photo Editing Prompts for Gemini
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">1. Start with Context</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Always begin by describing your photo and your editing goals:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-600">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "I have a portrait photo taken outdoors during golden hour. The subject is backlit,
                  causing their face to be too dark. I want to brighten the face while maintaining the
                  warm, glowing atmosphere of the backlight. I'm using Lightroom."
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">2. Be Specific About Adjustments</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Use precise language about what you want changed:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold text-red-600 mb-1">❌ Vague:</p>
                    <p className="text-gray-700 dark:text-gray-300">"Make it look better"</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-600 mb-1">✅ Specific:</p>
                    <p className="text-gray-700 dark:text-gray-300">"Increase exposure by 0.5 stops, add +20 to shadows, and apply +10 vibrance"</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">3. Define Your Desired Style</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Use style references that Gemini can understand:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-600">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "I want a moody, cinematic look similar to the TV show 'Euphoria'—high contrast,
                  heavy teal and orange color grading, with dramatic lighting and slightly desaturated midtones."
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">4. Mention Your Constraints</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Tell Gemini about any limitations or requirements:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">→</span>
                    <span>"I'm a beginner, so please explain each step simply"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">→</span>
                    <span>"This is for print, so I need to preserve maximum detail"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">→</span>
                    <span>"I only have access to free mobile apps like Snapseed"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">→</span>
                    <span>"I need this to match my brand's visual style (warm, minimal, natural)"</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">5. Ask for Reasoning</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Request explanations to improve your skills:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-600">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "Please explain why each adjustment is necessary and how it improves the image.
                  I want to understand the principles so I can apply them to future photos."
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3">6. Request Structure</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Ask for organized, actionable responses:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  "Please provide your editing guidance in this format:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                  <li>Initial analysis of the photo's strengths and weaknesses</li>
                  <li>Step-by-step editing instructions with specific values</li>
                  <li>Before/after comparison points to check progress</li>
                  <li>Common mistakes to avoid</li>
                  <li>Alternative approaches I could try"</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Common Photo Editing Scenarios with Gemini
          </h2>

          <div className="space-y-4">
            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:text-cyan-600">
                "My photo is too dark/bright"
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-6">
                Ask Gemini: "This photo is underexposed. Please analyze which areas need brightening
                and provide specific exposure, shadows, highlights, and whites adjustments. Also suggest
                whether I should use graduated filters or localized adjustments for different areas."
              </p>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:text-cyan-600">
                "The colors look wrong/unnatural"
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-6">
                Ask Gemini: "The white balance in this photo seems off—there's an orange/yellow cast.
                What temperature and tint adjustments should I make? Should I also adjust individual
                color channels in the HSL panel? Please analyze skin tones to ensure they remain natural."
              </p>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:text-cyan-600">
                "I want to replicate a specific style"
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-6">
                Upload a reference photo and ask: "I want my photo to have a similar look to this reference
                image. Please analyze the color grading, contrast, and tonal characteristics of the reference,
                then provide step-by-step instructions to achieve this style on my photo."
              </p>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:text-cyan-600">
                "My subject doesn't stand out enough"
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-6">
                Ask Gemini: "The subject in this photo blends too much with the background. How can I
                create better separation? Should I use selective sharpening, luminosity adjustments,
                color contrast, or background blurring? Please suggest the most effective approach for this specific image."
              </p>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:text-cyan-600">
                "I want to remove distractions/objects"
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-6">
                Ask Gemini: "There are distracting elements in this photo [describe what they are and where].
                What's the best approach to remove them? Should I use content-aware fill, clone stamp, or
                another technique? Please provide step-by-step instructions for my editing software."
              </p>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:text-cyan-600">
                "I want to enhance but keep it natural"
              </summary>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-6">
                Ask Gemini: "I want to enhance this photo while keeping it completely natural and realistic—
                no over-processed look. Please suggest subtle adjustments that improve the image without
                making it obvious that editing was done. Include specific value ranges to stay within natural limits."
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="max-w-4xl mx-auto px-4 py-12 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            More AI Prompt Tools & Tutorials
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Explore our collection of AI tools and tutorials for creative projects:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/chatgpt-photo-editing-prompts"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 dark:from-gray-800 to-pink-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <ImageIcon className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">ChatGPT Photo Editing Prompts</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Edit photos with ChatGPT guidance</div>
              </div>
            </a>

            <a
              href="/gemini-ai-snow-prompt-tutorial"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 dark:from-gray-800 to-cyan-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <Sparkles className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Gemini Snow Portrait Tutorial</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Create stunning winter portraits</div>
              </div>
            </a>

            <a
              href="/ai-images-prompt"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 dark:from-gray-800 to-purple-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <ImageIcon className="w-6 h-6 text-indigo-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">AI Art Prompt Generator</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Generate AI art prompts</div>
              </div>
            </a>

            <a
              href="/midjourney-ai-picture-generator"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 dark:from-gray-800 to-purple-50 dark:to-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <Sparkles className="w-6 h-6 text-pink-600" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Midjourney AI Prompts</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Professional Midjourney prompts</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
