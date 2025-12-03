import React, { useState, FormEvent } from 'react';
import type { WorkflowConfig, RunWorkflowResponse } from '../types/workflow';
import { Copy, Loader2, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface WorkflowPageProps {
  workflow: WorkflowConfig;
}

export default function WorkflowPage({ workflow }: WorkflowPageProps) {
  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    // Initialize with default values
    const defaults: Record<string, string> = {};
    workflow.inputs.forEach(input => {
      if (input.default) {
        defaults[input.id] = input.default;
      }
    });
    return defaults;
  });

  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Array<{ id: string; label: string; content: string }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleInputChange = (inputId: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSections(null);

    try {
      const response = await fetch('/api/run-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workflow_id: workflow.workflow_id,
          inputs: inputs
        })
      });

      const data: RunWorkflowResponse = await response.json();

      if (data.success && data.sections) {
        setSections(data.sections);
        setActiveTab(data.sections[0]?.id || 'summary');
      } else {
        setError(data.error || 'Failed to execute workflow');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (sectionId: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const renderInput = (input: typeof workflow.inputs[0]) => {
    const value = inputs[input.id] || '';

    const baseClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent";

    switch (input.type) {
      case 'textarea':
        return (
          <textarea
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            rows={4}
            className={baseClasses}
          />
        );

      case 'select':
        return (
          <select
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            required={input.required}
            className={baseClasses}
          >
            <option value="">Select an option...</option>
            {input.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            className={baseClasses}
          />
        );

      case 'url':
        return (
          <input
            type="url"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            className={baseClasses}
          />
        );

      default: // text
        return (
          <input
            type="text"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            required={input.required}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <a href="/workflows" className="hover:text-purple-600">Workflows</a>
          <span>/</span>
          <span className="text-gray-900">{workflow.category}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {workflow.seo_title}
        </h1>
        <p className="text-xl text-gray-600">
          {workflow.seo_description}
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Workflow Configuration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {workflow.inputs.map(input => (
              <div key={input.id}>
                <label
                  htmlFor={input.id}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {input.label}
                  {input.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderInput(input)}
                {input.help_text && (
                  <p className="mt-1 text-sm text-gray-500">{input.help_text}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Workflow...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate All Content
              </>
            )}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Generating Your Content...
            </h3>
            <p className="text-gray-600 mb-4">
              This workflow has {workflow.steps.length} steps. Please wait...
            </p>
            <div className="max-w-md mx-auto">
              <div className="space-y-2 text-sm text-left">
                {workflow.steps.map((step, index) => (
                  <div key={step.step_id} className="flex items-center gap-2 text-gray-500">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-semibold">
                      {index + 1}
                    </div>
                    <span>Step {index + 1}: {step.step_id.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results Tabs */}
      {sections && !loading && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                    activeTab === section.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {sections.map(section => (
              <div
                key={section.id}
                className={activeTab === section.id ? 'block' : 'hidden'}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {section.label}
                  </h3>
                  <button
                    onClick={() => handleCopy(section.id, section.content)}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedSection === section.id ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="prose max-w-none">
                  <pre className="bg-gray-50 p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm border border-gray-200">
                    {section.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">
          🚀 How this workflow works
        </h3>
        <div className="text-purple-800 space-y-2 text-sm">
          <p className="font-medium">This workflow will:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            {workflow.steps.map((step, index) => (
              <li key={step.step_id}>
                {step.step_id === 'generate_brief' && 'Extract and analyze the YouTube video transcript'}
                {step.step_id === 'generate_blog' && 'Generate a complete blog post from the content brief'}
                {step.step_id === 'generate_linkedin' && 'Create LinkedIn posts optimized for engagement'}
              </li>
            ))}
          </ol>
          <p className="mt-3 italic">
            ⏱️ Estimated completion time: {workflow.steps.length * 30}-{workflow.steps.length * 60} seconds
          </p>
        </div>
      </div>
    </div>
  );
}
