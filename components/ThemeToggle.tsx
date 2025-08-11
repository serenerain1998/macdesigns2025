import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // Default to dark theme

  useEffect(() => {
    // Check session storage for theme preference
    const savedTheme = sessionStorage.getItem('macdesigns_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark theme
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      // Switching to dark theme
      document.documentElement.classList.add('dark');
      sessionStorage.setItem('macdesigns_theme', 'dark');
    } else {
      // Switching to light theme
      document.documentElement.classList.remove('dark');
      sessionStorage.setItem('macdesigns_theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}