import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { certificates } from '../../data/sertifikat';
import { useTheme } from '../../hooks/useTheme';
import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark';

const Sertifikat = () => {
  const { theme, isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile
      if (window.innerWidth < 1024) return 4; // Tablet
      return 6; // Desktop
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

  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCertificates = certificates.slice(startIndex, endIndex);

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

  return (
    <ClickSpark sparkColor={isDarkMode ? '#fff' : '#000'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 lg:px-20 relative mt-10">
        {/* Certificates Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-auto ">
          <div className="grid grid-cols-1 gap-3 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl sm:gap-4">
            <AnimatePresence mode="wait">
              {currentCertificates.map((certificate) => (
                <motion.div key={certificate.id} variants={itemVariants} initial="hidden" animate="visible" exit="hidden" className="relative group">
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

                      {/* More Compact Actions */}
                      <div className="absolute flex space-x-1 transition-all duration-300 opacity-0 top-2 right-2 group-hover:opacity-100">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(certificate.pdfUrl, '_blank');
                          }}
                          className="flex items-center gap-1 p-1 text-xs text-white rounded bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          <i className="text-sm bx bx-download"></i>
                          <span className="hidden sm:inline">PDF</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* More Compact Certificate Info */}
                    <div className="p-2.5 sm:p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center text-xs text-gray-500">
                          <i className="mr-1 text-xs bx bx-calendar"></i>
                          {new Date(certificate.date).getFullYear()}
                        </div>
                        <i className={`bx bx-award text-base ${theme.textAccent} ${theme.textSecondary}`}></i>
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold mb-1 ${theme.textPrimary} line-clamp-2 leading-tight`}>{certificate.title}</h3>

                      <p className={`text-xs ${theme.textSecondary} mb-1.5 truncate`}>{certificate.issuer}</p>

                      {/* More Compact Skills Tags */}
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

                      {/* More Compact Credential ID */}
                      <p className={`text-xs ${theme.textMuted} font-mono truncate`}>{certificate.credentialId}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-center px-4 mt-4 sm:mt-6">
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
            <div className="items-center hidden ml-4 text-sm sm:flex">
              <span className={theme.textMuted}>
                Page {currentPage + 1} of {totalPages}
              </span>
            </div>
          </motion.div>
        )}

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
                    <h2 className={`text-lg sm:text-xl font-bold ${theme.textPrimary} truncate`}>{selectedCertificate.title}</h2>
                    <p className={`text-sm ${theme.textSecondary} truncate`}>{selectedCertificate.issuer}</p>
                  </div>
                  <div className="flex items-center ml-4 space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedCertificate.pdfUrl, '_blank')}
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
