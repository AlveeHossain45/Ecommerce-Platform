import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Info, AlertCircle, HelpCircle, Sparkles, Zap } from 'lucide-react';

const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 100,
  variant = 'default',
  size = 'md',
  icon,
  interactive = false,
  maxWidth = '200px',
  className,
  disabled = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const showTooltip = () => {
    if (disabled) return;
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  // Handle click outside for interactive tooltips
  useEffect(() => {
    if (!interactive || !isVisible) return;

    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [interactive, isVisible]);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    'left-start': 'right-full top-0 mr-2',
    'left-end': 'right-full bottom-0 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    'right-start': 'left-full top-0 ml-2',
    'right-end': 'left-full bottom-0 ml-2'
  };

  const variantClasses = {
    default: 'bg-gray-900 dark:bg-gray-700 text-white',
    dark: 'bg-gray-900 text-white',
    light: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600',
    premium: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const arrowPosition = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700',
    'top-start': 'top-full left-3 border-t-gray-900 dark:border-t-gray-700',
    'top-end': 'top-full right-3 border-t-gray-900 dark:border-t-gray-700',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700',
    'bottom-start': 'bottom-full left-3 border-b-gray-900 dark:border-b-gray-700',
    'bottom-end': 'bottom-full right-3 border-b-gray-900 dark:border-b-gray-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700',
    'left-start': 'left-full top-3 border-l-gray-900 dark:border-l-gray-700',
    'left-end': 'left-full bottom-3 border-l-gray-900 dark:border-l-gray-700',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700',
    'right-start': 'right-full top-3 border-r-gray-900 dark:border-r-gray-700',
    'right-end': 'right-full bottom-3 border-r-gray-900 dark:border-r-gray-700'
  };

  // Special arrow colors for variants
  const arrowVariantClasses = {
    premium: 'border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-blue-500',
    info: 'border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-blue-500',
    warning: 'border-t-yellow-500 border-r-yellow-500 border-b-yellow-500 border-l-yellow-500',
    error: 'border-t-red-500 border-r-red-500 border-b-red-500 border-l-red-500',
    success: 'border-t-green-500 border-r-green-500 border-b-green-500 border-l-green-500'
  };

  const iconMap = {
    info: Info,
    alert: AlertCircle,
    help: HelpCircle,
    sparkles: Sparkles,
    zap: Zap,
    ...icon
  };

  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;

  const getAnimationProps = (position) => {
    const baseScale = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 } };
    
    const positionAnimations = {
      top: { ...baseScale, initial: { ...baseScale.initial, y: 10 }, exit: { ...baseScale.exit, y: 10 } },
      'top-start': { ...baseScale, initial: { ...baseScale.initial, y: 10, x: -10 }, exit: { ...baseScale.exit, y: 10, x: -10 } },
      'top-end': { ...baseScale, initial: { ...baseScale.initial, y: 10, x: 10 }, exit: { ...baseScale.exit, y: 10, x: 10 } },
      bottom: { ...baseScale, initial: { ...baseScale.initial, y: -10 }, exit: { ...baseScale.exit, y: -10 } },
      'bottom-start': { ...baseScale, initial: { ...baseScale.initial, y: -10, x: -10 }, exit: { ...baseScale.exit, y: -10, x: -10 } },
      'bottom-end': { ...baseScale, initial: { ...baseScale.initial, y: -10, x: 10 }, exit: { ...baseScale.exit, y: -10, x: 10 } },
      left: { ...baseScale, initial: { ...baseScale.initial, x: 10 }, exit: { ...baseScale.exit, x: 10 } },
      'left-start': { ...baseScale, initial: { ...baseScale.initial, x: 10, y: -10 }, exit: { ...baseScale.exit, x: 10, y: -10 } },
      'left-end': { ...baseScale, initial: { ...baseScale.initial, x: 10, y: 10 }, exit: { ...baseScale.exit, x: 10, y: 10 } },
      right: { ...baseScale, initial: { ...baseScale.initial, x: -10 }, exit: { ...baseScale.exit, x: -10 } },
      'right-start': { ...baseScale, initial: { ...baseScale.initial, x: -10, y: -10 }, exit: { ...baseScale.exit, x: -10, y: -10 } },
      'right-end': { ...baseScale, initial: { ...baseScale.initial, x: -10, y: 10 }, exit: { ...baseScale.exit, x: -10, y: 10 } }
    };

    return positionAnimations[position] || baseScale;
  };

  const animationProps = getAnimationProps(position);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div 
        onMouseEnter={showTooltip} 
        onMouseLeave={interactive ? undefined : hideTooltip} 
        onFocus={showTooltip} 
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            {...animationProps}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
            className={clsx(
              'absolute z-50 rounded-lg shadow-xl backdrop-blur-sm',
              positionClasses[position],
              variantClasses[variant],
              sizeClasses[size],
              interactive && 'cursor-pointer',
              className
            )}
            style={{ maxWidth }}
            onMouseEnter={interactive ? showTooltip : undefined}
            onMouseLeave={interactive ? hideTooltip : undefined}
            {...props}
          >
            {/* Arrow */}
            <div className={clsx(
              'absolute w-0 h-0 border-4 border-transparent',
              arrowPosition[position],
              arrowVariantClasses[variant]
            )} />

            {/* Content */}
            <div className="flex items-start gap-2">
              {IconComponent && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <IconComponent size={size === 'lg' ? 16 : 14} className="flex-shrink-0 mt-0.5" />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex-1 leading-relaxed"
              >
                {content}
              </motion.div>
            </div>

            {/* Shimmer effect for premium variant */}
            {variant === 'premium' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full rounded-lg"
                animate={{ x: ['0%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;

// Usage examples:
/*
// Basic tooltip
<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// Premium tooltip with icon
<Tooltip 
  content="Premium feature available"
  variant="premium"
  icon="sparkles"
  position="top-end"
>
  <button>Premium</button>
</Tooltip>

// Interactive tooltip (stays open when hovering tooltip)
<Tooltip 
  content="This tooltip stays open when you hover over it"
  interactive={true}
  variant="info"
  icon="info"
>
  <button>Interactive</button>
</Tooltip>

// Large tooltip with custom width
<Tooltip 
  content="This is a longer tooltip content that might need more space"
  size="lg"
  maxWidth="300px"
  variant="light"
>
  <button>Large Tooltip</button>
</Tooltip>
*/