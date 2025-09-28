import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { clsx } from 'clsx';
import { Tooltip } from '../ui/tooltip.jsx';

const CompareButton = ({ productId, className, onCompare }) => {
  const [isInCompare, setIsInCompare] = useState(false);

  const handleCompareToggle = () => {
    setIsInCompare(!isInCompare);
    onCompare?.(productId);
  };

  return (
    <Tooltip content={isInCompare ? "Remove from compare" : "Add to compare"}>
      <button
        onClick={handleCompareToggle}
        className={clsx(
          'flex items-center justify-center p-2 rounded-full border transition-all duration-200',
          'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          isInCompare
            ? 'bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100'
            : 'bg-white border-gray-300 text-gray-400 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700',
          className
        )}
      >
        <BarChart3 size={20} />
      </button>
    </Tooltip>
  );
};

export default CompareButton;