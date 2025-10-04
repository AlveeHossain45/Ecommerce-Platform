import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X, Sparkles, Zap, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  premium: Sparkles,
  notification: Bell,
  flash: Zap
};

const colors = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-700',
    text: 'text-green-800 dark:text-green-200',
    icon: 'text-green-500 dark:text-green-400',
    gradient: 'from-green-500 to-emerald-500',
    glow: 'shadow-green-500/20'
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    border: 'border-red-200 dark:border-red-700',
    text: 'text-red-800 dark:text-red-200',
    icon: 'text-red-500 dark:text-red-400',
    gradient: 'from-red-500 to-rose-500',
    glow: 'shadow-red-500/20'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    border: 'border-yellow-200 dark:border-yellow-700',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: 'text-yellow-500 dark:text-yellow-400',
    gradient: 'from-yellow-500 to-amber-500',
    glow: 'shadow-yellow-500/20'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'text-blue-500 dark:text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-500/20'
  },
  premium: {
    bg: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-800 dark:text-purple-200',
    icon: 'text-purple-500 dark:text-purple-400',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/25'
  },
  notification: {
    bg: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'text-blue-500 dark:text-blue-400',
    gradient: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/20'
  }
};

const Toast = ({ toast, onRemove, position = 'top-right' }) => {
  const Icon = icons[toast.type] || icons.info;
  const colorClass = colors[toast.type] || colors.info;

  useEffect(() => {
    if (toast.duration && toast.duration !== Infinity) {
      const timer = setTimeout(() => onRemove(toast.id), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
    };
    return positions[position];
  };

  const getAnimation = () => {
    const baseAnimation = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
    };

    if (position.includes('top')) {
      return {
        ...baseAnimation,
        initial: { ...baseAnimation.initial, y: -50 },
        animate: { ...baseAnimation.animate, y: 0 },
        exit: { ...baseAnimation.exit, y: -50 }
      };
    } else if (position.includes('bottom')) {
      return {
        ...baseAnimation,
        initial: { ...baseAnimation.initial, y: 50 },
        animate: { ...baseAnimation.animate, y: 0 },
        exit: { ...baseAnimation.exit, y: 50 }
      };
    } else {
      return baseAnimation;
    }
  };

  const animation = getAnimation();

  return (
    <motion.div
      layout
      {...animation}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }}
      className={`
        flex items-start p-4 border rounded-xl shadow-2xl backdrop-blur-sm
        ${colorClass.bg} ${colorClass.border} ${colorClass.text}
        ${colorClass.glow} max-w-sm w-full relative overflow-hidden
        transform-gpu
      `}
    >
      {/* Progress Bar */}
      {toast.duration && toast.duration !== Infinity && (
        <motion.div
          className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${colorClass.gradient} rounded-t-xl`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}

      {/* Icon with Animation */}
      <motion.div
        className={`p-2 rounded-lg ${colorClass.bg} mr-3`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <Icon className={`w-5 h-5 ${colorClass.icon}`} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="font-semibold text-sm leading-tight"
          >
            {toast.title}
          </motion.h3>
        )}
        {toast.message && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-1 text-sm opacity-90 leading-relaxed"
          >
            {toast.message}
          </motion.p>
        )}
        
        {/* Action Buttons */}
        {toast.actions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 mt-3"
          >
            {toast.actions.map((action, index) => (
              <motion.button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                  if (action.closeOnClick !== false) {
                    onRemove(toast.id);
                  }
                }}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200
                  ${action.variant === 'primary' 
                    ? `bg-gradient-to-r ${colorClass.gradient} text-white shadow-lg` 
                    : 'bg-white/50 dark:bg-gray-800/50 text-current hover:bg-white/80 dark:hover:bg-gray-700/80'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Close Button */}
      <motion.button
        onClick={() => onRemove(toast.id)}
        className="ml-3 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4 opacity-70" />
      </motion.button>

      {/* Shimmer Effect for Premium */}
      {toast.type === 'premium' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full"
          animate={{ x: ['0%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onRemove, position = 'top-right' }) => {
  const positionClasses = {
    'top-right': 'top-4 right-4 items-end',
    'top-left': 'top-4 left-4 items-start',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center'
  };

  return (
    <div className={`fixed z-50 space-y-3 ${positionClasses[position]} flex flex-col`}>
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onRemove={onRemove}
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for using toasts
export const useToast = () => {
  const createToast = (type, options) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = {
      id,
      type,
      ...options
    };
    
    // Dispatch custom event or use context based on your setup
    const event = new CustomEvent('addToast', { detail: toast });
    window.dispatchEvent(event);
    
    return id;
  };

  return {
    success: (options) => createToast('success', options),
    error: (options) => createToast('error', options),
    warning: (options) => createToast('warning', options),
    info: (options) => createToast('info', options),
    premium: (options) => createToast('premium', options),
    notification: (options) => createToast('notification', options)
  };
};

// Usage examples:
/*
const toast = useToast();

// Basic toast
toast.success({
  title: 'Success!',
  message: 'Your changes have been saved.',
  duration: 5000
});

// Toast with actions
toast.premium({
  title: 'Premium Feature',
  message: 'Upgrade to access all features',
  duration: 8000,
  actions: [
    {
      label: 'Upgrade',
      variant: 'primary',
      onClick: () => upgradeUser(),
      closeOnClick: false
    },
    {
      label: 'Later',
      onClick: () => console.log('Later clicked')
    }
  ]
});

// Persistent toast
toast.info({
  title: 'New Message',
  message: 'You have a new message in your inbox',
  duration: Infinity // Won't auto-dismiss
});
*/