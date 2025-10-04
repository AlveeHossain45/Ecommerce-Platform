import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, Search, Loader2, Sparkles } from 'lucide-react';

const Input = ({ 
  error,
  success,
  loading,
  label,
  helperText,
  variant = 'default',
  size = 'md',
  icon,
  disabled = false,
  className,
  containerClassName,
  showCharacterCount = false,
  maxLength,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const isPassword = props.type === 'password';
  const isSearch = props.type === 'search';
  const value = props.value || '';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-4 py-3 text-lg'
  };

  const variantClasses = {
    default: `
      bg-white dark:bg-gray-800 
      border border-gray-300 dark:border-gray-600 
      hover:border-gray-400 dark:hover:border-gray-500
      focus:border-primary-500 dark:focus:border-primary-400
      text-gray-900 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
    `,
    outline: `
      bg-transparent
      border-2 border-gray-200 dark:border-gray-700
      hover:border-gray-300 dark:hover:border-gray-600
      focus:border-primary-500 dark:focus:border-primary-400
      text-gray-900 dark:text-white
      placeholder-gray-400 dark:placeholder-gray-500
    `,
    filled: `
      bg-gray-50 dark:bg-gray-700
      border border-transparent
      hover:bg-gray-100 dark:hover:bg-gray-600
      focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500
      text-gray-900 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
    `,
    premium: `
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      hover:border-gray-300 dark:hover:border-gray-600
      focus:border-primary-500 dark:focus:border-primary-400
      text-gray-900 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
      shadow-lg shadow-primary-500/10
      focus:shadow-xl focus:shadow-primary-500/20
      backdrop-blur-sm
    `
  };

  const stateClasses = {
    error: `
      border-red-500 dark:border-red-400
      focus:border-red-500 dark:focus:border-red-400
      focus:ring-red-500/20
      bg-red-50/50 dark:bg-red-900/20
    `,
    success: `
      border-green-500 dark:border-green-400
      focus:border-green-500 dark:focus:border-green-400
      focus:ring-green-500/20
      bg-green-50/50 dark:bg-green-900/20
    `,
    disabled: `
      bg-gray-100 dark:bg-gray-800
      border-gray-200 dark:border-gray-700
      text-gray-500 dark:text-gray-400
      cursor-not-allowed
    `
  };

  const iconMap = {
    search: Search,
    sparkles: Sparkles,
    ...icon
  };

  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;

  const getInputType = () => {
    if (isPassword) {
      return isPasswordVisible ? 'text' : 'password';
    }
    return props.type || 'text';
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={clsx('space-y-2', containerClassName)}>
      {/* Label */}
      {label && (
        <motion.label 
          htmlFor={props.id}
          className={clsx(
            'block text-sm font-medium transition-colors duration-200',
            error 
              ? 'text-red-600 dark:text-red-400' 
              : success
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {label}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Main Input */}
        <motion.input
          ref={inputRef}
          {...props}
          type={getInputType()}
          disabled={disabled || loading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            'w-full rounded-xl font-medium transition-all duration-300',
            'focus:outline-none focus:ring-4',
            'disabled:cursor-not-allowed',
            sizeClasses[size],
            variantClasses[variant],
            error && stateClasses.error,
            success && stateClasses.success,
            disabled && stateClasses.disabled,
            !error && !success && !disabled && 'focus:ring-primary-500/20',
            (icon || isSearch) && 'pl-10',
            (isPassword || loading || success || error) && 'pr-10',
            className
          )}
          whileFocus={{ scale: 1.01 }}
        />

        {/* Left Icon */}
        {(IconComponent || isSearch) && (
          <motion.div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <IconComponent size={size === 'lg' ? 20 : 16} />
          </motion.div>
        )}

        {/* Right Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Loading Spinner */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Loader2 size={16} className="animate-spin text-primary-500" />
            </motion.div>
          )}

          {/* Success Icon */}
          {success && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Check size={16} className="text-green-500" />
            </motion.div>
          )}

          {/* Error Icon */}
          {error && !loading && !success && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <X size={16} className="text-red-500" />
            </motion.div>
          )}

          {/* Password Toggle */}
          {isPassword && !loading && (
            <motion.button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.button>
          )}
        </div>

        {/* Focus Border Effect */}
        <motion.div
          className={clsx(
            'absolute inset-0 rounded-xl border-2 pointer-events-none',
            error 
              ? 'border-red-500' 
              : success
              ? 'border-green-500'
              : 'border-primary-500'
          )}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused && !disabled ? 1 : 0,
            scale: isFocused && !disabled ? 1 : 0.95
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Character Count */}
        {showCharacterCount && maxLength && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-6 right-0 text-xs text-gray-500 dark:text-gray-400"
          >
            {value.length}/{maxLength}
          </motion.div>
        )}
      </div>

      {/* Helper Text and Error Messages */}
      <AnimatePresence mode="wait">
        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {error ? (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <X size={14} />
                {error}
              </p>
            ) : helperText ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {helperText}
              </p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;