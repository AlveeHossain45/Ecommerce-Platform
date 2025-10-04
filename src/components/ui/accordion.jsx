import React, { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Shield, Infinity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const premiumFeatures = {
    magneticHover: true,
    glowEffect: true,
    smoothBlur: true,
    gradientBorders: true,
    microInteractions: true,
    staggeredAnimations: true
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {/* Premium Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-500/20 mb-4">
          <Sparkles size={16} className="text-blue-500" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            PREMIUM EXPERIENCE
          </span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Enhanced Accordion Interface
        </h2>
      </div>

      {items.map((item, index) => (
        <motion.div
          key={item.title}
          className={`
            relative overflow-hidden rounded-xl border
            ${openIndex === index 
              ? 'border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-lg shadow-blue-500/10' 
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md'
            }
            transition-all duration-500 ease-out
          `}
          whileHover={premiumFeatures.magneticHover ? { y: -2 } : {}}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          {/* Animated Background Glow */}
          {premiumFeatures.glowEffect && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Gradient Border Effect */}
          {premiumFeatures.gradientBorders && openIndex === index && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl -z-10 blur-sm opacity-50" />
          )}

          <button
            onClick={() => toggleItem(index)}
            className="flex items-center justify-between w-full p-6 text-left font-semibold relative z-10 group"
          >
            <div className="flex items-center gap-4">
              {/* Premium Icon with Animation */}
              <motion.div
                className={`
                  p-2 rounded-lg
                  ${openIndex === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon || <Zap size={18} />}
              </motion.div>

              <div className="text-left">
                <span className="text-lg font-bold text-gray-900 dark:text-white block">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Indicator */}
              {item.status && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'new' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  item.status === 'updated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {item.status}
                </span>
              )}

              {/* Animated Chevron */}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className={`
                  p-2 rounded-full transition-colors duration-300
                  ${openIndex === index 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                  }
                `}
              >
                <ChevronDown size={18} />
              </motion.div>
            </div>
          </button>

          <AnimatePresence mode="wait">
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.4, ease: "easeOut" },
                    opacity: { duration: 0.3, delay: 0.1 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 }
                  }
                }}
                className="overflow-hidden"
              >
                {/* Content Container with Enhanced Styling */}
                <div className="px-6 pb-6 pt-2">
                  <div className="relative">
                    {/* Subtle Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent" />
                    
                    {/* Main Content */}
                    <div className="pt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.content}
                    </div>

                    {/* Optional Action Buttons */}
                    {item.actions && (
                      <motion.div 
                        className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.actions.map((action, actionIndex) => (
                          <motion.button
                            key={actionIndex}
                            className={`
                              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                              ${action.primary 
                                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                              }
                            `}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {action.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Micro-interaction Hover Effect */}
          {premiumFeatures.microInteractions && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0"
              animate={{
                x: hoveredIndex === index ? ['0%', '100%'] : '0%',
                opacity: hoveredIndex === index ? [0, 1, 0] : 0,
              }}
              transition={{ duration: 0.8 }}
            />
          )}
        </motion.div>
      ))}

      {/* Premium Footer */}
      <motion.div 
        className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Shield size={14} />
          <span>Premium smooth animations & interactions</span>
          <Infinity size={14} />
        </div>
      </motion.div>
    </div>
  );
};

export default Accordion;