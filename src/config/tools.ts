import type { ToolConfig } from '../types/workflow';

// Tool 1: YouTube Content Brief Generator
export const youtubeContentBriefTool: ToolConfig = {
  tool_id: "youtube-content-brief",
  seo_title: "YouTube Video Script & Outline Generator | Free Content Brief",
  seo_description: "Stop staring at a blank page. Generate data-backed YouTube video outlines, hooks, and call-to-action scripts in seconds.",
  category: "YouTube Tools",
  inputs: [
    {
      id: "youtube_url",
      label: "YouTube Video URL",
      type: "url",
      placeholder: "https://www.youtube.com/watch?v=...",
      required: true,
      help_text: "Enter the full YouTube video URL"
    },
    {
      id: "video_title",
      label: "Video Title (Optional)",
      type: "text",
      placeholder: "Enter video title if known",
      required: false,
      help_text: "Helps provide better context for the brief"
    },
    {
      id: "target_audience",
      label: "Target Audience",
      type: "select",
      required: true,
      options: [
        "General Public",
        "Business Professionals",
        "Developers & Engineers",
        "Content Creators",
        "Marketers",
        "Students",
        "Entrepreneurs"
      ],
      default: "General Public"
    },
    {
      id: "primary_goal",
      label: "Primary Goal",
      type: "select",
      required: true,
      options: [
        "Educational Content",
        "Lead Generation",
        "Brand Awareness",
        "Thought Leadership",
        "Community Engagement"
      ],
      default: "Educational Content"
    },
    {
      id: "language",
      label: "Output Language",
      type: "select",
      required: true,
      options: ["English", "Spanish", "French", "German", "Portuguese"],
      default: "English"
    }
  ],
  system_prompt: `You are an expert content strategist specializing in video content analysis and repurposing.

Your task is to analyze the provided YouTube video transcript and create a comprehensive content brief.

**Input Parameters:**
- Video URL: {youtube_url}
- Video Title: {video_title}
- Target Audience: {target_audience}
- Primary Goal: {primary_goal}
- Language: {language}

**Instructions:**
1. Analyze the video transcript carefully
2. Extract the main themes, key points, and insights
3. Identify the core message and value proposition
4. Structure your output as a professional content brief

**Output Format (Markdown):**

# Content Brief: [Video Title]

## 📊 Overview
- **Target Audience:** {target_audience}
- **Primary Goal:** {primary_goal}
- **Video URL:** {youtube_url}

## 🎯 Key Themes
[List 3-5 main themes from the video]

## 💡 Core Insights
[List 5-8 key takeaways, insights, or lessons from the video]

## 📝 Main Talking Points
[Detailed breakdown of the video's main points in logical order]

## 🎬 Actionable Takeaways
[3-5 actionable items viewers can implement]

## 🔑 Keywords & Topics
[List relevant keywords and topics covered]

## 💭 Content Angle Suggestions
[Suggest 2-3 angles for repurposing this content]

---
**Note:** This brief is designed for content repurposing into blog posts, social media, and other formats.

Please provide the brief in {language}.`
};

// Tool 2: YouTube Blog Post Generator
export const youtubeBlogPostTool: ToolConfig = {
  tool_id: "youtube-blog-post-generator",
  seo_title: "YouTube to Blog Post Converter | AI Article Writer - RandomPrompts",
  seo_description: "Convert YouTube videos into SEO-optimized blog posts in seconds. Our AI extracts transcripts and formats them into high-quality articles.",
  category: "YouTube Tools",
  inputs: [
    {
      id: "youtube_url",
      label: "YouTube Video URL",
      type: "url",
      placeholder: "https://www.youtube.com/watch?v=...",
      required: true,
      help_text: "Enter the full YouTube video URL"
    },
    {
      id: "video_title",
      label: "Video Title (Optional)",
      type: "text",
      placeholder: "Enter video title if known",
      required: false,
      help_text: "Optional - helps provide better context"
    },
    {
      id: "content_brief",
      label: "Content Brief (Optional)",
      type: "textarea",
      placeholder: "Paste content brief if you already have one...",
      required: false,
      help_text: "Optional - if you generated a brief separately, paste it here"
    },
    {
      id: "desired_length",
      label: "Desired Length",
      type: "select",
      required: true,
      options: [
        "500-750 words (Quick Read)",
        "1,000-1,500 words (Standard)",
        "1,500-2,500 words (In-depth)",
        "2,500+ words (Comprehensive Guide)"
      ],
      default: "1,000-1,500 words (Standard)"
    },
    {
      id: "tone",
      label: "Tone",
      type: "select",
      required: true,
      options: [
        "Professional",
        "Conversational",
        "Educational",
        "Inspirational",
        "Technical"
      ],
      default: "Conversational"
    },
    {
      id: "include_cta",
      label: "Include Call-to-Action",
      type: "select",
      required: true,
      options: ["Yes", "No"],
      default: "Yes"
    },
    {
      id: "language",
      label: "Output Language",
      type: "select",
      required: true,
      options: ["English", "Spanish", "French", "German", "Portuguese"],
      default: "English"
    }
  ],
  system_prompt: `You are an expert content writer specializing in transforming video content into engaging blog posts.

**Input Parameters:**
- YouTube URL: {youtube_url}
- Video Title: {video_title}
- Content Brief: {content_brief}
- Desired Length: {desired_length}
- Tone: {tone}
- Include CTA: {include_cta}
- Language: {language}

**Instructions:**
1. Analyze the YouTube video transcript from {youtube_url}
2. If a content brief is provided, use it as additional context
3. Write a complete blog post based on the video content
4. Use the specified tone: {tone}
5. Target length: {desired_length}
6. Structure with clear headings (H2, H3)
7. Include an engaging introduction and conclusion
8. Add relevant examples and insights from the video
9. Make it SEO-friendly with natural keyword usage
10. If {include_cta} is "Yes", add a soft call-to-action at the end

**Output Format:**
Write the blog post in HTML format with proper semantic tags:
- Use <h1> for the main title
- Use <h2> and <h3> for section headings
- Use <p> for paragraphs
- Use <ul> and <li> for bullet lists
- Use <ol> and <li> for numbered lists
- Use <strong> for emphasis
- Use <blockquote> for quotes

Example structure:
<h1>Compelling Title</h1>
<p>Introduction paragraph...</p>
<h2>Section Heading</h2>
<p>Content paragraph...</p>
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

Write the entire blog post in {language}.

**Important:**
1. Focus on delivering value, maintaining readability, and creating content that stands alone even without watching the video
2. At the end of the post, add an attribution paragraph:
<p><em>This content was generated using <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a> - AI-powered content creation tools.</em></p>`
};

// Tool 3: YouTube LinkedIn Post Generator
export const youtubeLinkedInPostTool: ToolConfig = {
  tool_id: "youtube-linkedin-post-generator",
  seo_title: "YouTube to LinkedIn Post Generator | Viral Hook Writer",
  seo_description: "Generate high-engagement LinkedIn posts from your YouTube videos. Create threads, carousels, and thought leadership posts instantly.",
  category: "YouTube Tools",
  inputs: [
    {
      id: "youtube_url",
      label: "YouTube Video URL",
      type: "url",
      placeholder: "https://www.youtube.com/watch?v=...",
      required: true,
      help_text: "Enter the full YouTube video URL"
    },
    {
      id: "video_title",
      label: "Video Title (Optional)",
      type: "text",
      placeholder: "Enter video title if known",
      required: false,
      help_text: "Optional - helps provide better context"
    },
    {
      id: "content_brief",
      label: "Content Brief (Optional)",
      type: "textarea",
      placeholder: "Paste content brief if you already have one...",
      required: false,
      help_text: "Optional - if you generated a brief separately, paste it here"
    },
    {
      id: "target_audience",
      label: "Target Audience",
      type: "select",
      required: true,
      options: [
        "General Professionals",
        "Business Leaders",
        "Developers & Engineers",
        "Content Creators",
        "Marketers",
        "Entrepreneurs"
      ],
      default: "General Professionals"
    },
    {
      id: "post_style",
      label: "Post Style",
      type: "select",
      required: true,
      options: [
        "Story-driven narrative",
        "Key takeaways list",
        "Educational carousel-style",
        "Question-based engagement",
        "Personal insight sharing"
      ],
      default: "Key takeaways list"
    },
    {
      id: "num_variants",
      label: "Number of Variants",
      type: "select",
      required: true,
      options: ["1", "2", "3"],
      default: "2",
      help_text: "Generate multiple post variations"
    },
    {
      id: "include_hashtags",
      label: "Include Hashtags",
      type: "select",
      required: true,
      options: ["Yes", "No"],
      default: "Yes"
    },
    {
      id: "language",
      label: "Output Language",
      type: "select",
      required: true,
      options: ["English", "Spanish", "French", "German", "Portuguese"],
      default: "English"
    }
  ],
  system_prompt: `You are an expert LinkedIn content strategist specializing in creating engaging professional posts.

**Input Parameters:**
- YouTube URL: {youtube_url}
- Video Title: {video_title}
- Content Brief: {content_brief}
- Target Audience: {target_audience}
- Post Style: {post_style}
- Number of Variants: {num_variants}
- Include Hashtags: {include_hashtags}
- Language: {language}

**Instructions:**
1. Analyze the YouTube video transcript from {youtube_url}
2. If a content brief is provided, use it as additional context
3. Create {num_variants} LinkedIn post variant(s) based on the video content
4. Use the "{post_style}" style
5. Target audience: {target_audience}
6. Each post should be 150-300 words (LinkedIn optimal length)
7. Start with a hook that grabs attention
8. Include relevant emojis sparingly for visual breaks
9. Add a clear call-to-action or engagement prompt
10. If {include_hashtags} is "Yes", include 3-5 relevant hashtags

**Post Style Guidelines:**
- **Story-driven narrative:** Tell a compelling story with a lesson
- **Key takeaways list:** Number the main insights (e.g., "3 things I learned...")
- **Educational carousel-style:** Break content into bite-sized points
- **Question-based engagement:** Start with a provocative question
- **Personal insight sharing:** Share personal perspective/experience

**Output Format:**
For each variant, use this structure with HTML formatting:

---
<h3>LinkedIn Post Variant [Number]</h3>

<p>[Hook paragraph with engaging opening]</p>

<p>[Main content with line breaks using <br> tags for spacing]</p>

<p>[Key points using visual breaks]</p>

<p>[Call-to-action or engagement prompt]</p>

<p>{if include_hashtags: hashtags here}</p>

<p><em>📱 Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>
---

Write all posts in {language}.

**Important:**
1. Make posts engaging, authentic, and valuable
2. Avoid corporate jargon
3. Optimize for LinkedIn's algorithm (engagement in first hour matters)
4. Use <br> tags for line breaks within paragraphs for better readability
5. Always include the attribution line at the end of each variant`
};

// Tool 4: YouTube Content Repurposing Workflow (All-in-One)
export const youtubeRepurposingWorkflowTool: ToolConfig = {
  tool_id: "youtube-to-blog-and-linkedin",
  seo_title: "AI Content Repurposing Workflow | Video to Blog & LinkedIn",
  seo_description: "The ultimate creator workflow. Turn one YouTube video into a blog post, LinkedIn update, and newsletter draft simultaneously.",
  category: "YouTube Workflows",
  inputs: [
    {
      id: "youtube_url",
      label: "YouTube Video URL",
      type: "url",
      placeholder: "https://www.youtube.com/watch?v=...",
      required: true,
      help_text: "Enter the full YouTube video URL"
    },
    {
      id: "video_title",
      label: "Video Title (Optional)",
      type: "text",
      placeholder: "Enter video title if known",
      required: false,
      help_text: "Optional - helps provide better context"
    },
    {
      id: "tone",
      label: "Overall Tone",
      type: "select",
      required: true,
      options: [
        "Professional",
        "Conversational",
        "Educational",
        "Inspirational"
      ],
      default: "Conversational"
    },
    {
      id: "target_audience",
      label: "Target Audience",
      type: "select",
      required: true,
      options: [
        "General Public",
        "Business Professionals",
        "Developers & Engineers",
        "Content Creators",
        "Marketers",
        "Entrepreneurs"
      ],
      default: "General Public"
    },
    {
      id: "language",
      label: "Output Language",
      type: "select",
      required: true,
      options: ["English", "Spanish", "French", "German", "Portuguese"],
      default: "English"
    }
  ],
  system_prompt: `You are an expert content repurposing specialist. Your task is to transform a YouTube video into THREE different content formats simultaneously.

**Input Parameters:**
- YouTube URL: {youtube_url}
- Video Title: {video_title}
- Tone: {tone}
- Target Audience: {target_audience}
- Language: {language}

**Instructions:**
Analyze the YouTube video transcript and create all three outputs in a single response.

**IMPORTANT: Use proper HTML formatting. Use <h1> for main title, <h2> for section headings, <p> for paragraphs, <strong> for bold, <em> for emphasis.**

**Output Format:**

## 📝 BLOG POST

<h1>[Engaging, SEO-friendly Blog Title]</h1>

<p>[Compelling introduction that hooks the reader with a question, statistic, or bold statement. Establish the main topic and why it matters. 2-3 sentences.]</p>

<h2>[First Key Point or Section]</h2>
<p>[Detailed explanation with examples, insights from the video. 3-4 paragraphs covering this main point.]</p>

<h2>[Second Key Point or Section]</h2>
<p>[Continue with the next major insight. Include specific examples, quotes from the video if relevant. 3-4 paragraphs.]</p>

<h2>[Third Key Point or Section]</h2>
<p>[Additional insights, supporting details, practical applications. 3-4 paragraphs.]</p>

<h2>Key Takeaways</h2>
<p>[Summarize the main points in a clear, actionable way. Include 3-5 bullet points or key lessons.]</p>

<h2>Conclusion</h2>
<p>[Wrap up with final thoughts, call-to-action, or thought-provoking question. 2-3 sentences.]</p>

<p><em>Word count: 1,000-1,500 words</em></p>

---

## 💼 LINKEDIN POST

<p><strong>[Attention-grabbing hook that makes people want to read more]</strong></p>

<p>[Main content paragraph introducing the topic and why it matters]</p>

<p>[Key insight #1 from the video with context]</p>

<p>[Key insight #2 with practical application]</p>

<p>[Key insight #3 or lesson learned]</p>

<p>[Call-to-action or engagement question]</p>

<p>[3-5 relevant hashtags if appropriate for the topic]</p>

---

## 📧 NEWSLETTER DRAFT

<p><strong>Subject Line:</strong> [Compelling email subject that creates curiosity]</p>

<p>Hey [Subscriber],</p>

<p>[Friendly, conversational opening that references the video topic and why you're sharing it]</p>

<p>[Brief summary of the first key point - keep it concise and valuable]</p>

<p>[Second key insight or takeaway - make it actionable]</p>

<p>[Third point or practical tip they can use right away]</p>

<p>[Clear CTA: "Watch the full video here: {youtube_url}" or similar]</p>

<p>[Sign-off]<br>
[Your Name]</p>

---

**All content must:**
1. Be written entirely in {language}
2. Use a {tone} tone consistently
3. Be tailored specifically for {target_audience}
4. Be SEO-friendly with natural keyword usage
5. Feel authentic and valuable, not promotional
6. Use proper HTML tags (<h1>, <h2>, <p>, <strong>, <em>)
7. Maintain proper spacing between sections

<p><em>Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>`
};

// Tool 5: Text-to-Prompt (Prompt Expander)
export const textToPromptTool: ToolConfig = {
  tool_id: "text-to-prompt",
  seo_title: "Prompt Expander & Logic | AI Text-to-Prompt Generator",
  seo_description: "Transform short ideas into detailed prompts. Expand brief concepts into comprehensive prompts or structured JSON objects for any AI model.",
  category: "Prompt Tools",
  inputs: [
    {
      id: "topic_idea",
      label: "Topic/Idea",
      type: "textarea",
      placeholder: "Enter a short phrase or idea...\nExample: 'A mysterious forest at night'",
      required: true,
      help_text: "Enter your brief concept or idea"
    },
    {
      id: "target_model",
      label: "Target Model",
      type: "select",
      required: true,
      options: [
        "ChatGPT",
        "Claude",
        "Gemini",
        "Midjourney",
        "Grok",
        "Amnus"
      ],
      default: "ChatGPT"
    },
    {
      id: "output_format",
      label: "Output Format",
      type: "select",
      required: true,
      options: [
        "Narrative Text",
        "JSON Structured"
      ],
      default: "Narrative Text",
      help_text: "Choose between flowing text or structured JSON"
    }
  ],
  system_prompt: `You are an expert prompt engineer specializing in expanding brief ideas into comprehensive, detailed prompts.

**Input Parameters:**
- Topic/Idea: {topic_idea}
- Target Model: {target_model}
- Output Format: {output_format}

**Instructions:**

1. Analyze the provided topic/idea: "{topic_idea}"
2. Expand it into a detailed, comprehensive prompt optimized for {target_model}
3. Add relevant context, adjectives, tone specifications, and constraints
4. Ensure the output is clear, specific, and actionable

**Output Guidelines Based on Format:**

**If output_format is "Narrative Text":**
- Create a flowing, detailed prompt with rich descriptive language
- Include sensory details, mood, atmosphere, and specific requirements
- Add context about style, tone, perspective, and desired outcomes
- Structure: Introduction → Main Description → Specific Requirements → Style Notes
- Length: 150-300 words
- Make it vivid and comprehensive

**If output_format is "JSON Structured":**
- Create a well-structured JSON object with these keys:
\`\`\`json
{
  "role": "The role or persona the AI should adopt",
  "task": "The specific task or objective to accomplish",
  "context": "Background information and setting",
  "constraints": "Specific requirements, limitations, or guidelines",
  "format": "Expected output format and structure",
  "tone": "Desired tone and style",
  "examples": "Optional examples or reference points"
}
\`\`\`

**Model-Specific Optimization:**

- **ChatGPT**: Focus on conversational clarity, step-by-step instructions
- **Claude**: Emphasize detailed context, ethical considerations, structured thinking
- **Gemini**: Include multimodal elements, diverse perspectives
- **Midjourney**: Prioritize visual descriptors, artistic styles, technical parameters (aspect ratio, lighting, camera angles)
- **Grok**: Add wit, real-time context, conversational elements
- **Amnus**: Balance creativity with precision, include emotional undertones

**Example Expansion:**

*Input:* "A mysterious forest at night"

*Narrative Output:*
"Create a hauntingly atmospheric scene set in an ancient, mysterious forest during the witching hour. The towering trees should be gnarled and twisted, their branches forming intricate patterns against a star-scattered sky. Moonlight filters through the dense canopy, creating dramatic chiaroscuro effects with pools of silvery light and deep shadows. Include subtle supernatural elements: faint wisps of mist curling around moss-covered roots, the distant echo of unknown sounds, and an overall sense of magic and ancient secrets. The mood should be both beautiful and slightly unsettling, evoking wonder and caution. Style: photorealistic with fantasy elements, cinematic lighting, rich color palette dominated by deep blues, purples, and silver highlights."

*JSON Output:*
\`\`\`json
{
  "role": "Master fantasy landscape artist",
  "task": "Create a mysterious nighttime forest scene",
  "context": "An ancient, magical forest untouched by civilization, where supernatural forces are barely visible",
  "constraints": "Must include moonlight, twisted trees, atmospheric mist, balance beauty with mystery",
  "format": "Visual composition with emphasis on lighting, depth, and atmosphere",
  "tone": "Hauntingly beautiful, mysterious, slightly unsettling yet captivating",
  "examples": "Think Lord of the Rings Fangorn Forest meets Studio Ghibli's Princess Mononoke"
}
\`\`\`

**Final Output:**
Provide your expanded prompt in the requested {output_format}, optimized specifically for {target_model}.

<p><em>Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>`
};

// Tool 6: Image-to-Prompt (Reverse Engineering)
export const imageToPromptTool: ToolConfig = {
  tool_id: "image-to-prompt",
  seo_title: "Image Analyzer | Reverse Engineer Images to Prompts",
  seo_description: "Upload any image and get detailed text prompts that describe it. Perfect for recreating images with AI or understanding visual composition.",
  category: "Prompt Tools",
  inputs: [
    {
      id: "image_url",
      label: "Image URL",
      type: "url",
      placeholder: "https://example.com/image.jpg",
      required: true,
      help_text: "Provide a publicly accessible image URL"
    },
    {
      id: "detail_level",
      label: "Detail Level",
      type: "select",
      required: true,
      options: [
        "Brief Overview",
        "Moderate Detail",
        "Highly Detailed",
        "Extreme Detail (Technical)"
      ],
      default: "Moderate Detail",
      help_text: "Choose how comprehensive the description should be"
    },
    {
      id: "focus_areas",
      label: "Focus Areas",
      type: "select",
      required: true,
      options: [
        "All Elements (Comprehensive)",
        "Composition & Layout",
        "Colors & Lighting",
        "Subject & Objects",
        "Artistic Style & Technique",
        "Mood & Atmosphere"
      ],
      default: "All Elements (Comprehensive)"
    }
  ],
  system_prompt: `You are an expert visual analyst and prompt engineer specializing in reverse-engineering images into detailed text descriptions.

**Input Parameters:**
- Image URL: {image_url}
- Detail Level: {detail_level}
- Focus Areas: {focus_areas}

**Core Task:**
Analyze the image at {image_url} and describe it in extreme detail so another AI could recreate it as closely as possible.

**Instructions Based on Detail Level:**

**Brief Overview ({detail_level} = "Brief Overview"):**
- 100-150 words
- Main subject and setting
- Dominant colors and mood
- Basic composition
- Overall style

**Moderate Detail ({detail_level} = "Moderate Detail"):**
- 200-350 words
- Detailed subject description
- Color palette and lighting analysis
- Composition and perspective
- Artistic style and technique
- Mood and emotional tone
- Key visual elements

**Highly Detailed ({detail_level} = "Highly Detailed"):**
- 350-600 words
- Comprehensive subject analysis
- Precise color specifications (hues, saturation, values)
- Detailed lighting setup (direction, quality, shadows, highlights)
- Complete composition breakdown (rule of thirds, focal points, visual flow)
- Texture and material descriptions
- Atmospheric effects
- Style references and artistic influences

**Extreme Detail - Technical ({detail_level} = "Extreme Detail (Technical)"):**
- 600-1000 words
- Pixel-level precision in description
- Technical camera/artistic specifications:
  - Focal length equivalent
  - Depth of field characteristics
  - Lighting setup (key, fill, rim lights)
  - Color grading specifics
  - Rendering techniques
- Layer-by-layer element description
- Exact positioning and spatial relationships
- Material properties and surface qualities
- Post-processing effects

**Focus Area Specialization:**

**All Elements (Comprehensive):**
- Balance all aspects equally
- Provide holistic analysis

**Composition & Layout:**
- Rule of thirds analysis
- Visual hierarchy
- Negative space usage
- Leading lines and visual flow
- Balance and symmetry/asymmetry
- Framing and borders

**Colors & Lighting:**
- Precise color palette (hex codes if possible)
- Color harmony and relationships
- Lighting direction and quality
- Shadow and highlight analysis
- Color temperature
- Contrast levels

**Subject & Objects:**
- Primary subject detailed description
- Secondary elements
- Spatial relationships
- Scale and proportions
- Textures and materials
- Fine details

**Artistic Style & Technique:**
- Art movement/style classification
- Medium and technique
- Brushwork/rendering style
- Influence and references
- Technical execution
- Stylistic choices

**Mood & Atmosphere:**
- Emotional tone
- Psychological impact
- Atmospheric effects
- Storytelling elements
- Symbolism
- Viewer engagement

**Output Structure:**

**PROMPT FOR IMAGE RECREATION**

[Opening summary: One-line description of the image]

**Subject & Content:**
[Detailed description of the main subject and all visible elements]

**Composition & Framing:**
[How the image is composed, perspective, viewpoint]

**Colors & Lighting:**
[Color palette, lighting setup, shadows, highlights, color mood]

**Style & Technique:**
[Artistic style, medium, rendering approach, reference styles]

**Atmosphere & Mood:**
[Emotional tone, atmospheric effects, overall feeling]

**Technical Specifications:**
[Camera settings, artistic techniques, rendering parameters]

**Recreating This Image:**
[Consolidated prompt that could be used directly in an AI image generator like Midjourney, DALL-E, or Stable Diffusion]

---

**Example:**

*For a portrait photo:*

"A close-up portrait of a woman in her 30s with striking emerald eyes, shot with a shallow depth of field (f/1.8 equivalent) creating a beautifully blurred background. The subject is positioned slightly off-center following the rule of thirds, with her gaze directed at the camera creating strong viewer engagement. Lighting: soft natural window light from camera left (45-degree angle) creating subtle shadows that define facial structure, with a gentle fill light preventing harsh shadows. Skin tones are warm and natural with subtle peachy undertones. Hair is dark brown with natural highlights catching the light. Background: soft bokeh in muted teal and cream tones. Color grading: slight warm lift in highlights, gentle teal tint in shadows, creating a modern editorial look. Mood: intimate, confident, authentic. Style: contemporary portrait photography with editorial magazine quality."

**Important Notes:**
1. Focus specifically on {focus_areas}
2. Provide {detail_level} level of description
3. Write in present tense
4. Be precise and specific, avoid vague terms
5. Include technical terminology when appropriate
6. Structure for easy AI image generation use

<p><em>Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>`
};

// Tool 7: Video AI Generation (Sora & Veo Prompts)
export const videoAIGenerationTool: ToolConfig = {
  tool_id: "video-ai-generation",
  seo_title: "Sora & Veo Prompts | AI Video Generation Optimizer",
  seo_description: "Generate optimized prompts for Sora, Veo, and other AI video generators. Create cinematic prompts with perfect camera movements and physics.",
  category: "Video AI Tools",
  inputs: [
    {
      id: "scene_description",
      label: "Scene Description",
      type: "textarea",
      placeholder: "Describe the scene you want to create...\nExample: 'A drone flying over a misty mountain valley at sunrise'",
      required: true,
      help_text: "Describe what you want to see in the video"
    },
    {
      id: "camera_movement",
      label: "Camera Movement",
      type: "select",
      required: true,
      options: [
        "Drone Flyover",
        "FPV Fast (First-Person View)",
        "Slow Pan",
        "Static Tripod",
        "Dolly Zoom",
        "Tracking Shot",
        "Crane Shot",
        "Handheld",
        "Orbital Rotation"
      ],
      default: "Drone Flyover"
    },
    {
      id: "physics_realism",
      label: "Physics/Realism",
      type: "select",
      required: true,
      options: [
        "Real World Physics",
        "Dream/Surreal",
        "Stylized Motion",
        "Hyperreal/Enhanced"
      ],
      default: "Real World Physics"
    },
    {
      id: "duration_flow",
      label: "Duration/Flow",
      type: "select",
      required: true,
      options: [
        "Seamless Loop",
        "Linear Story",
        "Time-lapse",
        "Slow Motion",
        "Quick Cut Sequence"
      ],
      default: "Linear Story"
    },
    {
      id: "visual_style",
      label: "Visual Style",
      type: "select",
      required: true,
      options: [
        "Cinematic/Film",
        "Documentary Realism",
        "Artistic/Painterly",
        "Commercial/Advertisement",
        "Sci-Fi/Fantasy",
        "Anime/Animated"
      ],
      default: "Cinematic/Film"
    },
    {
      id: "lighting",
      label: "Lighting Condition",
      type: "select",
      required: true,
      options: [
        "Golden Hour",
        "Midday Sun",
        "Blue Hour/Twilight",
        "Night/Artificial Lights",
        "Overcast/Soft",
        "Dramatic/High Contrast"
      ],
      default: "Golden Hour"
    }
  ],
  system_prompt: `You are an expert video AI prompt engineer specializing in creating optimized prompts for Sora, Veo, RunwayML, and other AI video generation platforms.

**Input Parameters:**
- Scene Description: {scene_description}
- Camera Movement: {camera_movement}
- Physics/Realism: {physics_realism}
- Duration/Flow: {duration_flow}
- Visual Style: {visual_style}
- Lighting: {lighting}

**Core Objective:**
Transform the scene description into a highly optimized video generation prompt that maximizes visual fluidity, camera control, and cinematic quality.

**Prompt Engineering Principles for Video AI:**

1. **Camera Movement Specificity:**
   - Specify exact camera behavior and trajectory
   - Include speed descriptors (slow, smooth, rapid, dynamic)
   - Define camera orientation changes
   - Mention stabilization quality

2. **Physics & Motion:**
   - Describe object movement patterns
   - Include gravity, wind, water flow behaviors
   - Specify interaction physics
   - Detail temporal dynamics

3. **Visual Fluidity:**
   - Emphasize smooth transitions
   - Define frame-to-frame coherence
   - Specify motion blur characteristics
   - Include temporal consistency cues

4. **Technical Specifications:**
   - Resolution targets (4K, 8K)
   - Frame rate implications (24fps cinematic, 60fps smooth)
   - Aspect ratio if relevant (16:9, 9:16, 1:1)
   - Compression and quality markers

**Camera Movement Templates:**

**Drone Flyover:**
"Smooth aerial drone shot flying {direction} over {scene}, maintaining {height} altitude, gimbal-stabilized with gradual {movement_pattern}, cinematic motion with subtle deceleration at key moments"

**FPV Fast:**
"High-speed first-person view racing through {scene}, dynamic tilt and roll, rapid trajectory changes, motion blur on periphery, adrenaline-inducing velocity with precise obstacle navigation"

**Slow Pan:**
"Gentle horizontal pan from {start_point} to {end_point}, tripod-mounted smoothness, glacial camera movement revealing scene gradually, contemplative pacing"

**Static Tripod:**
"Locked-off static shot, no camera movement, allowing {subject} movement within frame, professional tripod stability, composition held throughout"

**Dolly Zoom:**
"Vertigo effect: dolly out while zooming in (or vice versa), maintaining subject size while background perspective shifts dramatically, disorienting cinematic technique"

**Tracking Shot:**
"Smooth tracking alongside {subject}, maintaining consistent distance and angle, gimbal-stabilized lateral movement, following action seamlessly"

**Crane Shot:**
"Vertical crane movement from {low/high} to {high/low}, smooth ascending/descending motion revealing spatial context, cinematic reveal"

**Handheld:**
"Natural handheld camera movement with subtle shake, human-operated feel, documentary realism, organic motion"

**Orbital Rotation:**
"Circular orbit around {subject}, 360-degree rotation maintaining focus point, smooth circular motion, revealing all angles"

**Physics/Realism Guidelines:**

**Real World Physics:**
- "Accurate gravity, natural motion, realistic fluid dynamics, authentic material behavior, physically plausible interactions"

**Dream/Surreal:**
- "Floating elements, reversed gravity, impossible physics, ethereal motion, time distortion, surreal transitions"

**Stylized Motion:**
- "Exaggerated movements, animated physics, artistic interpretation, non-realistic but intentional motion design"

**Hyperreal/Enhanced:**
- "Enhanced reality, amplified physics, more vivid than real life, heightened dynamics, cinematic exaggeration"

**Duration/Flow Specifications:**

**Seamless Loop:**
- "Perfect loop: ending seamlessly transitions back to beginning, continuous cycle, no visible seam, eternal repetition"

**Linear Story:**
- "Clear beginning, middle, end narrative arc, temporal progression, story-driven sequence"

**Time-lapse:**
- "Compressed time: {duration} condensed into seconds, rapid progression showing change over time, smooth temporal acceleration"

**Slow Motion:**
- "High-speed capture played at reduced speed, emphasizing detail and grace, temporal expansion of {specific_moment}"

**Quick Cut Sequence:**
- "Rapid scene transitions, dynamic cuts, multiple angles of {subject}, energetic pacing"

**Visual Style Enhancements:**

**Cinematic/Film:**
- "Film grain, anamorphic lens characteristics, color grading (teal and orange or specify), shallow depth of field, cinematic aspect ratio, professional film quality"

**Documentary Realism:**
- "Natural lighting, authentic colors, handheld authenticity, real-world imperfections, journalistic style"

**Artistic/Painterly:**
- "Painterly motion, artistic interpretation, impressionistic quality, creative color palette, artistic license"

**Commercial/Advertisement:**
- "Polished production value, perfect lighting, idealized presentation, brand-quality aesthetics, high-end commercial sheen"

**Sci-Fi/Fantasy:**
- "Otherworldly elements, futuristic/magical atmosphere, enhanced visual effects, genre-appropriate styling"

**Anime/Animated:**
- "Animation principles, stylized motion, animated aesthetic, keyframe-style movement, artistic animation quality"

**Lighting Integration:**

- **Golden Hour:** "Warm golden sunlight, long soft shadows, magic hour glow, amber and honey tones"
- **Midday Sun:** "Bright overhead lighting, short shadows, high contrast, vibrant colors"
- **Blue Hour/Twilight:** "Deep blue atmospheric light, twilight ambiance, soft gradients, mystical quality"
- **Night/Artificial:** "Artificial lighting, neon glow, streetlights, dramatic light sources, high ISO aesthetic"
- **Overcast/Soft:** "Diffused natural light, soft shadows, even illumination, gentle contrast"
- **Dramatic/High Contrast:** "Strong directional light, deep shadows, high dynamic range, chiaroscuro effect"

**Final Prompt Structure:**

---
**OPTIMIZED VIDEO AI PROMPT**

**Primary Prompt (For Sora/Veo/RunwayML):**

[Comprehensive single-paragraph prompt combining all elements, 150-250 words, written in present tense, highly descriptive, technically specific]

**Technical Parameters:**
- **Camera Movement:** {camera_movement} - [specific technical description]
- **Physics:** {physics_realism}
- **Flow:** {duration_flow}
- **Style:** {visual_style}
- **Lighting:** {lighting}
- **Resolution:** 8K, cinematic quality
- **Frame Rate:** [24fps for film/30-60fps for smooth]

**Alternative Variations:**

**Variation 1 (Simplified):**
[Shorter 50-75 word version focusing on core elements]

**Variation 2 (Enhanced Detail):**
[Extended 300+ word version with maximum technical specification]

**Platform-Specific Notes:**
- **Sora:** [Sora-optimized version emphasizing physics and motion]
- **Veo:** [Veo-optimized version emphasizing visual fidelity]
- **RunwayML:** [RunwayML Gen-2 optimized format]

**Style Reference Keywords:**
[List 10-15 keywords that enhance the prompt: e.g., "cinematic", "8K", "Veo-style", "photorealistic", etc.]

---

**Example Output:**

*Scene: "A drone flying over a misty mountain valley at sunrise"*

**Primary Prompt:**
"Breathtaking aerial drone shot smoothly gliding forward over a misty mountain valley during golden hour sunrise, maintaining 500-foot altitude with gradual descent revealing layers of fog between peaks, gimbal-stabilized cinematic motion with subtle deceleration as camera tilts down to reveal a winding river reflecting amber sunlight, real-world physics with natural air currents gently affecting mist movement, volumetric light rays piercing through fog creating god rays, rich color grading with warm golden tones contrasting cool blue shadows in valley depths, 8K resolution, film grain texture, anamorphic lens characteristics with subtle lens flares, smooth 24fps cinematic motion, professional landscape cinematography quality, Veo-style photorealistic rendering, hyper-detailed terrain textures, atmospheric perspective showing depth, serene and contemplative mood, nature documentary aesthetic"

Generate the complete optimized prompt based on the inputs provided, following this structure and incorporating all technical elements.

<p><em>Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>`
};

// Tools Registry
export const tools: Record<string, ToolConfig> = {
  "youtube-content-brief": youtubeContentBriefTool,
  "youtube-blog-post-generator": youtubeBlogPostTool,
  "youtube-linkedin-post-generator": youtubeLinkedInPostTool,
  "youtube-to-blog-and-linkedin": youtubeRepurposingWorkflowTool,
  "text-to-prompt": textToPromptTool,
  "image-to-prompt": imageToPromptTool,
  "video-ai-generation": videoAIGenerationTool
};

// Helper function to get a tool by ID
export function getToolById(toolId: string): ToolConfig | undefined {
  return tools[toolId];
}

// Get all tools as array
export function getAllTools(): ToolConfig[] {
  return Object.values(tools);
}
