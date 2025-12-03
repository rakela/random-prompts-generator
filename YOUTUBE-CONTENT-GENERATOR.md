# YouTube Content Generator - Documentation

## Overview

A complete system for transforming YouTube videos into multiple content formats:
- **Content Briefs**: Structured summaries with key insights
- **Blog Posts**: SEO-optimized articles
- **LinkedIn Posts**: Engagement-optimized social content

## Architecture

### Components

1. **Tools** (`/src/config/tools.ts`)
   - Individual content generation tools
   - Each tool has configurable inputs and prompts
   - Three tools available:
     - `youtube-content-brief`
     - `youtube-blog-post-generator`
     - `youtube-linkedin-post-generator`

2. **Workflows** (`/src/config/workflows.ts`)
   - Multi-step automated processes
   - Chain multiple tools together
   - One workflow available:
     - `youtube-to-blog-and-linkedin`

3. **API Endpoints** (`/src/pages/api/`)
   - `POST /api/run-tool` - Execute a single tool
   - `POST /api/run-workflow` - Execute a complete workflow

4. **Frontend Pages**
   - `/tools` - List all tools
   - `/tools/[tool_id]` - Individual tool page
   - `/workflows` - List all workflows
   - `/workflows/[workflow_id]` - Individual workflow page

### Data Flow

```
User Input (YouTube URL + Config)
    ↓
API Endpoint (/api/run-tool or /api/run-workflow)
    ↓
YouTube Transcript Fetcher (src/utils/youtube.ts)
    ↓
LLM Client (src/utils/llm.ts)
    ↓
OpenAI/Anthropic API
    ↓
Generated Content
    ↓
User Interface (Copy, Save, Export)
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Choose your LLM provider
LLM_PROVIDER=openai

# OpenAI API Key (if using OpenAI)
OPENAI_API_KEY=sk-...

# OR Anthropic API Key (if using Anthropic)
ANTHROPIC_API_KEY=sk-ant-...
```

**Get API Keys:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/

### 3. YouTube Transcript Setup

Currently, the YouTube transcript fetcher is a placeholder. You need to implement one of these options:

#### Option A: Using youtube-transcript package (Recommended)

```bash
npm install youtube-transcript
```

Then update `/src/utils/youtube.ts`:

```typescript
import { YoutubeTranscript } from 'youtube-transcript';

export async function getYouTubeTranscript(videoUrl: string): Promise<string> {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const transcript = await YoutubeTranscript.fetchTranscript(videoId);
  return transcript.map(item => item.text).join(' ');
}
```

#### Option B: Using a Third-Party API

If you prefer using a transcript API service, update the fetch URL in `/src/utils/youtube.ts` to point to your service.

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- http://localhost:4321/tools
- http://localhost:4321/workflows

### 5. Build for Production

```bash
npm run build
```

## Usage

### Using Individual Tools

1. Navigate to `/tools`
2. Select a tool (e.g., YouTube Content Brief Generator)
3. Fill in the form:
   - YouTube URL
   - Target audience
   - Primary goal
   - Language preferences
4. Click "Generate Content"
5. Copy the generated content

### Using Workflows

1. Navigate to `/workflows`
2. Select the "YouTube to Blog & LinkedIn" workflow
3. Fill in all configuration options
4. Click "Generate All Content"
5. Wait for all steps to complete (1-3 minutes)
6. View results in tabs:
   - Content Brief
   - Blog Post
   - LinkedIn Posts
7. Copy each section as needed

## API Reference

### POST /api/run-tool

Execute a single tool.

**Request Body:**
```json
{
  "tool_id": "youtube-content-brief",
  "inputs": {
    "youtube_url": "https://www.youtube.com/watch?v=...",
    "video_title": "Optional title",
    "target_audience": "General Public",
    "primary_goal": "Educational Content",
    "language": "English"
  }
}
```

**Response:**
```json
{
  "success": true,
  "tool_id": "youtube-content-brief",
  "output": "# Content Brief...\n\n[Generated content]"
}
```

### POST /api/run-workflow

Execute a complete workflow.

**Request Body:**
```json
{
  "workflow_id": "youtube-to-blog-and-linkedin",
  "inputs": {
    "youtube_url": "https://www.youtube.com/watch?v=...",
    "video_title": "Optional",
    "target_audience": "General Public",
    "primary_goal": "Educational Content",
    "blog_length": "1,000-1,500 words (Standard)",
    "blog_tone": "Conversational",
    "linkedin_style": "Key takeaways list",
    "linkedin_variants": "2",
    "language": "English"
  }
}
```

**Response:**
```json
{
  "success": true,
  "workflow_id": "youtube-to-blog-and-linkedin",
  "sections": [
    {
      "id": "summary",
      "label": "Content Brief",
      "content": "# Content Brief...\n"
    },
    {
      "id": "blog",
      "label": "Blog Post (Markdown)",
      "content": "# Blog Post Title...\n"
    },
    {
      "id": "linkedin",
      "label": "LinkedIn Posts",
      "content": "### LinkedIn Post Variant 1...\n"
    }
  ]
}
```

## Customization

### Adding a New Tool

1. Create a new `ToolConfig` in `/src/config/tools.ts`:

```typescript
export const myNewTool: ToolConfig = {
  tool_id: "my-new-tool",
  seo_title: "My New Tool",
  seo_description: "Description",
  category: "YouTube Tools",
  inputs: [
    // Define inputs...
  ],
  system_prompt: `Your prompt template with {placeholders}`
};
```

2. Add to the tools registry:

```typescript
export const tools: Record<string, ToolConfig> = {
  // ...existing tools
  "my-new-tool": myNewTool
};
```

3. The new tool will automatically appear at `/tools/my-new-tool`

### Adding a New Workflow

1. Create a new `WorkflowConfig` in `/src/config/workflows.ts`:

```typescript
export const myWorkflow: WorkflowConfig = {
  workflow_id: "my-workflow",
  // ...configuration
  steps: [
    {
      step_id: "step_1",
      tool_id: "youtube-content-brief",
      map_inputs: { /* ... */ },
      output_key: "brief"
    }
    // Add more steps...
  ]
};
```

2. Add to the workflows registry:

```typescript
export const workflows: Record<string, WorkflowConfig> = {
  // ...existing workflows
  "my-workflow": myWorkflow
};
```

### Modifying Prompts

All system prompts are stored in `/src/config/tools.ts`. Edit the `system_prompt` field to customize the AI's behavior.

**Tips:**
- Use `{placeholder}` syntax for dynamic values
- Be specific about output format
- Include examples when helpful
- Specify tone and style clearly

## Performance Considerations

### LLM API Costs

- Each tool call costs tokens based on:
  - Input: System prompt + user content (transcript/brief)
  - Output: Generated content
- Typical workflow (3 steps):
  - Content Brief: ~2,000-4,000 tokens
  - Blog Post: ~3,000-5,000 tokens
  - LinkedIn Posts: ~1,500-3,000 tokens
  - **Total: ~6,500-12,000 tokens per workflow**

### Optimization Tips

1. **Use appropriate models:**
   - GPT-4 Turbo for quality
   - GPT-3.5 Turbo for speed/cost
   - Claude Sonnet for balance

2. **Adjust max_tokens:**
   - Edit in `/src/utils/llm.ts`
   - Lower for shorter content
   - Higher for comprehensive articles

3. **Cache transcripts:**
   - Implement caching layer
   - Avoid re-fetching same videos

## Troubleshooting

### "Failed to fetch transcript"

**Solutions:**
1. Ensure video has captions/subtitles enabled
2. Check if video is public
3. Implement proper transcript fetcher (see Setup step 3)
4. Verify API credentials if using third-party service

### "OPENAI_API_KEY not set"

**Solution:**
1. Create `.env` file in project root
2. Add `OPENAI_API_KEY=your_key_here`
3. Restart dev server

### "Rate limit exceeded"

**Solution:**
1. Check your API usage limits
2. Implement rate limiting on frontend
3. Add retry logic with exponential backoff

### API endpoints return 404

**Solution:**
1. Ensure `prerender: false` is set in API routes
2. Check Astro configuration: `output: 'static'` or `'server'`
3. For static builds, use Vercel/Netlify serverless functions

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `LLM_PROVIDER`
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Add environment variables
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Deploy

### Environment Variables for Production

Make sure to add these in your hosting platform:
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `LLM_PROVIDER`
- Any YouTube transcript API credentials

## Next Steps: User Profiles & Authentication

For the next phase (user profiles, logins), consider:

1. **Authentication Provider:**
   - Clerk (easiest integration)
   - Auth0
   - Supabase Auth
   - NextAuth.js

2. **Database:**
   - Store user preferences
   - Save generation history
   - Usage tracking
   - Saved templates

3. **Features to Add:**
   - User dashboard
   - Generation history
   - Custom templates
   - Team collaboration
   - API access
   - Usage analytics

## File Structure

```
/src
  /config
    tools.ts          # Tool configurations
    workflows.ts      # Workflow configurations
  /types
    workflow.ts       # TypeScript types
  /utils
    llm.ts           # LLM client wrapper
    youtube.ts       # YouTube transcript fetcher
  /pages
    /api
      run-tool.ts    # Tool execution endpoint
      run-workflow.ts # Workflow execution endpoint
    /tools
      index.astro    # Tools listing page
      [tool_id].astro # Dynamic tool page
    /workflows
      index.astro    # Workflows listing page
      [workflow_id].astro # Dynamic workflow page
  /components
    ToolPage.tsx     # Tool page component
    WorkflowPage.tsx # Workflow page component
```

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Test with sample YouTube URLs
4. Verify API keys are valid
5. Check browser console for errors

## License

[Your License Here]
