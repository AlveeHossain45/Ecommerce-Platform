import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { Sparkles, Zap, Star } from 'lucide-react'

export const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'default',
  className = '',
  text,
  showText = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const borderClasses = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4',
    xl: 'border-4'
  }

  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600 border-t-primary-500',
    primary: 'border-blue-200 dark:border-blue-800 border-t-blue-500',
    success: 'border-green-200 dark:border-green-800 border-t-green-500',
    warning: 'border-yellow-200 dark:border-yellow-800 border-t-yellow-500',
    error: 'border-red-200 dark:border-red-800 border-t-red-500',
    premium: 'border-purple-200 dark:border-purple-800 border-t-purple-500',
    gradient: 'border-transparent'
  }

  const GradientSpinner = () => (
    <div className="relative">
      {/* Gradient background */}
      <div className={clsx(
        'rounded-full absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse',
        sizeClasses[size]
      )} />
      
      {/* Spinner mask */}
      <div className={clsx(
        'rounded-full bg-white dark:bg-gray-900 relative z-10',
        size === 'sm' ? 'm-0.5' :
        size === 'md' ? 'm-1' :
        size === 'lg' ? 'm-1.5' : 'm-2',
        size === 'sm' ? 'w-3 h-3' :
        size === 'md' ? 'w-6 h-6' :
        size === 'lg' ? 'w-9 h-9' : 'w-12 h-12'
      )} />
    </div>
  )

  return (
    <motion.div
      className={clsx('flex flex-col items-center justify-center gap-3', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {variant === 'gradient' ? (
        <GradientSpinner />
      ) : (
        <motion.div
          className={clsx(
            'animate-spin rounded-full',
            sizeClasses[size],
            borderClasses[size],
            variantClasses[variant],
            className
          )}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      )}
      
      {showText && text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 dark:text-gray-400 font-medium"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

export const PageLoader = ({ 
  variant = 'default',
  text = 'Loading...',
  subtitle,
  showBackground = true,
  logo,
  showProgress = true
}) => {
  return (
    <motion.div
      className={clsx(
        'fixed inset-0 flex items-center justify-center z-50',
        showBackground && 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="text-center space-y-6 max-w-sm mx-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {/* Logo */}
        {logo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4"
          >
            {logo}
          </motion.div>
        )}

        {/* Animated Dots */}
        <div className="flex justify-center items-center gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={clsx(
                'w-2 h-2 rounded-full',
                variant === 'premium' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : variant === 'primary'
                  ? 'bg-blue-500'
                  : 'bg-primary-500'
              )}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Loading Spinner */}
        <LoadingSpinner 
          size="xl" 
          variant={variant}
          showText={false}
        />

        {/* Text Content */}
        <div className="space-y-2">
          <motion.h3
            className={clsx(
              'text-lg font-semibold',
              variant === 'premium' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                : 'text-gray-900 dark:text-white'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {text}
          </motion.h3>
          
          {subtitle && (
            <motion.p
              className="text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <motion.div
            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className={clsx(
                'h-full rounded-full',
                variant === 'premium'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : variant === 'primary'
                  ? 'bg-blue-500'
                  : 'bg-primary-500'
              )}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export const ContentLoader = ({ 
  count = 1,
  className,
  variant = 'default'
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <div className={clsx('space-y-3', className)}>
      {skeletons.map((index) => (
        <motion.div
          key={index}
          className={clsx(
            'rounded-lg animate-pulse',
            variant === 'default' && 'bg-gray-200 dark:bg-gray-700',
            variant === 'premium' && 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          style={{ 
            height: index % 3 === 0 ? '60px' : 
                    index % 3 === 1 ? '40px' : '80px'
          }}
        />
      ))}
    </div>
  )
}

export const ButtonLoader = ({ size = 'md', variant = 'default' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const variantClasses = {
    default: 'border-current border-t-transparent',
    primary: 'border-white border-t-transparent',
    premium: 'border-white border-t-transparent'
  }

  return (
    <motion.div
      className={clsx(
        'animate-spin rounded-full border-2',
        sizeClasses[size],
        variantClasses[variant]
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  )
}

export const ShimmerLoader = ({ 
  width = '100%', 
  height = '20px', 
  className = '' 
}) => {
  return (
    <motion.div
      className={clsx(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] rounded',
        className
      )}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['200% 0%', '-200% 0%']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export const CardLoader = ({ count = 1, variant = 'default' }) => {
  const cards = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((index) => (
        <motion.div
          key={index}
          className={clsx(
            'rounded-xl p-4 space-y-4',
            variant === 'default' 
              ? 'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700'
              : 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border-0'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ShimmerLoader height="200px" className="rounded-lg" />
          <div className="space-y-2">
            <ShimmerLoader width="70%" />
            <ShimmerLoader width="50%" />
            <ShimmerLoader width="30%" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <ShimmerLoader width="60px" height="30px" className="rounded-full" />
            <ShimmerLoader width="80px" height="40px" className="rounded-lg" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Usage examples:
/*
// Basic spinner
<LoadingSpinner size="md" />

// Premium page loader
<PageLoader 
  variant="premium"
  text="Loading Dashboard"
  subtitle="Preparing your workspace..."
  showProgress={true}
/>

// Content skeleton
<ContentLoader count={3} variant="premium" />

// Button loading state
<Button>
  <ButtonLoader size="md" variant="primary" />
  Loading...
</Button>

// Shimmer effect
<ShimmerLoader width="200px" height="24px" />

// Card loader
<CardLoader count={4} variant="premium" />
*/