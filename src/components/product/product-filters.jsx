import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const ProductFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: Infinity }
  ];

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="lg:hidden btn-secondary flex items-center gap-2">
        <Filter size={20} />
        Filters
      </button>

      <div className={`fixed lg:static inset-0 z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="w-80 h-full lg:w-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
            <div className="flex items-center gap-2">
              <button onClick={clearFilters} className="text-sm text-primary-500 hover:text-primary-600">Clear All</button>
              <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X size={20} /></button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input type="checkbox" checked={filters.category?.includes(category) || false} onChange={(e) => { const newCategories = e.target.checked ? [...(filters.category || []), category] : (filters.category || []).filter(c => c !== category); handleFilterChange({ category: newCategories }); }} className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Other filters like Price, Rating can be added here */}

        </div>
      </div>
      {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default ProductFilters;