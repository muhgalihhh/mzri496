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
  const SCROLL_THRESHOLD = 300; // Increased threshold for less sensitivity
  const TOUCH_THRESHOLD = 80; // Increased threshold for touch
  const SCROLL_DEBOUNCE = 250; // Increased debounce time

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

  // Check if element is interactive (button, link, input, etc.)
  const isInteractiveElement = (element) => {
    const interactiveTags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
    const interactiveRoles = ['button', 'link', 'tab', 'menuitem'];
    const interactiveClasses = ['btn', 'button', 'link', 'clickable', 'interactive'];

    // Check if element or its parents are interactive
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      // Check tag name
      if (interactiveTags.includes(currentElement.tagName)) {
        return true;
      }

      // Check role attribute
      if (interactiveRoles.includes(currentElement.getAttribute('role'))) {
        return true;
      }

      // Check class names
      if (currentElement.className && typeof currentElement.className === 'string') {
        if (interactiveClasses.some((cls) => currentElement.className.includes(cls))) {
          return true;
        }
      }

      // Check if element has click handlers
      if (currentElement.onclick || currentElement.hasAttribute('onclick')) {
        return true;
      }

      // Check if element is focusable
      if (currentElement.tabIndex >= 0) {
        return true;
      }

      currentElement = currentElement.parentElement;
    }

    return false;
  };

  // Improved scroll handler with better filtering
  useEffect(() => {
    let scrollTimeout;
    let lastScrollTime = 0;

    const handleScroll = (e) => {
      if (isLoading || isTransitioning) return;

      const now = Date.now();

      // Check if user is interacting with UI elements
      if (isInteractiveElement(e.target)) {
        return; // Don't prevent scroll on interactive elements
      }

      // Rate limiting - prevent too frequent scroll events
      if (now - lastScrollTime < 50) {
        return;
      }
      lastScrollTime = now;

      e.preventDefault();

      const deltaY = e.deltaY;
      const currentIndex = sections.indexOf(activeSection);

      // Only process significant scroll movements
      if (Math.abs(deltaY) < 10) {
        return;
      }

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

      // Reset accumulator setelah tidak ada scroll dalam waktu yang lebih lama
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollAccumulator(0);
      }, SCROLL_DEBOUNCE);
    };

    // Attach scroll listener ke window untuk menangkap semua scroll events
    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, isLoading, isTransitioning]);

  // Improved touch/swipe support untuk mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isTouching = false;

    const handleTouchStart = (e) => {
      // Don't handle touch on interactive elements
      if (isInteractiveElement(e.target)) {
        return;
      }

      isTouching = true;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (!isTouching || isInteractiveElement(e.target)) {
        return;
      }

      touchEndY = e.touches[0].clientY;
      touchEndX = e.touches[0].clientX;

      const deltaY = Math.abs(touchStartY - touchEndY);
      const deltaX = Math.abs(touchStartX - touchEndX);

      // Only prevent default if it's a clear vertical swipe
      if (deltaY > deltaX && deltaY > 30) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      if (!isTouching || isLoading || isTransitioning) {
        isTouching = false;
        return;
      }

      isTouching = false;

      // Don't handle touch on interactive elements
      if (isInteractiveElement(e.target)) {
        return;
      }

      const deltaY = touchStartY - touchEndY;
      const deltaX = Math.abs(touchStartX - touchEndX);
      const touchDuration = Date.now() - touchStartTime;
      const currentIndex = sections.indexOf(activeSection);

      // More strict conditions for touch navigation
      // Must be: vertical swipe, minimum distance, not too slow, not too fast
      if (
        Math.abs(deltaY) > TOUCH_THRESHOLD && // Minimum swipe distance
        Math.abs(deltaY) > deltaX * 1.5 && // More vertical than horizontal
        touchDuration > 100 && // Not too fast (prevents accidental swipes)
        touchDuration < 1000 // Not too slow (prevents accidental swipes)
      ) {
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

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

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

      // Don't handle keyboard navigation if user is typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

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
