import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const Navigation = ({ items, className }) => {
  const location = useLocation();
  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <nav className={clsx('flex space-x-8', className)}>
      {items.map((item) => (
        <div key={item.name} className="relative group">
          <Link to={item.href} className={clsx('flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors', isActive(item.href) ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20' : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white')}>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.name}
          </Link>
          {item.children && item.children.length > 0 && (
            <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="py-1">
                {item.children.map((child) => (
                  <Link key={child.name} to={child.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;