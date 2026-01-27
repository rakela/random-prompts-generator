import type { ToolConfig } from '../types/workflow';

// Tool 1: YouTube Content Brief Generator
export const youtubeContentBriefTool: ToolConfig = {
  tool_id: "youtube-content-brief",
  seo_title: "Transcript for YouTube Videos | YT Video to Text Converter",
  seo_description: "Extract transcript for YouTube videos instantly. Free YouTube video to text converter that generates comprehensive content briefs, key takeaways, and actionable insights from any video.",
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
  seo_title: "YouTube Transcript Blog Post | Video Transcript Download & Convert",
  seo_description: "Convert YouTube video transcripts into SEO-optimized blog posts instantly. Download YouTube transcript and transform it into professional articles with our free AI converter.",
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
  seo_title: "Get Transcript of YouTube Video | Convert to LinkedIn Post",
  seo_description: "Get a transcript of any YouTube video and convert it to engaging LinkedIn posts instantly. Extract YouTube video content and transform into professional LinkedIn updates for maximum engagement.",
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
  seo_title: "YouTube Transcript Generator | Convert Video to Blog & LinkedIn Post",
  seo_description: "Free YouTube transcript generator that converts videos to SEO-optimized blog posts and LinkedIn content. Extract transcript from YouTube videos and repurpose into multiple content formats instantly.",
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
  seo_title: "Image to Prompt Generator | AI Image Prompt Converter",
  seo_description: "Turn any image into detailed AI prompts instantly. Upload an image and get accurate text descriptions for recreating it with AI. Free image to prompt generator tool.",
  category: "Prompt Tools",
  inputs: [
    {
      id: "image_upload",
      label: "Upload Image",
      type: "file",
      accept: "image/*",
      required: true,
      help_text: "Upload any image (JPG, PNG, WebP) to generate an AI image prompt"
    },
    {
      id: "additional_details",
      label: "Additional Details (Optional)",
      type: "textarea",
      placeholder: "Add any specific details, modifications, or focus areas you want included in the prompt...",
      required: false,
      help_text: "Describe any specific elements, changes, or emphasis you want in the generated prompt"
    },
    {
      id: "detail_level",
      label: "Detail Level",
      type: "select",
      required: true,
      options: [
        "Brief",
        "Standard",
        "Detailed",
        "Comprehensive"
      ],
      default: "Standard",
      help_text: "Choose how detailed the AI image prompt should be"
    }
  ],
  system_prompt: `You are an expert AI image analyst specializing in converting images into detailed, accurate text prompts for AI image generation.

**Input Parameters:**
- Detail Level: {detail_level}
- Additional Details from User: {additional_details}

**Your Task:**
Analyze the uploaded image and generate an accurate, detailed text description that could be used to recreate the image with AI tools like Midjourney, DALL-E, Stable Diffusion, or any AI image prompt generator.

**Detail Level Guidelines:**

**Brief ({detail_level} = "Brief"):**
- 100-150 words
- Main subject and key elements
- Primary colors and lighting
- Basic style and mood
- Concise and direct

**Standard ({detail_level} = "Standard"):**
- 200-350 words
- Detailed subject description
- Composition and framing
- Color palette and lighting details
- Artistic style and technique
- Mood and atmosphere
- Key visual characteristics

**Detailed ({detail_level} = "Detailed"):**
- 350-600 words
- Comprehensive subject analysis
- Precise color descriptions
- Advanced lighting setup (direction, quality, shadows)
- Complete composition breakdown
- Texture and material details
- Atmospheric and environmental effects
- Style references and influences

**Comprehensive ({detail_level} = "Comprehensive"):**
- 600-1000+ words
- Extremely precise descriptions
- Technical specifications (camera angles, focal length, depth of field)
- Layer-by-layer element breakdown
- Exact spatial relationships and positioning
- Material properties and surface qualities
- Color theory and grading specifics
- Post-processing and artistic effects

**CRITICAL: Incorporate User's Additional Details**
If the user provided additional details in {additional_details}, you MUST:
1. Integrate them naturally into your description
2. Give them appropriate emphasis
3. Ensure they're reflected in both the text and JSON outputs

**Output Format:**

You must provide TWO formats:

---

## 📝 AI Image Prompt (Text Format)

[Write a clean, well-formatted text description of the image that can be directly used as an AI image prompt. Include all critical visual elements, composition, colors, lighting, style, and mood. Write in a natural, flowing manner that reads well.]

---

## 📋 Structured Prompt Data (JSON Format)

\`\`\`json
{
  "summary": "One-line description of the entire image",
  "subject": {
    "main": "Primary subject description",
    "secondary_elements": ["List", "of", "additional", "elements"]
  },
  "composition": {
    "framing": "How the image is framed",
    "perspective": "Camera angle and viewpoint",
    "layout": "Arrangement of elements"
  },
  "colors": {
    "palette": ["Primary", "colors", "present"],
    "dominant_color": "Most prominent color",
    "color_mood": "Warm/cool/vibrant/muted etc."
  },
  "lighting": {
    "type": "Natural/artificial/mixed",
    "direction": "Direction of main light source",
    "quality": "Soft/hard/diffused etc.",
    "shadows": "Shadow characteristics"
  },
  "style": {
    "artistic_style": "Photography/digital art/painting etc.",
    "technique": "Rendering approach",
    "influences": "Similar styles or artists"
  },
  "mood": {
    "atmosphere": "Overall feeling",
    "emotion": "Emotional tone",
    "impact": "Psychological effect"
  },
  "technical": {
    "quality": "Resolution/sharpness description",
    "effects": ["Any", "post-processing", "effects"],
    "camera_settings": "Apparent focal length, DoF, etc."
  },
  "ai_prompt_ready": "Single consolidated prompt optimized for AI image generators like Midjourney or DALL-E",
  "user_requested_details": "{additional_details}"
}
\`\`\`

---

**Example Output:**

## 📝 AI Image Prompt (Text Format)

A serene mountain landscape at golden hour, with jagged snow-capped peaks rising against a gradient sky transitioning from warm orange near the horizon to deep purple at the top. In the foreground, a crystal-clear alpine lake perfectly mirrors the mountains, creating a symmetrical composition. Dense evergreen forests frame both sides of the lake in deep emerald tones. The lighting is soft and warm, with the last rays of sunlight creating a golden rim light on the mountain peaks. The atmosphere is peaceful and majestic, with slight atmospheric haze adding depth. Style: landscape photography, high dynamic range, sharp focus throughout with rich color saturation.

## 📋 Structured Prompt Data (JSON Format)

\`\`\`json
{
  "summary": "Golden hour mountain landscape with mirror lake reflection",
  "subject": {
    "main": "Snow-capped mountain range",
    "secondary_elements": ["Alpine lake", "Evergreen forests", "Sky gradient"]
  },
  "composition": {
    "framing": "Wide landscape format",
    "perspective": "Eye-level, centered composition",
    "layout": "Symmetrical with lake reflection"
  },
  "colors": {
    "palette": ["Golden orange", "Deep purple", "Emerald green", "White snow", "Blue water"],
    "dominant_color": "Warm golden tones",
    "color_mood": "Warm and vibrant with rich saturation"
  },
  "lighting": {
    "type": "Natural golden hour sunlight",
    "direction": "From behind viewer, low angle",
    "quality": "Soft, warm, diffused",
    "shadows": "Minimal, gentle, long shadows"
  },
  "style": {
    "artistic_style": "Landscape photography",
    "technique": "HDR processing, high detail",
    "influences": "Ansel Adams, contemporary nature photography"
  },
  "mood": {
    "atmosphere": "Peaceful and majestic",
    "emotion": "Awe and tranquility",
    "impact": "Inspiring and calming"
  },
  "technical": {
    "quality": "High resolution, sharp focus throughout",
    "effects": ["HDR processing", "Color grading", "Slight atmospheric haze"],
    "camera_settings": "Wide-angle lens, deep depth of field (f/11-16), tripod stable"
  },
  "ai_prompt_ready": "Serene mountain landscape at golden hour, snow-capped peaks, mirror reflection in alpine lake, evergreen forests, warm orange to purple sky gradient, soft golden light, symmetrical composition, landscape photography style, HDR, high detail, peaceful majestic atmosphere",
  "user_requested_details": ""
}
\`\`\`

---

**Important Guidelines:**
1. Be accurate and precise in describing what you see
2. Use specific, descriptive language (not vague terms)
3. Include technical details appropriate to the detail level
4. Format both text and JSON outputs clearly
5. Ensure the "ai_prompt_ready" field is optimized for direct use in AI generators
6. Always incorporate user's additional details if provided
7. Write in present tense
8. Focus on visual elements that can be recreated

<p><em>Generated with <a href="https://randomprompts.org/tools/image-to-prompt" target="_blank">Image to Prompt Generator</a></em></p>`
};

// Tool 7: AI Portrait Generator
export const aiPortraitGeneratorTool: ToolConfig = {
  tool_id: "ai-portrait-generator",
  seo_title: "AI Portrait Prompt Generator | Create Detailed Character Portraits",
  seo_description: "Transform simple character descriptions into detailed AI portrait prompts. Generate photorealistic, artistic, or fantasy character portraits with professional detail.",
  category: "Art Prompts",
  inputs: [
    {
      id: "character_description",
      label: "Character Description",
      type: "textarea",
      placeholder: "Example: A wise elderly wizard with a long white beard, wearing mystical robes...",
      required: true,
      help_text: "Describe the character you want to create a portrait of"
    },
    {
      id: "portrait_style",
      label: "Portrait Style",
      type: "select",
      required: true,
      options: [
        "Photorealistic",
        "Oil Painting",
        "Digital Art",
        "Watercolor",
        "Pencil Sketch",
        "Fantasy Art",
        "Anime/Manga",
        "Comic Book",
        "3D Render",
        "Cinematic"
      ],
      default: "Photorealistic"
    },
    {
      id: "mood_atmosphere",
      label: "Mood & Atmosphere",
      type: "select",
      required: true,
      options: [
        "Dramatic",
        "Serene",
        "Mysterious",
        "Heroic",
        "Melancholic",
        "Joyful",
        "Intense",
        "Ethereal",
        "Dark & Moody",
        "Bright & Hopeful"
      ],
      default: "Dramatic"
    },
    {
      id: "lighting_setup",
      label: "Lighting",
      type: "select",
      required: true,
      options: [
        "Rembrandt Lighting",
        "Butterfly Lighting",
        "Split Lighting",
        "Natural Window Light",
        "Golden Hour",
        "Studio Lighting",
        "Dramatic Backlighting",
        "Candlelight",
        "Neon/Colorful",
        "Soft Diffused"
      ],
      default: "Rembrandt Lighting"
    },
    {
      id: "detail_level",
      label: "Detail Level",
      type: "select",
      required: true,
      options: [
        "Basic (Simple prompt)",
        "Standard (Balanced detail)",
        "Detailed (Professional)",
        "Ultra-Detailed (Maximum specification)"
      ],
      default: "Standard (Balanced detail)"
    }
  ],
  system_prompt: `You are an expert AI art prompt engineer specializing in character portrait generation for tools like Midjourney, DALL-E, Stable Diffusion, and Leonardo AI.

**Input Parameters:**
- Character Description: {character_description}
- Portrait Style: {portrait_style}
- Mood & Atmosphere: {mood_atmosphere}
- Lighting: {lighting_setup}
- Detail Level: {detail_level}

**Your Task:**
Transform the user's character description into a comprehensive, detailed portrait prompt optimized for AI image generation.

**Prompt Engineering Guidelines:**

**For Photorealistic Style:**
- Include camera specifications (e.g., "shot on Canon EOS R5, 85mm f/1.4 lens")
- Specify depth of field (shallow DOF for portraits)
- Add film stock references or color grading notes
- Include skin texture details, pore details, catchlights in eyes
- Reference professional portrait photography

**For Artistic Styles:**
- **Oil Painting**: Brushwork style, impasto techniques, color palette, artist references (e.g., "in the style of John Singer Sargent")
- **Digital Art**: Digital painting techniques, ArtStation quality, concept art style
- **Watercolor**: Paper texture, color bleeding, transparent layers
- **Pencil Sketch**: Graphite details, cross-hatching, tonal values
- **Fantasy Art**: Epic fantasy style, detailed rendering, dramatic composition

**Lighting Specifications:**
- **Rembrandt**: Triangle of light on cheek, 45-degree angle, dramatic shadows
- **Butterfly**: Light from above, butterfly shadow under nose, glamorous
- **Split**: Half face in light, half in shadow, dramatic contrast
- **Natural Window**: Soft directional light, gentle shadows, authentic feel
- **Golden Hour**: Warm amber tones, soft glow, rim lighting
- **Studio**: Professional multi-light setup, fill light, hair light
- **Dramatic Backlighting**: Silhouette elements, rim light, atmospheric depth

**Mood Integration:**
- **Dramatic**: High contrast, intense expression, powerful composition
- **Serene**: Soft features, peaceful expression, gentle colors
- **Mysterious**: Shadows, partial obscurity, enigmatic gaze
- **Heroic**: Strong pose, confident expression, epic framing

**Output Structure Based on Detail Level:**

**Basic (Simple prompt):**
100-150 words, essential elements only

**Standard (Balanced detail):**
200-300 words, comprehensive but focused

**Detailed (Professional):**
350-500 words, extensive technical specifications

**Ultra-Detailed (Maximum specification):**
500-800 words, pixel-perfect detail with all technical parameters

**Required Elements to Include:**

1. **Subject Description:**
   - Physical features (face shape, eyes, hair, skin tone, age)
   - Expression and emotion
   - Pose and body language (for head-and-shoulders or bust portraits)

2. **Composition:**
   - Framing (close-up, head-and-shoulders, bust, etc.)
   - Angle (straight-on, 3/4 view, profile, slight tilt)
   - Background (solid color, blurred, environmental context)

3. **Technical Specifications:**
   - Style reference
   - Lighting setup
   - Color palette and mood
   - Texture and material qualities
   - Artistic techniques

4. **Quality Modifiers:**
   - Resolution (8K, 4K, highly detailed)
   - Platform tags (trending on ArtStation, featured on Behance)
   - Artist references if applicable
   - Professional quality indicators

**Example Output Format:**

**AI PORTRAIT PROMPT**

[Opening summary line: One-sentence essence of the portrait]

**Subject & Character:**
[Detailed description of the character, incorporating user's input with enhanced detail - physical features, clothing, accessories, personality coming through in expression]

**Style & Medium:**
[Specific artistic style with technical details - {portrait_style} implementation, brushwork/rendering technique, material qualities]

**Composition & Framing:**
[How the portrait is composed - camera angle, framing, rule of thirds, negative space]

**Lighting Setup:**
[Detailed lighting description using {lighting_setup} - direction, quality, shadows, highlights, color temperature]

**Color & Atmosphere:**
[Color palette, mood implementation using {mood_atmosphere}, atmospheric effects, emotional tone]

**Technical Details:**
[Resolution, quality markers, artist/style references, platform-specific optimizations]

---

**READY-TO-USE PROMPT:**

[Consolidated single-paragraph prompt that can be copied directly into Midjourney, DALL-E, Stable Diffusion, or Leonardo AI. 150-300 words depending on detail level.]

---

**Platform-Specific Variations:**

**For Midjourney:**
[Optimized version with --ar 2:3 parameter suggestion, --stylize value, version recommendation]

**For DALL-E 3:**
[Natural language optimized version focusing on descriptive clarity]

**For Stable Diffusion:**
[Comma-separated keyword version with emphasis markers, negative prompt suggestions]

---

**Tips for Best Results:**
- [2-3 specific tips for using this prompt effectively]
- [Suggestions for variations or modifications]
- [Common pitfalls to avoid]

---

**Important Guidelines:**
1. Always maintain the character essence from {character_description}
2. Implement {portrait_style} authentically with proper technical terminology
3. Create {mood_atmosphere} mood through color, lighting, and expression choices
4. Use {lighting_setup} accurately with proper photographic/artistic techniques
5. Match verbosity to {detail_level} - don't over or under-specify
6. Include diverse, inclusive character representations
7. Avoid stereotypes, focus on individuality and character depth
8. Write in present tense for immediacy
9. Be specific about details but allow AI creative interpretation where appropriate
10. Optimize for best AI generation results

Generate the complete portrait prompt now, following this structure and matching the requested detail level.

<p><em>Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>`
};

// Tool 8: Video AI Generation (Sora & Veo Prompts)
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
  "video-ai-generation": videoAIGenerationTool,
  "ai-portrait-generator": aiPortraitGeneratorTool
};

// Helper function to get a tool by ID
export function getToolById(toolId: string): ToolConfig | undefined {
  return tools[toolId];
}

// Get all tools as array
export function getAllTools(): ToolConfig[] {
  return Object.values(tools);
}
