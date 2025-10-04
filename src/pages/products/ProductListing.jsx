import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/product/product-card.jsx';
import QuickView from '../../components/product/quick-view.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { Filter, Grid, List, Search, SlidersHorizontal, Sparkles, TrendingUp, Crown, Zap, Star, Award, Shield, Clock, Truck, RotateCcw } from 'lucide-react';
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
    { value: 'all', label: 'All Categories', icon: Sparkles },
    { value: 'electronics', label: 'Electronics', icon: Zap },
    { value: 'fashion', label: 'Fashion', icon: Crown },
    { value: 'beauty', label: 'Beauty & Wellness', icon: Star },
    { value: 'home', label: 'Home & Living', icon: Award },
    { value: 'sports', label: 'Sports & Fitness', icon: TrendingUp },
    { value: 'lifestyle', label: 'Lifestyle', icon: Sparkles }
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Dyson', 'Bose', 'Rolex', 'Gucci', 'Lululemon', 'Tesla'];

  const premiumFeatures = [
    { icon: Truck, text: 'Free Express Shipping', color: 'text-blue-600' },
    { icon: Shield, text: '2-Year Warranty', color: 'text-green-600' },
    { icon: RotateCcw, text: '30-Day Returns', color: 'text-purple-600' },
    { icon: Clock, text: '24/7 Support', color: 'text-orange-600' }
  ];

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
    return filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'featured') return b.featured - a.featured;
      return a.name.localeCompare(b.name);
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

  const maxPrice = Math.max(...mockProducts.map(p => p.price));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
                <Sparkles className="text-blue-600" size={20} />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premium Collection</span>
              </div>
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Curated Excellence
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Discover meticulously selected products that redefine quality, design, and performance. 
                Each item is chosen for its exceptional craftsmanship and premium experience.
              </p>
            </div>

            {/* Premium Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <feature.icon className={`mx-auto mb-3 ${feature.color}`} size={32} />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Advanced Controls */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search premium products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium placeholder-gray-400"
                />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-inner">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-600 shadow-lg text-blue-600 transform scale-105'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid size={22} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-600 shadow-lg text-blue-600 transform scale-105'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <List size={22} />
                  </button>
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 font-semibold ${
                    showFilters
                      ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 shadow-lg'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg'
                  }`}
                >
                  <SlidersHorizontal size={22} />
                  <span>Filters</span>
                </button>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold text-gray-700 dark:text-gray-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgOUwxMiAxNUwxOCA5IiBzdHJva2U9IiAjdjE4NzZmNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-no-repeat bg-right-4 bg-center bg-[length:24px] pr-12"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 mt-8 pb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 whitespace-nowrap font-semibold ${
                      selectedCategory === category.value
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg'
                    }`}
                  >
                    <Icon size={20} />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
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
                        className="w-full h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-lg"
                      />
                      <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span>$0</span>
                        <span>${maxPrice}+</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brand Filter */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      Premium Brands
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto">
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                            selectedBrands.includes(brand)
                              ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800'
                              : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            selectedBrands.includes(brand)
                              ? 'bg-blue-500 border-blue-500'
                              : 'bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-500'
                          }`} />
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      Customer Rating
                    </label>
                    <div className="space-y-3">
                      {[4, 3, 2, 1].map((rating) => (
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
                            {rating}+ Stars
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {selectedBrands.length} brands selected • {ratingFilter > 0 ? `${ratingFilter}+ stars` : 'Any rating'}
                  </span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setSelectedBrands([]);
                        setRatingFilter(0);
                        setPriceRange([0, maxPrice]);
                      }}
                      className="px-8 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Reset All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Curated Selection
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Discover <span className="font-semibold text-blue-600">{filteredAndSortedProducts.length}</span> exceptional products matching your criteria
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Filter size={20} className="text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Premium Filtered</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`gap-8 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
              : 'flex flex-col space-y-6'
          }`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onQuickView={handleQuickView}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full flex items-center justify-center">
                  <Search size={48} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Premium Products Found</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                We couldn't find any products matching your current filters. Try adjusting your criteria to discover our premium collection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  setPriceRange([0, maxPrice]);
                  setSelectedBrands([]);
                  setRatingFilter(0);
                }}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Section */}
          {filteredAndSortedProducts.length > 0 && (
            <div className="text-center mt-16">
              <button className="px-12 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                Load More Excellence
              </button>
            </div>
          )}
        </div>
      </div>
      
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