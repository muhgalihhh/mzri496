import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { useTheme } from '../../hooks/useTheme';
import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark';
import Stack from '../blocks/Components/Stack/Stack';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { theme, isDarkMode } = useTheme();

  const images = [
    { id: 1, img: '/images/1.png' },
    { id: 2, img: '/images/2.jpg' },
    { id: 3, img: '/images/3.png' },
    { id: 4, img: '/images/4.JPG' },
  ];

  const techStack = [
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: 'from-blue-600 to-blue-400',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'from-green-600 to-green-400',
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'from-yellow-500 to-yellow-400',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      color: 'from-purple-500 to-purple-400',
    },
    {
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      color: 'from-blue-700 to-blue-500',
    },
    {
      name: 'Laravel',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
      color: 'from-red-500 to-red-400',
    },
    {
      name: 'Postman',
      icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
      color: 'from-orange-500 to-orange-400',
    },
    {
      name: 'Adobe Photoshop',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      color: 'from-pink-500 to-pink-400',
    },
    {
      name: 'Adobe Illustrator',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
      color: 'from-blue-500 to-blue-400',
    },
    {
      name: 'Figma',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      color: 'from-purple-500 to-purple-400',
    },
  ];

  // Calculate total width for seamless loop
  const totalWidth = techStack.length * 120;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const leftSectionVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  const rightSectionVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 0.5,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
        delay: 0.7,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 0.9,
      },
    },
  };

  const paragraphVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 1.1,
      },
    },
  };

  const statsVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 1.3,
      },
    },
  };

  return (
    <ClickSpark sparkColor={isDarkMode ? '#fff' : '#000'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <motion.main className={`flex items-center justify-center min-h-screen px-2 lg:px-8`} initial="hidden" animate="visible" variants={containerVariants}>
        <div className="relative w-full max-w-7xl">
          <div className="grid items-center h-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Section - Stack Component */}

            <motion.div className="flex items-center justify-center lg:justify-start" variants={leftSectionVariants}>
              <motion.div className="relative w-full h-56 max-w-md" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                <div className="relative flex justify-center w-full h-full">
                  <Stack randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 300, height: 200 }} cardsData={images} />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - About Me */}
            <motion.div className="space-y-2 text-center lg:text-left lg:space-y-3" variants={rightSectionVariants}>
              <div className="space-y-3 lg:space-y-6">
                <motion.div
                  className={`inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full text-xs lg:text-sm font-medium ${theme.textPrimary} border ${theme.border} ${theme.borderHover}`}
                  variants={badgeVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(251, 146, 60, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.i
                    className={`bx bx-user ${theme.textPrimary} mr-1 lg:mr-2`}
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  About Me
                </motion.div>

                <motion.h1 className={`text-lg font-bold leading-tight ${theme.textPrimary} md:text-xl lg:text-2xl xl:text-3xl`} variants={titleVariants}>
                  Hi, I'm a
                  <br />
                  <motion.span
                    className={theme.gradientText}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Full Stack Developer
                  </motion.span>
                </motion.h1>

                <motion.p className={`max-w-lg mx-auto text-xs leading-relaxed md:text-sm lg:text-md ${theme.textSecondary} lg:mx-0`} variants={paragraphVariants}>
                  Passionate about crafting digital experiences through web solutions, graphic design, and machine learning. Currently a student of Informatics at Universitas Jenderal Soedirman
                  (UNSOED).
                </motion.p>
              </div>

              {/* Tech Stack - Framer Motion Infinite Loop */}
              <motion.div className="space-y-2 lg:space-y-4" variants={itemVariants}>
                <motion.h3 className={`text-sm font-semibold ${theme.textPrimary} lg:text-md`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>
                  Technologies I Work With
                </motion.h3>
                <motion.div
                  className={`relative overflow-hidden rounded-lg lg:rounded-xl ${theme.cardBackground} p-1.5 lg:p-2`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 }}
                  whileHover={{
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <motion.div
                    className="flex"
                    animate={{
                      x: [-totalWidth, 0],
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 20,
                        ease: 'linear',
                      },
                    }}
                    whileHover={{
                      animationPlayState: 'paused',
                    }}
                  >
                    {/* Double the tech stack for seamless loop */}
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex">
                        {techStack.map((tech, index) => (
                          <motion.div
                            key={`set-${setIndex}-${index}`}
                            className={`flex-shrink-0 mx-0.5 lg:mx-1 px-2 py-1 lg:px-3 lg:py-2 rounded-md lg:rounded-lg bg-gradient-to-r ${tech.color} text-white shadow-md lg:shadow-lg`}
                            whileHover={{
                              scale: 1.1,
                              y: -5,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="flex items-center gap-1 lg:gap-2">
                              <motion.img src={tech.icon} alt={tech.name} className="w-3 h-3 lg:w-4 lg:h-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} />
                              <span className="text-xs font-medium lg:text-sm whitespace-nowrap">{tech.name}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Stats - Mobile Optimized */}
              <motion.div className={`flex items-center justify-center lg:justify-start space-x-4 lg:space-x-8 text-xs lg:text-sm ${theme.textSecondary}`} variants={statsVariants}>
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                  <motion.i
                    className={`bx bx-code-curly ${theme.textAccent} mr-1 lg:mr-2 text-xs lg:text-sm`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  <span className={`${theme.textSecondary} hidden sm:inline`}>3+ Years Experience (Education)</span>
                  <span className={`${theme.textSecondary} sm:hidden`}>3+ Years</span>
                </motion.div>
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                  <motion.i
                    className={`bx bx-briefcase ${theme.textAccent} mr-1 lg:mr-2 text-xs lg:text-sm`}
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  <span className={theme.textSecondary}>5+ Projects</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Background Decorations with Animation */}
          <motion.div
            className={`absolute w-32 h-32 rounded-full top-1/4 left-1/4 bg-gradient-to-r ${isDarkMode ? 'from-orange-500/10 to-pink-500/10' : 'from-orange-200/30 to-pink-200/30'} blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className={`absolute w-40 h-40 rounded-full bottom-1/4 right-1/4 bg-gradient-to-r ${isDarkMode ? 'from-pink-500/10 to-orange-500/10' : 'from-pink-200/30 to-orange-200/30'} blur-3xl`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1,
            }}
          />
        </div>
      </motion.main>
    </ClickSpark>
  );
};

export default About;
