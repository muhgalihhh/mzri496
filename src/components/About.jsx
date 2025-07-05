import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Profile image paths - gunakan URL placeholder untuk testing
const profileImagePaths = {
  main: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  professional: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  placeholder: 'https://via.placeholder.com/400x400/6366f1/ffffff?text=Profile',
};

const About = () => {
  const { isDarkMode, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('about');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Separated skills by category
  const codingSkills = [
    { name: 'React', icon: 'bxl-react' },
    { name: 'JavaScript', icon: 'bxl-javascript' },
    { name: 'TypeScript', icon: 'bxl-typescript' },
    { name: 'Node.js', icon: 'bxl-nodejs' },
    { name: 'Python', icon: 'bxl-python' },
    { name: 'HTML5', icon: 'bxl-html5' },
    { name: 'CSS3', icon: 'bxl-css3' },
    { name: 'Git', icon: 'bxl-git' },
    { name: 'MongoDB', icon: 'bxl-mongodb' },
    { name: 'Vue.js', icon: 'bxl-vuejs' },
  ];

  const designSkills = [
    { name: 'Figma', icon: 'bxl-figma' },
    { name: 'Adobe XD', icon: 'bxl-adobe' },
    { name: 'Photoshop', icon: 'bxl-adobe' },
    { name: 'Illustrator', icon: 'bxl-adobe' },
    { name: 'Sketch', icon: 'bx-edit-alt' },
    { name: 'Canva', icon: 'bx-palette' },
    { name: 'InDesign', icon: 'bxl-adobe' },
    { name: 'After Effects', icon: 'bxl-adobe' },
  ];

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '20+', label: 'Happy Clients' },
    { value: '5+', label: 'Technologies' },
  ];

  const tabs = [
    { id: 'about', label: 'About', icon: 'bx-user' },
    { id: 'skills', label: 'Skills', icon: 'bx-code-alt' },
  ];

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 lg:px-20">
      <motion.div className="max-w-5xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Side - Interactive Profile Cards */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative mx-auto w-80 h-80 perspective-1000">
              {/* Card Stack */}
              <div className="relative preserve-3d">
                {/* Main Profile Card */}
                <motion.div
                  className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden cursor-pointer transform-gpu ${
                    isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10' : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl'
                  }`}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50,
                  }}
                  whileTap={{
                    scale: 0.98,
                    rotateY: -5,
                    rotateX: -5,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: 3,
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Profile Image */}
                    <div className="relative w-full h-full">
                      {/* Image placeholder/loading state */}
                      {!imageLoaded && (
                        <div
                          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${isDarkMode ? 'from-gray-700 to-gray-800' : 'from-gray-100 to-gray-200'} ${
                            theme.textSecondary
                          }`}
                        >
                          <motion.div className="flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <motion.i className="text-6xl opacity-50 bx bx-image" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
                            <span className="text-sm opacity-70">Loading...</span>
                          </motion.div>
                        </div>
                      )}

                      {/* Actual profile image */}
                      <img
                        src={profileImagePaths.main}
                        alt="Profile"
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                          console.log('Image failed to load, using placeholder');
                          e.target.src = profileImagePaths.placeholder;
                          setImageLoaded(true);
                        }}
                      />
                    </div>

                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-orange-500/10 to-transparent' : 'bg-gradient-to-t from-orange-100/30 to-transparent'}`} />

                    {/* Hover effect */}
                    <motion.div className="absolute inset-0 opacity-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20" whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                  </div>
                </motion.div>

                {/* Second Card (Behind) */}
                <motion.div
                  className={`absolute inset-0 w-full h-full rounded-3xl transform-gpu ${
                    isDarkMode ? 'bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20' : 'bg-gradient-to-br from-orange-100 to-pink-100 border border-orange-200'
                  }`}
                  initial={{
                    rotateY: -15,
                    z: -30,
                    x: -20,
                    y: 10,
                  }}
                  whileHover={{
                    rotateY: -10,
                    z: -20,
                    x: -15,
                    y: 5,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: 2,
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <i className={`bx bx-code-alt text-6xl ${theme.textAccent} opacity-50`} />
                  </div>
                </motion.div>

                {/* Third Card (Behind) */}
                <motion.div
                  className={`absolute inset-0 w-full h-full rounded-3xl transform-gpu ${
                    isDarkMode ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20' : 'bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200'
                  }`}
                  initial={{
                    rotateY: 15,
                    z: -60,
                    x: 30,
                    y: 20,
                  }}
                  whileHover={{
                    rotateY: 10,
                    z: -40,
                    x: 25,
                    y: 15,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: 1,
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <i className={`bx bx-palette text-5xl ${theme.textAccent} opacity-40`} />
                  </div>
                </motion.div>
              </div>

              {/* Interactive Floating Elements */}
              <motion.div
                className={`absolute -top-4 -right-4 w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer ${
                  isDarkMode ? 'bg-gradient-to-br from-orange-500 to-pink-500' : 'bg-gradient-to-br from-orange-400 to-pink-400'
                } shadow-lg`}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, 0],
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 180,
                  y: -12,
                }}
                whileTap={{
                  scale: 0.9,
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ zIndex: 4 }}
              >
                <motion.i className="text-xl text-white bx bx-code-alt" whileHover={{ scale: 1.2 }} />
              </motion.div>

              <motion.div
                className={`absolute -bottom-4 -left-4 w-14 h-14 rounded-lg flex items-center justify-center cursor-pointer ${
                  isDarkMode ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-gradient-to-br from-purple-400 to-blue-400'
                } shadow-lg`}
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -5, 0],
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: -180,
                  y: 12,
                }}
                whileTap={{
                  scale: 0.85,
                  rotate: -360,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ zIndex: 4 }}
              >
                <motion.i className="text-lg text-white bx bx-palette" whileHover={{ scale: 1.3 }} />
              </motion.div>

              {/* Additional Interactive Elements */}
              <motion.div
                className={`absolute top-1/2 -left-6 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
                  isDarkMode ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-gradient-to-br from-yellow-400 to-orange-400'
                } shadow-lg`}
                animate={{
                  x: [0, -5, 0],
                  rotate: [0, 10, 0],
                }}
                whileHover={{
                  scale: 1.2,
                  x: -10,
                  rotate: 45,
                }}
                whileTap={{
                  scale: 0.8,
                  rotate: 90,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ zIndex: 4 }}
              >
                <motion.i className="text-sm text-white bx bx-star" whileHover={{ scale: 1.4 }} />
              </motion.div>

              <motion.div
                className={`absolute top-1/4 -right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  isDarkMode ? 'bg-gradient-to-br from-green-500 to-teal-500' : 'bg-gradient-to-br from-green-400 to-teal-400'
                } shadow-lg`}
                animate={{
                  x: [0, 5, 0],
                  rotate: [0, -10, 0],
                }}
                whileHover={{
                  scale: 1.25,
                  x: 10,
                  rotate: -45,
                }}
                whileTap={{
                  scale: 0.75,
                  rotate: -90,
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ zIndex: 4 }}
              >
                <motion.i className="text-xs text-white bx bx-heart" whileHover={{ scale: 1.5 }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Title */}
            <motion.h2 className={`text-3xl font-bold ${theme.textSecondary} lg:text-4xl`} variants={itemVariants}>
              About{' '}
              <span
                className={`${
                  isDarkMode ? 'text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text' : 'text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text'
                }`}
              >
                Me
              </span>
            </motion.h2>

            {/* Tab Navigation */}
            <motion.div className="flex space-x-1" variants={itemVariants}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                      : isDarkMode
                      ? 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                      : 'bg-white/80 border border-gray-200 text-gray-600 hover:bg-white shadow-sm'
                  }`}
                >
                  <i className={`bx ${tab.icon} text-lg`}></i>
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div className="min-h-[400px]" key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <p className={`text-base leading-relaxed ${theme.textSecondary}`}>
                    I'm a passionate full-stack developer and graphic designer with a love for creating beautiful, functional, and user-friendly applications. With over 3 years of experience, I
                    specialize in modern web technologies and creative design solutions.
                  </p>
                  <p className={`text-base leading-relaxed ${theme.textSecondary}`}>
                    My journey combines the technical precision of coding with the creative freedom of design. I enjoy turning complex problems into simple, elegant solutions while ensuring every
                    pixel and interaction feels just right.
                  </p>
                  <p className={`text-base leading-relaxed ${theme.textSecondary}`}>
                    When I'm not coding or designing, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer and design community.
                  </p>
                  <motion.button
                    className={`px-6 py-3 font-medium text-white transition-all duration-300 group rounded-xl hover:scale-105 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:shadow-orange-500/25'
                        : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:shadow-orange-300/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      Let's Work Together
                      <i className="transition-transform bx bx-right-arrow-alt group-hover:translate-x-1"></i>
                    </span>
                  </motion.button>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* Coding Skills Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-100 border border-blue-200'}`}>
                        <i className="text-xl text-blue-500 bx bx-code-alt"></i>
                      </div>
                      <h3 className={`text-lg font-semibold ${theme.textSecondary}`}>Programming & Development</h3>
                    </div>

                    {/* Infinite Loop Coding Skills */}
                    <div className="relative mb-4 overflow-hidden">
                      <motion.div
                        className="flex gap-4"
                        animate={{
                          x: [0, -1200],
                        }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        {/* First set of coding skills */}
                        {codingSkills.map((skill, index) => (
                          <div
                            key={`coding-first-${index}`}
                            className={`flex-shrink-0 p-4 rounded-xl border ${
                              isDarkMode ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50 border-blue-200 shadow-sm'
                            } flex items-center gap-3 min-w-[140px]`}
                          >
                            <i className={`bx ${skill.icon} text-2xl text-blue-500`}></i>
                            <span className={`text-sm font-medium ${theme.textSecondary}`}>{skill.name}</span>
                          </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {codingSkills.map((skill, index) => (
                          <div
                            key={`coding-second-${index}`}
                            className={`flex-shrink-0 p-4 rounded-xl border ${
                              isDarkMode ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50 border-blue-200 shadow-sm'
                            } flex items-center gap-3 min-w-[140px]`}
                          >
                            <i className={`bx ${skill.icon} text-2xl text-blue-500`}></i>
                            <span className={`text-sm font-medium ${theme.textSecondary}`}>{skill.name}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* Design Skills Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-100 border border-purple-200'}`}>
                        <i className="text-xl text-purple-500 bx bx-palette"></i>
                      </div>
                      <h3 className={`text-lg font-semibold ${theme.textSecondary}`}>Design & Creative</h3>
                    </div>

                    {/* Infinite Loop Design Skills */}
                    <div className="relative mb-4 overflow-hidden">
                      <motion.div
                        className="flex gap-4"
                        animate={{
                          x: [0, -1000],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        {/* First set of design skills */}
                        {designSkills.map((skill, index) => (
                          <div
                            key={`design-first-${index}`}
                            className={`flex-shrink-0 p-4 rounded-xl border ${
                              isDarkMode ? 'bg-purple-500/5 border-purple-500/10' : 'bg-purple-50 border-purple-200 shadow-sm'
                            } flex items-center gap-3 min-w-[140px]`}
                          >
                            <i className={`bx ${skill.icon} text-2xl text-purple-500`}></i>
                            <span className={`text-sm font-medium ${theme.textSecondary}`}>{skill.name}</span>
                          </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {designSkills.map((skill, index) => (
                          <div
                            key={`design-second-${index}`}
                            className={`flex-shrink-0 p-4 rounded-xl border ${
                              isDarkMode ? 'bg-purple-500/5 border-purple-500/10' : 'bg-purple-50 border-purple-200 shadow-sm'
                            } flex items-center gap-3 min-w-[140px]`}
                          >
                            <i className={`bx ${skill.icon} text-2xl text-purple-500`}></i>
                            <span className={`text-sm font-medium ${theme.textSecondary}`}>{skill.name}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </main>
  );
};

export default About;
