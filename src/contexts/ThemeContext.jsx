import React, { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette,
  Contrast,
  Eye,
  Sparkles,
  Settings,
  Check
} from 'lucide-react'

// Premium Theme Context with enhanced features
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system')
  const [colorScheme, setColorScheme] = useState('blue')
  const [contrast, setContrast] = useState('normal')
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Available themes and color schemes
  const themes = {
    light: { name: 'Light', icon: Sun, description: 'Bright and clean' },
    dark: { name: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    system: { name: 'System', icon: Monitor, description: 'Follows device' }
  }

  const colorSchemes = {
    blue: { name: 'Ocean Blue', color: 'bg-blue-500' },
    purple: { name: 'Royal Purple', color: 'bg-purple-500' },
    green: { name: 'Emerald Green', color: 'bg-green-500' },
    orange: { name: 'Sunset Orange', color: 'bg-orange-500' },
    pink: { name: 'Blush Pink', color: 'bg-pink-500' },
    indigo: { name: 'Deep Indigo', color: 'bg-indigo-500' }
  }

  const contrastModes = {
    normal: { name: 'Normal', description: 'Standard contrast' },
    high: { name: 'High Contrast', description: 'Enhanced visibility' },
    low: { name: 'Low Contrast', description: 'Softer appearance' }
  }

  // Initialize theme from localStorage and system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('premium_theme')
    const savedColorScheme = localStorage.getItem('premium_color_scheme')
    const savedContrast = localStorage.getItem('premium_contrast')
    const savedReducedMotion = localStorage.getItem('premium_reduced_motion')

    if (savedTheme) setTheme(savedTheme)
    if (savedColorScheme) setColorScheme(savedColorScheme)
    if (savedContrast) setContrast(savedContrast)
    if (savedReducedMotion) setReducedMotion(JSON.parse(savedReducedMotion))

    // Apply reduced motion preference
    if (reducedMotion || (savedReducedMotion && JSON.parse(savedReducedMotion))) {
      document.documentElement.style.setProperty('--reduce-motion', 'reduce')
    }
  }, [])

  // Apply theme changes
  useEffect(() => {
    localStorage.setItem('premium_theme', theme)
    localStorage.setItem('premium_color_scheme', colorScheme)
    localStorage.setItem('premium_contrast', contrast)
    localStorage.setItem('premium_reduced_motion', JSON.stringify(reducedMotion))

    const root = document.documentElement
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Determine actual theme to apply
    let appliedTheme = theme
    if (theme === 'system') {
      appliedTheme = systemPrefersDark ? 'dark' : 'light'
    }

    // Apply theme class
    root.classList.remove('light', 'dark')
    root.classList.add(appliedTheme)

    // Apply color scheme
    root.style.setProperty('--color-primary', `var(--color-${colorScheme}-500)`)
    root.style.setProperty('--color-primary-hover', `var(--color-${colorScheme}-600)`)
    root.style.setProperty('--color-primary-light', `var(--color-${colorScheme}-100)`)
    root.style.setProperty('--color-primary-dark', `var(--color-${colorScheme}-900)`)

    // Apply contrast
    root.classList.remove('contrast-normal', 'contrast-high', 'contrast-low')
    root.classList.add(`contrast-${contrast}`)

    // Apply reduced motion
    if (reducedMotion) {
      root.style.setProperty('--reduce-motion', 'reduce')
    } else {
      root.style.setProperty('--reduce-motion', 'no-preference')
    }

  }, [theme, colorScheme, contrast, reducedMotion])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light'
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [theme])

  // Theme actions
  const setThemeWithFeedback = (newTheme) => {
    setTheme(newTheme)
    // Could add haptic feedback or sound here
  }

  const setColorSchemeWithFeedback = (newScheme) => {
    setColorScheme(newScheme)
  }

  const setContrastWithFeedback = (newContrast) => {
    setContrast(newContrast)
  }

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev)
  }

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(prev => !prev)
  }

  // Get current theme info
  const getCurrentThemeInfo = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const appliedTheme = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme
    
    return {
      theme: appliedTheme,
      themeSetting: theme,
      colorScheme,
      contrast,
      reducedMotion,
      isDark: appliedTheme === 'dark',
      isSystem: theme === 'system'
    }
  }

  // Reset to defaults
  const resetTheme = () => {
    setTheme('system')
    setColorScheme('blue')
    setContrast('normal')
    setReducedMotion(false)
  }

  const value = {
    // State
    theme,
    colorScheme,
    contrast,
    reducedMotion,
    isThemeMenuOpen,
    setIsThemeMenuOpen,

    // Theme data
    themes,
    colorSchemes,
    contrastModes,

    // Actions
    setTheme: setThemeWithFeedback,
    setColorScheme: setColorSchemeWithFeedback,
    setContrast: setContrastWithFeedback,
    toggleReducedMotion,
    toggleThemeMenu,
    resetTheme,

    // Utilities
    getCurrentThemeInfo
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
      
      {/* Theme Settings Menu */}
      <ThemeSettingsMenu />
    </ThemeContext.Provider>
  )
}

// Premium Theme Settings Menu Component
const ThemeSettingsMenu = () => {
  const {
    theme,
    colorScheme,
    contrast,
    reducedMotion,
    isThemeMenuOpen,
    setIsThemeMenuOpen,
    themes,
    colorSchemes,
    contrastModes,
    setTheme,
    setColorScheme,
    setContrast,
    toggleReducedMotion,
    resetTheme,
    getCurrentThemeInfo
  } = useTheme()

  const currentTheme = getCurrentThemeInfo()

  return (
    <AnimatePresence>
      {isThemeMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={() => setIsThemeMenuOpen(false)}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-20 right-4 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Theme Settings
                </h3>
              </div>
              <button
                onClick={() => setIsThemeMenuOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-6">
              {/* Theme Selection */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Theme
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(themes).map(([key, { name, icon: Icon, description }]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTheme(key)}
                      className={clsx(
                        'p-3 rounded-lg border-2 text-left transition-all',
                        theme === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <Icon className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-400" />
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Color Scheme
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(colorSchemes).map(([key, { name, color }]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setColorScheme(key)}
                      className={clsx(
                        'relative p-4 rounded-lg border-2 transition-all',
                        colorScheme === key
                          ? 'border-gray-900 dark:border-white ring-2 ring-blue-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <div className={clsx('w-full h-8 rounded', color)} />
                      <div className="text-xs font-medium text-gray-900 dark:text-white mt-1">
                        {name}
                      </div>
                      {colorScheme === key && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Contrast Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Contrast className="w-4 h-4 mr-2" />
                  Contrast
                </h4>
                <div className="space-y-2">
                  {Object.entries(contrastModes).map(([key, { name, description }]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setContrast(key)}
                      className={clsx(
                        'w-full p-3 rounded-lg border text-left transition-all',
                        contrast === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Accessibility
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Reduced Motion
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Minimize animations and transitions
                      </div>
                    </div>
                    <div
                      onClick={toggleReducedMotion}
                      className={clsx(
                        'relative w-12 h-6 rounded-full transition-colors',
                        reducedMotion ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      )}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                        animate={{ x: reducedMotion ? 26 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetTheme}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Reset to Defaults
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsThemeMenuOpen(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Apply
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Theme Toggle Component
export const ThemeToggle = ({ className }) => {
  const { 
    theme, 
    toggleThemeMenu,
    getCurrentThemeInfo 
  } = useTheme()

  const currentTheme = getCurrentThemeInfo()
  const ThemeIcon = currentTheme.isDark ? Moon : Sun

  return (
    <motion.button
      onClick={toggleThemeMenu}
      className={clsx(
        'relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Theme settings"
    >
      <ThemeIcon className="w-5 h-5" />
      
      {/* System theme indicator */}
      {theme === 'system' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
        />
      )}
    </motion.button>
  )
}

// Quick Theme Toggle (simple light/dark toggle)
export const QuickThemeToggle = ({ className }) => {
  const { 
    theme, 
    setTheme,
    getCurrentThemeInfo 
  } = useTheme()

  const currentTheme = getCurrentThemeInfo()
  const ThemeIcon = currentTheme.isDark ? Moon : Sun
  const nextTheme = currentTheme.isDark ? 'light' : 'dark'

  return (
    <motion.button
      onClick={() => setTheme(nextTheme)}
      className={clsx(
        'relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${nextTheme} theme`}
    >
      <ThemeIcon className="w-5 h-5" />
    </motion.button>
  )
}

// Theme Hook
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// CSS Variables for custom properties (add to your global CSS)
/*
:root {
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-100: #dbeafe;
  --color-blue-900: #1e3a8a;
  
  --color-purple-500: #8b5cf6;
  --color-purple-600: #7c3aed;
  --color-purple-100: #ede9fe;
  --color-purple-900: #4c1d95;
  
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-primary-light: var(--color-blue-100);
  --color-primary-dark: var(--color-blue-900);
  
  --reduce-motion: no-preference;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --reduce-motion: reduce;
  }
}

.contrast-high {
  --contrast-multiplier: 1.5;
}

.contrast-low {
  --contrast-multiplier: 0.7;
}
*/

// Usage examples:
/*
// In your main app:
<ThemeProvider>
  <App />
</ThemeProvider>

// Using theme in components:
const { 
  theme, 
  setTheme, 
  colorScheme,
  getCurrentThemeInfo 
} = useTheme()

// Theme toggle in navigation:
<ThemeToggle />

// Quick toggle for simple light/dark:
<QuickThemeToggle />

// Apply theme-aware styles:
<div className={clsx(
  'bg-white dark:bg-gray-900',
  'text-gray-900 dark:text-white'
)}>
  Content
</div>
*/