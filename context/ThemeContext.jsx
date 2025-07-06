import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// Hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(null); // Initially null while loading theme

  useEffect(() => {
    // Load theme preference from localStorage or system preference
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setIsDarkMode(prefersDark);
          localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        setIsDarkMode(true); // Fallback to dark mode
      }
    };

    loadTheme();
  }, []);

  // Update body class and localStorage whenever theme changes
  useEffect(() => {
    if (isDarkMode === null) return;

    try {
      document.body.classList.toggle('dark', isDarkMode);
      document.body.classList.toggle('light', !isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const themeColors = {
    dark: {
      background: 'bg-gray-900',
      backgroundGradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textAccent: 'text-orange-300',
      buttonPrimary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      buttonSecondary: 'text-orange-300 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50',
      buttonAccent: 'bg-gray-800/50 text-orange-300 border-gray-700/50 hover:bg-gray-700/60 hover:border-orange-500/30',
      navBackground: 'bg-gray-800/90 backdrop-blur-xl border-gray-700/50',
      navText: 'text-gray-300',
      navActive: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      navHover: 'hover:bg-gray-700/50 hover:text-orange-300',
      cardBackground: 'bg-gray-800/50 border-gray-700/50',
      cardHover: 'hover:bg-gray-700/60',
      socialBackground: 'bg-gray-800/50 border-gray-700/50',
      socialText: 'text-gray-300',
      socialHover: 'hover:text-orange-300 hover:border-orange-500/30 hover:bg-gray-700/50',
      gradientText: 'text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text',
      shadowColor: 'shadow-orange-500/25',
      glowEffect: 'shadow-[0_0_900px_20px_#e99b63]',
      border: 'border-gray-700/50',
      borderHover: 'hover:border-orange-500/30',
      backgroundSecondary: 'bg-gray-800/60',
      textMuted: 'text-gray-400',
    },
    light: {
      background: 'bg-gray-50',
      backgroundGradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textAccent: 'text-orange-600',
      buttonPrimary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      buttonSecondary: 'text-orange-600 border-orange-400/50 hover:bg-orange-50 hover:border-orange-500',
      buttonAccent: 'bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-orange-400/50',
      navBackground: 'bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-lg',
      navText: 'text-gray-700',
      navActive: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      navHover: 'hover:bg-gray-100/80 hover:text-orange-600',
      cardBackground: 'bg-white/80 border-gray-200/50 shadow-sm',
      cardHover: 'hover:bg-white/90 hover:shadow-md',
      socialBackground: 'bg-white/80 border-gray-200/50 shadow-sm',
      socialText: 'text-gray-600',
      socialHover: 'hover:text-orange-600 hover:border-orange-400/50 hover:bg-white/90',
      gradientText: 'text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text',
      shadowColor: 'shadow-orange-300/30',
      glowEffect: 'shadow-[0_0_600px_15px_#fed7aa]',
      border: 'border-gray-200/50',
      borderHover: 'hover:border-orange-400/50',
      backgroundSecondary: 'bg-white/90',
      textMuted: 'text-gray-500',
    },
  };

  if (isDarkMode === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading theme...</div>
      </div>
    );
  }

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: currentTheme }}>{children}</ThemeContext.Provider>;
};
