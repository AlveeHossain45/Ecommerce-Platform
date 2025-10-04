import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Info, Star, Sparkles, Zap } from 'lucide-react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  icon,
  dismissible,
  onDismiss,
  pulse = false,
  glow = false,
  animated = false
}) => {
  const variants = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600',
    primary: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 dark:from-blue-900/40 dark:to-blue-800/30 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30',
    success: 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 dark:from-green-900/40 dark:to-green-800/30 dark:text-green-300 border border-green-200 dark:border-green-500/30',
    warning: 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 dark:from-yellow-900/40 dark:to-yellow-800/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-500/30',
    error: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 dark:from-red-900/40 dark:to-red-800/30 dark:text-red-300 border border-red-200 dark:border-red-500/30',
    premium: 'bg-gradient-to-r from-purple-100 to-pink-50 text-purple-800 dark:from-purple-900/40 dark:to-pink-800/30 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30',
    outline: 'border-2 border-gray-300 text-gray-700 dark:border-gray-500 dark:text-gray-300 bg-transparent',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  const iconMap = {
    check: Check,
    x: X,
    alert: AlertCircle,
    info: Info,
    star: Star,
    sparkles: Sparkles,
    zap: Zap,
    ...icon
  };

  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;

  const baseClasses = `
    inline-flex items-center font-semibold rounded-full 
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-lg
    ${variants[variant]} 
    ${sizes[size]} 
    ${pulse ? 'animate-pulse' : ''}
    ${glow ? 'shadow-lg' : 'shadow-md'}
    ${className}
  `;

  const glowColors = {
    default: 'shadow-gray-400/20',
    primary: 'shadow-blue-500/25',
    success: 'shadow-green-500/25',
    warning: 'shadow-yellow-500/25',
    error: 'shadow-red-500/25',
    premium: 'shadow-purple-500/25',
    outline: 'shadow-gray-400/15',
    gradient: 'shadow-blue-500/40'
  };

  const BadgeContent = (
    <span className={`${baseClasses} ${glowColors[variant]} relative group`}>
      {/* Animated Background Effect */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      )}
      
      {/* Icon */}
      {IconComponent && (
        <motion.span 
          className="mr-2"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconComponent size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
        </motion.span>
      )}

      {/* Text */}
      <span className="whitespace-nowrap">
        {children}
      </span>

      {/* Dismiss Button */}
      {dismissible && (
        <motion.button
          onClick={onDismiss}
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
        </motion.button>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
    </span>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
};

export default Badge;