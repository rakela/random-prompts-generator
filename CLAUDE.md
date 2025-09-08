# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based Random Prompt Generator application built as a single TSX component. The application generates creative prompts for five different categories: writing, AI art, blog posts, fantasy worldbuilding, and character names.

## Architecture

- **Single Component**: The entire application is contained in `prompt-generator.tsx`
- **Data-Driven**: Uses structured data dictionaries in `promptData` object for each category
- **Template System**: Employs a template processor that replaces placeholders (e.g., `{genre}`) with random selections from data arrays
- **State Management**: Uses React hooks for local state management (no external state library)

## Key Components

### Data Structure
Each category in `promptData` contains:
- Arrays of content elements (genres, styles, subjects, etc.)
- Templates with placeholder syntax `{key}` that map to data arrays
- Templates are processed by `processTemplate()` function

### Core Functions
- `weightedRandom()`: Handles random selection from arrays (supports weighted selection)
- `processTemplate()`: Replaces template placeholders with random data selections
- `generatePrompt()`: Main generation logic that combines templates with data

### UI Structure
- Tab-based navigation between categories
- Dynamic controls per category (rendered by `renderControls()`)
- Prompt cards with copy, save, and regenerate actions
- Saved prompts section with export functionality

## Development Notes

- No build system or package.json detected - this appears to be a standalone React component
- Uses modern React hooks (useState, useCallback, useMemo)
- Styled with Tailwind CSS classes
- Icons from Lucide React
- No testing framework detected
- No TypeScript configuration files present

## Adding New Categories

To add a new prompt category:
1. Add data structure to `promptData` object with arrays and templates
2. Add tab configuration to `tabs` array
3. Add color mapping in `getTabColor()`
4. Add controls in `renderControls()` if needed
5. Add SEO content section if desired

## Modifying Templates

Templates use simple placeholder syntax: `{key}` maps to arrays in the data structure. The `processTemplate()` function handles the replacement logic.