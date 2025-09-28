import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Moon, Sun } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemsCount } = useCartContext();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gradient">UltraShop</Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors">Products</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500"><Search size={20} /></button>
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500">
              <ShoppingCart size={20} />
              {getCartItemsCount() > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{getCartItemsCount()}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2"><User size={20} /><span className="hidden sm:inline">{user?.name}</span></button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Orders</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/auth/login" className="btn-primary hidden sm:inline-flex">Login</Link>
            )}

            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary-500" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
              {!isAuthenticated && <Link to="/auth/login" className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;