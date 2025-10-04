import { useState, useEffect, useCallback, useMemo } from 'react'

export const useTheme = (options = {}) => {
  const {
    storageKey = 'theme',
    defaultTheme = 'light',
    enableSystem = true,
    enableTransition = true,
    themes = ['light', 'dark'],
    attribute = 'class',
    onThemeChange = null,
    onSystemChange = null
  } = options

  // State management
  const [theme, setTheme] = useState(defaultTheme)
  const [systemTheme, setSystemTheme] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [themeHistory, setThemeHistory] = useState([])

  // Get system theme
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light'
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // Initialize theme
  useEffect(() => {
    try {
      let initialTheme = defaultTheme
      
      // Check localStorage
      const savedTheme = localStorage.getItem(storageKey)
      if (savedTheme && themes.includes(savedTheme)) {
        initialTheme = savedTheme
      } 
      // Check system preference
      else if (enableSystem) {
        const system = getSystemTheme()
        setSystemTheme(system)
        initialTheme = system
      }

      setTheme(initialTheme)
      setThemeHistory([initialTheme])
      setIsLoaded(true)
      
    } catch (error) {
      console.error('Theme initialization error:', error)
      setTheme(defaultTheme)
      setIsLoaded(true)
    }
  }, [defaultTheme, enableSystem, getSystemTheme, storageKey, themes])

  // Watch for system theme changes
  useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemChange = (e) => {
      const newSystemTheme = e.matches ? 'dark' : 'light'
      setSystemTheme(newSystemTheme)
      onSystemChange?.(newSystemTheme)
      
      // If current theme is set to system, update accordingly
      if (theme === 'system') {
        applyTheme(newSystemTheme)
      }
    }

    // Modern event listener
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemChange)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleSystemChange)
      } else {
        mediaQuery.removeListener(handleSystemChange)
      }
    }
  }, [enableSystem, theme, onSystemChange])

  // Apply theme to DOM
  const applyTheme = useCallback((newTheme) => {
    if (typeof document === 'undefined') return

    const className = `theme-${newTheme}`
    const root = document.documentElement
    
    // Enable smooth transitions
    if (enableTransition) {
      const css = document.createElement('style')
      css.textContent = `
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
      `
      document.head.appendChild(css)
      
      setTimeout(() => {
        document.head.removeChild(css)
      }, 300)
    }

    // Remove all theme classes
    themes.forEach(t => {
      root.classList.remove(`theme-${t}`)
    })
    
    // Apply new theme
    if (attribute === 'class') {
      root.classList.add(className)
    } else if (attribute === 'data-theme') {
      root.setAttribute('data-theme', newTheme)
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const themeColor = newTheme === 'dark' ? '#1a1a1a' : '#ffffff'
      metaThemeColor.setAttribute('content', themeColor)
    }
  }, [attribute, enableTransition, themes])

  // Persist theme and apply to DOM
  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(storageKey, theme)
      applyTheme(theme)
      onThemeChange?.(theme, systemTheme)
    } catch (error) {
      console.error('Theme persistence error:', error)
    }
  }, [theme, isLoaded, storageKey, applyTheme, onThemeChange, systemTheme])

  // Theme controls
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const currentIndex = themes.indexOf(prev)
      const nextIndex = (currentIndex + 1) % themes.length
      const newTheme = themes[nextIndex]
      
      setThemeHistory(history => [...history.slice(-9), newTheme])
      return newTheme
    })
  }, [themes])

  const setThemeDirect = useCallback((newTheme) => {
    if (themes.includes(newTheme)) {
      setTheme(newTheme)
      setThemeHistory(history => [...history.slice(-9), newTheme])
    }
  }, [themes])

  const resetToDefault = useCallback(() => {
    setThemeDirect(defaultTheme)
  }, [setThemeDirect, defaultTheme])

  const useSystemTheme = useCallback(() => {
    if (enableSystem) {
      const system = getSystemTheme()
      setThemeDirect(system)
    }
  }, [enableSystem, getSystemTheme, setThemeDirect])

  const cycleThemes = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  const revertToPrevious = useCallback(() => {
    if (themeHistory.length > 1) {
      const previousTheme = themeHistory[themeHistory.length - 2]
      setThemeDirect(previousTheme)
      setThemeHistory(history => history.slice(0, -1))
    }
  }, [themeHistory, setThemeDirect])

  // Theme information and utilities
  const themeInfo = useMemo(() => ({
    current: theme,
    system: systemTheme,
    available: themes,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isSystem: theme === 'system',
    isLoaded,
    history: themeHistory,
    canRevert: themeHistory.length > 1
  }), [theme, systemTheme, themes, isLoaded, themeHistory])

  // Export theme configuration for CSS-in-JS
  const themeConfig = useMemo(() => {
    const baseConfig = {
      light: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f8f9fa',
        '--text-primary': '#1a1a1a',
        '--text-secondary': '#666666',
        '--accent-primary': '#007bff',
        '--border-color': '#e0e0e0'
      },
      dark: {
        '--bg-primary': '#1a1a1a',
        '--bg-secondary': '#2d2d2d',
        '--text-primary': '#ffffff',
        '--text-secondary': '#a0a0a0',
        '--accent-primary': '#4dabf7',
        '--border-color': '#404040'
      }
    }

    return baseConfig[theme] || baseConfig.light
  }, [theme])

  // Apply CSS variables to document
  useEffect(() => {
    if (typeof document === 'undefined' || !isLoaded) return

    const root = document.documentElement
    Object.entries(themeConfig).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [themeConfig, isLoaded])

  return {
    // State
    theme,
    systemTheme,
    isLoaded,
    
    // Actions
    toggleTheme,
    setTheme: setThemeDirect,
    resetToDefault,
    useSystemTheme,
    cycleThemes,
    revertToPrevious,
    
    // Information
    themeInfo,
    themeConfig,
    
    // Utility functions
    getNextTheme: () => {
      const currentIndex = themes.indexOf(theme)
      return themes[(currentIndex + 1) % themes.length]
    },
    
    // Status flags
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isSystem: theme === 'system',
    hasMultipleThemes: themes.length > 1,
    
    // Configuration
    config: {
      storageKey,
      defaultTheme,
      enableSystem,
      themes,
      attribute
    }
  }
}

// Specialized hook variants
export const useDarkMode = (options = {}) => {
  return useTheme({
    themes: ['light', 'dark'],
    defaultTheme: 'dark',
    ...options
  })
}

export const useMultiTheme = (customThemes, options = {}) => {
  return useTheme({
    themes: customThemes,
    ...options
  })
}

export const useSystemTheme = (options = {}) => {
  const themeHook = useTheme({
    defaultTheme: 'system',
    enableSystem: true,
    ...options
  })

  const effectiveTheme = themeHook.theme === 'system' ? themeHook.systemTheme : themeHook.theme

  return {
    ...themeHook,
    effectiveTheme,
    isDark: effectiveTheme === 'dark',
    isLight: effectiveTheme === 'light'
  }
}

// Theme provider context (for React Context integration)
export const createThemeProvider = (defaultOptions = {}) => {
  const ThemeContext = React.createContext()
  
  const ThemeProvider = ({ children, ...options }) => {
    const theme = useTheme({ ...defaultOptions, ...options })
    
    return (
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    )
  }
  
  const useThemeContext = () => {
    const context = React.useContext(ThemeContext)
    if (!context) {
      throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
  }
  
  return { ThemeProvider, useThemeContext }
}

export default useTheme