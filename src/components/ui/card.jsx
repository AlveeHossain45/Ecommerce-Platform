import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({ 
  children, 
  className,
  variant = 'default',
  hoverable = false,
  animated = true,
  glow = false,
  padding = 'md',
  border = true,
  ...props 
}) => {
  const baseClasses = `
    rounded-xl transition-all duration-300
    backdrop-blur-sm
    ${border ? 'border' : 'border-0'}
  `;

  const variantClasses = {
    default: `
      bg-white dark:bg-gray-800
      border-gray-200 dark:border-gray-700
      shadow-lg shadow-gray-500/10 dark:shadow-gray-900/20
    `,
    elevated: `
      bg-white dark:bg-gray-800
      border-gray-100 dark:border-gray-600
      shadow-2xl shadow-gray-500/15 dark:shadow-gray-900/30
    `,
    outline: `
      bg-transparent dark:bg-transparent
      border-2 border-gray-300 dark:border-gray-600
      shadow-md shadow-gray-500/5 dark:shadow-gray-900/10
    `,
    premium: `
      bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
      border border-gray-100 dark:border-gray-600
      shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5
      relative overflow-hidden
    `,
    glass: `
      bg-white/70 dark:bg-gray-800/70
      border border-white/50 dark:border-gray-700/50
      shadow-2xl shadow-gray-500/10 dark:shadow-gray-900/20
      backdrop-blur-md
    `,
    gradient: `
      bg-gradient-to-br from-blue-500 to-purple-600
      border-0 text-white
      shadow-2xl shadow-blue-500/25
    `
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const hoverEffects = hoverable ? `
    hover:shadow-2xl hover:shadow-gray-500/20 dark:hover:shadow-gray-900/40
    hover:scale-105 hover:border-gray-300 dark:hover:border-gray-500
    hover:-translate-y-1
    cursor-pointer
  ` : '';

  const glowEffects = glow ? `
    shadow-2xl shadow-blue-500/15 dark:shadow-blue-500/10
    ring-1 ring-blue-500/10 dark:ring-blue-500/20
  ` : '';

  const CardContent = (
    <motion.div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        hoverEffects,
        glowEffects,
        className
      )}
      whileHover={animated && hoverable ? { 
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : {}}
      whileTap={animated && hoverable ? { 
        y: 0,
        scale: 0.98
      } : {}}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={animated ? { duration: 0.4, ease: "easeOut" } : {}}
      {...props}
    >
      {/* Premium gradient overlay */}
      {variant === 'premium' && (
        <>
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-xl" />
        </>
      )}

      {/* Gradient shimmer effect */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}

      {/* Hover overlay */}
      {hoverable && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-gray-500/0 to-gray-500/0 group-hover:via-gray-500/5 group-hover:to-gray-500/10 transition-all duration-300 rounded-xl opacity-0 group-hover:opacity-100" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );

  return CardContent;
};

// Card subcomponents for better structure
const CardHeader = ({ children, className, ...props }) => (
  <div className={clsx('mb-4 space-y-1', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={clsx('text-xl font-bold text-gray-900 dark:text-white', className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className, ...props }) => (
  <p className={clsx('text-gray-600 dark:text-gray-400 text-sm', className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={clsx('space-y-4', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={clsx('mt-6 pt-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
    {children}
  </div>
);

// Attach subcomponents to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;