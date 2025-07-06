import { motion, useScroll, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import About from './components/About';
import Experience from './components/Experience';
import Hero from './components/Hero';
import FloatingNavbar from './components/NavBar';
import ThemeToggle from './components/ThemeToggle';

function AppContent() {
  const { isDarkMode, theme } = useTheme();
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollXProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const section = container.querySelector(`#${sectionId}`);
      if (section) {
        const containerWidth = container.clientWidth;
        const sections = ['home', 'about', 'experience', 'contact'];
        const sectionIndex = sections.indexOf(sectionId);

        container.scrollTo({ left: sectionIndex * containerWidth, behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  // Detect wheel scroll direction and switch sections accordingly
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent default scroll behavior

      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const currentIndex = Math.round(scrollLeft / containerWidth);
        const sections = ['home', 'about', 'experience', 'contact'];

        let targetIndex = currentIndex;

        if (e.deltaY > 0) {
          // Scroll down = next section
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (e.deltaY < 0) {
          // Scroll up = previous section
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex) {
          container.scrollTo({
            left: targetIndex * containerWidth,
            behavior: 'smooth',
          });

          setActiveSection(sections[targetIndex]);
        }
      }
    };

    containerRef.current?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      containerRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className={`h-screen transition-all duration-500 ${theme.background} relative overflow-hidden p-4`}>
      <ThemeToggle />

      <div className="fixed inset-0 pointer-events-none">
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10"></div>
            <div className="absolute w-96 h-96 top-20 right-20 bg-gradient-to-br from-orange-500/20 to-pink-500/20 blur-3xl -z-10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50 -z-10"></div>
            <div className="absolute w-96 h-96 top-20 right-20 bg-gradient-to-br from-orange-200/30 to-pink-200/30 blur-3xl -z-10" />
          </>
        )}
      </div>

      <FloatingNavbar activeSection={activeSection} onNavigate={scrollToSection} />

      <div ref={containerRef} className="flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide">
        <motion.section id="home" className="flex-shrink-0 w-full h-full snap-start" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Hero />
        </motion.section>

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

        <motion.section id="experience" className="flex-shrink-0 w-full h-full snap-start" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Experience />
        </motion.section>
      </div>

      <motion.div className="fixed z-50 w-64 h-1 overflow-hidden transform -translate-x-1/2 rounded-full bottom-2 left-1/2 bg-white/20">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
          style={{
            scaleX: smoothProgress,
            transformOrigin: 'left',
          }}
        />
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
