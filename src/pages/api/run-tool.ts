/**
 * API Endpoint: /api/run-tool
 *
 * Executes a single tool with provided inputs
 * NOW WITH: Auth, Credit Check, and History Tracking
 */

import type { APIRoute } from 'astro';
import type { RunToolRequest, RunToolResponse } from '../../types/workflow';
import { getToolById } from '../../config/tools';
import { callLLM, interpolatePrompt, validateInputs, sanitizeInput, truncateForLogging } from '../../utils/llm';
import { getYouTubeTranscript, extractVideoId } from '../../utils/youtube';
import {
  getUserFromRequest,
  checkUserCredits,
  deductCredit,
  saveGeneration
} from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    // ===== STEP 1: AUTHENTICATION =====
    const user = await getUserFromRequest(request);

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Authentication required. Please sign in to use this tool.',
          requiresAuth: true
        } as RunToolResponse),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`[run-tool] User authenticated: ${user.id}`);

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

    // ===== STEP 2: CREDIT CHECK =====
    const { canGenerate, credits, isPro } = await checkUserCredits(user.id);

    if (!canGenerate) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'You have no credits remaining. Please upgrade to Pro for unlimited generations.',
          requiresUpgrade: true,
          credits: 0,
          isPro: false
        } as RunToolResponse),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`[run-tool] Credit check passed. Credits: ${credits}, Pro: ${isPro}`);

    // Sanitize all inputs (skip sanitization for base64 image data)
    const sanitizedInputs: Record<string, string> = {};
    for (const [key, value] of Object.entries(inputs)) {
      if (key === 'image_upload' && value.startsWith('data:image/')) {
        sanitizedInputs[key] = value;
      } else {
        sanitizedInputs[key] = sanitizeInput(value);
      }
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

    // Handle YouTube transcript
    let transcript = '';
    let videoTitle = '';

    // All YouTube tools need transcript
    const youtubeTools = [
      'youtube-content-brief',
      'youtube-blog-post-generator',
      'youtube-linkedin-post-generator',
      'youtube-to-blog-and-linkedin'
    ];

    if (youtubeTools.includes(tool_id) && sanitizedInputs.youtube_url) {
      // Check if transcript was already fetched client-side
      if (sanitizedInputs.youtube_transcript) {
        console.log(`[run-tool] Using client-side fetched transcript: ${sanitizedInputs.youtube_transcript.length} characters`);
        transcript = sanitizedInputs.youtube_transcript;

        // Extract video ID for reference
        const videoId = extractVideoId(sanitizedInputs.youtube_url);
        videoTitle = sanitizedInputs.video_title || `YouTube Video ${videoId}`;
      } else {
        // Fallback: Fetch server-side (will likely fail due to YouTube blocking)
        try {
          console.log(`[run-tool] No client-side transcript provided, attempting server-side fetch for: ${sanitizedInputs.youtube_url}`);
          console.log(`[run-tool] WARNING: Server-side fetching often fails due to YouTube blocking cloud IPs`);
          transcript = await getYouTubeTranscript(sanitizedInputs.youtube_url);
          console.log(`[run-tool] Transcript fetched: ${transcript.length} characters`);

          // Extract video ID for reference
          const videoId = extractVideoId(sanitizedInputs.youtube_url);
          videoTitle = sanitizedInputs.video_title || `YouTube Video ${videoId}`;
        } catch (error) {
          console.error('[run-tool] Transcript fetch error:', error);
          const errorMsg = error instanceof Error ? error.message : String(error);
          console.error('[run-tool] Full error details:', error);
          return new Response(
            JSON.stringify({
              success: false,
              error: `Failed to fetch YouTube transcript: ${errorMsg}`
            } as RunToolResponse),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
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

    if (youtubeTools.includes(tool_id)) {
      // For all YouTube tools, pass the transcript
      if (transcript) {
        userContent = `Here is the video transcript:\n\n${transcript}`;
      } else {
        // Fallback to extra context if transcript wasn't fetched
        userContent = extra_context?.transcript || extra_context?.content_brief || 'Please generate the requested content.';
      }
    } else {
      // Generic handling for non-YouTube tools
      userContent = extra_context?.transcript || extra_context?.content_brief || 'Please generate the requested content.';
    }

    console.log(`[run-tool] User content length: ${userContent.length} characters`);
    console.log(`[run-tool] User content preview: ${truncateForLogging(userContent)}`);

    // ===== STEP 3: CALL LLM =====
    console.log(`[run-tool] Calling LLM...`);

    // Special handling for image-to-prompt tool (vision API)
    const llmRequest: any = {
      systemPrompt: filledSystemPrompt,
      userContent: userContent,
      temperature: 0.7,
      maxTokens: 4000
    };

    // If this is the image-to-prompt tool, extract base64 image data for vision API
    if (tool_id === 'image-to-prompt' && sanitizedInputs.image_upload) {
      const dataUrl = sanitizedInputs.image_upload;
      const matches = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/s);
      if (matches) {
        llmRequest.imageBase64 = matches[2];
        llmRequest.imageMediaType = matches[1];
        console.log(`[run-tool] Using vision API with uploaded image (${matches[1]}, ${Math.round(matches[2].length / 1024)}KB base64)`);
      } else {
        console.error(`[run-tool] Invalid image data URL format`);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Invalid image format. Please upload a JPG, PNG, or WebP image.'
          } as RunToolResponse),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const llmResponse = await callLLM(llmRequest);

    console.log(`[run-tool] LLM response received: ${llmResponse.content.length} characters`);
    console.log(`[run-tool] Tokens used: ${llmResponse.tokensUsed || 'unknown'}`);

    // ===== STEP 4: DEDUCT CREDIT (if not Pro) =====
    if (!isPro) {
      await deductCredit(user.id);
      console.log(`[run-tool] Credit deducted. Remaining: ${credits - 1}`);
    }

    // ===== STEP 5: SAVE TO HISTORY =====
    await saveGeneration({
      userId: user.id,
      type: tool_id,
      inputContext: {
        inputs: sanitizedInputs,
        youtube_url: sanitizedInputs.youtube_url,
        tool_config: {
          id: tool_id,
          category: toolConfig.category
        }
      },
      outputContent: llmResponse.content,
      videoTitle: videoTitle || sanitizedInputs.video_title,
      tokensUsed: llmResponse.tokensUsed
    });

    console.log(`[run-tool] Generation saved to history`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        tool_id: tool_id,
        output: llmResponse.content,
        creditsRemaining: isPro ? -1 : credits - 1, // -1 means unlimited
        isPro: isPro
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
