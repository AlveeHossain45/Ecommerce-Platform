import React, { useState } from 'react'
import { ChevronDown, Plus, Minus, Sparkles, Zap, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

export const Accordion = ({ 
  items, 
  variant = 'default',
  size = 'md',
  multiple = false,
  icon = 'chevron',
  showDivider = true,
  className,
  ...props 
}) => {
  const [openIndices, setOpenIndices] = useState([])

  const toggleItem = (index) => {
    if (multiple) {
      setOpenIndices(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setOpenIndices(prev => 
        prev.includes(index) ? [] : [index]
      )
    }
  }

  const isOpen = (index) => openIndices.includes(index)

  const variants = {
    default: 'border border-gray-200 dark:border-gray-700 rounded-lg',
    elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border-0',
    minimal: 'border-0 border-b border-gray-200 dark:border-gray-700 rounded-none',
    premium: 'bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-0 shadow-lg',
    outline: 'border-2 border-gray-200 dark:border-gray-700 rounded-lg'
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const paddingSizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5'
  }

  const iconMap = {
    chevron: ChevronDown,
    plus: Plus,
    arrow: ChevronRight,
    sparkles: Sparkles,
    zap: Zap
  }

  const IconComponent = iconMap[icon]

  const getIconAnimation = (isOpen) => {
    if (icon === 'plus') {
      return isOpen ? <Minus size={20} /> : <Plus size={20} />
    }
    if (icon === 'arrow') {
      return <ChevronRight size={20} className={clsx('transform transition-transform duration-300', isOpen && 'rotate-90')} />
    }
    return <IconComponent size={20} className={clsx('transform transition-transform duration-300', isOpen && 'rotate-180')} />
  }

  return (
    <div className={clsx('space-y-3', className)} {...props}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={clsx(
            'overflow-hidden transition-all duration-300',
            variants[variant],
            item.className
          )}
          whileHover={variant === 'premium' ? { y: -2, transition: { duration: 0.2 } } : {}}
        >
          {/* Premium background effect */}
          {variant === 'premium' && isOpen(index) && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
          )}

          <motion.button
            onClick={() => toggleItem(index)}
            className={clsx(
              'flex items-center justify-between w-full text-left font-semibold transition-all duration-300 relative z-10',
              'hover:bg-gray-50 dark:hover:bg-gray-700/50',
              paddingSizes[size],
              sizes[size],
              variant === 'premium' && 'hover:bg-transparent',
              item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
            )}
            disabled={item.disabled}
            whileHover={!item.disabled ? { scale: 1.02 } : {}}
            whileTap={!item.disabled ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Custom Icon */}
              {item.icon && (
                <motion.div
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    isOpen(index) 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                  animate={isOpen(index) ? { scale: 1.1 } : { scale: 1 }}
                >
                  {item.icon}
                </motion.div>
              )}

              {/* Title and Subtitle */}
              <div className="flex-1 text-left">
                <span className={clsx(
                  'font-semibold block',
                  isOpen(index) 
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                )}>
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Right side - Badge and Icon */}
            <div className="flex items-center gap-3">
              {/* Badge */}
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={clsx(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    item.badgeVariant === 'primary' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : item.badgeVariant === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  )}
                >
                  {item.badge}
                </motion.span>
              )}

              {/* Animated Icon */}
              <motion.div
                className={clsx(
                  'flex-shrink-0 transition-colors duration-300',
                  isOpen(index) 
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                )}
                animate={isOpen(index) ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {getIconAnimation(isOpen(index))}
              </motion.div>
            </div>
          </motion.button>

          <AnimatePresence initial={false}>
            {isOpen(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.4, ease: "easeOut" },
                    opacity: { duration: 0.3, delay: 0.1 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 }
                  }
                }}
                className="overflow-hidden"
              >
                <div className={clsx(
                  paddingSizes[size],
                  'pt-0 text-gray-600 dark:text-gray-300 leading-relaxed',
                  showDivider && variant !== 'minimal' && 'border-t border-gray-200 dark:border-gray-700'
                )}>
                  {item.content}
                  
                  {/* Actions */}
                  {item.actions && (
                    <motion.div 
                      className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.actions.map((action, actionIndex) => (
                        <motion.button
                          key={actionIndex}
                          onClick={action.onClick}
                          className={clsx(
                            'px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                            action.variant === 'primary'
                              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {action.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Usage examples:
/*
<Accordion
  items={[
    {
      title: "Advanced Features",
      subtitle: "Explore premium capabilities",
      icon: <Sparkles size={16} />,
      badge: "New",
      badgeVariant: "primary",
      content: "Premium content here...",
      actions: [
        { label: "Learn More", variant: "primary", onClick: () => {} },
        { label: "Dismiss", variant: "default", onClick: () => {} }
      ]
    },
    {
      title: "Basic Settings",
      subtitle: "Configure your preferences",
      content: "Basic settings content...",
      disabled: true
    }
  ]}
  variant="premium"
  icon="sparkles"
  multiple={true}
  size="lg"
/>
*/