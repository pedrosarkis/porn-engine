import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ onThemeChange }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
};

export default ThemeToggle;