import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/product/product-grid.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Tag, 
  X, 
  Star 
} from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCartContext();

  const categories = ['electronics', 'fashion', 'beauty', 'home', 'sports', 'lifestyle'];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.brand?.toLowerCase().includes(query.toLowerCase())
    );

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(p => p.rating >= ratingFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return filtered;
    }
  }, [query, sortBy, priceRange, selectedCategories, ratingFilter]);

  const handleAddToCart = (product) => addToCart(product);
  const handleAddToWishlist = (product) => console.log('Wishlist:', product);
  const handleQuickView = (product) => console.log('Quick View:', product);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setRatingFilter(0);
    setSortBy('relevance');
  };

  const maxPrice = Math.max(...mockProducts.map(p => p.price));
  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < maxPrice || selectedCategories.length > 0 || ratingFilter > 0;

  const searchSuggestions = [
    "Try different keywords",
    "Check spelling",
    "Browse categories",
    "Explore featured products"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <Search className="text-blue-600" size={20} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search Results</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            "{query}"
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We found {filteredProducts.length} premium product{filteredProducts.length !== 1 ? 's' : ''} for you
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Results Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3">
                  <Search className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredProducts.length}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Premium Results</p>
                </div>
              </div>
              
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <span key={cat} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        {cat}
                        <button onClick={() => toggleCategory(cat)} className="hover:text-blue-900">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {ratingFilter > 0 && (
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        {ratingFilter}+ Stars
                        <button onClick={() => setRatingFilter(0)} className="hover:text-yellow-900">
                          <X size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 font-semibold ${
                  showFilters || hasActiveFilters
                    ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg'
                }`}
              >
                <SlidersHorizontal size={20} />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedCategories.length + (ratingFilter > 0 ? 1 : 0)}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold text-gray-700 dark:text-gray-300"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <X size={18} />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Price Range */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Price Range: <span className="text-blue-600">${priceRange[0]}</span> - <span className="text-blue-600">${priceRange[1]}</span>
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full appearance-none"
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                      <span>$0</span>
                      <span>${maxPrice}+</span>
                    </div>
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Categories
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                          selectedCategories.includes(category)
                            ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800'
                            : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          selectedCategories.includes(category)
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-500'
                        }`} />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Minimum Rating
                  </label>
                  <div className="space-y-3">
                    {[4, 3, 2].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                          ratingFilter === rating
                            ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={i < rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}
                            />
                          ))}
                        </div>
                        <span className={`font-medium ${
                          ratingFilter === rating ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {rating}+ Stars & Up
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {filteredProducts.length > 0 ? (
          <div className="mb-12">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={handleQuickView}
            />
          </div>
        ) : (
          /* Enhanced Empty State */
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full flex items-center justify-center">
                  <Search size={48} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Premium Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                We couldn't find any results for <span className="font-semibold text-blue-600">"{query}"</span>. 
                Try adjusting your search or explore our suggestions below.
              </p>

              {/* Search Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {searchSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-left">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{suggestion}</p>
                  </div>
                ))}
              </div>

              {/* Alternative Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/products"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Browse All Products
                </Link>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300"
                >
                  Clear Search Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Tips */}
        {filteredProducts.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <Sparkles className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Search Tips</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Try using more specific keywords or browse by category. Our premium collection is constantly updated with new arrivals.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;