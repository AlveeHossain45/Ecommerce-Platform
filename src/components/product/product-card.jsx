import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <motion.div
      className="card group relative overflow-hidden flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-700"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Premium Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {discount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            -{discount}%
          </motion.span>
        )}
        {product.isPremium && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
          >
            <Zap size={10} className="fill-current" />
            Premium
          </motion.span>
        )}
        {product.fastShipping && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
          >
            <Shield size={10} />
            Fast Ship
          </motion.span>
        )}
      </div>

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </Link>

        {/* Wishlist Button */}
        <motion.button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={18} 
            className={`transition-all duration-300 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
            }`}
          />
        </motion.button>

        {/* Quick View Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center"
            >
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={() => onQuickView?.(product)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Eye size={16} />
                Quick View
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category */}
        {product.category && (
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight text-lg">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
          Add to Cart
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;