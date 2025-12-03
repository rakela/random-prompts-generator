/**
 * API Endpoint: /api/run-tool
 *
 * Executes a single tool with provided inputs
 */

import type { APIRoute } from 'astro';
import type { RunToolRequest, RunToolResponse } from '../../types/workflow';
import { getToolById } from '../../config/tools';
import { callLLM, interpolatePrompt, validateInputs, sanitizeInput, truncateForLogging } from '../../utils/llm';
import { getYouTubeTranscript } from '../../utils/youtube';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body: RunToolRequest = await request.json();
    const { tool_id, inputs, extra_context } = body;

    console.log(`[run-tool] Executing tool: ${tool_id}`);
    console.log(`[run-tool] Inputs:`, Object.keys(inputs));

    // Validate tool exists
    const toolConfig = getToolById(tool_id);
    if (!toolConfig) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Tool not found: ${tool_id}`
        } as RunToolResponse),
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
    const requiredFields = toolConfig.inputs
      .filter(input => input.required)
      .map(input => input.id);

    const validation = validateInputs(sanitizedInputs, requiredFields);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Validation failed: ${validation.errors.join(', ')}`
        } as RunToolResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Handle YouTube transcript fetching if needed
    let transcript = '';
    if (tool_id === 'youtube-content-brief' && sanitizedInputs.youtube_url) {
      try {
        console.log(`[run-tool] Fetching YouTube transcript for: ${sanitizedInputs.youtube_url}`);
        transcript = await getYouTubeTranscript(sanitizedInputs.youtube_url);
        console.log(`[run-tool] Transcript fetched: ${transcript.length} characters`);
      } catch (error) {
        console.error('[run-tool] Transcript fetch error:', error);
        return new Response(
          JSON.stringify({
            success: false,
            error: `Failed to fetch YouTube transcript: ${error instanceof Error ? error.message : String(error)}`
          } as RunToolResponse),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Build the system prompt by interpolating placeholders
    const filledSystemPrompt = interpolatePrompt(
      toolConfig.system_prompt,
      sanitizedInputs
    );

    console.log(`[run-tool] System prompt length: ${filledSystemPrompt.length} characters`);

    // Build user content based on tool type
    let userContent = '';

    if (tool_id === 'youtube-content-brief') {
      // For content brief, pass the transcript
      userContent = `Here is the video transcript:\n\n${transcript}`;
    } else if (tool_id === 'youtube-blog-post-generator' || tool_id === 'youtube-linkedin-post-generator') {
      // For blog/linkedin, the content_brief is already in the inputs
      // The system prompt will have it interpolated
      // Pass any extra context if provided
      if (extra_context?.content_brief) {
        userContent = `Content Brief:\n\n${extra_context.content_brief}`;
      } else {
        userContent = 'Please generate content based on the provided content brief.';
      }
    } else {
      // Generic handling
      userContent = extra_context?.transcript || extra_context?.content_brief || 'Please generate the requested content.';
    }

    console.log(`[run-tool] User content length: ${userContent.length} characters`);
    console.log(`[run-tool] User content preview: ${truncateForLogging(userContent)}`);

    // Call LLM
    console.log(`[run-tool] Calling LLM...`);
    const llmResponse = await callLLM({
      systemPrompt: filledSystemPrompt,
      userContent: userContent,
      temperature: 0.7,
      maxTokens: 4000
    });

    console.log(`[run-tool] LLM response received: ${llmResponse.content.length} characters`);
    console.log(`[run-tool] Tokens used: ${llmResponse.tokensUsed || 'unknown'}`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        tool_id: tool_id,
        output: llmResponse.content
      } as RunToolResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[run-tool] Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      } as RunToolResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Prevent this endpoint from being pre-rendered
export const prerender = false;
