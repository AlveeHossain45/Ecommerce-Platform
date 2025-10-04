import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star } from 'lucide-react';

const TabsContext = createContext(undefined);

export const Tabs = ({ defaultValue, children, className, variant = 'default', onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const handleTabChange = (value) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, indicatorStyle, setIndicatorStyle, variant }}>
      <div className={clsx('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within Tabs');
  
  const { variant, setIndicatorStyle } = context;
  const listRef = useRef(null);

  const variantClasses = {
    default: 'border-b border-gray-200 dark:border-gray-700',
    underlined: 'border-b border-gray-200 dark:border-gray-700',
    pills: 'bg-gray-100 dark:bg-gray-800 rounded-xl p-1',
    elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-1 border border-gray-200 dark:border-gray-700',
    premium: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-700'
  };

  return (
    <div 
      ref={listRef}
      className={clsx(
        'flex relative',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children, className, icon, badge }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const { activeTab, setActiveTab, variant, setIndicatorStyle } = context;
  const triggerRef = useRef(null);

  const isActive = activeTab === value;

  const handleClick = () => {
    setActiveTab(value);
    if (triggerRef.current && variant !== 'pills' && variant !== 'elevated' && variant !== 'premium') {
      const { offsetLeft, offsetWidth } = triggerRef.current;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth
      });
    }
  };

  const variantClasses = {
    default: clsx(
      'px-4 py-3 font-medium text-sm border-b-2 transition-all duration-300 relative',
      isActive
        ? 'text-primary-600 dark:text-primary-400 border-primary-500'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
    ),
    underlined: clsx(
      'px-4 py-3 font-medium text-sm transition-all duration-300 relative',
      isActive
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
    ),
    pills: clsx(
      'px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-2',
      isActive
        ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-md'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
    ),
    elevated: clsx(
      'px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-2',
      isActive
        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    ),
    premium: clsx(
      'px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden',
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10'
    )
  };

  const iconMap = {
    sparkles: Sparkles,
    zap: Zap,
    star: Star,
    ...icon
  };

  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;

  return (
    <motion.button
      ref={triggerRef}
      onClick={handleClick}
      className={clsx(
        variantClasses[variant],
        'flex items-center gap-2 whitespace-nowrap',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Premium active state shimmer */}
      {isActive && variant === 'premium' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full"
          animate={{ x: ['0%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Icon */}
      {IconComponent && (
        <motion.span
          animate={isActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <IconComponent size={16} />
        </motion.span>
      )}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Badge */}
      {badge && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={clsx(
            'px-1.5 py-0.5 text-xs rounded-full font-medium',
            isActive && variant === 'premium' 
              ? 'bg-white/20 text-white' 
              : isActive
              ? 'bg-white/20 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          )}
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  );
};

export const TabsContent = ({ value, children, className, unmountOnExit = true }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const { activeTab, variant } = context;

  const contentVariants = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 }
  };

  if (unmountOnExit) {
    return (
      <AnimatePresence mode="wait">
        {activeTab === value && (
          <motion.div
            key={value}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate={activeTab === value ? "animate" : "exit"}
      variants={contentVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(className, activeTab !== value && 'hidden')}
    >
      {children}
    </motion.div>
  );
};

// Enhanced indicator for underlined variant
export const TabsIndicator = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsIndicator must be used within Tabs');

  const { indicatorStyle, variant } = context;

  if (variant !== 'underlined') return null;

  return (
    <motion.div
      className="absolute bottom-0 h-0.5 bg-primary-500"
      initial={false}
      animate={{
        left: indicatorStyle.left,
        width: indicatorStyle.width
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
};

// Usage example with enhanced features:
/*
<Tabs defaultValue="tab1" variant="premium" onTabChange={handleTabChange}>
  <TabsList className="justify-center">
    <TabsTrigger value="tab1" icon="sparkles" badge="3">
      Features
    </TabsTrigger>
    <TabsTrigger value="tab2" icon="zap">
      Performance
    </TabsTrigger>
    <TabsTrigger value="tab3" icon="star" badge="New">
      Premium
    </TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    Features content here
  </TabsContent>
  <TabsContent value="tab2">
    Performance content here
  </TabsContent>
  <TabsContent value="tab3">
    Premium content here
  </TabsContent>
</Tabs>
*/