import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Moon, Sun, Heart, Package, ChevronDown } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import CartSidebar from '../cart/cart-sidebar.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getCartItemsCount } = useCartContext();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const userMenuItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Package, label: 'Orders', path: '/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' }
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-sm border-b border-gray-100/50 dark:border-gray-800/50' 
            : 'bg-white dark:bg-gray-900 border-b border-gray-100/30 dark:border-gray-800/30'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0"
            >
              <Link 
                to="/" 
                className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight"
              >
                EliteShop
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 mx-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-gray-900 dark:text-white bg-gray-50/80 dark:bg-gray-800/80'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gray-900 dark:bg-white rounded-full"
                        layoutId="navIndicator"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="relative w-full">
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/80 border-0 rounded-2xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
                  />
                  <Search 
                    size={18} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <AnimatePresence>
                    {isSearchFocused && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 ring-1 ring-gray-300 dark:ring-gray-600 rounded-2xl pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              
              {/* Search Button - Mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
                onClick={() => navigate('/search')}
              >
                <Search size={18} />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 12 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>

              {/* Wishlist */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
                  onClick={() => navigate('/wishlist')}
                >
                  <Heart size={18} />
                </motion.button>
              )}

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
              >
                <ShoppingCart size={18} />
                {getCartItemsCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-sm"
                  >
                    {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu */}
              {isAuthenticated ? (
                <motion.div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 rounded-full flex items-center justify-center text-white dark:text-gray-900 font-medium text-xs sm:text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-800/50 overflow-hidden z-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="p-4 border-b border-gray-100/50 dark:border-gray-800/50">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          {userMenuItems.map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                to={item.path}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors duration-200 group"
                              >
                                <item.icon size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                              </Link>
                            </motion.div>
                          ))}
                          <motion.button
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: userMenuItems.length * 0.1 }}
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50/80 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200 mt-2"
                          >
                            <span className="text-sm font-medium">Sign Out</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/auth/login" 
                    className="hidden sm:inline-flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-l border-gray-100/50 dark:border-gray-800/50 z-50 lg:hidden overflow-y-auto"
              >
                <div className="p-6">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      EliteShop
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/80 border-0 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
                      />
                      <Search 
                        size={18} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2 mb-8">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            location.pathname === item.path
                              ? 'bg-gray-50/80 dark:bg-gray-800/80 text-gray-900 dark:text-white'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Auth Section */}
                  {!isAuthenticated ? (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="border-t border-gray-100/50 dark:border-gray-800/50 pt-6"
                    >
                      <Link
                        to="/auth/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full inline-flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-3"
                      >
                        <User size={16} />
                        <span>Sign In</span>
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        New customer?{' '}
                        <Link to="/auth/register" className="text-gray-700 dark:text-gray-300 hover:underline">
                          Create account
                        </Link>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="border-t border-gray-100/50 dark:border-gray-800/50 pt-6"
                    >
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;