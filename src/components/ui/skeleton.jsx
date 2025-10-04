import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Skeleton = ({ 
  className, 
  variant = 'default',
  animation = 'pulse',
  circle = false,
  ...props 
}) => {
  const baseClasses = 'rounded bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    default: 'bg-gray-200 dark:bg-gray-700',
    premium: 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600',
    subtle: 'bg-gray-100 dark:bg-gray-800',
    intense: 'bg-gray-300 dark:bg-gray-600'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]',
    none: ''
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        circle && 'rounded-full',
        animation === 'wave' && 'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {animation === 'wave' && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['0%', '200%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export const ProductCardSkeleton = ({ count = 1, variant = 'default' }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skeletons.map((index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Skeleton 
            variant={variant}
            animation="wave"
            className="w-full h-48 mb-4 rounded-lg"
          />
          <Skeleton 
            variant={variant}
            className="h-4 w-3/4 mb-3"
          />
          <Skeleton 
            variant={variant}
            className="h-4 w-1/2 mb-2"
          />
          <Skeleton 
            variant={variant}
            className="h-4 w-2/3 mb-4"
          />
          <div className="flex justify-between items-center">
            <Skeleton 
              variant={variant}
              className="h-8 w-20 rounded-full"
            />
            <Skeleton 
              variant={variant}
              className="h-10 w-24 rounded-lg"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const ProfileSkeleton = () => (
  <motion.div
    className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <Skeleton circle className="w-16 h-16" animation="wave" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-1/3" animation="wave" />
      <Skeleton className="h-3 w-1/2" animation="wave" />
      <Skeleton className="h-3 w-2/3" animation="wave" />
    </div>
  </motion.div>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {/* Table Header */}
    <div className="grid gap-4 p-4 border-b border-gray-200 dark:border-gray-700" 
         style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }, (_, i) => (
        <Skeleton key={`header-${i}`} className="h-4" animation="wave" />
      ))}
    </div>
    
    {/* Table Rows */}
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4 p-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton
              key={`row-${rowIndex}-col-${colIndex}`}
              className="h-4"
              animation={rowIndex % 2 === 0 ? 'wave' : 'pulse'}
            />
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);

export const DashboardSkeleton = () => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Skeleton className="h-4 w-1/2 mb-4" animation="wave" />
          <Skeleton className="h-8 w-3/4 mb-2" animation="wave" />
          <Skeleton className="h-3 w-1/3" animation="wave" />
        </motion.div>
      ))}
    </div>

    {/* Charts and Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <Skeleton className="h-6 w-1/4 mb-6" animation="wave" />
        <Skeleton className="h-64 w-full" animation="wave" />
      </div>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <Skeleton className="h-6 w-1/3 mb-4" animation="wave" />
          <div className="space-y-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/2" animation="wave" />
                <Skeleton className="h-4 w-8" animation="wave" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const TextSkeleton = ({ lines = 3, variant = 'default' }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        variant={variant}
        animation="wave"
        className={clsx(
          'h-4',
          i === lines - 1 && 'w-3/4'
        )}
      />
    ))}
  </div>
);

export default Skeleton;