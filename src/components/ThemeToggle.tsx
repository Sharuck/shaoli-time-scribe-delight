
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 dark:bg-black/10 dark:border-black/20 dark:hover:bg-black/20 transition-all duration-200"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="h-4 w-4 text-gray-800 dark:text-gray-200" />
      )}
    </Button>
  );
};
