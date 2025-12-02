import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className, style, onLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Use more aggressive loading for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        // Load images earlier for smoother experience
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative ${className || ''}`}
      style={{
        ...style,
        minHeight: style?.height || '200px',
        backgroundColor: 'transparent',
      }}
    >
      {isInView && !error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
            // Optimize rendering
            transform: 'translateZ(0)',
            willChange: isLoaded ? 'auto' : 'opacity',
          }}
          {...props}
        />
      )}
      {!isLoaded && isInView && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 backdrop-blur-sm rounded-lg">
          <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
          <span className="text-sm text-gray-400">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(LazyImage);
