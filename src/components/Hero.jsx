import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark';
import BlurText from '../blocks/TextAnimations/BlurText/BlurText';
import CVDownloadButton from './CVButton';

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
    <ClickSpark sparkColor={isDarkMode ? '#fff' : '#000'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 lg:px-20 relative">
        {/* Main Content - Text Content */}
        <motion.div
          className="z-10 max-w-xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={isDarkMode ? 'dark' : 'light'} // Force re-render on theme change
        >
          <div className="space-y-6">
            {/* Greeting */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.p className={`text-lg font-medium ${theme.textPrimary}`} variants={itemVariants}>
                Hi, I'm
              </motion.p>

              <motion.div className={`text-3xl font-bold leading-tight lg:text-6xl flex justify-center`} variants={nameVariants}>
                <BlurText text="Muhamad Galih" delay={200} animateBy="letters" direction="top" className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              </motion.div>
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
              <motion.p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} variants={itemVariants}>
                I create websites, design graphics, and am interested in machine learning solutions that enhance user experiences and drive innovation.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col justify-center gap-4 pt-4 text-sm sm:flex-row" variants={buttonVariants}>
              <CVDownloadButton theme={theme} />
              <motion.button
                className={`px-6 py-3 font-medium transition-all duration-300 border rounded-xl hover:scale-105 ${theme.buttonSecondary} ${theme.border}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  className={`flex items-center gap-2 ${theme.buttonAccent}`}
                  href="https://drive.google.com/file/d/1tPTvRmk5DLqoaRvdunxnTpOaKdZ8Z5vK/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bx-eye"></i>
                  Check out my graphic design portfolio.
                </a>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex justify-center gap-4 pt-6" variants={containerVariants}>
              {[
                { icon: 'bxl-github', href: 'https://github.com/muhgalihhh/' },
                { icon: 'bxl-linkedin', href: 'https://www.linkedin.com/in/muhamadgalih0803/' },
                { icon: 'bxl-instagram', href: 'https://www.instagram.com/muhgalihhh/' },
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  className={`p-3 transition-all duration-300 border rounded-xl hover:scale-110 ${theme.socialBackground} ${theme.socialText} ${theme.socialHover} ${theme.border}`}
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
    </ClickSpark>
  );
};

export default Hero;
