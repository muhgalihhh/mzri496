import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import { useTheme } from '../../hooks/useTheme';
// import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark'; // Disabled for performance
import Stack from '../blocks/Components/Stack/Stack';

const About = React.memo(() => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState('programming');
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { theme, isDarkMode } = useTheme();

  const images = useMemo(
    () => [
      { id: 1, img: '/images/1.png' },
      { id: 2, img: '/images/2.jpg' },
      { id: 3, img: '/images/3.png' },
      { id: 4, img: '/images/4.JPG' },
    ],
    []
  );

  const programmingTech = useMemo(
    () => [
      {
        name: 'HTML',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        color: 'from-orange-500 to-yellow-500',
        description: 'Markup Language',
      },
      {
        name: 'CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        color: 'from-blue-500 to-blue-400',
        description: 'Style Sheet Language',
      },
      {
        name: 'Javascript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        color: 'from-yellow-500 to-yellow-400',
        description: 'Programming Language',
      },
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        color: 'from-blue-500 to-cyan-500',
        description: 'Frontend Library',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        color: 'from-blue-600 to-blue-400',
        description: 'Type Safety',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        color: 'from-cyan-500 to-teal-500',
        description: 'CSS Framework',
      },
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        color: 'from-green-600 to-green-400',
        description: 'Backend Runtime',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        color: 'from-green-500 to-emerald-500',
        description: 'NoSQL Database',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        color: 'from-yellow-500 to-yellow-400',
        description: 'Programming Language',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        color: 'from-purple-500 to-purple-400',
        description: 'SQL Database',
      },
      {
        name: 'PHP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
        color: 'from-blue-700 to-blue-500',
        description: 'Server Language',
      },
      {
        name: 'Laravel',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
        color: 'from-red-200 to-red-100',
        description: 'PHP Framework',
      },
      {
        name: 'Postman',
        icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        color: 'from-orange-200 to-orange-100',
        description: 'API Testing',
      },
      {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        color: 'from-yellow-200 to-yellow-300',
        description: 'Backend as a Service',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        color: 'from-red-300 to-red-200',
        description: 'Version Control',
      },
    ],
    []
  );

  const designTech = useMemo(
    () => [
      {
        name: 'Adobe Photoshop',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
        color: 'from-pink-500 to-pink-400',
        description: 'Photo Editing',
      },
      {
        name: 'Adobe Illustrator',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
        color: 'from-blue-500 to-blue-400',
        description: 'Vector Graphics',
      },
      {
        name: 'IbisPaint',
        icon: '/ibispaint.png',
        color: 'from-blue-500 to-blue-400',
        description: 'Digital Painting',
      },
      {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        color: 'from-purple-500 to-purple-400',
        description: 'UI/UX Design',
      },
      {
        name: 'Canva',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
        color: 'from-white to-gray-300',
        description: 'Graphic Design',
      },
      {
        name: 'Capcut',
        icon: '/capcut-logo.svg',
        color: 'from-white to-gray-300',
        description: 'Graphic Design',
      },
    ],
    []
  );

  const currentTechArray = useMemo(() => (activeTab === 'programming' ? programmingTech : designTech), [activeTab, programmingTech, designTech]);
  const displayedTech = useMemo(() => currentTechArray.slice(currentTechIndex, currentTechIndex + 6), [currentTechArray, currentTechIndex]);

  // Auto-rotate tech stack - optimized
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= currentTechArray.length - 5 ? 0 : nextIndex;
      });
    }, 3500); // Increased from 2000ms to 3500ms for slower rotation

    return () => clearInterval(interval);
  }, [currentTechArray.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
        delay: 0.2,
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
        delay: 0.3,
      },
    },
  };

  // Improved tech card animation variants with slower transitions
  const techCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 150,
        duration: 0.8, // Slower entrance
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        duration: 0.6, // Slower exit - increased from 0.3
        ease: 'easeInOut',
      },
    },
  };

  const interactiveVariants = {
    hover: {
      scale: 1.08,
      rotate: [0, -3, 3, 0],
      transition: {
        rotate: {
          duration: 0.4,
          ease: 'easeInOut',
        },
        scale: {
          duration: 0.3,
        },
      },
    },
    tap: {
      scale: 0.95,
      rotate: 8,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Modal animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    // ClickSpark removed for performance
    <motion.main className={`flex items-center justify-center min-h-screen px-4 py-8`} initial="hidden" animate="visible" variants={containerVariants}>
      <div className="relative w-full max-w-6xl">
        <div className="grid items-center h-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Left Section - Stack Component */}
          <motion.div className="flex items-center justify-center lg:justify-start" variants={leftSectionVariants}>
            <motion.div className="relative w-full h-48 max-w-sm" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
              <div className="relative flex justify-center w-full h-full">
                <Stack randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 280, height: 180 }} cardsData={images} />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - About Me */}
          <motion.div className="space-y-3 text-center lg:text-left lg:space-y-4" variants={rightSectionVariants}>
            <div className="space-y-3">
              <motion.div
                className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full text-sm font-medium ${theme.textPrimary} border ${theme.border}`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(251, 146, 60, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.i
                  className={`bx bx-user ${theme.textPrimary} mr-2`}
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

              <motion.h1 className={`text-xl font-bold leading-tight ${theme.textPrimary} md:text-2xl lg:text-3xl`} variants={itemVariants}>
                Hi, I'm
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
                  Muhamad Galih || Galih
                </motion.span>
              </motion.h1>

              {/* Description with responsive visibility */}
              <div className="relative flex items-start gap-2">
                <motion.p className={`max-w-lg mx-auto text-sm leading-relaxed ${theme.textSecondary} lg:mx-0 hidden lg:block`} variants={itemVariants}>
                  Passionate about crafting digital experiences through web solutions, graphic design, and machine learning. Currently a student of Informatics at Universitas Jenderal Soedirman
                  (UNSOED).
                </motion.p>

                {/* Info button for mobile */}
                <motion.button
                  className={`lg:hidden w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${theme.border}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowInfoModal(true)}
                >
                  <motion.i
                    className="text-sm bx bx-info-circle"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.button>
              </div>
            </div>

            {/* Tech Stack - Improved Animation */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <motion.h3 className={`text-sm font-semibold ${theme.textPrimary}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                Technologies I Work With
              </motion.h3>

              <motion.div
                className={`relative rounded-lg ${theme.cardBackground} p-3`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setActiveTab('programming')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === 'programming' ? `${theme.textPrimary} bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border}` : `${theme.textSecondary} hover:${theme.textPrimary}`
                    }`}
                  >
                    <motion.span className="flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <i className="bx bx-code-curly" />
                      Programming
                    </motion.span>
                  </button>
                  <button
                    onClick={() => setActiveTab('design')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === 'design' ? `${theme.textPrimary} bg-gradient-to-r from-purple-500/20 to-pink-500/20 border ${theme.border}` : `${theme.textSecondary} hover:${theme.textPrimary}`
                    }`}
                  >
                    <motion.span className="flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <i className="bx bx-palette" />
                      Design
                    </motion.span>
                  </button>
                </div>

                {/* Tech Content - Improved Animation Container */}
                <div className="relative rounded-lg h-28">
                  {' '}
                  {/* Increased height from h-24 to h-28 */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={`${activeTab}-${currentTechIndex}`} className="grid h-full grid-cols-3 gap-2 p-1" variants={techCardVariants} initial="hidden" animate="visible" exit="exit">
                      {displayedTech.map((tech, index) => (
                        <motion.div
                          key={`${tech.name}-${currentTechIndex}`}
                          className={`relative px-2 py-2 rounded-lg bg-gradient-to-r ${tech.color} text-white shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden`}
                          variants={interactiveVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onHoverStart={() => setHoveredTech(index)}
                          onHoverEnd={() => setHoveredTech(null)}
                          initial={{ opacity: 0, scale: 0.9, y: 15 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: {
                              delay: index * 0.15, // Slightly increased stagger
                              duration: 0.5,
                              ease: 'easeOut',
                            },
                          }}
                        >
                          <div className="flex flex-row items-center justify-center h-full gap-1">
                            <motion.img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                              animate={{
                                rotate: hoveredTech === index ? [0, 360] : 0,
                              }}
                              transition={{
                                rotate: {
                                  duration: 0.6,
                                  ease: 'easeInOut',
                                },
                              }}
                            />
                            <span className="text-xs font-medium leading-tight text-center line-clamp-2">{tech.name}</span>
                          </div>

                          {/* Hover tooltip - Improved positioning */}
                          <AnimatePresence>
                            {hoveredTech === index && (
                              <motion.div
                                className="absolute z-20 px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-900 rounded shadow-lg -top-10 left-1/2 whitespace-nowrap"
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                {tech.description}
                                <div className="absolute w-2 h-2 transform rotate-45 -translate-x-1/2 bg-gray-900 -bottom-1 left-1/2"></div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats - Compact */}
            <motion.div className={`flex items-center justify-center lg:justify-start space-x-6 text-sm ${theme.textSecondary}`} variants={itemVariants}>
              <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                <motion.i
                  className={`bx bx-code-curly ${theme.textAccent} mr-2`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <span className={theme.textSecondary}>3+ Years</span>
              </motion.div>
              <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                <motion.i
                  className={`bx bx-briefcase ${theme.textAccent} mr-2`}
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

        {/* Background Decorations */}
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

      {/* Info Modal for Mobile */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden" variants={overlayVariants} initial="hidden" animate="visible" exit="exit">
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowInfoModal(false)} />

            {/* Modal */}
            <motion.div
              className={`relative w-full max-w-md p-6 ${theme.cardBackground} rounded-2xl shadow-2xl border ${theme.border}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.h3 className={`text-lg font-bold ${theme.textPrimary} flex items-center gap-2`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <motion.i
                    className="text-blue-500 bx bx-info-circle"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  About Me
                </motion.h3>
                <motion.button
                  onClick={() => setShowInfoModal(false)}
                  className={`w-8 h-8 rounded-full ${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="text-lg bx bx-x" />
                </motion.button>
              </div>

              {/* Content */}
              <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <motion.img className="object-cover w-full h-32 mb-4 rounded-lg" src="/images/2.jpg" alt="Profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                <motion.p className={`text-sm leading-relaxed ${theme.textSecondary}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  Passionate about crafting digital experiences through web solutions, graphic design, and machine learning. Currently a student of Informatics at Universitas Jenderal Soedirman
                  (UNSOED).
                </motion.p>

                {/* Additional info */}
                <motion.div
                  className={`p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border ${theme.border}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className={`flex items-center gap-3 text-sm ${theme.textSecondary}`}>
                    <motion.i
                      className="text-blue-500 bx bx-graduation"
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    />
                    <span>Informatics Student at UNSOED</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Footer */}
              <motion.div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <motion.button
                  onClick={() => setShowInfoModal(false)}
                  className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all duration-200`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Got it!
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
    // ClickSpark removed for performance
  );
});

About.displayName = 'About';

export default About;
