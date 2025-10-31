import React, { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import Footer from './components/Footer';

// Nano Banana Prompts Data organized by category
const nanoBananaPrompts = {
  '3d-figurine': [
    { id: 1, prompt: "Turn a portrait photo into a 1/6 scale nano banana figurine standing on a glossy wooden base with a clear acrylic cover, capturing realistic facial details and clothing folds.", image: "turn-a-portrait-photo-into-a-1-6-scale-nano-banana-figurine.png" },
    { id: 2, prompt: "Design a nano banana 3D action figure of a superhero version of yourself, posed dynamically on a rocky base with dramatic lighting and a miniature city skyline in the background.", image: "design-a-nano-banana-3d-action-figure-of-a-superhero.png" },
    { id: 3, prompt: "Create a nano banana-themed collectible figure inside a toy box with colorful artwork, including a transparent window showing the figure posed with accessories like a tiny banana sword.", image: "create-a-nano-banana-themed-collectible-figure.png" },
    { id: 4, prompt: "Generate a nano banana character wearing futuristic armor, displayed on a rotating stand with LED lights and a holographic nameplate.", image: "generate-a-nano-banana-character-wearing-futuristic-armor.png" },
    { id: 5, prompt: "Craft a nano banana figurine as a chibi adventurer holding a staff, standing on a grassy base with tiny mushrooms and lanterns.", image: "craft-a-nano-banana-figurine-as-a-chibi-adventurer.png" },
    { id: 6, prompt: "Model a nano banana 3D sculpture of a robot chef cooking with bananas, placed on a kitchen-themed base with utensils and food details.", image: "model-a-nano-banana-3d-sculpture-of-a-robot-chef.png" },
    { id: 7, prompt: "Design a nano banana pirate figurine with a banana-shaped sword, perched on a treasure chest base surrounded by golden coins.", image: "design-a-nano-banana-pirate-figurine.png" },
    { id: 8, prompt: "Create a nano banana astronaut figure floating above a lunar surface base with a small flag and stars painted on the backdrop.", image: "create-a-nano-banana-astronaut-figure.png" },
    { id: 9, prompt: "Turn a photo of your pet into a nano banana-inspired animal figurine wearing a tiny banana hat, standing on a circular platform with engraved name.", image: "turn-a-photo-of-your-pet-into-nano-banana-figurine.png" },
    { id: 10, prompt: "Sculpt a nano banana warrior riding a dragon, captured mid-flight, with swirling clouds and flames forming the base.", image: "sculpt-a-nano-banana-warrior-riding-a-dragon.png" },
    { id: 11, prompt: "Design a nano banana mermaid figure with a shimmering tail and shell accessories, displayed on a water-themed base with clear resin waves.", image: "design-a-nano-banana-mermaid-figure.png" },
    { id: 12, prompt: "Create a nano banana steampunk inventor figurine with gears and goggles, standing next to a miniature machine on a metallic base.", image: "create-a-nano-banana-steampunk-inventor-figurine.png" }
  ],
  'plush-toy': [
    { id: 13, prompt: "Generate a close-up, warmly lit photograph of a hand-crocheted plush nano banana doll with oversized head, expressive face, visible stitching, soft pastel tones, studio background.", image: "generate-a-close-up-warmly-lit-photograph-of-plush-nano-banana.png" },
    { id: 14, prompt: "Design a nano banana plush toy as a sleepy moon creature, with embroidered stars and a crescent-shaped body, placed on a fluffy pillow background.", image: "design-a-nano-banana-plush-toy-as-sleepy-moon-creature.png" },
    { id: 15, prompt: "Create a nano banana plush dragon with tiny wings and horns, soft textured fabric, and vibrant rainbow colors, captured against a neutral backdrop.", image: "create-a-nano-banana-plush-dragon.png" },
    { id: 16, prompt: "Generate a nano banana plush robot with square body and antenna ears, featuring sewn-on buttons and metallic fabrics.", image: "generate-a-nano-banana-plush-robot.png" },
    { id: 17, prompt: "Design a nano banana plush unicorn with glittery mane, satin horn, and heart-shaped cheeks, photographed in a whimsical pastel set.", image: "design-a-nano-banana-plush-unicorn.png" },
    { id: 18, prompt: "Create a nano banana plush cat wearing pajamas, hugging a small banana pillow, in a cozy bedroom scene.", image: "create-a-nano-banana-plush-cat-wearing-pajamas.png" },
    { id: 19, prompt: "Craft a nano banana plush dinosaur with polka-dot pattern, smiling face, and felt spikes, shot on a grassy play mat.", image: "craft-a-nano-banana-plush-dinosaur.png" },
    { id: 20, prompt: "Design a nano banana plush fairy with tiny wings, floral crown, and sparkle accents, placed inside a miniature forest diorama.", image: "design-a-nano-banana-plush-fairy.png" },
    { id: 21, prompt: "Generate a nano banana plush octopus with eight adorable tentacles, big eyes, and soft velvety fabric, posed on a sandy beach.", image: "generate-a-nano-banana-plush-octopus.png" },
    { id: 22, prompt: "Create a nano banana plush penguin wearing a banana scarf, standing on a polar ice setting with soft snow textures.", image: "create-a-nano-banana-plush-penguin.png" },
    { id: 23, prompt: "Design a nano banana plush superhero with cape and mask, dynamic pose, vibrant colors, and stitched emblem on chest.", image: "design-a-nano-banana-plush-superhero.png" },
    { id: 24, prompt: "Create a nano banana plush alien with antennae, multiple eyes, and galaxy-themed fabric, floating against a starry backdrop.", image: "create-a-nano-banana-plush-alien.png" }
  ],
  'capsule-diorama': [
    { id: 25, prompt: "Transparent gashapon capsule diorama holding a nano banana-styled character, dramatic cinematic lighting, colored base matching theme, label with name or alias, photorealistic miniature collectible look.", image: "transparent-gashapon-capsule-diorama.png" },
    { id: 26, prompt: "Generate a nano banana astronaut diorama inside a clear capsule with tiny planets and stars, illuminated by internal LED.", image: "generate-a-nano-banana-astronaut-diorama.png" },
    { id: 27, prompt: "Create a nano banana fairy forest scene within a capsule, featuring miniature trees, glowing mushrooms, and a tiny fairy figure.", image: "create-a-nano-banana-fairy-forest-scene.png" },
    { id: 28, prompt: "Design a nano banana underwater world inside a transparent capsule, with a miniature mermaid, coral reefs, and bubbles.", image: "design-a-nano-banana-underwater-world.png" },
    { id: 29, prompt: "Craft a nano banana space battle diorama inside a capsule with tiny spaceships, laser beams, and asteroid terrain.", image: "craft-a-nano-banana-space-battle-diorama.png" },
    { id: 30, prompt: "Generate a nano banana circus scene inside a capsule featuring a clown figurine, miniature circus tent, and ring.", image: "generate-a-nano-banana-circus-scene.png" },
    { id: 31, prompt: "Create a nano banana Japanese garden diorama inside a capsule, complete with cherry blossom trees, koi pond, and a small bridge.", image: "create-a-nano-banana-japanese-garden-diorama.png" },
    { id: 32, prompt: "Design a nano banana Halloween-themed capsule with a witch character, pumpkins, and bats, lit by eerie purple lights.", image: "design-a-nano-banana-halloween-themed-capsule.png" },
    { id: 33, prompt: "Make a nano banana beach vacation diorama inside a capsule with a surfer figure, waves, and palm tree.", image: "make-a-nano-banana-beach-vacation-diorama.png" },
    { id: 34, prompt: "Craft a nano banana futuristic cityscape inside a capsule with skyscrapers, neon lights, and flying cars.", image: "craft-a-nano-banana-futuristic-cityscape.png" },
    { id: 35, prompt: "Create a nano banana medieval castle diorama inside a capsule, complete with knights, dragons, and a keep.", image: "create-a-nano-banana-medieval-castle-diorama.png" },
    { id: 36, prompt: "Design a nano banana spring meadow diorama inside a capsule with flowers, butterflies, and a picnic scene.", image: "design-a-nano-banana-spring-meadow-diorama.png" }
  ],
  'portrait-character': [
    { id: 37, prompt: "Generate a set of 9 half-body portraits following different poses and unique settings, each nano banana themed, rich textures, varied lighting conditions, vibrant colors.", image: "generate-a-set-of-9-half-body-portraits.png" },
    { id: 38, prompt: "Create a nano banana character portrait in anime style with big eyes, pastel color palette, and intricate hair details.", image: "create-a-nano-banana-character-portrait-anime-style.png" },
    { id: 39, prompt: "Design a photorealistic nano banana portrait of a warrior queen with elaborate armor, glowing banana symbol, and dramatic lighting.", image: "design-a-photorealistic-nano-banana-portrait-warrior-queen.png" },
    { id: 40, prompt: "Generate a nano banana-themed vintage polaroid photo of a couple in retro outfits, colors slightly faded and grainy.", image: "generate-a-nano-banana-themed-vintage-polaroid.png" },
    { id: 41, prompt: "Create a nano banana cyberpunk portrait with neon lights, reflective surfaces, and futuristic accessories.", image: "create-a-nano-banana-cyberpunk-portrait.png" },
    { id: 42, prompt: "Design a nano banana steampunk portrait featuring goggles, brass gears, and Victorian attire.", image: "design-a-nano-banana-steampunk-portrait.png" },
    { id: 43, prompt: "Generate a nano banana fantasy portrait of an elf with pointed ears, glowing eyes, and nature-inspired clothing.", image: "generate-a-nano-banana-fantasy-portrait-elf.png" },
    { id: 44, prompt: "Create a nano banana watercolor portrait of a young girl with flowing hair, gentle brush strokes, and soft color transitions.", image: "create-a-nano-banana-watercolor-portrait.png" },
    { id: 45, prompt: "Design a nano banana surrealistic portrait where the subject's hair flows into a river of bananas, blending reality and imagination.", image: "design-a-nano-banana-surrealistic-portrait.png" },
    { id: 46, prompt: "Generate a nano banana portrait of a futuristic astronaut with a reflective helmet showing a banana galaxy.", image: "generate-a-nano-banana-portrait-futuristic-astronaut.png" },
    { id: 47, prompt: "Create a nano banana noir-style portrait of a detective in a dark alley with dramatic shadows and a banana cigarette.", image: "create-a-nano-banana-noir-style-portrait.png" }
  ],
  'synthwave-retro': [
    { id: 48, prompt: "Design a nano banana high-fashion editorial portrait with minimalist background and bold banana-themed accessories.", image: "design-a-nano-banana-high-fashion-editorial-portrait.png" },
    { id: 49, prompt: "Create an image in synthwave style: neon grid, strong shadows, retro colors, nano banana image prompt style, glowing edges, dramatic reflections.", image: "create-an-image-in-synthwave-style.png" },
    { id: 50, prompt: "Generate a nano banana vaporwave collage with pastel gradients, ancient statues, and pixelated bananas.", image: "generate-a-nano-banana-vaporwave-collage.png" },
    { id: 51, prompt: "Design a nano banana 8-bit video game scene with pixel art characters collecting bananas in a retro arcade environment.", image: "design-a-nano-banana-8-bit-video-game-scene.png" },
    { id: 52, prompt: "Create a nano banana 1980s-inspired poster featuring a banana-shaped sports car driving through a neon city.", image: "create-a-nano-banana-1980s-inspired-poster.png" },
    { id: 53, prompt: "Generate a nano banana retro-futuristic landscape with chrome structures, wireframe mountains, and a giant banana sun.", image: "generate-a-nano-banana-retro-futuristic-landscape.png" },
    { id: 54, prompt: "Design a nano banana outrun-themed scene with a spaceship shaped like a banana racing along a neon-lit highway.", image: "design-a-nano-banana-outrun-themed-scene.png" },
    { id: 55, prompt: "Create a nano banana synth-pop album cover with abstract banana shapes, vibrant colors, and bold typography.", image: "create-a-nano-banana-synth-pop-album-cover.png" },
    { id: 56, prompt: "Generate a nano banana 1980s arcade cabinet design with a game about collecting bananas across cosmic levels.", image: "generate-a-nano-banana-1980s-arcade-cabinet.png" },
    { id: 57, prompt: "Design a nano banana pixelated portrait reminiscent of early computer graphics.", image: "design-a-nano-banana-pixelated-portrait.png" },
    { id: 58, prompt: "Create a nano banana poster with retro VHS aesthetic, glitch effects, and a cosmic banana hero.", image: "create-a-nano-banana-poster-retro-vhs.png" },
    { id: 59, prompt: "Generate a nano banana 1990s magazine cover featuring futuristic fashion and banana-themed patterns.", image: "generate-a-nano-banana-1990s-magazine-cover.png" }
  ],
  'fantasy-scifi': [
    { id: 60, prompt: "Design a nano banana retrowave surfing scene with waves made of neon lines and a banana surfboard.", image: "design-a-nano-banana-retrowave-surfing-scene.png" },
    { id: 61, prompt: "Replace outfit of subject in photo with fantasy armor, maintain facial identity and pose, with metallic textures and dynamic lighting, nano banana 3d figurines concept.", image: "replace-outfit-with-fantasy-armor.png" },
    { id: 62, prompt: "Create a nano banana dragon-rider scene with a hero flying on a banana-shaped dragon above fiery mountains.", image: "create-a-nano-banana-dragon-rider-scene.png" },
    { id: 63, prompt: "Generate a nano banana steampunk airship sailing through clouds with banana-shaped balloon and brass details.", image: "generate-a-nano-banana-steampunk-airship.png" },
    { id: 64, prompt: "Design a nano banana cosmic warrior wielding a glowing banana sword amidst a swirling galaxy.", image: "design-a-nano-banana-cosmic-warrior.png" },
    { id: 65, prompt: "Create a nano banana futuristic city with floating banana-shaped skyscrapers and flying cars.", image: "create-a-nano-banana-futuristic-city.png" },
    { id: 66, prompt: "Generate a nano banana underwater kingdom with mermaids, sea creatures, and luminous banana coral.", image: "generate-a-nano-banana-underwater-kingdom.png" },
    { id: 67, prompt: "Design a nano banana enchanted forest with giant banana trees, glowing fairies, and mystical creatures.", image: "design-a-nano-banana-enchanted-forest.png" },
    { id: 68, prompt: "Create a nano banana desert sci-fi scene with a lone traveller and a giant banana monolith under twin suns.", image: "create-a-nano-banana-desert-scifi-scene.png" },
    { id: 69, prompt: "Generate a nano banana space exploration scene with astronauts discovering a banana-shaped asteroid.", image: "generate-a-nano-banana-space-exploration-scene.png" },
    { id: 70, prompt: "Design a nano banana dystopian landscape with banana-shaped towers and a dark, moody atmosphere.", image: "design-a-nano-banana-dystopian-landscape.png" },
    { id: 71, prompt: "Create a nano banana cyber-dragon with mechanical wings, glowing circuits, and banana-inspired armor.", image: "create-a-nano-banana-cyber-dragon.png" },
    { id: 72, prompt: "Generate a nano banana fairy tale castle built from bananas, surrounded by talking animals and magical lights.", image: "generate-a-nano-banana-fairy-tale-castle.png" }
  ],
  'photo-editing': [
    { id: 73, prompt: "Change the weather in a landscape photo to a foggy sunrise, subject remains same, light diffused, mood evocative, nano banana image prompt theme.", image: "change-weather-to-foggy-sunrise.png" },
    { id: 74, prompt: "Turn a black-and-white photo into a colorful nano banana-themed image with vibrant hues and soft gradients.", image: "turn-black-and-white-photo-into-colorful-nano-banana.png" },
    { id: 75, prompt: "Replace the background of a portrait with a nano banana jungle scene filled with giant banana leaves and warm light.", image: "replace-background-with-nano-banana-jungle.png" },
    { id: 76, prompt: "Add a glowing halo of floating bananas around the subject's head in a photo, creating a whimsical aura.", image: "add-glowing-halo-of-floating-bananas.png" },
    { id: 77, prompt: "Convert a nighttime city photograph into a neon banana dreamscape with yellow and magenta tones.", image: "convert-nighttime-city-to-neon-banana-dreamscape.png" },
    { id: 78, prompt: "Edit a beach photo to include a banana-shaped surfboard and banana peel footprints in the sand.", image: "edit-beach-photo-banana-surfboard.png" },
    { id: 79, prompt: "Replace the sky in a landscape image with a swirling galaxy containing banana constellations.", image: "replace-sky-with-banana-galaxy.png" },
    { id: 80, prompt: "Add realistic banana butterflies fluttering around the subject in a garden photo.", image: "add-realistic-banana-butterflies.png" },
    { id: 81, prompt: "Adjust lighting in a studio portrait to cast banana-shaped shadows on the background.", image: "adjust-lighting-banana-shaped-shadows.png" },
    { id: 82, prompt: "Insert a tiny nano banana spaceship hovering above a city skyline at dusk.", image: "insert-tiny-nano-banana-spaceship.png" },
    { id: 83, prompt: "Colorize an old family photo with subtle nano banana hues and retro pastel tones.", image: "colorize-old-photo-nano-banana-hues.png" },
    { id: 84, prompt: "Add snow and banana-themed ornaments to a summer landscape to transform it into a nano banana winter wonderland.", image: "add-snow-banana-ornaments-winter-wonderland.png" }
  ],
  'social-media': [
    { id: 85, prompt: "Create a series of nano banana avatar icons for social media, each with different expressions and accessories.", image: "create-nano-banana-avatar-icons.png" },
    { id: 86, prompt: "Design a nano banana logo for a gaming channel, combining a stylized banana with futuristic typography.", image: "design-nano-banana-logo-gaming-channel.png" },
    { id: 87, prompt: "Generate a nano banana-themed promotional poster for a music festival, featuring abstract banana graphics and bold fonts.", image: "generate-nano-banana-promotional-poster.png" },
    { id: 88, prompt: "Create a nano banana badge design for a community forum with minimalist banana and star elements.", image: "create-nano-banana-badge-design.png" },
    { id: 89, prompt: "Design a set of nano banana stickers for messaging apps, each depicting a different mood or activity.", image: "design-nano-banana-stickers.png" },
    { id: 90, prompt: "Generate a nano banana-infused brand style guide, including color palette, patterns, and iconography.", image: "generate-nano-banana-brand-style-guide.png" },
    { id: 91, prompt: "Create a nano banana cover photo for a tech blog, featuring a futuristic landscape and subtle banana motifs.", image: "create-nano-banana-cover-photo-tech-blog.png" },
    { id: 92, prompt: "Design a nano banana-themed YouTube thumbnail template with energetic colors and playful banana icons.", image: "design-nano-banana-youtube-thumbnail.png" },
    { id: 93, prompt: "Generate a series of nano banana Instagram story backgrounds with gradient colors and doodle bananas.", image: "generate-nano-banana-instagram-story-backgrounds.png" },
    { id: 94, prompt: "Create a nano banana-themed business card design with modern typography and a sleek banana logo.", image: "create-nano-banana-business-card.png" },
    { id: 95, prompt: "Design a nano banana merchandise mockup showing t-shirts and mugs with banana-themed graphics.", image: "design-nano-banana-merchandise-mockup.png" },
    { id: 96, prompt: "Generate a nano banana Twitch overlay design with dynamic frames, animated bananas, and neon accents.", image: "generate-nano-banana-twitch-overlay.png" }
  ]
};

const categoryInfo = {
  'all': { label: 'All Prompts', icon: '🎨', color: 'blue' },
  '3d-figurine': { label: '3D Figurine Design', icon: '🗿', color: 'purple' },
  'plush-toy': { label: 'Plush Toy', icon: '🧸', color: 'pink' },
  'capsule-diorama': { label: 'Capsule Diorama', icon: '💊', color: 'indigo' },
  'portrait-character': { label: 'Portrait & Character', icon: '👤', color: 'rose' },
  'synthwave-retro': { label: 'Synthwave/Retro & Styles', icon: '🌆', color: 'cyan' },
  'fantasy-scifi': { label: 'Fantasy & Sci-Fi', icon: '🚀', color: 'violet' },
  'photo-editing': { label: 'Photo Editing & Enhancement', icon: '✨', color: 'amber' },
  'social-media': { label: 'Social Media & Branding', icon: '📱', color: 'emerald' }
};

const NanoBananaPromptsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const promptsPerPage = 12;

  // Get all prompts for the selected category
  const filteredPrompts = useMemo(() => {
    let prompts = [];
    if (selectedCategory === 'all') {
      Object.values(nanoBananaPrompts).forEach(categoryPrompts => {
        prompts = [...prompts, ...categoryPrompts];
      });
    } else {
      prompts = nanoBananaPrompts[selectedCategory] || [];
    }

    if (searchTerm) {
      prompts = prompts.filter(p =>
        p.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return prompts;
  }, [selectedCategory, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPrompts.length / promptsPerPage);
  const paginatedPrompts = useMemo(() => {
    const startIndex = (currentPage - 1) * promptsPerPage;
    return filteredPrompts.slice(startIndex, startIndex + promptsPerPage);
  }, [filteredPrompts, currentPage, promptsPerPage]);

  // Reset to page 1 when category or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Helper Functions
  const generatePrompt = useCallback(() => {
    if (filteredPrompts.length === 0) return;

    const randomPrompt = filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)];
    const promptWithId = {
      ...randomPrompt,
      timestamp: new Date().toISOString(),
    };

    setGeneratedPrompt(promptWithId);
    setPromptHistory(prev => [promptWithId, ...prev.slice(0, 19)]);
  }, [filteredPrompts]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt) => {
    setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  };

  const toggleFavorite = (prompt) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true }]);
    }
  };

  const sharePrompt = async (prompt) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nano Banana Prompt',
          text: prompt.prompt,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(`${prompt.prompt}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.prompt}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nano-banana-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <Helmet>
        <title>Nano Banana Prompts - Creative AI Image Generation Ideas for Nano Banana Art</title>
        <meta name="description" content="Dive into whimsical nano banana AI art with 96+ curated prompts. Transform tiny bananas into adorable 3D figurines, collectible plush toys, intricate capsule dioramas, and retro synthwave masterpieces. Quirky nano banana prompts that make AI image generation delightfully fun." />
        <meta name="keywords" content="nano banana prompts, nano banana AI prompts, AI image generation prompts, 3D figurine prompts, plush toy prompts, capsule diorama prompts, synthwave prompts, AI art prompts" />
        <link rel="canonical" href="https://randomprompts.org/nano-banana-prompts" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Nano Banana Prompts - Creative AI Image Generation Ideas" />
        <meta property="og:description" content="Whimsical nano banana AI art with 96+ prompts. Transform tiny bananas into 3D figurines, plush toys, capsule dioramas & synthwave masterpieces." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomprompts.org/nano-banana-prompts" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nano Banana Prompts - Creative AI Image Generation Ideas" />
        <meta name="twitter:description" content="Adorable nano banana AI art! 96+ prompts for 3D figurines, plush toys, capsule dioramas & synthwave. Quirky AI image generation fun!" />
      </Helmet>

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nano Banana Prompts
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore 96+ creative nano banana prompts for AI image generation across 8 unique categories. From 3D figurines to plush toys, capsule dioramas to synthwave art - find the perfect prompt for your next creative project.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link
            to="/writing-prompts"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <PenTool size={18} />
            Writing
          </Link>
          <Link
            to="/ai-images-prompt"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path>
              <path d="M5 6v4"></path>
              <path d="M19 14v4"></path>
              <path d="M10 2v2"></path>
              <path d="M7 8H3"></path>
              <path d="M21 16h-4"></path>
              <path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link
            to="/ai-blog-post-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <BookOpen size={18} />
            Blog post
          </Link>
          <Link
            to="/short-story-prompts-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Crown size={18} />
            Short stories
          </Link>
          <Link
            to="/random-name-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Sparkles size={18} />
            Names
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(categoryInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {info.icon} {info.label}
                </button>
              ))}
            </div>
          </div>

          {/* History Panel */}
          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Prompts</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent prompts. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{prompt.prompt}</p>
                          <span className="text-xs text-gray-400 mt-1 inline-block">
                            {new Date(prompt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.prompt)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => toggleFavorite(prompt)}
                            className={`p-1 transition-colors ${
                              favorites.some(fav => fav.id === prompt.id)
                                ? 'text-yellow-600 hover:text-yellow-700'
                                : 'text-gray-400 hover:text-yellow-600'
                            }`}
                            title="Favorite"
                          >
                            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Prompts Display */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {selectedCategory === 'all' ? 'All Nano Banana Prompts' : `${categoryInfo[selectedCategory].label} Prompts`}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedPrompts.map((prompt) => (
                <div key={prompt.id} className="bg-white border border-yellow-200 rounded-lg p-4 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
                  <div className="w-full h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-4xl">🍌</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed flex-1 mb-3 line-clamp-4">{prompt.prompt}</p>
                  <button
                    onClick={() => copyToClipboard(prompt.prompt)}
                    className="w-full py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm transition-colors flex items-center justify-center gap-2"
                    title="Copy prompt"
                  >
                    <Copy size={14} />
                    Copy Prompt
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* Generate Button */}
            <div className="text-center mt-12 mb-8">
              <button
                onClick={generatePrompt}
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 hover:from-yellow-600 hover:via-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Generate Random Nano Banana Prompt
              </button>
            </div>

            {/* Generated Prompt Card */}
            {generatedPrompt && (
              <div className="bg-white border-2 border-yellow-300 rounded-lg p-6 shadow-xl mb-8">
                <div className="mb-4">
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4 overflow-hidden">
                    <div className="text-6xl">🍌</div>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed">{generatedPrompt.prompt}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => copyToClipboard(generatedPrompt.prompt)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                  <button
                    onClick={() => savePrompt(generatedPrompt)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"
                  >
                    <Save size={14} />
                    Save
                  </button>
                  <button
                    onClick={() => toggleFavorite(generatedPrompt)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      favorites.some(fav => fav.id === generatedPrompt.id)
                        ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Star size={14} fill={favorites.some(fav => fav.id === generatedPrompt.id) ? 'currentColor' : 'none'} />
                    Favorite
                  </button>
                  <button
                    onClick={() => sharePrompt(generatedPrompt)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                  <button
                    onClick={generatePrompt}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md text-sm transition-colors"
                  >
                    <RefreshCw size={14} />
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved Prompts Section */}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Prompts</h3>
                <button
                  onClick={exportPrompts}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt) => (
                  <div key={prompt.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800">{prompt.prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Links */}
          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">More Prompt Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/ai-images-prompt" className="text-yellow-600 hover:underline flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                  <path d="m14 7 3 3"></path>
                  <path d="M5 6v4"></path>
                  <path d="M19 14v4"></path>
                  <path d="M10 2v2"></path>
                  <path d="M7 8H3"></path>
                  <path d="M21 16h-4"></path>
                  <path d="M11 3H9"></path>
                </svg>
                AI Images Prompt Generator
              </Link>
              <Link to="/writing-prompts" className="text-yellow-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/ghostface-ai-trend-prompt-generator" className="text-yellow-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Ghostface AI Trend Prompts
              </Link>
              <Link to="/short-story-prompts-generator" className="text-yellow-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompt Generator
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white py-16 mt-16 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the nano banana prompt generator?</h3>
                <p className="text-gray-700">
                  This tool helps you automatically generate detailed and creative prompts related to nano banana for AI-image generation, 3D modeling, collectibles, and artwork.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How can I achieve the best results with my nano banana images?</h3>
                <p className="text-gray-700">
                  Focus on clear subject descriptions combined with specific style keywords, lighting conditions, poses, and accessories. For example, use terms like "soft plush toy", "chibi doll", "transparent capsule", or "studio lighting" to create more precise and compelling artwork.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I create 3D figurine designs with these prompts?</h3>
                <p className="text-gray-700">
                  Absolutely! Our prompts include detailed specifications for scale (1/7, 1/6), materials (acrylic, plush, metal), base designs, packaging concepts, and lighting setups—perfect for designing collectible 3D figurines.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Does this cost anything to use?</h3>
                <p className="text-gray-700">
                  No, the core functionality is completely free to use.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What can I do with the generated prompts?</h3>
                <p className="text-gray-700">
                  Use them in popular AI image tools like MidJourney, Stable Diffusion, DALL·E, or Nano Banana AI editor. They're also valuable for 3D modeling projects, packaging mockups, collectible design, and branding work.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NanoBananaPromptsPage;
