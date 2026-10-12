'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={`inline-flex items-center justify-center p-2 rounded-lg border transition text-xs font-medium cursor-pointer ${
        theme === 'dark'
          ? 'bg-[#1E252B] border-[#30363D] text-[#E6EDF3] hover:bg-[#262C34]'
          : 'bg-[#F0EDE6] border-[#E0DCD3] text-[#14171A] hover:bg-[#E5E1D8]'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <span className="flex items-center gap-1.5">
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden md:inline text-[11px] font-semibold">Light</span>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <Moon className="w-4 h-4 text-[#16423C]" />
          <span className="hidden md:inline text-[11px] font-semibold">Dark</span>
        </span>
      )}
    </button>
  );
};
