import { motion } from 'framer-motion';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useTheme } from '../../context/ThemeContext';

const SimpleLoader = ({ isLoading, onComplete }) => {
  const { isDarkMode } = useTheme();

  // Auto complete after 3 seconds
  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onComplete && onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Background with blur */}
      <div className="fixed inset-0 backdrop-blur-sm">
        {isDarkMode ? <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95" /> : <div className="absolute inset-0 bg-white/95" />}
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Main Spinner */}
        <div className="relative">
          <ClipLoader color={isDarkMode ? '#f97316' : '#ec4899'} size={60} speedMultiplier={0.8} />

          {/* Outer ring animation */}
          <motion.div
            className="absolute inset-0 w-20 h-20 border-2 border-transparent rounded-full border-t-orange-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Loading text */}
        <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading</h3>
          <motion.p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
            Please wait...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SimpleLoader;
