import { motion } from 'framer-motion';
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import Hero from './components/Hero';
import SimpleLoader from './components/Loader';
import FloatingNavbar from './components/NavBar';
import ThemeToggle from './components/ThemeToggle';
import { isMobileDevice } from './utils/deviceDetection';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Experience = lazy(() => import('./components/Experience'));
const Sertifikat = lazy(() => import('./components/Sertifikat'));
const Gallery = lazy(() => import('./components/Gallery'));

const AppContent = React.memo(() => {
  const { isDarkMode, theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Detect mobile once
  const isMobile = useMemo(() => isMobileDevice(), []);

  const sections = useMemo(() => ['home', 'about', 'experience', 'gallery', 'contact', 'sertifikat'], []);

  // Initialize loading - faster for better perceived performance
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced from 500ms

    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle navigation to section - scroll to element
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
    }
  }, []);

  // Keyboard navigation - Arrow Up/Down for smooth section navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading) return;

      const currentIndex = sections.indexOf(activeSection);
      let targetIndex = currentIndex;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        targetIndex = Math.max(currentIndex - 1, 0);
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = sections.length - 1;
      }

      if (targetIndex !== currentIndex) {
        e.preventDefault();
        scrollToSection(sections[targetIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading, activeSection, sections, scrollToSection]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Intersection Observer to detect active section
  useEffect(() => {
    // Wait for scroll container to be ready
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;

    const observerOptions = {
      root: scrollContainer, // Use scroll container as root
      rootMargin: '-20% 0px -20% 0px', // Trigger when section is near center
      threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better detection
    };

    const observerCallback = (entries) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });
        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, isLoading]); // Add isLoading to re-run after loading complete

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.background} relative`}>
      {/* Loader */}
      <SimpleLoader isLoading={isLoading} onComplete={handleLoadingComplete} />

      {/* Main content - only show when not loading */}
      {!isLoading && (
        <>
          <ThemeToggle />

          {/* Animated gradient background - optimized for performance */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            {isDarkMode ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
                {/* Static gradient orbs on mobile, animated on desktop */}
                {!isMobile ? (
                  <>
                    <motion.div
                      className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
                      style={{
                        background: 'linear-gradient(to right, #3b82f6, #10b981)',
                        top: '-10%',
                        right: '-10%',
                        willChange: 'transform',
                      }}
                      animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
                      style={{
                        background: 'linear-gradient(to left, #06b6d4, #059669)',
                        bottom: '-10%',
                        left: '-10%',
                        willChange: 'transform',
                      }}
                      animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </>
                ) : (
                  <>
                    {/* Static orbs for mobile performance */}
                    <div
                      className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                      style={{
                        background: 'linear-gradient(to right, #3b82f6, #10b981)',
                        top: '-10%',
                        right: '-10%',
                      }}
                    />
                    <div
                      className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                      style={{
                        background: 'linear-gradient(to left, #06b6d4, #059669)',
                        bottom: '-10%',
                        left: '-10%',
                      }}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50"></div>
                {/* Animated gradient orbs for light mode - also optimized */}
                {!isMobile ? (
                  <>
                    <motion.div
                      className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
                      style={{
                        background: 'linear-gradient(to right, #60a5fa, #34d399)',
                        top: '-10%',
                        right: '-10%',
                        willChange: 'transform',
                      }}
                      animate={{
                        x: [0, 80, 0],
                        y: [0, 40, 0],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
                      style={{
                        background: 'linear-gradient(to left, #22d3ee, #10b981)',
                        bottom: '-10%',
                        left: '-10%',
                        willChange: 'transform',
                      }}
                      animate={{
                        x: [0, -80, 0],
                        y: [0, -40, 0],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </>
                ) : (
                  <>
                    {/* Static orbs for mobile performance */}
                    <div
                      className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
                      style={{
                        background: 'linear-gradient(to right, #60a5fa, #34d399)',
                        top: '-10%',
                        right: '-10%',
                      }}
                    />
                    <div
                      className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
                      style={{
                        background: 'linear-gradient(to left, #22d3ee, #10b981)',
                        bottom: '-10%',
                        left: '-10%',
                      }}
                    />
                  </>
                )}
              </>
            )}
          </div>

          <FloatingNavbar activeSection={activeSection} onNavigate={scrollToSection} />

          {/* Scroll container with snap sections */}
          <div className="scroll-container h-screen overflow-y-auto snap-y snap-mandatory hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
            <section id="home" className="snap-section p-4">
              <Hero />
            </section>

            <section id="about" className="snap-section p-4">
              <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <About />
              </Suspense>
            </section>

            <section id="experience" className="snap-section p-4">
              <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <Experience />
              </Suspense>
            </section>

            <section id="gallery" className="snap-section p-4">
              <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <Gallery />
              </Suspense>
            </section>

            <section id="contact" className="snap-section p-4">
              <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <Contact />
              </Suspense>
            </section>

            <section id="sertifikat" className="snap-section p-4">
              <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <Sertifikat />
              </Suspense>
            </section>
          </div>
        </>
      )}
    </div>
  );
});

AppContent.displayName = 'AppContent';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
