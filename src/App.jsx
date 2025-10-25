import { AnimatePresence, motion } from 'framer-motion';
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import Hero from './components/Hero';
import SimpleLoader from './components/Loader';
import FloatingNavbar from './components/NavBar';
import ThemeToggle from './components/ThemeToggle';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Experience = lazy(() => import('./components/Experience'));
const Sertifikat = lazy(() => import('./components/Sertifikat'));

const AppContent = React.memo(() => {
  const { isDarkMode, theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use refs to persist flags across renders
  const isScrollingRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const sections = useMemo(() => ['home', 'about', 'experience', 'contact', 'sertifikat'], []);

  // Animation variants - memoized
  const pageVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        x: 50,
        scale: 0.98,
      },
      in: {
        opacity: 1,
        x: 0,
        scale: 1,
      },
      out: {
        opacity: 0,
        x: -50,
        scale: 0.98,
      },
    }),
    []
  );

  const pageTransition = useMemo(
    () => ({
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
    }),
    []
  );

  // Initialize loading - optimized to 1 second
  useEffect(() => {
    // Simulate loading time (minimum 1 second for better UX)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Periodic cleanup to prevent stuck flags (safety net)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      // If flags have been locked for more than 2 seconds, force reset
      if (isScrollingRef.current || isNavigatingRef.current) {
        console.log('Periodic cleanup - resetting stuck flags');
        isScrollingRef.current = false;
        isNavigatingRef.current = false;
        setIsTransitioning(false);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(cleanupInterval);
  }, []);

  // Handle navigation to section - simplified for better performance
  const scrollToSection = useCallback((sectionId) => {
    console.log('scrollToSection called:', sectionId, 'isNavigating:', isNavigatingRef.current);

    if (isNavigatingRef.current) {
      console.warn('Navigation blocked - isNavigating is true');
      return;
    }

    isNavigatingRef.current = true;
    setIsTransitioning(true);
    setActiveSection(sectionId);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      isNavigatingRef.current = false;
      console.log('Navigation complete, flags reset');
    }, 500);
  }, []);

  // Detect wheel scroll direction for section navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isLoading || isScrollingRef.current || isNavigatingRef.current) {
        if (isNavigatingRef.current) {
          console.log('Wheel blocked - isNavigating is true');
        }
        return;
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce scroll events
      scrollTimeoutRef.current = setTimeout(() => {
        const currentIndex = sections.indexOf(activeSection);
        let targetIndex = currentIndex;

        if (e.deltaY > 30) {
          // Scroll down threshold (reduced for better sensitivity)
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (e.deltaY < -30) {
          // Scroll up threshold (reduced for better sensitivity)
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex) {
          console.log('Wheel navigation:', sections[currentIndex], '->', sections[targetIndex]);
          isScrollingRef.current = true;
          setIsTransitioning(true);
          setActiveSection(sections[targetIndex]);

          setTimeout(() => {
            setIsTransitioning(false);
            isScrollingRef.current = false;
            console.log('Wheel navigation complete');
          }, 500); // Slightly longer to prevent rapid scrolling
        }
      }, 50); // Small debounce delay
    };

    // Use passive: true for better performance
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isLoading, activeSection, sections]);

  // Keyboard navigation - Arrow Up/Down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading || isNavigatingRef.current) return;

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
        isNavigatingRef.current = true;
        setIsTransitioning(true);
        setActiveSection(sections[targetIndex]);

        setTimeout(() => {
          setIsTransitioning(false);
          isNavigatingRef.current = false;
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading, activeSection, sections]);

  // Reset navigation flags when visibility changes (user comes back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Tab visible again - force resetting all flags');
        // User came back to the tab, reset all flags
        isScrollingRef.current = false;
        isNavigatingRef.current = false;
        setIsTransitioning(false);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }

        // Force another reset after small delay to be sure
        setTimeout(() => {
          isScrollingRef.current = false;
          isNavigatingRef.current = false;
          setIsTransitioning(false);
          console.log('Secondary reset complete');
        }, 200);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Reset navigation flags on focus (when user clicks back on window)
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focus - force resetting all flags');
      // Reset all navigation flags when window regains focus
      isScrollingRef.current = false;
      isNavigatingRef.current = false;
      setIsTransitioning(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Reset navigation flags when external link is clicked
  useEffect(() => {
    const handleExternalLink = () => {
      console.log('External link clicked - resetting navigation flags');

      // Reset all navigation flags immediately
      isScrollingRef.current = false;
      isNavigatingRef.current = false;
      setIsTransitioning(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }

      console.log('Navigation flags reset complete');
    };

    window.addEventListener('externalLinkClicked', handleExternalLink);

    return () => {
      window.removeEventListener('externalLinkClicked', handleExternalLink);
    };
  }, []);

  // Additional reset on window blur (when user switches to another tab)
  useEffect(() => {
    const handleBlur = () => {
      console.log('Window blur - resetting navigation flags');
      isScrollingRef.current = false;
      isNavigatingRef.current = false;
      setIsTransitioning(false);
    };

    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Reset on pageshow (when user returns to page from BFCache)
  useEffect(() => {
    const handlePageShow = () => {
      console.log('Page show - resetting navigation flags');
      isScrollingRef.current = false;
      isNavigatingRef.current = false;
      setIsTransitioning(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // Reset on mouse movement (user is back and active)
  useEffect(() => {
    let mouseMoveTimeout;

    const handleMouseMove = () => {
      // Clear previous timeout
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }

      // Immediately reset if flags are stuck
      if (isNavigatingRef.current || isScrollingRef.current) {
        console.log('Mouse movement detected - immediately resetting stuck flags');
        isScrollingRef.current = false;
        isNavigatingRef.current = false;
        setIsTransitioning(false);
      }

      // Set new timeout for delayed check
      mouseMoveTimeout = setTimeout(() => {
        if (isNavigatingRef.current || isScrollingRef.current) {
          console.log('Mouse movement timeout - resetting flags');
          isScrollingRef.current = false;
          isNavigatingRef.current = false;
          setIsTransitioning(false);
        }
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
    };
  }, []);
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Render active section component - memoized
  const renderActiveSection = useCallback(() => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <About />
          </Suspense>
        );
      case 'experience':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <Experience />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <Contact />
          </Suspense>
        );
      case 'sertifikat':
        return (
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <Sertifikat />
          </Suspense>
        );
      default:
        return <Hero />;
    }
  }, [activeSection]);

  return (
    <div className={`h-screen transition-all duration-500 ${theme.background} relative p-4`}>
      {/* Loader */}
      <SimpleLoader isLoading={isLoading} onComplete={handleLoadingComplete} />

      {/* Main content - only show when not loading */}
      {!isLoading && (
        <>
          <ThemeToggle />

          {/* Animated gradient background */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            {isDarkMode ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
                {/* Animated gradient orbs */}
                <motion.div
                  className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
                  style={{
                    background: 'linear-gradient(to right, #3b82f6, #10b981)',
                    top: '-10%',
                    right: '-10%',
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50"></div>
                {/* Animated gradient orbs for light mode */}
                <motion.div
                  className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
                  style={{
                    background: 'linear-gradient(to right, #60a5fa, #34d399)',
                    top: '-10%',
                    right: '-10%',
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
            )}
          </div>

          <FloatingNavbar activeSection={activeSection} onNavigate={scrollToSection} />

          {/* Animated content container */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={activeSection} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0 w-full h-full">
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
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
