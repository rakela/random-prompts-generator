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

**Output Format:**

# Content Repurposing Package

---

## 📝 BLOG POST

<h1>[Engaging Blog Title]</h1>

<p>[Introduction paragraph...]</p>

<h2>[Section 1 Heading]</h2>
<p>[Content...]</p>

<h2>[Section 2 Heading]</h2>
<p>[Content...]</p>

<h2>Conclusion</h2>
<p>[Wrap up with key takeaways...]</p>

<p><em>Word count: approximately 1,000-1,500 words</em></p>

---

## 💼 LINKEDIN POST

**Hook:** [Attention-grabbing opening line]

[Main content with strategic line breaks]

[Key insight or lesson]

[Call-to-action or engagement prompt]

[3-5 relevant hashtags if appropriate]

---

## 📧 NEWSLETTER DRAFT

**Subject Line:** [Catchy email subject]

Hey [Subscriber],

[Conversational opening that references the video]

[Brief summary of key points - 3-4 short paragraphs]

[Clear CTA directing to watch the video]

[Signature line]

---

**All content should:**
1. Be written in {language}
2. Use a {tone} tone
3. Target {target_audience}
4. Be SEO-friendly and engaging
5. Reference the video naturally without being overly promotional

<p><em>Generated with <a href="https://randomprompts.org" target="_blank">Random Prompts Generator</a></em></p>`
};

// Tools Registry
export const tools: Record<string, ToolConfig> = {
  "youtube-content-brief": youtubeContentBriefTool,
  "youtube-blog-post-generator": youtubeBlogPostTool,
  "youtube-linkedin-post-generator": youtubeLinkedInPostTool,
  "youtube-to-blog-and-linkedin": youtubeRepurposingWorkflowTool
};

// Helper function to get a tool by ID
export function getToolById(toolId: string): ToolConfig | undefined {
  return tools[toolId];
}

// Get all tools as array
export function getAllTools(): ToolConfig[] {
  return Object.values(tools);
}
