import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import CVDownloadButton from './CVButton';

const Hero = React.memo(() => {
  const { isDarkMode, theme } = useTheme();
  const roles = useMemo(() => ['UI/UX Designer', 'Graphic Designer', 'ML Enthusiast', 'Web Developer'], []);
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Optimized animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 12,
        },
      },
    }),
    []
  );

  const socialLinks = useMemo(
    () => [
      { icon: 'bxl-github', href: 'https://github.com/muhgalihhh/', label: 'GitHub' },
      { icon: 'bxl-linkedin', href: 'https://www.linkedin.com/in/muhamadgalih0803/', label: 'LinkedIn' },
      { icon: 'bxl-instagram', href: 'https://www.instagram.com/muhgalihhh/', label: 'Instagram' },
    ],
    []
  );

  // Handler for external links
  const handleExternalLinkClick = () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('externalLinkClicked'));
    }, 100);
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">
      {/* Optimized Background - Static instead of animated for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full w-96 h-96 blur-3xl opacity-15"
          style={{
            background: isDarkMode ? 'linear-gradient(to right, #3b82f6, #10b981)' : 'linear-gradient(to right, #60a5fa, #34d399)',
            top: '10%',
            right: '10%',
          }}
        />
        <div
          className="absolute rounded-full w-96 h-96 blur-3xl opacity-15"
          style={{
            background: isDarkMode ? 'linear-gradient(to left, #06b6d4, #059669)' : 'linear-gradient(to left, #22d3ee, #10b981)',
            bottom: '10%',
            left: '10%',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div className="relative z-10 w-full max-w-4xl text-center" variants={containerVariants} initial="hidden" animate="visible">
        {/* Greeting Badge */}
        <motion.div variants={itemVariants} className="inline-block mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${theme.border} ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className={`text-sm font-medium ${theme.textSecondary}`}>Available for opportunities</span>
          </div>
        </motion.div>

        {/* Name with gradient animation */}
        <motion.h1 variants={itemVariants} className="mb-4 text-5xl font-bold lg:text-7xl">
          <motion.span
            style={{
              background: isDarkMode ? 'linear-gradient(to right, #60a5fa, #22d3ee, #34d399)' : 'linear-gradient(to right, #3b82f6, #06b6d4, #10b981)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{
              backgroundPosition: ['0% center', '200% center', '0% center'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            Muhamad Galih
          </motion.span>
        </motion.h1>

        {/* Animated Role */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="h-12 overflow-hidden">
            <motion.h2
              key={currentRole}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-2xl font-semibold lg:text-3xl ${theme.textSecondary}`}
            >
              {roles[currentRole]}
            </motion.h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className={`max-w-2xl mx-auto mb-8 text-lg leading-relaxed ${theme.textMuted}`}>
          Creating digital experiences through design and code. Passionate about UI/UX, machine learning, and building innovative solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          <CVDownloadButton theme={theme} />
          <motion.a
            href="https://drive.google.com/drive/folders/1wyBAWd3lq89pH4aHfEDAP9YublHyDJLp?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleExternalLinkClick}
            className={`group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden font-medium border rounded-xl transition-all ${theme.buttonSecondary} ${theme.border}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Portfolio</span>
            <i className="relative z-10 text-lg transition-transform bx bx-right-arrow-alt group-hover:translate-x-1"></i>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExternalLinkClick}
              aria-label={social.label}
              className={`relative p-3 rounded-xl border backdrop-blur-sm transition-all ${theme.border} ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-white/50 hover:bg-white/70'}`}
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <i className={`text-xl bx ${social.icon} ${theme.textSecondary} transition-colors`}></i>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator - Moved to bottom right corner */}
        <motion.div variants={itemVariants} className="fixed z-50 bottom-8 right-8">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`flex flex-col items-center gap-2 ${theme.textMuted}`}
          >
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <i className="text-xl bx bx-chevron-down"></i>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
});

Hero.displayName = 'Hero';

export default Hero;
