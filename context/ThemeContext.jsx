import { createContext, useContext, useEffect, useState } from 'react';

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
      backgroundModal: 'shadow-lg ',
      backgroundGradient: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textAccent: 'text-cyan-300',
      buttonPrimary: 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white',
      buttonSecondary: 'text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50',
      buttonAccent: 'bg-gray-800/50 text-cyan-300 border-gray-700/50 hover:bg-gray-700/60 hover:border-cyan-500/30',
      navBackground: 'bg-gray-800/90 backdrop-blur-xl border-gray-700/50',
      navText: 'text-gray-300',
      navActive: 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white',
      navHover: 'hover:bg-gray-700/50 hover:text-cyan-300',
      cardBackground: 'bg-white/5 border-gray-700/50 shadow-sm blur-sm',
      cardHover: 'hover:bg-gray-700/60',
      socialBackground: 'bg-gray-800/50 border-gray-700/50',
      socialText: 'text-gray-300',
      socialHover: 'hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-gray-700/50',
      gradientText: 'bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent [-webkit-text-fill-color:transparent]',
      shadowColor: 'shadow-cyan-500/25',
      glowEffect: 'shadow-[0_0_900px_20px_#22d3ee]',
      border: 'border-gray-700/50',
      borderHover: 'hover:border-cyan-500/30',
      backgroundSecondary: 'bg-gray-800/60',
      textMuted: 'text-gray-400',
    },
    light: {
      background: 'bg-gray-50',
      backgroundModal: 'bg-white',
      backgroundGradient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textAccent: 'text-blue-600',
      buttonPrimary: 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white',
      buttonSecondary: 'text-blue-600 border-blue-400/50 hover:bg-blue-50 hover:border-blue-500',
      buttonAccent: 'bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-blue-400/50',
      navBackground: 'bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-lg',
      navText: 'text-gray-700',
      navActive: 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white',
      navHover: 'hover:bg-blue-50/80 hover:text-blue-600',
      cardBackground: 'bg-white/80 border-gray-200/50 shadow-sm',
      cardHover: 'hover:bg-white/90 hover:shadow-md',
      socialBackground: 'bg-white/80 border-gray-200/50 shadow-sm',
      socialText: 'text-gray-600',
      socialHover: 'hover:text-blue-600 hover:border-blue-400/50 hover:bg-white/90',
      gradientText: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent [-webkit-text-fill-color:transparent]',
      shadowColor: 'shadow-blue-300/30',
      glowEffect: 'shadow-[0_0_600px_15px_#7dd3fc]',
      border: 'border-gray-200/50',
      borderHover: 'hover:border-blue-400/50',
      backgroundSecondary: 'bg-white/90',
      textMuted: 'text-gray-500',
    },
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: currentTheme }}>{children}</ThemeContext.Provider>;
};
