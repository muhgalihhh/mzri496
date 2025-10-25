import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SimpleLoader = ({ isLoading, onComplete }) => {
  const { isDarkMode } = useTheme();

  // Auto complete after 0.8 second - optimized loading time
  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onComplete && onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Background with gradient */}
      <div className="absolute inset-0">
        {isDarkMode ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50" />
        )}
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Modern Spinner */}
        <div className="relative w-16 h-16 mb-8">
          {/* Outer rotating circle */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent rounded-full"
            style={{
              borderTopColor: isDarkMode ? '#3b82f6' : '#3b82f6',
              borderRightColor: isDarkMode ? '#10b981' : '#10b981',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Inner pulsing circle */}
          <motion.div
            className="absolute rounded-full inset-2"
            style={{
              background: isDarkMode ? 'linear-gradient(135deg, #3b82f6, #10b981)' : 'linear-gradient(135deg, #60a5fa, #34d399)',
            }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Loading text with gradient */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <h3 className="mb-2 text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text" style={{ backgroundSize: '200% auto' }}>
            Loading
          </h3>
          <motion.div
            className="flex justify-center gap-1"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'}`}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SimpleLoader;
