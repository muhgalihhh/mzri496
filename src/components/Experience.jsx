import 'boxicons/css/boxicons.min.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { tabs } from '../../data/experience';
import { useTheme } from '../../hooks/useTheme';
import ClickSpark from '../blocks/Animations/ClickSpark/ClickSpark';

const Experience = () => {
  const { isDarkMode, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('education');
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Handler for external links
  const handleExternalLinkClick = () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('externalLinkClicked'));
    }, 100);
  };

  // Get unique categories from projects data
  const projectCategories = useMemo(() => {
    const projectsTab = tabs.find((tab) => tab.id === 'projects');
    if (!projectsTab) return [];

    const categories = [...new Set(projectsTab.data.map((project) => project.category))];
    return categories.sort();
  }, []);

  // Filter data based on selected category (only for projects)
  const filteredData = useMemo(() => {
    const currentTabData = tabs.find((tab) => tab.id === activeTab)?.data || [];

    if (activeTab === 'projects' && selectedCategory !== 'all') {
      return currentTabData.filter((project) => project.category === selectedCategory);
    }

    return currentTabData;
  }, [activeTab, selectedCategory]);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Check if any item is expanded
  const hasExpandedItem = Object.values(expandedItems).some(Boolean);
  const expandedItemId = Object.keys(expandedItems).find((id) => expandedItems[id]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(0);
    setExpandedItems({});
    setSelectedCategory('all'); // Reset category filter when switching tabs
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    setExpandedItems({});
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedItems({});
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => {
      // Jika item yang diklik sudah expanded, collapse semua
      if (prev[itemId]) {
        return {};
      }
      // Jika item yang diklik belum expanded, collapse semua yang lain dan expand yang ini
      return { [itemId]: true };
    });
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

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const tabVariants = {
    inactive: { scale: 0.95, opacity: 0.7 },
    active: { scale: 1, opacity: 1 },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const expandVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <ClickSpark sparkColor={isDarkMode ? '#fff' : '#000'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <main className={`flex flex-col items-center justify-center min-h-[90vh] p-2 lg:px-20 ${theme.textPrimary}`}>
        <motion.div className="w-full max-w-6xl" variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}

          {/* Tabs */}
          <motion.div
            className="flex justify-center mb-6"
            variants={itemVariants}
            animate={{
              scale: hasExpandedItem ? 0.8 : 1,
              opacity: hasExpandedItem ? 0.3 : 1,
              y: hasExpandedItem ? -20 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex p-1 rounded-2xl ${theme.navBackground}`}>
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center px-2 py-1 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id ? `${theme.navActive} ` : `${theme.textSecondary} hover:${theme.textPrimary}`
                  }`}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`bx ${tab.icon} mr-2 text-lg`}></i>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Category Filter - Only show for projects tab */}
          {activeTab === 'projects' && (
            <motion.div
              className="flex justify-center mb-6"
              variants={itemVariants}
              animate={{
                scale: hasExpandedItem ? 0.8 : 1,
                opacity: hasExpandedItem ? 0.3 : 1,
                y: hasExpandedItem ? -20 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`flex flex-wrap justify-center gap-2 p-2 rounded-2xl ${theme.navBackground}`}>
                <motion.button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 ${
                    selectedCategory === 'all' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-300/20`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="mr-1 bx bx-grid-alt"></i>
                  All
                </motion.button>

                {projectCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 ${
                      selectedCategory === category ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-300/20`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i
                      className={`bx ${
                        category === 'Web Development'
                          ? 'bx-code-alt'
                          : category === 'Machine Learning'
                          ? 'bx-brain'
                          : category === 'Mobile Development'
                          ? 'bx-mobile'
                          : category === 'Data'
                          ? 'bx-data'
                          : 'bx-folder'
                      } mr-1`}
                    ></i>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className={`transition-all duration-300 ${hasExpandedItem ? 'mb-2' : 'mb-6'} ${hasExpandedItem ? 'min-h-[200px]' : 'min-h-[350px]'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${selectedCategory}`}
                className={`grid gap-4 transition-all duration-300 ${hasExpandedItem ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} ${theme.textPrimary}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {currentItems.length === 0 ? (
                  <motion.div variants={cardVariants} className="flex flex-col items-center justify-center py-12 col-span-full">
                    <i className={`bx bx-folder-open text-6xl ${theme.textSecondary} mb-4`}></i>
                    <p className={`text-lg ${theme.textSecondary} text-center`}>No projects found in "{selectedCategory}" category</p>
                    <motion.button
                      onClick={() => handleCategoryChange('all')}
                      className={`mt-4 px-4 py-2 rounded-lg ${theme.buttonAccent} ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300 ${theme.textPrimary}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Show All Projects
                    </motion.button>
                  </motion.div>
                ) : (
                  currentItems.map((item) => {
                    const isExpanded = expandedItems[item.id];
                    const isOtherExpanded = hasExpandedItem && !isExpanded;

                    return (
                      <motion.div
                        key={`${activeTab}-${selectedCategory}-${item.id}`}
                        variants={cardVariants}
                        className={`p-2 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200/50'} ${
                          theme.textPrimary
                        }`}
                        animate={{
                          scale: isOtherExpanded ? 0.85 : 1,
                          opacity: isOtherExpanded ? 0.3 : 1,
                          y: isOtherExpanded ? -10 : 0,
                        }}
                        style={{
                          display: isOtherExpanded ? 'none' : 'block',
                        }}
                      >
                        {/* Header - Always visible */}
                        <div
                          className="flex flex-col transition-all duration-200 rounded-lg cursor-pointer sm:flex-row sm:items-center sm:justify-between sm:p-4 group hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-pink-500/5"
                          onClick={() => toggleExpanded(item.id)}
                        >
                          {/* Main Content */}
                          <div className="flex items-center flex-1 min-w-0 gap-3 sm:gap-4">
                            {/* Icon/Logo Container */}
                            <div className="flex-shrink-0 p-2 rounded-lg sm:p-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20">
                              {activeTab === 'education' && item.logo ? (
                                <img src={item.logo} alt="Institution Logo" className="object-contain w-6 h-6 sm:w-8 sm:h-8" />
                              ) : (
                                <i className={`bx ${item.icon} text-base sm:text-lg ${theme.textPrimary}`}></i>
                              )}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} truncate`}>{item.title}</h3>
                              <p className={`text-xs sm:text-sm ${theme.textSecondary} truncate mt-0.5`}>
                                {activeTab === 'education' ? item.institution : activeTab === 'work' ? item.company : item.period}
                              </p>
                              {/* Show category for projects */}
                              {activeTab === 'projects' && <p className={`text-xs ${theme.textSecondary} opacity-75 mt-0.5`}>{item.category}</p>}
                            </div>
                          </div>

                          {/* Status Badge and Chevron */}
                          <div className="flex items-center justify-between flex-shrink-0 mt-2 sm:justify-end sm:mt-0 sm:ml-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10 whitespace-nowrap`}>
                              {activeTab === 'education' ? item.period : activeTab === 'projects' ? item.status : item.type}
                            </span>

                            {/* Chevron with Animation */}
                            <motion.div
                              animate={{ rotate: expandedItems[item.id] ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className={`${theme.textSecondary} group-hover:${theme.textPrimary} transition-colors duration-200 ml-2 sm:ml-3 flex-shrink-0`}
                            >
                              <i className="text-sm bx bx-chevron-down sm:text-base"></i>
                            </motion.div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedItems[item.id] && (
                            <motion.div variants={expandVariants} initial="hidden" animate="visible" exit="hidden" className="overflow-hidden">
                              <div className="pt-4 space-y-3">
                                <p className={`text-sm ${theme.textSecondary}`}>{item.description}</p>

                                {/* Education Details */}
                                {activeTab === 'education' && (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <span className={`text-sm font-medium ${theme.textPrimary}`}>{item.grade}</span>
                                      <div className="flex flex-wrap gap-1">
                                        {item.achievements.map((achievement, i) => (
                                          <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10`}>
                                            {achievement}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/20">
                                      {item.website && (
                                        <motion.a
                                          href={item.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-globe"></i>
                                          Website
                                        </motion.a>
                                      )}
                                      {item.programLink && (
                                        <motion.a
                                          href={item.programLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-book-open"></i>
                                          Program
                                        </motion.a>
                                      )}
                                      {item.courses &&
                                        item.courses.map((course, i) => (
                                          <motion.a
                                            key={i}
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleExternalLinkClick}
                                            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                            whileHover={{ scale: 1.05 }}
                                          >
                                            <i className="bx bx-link-external"></i>
                                            {course.name}
                                          </motion.a>
                                        ))}
                                    </div>
                                  </>
                                )}

                                {/* Projects Details */}
                                {activeTab === 'projects' && (
                                  <>
                                    <div className="flex flex-wrap gap-2">
                                      {item.tech.map((tech, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10`}>
                                          {tech}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                      {item.features.map((feature, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textSecondary} bg-gradient-to-r from-gray-500/10 to-gray-500/10`}>
                                          {feature}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/20">
                                      {item.githubLink && (
                                        <motion.a
                                          href={item.githubLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-code"></i>
                                          Source Code
                                        </motion.a>
                                      )}
                                      {item.liveLink && (
                                        <motion.a
                                          href={item.liveLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-link-external"></i>
                                          Live Demo
                                        </motion.a>
                                      )}
                                    </div>
                                  </>
                                )}

                                {/* Work Details */}
                                {activeTab === 'work' && (
                                  <>
                                    <div className="flex items-center justify-between text-sm">
                                      <span className={`${theme.textSecondary}`}>{item.period}</span>
                                      <span className={`${theme.textSecondary}`}>{item.location}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                      {item.responsibilities.map((resp, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme.textPrimary} bg-gradient-to-r from-orange-500/10 to-pink-500/10`}>
                                          {resp}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/20">
                                      {item.companyWebsite && (
                                        <motion.a
                                          href={item.companyWebsite}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-globe"></i>
                                          Company
                                        </motion.a>
                                      )}
                                      {item.companyLinkedIn && (
                                        <motion.a
                                          href={item.companyLinkedIn}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                          LinkedIn
                                        </motion.a>
                                      )}
                                      {item.portfolioLink && (
                                        <motion.a
                                          href={item.portfolioLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleExternalLinkClick}
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-palette"></i>
                                          Portfolio
                                        </motion.a>
                                      )}
                                      {item.certificate && (
                                        <motion.a
                                          href={item.certificate}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${theme.textPrimary} hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <i className="bx bx-certificate"></i>
                                          Certificate
                                        </motion.a>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Circular Pagination - Same as Certificate page */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center px-4 mt-4 sm:mt-6"
              style={{
                display: hasExpandedItem ? 'none' : 'flex',
              }}
            >
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
                <div className="flex space-x-1 sm:space-x-2 ${theme.textPrimary}">
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
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-sm font-medium transition-all ${theme.textPrimary} ${
                          index === currentPage ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : `${theme.buttonAccent} ${theme.border} hover:bg-gray-300`
                        }`}
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
        </motion.div>
      </main>
    </ClickSpark>
  );
};

export default Experience;
