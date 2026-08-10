'use client';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      if (document.documentElement.classList.contains('dark') || 
          window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          PromptForge AI
        </h1>
      </div>
      <button 
        onClick={toggleTheme}
        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
      </button>
    </header>
  );
}
