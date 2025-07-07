import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Hero from './components/Hero';
import SimpleLoader from './components/Loader';
import FloatingNavbar from './components/NavBar';
import ThemeToggle from './components/ThemeToggle';

function AppContent() {
  const { isDarkMode, theme } = useTheme();
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);

  const { scrollXProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const sections = ['home', 'about', 'experience', 'contact'];
  const SCROLL_THRESHOLD = 100; // Threshold untuk trigger section change

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: -100,
      scale: 0.95,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.6,
  };

  // Initialize loading
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle scroll to section with animation
  const scrollToSection = (sectionId) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setScrollAccumulator(0); // Reset accumulator

      setTimeout(() => {
        setActiveSection(sectionId);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600);
      }, 100);
    }
  };

  // Scroll Observer dengan accumulator
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = (e) => {
      e.preventDefault();

      if (isLoading || isTransitioning) return;

      const deltaY = e.deltaY;
      const currentIndex = sections.indexOf(activeSection);

      // Accumulate scroll untuk smooth transition
      setScrollAccumulator((prev) => {
        const newAccumulator = prev + deltaY;

        // Jika accumulator melebihi threshold, trigger section change
        if (Math.abs(newAccumulator) >= SCROLL_THRESHOLD) {
          let targetIndex = currentIndex;

          if (newAccumulator > 0) {
            // Scroll down = next section
            targetIndex = Math.min(currentIndex + 1, sections.length - 1);
          } else {
            // Scroll up = previous section
            targetIndex = Math.max(currentIndex - 1, 0);
          }

          if (targetIndex !== currentIndex) {
            scrollToSection(sections[targetIndex]);
          }

          return 0; // Reset accumulator
        }

        return newAccumulator;
      });

      // Reset accumulator setelah tidak ada scroll dalam 150ms
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollAccumulator(0);
      }, 150);
    };

    // Attach scroll listener ke window untuk menangkap semua scroll events
    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, isLoading, isTransitioning]);

  // Touch/swipe support untuk mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent default scrolling
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isLoading || isTransitioning) return;

      const deltaY = touchStartY - touchEndY;
      const currentIndex = sections.indexOf(activeSection);

      // Minimum swipe distance
      if (Math.abs(deltaY) > 50) {
        let targetIndex = currentIndex;

        if (deltaY > 0) {
          // Swipe up = next section
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
          // Swipe down = previous section
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex) {
          scrollToSection(sections[targetIndex]);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isLoading, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading || isTransitioning) return;

      const currentIndex = sections.indexOf(activeSection);
      let targetIndex = currentIndex;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          targetIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = sections.length - 1;
          break;
        default:
          return;
      }

      if (targetIndex !== currentIndex) {
        scrollToSection(sections[targetIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isLoading, isTransitioning]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Render active section component
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero key="hero" />;
      case 'about':
        return <About key="about" />;
      case 'experience':
        return <Experience key="experience" />;
      case 'contact':
        return <Contact key="contact" />;
      default:
        return <Hero key="hero" />;
    }
  };

  return (
    <div className={`h-screen transition-all duration-500 ${theme.background} relative overflow-hidden p-4`}>
      {/* Loader */}
      <SimpleLoader isLoading={isLoading} onComplete={handleLoadingComplete} />

      {/* Main content - only show when not loading */}
      {!isLoading && (
        <>
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

          {/* Hidden container for scroll progress calculation */}
          <div ref={containerRef} className="absolute flex h-full overflow-x-auto overflow-y-hidden opacity-0 pointer-events-none snap-x snap-mandatory scrollbar-hide">
            {sections.map((section, index) => (
              <div key={section} id={section} className="flex-shrink-0 w-full h-full snap-start" />
            ))}
          </div>

          {/* Animated content container */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={activeSection} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0 w-full h-full">
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div className="fixed z-50 w-64 h-1 overflow-hidden transform -translate-x-1/2 rounded-full bottom-2 left-1/2 bg-white/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
              style={{
                scaleX: (sections.indexOf(activeSection) + 1) / sections.length,
                transformOrigin: 'left',
              }}
            />
          </motion.div>

          {/* Scroll indicator */}
          <div className="fixed z-40 transform -translate-y-1/2 right-6 top-1/2">
            <div className="flex flex-col space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-orange-500 scale-150' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Loading transition overlay */}
          {isTransitioning && <div className="fixed inset-0 z-30 pointer-events-none bg-black/10 backdrop-blur-sm" />}
        </>
      )}

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
