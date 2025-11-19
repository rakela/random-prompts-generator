import React, { useState, useRef, useEffect } from 'react';
import { Download, FileJson, FileText, FileSpreadsheet, Printer, ChevronDown } from 'lucide-react';
import { exportAsJSON, exportAsMarkdown, exportAsCSV, exportAsText, exportAsPDF, Prompt } from '../utils/exportFormats';

interface ExportMenuProps {
  prompts: Prompt[];
  category: string;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ prompts, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (format: 'json' | 'markdown' | 'csv' | 'text' | 'pdf') => {
    if (prompts.length === 0) {
      alert('No prompts to export!');
      return;
    }

    const filename = `${category}-prompts-${Date.now()}`;

    switch (format) {
      case 'json':
        exportAsJSON(prompts, `${filename}.json`);
        break;
      case 'markdown':
        exportAsMarkdown(prompts, `${filename}.md`);
        break;
      case 'csv':
        exportAsCSV(prompts, `${filename}.csv`);
        break;
      case 'text':
        exportAsText(prompts, `${filename}.txt`);
        break;
      case 'pdf':
        exportAsPDF(prompts);
        break;
    }

    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        aria-label="Export prompts"
      >
        <Download size={18} />
        Export ({prompts.length})
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleExport('json')}
              className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FileJson size={18} className="text-blue-600" />
              <div>
                <div className="font-medium">JSON</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Machine-readable format</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('markdown')}
              className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FileText size={18} className="text-purple-600" />
              <div>
                <div className="font-medium">Markdown</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Formatted text file</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('csv')}
              className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FileSpreadsheet size={18} className="text-green-600" />
              <div>
                <div className="font-medium">CSV</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Open in Excel/Sheets</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('text')}
              className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FileText size={18} className="text-gray-600" />
              <div>
                <div className="font-medium">Plain Text</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Simple .txt file</div>
              </div>
            </button>

            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            <button
              onClick={() => handleExport('pdf')}
              className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <Printer size={18} className="text-red-600" />
              <div>
                <div className="font-medium">Print to PDF</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Browser print dialog</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
