'use client';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ResultCardProps {
  title: string;
  content: string;
}

export default function ResultCard({ title, content }: ResultCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success(`${title} prompt copied!`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-500/30 group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 capitalize flex items-center gap-2">
          {title}
        </h3>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-2 -mr-2 opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 flex-grow text-sm leading-relaxed whitespace-pre-wrap selection:bg-indigo-200 dark:selection:bg-indigo-900">
        {content}
      </p>
    </div>
  );
}
