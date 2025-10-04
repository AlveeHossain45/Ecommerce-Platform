import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Crown, Zap } from 'lucide-react';

export const ProductVariants = ({ 
  variants, 
  selectedVariant, 
  onVariantSelect 
}) => {
  if (!variants || variants.length === 0) return null;

  const getVariantStyle = (variantType, option, isSelected, isAvailable) => {
    const baseStyles = `
      relative px-4 py-3 border-2 rounded-xl text-sm font-semibold transition-all duration-300
      group overflow-hidden backdrop-blur-sm
    `;

    const selectedStyles = `
      border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 
      dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300
      shadow-lg shadow-blue-500/25
    `;

    const availableStyles = `
      border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80
      text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500
      hover:shadow-md hover:scale-105 hover:bg-white dark:hover:bg-gray-700/80
    `;

    const unavailableStyles = `
      border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50
      text-gray-400 dark:text-gray-600 cursor-not-allowed grayscale
    `;

    const premiumStyles = option.isPremium ? `
      ring-1 ring-amber-300/50 dark:ring-amber-400/30
      bg-gradient-to-br from-amber-50/50 to-yellow-50/50 
      dark:from-amber-900/10 dark:to-yellow-900/10
    ` : '';

    return `
      ${baseStyles}
      ${isSelected ? selectedStyles : ''}
      ${!isSelected && isAvailable ? availableStyles : ''}
      ${!isAvailable ? unavailableStyles : ''}
      ${premiumStyles}
    `;
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {variants.map((variantType, variantIndex) => (
        <motion.div 
          key={variantType.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: variantIndex * 0.1 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
              {variantType.name}
              {variantType.isPremium && (
                <motion.span 
                  className="flex items-center gap-1 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Crown size={12} />
                  Premium
                </motion.span>
              )}
            </h4>
            
            {/* Selection Indicator */}
            <AnimatePresence>
              {selectedVariant?.[variantType.name] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium"
                >
                  <Check size={16} />
                  Selected
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3">
            {variantType.options.map((option, optionIndex) => {
              const isSelected = selectedVariant?.[variantType.name] === option.value;
              const isAvailable = option.inStock !== false;

              return (
                <motion.button
                  key={option.value}
                  onClick={() => onVariantSelect(variantType.name, option.value)}
                  disabled={!isAvailable}
                  className={getVariantStyle(variantType, option, isSelected, isAvailable)}
                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (variantIndex * 0.2) + (optionIndex * 0.1) }}
                >
                  {/* Background Shimmer Effect */}
                  {isAvailable && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform-gpu" />
                  )}

                  {/* Content */}
                  <div className="relative flex items-center gap-2">
                    {/* Premium Icon */}
                    {option.isPremium && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Zap size={14} className="text-amber-500 fill-amber-500" />
                      </motion.span>
                    )}

                    <span className="relative z-10">{option.value}</span>

                    {/* Price Difference */}
                    {option.priceDifference && option.priceDifference > 0 && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        +${option.priceDifference}
                      </span>
                    )}

                    {/* Stock Status */}
                    {!isAvailable && (
                      <X size={14} className="text-red-500" />
                    )}
                  </div>

                  {/* Selected Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg"
                      >
                        <Check size={12} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Popular Badge */}
                  {option.isPopular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      Popular
                    </motion.div>
                  )}

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-100' : ''}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Variant Description */}
          {variantType.description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic"
            >
              {variantType.description}
            </motion.p>
          )}
        </motion.div>
      ))}

      {/* Selection Summary */}
      <AnimatePresence>
        {Object.keys(selectedVariant || {}).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <Check size={16} />
              </div>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300">
                  Configuration Complete
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  All variants selected and ready to add to cart
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};