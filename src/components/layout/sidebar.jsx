import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, ShoppingCart, Users, Package, Settings, BarChart3, CreditCard, Zap, Shield, Rocket } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = ({ items, isOpen, onToggle, variant = "default" }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState(new Set());
  const isPremium = variant === "premium";

  const toggleItem = (name) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) newSet.delete(name);
      else newSet.add(name);
      return newSet;
    });
  };

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  // Default items if none provided
  const defaultItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={20} />,
      badge: isPremium ? 'New' : null
    },
    {
      name: 'Products',
      href: '/products',
      icon: <Package size={20} />,
      children: [
        {
          name: 'All Products',
          href: '/products',
          icon: <Package size={18} />,
          badge: isPremium ? 'Updated' : null
        },
        {
          name: 'Categories',
          href: '/products/categories',
          icon: <BarChart3 size={18} />
        },
        {
          name: 'Inventory',
          href: '/products/inventory',
          icon: <BarChart3 size={18} />
        }
      ]
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: <ShoppingCart size={20} />,
      children: [
        {
          name: 'All Orders',
          href: '/orders',
          icon: <ShoppingCart size={18} />
        },
        {
          name: 'Pending',
          href: '/orders/pending',
          icon: <Clock size={18} />
        },
        {
          name: 'Completed',
          href: '/orders/completed',
          icon: <CheckCircle size={18} />
        }
      ]
    },
    {
      name: 'Customers',
      href: '/customers',
      icon: <Users size={20} />
    },
    {
      name: 'Billing',
      href: '/billing',
      icon: <CreditCard size={20} />,
      badge: isPremium ? 'Pro' : null
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
      children: [
        {
          name: 'General',
          href: '/settings/general',
          icon: <Settings size={18} />
        },
        {
          name: 'Security',
          href: '/settings/security',
          icon: <Shield size={18} />
        }
      ]
    }
  ];

  const navItems = items || defaultItems;

  const renderItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);
    const isItemActive = isActive(item.href);

    return (
      <div key={item.name}>
        <div 
          className={clsx(
            'flex items-center justify-between rounded-lg transition-all duration-300 cursor-pointer mx-2 my-1',
            {
              // Premium active state
              'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]': isPremium && isItemActive,
              // Premium inactive state
              'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm': isPremium && !isItemActive,
              // Default active state
              'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400': !isPremium && isItemActive,
              // Default inactive state
              'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700': !isPremium && !isItemActive
            },
            level === 0 ? 'px-3 py-3' : 'px-3 py-2'
          )}
          onClick={() => hasChildren && toggleItem(item.name)}
        >
          <Link 
            to={item.href} 
            className="flex items-center flex-1" 
            onClick={(e) => { if (hasChildren) e.preventDefault(); }}
          >
            {item.icon && (
              <span className={clsx('transition-transform duration-300', {
                'mr-3': level === 0,
                'mr-2': level > 0,
                'scale-110': isPremium && isItemActive
              })}>
                {item.icon}
              </span>
            )}
            <span className={clsx('font-medium', {
              'text-sm': level === 0,
              'text-xs': level > 0
            })}>
              {item.name}
            </span>
            
            {/* Premium active indicator */}
            {isPremium && isItemActive && (
              <div className="ml-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
            )}
          </Link>
          
          <div className="flex items-center space-x-2">
            {/* Badge */}
            {isPremium && item.badge && (
              <span className={clsx('px-2 py-1 text-xs rounded-full font-medium', {
                'bg-white/20 text-white': isItemActive,
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': !isItemActive && item.badge === 'New',
                'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': !isItemActive && item.badge === 'Updated',
                'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300': !isItemActive && item.badge === 'Pro'
              })}>
                {item.badge}
              </span>
            )}
            
            {/* Expand arrow */}
            {hasChildren && (
              <button className={clsx('p-1 transition-transform duration-300', {
                'text-white': isPremium && isItemActive,
                'text-gray-400': !isItemActive
              })}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
          </div>
        </div>
        
        {/* Children items */}
        {hasChildren && isExpanded && (
          <div className={clsx('ml-4 border-l transition-all duration-300', {
            'border-blue-200 dark:border-blue-800': isPremium,
            'border-gray-200 dark:border-gray-700': !isPremium
          })}>
            {item.children.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={clsx(
      'border-r transition-all duration-300 overflow-hidden h-full flex flex-col',
      {
        'bg-gradient-to-b from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl shadow-blue-500/10': isPremium,
        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700': !isPremium
      },
      isOpen ? 'w-64' : 'w-0'
    )}>
      {/* Header */}
      <div className={clsx('p-6 border-b', {
        'border-gray-200 dark:border-gray-700': isPremium,
        'border-gray-200 dark:border-gray-700': !isPremium
      })}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {isPremium && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket size={20} className="text-white" />
              </div>
            )}
            <h2 className={clsx('font-semibold', {
              'text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent': isPremium,
              'text-lg text-gray-900 dark:text-white': !isPremium
            })}>
              Navigation
            </h2>
          </div>
          <button 
            onClick={onToggle} 
            className={clsx('p-2 rounded-lg transition-all duration-300', {
              'hover:bg-white/50 dark:hover:bg-gray-700/50': isPremium,
              'hover:bg-gray-100 dark:hover:bg-gray-700': !isPremium
            })}
          >
            <ChevronDown size={20} className={clsx('transform rotate-90', {
              'text-gray-600 dark:text-gray-400': isPremium,
              'text-gray-500': !isPremium
            })} />
          </button>
        </div>
        
        {isPremium && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Online</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">All systems operational</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {navItems.map(item => renderItem(item))}
        </div>
      </div>

      {/* Premium Footer */}
      {isPremium && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap size={20} className="text-white" />
            </div>
            <h4 className="text-white font-semibold text-sm mb-1">Pro Features</h4>
            <p className="text-white/80 text-xs">Upgrade to unlock all features</p>
            <button className="mt-2 px-3 py-1.5 bg-white text-blue-600 rounded-full text-xs font-semibold hover:scale-105 transition-transform duration-200">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

// Missing icon components
const Clock = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircle = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Sidebar;