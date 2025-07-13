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
import Sertifikat from './components/Sertifikat';
import ThemeToggle from './components/ThemeToggle';

function AppContent() {
  const { isDarkMode, theme } = useTheme();
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollXProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const sections = ['home', 'about', 'experience', 'contact', 'sertifikat'];

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
    // Simulate loading time (minimum 3 seconds for animation)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle scroll to section with animation
  const scrollToSection = (sectionId) => {
    if (containerRef.current && !isTransitioning) {
      setIsTransitioning(true);

      // Small delay to show exit animation
      setTimeout(() => {
        const container = containerRef.current;
        const section = container.querySelector(`#${sectionId}`);
        if (section) {
          const containerWidth = container.clientWidth;
          const sectionIndex = sections.indexOf(sectionId);

          container.scrollTo({ left: sectionIndex * containerWidth, behavior: 'smooth' });
          setActiveSection(sectionId);
        }

        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600);
      }, 100);
    }
  };

  // Detect wheel scroll direction and switch sections accordingly
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent default scroll behavior

      if (containerRef.current && !isLoading && !isTransitioning) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const currentIndex = Math.round(scrollLeft / containerWidth);

        let targetIndex = currentIndex;

        if (e.deltaY > 0) {
          // Scroll down = next section
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (e.deltaY < 0) {
          // Scroll up = previous section
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex) {
          setIsTransitioning(true);

          // Small delay to show exit animation
          setTimeout(() => {
            container.scrollTo({
              left: targetIndex * containerWidth,
              behavior: 'smooth',
            });

            setActiveSection(sections[targetIndex]);

            // Reset transition state after animation completes
            setTimeout(() => {
              setIsTransitioning(false);
            }, 600);
          }, 100);
        }
      }
    };

    containerRef.current?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      containerRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [isLoading, isTransitioning]);

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
        return <Contact />;
      case 'sertifikat':
        return <Sertifikat key="sertifikat" />;
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
                {/* <div className="absolute w-96 h-96 top-20 right-20 bg-gradient-to-br from-orange-500/20 to-pink-500/20 blur-3xl -z-10" /> */}
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-white -z-10"></div>
                {/* <div className="absolute w-96 h-96 top-20 right-20 bg-gradient-to-br from-orange-200/30 to-pink-200/30 blur-3xl -z-10" /> */}
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
