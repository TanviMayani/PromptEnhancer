'use client';
import { Loader2, Wand2 } from 'lucide-react';
import { KeyboardEvent, useRef, useEffect } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  audience: string;
  onAudienceChange: (val: string) => void;
}

export default function PromptInput({ value, onChange, onSubmit, isLoading, audience, onAudienceChange }: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13)) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="w-full relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. write an email to a client about a project delay..."
          className="w-full min-h-[160px] p-6 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none resize-none text-lg leading-relaxed"
          disabled={isLoading}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400 font-medium whitespace-nowrap">
              {value.length} chars
            </div>
            <select
              value={audience}
              onChange={(e) => onAudienceChange(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
            >
              <option value="General">Target: General</option>
              <option value="Developers">Target: Developers</option>
              <option value="Customers">Target: Customers</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex text-xs items-center gap-1 text-gray-400 font-medium">
              Press <kbd className="bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded shadow-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">Ctrl</kbd> + <kbd className="bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded shadow-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">Enter</kbd>
            </span>
            <button
              onClick={onSubmit}
              disabled={!value.trim() || isLoading}
              className="flex items-center justify-center w-full sm:w-auto gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              {isLoading ? 'Enhancing...' : 'Enhance Prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
