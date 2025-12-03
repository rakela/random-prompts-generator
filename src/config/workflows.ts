import type { WorkflowConfig } from '../types/workflow';

// Workflow: YouTube to Blog and LinkedIn
export const youtubeToContentWorkflow: WorkflowConfig = {
  workflow_id: "youtube-to-blog-and-linkedin",
  seo_title: "YouTube to Blog & LinkedIn - Complete Content Repurposing Workflow",
  seo_description: "Transform any YouTube video into a content brief, blog post, and LinkedIn posts with a single click. Complete content repurposing automation.",
  category: "YouTube Workflows",
  inputs: [
    {
      id: "youtube_url",
      label: "YouTube Video URL",
      type: "url",
      placeholder: "https://www.youtube.com/watch?v=...",
      required: true,
      help_text: "The YouTube video you want to repurpose"
    },
    {
      id: "video_title",
      label: "Video Title (Optional)",
      type: "text",
      placeholder: "Enter video title",
      required: false,
      help_text: "If not provided, we'll extract it from the video"
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
      label: "Primary Content Goal",
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
      id: "blog_length",
      label: "Blog Post Length",
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
      id: "blog_tone",
      label: "Blog Post Tone",
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
      id: "linkedin_style",
      label: "LinkedIn Post Style",
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
      id: "linkedin_variants",
      label: "LinkedIn Post Variants",
      type: "select",
      required: true,
      options: ["1", "2", "3"],
      default: "2",
      help_text: "Number of different LinkedIn posts to generate"
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
  steps: [
    {
      step_id: "generate_brief",
      tool_id: "youtube-content-brief",
      map_inputs: {
        youtube_url: "youtube_url",
        video_title: "video_title",
        target_audience: "target_audience",
        primary_goal: "primary_goal",
        language: "language"
      },
      output_key: "content_brief_raw"
    },
    {
      step_id: "generate_blog",
      tool_id: "youtube-blog-post-generator",
      map_inputs: {
        video_title: "video_title",
        content_brief: "", // Will be populated from previous step
        desired_length: "blog_length",
        tone: "blog_tone",
        include_cta: "Yes", // Literal value
        language: "language"
      },
      use_previous_output: "content_brief_raw",
      output_key: "blog_post_markdown"
    },
    {
      step_id: "generate_linkedin",
      tool_id: "youtube-linkedin-post-generator",
      map_inputs: {
        video_title: "video_title",
        content_brief: "", // Will be populated from previous step
        target_audience: "target_audience",
        post_style: "linkedin_style",
        num_variants: "linkedin_variants",
        include_hashtags: "Yes", // Literal value
        language: "language"
      },
      use_previous_output: "content_brief_raw",
      output_key: "linkedin_posts"
    }
  ],
  final_output_layout: {
    sections: [
      {
        id: "summary",
        label: "Content Brief",
        source: "content_brief_raw"
      },
      {
        id: "blog",
        label: "Blog Post (Markdown)",
        source: "blog_post_markdown"
      },
      {
        id: "linkedin",
        label: "LinkedIn Posts",
        source: "linkedin_posts"
      }
    ]
  }
};

// Workflows Registry
export const workflows: Record<string, WorkflowConfig> = {
  "youtube-to-blog-and-linkedin": youtubeToContentWorkflow
};

// Helper function to get a workflow by ID
export function getWorkflowById(workflowId: string): WorkflowConfig | undefined {
  return workflows[workflowId];
}

// Get all workflows as array
export function getAllWorkflows(): WorkflowConfig[] {
  return Object.values(workflows);
}
