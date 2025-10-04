import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { ChevronDown, Zap } from 'lucide-react';

const Navigation = ({ items, className, variant = "default" }) => {
  const location = useLocation();
  const isPremium = variant === "premium";

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <nav className={clsx('flex space-x-1', className)}>
      {items.map((item) => (
        <div key={item.name} className="relative group">
          <Link 
            to={item.href} 
            className={clsx(
              'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative',
              {
                // Premium active state
                'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 scale-105': isPremium && isActive(item.href),
                // Premium inactive state
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm': isPremium && !isActive(item.href),
                // Default active state
                'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20': !isPremium && isActive(item.href),
                // Default inactive state
                'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white': !isPremium && !isActive(item.href)
              }
            )}
          >
            {item.icon && (
              <span className={clsx('mr-2 transition-transform duration-300', {
                'scale-110': isPremium && isActive(item.href)
              })}>
                {item.icon}
              </span>
            )}
            {item.name}
            
            {isPremium && item.children && item.children.length > 0 && (
              <ChevronDown size={16} className="ml-2 transition-transform duration-300 group-hover:rotate-180" />
            )}

            {/* Premium active indicator */}
            {isPremium && isActive(item.href) && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            )}
          </Link>

          {/* Dropdown menu */}
          {item.children && item.children.length > 0 && (
            <div className={clsx(
              'absolute left-0 mt-2 min-w-56 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-left',
              {
                'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200 dark:border-gray-700': isPremium,
                'bg-white dark:bg-gray-800': !isPremium
              }
            )}>
              {/* Premium dropdown header */}
              {isPremium && (
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                </div>
              )}
              
              <div className={clsx('py-2', {
                'px-2': isPremium,
                'py-1': !isPremium
              })}>
                {item.children.map((child, index) => (
                  <Link 
                    key={child.name} 
                    to={child.href}
                    className={clsx(
                      'block transition-all duration-300 mx-2 rounded-lg',
                      {
                        // Premium dropdown items
                        'px-3 py-3 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-l-2 border-transparent hover:border-blue-500 group': isPremium,
                        // Default dropdown items
                        'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700': !isPremium
                      }
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {child.icon && (
                          <div className={clsx('p-1.5 rounded-lg transition-colors', {
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400': isPremium,
                            'text-gray-500': !isPremium
                          })}>
                            {child.icon}
                          </div>
                        )}
                        <span className="font-medium">{child.name}</span>
                      </div>
                      {isPremium && child.badge && (
                        <span className={clsx('px-2 py-1 text-xs rounded-full font-medium', {
                          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': child.badge === 'New',
                          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': child.badge === 'Popular',
                          'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300': child.badge === 'Updated'
                        })}>
                          {child.badge}
                        </span>
                      )}
                    </div>
                    {isPremium && child.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-9">
                        {child.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>

              {/* Premium dropdown footer */}
              {isPremium && (
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 rounded-b-xl">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>All features available</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Premium hover effect */}
          {isPremium && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;