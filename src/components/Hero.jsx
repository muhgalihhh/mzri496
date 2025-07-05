import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const { isDarkMode, theme } = useTheme();
  const roles = ['UI/UX Designer', 'Design Graphic', 'Machine Learning', 'Web Developer'];

  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const nameVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 lg:px-20 relative">
      {/* Main Content - Text Content */}
      <motion.div className="z-10 max-w-xl text-center" variants={containerVariants} initial="hidden" animate="visible">
        <div className="space-y-6">
          {/* Greeting */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <motion.p className={`text-lg font-medium ${theme.textAccent}`} variants={itemVariants}>
              Hi, I'm
            </motion.p>
            <motion.h1 className={`text-5xl font-bold leading-tight ${theme.textSecondary} lg:text-6xl`} variants={nameVariants}>
              Galih
            </motion.h1>
          </motion.div>

          {/* Role/Title with Animation */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center justify-center h-12 overflow-hidden lg:h-16">
              <motion.h2
                className={`text-2xl font-semibold lg:text-3xl transition-all duration-300 ${theme.gradientText} ${
                  isAnimating ? 'transform translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
                }`}
                variants={itemVariants}
              >
                {roles[currentRole]}
              </motion.h2>
            </div>
            <motion.p className={`text-lg leading-relaxed ${theme.textSecondary}`} variants={itemVariants}>
              I create beautiful and functional web experiences with modern technologies.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row" variants={buttonVariants}>
            <motion.button
              className={`px-6 py-3 font-medium transition-all duration-300 group rounded-xl hover:scale-105 ${theme.buttonPrimary} ${theme.shadowColor} hover:shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                View My Work
                <i className="transition-transform bx bx-right-arrow-alt group-hover:translate-x-1"></i>
              </span>
            </motion.button>
            <motion.button
              className={`px-6 py-3 font-medium transition-all duration-300 border rounded-xl hover:scale-105 ${theme.buttonSecondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <i className="bx bx-download"></i>
                Download CV
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div className="flex justify-center gap-4 pt-6" variants={containerVariants}>
            {[
              { icon: 'bxl-github', href: '#' },
              { icon: 'bxl-linkedin', href: '#' },
              { icon: 'bxl-instagram', href: '#' },
            ].map((social, index) => (
              <motion.a
                key={social.icon}
                href={social.href}
                className={`p-3 transition-all duration-300 border rounded-xl hover:scale-110 ${theme.socialBackground} ${theme.socialText} ${theme.socialHover}`}
                variants={socialVariants}
                custom={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`text-xl bx ${social.icon}`}></i>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default Hero;
