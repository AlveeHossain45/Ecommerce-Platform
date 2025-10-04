import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, X, ShoppingCart, Plus, Minus, Shield, Truck, Zap, Check } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';

const QuickView = ({ product, isOpen, onClose, onAddToWishlist }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedImage(0);
      setAddedToCart(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const images = product.images || [product.image];
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 flex items-center justify-center"
          >
            <div 
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {product.name}
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
                </motion.button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    {/* Main Image */}
                    <motion.div 
                      className="relative aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        key={selectedImage}
                        src={images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {discount > 0 && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                          >
                            -{discount}% OFF
                          </motion.span>
                        )}
                        {product.isPremium && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1"
                          >
                            <Zap size={12} className="fill-current" />
                            Premium
                          </motion.span>
                        )}
                      </div>
                    </motion.div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                              selectedImage === index
                                ? 'border-blue-500 shadow-lg shadow-blue-500/25'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        ({product.reviewCount?.toLocaleString()} reviews)
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Truck size={18} className="text-green-500" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Shield size={18} className="text-blue-500" />
                        <span>2-year warranty included</span>
                      </div>
                      {product.inStock && (
                        <div className="flex items-center gap-3 text-sm text-green-600 dark:text-green-400">
                          <Check size={18} />
                          <span>In stock - Ready to ship</span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-2xl text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Quantity & Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-900 dark:text-white">Quantity:</span>
                        <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                          <motion.button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus size={18} />
                          </motion.button>
                          <span className="px-6 py-3 text-lg font-semibold min-w-12 text-center">
                            {quantity}
                          </span>
                          <motion.button
                            onClick={() => setQuantity(q => q + 1)}
                            className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus size={18} />
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <motion.button
                          onClick={handleAddToCart}
                          className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                            addedToCart
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {addedToCart ? (
                            <>
                              <Check size={24} />
                              Added to Cart!
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={24} />
                              Add to Cart - ${(product.price * quantity).toFixed(2)}
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          onClick={handleWishlist}
                          className={`p-4 border-2 rounded-2xl transition-all duration-300 ${
                            isWishlisted
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500'
                              : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 text-gray-600 dark:text-gray-400 hover:text-red-500'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart 
                            size={24} 
                            className={isWishlisted ? 'fill-current' : ''} 
                          />
                        </motion.button>
                      </div>
                    </div>

                    {/* Success Message */}
                    <AnimatePresence>
                      {addedToCart && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <Check size={20} className="text-green-600 dark:text-green-400" />
                            <span className="text-green-800 dark:text-green-300 font-medium">
                              Successfully added to cart! Continue shopping or proceed to checkout.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickView;