import React from 'react';
import { clsx } from 'clsx';

const Card = ({ children, className }) => {
  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
      className
    )}>
      {children}
    </div>
  );
};

export default Card;