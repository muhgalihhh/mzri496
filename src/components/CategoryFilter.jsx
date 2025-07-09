import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, hasExpandedItem, filteredDataLength }) => {
  const { theme } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsFilterOpen(false); // Close filter on mobile after selection
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return 'bx-code-alt';
      case 'Machine Learning':
        return 'bx-brain';
      case 'Mobile Development':
        return 'bx-mobile';
      case 'Data':
        return 'bx-data';
      default:
        return 'bx-folder';
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center mb-6"
      animate={{
        scale: hasExpandedItem ? 0.8 : 1,
        opacity: hasExpandedItem ? 0.3 : 1,
        y: hasExpandedItem ? -20 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile Filter Toggle Button */}
      <div className="block mb-4 sm:hidden">
        <motion.button
          onClick={toggleFilter}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
            isFilterOpen ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.navBackground} ${theme.textSecondary} hover:${theme.textPrimary}`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bx bx-filter text-base"></i>
          <span>Filter Projects</span>
          <motion.i className="bx bx-chevron-down text-base" animate={{ rotate: isFilterOpen ? 180 : 0 }} transition={{ duration: 0.3 }} />
        </motion.button>
      </div>

      {/* Filter Options */}
      <div className="w-full max-w-4xl">
        {/* Desktop Version - Always visible */}
        <div className={`hidden sm:flex justify-center`}>
          <div className={`flex flex-wrap justify-center gap-2 p-2 rounded-2xl ${theme.navBackground}`}>
            <motion.button
              onClick={() => handleCategorySelect('all')}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 ${
                selectedCategory === 'all' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-300/20`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bx bx-grid-alt mr-1"></i>
              All Projects
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 ${
                  selectedCategory === category ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-300/20`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`bx ${getCategoryIcon(category)} mr-1`}></i>
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Version - Collapsible */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`sm:hidden overflow-hidden`}
            >
              <div className={`p-3 rounded-2xl ${theme.navBackground} mx-4`}>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    onClick={() => handleCategorySelect('all')}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
                      selectedCategory === 'all' ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-300/20`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className="bx bx-grid-alt"></i>
                    <span>All</span>
                  </motion.button>

                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
                        selectedCategory === category ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : `${theme.textSecondary} hover:${theme.textPrimary} hover:bg-gray-300/20`
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className={`bx ${getCategoryIcon(category)}`}></i>
                      <span className="truncate">{category.replace(' Development', '')}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Info */}
      {selectedCategory !== 'all' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex justify-center mt-3">
          <div className={`px-4 py-2 rounded-lg ${theme.navBackground}`}>
            <span className={`text-sm ${theme.textSecondary}`}>
              <i className="bx bx-search mr-1"></i>
              {filteredDataLength} project{filteredDataLength !== 1 ? 's' : ''} in "{selectedCategory}"
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryFilter;
