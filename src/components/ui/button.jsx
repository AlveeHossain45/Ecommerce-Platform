import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Loader2, ArrowRight, Check, Sparkles, Zap } from 'lucide-react';

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  success = false,
  pulse = false,
  glow = false,
  animated = true,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = `
    font-semibold rounded-xl transition-all duration-300 
    focus:outline-none focus:ring-4 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden group
    flex items-center justify-center gap-2
    ${fullWidth ? 'w-full' : ''}
  `;
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-blue-600 
      hover:from-blue-600 hover:to-blue-700 
      active:from-blue-700 active:to-blue-800
      text-white shadow-lg shadow-blue-500/25
      hover:shadow-xl hover:shadow-blue-500/35
      focus:ring-blue-500/50
      border border-blue-400/20
    `,
    secondary: `
      bg-gradient-to-r from-gray-600 to-gray-700 
      hover:from-gray-700 hover:to-gray-800 
      active:from-gray-800 active:to-gray-900
      text-white shadow-lg shadow-gray-500/25
      hover:shadow-xl hover:shadow-gray-500/35
      focus:ring-gray-500/50
      border border-gray-500/20
    `,
    outline: `
      border-2 border-gray-300 dark:border-gray-600 
      text-gray-700 dark:text-gray-300 
      bg-white dark:bg-gray-800
      hover:bg-gray-50 dark:hover:bg-gray-750
      active:bg-gray-100 dark:active:bg-gray-700
      shadow-md shadow-gray-500/10
      hover:shadow-lg hover:shadow-gray-500/15
      focus:ring-blue-500/50
      backdrop-blur-sm
    `,
    premium: `
      bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
      hover:from-purple-600 hover:via-pink-600 hover:to-red-600
      active:from-purple-700 active:via-pink-700 active:to-red-700
      text-white shadow-2xl shadow-purple-500/30
      hover:shadow-2xl hover:shadow-purple-500/40
      focus:ring-purple-500/50
      border border-purple-400/30
      relative
    `,
    ghost: `
      text-gray-600 dark:text-gray-400 
      hover:text-gray-900 dark:hover:text-white
      hover:bg-gray-100 dark:hover:bg-gray-800
      active:bg-gray-200 dark:active:bg-gray-700
      focus:ring-blue-500/50
    `
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  const iconMap = {
    arrow: ArrowRight,
    check: Check,
    sparkles: Sparkles,
    zap: Zap,
    ...icon
  };

  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;

  // Success state overrides
  const successClasses = success ? `
    bg-gradient-to-r from-green-500 to-green-600 
    hover:from-green-600 hover:to-green-700
    text-white shadow-lg shadow-green-500/25
    focus:ring-green-500/50
    border border-green-400/20
  ` : '';

  const ButtonContent = (
    <motion.button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        successClasses,
        pulse && 'animate-pulse',
        glow && 'shadow-2xl',
        className
      )}
      disabled={disabled || loading}
      whileHover={animated && !disabled && !loading ? { 
        scale: 1.02,
        y: -1,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      } : {}}
      whileTap={animated && !disabled && !loading ? { 
        scale: 0.98,
        y: 0
      } : {}}
      initial={animated ? { opacity: 0, y: 10 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      {...props}
    >
      {/* Premium shimmer effect */}
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-inherit rounded-xl flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={iconSizes[size]} />
          </motion.div>
        </div>
      )}

      {/* Success checkmark */}
      {success && !loading && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center"
        >
          <Check size={iconSizes[size]} />
        </motion.div>
      )}

      {/* Icon on left */}
      {IconComponent && iconPosition === 'left' && !loading && !success && (
        <motion.span
          whileHover={{ x: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <IconComponent size={iconSizes[size]} />
        </motion.span>
      )}

      {/* Text content - hidden during loading */}
      <span className={clsx(
        'transition-all duration-300',
        loading && 'opacity-0'
      )}>
        {children}
      </span>

      {/* Icon on right */}
      {IconComponent && iconPosition === 'right' && !loading && !success && (
        <motion.span
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <IconComponent size={iconSizes[size]} />
        </motion.span>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-xl" />
    </motion.button>
  );

  return ButtonContent;
};

export default Button;