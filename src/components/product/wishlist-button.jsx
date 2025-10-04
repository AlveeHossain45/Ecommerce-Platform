import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const WishlistButton = ({ productId, className, size = 'md', product, showLabel = false }) => {
  const { isAuthenticated, user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-base'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Check initial wishlist status
  useEffect(() => {
    // Simulate checking if product is in wishlist
    const checkWishlistStatus = async () => {
      // In a real app, you would fetch this from your API
      const mockWishlistStatus = Math.random() > 0.7; // 30% chance of being in wishlist
      setIsInWishlist(mockWishlistStatus);
    };
    
    checkWishlistStatus();
  }, [productId]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newWishlistStatus = !isInWishlist;
      setIsInWishlist(newWishlistStatus);
      
      if (newWishlistStatus) {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
      }

      // In a real app, you would call your API here
      console.log(`${newWishlistStatus ? 'Added to' : 'Removed from'} wishlist:`, productId);

    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Loader2 size={iconSizes[size]} className="animate-spin" />
        </motion.div>
      );
    }

    if (justAdded) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="text-green-500"
        >
          <Check size={iconSizes[size]} />
        </motion.div>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          size={iconSizes[size]}
          className={clsx(
            'transition-all duration-300',
            isInWishlist 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400'
          )}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative inline-flex">
      <motion.button
        onClick={handleWishlistToggle}
        disabled={isLoading}
        className={clsx(
          'group relative flex items-center justify-center rounded-2xl border-2 transition-all duration-300',
          'hover:scale-105 focus:outline-none focus:ring-3 focus:ring-primary-500/50 focus:ring-offset-2',
          'backdrop-blur-sm shadow-lg hover:shadow-xl transform-gpu',
          isInWishlist
            ? [
                'bg-gradient-to-br from-red-50 to-pink-50 border-red-200',
                'dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-700/50',
                'shadow-red-500/25 hover:shadow-red-500/40'
              ]
            : [
                'bg-white/80 border-gray-200/80',
                'dark:bg-gray-800/80 dark:border-gray-600/80',
                'hover:border-red-300 dark:hover:border-red-500/50',
                'shadow-gray-500/10 hover:shadow-red-500/20'
              ],
          sizeClasses[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Premium shimmer effect */}
        {!isInWishlist && (
          <div className={clsx(
            'absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/50 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            'dark:via-gray-700/50'
          )} />
        )}

        {/* Animated background for wishlisted state */}
        {isInWishlist && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10"
          />
        )}

        {/* Main icon/content */}
        <div className="relative z-10">
          {getButtonContent()}
        </div>

        {/* Premium badge for premium products */}
        {product?.isPremium && !isInWishlist && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-1 -right-1"
          >
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1 shadow-lg">
              <Sparkles size={size === 'sm' ? 8 : 10} className="text-white" />
            </div>
          </motion.div>
        )}

        {/* Pulse animation when just added */}
        {justAdded && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-2xl bg-green-500/20"
          />
        )}
      </motion.button>

      {/* Label for larger buttons */}
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={clsx(
            'ml-3 font-medium transition-colors duration-300',
            isInWishlist 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-600 dark:text-gray-400',
            labelSizes[size]
          )}
        >
          {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </motion.span>
      )}

      {/* Authentication Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" />
                Sign in to save items
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white text-sm px-3 py-2 rounded-xl shadow-2xl flex items-center gap-2">
              <Check size={14} />
              Added to wishlist!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishlistButton;