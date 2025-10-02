import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import ProductGrid from '../../components/product/product-grid.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';

const CategoryView = () => {
  const { category } = useParams();
  const { addToCart } = useCartContext();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const brands = [...new Set(mockProducts.map(p => p.brand))];
  const categories = [...new Set(mockProducts.map(p => p.category))];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = mockProducts.filter(
        p => p.category.toLowerCase() === category?.toLowerCase()
      );
      setCategoryProducts(filtered);
      setFilteredProducts(filtered);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [category]);

  useEffect(() => {
    let products = [...categoryProducts];

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // featured - default order
        break;
    }

    // Apply price filter
    products = products.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand));
    }

    setFilteredProducts(products);
  }, [categoryProducts, sortBy, priceRange, selectedBrands]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show success notification
    console.log('Added to cart:', product.name);
  };

  const handleAddToWishlist = (product) => {
    console.log('Wishlist:', product);
    // Add wishlist logic here
  };

  const handleQuickView = (product) => {
    console.log('Quick View:', product);
    // Implement quick view modal
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const categoryStats = {
    totalProducts: categoryProducts.length,
    avgRating: categoryProducts.reduce((acc, p) => acc + p.rating, 0) / categoryProducts.length,
    minPrice: Math.min(...categoryProducts.map(p => p.price)),
    maxPrice: Math.max(...categoryProducts.map(p => p.price))
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Category Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <ChevronDown className="w-4 h-4 rotate-270" />
                <Link to="/products" className="hover:text-blue-600">Products</Link>
                <ChevronDown className="w-4 h-4 rotate-270" />
                <span className="text-gray-900 dark:text-white capitalize">{category}</span>
              </nav>
              
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
                  {category}
                </h1>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {categoryProducts.length} items
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                Discover our premium collection of {category} products. 
                Curated quality with exceptional value.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {categoryStats.avgRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Avg Rating</p>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 dark:text-white">
                  ${categoryStats.minPrice} - ${categoryStats.maxPrice}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Price Range</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 dark:text-gray-300">Premium Quality</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RefreshCw className="w-5 h-5 text-orange-600" />
              <span className="text-gray-700 dark:text-gray-300">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Brands</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <Link
                      key={cat}
                      to={`/category/${cat.toLowerCase()}`}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        cat.toLowerCase() === category?.toLowerCase()
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {filteredProducts.length} of {categoryProducts.length} products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode */}
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm' 
                          : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list' 
                          ? 'bg-white dark:bg-gray-600 shadow-sm' 
                          : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products */}
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={handleQuickView}
              viewMode={viewMode}
            />

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedBrands([]);
                    setSortBy('featured');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;