import React, { useState } from 'react';
import { Filter, X, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Beauty & Care', 'Sports & Fitness', 'Premium Collection'];
  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25, icon: '💎' },
    { label: '$25 - $50', min: 25, max: 50, icon: '✨' },
    { label: '$50 - $100', min: 50, max: 100, icon: '⭐' },
    { label: '$100 - $200', min: 100, max: 200, icon: '🔥' },
    { label: 'Premium $200+', min: 200, max: Infinity, icon: '👑' }
  ];

  const ratings = [
    { stars: 5, label: '5 Stars & Up', count: 1243 },
    { stars: 4, label: '4 Stars & Up', count: 856 },
    { stars: 3, label: '3 Stars & Up', count: 432 },
    { stars: 2, label: '2 Stars & Up', count: 187 }
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Premium Brands'];

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setActiveFilter(null);
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => 
      value && (Array.isArray(value) ? value.length > 0 : value !== '')
    ).length;
  };

  const FilterSection = ({ title, children, icon }) => (
    <motion.div 
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{title}</h4>
      </div>
      {children}
    </motion.div>
  );

  return (
    <>
      {/* Mobile Filter Trigger */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <SlidersHorizontal size={20} />
        Filters
        {getActiveFilterCount() > 0 && (
          <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full min-w-6">
            {getActiveFilterCount()}
          </span>
        )}
      </motion.button>

      {/* Desktop Filter Trigger */}
      <div className="hidden lg:flex items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={24} className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h3>
        </div>
        {getActiveFilterCount() > 0 && (
          <motion.button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <RotateCcw size={16} />
            Clear ({getActiveFilterCount()})
          </motion.button>
        )}
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className={`fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-96 h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 lg:border-0 overflow-y-auto`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6 lg:p-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <SlidersHorizontal size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getActiveFilterCount()} active filters
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <RotateCcw size={16} />
                      Clear
                    </motion.button>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <FilterSection title="Categories" icon={<Sparkles size={20} className="text-purple-500" />}>
                  <div className="grid gap-2">
                    {categories.map((category, index) => (
                      <motion.label
                        key={category}
                        className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          filters.category?.includes(category)
                            ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                            : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.category?.includes(category) || false}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...(filters.category || []), category]
                              : (filters.category || []).filter(c => c !== category);
                            handleFilterChange({ category: newCategories });
                          }}
                          className="rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range" icon={<span className="text-lg">💎</span>}>
                  <div className="space-y-3">
                    {priceRanges.map((range, index) => (
                      <motion.label
                        key={range.label}
                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          filters.priceRange?.min === range.min
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700'
                            : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{range.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{range.label}</div>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange?.min === range.min}
                          onChange={() => handleFilterChange({ priceRange: range })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                      </motion.label>
                    ))}
                  </div>
                </FilterSection>

                {/* Rating */}
                <FilterSection title="Customer Rating" icon={<span className="text-lg">⭐</span>}>
                  <div className="space-y-3">
                    {ratings.map((rating, index) => (
                      <motion.label
                        key={rating.stars}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          filters.rating === rating.stars
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700'
                            : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < rating.stars
                                    ? 'text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {rating.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {rating.count.toLocaleString()}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilters;