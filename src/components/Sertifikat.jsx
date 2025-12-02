import 'boxicons/css/boxicons.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { certificates } from '../../data/sertifikat';
import { useTheme } from '../../hooks/useTheme';
import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark';
import { getAnimationConfig, isMobileDevice } from '../utils/deviceDetection';

const Sertifikat = () => {
  const { theme, isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Get optimized settings
  const animConfig = useMemo(() => getAnimationConfig(), []);
  const isMobile = useMemo(() => isMobileDevice(), []);

  // Handler for external links
  const handleExternalLinkClick = () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('externalLinkClicked'));
    }, 100);
  };

  // Categories
  const categories = [
    { id: 'all', label: 'All', icon: 'bx-grid-alt' },
    { id: 'pelatihan', label: 'Pelatihan', icon: 'bx-bxs-graduation' },
    { id: 'organisasi', label: 'Organisasi', icon: 'bx-group' },
  ];

  // Filter certificates based on active category
  const filteredCertificates = activeCategory === 'all' ? certificates : certificates.filter((cert) => cert.category === activeCategory);

  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile
      if (window.innerWidth < 1024) return 3; // Tablet
      return 4; // Desktop
    }
    return 6;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Update items per page on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(0); // Reset to first page on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when category changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, endIndex);

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <ClickSpark sparkColor={isDarkMode ? '#fff' : '#000'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className={`relative flex flex-col min-h-[90vh] px-2 py-4 lg:px-20 ${theme.textPrimary}`}>
        {/* Category Tabs */}
        <motion.div variants={tabVariants} initial="hidden" animate="visible" className="w-full mx-auto mb-6 max-w-7xl sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category.id)}
                className={`relative flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.buttonAccent} ${theme.border} ${theme.textPrimary} hover:scale-105`
                }`}
              >
                <i className={`${category.icon} text-base sm:text-lg mr-2`}></i>
                <span>{category.label}</span>

                {/* Badge with count */}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeCategory === category.id ? 'bg-white/20 text-white' : `${theme.border} ${theme.textMuted} bg-gray-100 dark:bg-gray-800`}`}
                >
                  {category.id === 'all' ? certificates.length : certificates.filter((cert) => cert.category === category.id).length}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Certificates Grid Container with proper spacing */}
        <div className="flex flex-col flex-1 min-h-0">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 pb-4">
            <div className="grid grid-cols-1 gap-3 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl sm:gap-4">
              <AnimatePresence mode="wait">
                {currentCertificates.map((certificate) => (
                  <motion.div key={`${certificate.id}-${activeCategory}`} variants={itemVariants} initial="hidden" animate="visible" exit="hidden" className="relative group">
                    <motion.div
                      variants={cardVariants}
                      initial="rest"
                      whileHover="hover"
                      className={`relative overflow-hidden rounded-lg ${theme.cardBackground} ${theme.border} backdrop-blur-sm transition-all duration-300 ${theme.cardHover} cursor-pointer`}
                      onClick={() => openModal(certificate)}
                    >
                      {/* Certificate Image */}
                      <div className="relative overflow-hidden h-28 sm:h-32">
                        <img src={certificate.image} alt={certificate.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />

                        {/* Category Badge */}
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${certificate.category === 'pelatihan' ? 'bg-blue-500/80 text-white' : 'bg-green-500/80 text-white'} backdrop-blur-sm`}>
                            {certificate.category === 'pelatihan' ? 'Pelatihan' : 'Organisasi'}
                          </span>
                        </div>

                        {/* Actions Button */}
                        <div className="absolute flex space-x-1 transition-all duration-300 opacity-0 top-2 right-2 group-hover:opacity-100">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExternalLinkClick();
                              window.open(certificate.pdfUrl, '_blank');
                            }}
                            className="flex items-center gap-1 p-1 text-xs text-white rounded bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          >
                            <i className="text-sm bx bx-download"></i>
                            <span className="hidden sm:inline">PDF</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Certificate Info - Mobile shows only title, Desktop shows full info */}
                      <div className="p-2.5 sm:p-3">
                        {/* Mobile View - Only Title */}
                        <div className="block sm:hidden">
                          <h3 className={`text-sm font-bold ${theme.textPrimary} line-clamp-2 leading-tight text-center`}>{certificate.title}</h3>
                        </div>

                        {/* Desktop View - Full Info */}
                        <div className="hidden sm:block">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className={`flex items-center text-xs ${theme.textMuted}`}>
                              <i className="mr-1 text-xs bx bx-calendar"></i>
                              {new Date(certificate.date).getFullYear()}
                            </div>
                            <i className={`bx bx-award text-base ${theme.textAccent}`}></i>
                          </div>

                          <h3 className={`text-sm sm:text-base font-bold mb-1 ${theme.textPrimary} line-clamp-2 leading-tight`}>{certificate.title}</h3>

                          <p className={`text-xs ${theme.textSecondary} mb-1.5 truncate`}>{certificate.issuer}</p>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-0.5 mb-1.5">
                            {certificate.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className={`text-xs px-1.5 py-0.5 rounded ${theme.buttonAccent} ${theme.border} ${theme.textSecondary}`}>
                                {skill}
                              </span>
                            ))}
                            {certificate.skills.length > 3 && (
                              <span className={`text-xs px-1.5 py-0.5 rounded ${theme.buttonAccent} ${theme.textSecondary} ${theme.border}`}>+{certificate.skills.length - 3}</span>
                            )}
                          </div>

                          {/* Credential ID */}
                          <p className={`text-xs ${theme.textMuted} font-mono truncate`}>{certificate.credentialId}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results Message */}
            {filteredCertificates.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-12">
                <i className={`bx bx-search text-6xl ${theme.textMuted} mb-4`}></i>
                <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>No certificates found</h3>
                <p className={`text-sm ${theme.textMuted} text-center`}>No certificates available in the selected category.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Pagination - Fixed positioning */}
          {totalPages > 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex-shrink-0 w-full">
              <div className="flex flex-col items-center justify-center w-full px-4 py-4 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {/* Pagination Controls */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`p-2 sm:p-2.5 rounded-full ${theme.buttonAccent} ${theme.border} disabled:opacity-50 disabled:cursor-not-allowed text-sm ${theme.textPrimary}`}
                  >
                    <i className="bx bx-chevron-left"></i>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className={`flex space-x-1 sm:space-x-2 ${theme.textPrimary}`}>
                    {[...Array(totalPages)].map((_, index) => {
                      // Show first page, last page, current page, and adjacent pages
                      const showPage = index === 0 || index === totalPages - 1 || index === currentPage || index === currentPage - 1 || index === currentPage + 1;

                      if (!showPage && index !== 1 && index !== totalPages - 2) {
                        // Show ellipsis
                        if (index === 1 || index === totalPages - 2) {
                          return (
                            <span key={index} className={`px-2 py-1 text-sm ${theme.textMuted}`}>
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => goToPage(index)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-sm font-medium transition-all ${
                            index === currentPage ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : `${theme.buttonAccent} ${theme.border} hover:bg-gray-300`
                          } ${theme.textPrimary}`}
                        >
                          {index + 1}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`p-2 sm:p-2.5 rounded-full ${theme.buttonAccent} ${theme.border} disabled:opacity-50 disabled:cursor-not-allowed text-sm ${theme.textPrimary}`}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </motion.button>
                </div>

                {/* Page Info */}
                <div className="flex items-center text-sm">
                  <span className={theme.textMuted}>
                    Page {currentPage + 1} of {totalPages}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal with Image Preview */}
        <AnimatePresence>
          {isModalOpen && selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-lg ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'}`}
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`relative w-full max-w-4xl max-h-[90vh] ${theme.backgroundModal} ${theme.border} rounded-lg overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`flex items-center justify-between p-4 ${theme.border} border-b ${theme.backgroundModal}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h2 className={`text-lg sm:text-xl font-bold ${theme.textPrimary} truncate`}>{selectedCertificate.title}</h2>
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedCertificate.category === 'pelatihan' ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' : 'bg-green-500/20 text-green-600 border border-green-500/30'
                        }`}
                      >
                        {selectedCertificate.category === 'pelatihan' ? 'Pelatihan' : 'Organisasi'}
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textSecondary} truncate`}>{selectedCertificate.issuer}</p>
                  </div>
                  <div className="flex items-center ml-4 space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleExternalLinkClick();
                        window.open(selectedCertificate.pdfUrl, '_blank');
                      }}
                      className={`p-2 rounded-full ${theme.buttonAccent} ${theme.border} text-sm ${theme.textPrimary}`}
                    >
                      <i className="bx bx-link-external"></i>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeModal}
                      className={`p-2 rounded-full ${theme.buttonAccent} ${theme.border} text-sm ${theme.textPrimary}`}
                    >
                      <i className="bx bx-x"></i>
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content with Image Preview */}
                <div className="max-h-[70vh] overflow-auto">
                  <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
                    {/* Left Side - Certificate Image */}
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <img src={selectedCertificate.image} alt={selectedCertificate.title} className="w-full h-auto rounded-lg shadow-lg" />
                      </div>
                    </div>

                    {/* Right Side - Certificate Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className={`text-base font-semibold mb-2 ${theme.textPrimary}`}>Description</h3>
                        <p className={`${theme.textSecondary} text-sm leading-relaxed`}>{selectedCertificate.description}</p>
                      </div>

                      <div>
                        <h3 className={`text-base font-semibold mb-2 ${theme.textPrimary}`}>Skills</h3>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {selectedCertificate.skills.map((skill, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded ${theme.buttonAccent} ${theme.border} ${theme.textSecondary}`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div>
                          <span className={`font-medium ${theme.textPrimary}`}>Issue Date:</span>
                          <p className={theme.textSecondary}>{new Date(selectedCertificate.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className={`font-medium ${theme.textPrimary}`}>Credential ID:</span>
                          <p className={`${theme.textSecondary} font-mono text-xs break-all`}>{selectedCertificate.credentialId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickSpark>
  );
};

export default Sertifikat;
