import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50 p-3 rounded-full border transition-all duration-300
        ${isDarkMode ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 shadow-lg'}
      `}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.i className={`text-xl bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} initial={{ rotate: 0 }} animate={{ rotate: isDarkMode ? 0 : 180 }} transition={{ duration: 0.3 }} />
    </motion.button>
  );
};

export default ThemeToggle;
