import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { CheckCircle, XCircle, Shield, User, LogOut, Settings, Bell, CreditCard, Users, Database } from 'lucide-react';

// Premium Auth Context with enhanced features
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [permissions, setPermissions] = useState(new Set());
  const [notifications, setNotifications] = useState([]);

  // Enhanced user roles with permissions
  const userRoles = {
    admin: {
      name: 'Administrator',
      permissions: ['read', 'write', 'delete', 'manage_users', 'view_analytics', 'system_settings'],
      color: 'bg-red-500',
      icon: Shield
    },
    customer: {
      name: 'Customer',
      permissions: ['read', 'write'],
      color: 'bg-blue-500',
      icon: User
    },
    moderator: {
      name: 'Moderator',
      permissions: ['read', 'write', 'delete', 'manage_users'],
      color: 'bg-green-500',
      icon: Users
    },
    viewer: {
      name: 'Viewer',
      permissions: ['read'],
      color: 'bg-gray-500',
      icon: Database
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem('premium_user');
        const savedSession = localStorage.getItem('premium_session');
        const savedPermissions = localStorage.getItem('premium_permissions');

        if (savedUser && savedSession) {
          const userData = JSON.parse(savedUser);
          const sessionData = JSON.parse(savedSession);
          
          // Check if session is still valid
          if (new Date(sessionData.expiry) > new Date()) {
            setUser(userData);
            setSessionExpiry(sessionData.expiry);
            
            if (savedPermissions) {
              setPermissions(new Set(JSON.parse(savedPermissions)));
            } else {
              updatePermissions(userData.role);
            }

            // Start session countdown
            startSessionTimer(sessionData.expiry);
          } else {
            // Session expired, clear storage
            clearAuthStorage();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const clearAuthStorage = () => {
    localStorage.removeItem('premium_user');
    localStorage.removeItem('premium_session');
    localStorage.removeItem('premium_permissions');
  };

  const updatePermissions = (role) => {
    const rolePermissions = userRoles[role]?.permissions || [];
    setPermissions(new Set(rolePermissions));
    localStorage.setItem('premium_permissions', JSON.stringify(rolePermissions));
  };

  const startSessionTimer = (expiry) => {
    const timer = setInterval(() => {
      const now = new Date();
      const expiryDate = new Date(expiry);
      
      if (now >= expiryDate) {
        clearInterval(timer);
        logout('Session expired. Please login again.');
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  };

  const createSession = (userData) => {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24); // 24-hour session
    
    const sessionData = {
      created: new Date().toISOString(),
      expiry: expiry.toISOString()
    };

    setSessionExpiry(expiry.toISOString());
    localStorage.setItem('premium_session', JSON.stringify(sessionData));
    
    return sessionData;
  };

  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Enhanced login logic with more user types
      let userData = null;
      
      if (email === 'admin@example.com' && password === 'adminpass') {
        userData = { 
          id: 'admin01', 
          name: 'Admin User', 
          email: email, 
          role: 'admin',
          avatar: '/avatars/admin.jpg',
          joined: new Date().toISOString()
        };
      } else if (email === 'moderator@example.com' && password === 'modpass') {
        userData = { 
          id: 'mod01', 
          name: 'Moderator User', 
          email: email, 
          role: 'moderator',
          avatar: '/avatars/moderator.jpg',
          joined: new Date().toISOString()
        };
      } else if (email === 'demo@example.com' && password === 'password') {
        userData = { 
          id: 'user01', 
          name: 'Demo User', 
          email: email, 
          role: 'customer',
          avatar: '/avatars/user.jpg',
          joined: new Date().toISOString()
        };
      }

      if (userData) {
        setUser(userData);
        updatePermissions(userData.role);
        createSession(userData);
        
        if (rememberMe) {
          localStorage.setItem('premium_user', JSON.stringify(userData));
        }

        // Add login notification
        addNotification({
          type: 'success',
          title: 'Login Successful',
          message: `Welcome back, ${userData.name}!`,
          icon: CheckCircle
        });

        return { success: true, user: userData };
      }

      // Failed login
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid email or password',
        icon: XCircle
      });

      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login Error',
        message: 'An error occurred during login',
        icon: XCircle
      });
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (password !== confirmPassword) {
        addNotification({
          type: 'error',
          title: 'Registration Failed',
          message: 'Passwords do not match',
          icon: XCircle
        });
        return { success: false, error: 'Passwords do not match' };
      }

      const userData = { 
        id: Date.now().toString(),
        name, 
        email, 
        role: 'customer',
        avatar: `/avatars/default.jpg`,
        joined: new Date().toISOString()
      };

      setUser(userData);
      updatePermissions(userData.role);
      createSession(userData);
      localStorage.setItem('premium_user', JSON.stringify(userData));

      addNotification({
        type: 'success',
        title: 'Registration Successful',
        message: `Welcome to our platform, ${name}!`,
        icon: CheckCircle
      });

      return { success: true, user: userData };
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration Error',
        message: 'An error occurred during registration',
        icon: XCircle
      });
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (message = 'You have been logged out successfully') => {
    const userName = user?.name;
    setUser(null);
    setSessionExpiry(null);
    setPermissions(new Set());
    clearAuthStorage();

    addNotification({
      type: 'info',
      title: 'Logged Out',
      message: message,
      icon: LogOut
    });
  };

  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('premium_user', JSON.stringify(updatedUser));

      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully',
        icon: CheckCircle
      });

      return { success: true, user: updatedUser };
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update profile',
        icon: XCircle
      });
      return { success: false, error: 'Update failed' };
    }
  };

  const hasPermission = (permission) => {
    return permissions.has(permission);
  };

  const addNotification = (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { id, timestamp: new Date(), ...notification };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 latest
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getRemainingSessionTime = () => {
    if (!sessionExpiry) return null;
    const now = new Date();
    const expiry = new Date(sessionExpiry);
    return Math.max(0, expiry - now);
  };

  const value = {
    // Core auth state
    user,
    isAuthenticated: !!user,
    isLoading,
    
    // Auth methods
    login,
    register,
    logout,
    updateProfile,
    
    // Enhanced features
    userRole: userRoles[user?.role],
    hasPermission,
    permissions: Array.from(permissions),
    sessionExpiry,
    getRemainingSessionTime,
    
    // Notifications
    notifications,
    addNotification,
    clearNotifications,
    
    // Utility
    refreshSession: () => user && createSession(user)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Premium Auth UI Components
export const AuthGuard = ({ children, requiredPermission, fallback }) => {
  const { isAuthenticated, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Authentication Required
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to access this content.
        </p>
      </motion.div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Access Denied
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          You don't have permission to access this resource.
        </p>
      </motion.div>
    );
  }

  return children;
};

export const UserProfile = ({ className }) => {
  const { user, userRole, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name, email: user?.email });

  if (!user) return null;

  const RoleIcon = userRole?.icon || User;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx('bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6', className)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={clsx('w-16 h-16 rounded-full flex items-center justify-center text-white', userRole?.color)}>
            <RoleIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <span className={clsx('inline-block px-2 py-1 text-xs rounded-full text-white mt-1', userRole?.color)}>
              {userRole?.name}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Settings size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut size={16} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-4 mt-4"
          >
            <h4 className="font-semibold mb-3">Edit Profile</h4>
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Name"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Email"
              />
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    updateProfile(editForm);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Usage example:
/*
// In your main app:
<AuthProvider>
  <App />
</AuthProvider>

// Protecting routes:
<AuthGuard requiredPermission="manage_users">
  <AdminDashboard />
</AuthGuard>

// Using auth in components:
const { user, login, logout, hasPermission } = useAuth();

// User profile component:
<UserProfile className="max-w-md" />
*/