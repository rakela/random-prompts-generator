/**
 * Export utility functions for different file formats
 * Supports: JSON, Markdown, CSV, and browser-based PDF printing
 */

export interface Prompt {
  id: number;
  text: string;
  category: string;
  timestamp: string;
  isMultiple?: boolean;
  saved?: boolean;
  favorited?: boolean;
}

/**
 * Export prompts as JSON
 */
export function exportAsJSON(prompts: Prompt[], filename: string = 'prompts.json') {
  const dataStr = JSON.stringify(prompts, null, 2);
  downloadFile(dataStr, filename, 'application/json');
}

/**
 * Export prompts as Markdown
 */
export function exportAsMarkdown(prompts: Prompt[], filename: string = 'prompts.md') {
  let markdown = `# Saved Prompts\n\n`;
  markdown += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
  markdown += `Total prompts: ${prompts.length}\n\n`;
  markdown += `---\n\n`;

  prompts.forEach((prompt, index) => {
    markdown += `## Prompt ${index + 1}\n\n`;
    markdown += `**Category:** ${prompt.category}\n\n`;
    markdown += `**Date:** ${new Date(prompt.timestamp).toLocaleString()}\n\n`;

    if (prompt.favorited) {
      markdown += `**⭐ Favorited**\n\n`;
    }

    markdown += `${prompt.text}\n\n`;
    markdown += `---\n\n`;
  });

  downloadFile(markdown, filename, 'text/markdown');
}

/**
 * Export prompts as CSV
 */
export function exportAsCSV(prompts: Prompt[], filename: string = 'prompts.csv') {
  // CSV Headers
  const headers = ['ID', 'Category', 'Timestamp', 'Favorited', 'Text'];

  // Build CSV content
  let csv = headers.join(',') + '\n';

  prompts.forEach(prompt => {
    const row = [
      prompt.id,
      prompt.category,
      prompt.timestamp,
      prompt.favorited ? 'Yes' : 'No',
      `"${escapeCSV(prompt.text)}"` // Escape quotes and wrap in quotes
    ];
    csv += row.join(',') + '\n';
  });

  downloadFile(csv, filename, 'text/csv');
}

/**
 * Export prompts as plain text
 */
export function exportAsText(prompts: Prompt[], filename: string = 'prompts.txt') {
  let text = `Saved Prompts\n`;
  text += `Generated on: ${new Date().toLocaleDateString()}\n`;
  text += `Total prompts: ${prompts.length}\n`;
  text += `${'='.repeat(60)}\n\n`;

  prompts.forEach((prompt, index) => {
    text += `Prompt ${index + 1}\n`;
    text += `Category: ${prompt.category}\n`;
    text += `Date: ${new Date(prompt.timestamp).toLocaleString()}\n`;
    if (prompt.favorited) text += `⭐ Favorited\n`;
    text += `\n${prompt.text}\n\n`;
    text += `${'-'.repeat(60)}\n\n`;
  });

  downloadFile(text, filename, 'text/plain');
}

/**
 * Print prompts to PDF (uses browser print dialog)
 */
export function exportAsPDF(prompts: Prompt[]) {
  // Create a printable HTML page
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export as PDF');
    return;
  }

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Saved Prompts</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.6;
        }
        h1 {
          color: #333;
          border-bottom: 3px solid #3B82F6;
          padding-bottom: 10px;
        }
        .meta {
          color: #666;
          margin-bottom: 30px;
        }
        .prompt {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        .prompt-header {
          background: #f3f4f6;
          padding: 10px 15px;
          border-left: 4px solid #3B82F6;
          margin-bottom: 10px;
        }
        .prompt-title {
          font-weight: bold;
          color: #333;
        }
        .prompt-meta {
          font-size: 0.9em;
          color: #666;
          margin-top: 5px;
        }
        .prompt-text {
          padding: 15px;
          background: #fafafa;
          border-radius: 4px;
        }
        .favorite {
          color: #F59E0B;
          font-weight: bold;
        }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <h1>Saved Prompts</h1>
      <div class="meta">
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Total Prompts:</strong> ${prompts.length}</p>
      </div>
  `;

  prompts.forEach((prompt, index) => {
    html += `
      <div class="prompt">
        <div class="prompt-header">
          <div class="prompt-title">Prompt ${index + 1} - ${prompt.category}</div>
          <div class="prompt-meta">
            ${new Date(prompt.timestamp).toLocaleString()}
            ${prompt.favorited ? '<span class="favorite"> ⭐ Favorited</span>' : ''}
          </div>
        </div>
        <div class="prompt-text">${escapeHTML(prompt.text)}</div>
      </div>
    `;
  });

  html += `
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for content to load, then trigger print dialog
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}

/**
 * Helper function to download a file
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Escape special characters in CSV
 */
function escapeCSV(text: string): string {
  return text.replace(/"/g, '""'); // Escape double quotes
}

/**
 * Escape HTML special characters
 */
function escapeHTML(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
