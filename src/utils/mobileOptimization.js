// Utility to detect mobile devices
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Reduce motion for accessibility and performance
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobileDevice();
};

// Get optimized animation duration based on device
export const getAnimationDuration = (defaultDuration = 0.3) => {
  return isMobileDevice() ? defaultDuration * 0.7 : defaultDuration;
};

// Simplified animation variants for mobile
export const getMobileOptimizedVariants = (variants) => {
  if (!isMobileDevice()) return variants;

  // Remove heavy properties like scale, x, y transforms on mobile
  const optimized = {};
  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === 'object') {
      optimized[key] = {
        opacity: value.opacity,
        transition: value.transition
          ? {
              ...value.transition,
              duration: (value.transition.duration || 0.3) * 0.7,
            }
          : undefined,
      };
    } else {
      optimized[key] = value;
    }
  }
  return optimized;
};

// Preload critical images
export const preloadCriticalImages = (images) => {
  if (typeof window === 'undefined') return;

  images.slice(0, 3).forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};
