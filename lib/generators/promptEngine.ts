import { promptData, PromptCategory } from './promptData';

// Weighted random selection
export const weightedRandom = <T>(items: T[], weights: number[] | null = null): T => {
  if (!weights) return items[Math.floor(Math.random() * items.length)];

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
};

// Enhanced template processor with quality controls
export const processTemplate = (
  template: string,
  data: any,
  category: PromptCategory,
  controls: Record<string, any> = {}
): string => {
  if (category === 'names') {
    // Special handling for names
    const selectedCulture = controls.origin && controls.origin !== 'any'
      ? controls.origin
      : weightedRandom(['elvish', 'dwarven', 'human', 'exotic']);

    const cultureData = data[selectedCulture];
    const nameType = controls.type || 'full';

    const firstName = weightedRandom(cultureData.first);
    const lastName = weightedRandom(cultureData.last);
    const title = weightedRandom(data.titles);

    switch (nameType) {
      case 'first':
        return firstName;
      case 'title':
        return `${firstName} ${title}`;
      case 'house':
        return `${firstName} of House ${lastName}`;
      default:
        return `${firstName} ${lastName}`;
    }
  }

  if (category === 'persuasive') {
    // Special handling for persuasive prompts
    const type = controls.type || 'all';

    let sourceArray: string[] = [];
    if (type === 'topics') {
      sourceArray = data.topics;
    } else if (type === 'titles') {
      sourceArray = data.titles;
    } else {
      // 'all' - combine both
      sourceArray = [...data.topics, ...data.titles];
    }

    return weightedRandom(sourceArray);
  }

  // Regular template processing for other categories
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

// Quality enhancement functions
export const enhanceWritingPrompt = (prompt: string): string => {
  // Add emotional stakes and specificity
  const enhancements = [
    ' Focus on the internal conflict.',
    ' Include a ticking clock element.',
    ' Show the cost of failure.',
    ' Add a moral dilemma.',
    ' Include sensory details.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(enhancements);
  }

  return prompt;
};

export const enhanceAIArtPrompt = (prompt: string): string => {
  // Add technical quality modifiers
  const qualityModifiers = [
    ', ultra detailed, 8k resolution',
    ', professional photography',
    ', award winning composition',
    ', cinematic lighting',
    ', sharp focus, detailed textures'
  ];

  return prompt + weightedRandom(qualityModifiers);
};

export const enhanceBlogPrompt = (prompt: string): string => {
  // Add SEO and engagement tips
  const seoTips = [
    ' Target long-tail keywords.',
    ' Include actionable takeaways.',
    ' Add personal anecdotes.',
    ' Use data and statistics.',
    ' Include expert quotes.'
  ];

  if (Math.random() < 0.4) {
    prompt += weightedRandom(seoTips);
  }

  return prompt;
};

export const enhanceFantasyPrompt = (prompt: string): string => {
  // Add worldbuilding depth
  const worldbuilding = [
    ' Consider the economic implications.',
    ' Think about the cultural conflicts.',
    ' Explore the magic system\'s limitations.',
    ' Add political intrigue.',
    ' Include ancient history.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(worldbuilding);
  }

  return prompt;
};

// Main generation function
export const generatePrompt = (
  category: PromptCategory,
  controls: Record<string, any> = {}
): string => {
  const data = promptData[category];
  if (!data) {
    return 'Invalid category selected';
  }

  // For names with count control
  if (category === 'names' && controls.count) {
    const count = controls.count === 'multiple' ? 5 : controls.count === 'batch' ? 10 : 1;
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const template = ''; // Names don't use templates
      names.push(processTemplate(template, data, category, controls));
    }
    return names.join('\n');
  }

  // Select a random template
  const template = data.templates ? weightedRandom(data.templates) : '';

  // Process the template
  let prompt = processTemplate(template, data, category, controls);

  // Apply category-specific enhancements
  switch (category) {
    case 'writing':
      prompt = enhanceWritingPrompt(prompt);
      break;
    case 'aiArt':
      prompt = enhanceAIArtPrompt(prompt);
      break;
    case 'blog':
      prompt = enhanceBlogPrompt(prompt);
      break;
    case 'fantasy':
      prompt = enhanceFantasyPrompt(prompt);
      break;
  }

  return prompt;
};

// Generate multiple prompts at once
export const generateMultiplePrompts = (
  category: PromptCategory,
  count: number,
  controls: Record<string, any> = {}
): string[] => {
  const prompts: string[] = [];
  for (let i = 0; i < count; i++) {
    prompts.push(generatePrompt(category, controls));
  }
  return prompts;
};
