/**
 * API Endpoint: /api/run-workflow
 *
 * Executes a complete workflow with multiple tool steps
 */

import type { APIRoute } from 'astro';
import type { RunWorkflowRequest, RunWorkflowResponse } from '../../types/workflow';
import { getWorkflowById } from '../../config/workflows';
import { getToolById } from '../../config/tools';
import { callLLM, interpolatePrompt, validateInputs, sanitizeInput } from '../../utils/llm';
import { getYouTubeTranscript } from '../../utils/youtube';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body: RunWorkflowRequest = await request.json();
    const { workflow_id, inputs } = body;

    console.log(`[run-workflow] Executing workflow: ${workflow_id}`);
    console.log(`[run-workflow] Inputs:`, Object.keys(inputs));

    // Validate workflow exists
    const workflowConfig = getWorkflowById(workflow_id);
    if (!workflowConfig) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Workflow not found: ${workflow_id}`
        } as RunWorkflowResponse),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Sanitize all inputs
    const sanitizedInputs: Record<string, string> = {};
    for (const [key, value] of Object.entries(inputs)) {
      sanitizedInputs[key] = sanitizeInput(value);
    }

    // Validate required inputs
    const requiredFields = workflowConfig.inputs
      .filter(input => input.required)
      .map(input => input.id);

    const validation = validateInputs(sanitizedInputs, requiredFields);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Validation failed: ${validation.errors.join(', ')}`
        } as RunWorkflowResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Context object to store step outputs
    const context: Record<string, string> = {};

    // Fetch YouTube transcript once at the beginning if needed
    let transcript = '';
    if (sanitizedInputs.youtube_url) {
      try {
        console.log(`[run-workflow] Fetching YouTube transcript...`);
        transcript = await getYouTubeTranscript(sanitizedInputs.youtube_url);
        console.log(`[run-workflow] Transcript fetched: ${transcript.length} characters`);
        context['transcript'] = transcript;
      } catch (error) {
        console.error('[run-workflow] Transcript fetch error:', error);
        return new Response(
          JSON.stringify({
            success: false,
            error: `Failed to fetch YouTube transcript: ${error instanceof Error ? error.message : String(error)}`
          } as RunWorkflowResponse),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Execute each step sequentially
    for (let i = 0; i < workflowConfig.steps.length; i++) {
      const step = workflowConfig.steps[i];
      console.log(`[run-workflow] Executing step ${i + 1}/${workflowConfig.steps.length}: ${step.step_id}`);

      // Get tool configuration
      const toolConfig = getToolById(step.tool_id);
      if (!toolConfig) {
        throw new Error(`Tool not found for step ${step.step_id}: ${step.tool_id}`);
      }

      // Build tool inputs by mapping workflow inputs
      const toolInputs: Record<string, string> = {};

      for (const [toolInputKey, mappingValue] of Object.entries(step.map_inputs)) {
        // Check if this is a workflow input reference
        if (sanitizedInputs.hasOwnProperty(mappingValue)) {
          toolInputs[toolInputKey] = sanitizedInputs[mappingValue];
        }
        // Check if this is a context reference (from previous step)
        else if (context.hasOwnProperty(mappingValue)) {
          toolInputs[toolInputKey] = context[mappingValue];
        }
        // Otherwise, treat as a literal value
        else if (mappingValue) {
          toolInputs[toolInputKey] = mappingValue;
        }
      }

      // Handle use_previous_output - inject previous step's output
      let extraContext = '';
      if (step.use_previous_output && context[step.use_previous_output]) {
        extraContext = context[step.use_previous_output];
        console.log(`[run-workflow] Using previous output: ${step.use_previous_output} (${extraContext.length} chars)`);

        // For blog and linkedin generators, inject the content_brief
        if (step.tool_id === 'youtube-blog-post-generator' || step.tool_id === 'youtube-linkedin-post-generator') {
          toolInputs['content_brief'] = extraContext;
        }
      }

      // Build system prompt
      const filledSystemPrompt = interpolatePrompt(
        toolConfig.system_prompt,
        toolInputs
      );

      // Build user content
      let userContent = '';
      if (step.tool_id === 'youtube-content-brief') {
        userContent = `Here is the video transcript:\n\n${transcript}`;
      } else if (step.tool_id === 'youtube-blog-post-generator' || step.tool_id === 'youtube-linkedin-post-generator') {
        userContent = `Please generate content based on the provided content brief in the system prompt.`;
      } else {
        userContent = extraContext || 'Please generate the requested content.';
      }

      console.log(`[run-workflow] Calling LLM for step: ${step.step_id}`);

      // Call LLM
      const llmResponse = await callLLM({
        systemPrompt: filledSystemPrompt,
        userContent: userContent,
        temperature: 0.7,
        maxTokens: 4000
      });

      // Store output in context
      context[step.output_key] = llmResponse.content;
      console.log(`[run-workflow] Step ${step.step_id} completed: ${llmResponse.content.length} characters`);
    }

    // Build final output based on layout configuration
    const sections = workflowConfig.final_output_layout.sections.map(section => ({
      id: section.id,
      label: section.label,
      content: context[section.source] || ''
    }));

    console.log(`[run-workflow] Workflow completed successfully`);
    console.log(`[run-workflow] Generated ${sections.length} sections`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        workflow_id: workflow_id,
        sections: sections
      } as RunWorkflowResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[run-workflow] Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      } as RunWorkflowResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Prevent this endpoint from being pre-rendered
export const prerender = false;
