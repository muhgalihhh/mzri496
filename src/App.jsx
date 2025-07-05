import { motion, useScroll, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import About from './components/About';
import Hero from './components/Hero';
import FloatingNavbar from './components/NavBar';
import ThemeToggle from './components/ThemeToggle';

// Temporary Experience Component (since it's empty)
const Experience = () => {
  const { isDarkMode, theme } = useTheme();

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 lg:px-20">
      <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className={`text-4xl font-bold mb-8 ${theme.textPrimary} lg:text-5xl`}>
          My{' '}
          <span
            className={`${isDarkMode ? 'text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text' : 'text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text'}`}
          >
            Experience
          </span>
        </h2>
        <p className={`text-lg ${theme.textSecondary}`}>This section is coming soon! I'm working on showcasing my professional journey and project experiences.</p>
      </motion.div>
    </main>
  );
};

// Temporary Contact Component (since it's empty)
const Contact = () => {
  const { isDarkMode, theme } = useTheme();

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 lg:px-20">
      <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className={`text-4xl font-bold mb-8 ${theme.textPrimary} lg:text-5xl`}>
          Get{' '}
          <span
            className={`${isDarkMode ? 'text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text' : 'text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text'}`}
          >
            In Touch
          </span>
        </h2>
        <p className={`text-lg ${theme.textSecondary}`}>Contact section is coming soon! Feel free to reach out for collaborations and opportunities.</p>
      </motion.div>
    </main>
  );
};

// App Content Component
function AppContent() {
  const { isDarkMode, theme } = useTheme();
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll progress untuk progress indicator saja
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Smooth spring animation untuk progress indicator
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const section = container.querySelector(`#${sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setActiveSection(sectionId);
      }
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;

        // Calculate which section is active based on scroll position
        const sectionIndex = Math.round(scrollLeft / containerWidth);
        const sections = ['home', 'about', 'experience', 'contact'];

        if (sections[sectionIndex]) {
          setActiveSection(sections[sectionIndex]);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={`h-screen transition-all duration-500 ${theme.background} relative overflow-hidden p-4`}>
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Static Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {isDarkMode ? (
          <>
            {/* Dark Mode Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10"></div>

            {/* Dark Mode Static Floating Elements */}
            <div className="absolute rounded-full w-96 h-96 top-20 right-20 bg-gradient-to-br from-orange-500/20 to-pink-500/20 blur-3xl -z-10" />
            <div className="absolute w-64 h-64 rounded-full bottom-32 left-32 bg-gradient-to-br from-yellow-500/15 to-orange-500/15 blur-3xl -z-10" />
            <div className="absolute w-48 h-48 rounded-full top-1/3 left-1/3 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl -z-10" />
            <div className="absolute w-32 h-32 rounded-full top-1/2 right-1/3 bg-gradient-to-br from-pink-500/15 to-purple-500/15 blur-2xl -z-10" />
          </>
        ) : (
          <>
            {/* Light Mode Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50 -z-10"></div>

            {/* Light Mode Static Floating Elements */}
            <div className="absolute rounded-full w-96 h-96 top-20 right-20 bg-gradient-to-br from-orange-200/30 to-pink-200/30 blur-3xl -z-10" />
            <div className="absolute w-64 h-64 rounded-full bottom-32 left-32 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 blur-3xl -z-10" />
            <div className="absolute w-48 h-48 rounded-full top-1/3 left-1/3 bg-gradient-to-br from-purple-200/20 to-blue-200/20 blur-2xl -z-10" />
            <div className="absolute w-32 h-32 rounded-full top-1/2 right-1/3 bg-gradient-to-br from-pink-200/25 to-purple-200/25 blur-2xl -z-10" />
          </>
        )}
      </div>

      {/* Navigation */}
      <FloatingNavbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Horizontal Scrolling Container */}
      <div
        ref={containerRef}
        className="flex h-screen overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' },
        }}
      >
        {/* Hero Section */}
        <motion.section id="home" className="flex-shrink-0 w-full h-full snap-start" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Hero />
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="flex-shrink-0 w-full h-full snap-start"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <About />
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          className="flex-shrink-0 w-full h-full snap-start"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Experience />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="flex-shrink-0 w-full h-full snap-start"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Contact />
        </motion.section>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed z-50 w-64 h-1 overflow-hidden transform -translate-x-1/2 rounded-full bottom-2 left-1/2 bg-white/20"
        style={{
          background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
          style={{
            scaleX: smoothProgress,
            transformOrigin: 'left',
          }}
        />
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scrolling */
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Snap scrolling */
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
