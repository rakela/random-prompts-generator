// YouTube Content Generator Types

export type InputType = "text" | "textarea" | "select" | "number" | "url";

export interface ToolInputConfig {
  id: string;            // e.g. "video_url"
  label: string;         // label for the UI
  type: InputType;
  placeholder?: string;
  required?: boolean;
  options?: string[];    // for "select"
  default?: string;      // optional default
  help_text?: string;    // optional helper text
}

export interface ToolConfig {
  tool_id: string;          // unique slug, e.g. "youtube-to-blog-post-generator"
  seo_title: string;
  seo_description: string;
  category: string;
  inputs: ToolInputConfig[];
  system_prompt: string;    // contains {placeholders} like {video_url}, {tone}, etc.
}

export interface WorkflowInputConfig extends ToolInputConfig {}

export interface WorkflowStep {
  step_id: string;          // internal ID
  tool_id: string;          // which ToolConfig to call
  map_inputs: Record<string, string>;
  /**
   * map_inputs maps tool input field IDs -> either:
   *   - a workflow input ID (e.g. "video_url")
   *   - a literal string (e.g. "Soft CTA")
   */
  use_previous_output?: string;
  /**
   * if set, indicates that the previous step's output should be passed
   * to this tool as additional context (e.g. transcript/summary).
   */
  output_key: string;       // name under which we store this step's result in workflow result object
}

export interface WorkflowOutputSection {
  id: string;
  label: string;
  source: string;  // key from a step's output, e.g. "blog_post_markdown"
}

export interface WorkflowConfig {
  workflow_id: string;
  seo_title: string;
  seo_description: string;
  category: string;
  inputs: WorkflowInputConfig[];
  steps: WorkflowStep[];
  final_output_layout: {
    sections: WorkflowOutputSection[];
  };
}

// API Request/Response Types
export interface RunToolRequest {
  tool_id: string;
  inputs: Record<string, string>;
  extra_context?: Record<string, any>;
}

export interface RunToolResponse {
  success: boolean;
  tool_id?: string;
  output?: string;
  error?: string;
}

export interface RunWorkflowRequest {
  workflow_id: string;
  inputs: Record<string, string>;
}

export interface RunWorkflowResponse {
  success: boolean;
  workflow_id?: string;
  sections?: Array<{
    id: string;
    label: string;
    content: string;
  }>;
  error?: string;
}
