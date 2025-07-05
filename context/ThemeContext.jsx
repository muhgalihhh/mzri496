import React, { createContext, useContext, useEffect, useState } from 'react';

// Buat Theme Context
const ThemeContext = createContext();

// Hook untuk menggunakan theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode

  // Load theme preference saat komponen mount
  useEffect(() => {
    // Cek localStorage dulu, jika tidak ada baru cek system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update body class dan localStorage untuk global styling
  useEffect(() => {
    // Update body class untuk global styling
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Function untuk toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme colors dan styles - DIPERBAIKI
  const themeColors = {
    dark: {
      // Background colors
      background: 'bg-gray-900',
      backgroundGradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',

      // Text colors
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textAccent: 'text-orange-300',

      // Button colors
      buttonPrimary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      buttonSecondary: 'text-orange-300 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50',

      // Navigation colors
      navBackground: 'bg-gray-800/90 backdrop-blur-xl border-gray-700/50',
      navText: 'text-gray-300',
      navActive: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      navHover: 'hover:bg-gray-700/50 hover:text-orange-300',

      // Card colors
      cardBackground: 'bg-gray-800/50 border-gray-700/50',
      cardHover: 'hover:bg-gray-700/60',

      // Social links
      socialBackground: 'bg-gray-800/50 border-gray-700/50',
      socialText: 'text-gray-300',
      socialHover: 'hover:text-orange-300 hover:border-orange-500/30 hover:bg-gray-700/50',

      // Gradient effects
      gradientText: 'text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text',
      shadowColor: 'shadow-orange-500/25',
      glowEffect: 'shadow-[0_0_900px_20px_#e99b63]',
    },
    light: {
      // Background colors
      background: 'bg-gray-50',
      backgroundGradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',

      // Text colors
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textAccent: 'text-orange-600',

      // Button colors
      buttonPrimary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      buttonSecondary: 'text-orange-600 border-orange-400/50 hover:bg-orange-50 hover:border-orange-500',

      // Navigation colors
      navBackground: 'bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-lg',
      navText: 'text-gray-700',
      navActive: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
      navHover: 'hover:bg-gray-100/80 hover:text-orange-600',

      // Card colors
      cardBackground: 'bg-white/80 border-gray-200/50 shadow-sm',
      cardHover: 'hover:bg-white/90 hover:shadow-md',

      // Social links
      socialBackground: 'bg-white/80 border-gray-200/50 shadow-sm',
      socialText: 'text-gray-600',
      socialHover: 'hover:text-orange-600 hover:border-orange-400/50 hover:bg-white/90',

      // Gradient effects
      gradientText: 'text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text',
      shadowColor: 'shadow-orange-300/30',
      glowEffect: 'shadow-[0_0_600px_15px_#fed7aa]',
    },
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  const value = {
    isDarkMode,
    toggleTheme,
    theme: currentTheme,
    themeColors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
