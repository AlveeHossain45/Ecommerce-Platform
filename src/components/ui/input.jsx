import React from 'react';
import { clsx } from 'clsx';

const Input = ({ error, className, ...props }) => {
  return (
    <div>
      <input
        className={clsx(
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
          'transition-colors duration-200',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Input;