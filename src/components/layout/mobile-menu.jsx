import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

const MobileMenu = ({ isOpen, onClose, navigationItems }) => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isActive = (href) => location.pathname === href;
  const handleItemClick = (itemName, hasChildren) => {
    if (hasChildren) setExpandedItem(expandedItem === itemName ? null : itemName);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><X size={24} /></button>
        </div>
        <nav className="py-4">
          {navigationItems.map((item) => (
            <div key={item.name}>
              <button onClick={() => handleItemClick(item.name, !!item.children)} className={clsx('flex items-center justify-between w-full px-4 py-3 text-left border-l-4 transition-colors', isActive(item.href) ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'border-transparent text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700')}>
                <span className="font-medium">{item.name}</span>
                {item.children && <ChevronRight size={16} className={clsx('transform transition-transform', expandedItem === item.name && 'rotate-90')} />}
              </button>
              {item.children && expandedItem === item.name && (
                <div className="bg-gray-50 dark:bg-gray-900/50">
                  {item.children.map((child) => (
                    <Link key={child.name} to={child.href} onClick={onClose} className={clsx('block px-8 py-3 text-sm border-l-4 transition-colors', isActive(child.href) ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'border-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800')}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;