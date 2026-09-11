import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  TrendingUp, 
  Crown, 
  Zap, 
  Star, 
  Award, 
  Shield, 
  Clock, 
  Truck, 
  RotateCcw,
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import ProductCard from '../../components/product/product-card.jsx';
import QuickView from '../../components/product/quick-view.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';

const ProductListing = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const { addToCart } = useCartContext();

  const categories = [
    { value: 'all', label: 'All Categories', icon: Sparkles, gradient: 'from-blue-500 to-purple-500' },
    { value: 'electronics', label: 'Electronics', icon: Zap, gradient: 'from-blue-500 to-cyan-500' },
    { value: 'fashion', label: 'Fashion', icon: Crown, gradient: 'from-pink-500 to-rose-500' },
    { value: 'beauty', label: 'Beauty', icon: Star, gradient: 'from-purple-500 to-fuchsia-500' },
    { value: 'home', label: 'Home & Living', icon: Award, gradient: 'from-emerald-500 to-teal-500' },
    { value: 'sports', label: 'Sports & Fitness', icon: TrendingUp, gradient: 'from-orange-500 to-red-500' },
    { value: 'lifestyle', label: 'Lifestyle', icon: Sparkles, gradient: 'from-amber-500 to-yellow-500' }
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Dyson', 'Bose', 'Rolex', 'Gucci', 'Lululemon', 'Tesla'];

  const premiumFeatures = [
    { icon: Truck, text: 'Free Express Shipping', color: 'text-blue-600 dark:text-blue-400', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Shield, text: '2-Year Warranty', color: 'text-green-600 dark:text-green-400', gradient: 'from-green-500 to-emerald-500' },
    { icon: RotateCcw, text: '30-Day Returns', color: 'text-purple-600 dark:text-purple-400', gradient: 'from-purple-500 to-pink-500' },
    { icon: Clock, text: '24/7 Support', color: 'text-orange-600 dark:text-orange-400', gradient: 'from-orange-500 to-red-500' }
  ];

  const maxPrice = Math.max(...mockProducts.map(p => p.price), 5000);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Price range filter
    filtered = filtered.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter((product) => product.rating >= ratingFilter);
    }

    // Sorting
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': 
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'featured': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [selectedCategory, sortBy, searchTerm, priceRange, selectedBrands, ratingFilter]);

  const handleAddToCart = (product) => addToCart(product);
  const handleAddToWishlist = (product) => console.log('Added to wishlist:', product);
  
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };
  
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    setRatingFilter(0);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    searchTerm !== '' || 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice || 
    selectedBrands.length > 0 || 
    ratingFilter > 0;

  const activeFilterCount = [
    selectedCategory !== 'all',
    searchTerm !== '',
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    selectedBrands.length > 0,
    ratingFilter > 0
  ].filter(Boolean).length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
        
        {/* Premium Header */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
          {/* Background Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
                <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Premium Collection
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
                Curated Excellence
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
                Discover meticulously selected products that redefine quality, design, and performance. 
                Each item is chosen for its exceptional craftsmanship and premium experience.
              </p>
            </motion.div>

            {/* Premium Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto mt-12">
              {premiumFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          
          {/* Advanced Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8 mb-12"
          >
            {/* Top Row: Search + View + Sort */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between mb-6">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search premium products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-base placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-600 shadow-lg text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-600 shadow-lg text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all duration-300 font-semibold ${
                    showFilters || hasActiveFilters
                      ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <SlidersHorizontal size={18} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">Alphabetical</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-2 px-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.value;
                return (
                  <motion.button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all duration-300 whitespace-nowrap font-semibold flex-shrink-0 ${
                      isActive
                        ? `bg-gradient-to-r ${category.gradient} border-transparent text-white shadow-lg`
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{category.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      
                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                          Price Range
                        </label>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                              ${priceRange[0]}
                            </span>
                            <span className="text-gray-400">—</span>
                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                              ${priceRange[1]}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span>$0</span>
                            <span>${maxPrice}+</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Brand Filter */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                          Premium Brands
                        </label>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
                          {brands.map((brand) => {
                            const isSelected = selectedBrands.includes(brand);
                            return (
                              <motion.button
                                key={brand}
                                onClick={() => toggleBrand(brand)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all duration-300 text-xs font-medium ${
                                  isSelected
                                    ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800'
                                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                                }`}
                              >
                                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-500'
                                }`}>
                                  {isSelected && <Check size={8} className="text-white" />}
                                </div>
                                <span className="truncate">{brand}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                          Customer Rating
                        </label>
                        <div className="space-y-2">
                          {[4, 3, 2].map((rating) => {
                            const isSelected = ratingFilter === rating;
                            return (
                              <motion.button
                                key={rating}
                                onClick={() => setRatingFilter(isSelected ? 0 : rating)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={16}
                                      className={i < rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}
                                    />
                                  ))}
                                </div>
                                <span className={`font-medium text-sm ${
                                  isSelected ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                  {rating}+ Stars
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                      </span>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={clearAllFilters}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors duration-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Reset All
                        </motion.button>
                        <motion.button
                          onClick={() => setShowFilters(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Apply Filters
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Curated Selection
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {filteredAndSortedProducts.length}
                </span>{' '}
                exceptional products matching your criteria
              </p>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <X size={16} />
                Clear All Filters
              </button>
            )}
          </motion.div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className={`gap-6 lg:gap-8 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                : 'flex flex-col'
            }`}>
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    onQuickView={handleQuickView}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full flex items-center justify-center">
                  <Search size={48} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Premium Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                We couldn't find any products matching your current filters. 
                Try adjusting your criteria to discover our premium collection.
              </p>
              <motion.button
                onClick={clearAllFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          )}

          {/* Load More */}
          {filteredAndSortedProducts.length > 0 && (
            <div className="text-center mt-16">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg"
              >
                Load More Excellence
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick View Modal */}
      <QuickView 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToWishlist={handleAddToWishlist}
      />
    </>
  );
};

export default ProductListing;