/**
 * LLM Client Wrapper
 *
 * Abstracts LLM API calls (OpenAI, Anthropic, etc.)
 * Provides a unified interface for calling language models
 */

export interface LLMRequest {
  systemPrompt: string;
  userContent: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
  imageUrl?: string; // For vision API calls (URL-based)
  imageBase64?: string; // For vision API calls (direct base64 data)
  imageMediaType?: string; // e.g. 'image/jpeg', 'image/png'
}

export interface LLMResponse {
  content: string;
  tokensUsed?: number;
  model?: string;
}

/**
 * Call LLM with system prompt and user content
 *
 * This is a generic wrapper that can be configured to use different LLM providers
 */
export async function callLLM(request: LLMRequest): Promise<LLMResponse> {
  // Apply defaults and pass the full request to providers
  const fullRequest: LLMRequest = {
    ...request,
    temperature: request.temperature ?? 0.7,
    maxTokens: request.maxTokens ?? 4000,
    model: request.model ?? 'gpt-4-turbo-preview'
  };

  // Determine which provider to use based on environment variables
  const provider = process.env.LLM_PROVIDER || 'openai';

  try {
    // Force Anthropic for vision requests (only Anthropic supports image analysis)
    if (fullRequest.imageBase64 || fullRequest.imageUrl) {
      return await callAnthropic(fullRequest);
    }

    switch (provider.toLowerCase()) {
      case 'openai':
        return await callOpenAI(fullRequest);

      case 'anthropic':
        return await callAnthropic(fullRequest);

      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }
  } catch (error) {
    console.error('LLM API Error:', error);
    throw new Error(
      'Failed to generate content. ' +
      (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * OpenAI Implementation
 */
async function callOpenAI(request: LLMRequest): Promise<LLMResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: request.model || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: request.systemPrompt
        },
        {
          role: 'user',
          content: request.userContent
        }
      ],
      temperature: request.temperature,
      max_tokens: request.maxTokens
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `OpenAI API error: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();

  return {
    content: data.choices[0]?.message?.content || '',
    tokensUsed: data.usage?.total_tokens,
    model: data.model
  };
}

/**
 * Anthropic (Claude) Implementation
 */
async function callAnthropic(request: LLMRequest): Promise<LLMResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  // Prepare message content - handle vision if image data is provided
  let messageContent: any;

  if (request.imageBase64 && request.imageMediaType) {
    // Direct base64 image data (from file upload)
    messageContent = [
      {
        type: 'image',
        source: {
          type: 'base64',
          media_type: request.imageMediaType,
          data: request.imageBase64
        }
      },
      {
        type: 'text',
        text: request.userContent
      }
    ];
  } else if (request.imageUrl) {
    // URL-based image (fetch and convert to base64)
    try {
      const imageResponse = await fetch(request.imageUrl);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
      }

      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');

      const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
      const mediaType = contentType.includes('png') ? 'image/png' :
                       contentType.includes('gif') ? 'image/gif' :
                       contentType.includes('webp') ? 'image/webp' : 'image/jpeg';

      messageContent = [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: mediaType,
            data: base64Image
          }
        },
        {
          type: 'text',
          text: request.userContent
        }
      ];
    } catch (error) {
      console.error('Error fetching image for vision API:', error);
      throw new Error(`Failed to process image: ${error instanceof Error ? error.message : String(error)}`);
    }
  } else {
    // Text-only: content is a string
    messageContent = request.userContent;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: (request.imageBase64 || request.imageUrl) ? 'claude-3-5-sonnet-20241022' : (request.model || 'claude-3-5-sonnet-20241022'),
      max_tokens: request.maxTokens || 4000,
      temperature: request.temperature,
      system: request.systemPrompt,
      messages: [
        {
          role: 'user',
          content: messageContent
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Anthropic API error: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();

  return {
    content: data.content[0]?.text || '',
    tokensUsed: data.usage?.input_tokens + data.usage?.output_tokens,
    model: data.model
  };
}

/**
 * Interpolate placeholders in prompt template
 *
 * Replaces {placeholder} with actual values from the inputs object
 */
export function interpolatePrompt(
  template: string,
  values: Record<string, string>
): string {
  let result = template;

  // Replace all {placeholder} patterns
  for (const [key, value] of Object.entries(values)) {
    const placeholder = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(placeholder, value || '');
  }

  // Warn about any remaining unreplaced placeholders
  const remainingPlaceholders = result.match(/\{[^}]+\}/g);
  if (remainingPlaceholders && remainingPlaceholders.length > 0) {
    console.warn('Unreplaced placeholders found:', remainingPlaceholders);
  }

  return result;
}

/**
 * Validate inputs against configuration
 */
export function validateInputs(
  inputs: Record<string, string>,
  requiredFields: string[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const field of requiredFields) {
    if (!inputs[field] || inputs[field].trim() === '') {
      errors.push(`Missing required field: ${field}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  // Remove potential script tags and other dangerous patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Truncate long text for logging
 */
export function truncateForLogging(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '... (truncated)';
}
