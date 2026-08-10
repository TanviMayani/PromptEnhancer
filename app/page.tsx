'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PromptInput from '@/components/PromptInput';
import ResultCard from '@/components/ResultCard';
import { EnhancedPrompts } from '@/types/prompt';
import { toast } from 'sonner';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [audience, setAudience] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<EnhancedPrompts | null>(null);
  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, audience }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to enhance prompt');
      }

      setResults(data.data);
      toast.success('Prompt enhanced successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-12 animate-in slide-in-from-bottom-4 duration-700 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
            Transform simple ideas into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              powerful AI prompts
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Elevate your interactions with large language models using our advanced prompt engineering tool.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500 delay-150">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleEnhance}
              isLoading={isLoading}
              audience={audience}
              onAudienceChange={setAudience}
            />
          </div>
        </div>
        {results && (
          <div className="w-full mt-16 animate-in fade-in slide-in-from-bottom-12 duration-700">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow max-w-[100px]"></div>
              <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                Enhanced Variations
              </h3>
              <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow max-w-[100px]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <ResultCard title="professional" content={results.professional} />
              <ResultCard title="creative" content={results.creative} />
              <ResultCard title="detailed" content={results.detailed} />
              <ResultCard title="concise" content={results.concise} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
