import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React refresh
      fastRefresh: true,
      // Use automatic runtime
      jsxRuntime: 'automatic',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Better code splitting strategy
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            // Other node_modules
            return 'vendor-other';
          }

          // Component chunks - lazy loaded
          if (id.includes('/components/')) {
            if (id.includes('About')) return 'about';
            if (id.includes('Sertifikat')) return 'sertifikat';
            if (id.includes('Experience')) return 'experience';
            if (id.includes('Contact')) return 'contact';
            if (id.includes('Gallery')) return 'gallery';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size limit
    chunkSizeWarningLimit: 600,
    // Enhanced minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        dead_code: true,
        unused: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2015',
    // Split CSS for better caching
    cssCodeSplit: true,
    // Disable sourcemaps for production
    sourcemap: false,
    // Enable CSS minification
    cssMinify: true,
    // Reduce module preload
    modulePreload: {
      polyfill: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
  // Improve dev server performance
  server: {
    hmr: {
      overlay: false,
    },
    // Enable compression
    compress: true,
  },
  // Performance hints
  preview: {
    port: 4173,
  },
});
