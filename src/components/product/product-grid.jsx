import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FilterX, Sparkles } from 'lucide-react';
import ProductCard from './product-card.jsx';
import { ProductCardSkeleton } from '../ui/skeleton.jsx';

const ProductGrid = ({
  products,
  loading = false,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  searchQuery = '',
  filterCount = 0
}) => {
  // Enhanced skeleton with premium design
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );

  // Enhanced empty state
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 lg:py-24"
    >
      <div className="relative inline-block mb-6">
        <div className="text-8xl mb-4">🔍</div>
        <div className="absolute -top-2 -right-2">
          <Sparkles size={24} className="text-amber-400 animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {searchQuery ? 'No matching products' : 'No products found'}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto mb-8 leading-relaxed">
        {searchQuery 
          ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search terms.`
          : filterCount > 0
          ? 'No products match your current filters. Try adjusting your criteria.'
          : 'Explore our amazing collection by browsing different categories.'
        }
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {searchQuery && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            <Search size={20} />
            Clear Search
          </motion.button>
        )}
        
        {filterCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            <FilterX size={20} />
            Clear Filters ({filterCount})
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
          onClick={() => window.location.href = '/'}
        >
          Browse All Products
        </motion.button>
      </div>
    </motion.div>
  );

  // Product grid with enhanced animations
  const ProductGridContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 lg:mb-8"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h2>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <Search size={16} />
            <span className="text-sm">Search: "{searchQuery}"</span>
          </motion.div>
        )}
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -5 }}
              layout
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Indicator (optional) */}
      {products.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <span>Showing {products.length} amazing products</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  if (loading) {
    return <SkeletonGrid />;
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return <ProductGridContent />;
};

export default ProductGrid;