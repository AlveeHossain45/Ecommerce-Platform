import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionTimer, setSessionTimer] = useState(null)

  // Enhanced user session with expiration
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user')
        const sessionExpiry = localStorage.getItem('session_expiry')
        
        if (savedUser && sessionExpiry) {
          const now = new Date().getTime()
          if (now < parseInt(sessionExpiry)) {
            const userData = JSON.parse(savedUser)
            setUser(userData)
            startSessionTimer(parseInt(sessionExpiry) - now)
          } else {
            // Session expired
            localStorage.removeItem('user')
            localStorage.removeItem('session_expiry')
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear corrupted data
        localStorage.removeItem('user')
        localStorage.removeItem('session_expiry')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const startSessionTimer = (duration) => {
    if (sessionTimer) clearTimeout(sessionTimer)
    
    const timer = setTimeout(() => {
      // Auto logout on session expiry
      logout()
      alert('Your session has expired. Please login again.')
    }, duration)
    
    setSessionTimer(timer)
  }

  const createSession = (userData, rememberMe = false) => {
    const sessionDuration = rememberMe ? 
      30 * 24 * 60 * 60 * 1000 : // 30 days
      24 * 60 * 60 * 1000 // 24 hours
    
    const expiryTime = new Date().getTime() + sessionDuration
    
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('session_expiry', expiryTime.toString())
    startSessionTimer(sessionDuration)
  }

  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true)
    try {
      // Enhanced API simulation with error handling
      await new Promise((resolve, reject) => 
        setTimeout(() => {
          Math.random() > 0.1 ? resolve() : reject(new Error('Network error'))
        }, 800 + Math.random() * 700)
      )
      
      // Multi-tier authentication logic
      if (email === 'demo@example.com' && password === 'password') {
        const userData = { 
          id: '1', 
          name: 'Demo User', 
          email,
          tier: 'premium',
          lastLogin: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff`
        }
        createSession(userData, rememberMe)
        return { success: true, user: userData }
      }
      
      return { 
        success: false, 
        error: 'Invalid credentials. Use demo@example.com / password' 
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Connection failed. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name, email, password, confirmPassword) => {
    setIsLoading(true)
    try {
      // Validation checks
      if (password !== confirmPassword) {
        return { success: false, error: 'Passwords do not match' }
      }
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }

      // Simulate API call with enhanced response
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      const userData = { 
        id: Date.now().toString(), 
        name, 
        email,
        tier: 'standard',
        joinDate: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`
      }
      
      createSession(userData)
      return { success: true, user: userData }
    } catch (error) {
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (sessionTimer) {
      clearTimeout(sessionTimer)
      setSessionTimer(null)
    }
    localStorage.removeItem('user')
    localStorage.removeItem('session_expiry')
    
    // Optional: Clear all auth-related data
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.startsWith('auth_')
    )
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  // Premium feature: Password reset simulation
  const resetPassword = async (email) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Simulate email sending
      return { 
        success: true, 
        message: 'Password reset instructions sent to your email' 
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to send reset instructions' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Premium feature: Update user profile
  const updateProfile = async (updates) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: 'Profile update failed' }
    } finally {
      setIsLoading(false)
    }
  }

  // Premium feature: Check authentication status
  const checkAuthStatus = () => {
    return !!user && !!localStorage.getItem('session_expiry')
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    checkAuthStatus,
    hasActiveSession: checkAuthStatus()
  }
}