import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const Gallery = () => {
  const { isDarkMode, theme } = useTheme();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-import all images from galleryku folder
    const loadImages = async () => {
      try {
        // Using Vite's import.meta.glob to auto-import images
        const imageModules = import.meta.glob('/public/galleryku/*.{jpg,jpeg,png,gif,webp}', {
          eager: false,
        });

        const imageList = await Promise.all(
          Object.entries(imageModules).map(async ([path]) => {
            const filename = path.split('/').pop();
            const name = filename.replace(/\.[^/.]+$/, ''); // Remove extension

            // For public folder, we can access directly
            const url = path.replace('/public', '');

            return {
              id: filename,
              url: url,
              name: name,
              path: path,
            };
          })
        );

        setImages(imageList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading gallery images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: 90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-2xl font-bold ${theme.textPrimary}`}>Loading Gallery...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${theme.background}`}>
      {/* Artistic Header */}
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="mb-16 text-center">
        <motion.h1
          className={`text-6xl sm:text-7xl md:text-8xl font-bold mb-6 ${theme.textPrimary}`}
          style={{
            fontFamily: 'RFDewi, sans-serif',
            textShadow: isDarkMode ? '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)' : '0 0 40px rgba(0, 0, 0, 0.1), 0 0 80px rgba(0, 0, 0, 0.05)',
          }}
        >
          Gallery
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-1 w-32 mx-auto mb-6 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'}`}
        />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className={`text-lg sm:text-xl ${theme.textSecondary} max-w-2xl mx-auto`}>
          A Collection of My Creative Works & Artistic Journey
        </motion.p>
      </motion.div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
          <i className={`bx bx-image-alt text-9xl mb-6 ${theme.textSecondary}`}></i>
          <p className={`text-xl ${theme.textSecondary}`}>No images found in gallery folder</p>
          <p className={`text-sm mt-4 ${theme.textSecondary} opacity-70`}>
            Add images to <code className={`px-2 py-1 rounded ${theme.cardBackground}`}>/public/galleryku/</code>
          </p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateZ: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3 },
              }}
              className="group relative cursor-pointer perspective-1000"
              onClick={() => setSelectedImage(image)}
            >
              {/* Artistic Frame */}
              <div
                className={`
                relative overflow-hidden rounded-2xl shadow-2xl
                transition-all duration-500 ease-out
                ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700' : 'bg-gradient-to-br from-gray-100 via-white to-gray-50 border border-gray-200'}
              `}
              >
                {/* Decorative Corner Elements */}
                <div
                  className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 ${
                    isDarkMode ? 'border-purple-400' : 'border-purple-600'
                  } opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  className={`absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 ${
                    isDarkMode ? 'border-pink-400' : 'border-pink-600'
                  } opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 ${
                    isDarkMode ? 'border-blue-400' : 'border-blue-600'
                  } opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 ${
                    isDarkMode ? 'border-indigo-400' : 'border-indigo-600'
                  } opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden p-4">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded-lg transform transition-all duration-500 
                      group-hover:scale-110 group-hover:rotate-2 filter group-hover:brightness-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div
                    className={`
                    absolute inset-0 m-4 rounded-lg
                    bg-gradient-to-t from-black/80 via-black/40 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    flex items-end justify-center p-6
                  `}
                  >
                    <p className="text-white font-bold text-lg text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.name}</p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div
                  className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-br ${isDarkMode ? 'from-purple-500/20 via-pink-500/20 to-blue-500/20' : 'from-purple-300/30 via-pink-300/30 to-blue-300/30'}
                  blur-xl -z-10
                `}
                />
              </div>

              {/* Artistic Shadow */}
              <div
                className={`
                absolute inset-0 -z-20 rounded-2xl blur-2xl
                transform translate-y-4
                ${isDarkMode ? 'bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-blue-900/40' : 'bg-gradient-to-br from-purple-200/60 via-pink-200/60 to-blue-200/60'}
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              `}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal for Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={`
                relative max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden
                ${isDarkMode ? 'bg-gray-900 border-2 border-gray-700' : 'bg-white border-2 border-gray-200'}
                shadow-2xl
              `}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className={`
                  absolute top-4 right-4 z-10 p-3 rounded-full
                  ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                  transition-all duration-300 hover:scale-110 shadow-lg
                `}
              >
                <i className="bx bx-x text-2xl"></i>
              </button>

              {/* Image */}
              <div className="p-8">
                <img src={selectedImage.url} alt={selectedImage.name} className="w-full h-full object-contain max-h-[80vh] rounded-2xl" />

                {/* Image Info */}
                <div className="mt-6 text-center">
                  <h3 className={`text-2xl font-bold ${theme.textPrimary}`}>{selectedImage.name}</h3>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 rounded-tl-3xl ${isDarkMode ? 'border-purple-400' : 'border-purple-600'}`} />
              <div className={`absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 rounded-br-3xl ${isDarkMode ? 'border-pink-400' : 'border-pink-600'}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
