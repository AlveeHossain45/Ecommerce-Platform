import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Home, ShoppingCart, Users, Package, Settings, BarChart3, CreditCard, Zap, Shield, Rocket, Star } from 'lucide-react';
import { clsx } from 'clsx';

const MobileMenu = ({ isOpen, onClose, navigationItems, variant = "default" }) => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);
  const isPremium = variant === "premium";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Default navigation items if none provided
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
    }
  ];

  const navItems = navigationItems || defaultItems;

  if (!isOpen) return null;

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`);
  
  const handleItemClick = (itemName, hasChildren) => {
    if (hasChildren) {
      setExpandedItem(expandedItem === itemName ? null : itemName);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className={clsx(
          "absolute inset-0 transition-all duration-300", 
          {
            "bg-black bg-opacity-50 backdrop-blur-sm": isPremium,
            "bg-black bg-opacity-50": !isPremium
          }
        )} 
        onClick={onClose} 
      />
      
      {/* Menu Panel */}
      <div className={clsx(
        "absolute right-0 top-0 h-full w-80 transform transition-all duration-300 ease-in-out",
        {
          "bg-gradient-to-b from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl shadow-blue-500/20": isPremium,
          "bg-white dark:bg-gray-800 shadow-xl": !isPremium
        }
      )}>
        {/* Header */}
        <div className={clsx(
          "flex items-center justify-between p-6 border-b",
          {
            "border-gray-200 dark:border-gray-700": isPremium,
            "border-gray-200 dark:border-gray-700": !isPremium
          }
        )}>
          <div className="flex items-center space-x-3">
            {isPremium && (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket size={24} className="text-white" />
              </div>
            )}
            <div>
              <h2 className={clsx(
                "font-semibold",
                {
                  "text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent": isPremium,
                  "text-lg text-gray-900 dark:text-white": !isPremium
                }
              )}>
                Navigation
              </h2>
              {isPremium && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Quick access menu
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className={clsx(
              "p-2 rounded-xl transition-all duration-300",
              {
                "hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-sm": isPremium,
                "hover:bg-gray-100 dark:hover:bg-gray-700": !isPremium
              }
            )}
          >
            <X size={24} className={isPremium ? "text-gray-600 dark:text-gray-400" : "text-gray-500"} />
          </button>
        </div>

        {/* Premium Status Bar */}
        {isPremium && (
          <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Online</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                <Star size={12} className="text-white" />
                <span className="text-xs font-medium text-white">Pro</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="py-4 overflow-y-auto h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isItemActive = isActive(item.href);
            const isItemExpanded = expandedItem === item.name;

            return (
              <div key={item.name}>
                {/* Main Item */}
                <button 
                  onClick={() => handleItemClick(item.name, hasChildren)}
                  className={clsx(
                    "flex items-center justify-between w-full px-6 py-4 text-left transition-all duration-300 border-l-4 mx-2 rounded-xl",
                    {
                      // Premium active state
                      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-blue-400 scale-[1.02]": isPremium && isItemActive,
                      // Premium inactive state
                      "border-transparent text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-sm hover:text-gray-900 dark:hover:text-white": isPremium && !isItemActive,
                      // Default active state
                      "border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400": !isPremium && isItemActive,
                      // Default inactive state
                      "border-transparent text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700": !isPremium && !isItemActive
                    }
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon && (
                      <span className={clsx("transition-transform duration-300", {
                        "scale-110": isPremium && isItemActive
                      })}>
                        {item.icon}
                      </span>
                    )}
                    <span className="font-medium text-sm">{item.name}</span>
                    
                    {/* Active indicator for premium */}
                    {isPremium && isItemActive && (
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Badge */}
                    {isPremium && item.badge && (
                      <span className={clsx(
                        "px-2 py-1 text-xs rounded-full font-medium",
                        {
                          "bg-white/20 text-white": isItemActive,
                          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300": !isItemActive && item.badge === 'New',
                          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300": !isItemActive && item.badge === 'Updated',
                          "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300": !isItemActive && item.badge === 'Pro'
                        }
                      )}>
                        {item.badge}
                      </span>
                    )}

                    {/* Expand arrow */}
                    {hasChildren && (
                      <ChevronRight 
                        size={18} 
                        className={clsx(
                          "transform transition-transform duration-300",
                          {
                            "text-white": isPremium && isItemActive,
                            "text-gray-400": !isItemActive,
                            "rotate-90": isItemExpanded
                          }
                        )} 
                      />
                    )}
                  </div>
                </button>

                {/* Children Items */}
                {hasChildren && isItemExpanded && (
                  <div className={clsx(
                    "ml-6 mt-1 border-l transition-all duration-300",
                    {
                      "border-blue-200 dark:border-blue-800": isPremium,
                      "border-gray-200 dark:border-gray-700": !isPremium
                    }
                  )}>
                    {item.children.map((child) => {
                      const isChildActive = isActive(child.href);
                      
                      return (
                        <Link 
                          key={child.name} 
                          to={child.href} 
                          onClick={onClose}
                          className={clsx(
                            "flex items-center justify-between w-full py-3 px-6 text-left transition-all duration-300 border-l-4 mx-2 rounded-lg",
                            {
                              // Premium child active state
                              "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-blue-400": isPremium && isChildActive,
                              // Premium child inactive state
                              "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30": isPremium && !isChildActive,
                              // Default child active state
                              "border-primary-400 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400": !isPremium && isChildActive,
                              // Default child inactive state
                              "border-transparent text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800": !isPremium && !isChildActive
                            }
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            {child.icon && (
                              <span className="text-current">
                                {child.icon}
                              </span>
                            )}
                            <span className="text-sm">{child.name}</span>
                          </div>
                          
                          {isPremium && child.badge && (
                            <span className={clsx(
                              "px-2 py-1 text-xs rounded-full font-medium",
                              {
                                "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300": child.badge === 'Updated',
                                "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300": child.badge === 'New'
                              }
                            )}>
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Premium Footer */}
        {isPremium && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap size={24} className="text-white" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Unlock Premium</h4>
              <p className="text-white/80 text-xs mb-3">Get access to all features</p>
              <button className="w-full px-4 py-2.5 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:scale-105 transition-transform duration-200 shadow-lg">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
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

export default MobileMenu;