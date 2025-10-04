import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { Sparkles, Zap, Star, ChevronRight, Plus, Check } from 'lucide-react'

export const Tabs = ({ 
  tabs, 
  defaultTab = 0,
  variant = 'default',
  size = 'md',
  icon = 'none',
  showIndicator = true,
  fullWidth = false,
  className,
  onTabChange,
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const tabsRef = useRef([])

  const updateIndicator = (index) => {
    const currentTab = tabsRef.current[index]
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth
      })
    }
  }

  useEffect(() => {
    updateIndicator(activeTab)
  }, [activeTab])

  const handleTabChange = (index) => {
    setActiveTab(index)
    updateIndicator(index)
    onTabChange?.(index)
  }

  const variants = {
    default: 'border-b border-gray-200 dark:border-gray-700',
    underlined: 'border-b border-gray-200 dark:border-gray-700',
    pills: 'bg-gray-100 dark:bg-gray-800 rounded-xl p-1',
    elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-1 border border-gray-200 dark:border-gray-700',
    premium: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-700'
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const paddingSizes = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  }

  const iconMap = {
    none: null,
    sparkles: Sparkles,
    zap: Zap,
    star: Star,
    arrow: ChevronRight,
    plus: Plus,
    check: Check,
    ...tabs.reduce((acc, tab, index) => {
      if (tab.icon && typeof tab.icon === 'string') {
        const iconTypes = {
          sparkles: Sparkles,
          zap: Zap,
          star: Star,
          arrow: ChevronRight,
          plus: Plus,
          check: Check
        }
        acc[index] = iconTypes[tab.icon]
      }
      return acc
    }, {})
  }

  const getTabVariantClasses = (isActive, tabVariant = variant) => {
    const baseClasses = {
      default: clsx(
        'border-b-2 font-medium transition-all duration-300 relative',
        isActive
          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      ),
      underlined: clsx(
        'font-medium transition-all duration-300 relative',
        isActive
          ? 'text-primary-600 dark:text-primary-400'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      ),
      pills: clsx(
        'rounded-lg font-medium transition-all duration-300 flex items-center gap-2',
        isActive
          ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-md'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
      ),
      elevated: clsx(
        'rounded-lg font-medium transition-all duration-300 flex items-center gap-2',
        isActive
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      ),
      premium: clsx(
        'rounded-lg font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden',
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10'
      )
    }

    return baseClasses[tabVariant]
  }

  return (
    <div className={clsx('w-full', className)} {...props}>
      {/* Tabs Header */}
      <div className={clsx('relative', variants[variant])}>
        <div className={clsx(
          'flex',
          fullWidth && 'w-full',
          variant === 'pills' || variant === 'elevated' || variant === 'premium' 
            ? 'space-x-1' 
            : 'space-x-8'
        )}>
          {tabs.map((tab, index) => {
            const IconComponent = tab.icon ? 
              (typeof tab.icon === 'string' ? iconMap[tab.icon] : tab.icon) : 
              (icon !== 'none' ? iconMap[icon] : null)
            const isActive = activeTab === index

            return (
              <motion.button
                key={index}
                ref={el => tabsRef.current[index] = el}
                onClick={() => handleTabChange(index)}
                className={clsx(
                  getTabVariantClasses(isActive, tab.variant || variant),
                  paddingSizes[size],
                  sizes[size],
                  'flex items-center gap-2 whitespace-nowrap transition-all duration-300',
                  fullWidth && 'flex-1 justify-center',
                  tab.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
                )}
                whileHover={!tab.disabled ? { scale: 1.02 } : {}}
                whileTap={!tab.disabled ? { scale: 0.98 } : {}}
                disabled={tab.disabled}
              >
                {/* Premium active state shimmer */}
                {isActive && (tab.variant || variant) === 'premium' && (
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
                    <IconComponent size={size === 'lg' ? 20 : 16} />
                  </motion.span>
                )}

                {/* Label */}
                <span className="relative z-10">{tab.label}</span>

                {/* Badge */}
                {tab.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={clsx(
                      'px-1.5 py-0.5 text-xs rounded-full font-medium',
                      isActive && (tab.variant || variant) === 'premium' 
                        ? 'bg-white/20 text-white' 
                        : isActive
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {tab.badge}
                  </motion.span>
                )}

                {/* Custom content */}
                {tab.customContent && (
                  <div className="relative z-10">
                    {tab.customContent}
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Animated Indicator */}
        {showIndicator && (variant === 'default' || variant === 'underlined') && (
          <motion.div
            className="absolute bottom-0 h-0.5 bg-primary-500"
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </div>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="py-6"
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Usage examples:
/*
// Basic tabs
<Tabs
  tabs={[
    { label: 'Overview', content: <div>Overview content</div> },
    { label: 'Settings', content: <div>Settings content</div> },
    { label: 'Analytics', content: <div>Analytics content</div> }
  ]}
/>

// Premium tabs with icons and badges
<Tabs
  variant="premium"
  tabs={[
    { 
      label: 'Features', 
      icon: 'sparkles', 
      badge: '3',
      content: <div>Features content</div> 
    },
    { 
      label: 'Performance', 
      icon: 'zap', 
      content: <div>Performance content</div> 
    },
    { 
      label: 'Premium', 
      icon: 'star', 
      badge: 'New',
      content: <div>Premium content</div> 
    }
  ]}
  size="lg"
  fullWidth={true}
/>

// Mixed variants with custom icons
<Tabs
  tabs={[
    { 
      label: 'Basic', 
      variant: 'pills',
      content: <div>Basic content</div> 
    },
    { 
      label: 'Pro', 
      variant: 'elevated',
      icon: <CustomIcon />,
      content: <div>Pro content</div> 
    },
    { 
      label: 'Enterprise', 
      variant: 'premium',
      badge: 'Hot',
      content: <div>Enterprise content</div> 
    }
  ]}
/>

// Disabled tab example
<Tabs
  tabs={[
    { label: 'Active', content: <div>Active content</div> },
    { label: 'Disabled', disabled: true, content: <div>Disabled content</div> },
    { label: 'Another', content: <div>Another content</div> }
  ]}
/>
*/