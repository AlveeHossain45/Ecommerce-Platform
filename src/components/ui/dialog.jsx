import React, { useEffect } from 'react';
import { X, Maximize2, Minimize2, Download, Share } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  variant = 'default',
  overlay = 'blur',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  actions,
  fullScreen = false,
  preventScroll = true,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-2xl border-0',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50',
    premium: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 relative overflow-hidden'
  };

  const overlayClasses = {
    blur: 'backdrop-blur-md bg-black/50',
    dark: 'bg-black/70',
    light: 'bg-white/30',
    none: 'bg-black/50'
  };

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll
  useEffect(() => {
    if (preventScroll && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, preventScroll]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      if (firstElement) firstElement.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            'fixed inset-0 z-50 flex items-center justify-center p-4',
            overlayClasses[overlay]
          )}
          onClick={closeOnOverlayClick ? onClose : undefined}
          {...props}
        >
          {/* Premium background effects */}
          {variant === 'premium' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-xl" />
            </>
          )}

          <motion.div
            initial={{ 
              scale: 0.95, 
              opacity: 0,
              y: 20
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0
            }}
            exit={{ 
              scale: 0.95, 
              opacity: 0,
              y: 20
            }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 400 
            }}
            className={clsx(
              'relative rounded-xl shadow-2xl w-full max-h-[90vh] overflow-hidden flex flex-col',
              fullScreen ? 'h-full max-h-full rounded-none' : sizeClasses[size],
              variantClasses[variant],
              className
            )}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "dialog-title" : undefined}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className={clsx(
                'flex items-center justify-between p-6 border-b',
                variant === 'glass' 
                  ? 'border-white/20' 
                  : 'border-gray-200 dark:border-gray-700'
              )}>
                {title && (
                  <motion.h3 
                    id="dialog-title"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {title}
                  </motion.h3>
                )}
                
                <div className="flex items-center gap-2">
                  {/* Action Buttons */}
                  {actions && (
                    <motion.div 
                      className="flex items-center gap-1 mr-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {actions.map((action, index) => (
                        <motion.button
                          key={index}
                          onClick={action.onClick}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title={action.label}
                        >
                          {action.icon === 'download' && <Download size={18} />}
                          {action.icon === 'share' && <Share size={18} />}
                          {action.icon === 'maximize' && <Maximize2 size={18} />}
                          {action.icon === 'minimize' && <Minimize2 size={18} />}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Close Button */}
                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      className={clsx(
                        'p-2 rounded-lg transition-all duration-200',
                        variant === 'glass'
                          ? 'hover:bg-white/20 text-gray-700 dark:text-gray-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                      )}
                      whileHover={{ scale: 1.05, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close dialog"
                    >
                      <X size={20} />
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex-1 overflow-y-auto"
            >
              <div className="p-6">
                {children}
              </div>
            </motion.div>

            {/* Footer for Actions */}
            {actions && actions.some(action => action.footer) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={clsx(
                  'p-6 border-t',
                  variant === 'glass'
                    ? 'border-white/20'
                    : 'border-gray-200 dark:border-gray-700'
                )}
              >
                <div className="flex justify-end gap-3">
                  {actions
                    .filter(action => action.footer)
                    .map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={action.onClick}
                        className={clsx(
                          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                          action.variant === 'primary'
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {action.label}
                      </motion.button>
                    ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;