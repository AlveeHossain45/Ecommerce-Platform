import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // --- LOGIN LOGIC ---
      if (email === 'admin@example.com' && password === 'adminpass') {
        const userData = { id: 'admin01', name: 'Admin User', email: email, role: 'admin' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      if (email === 'demo@example.com' && password === 'password') {
        const userData = { id: 'user01', name: 'Demo User', email: email, role: 'customer' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      // --- END LOGIN LOGIC ---
      
      return false; // If no match
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    // This function only logs in the new user, doesn't save them for future logins
    const userData = { id: Date.now().toString(), name, email, role: 'customer' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = { user, isAuthenticated: !!user, login, register, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);