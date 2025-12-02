// Performance utilities for optimizing animations and rendering

/**
 * Detect if device is mobile
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

/**
 * Detect if device has reduced motion preference
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimized animation settings based on device
 */
export const getAnimationConfig = () => {
  const isMobile = isMobileDevice();
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      duration: 0,
      stagger: 0,
      enabled: false,
    };
  }

  if (isMobile) {
    return {
      duration: 0.3,
      stagger: 0.05,
      enabled: true,
      simplified: true,
    };
  }

  return {
    duration: 0.5,
    stagger: 0.1,
    enabled: true,
    simplified: false,
  };
};

/**
 * Throttle function for performance
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Check if element is in viewport (for lazy loading)
 */
export const isInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback = typeof window !== 'undefined' && window.requestIdleCallback ? window.requestIdleCallback : (cb) => setTimeout(cb, 1);

/**
 * Cancel idle callback polyfill
 */
export const cancelIdleCallback = typeof window !== 'undefined' && window.cancelIdleCallback ? window.cancelIdleCallback : (id) => clearTimeout(id);

/**
 * Get device performance tier
 * Returns: 'high', 'medium', or 'low'
 */
export const getPerformanceTier = () => {
  if (typeof window === 'undefined') return 'medium';

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;

  // Check device memory (if available)
  const memory = navigator.deviceMemory || 4;

  // Check if mobile
  const isMobile = isMobileDevice();

  if (isMobile) {
    if (cores >= 8 && memory >= 6) return 'high';
    if (cores >= 4 && memory >= 3) return 'medium';
    return 'low';
  }

  // Desktop
  if (cores >= 8 && memory >= 8) return 'high';
  if (cores >= 4 && memory >= 4) return 'medium';
  return 'low';
};

/**
 * Optimize image loading based on device
 */
export const getImageQuality = () => {
  const tier = getPerformanceTier();
  const isMobile = isMobileDevice();

  if (tier === 'low' || isMobile) {
    return {
      quality: 'medium',
      maxWidth: 800,
      lazy: true,
    };
  }

  if (tier === 'medium') {
    return {
      quality: 'high',
      maxWidth: 1200,
      lazy: true,
    };
  }

  return {
    quality: 'high',
    maxWidth: 1920,
    lazy: false,
  };
};

/**
 * Reduce animation complexity for low-end devices
 */
export const shouldUseSimpleAnimations = () => {
  const tier = getPerformanceTier();
  return tier === 'low' || isMobileDevice();
};
