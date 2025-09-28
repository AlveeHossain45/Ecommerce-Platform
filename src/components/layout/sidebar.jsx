import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = ({ items, isOpen, onToggle }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (name) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) newSet.delete(name);
      else newSet.add(name);
      return newSet;
    });
  };

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  const renderItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);
    const isItemActive = isActive(item.href);

    return (
      <div key={item.name}>
        <div className={clsx('flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer', isItemActive ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700', level > 0 && 'ml-4')} onClick={() => hasChildren && toggleItem(item.name)}>
          <Link to={item.href} className="flex items-center flex-1" onClick={(e) => { if (hasChildren) e.preventDefault(); }}>
            {item.icon && <span className="mr-3">{item.icon}</span>}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
          {hasChildren && <button className="p-1">{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</button>}
        </div>
        {hasChildren && isExpanded && <div className="mt-1">{item.children.map(child => renderItem(child, level + 1))}</div>}
      </div>
    );
  };

  return (
    <aside className={clsx('bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden', isOpen ? 'w-64' : 'w-0')}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button onClick={onToggle} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><ChevronDown size={20} className="transform rotate-90" /></button>
        </div>
        <nav className="space-y-1">{items.map(item => renderItem(item))}</nav>
      </div>
    </aside>
  );
};

export default Sidebar;