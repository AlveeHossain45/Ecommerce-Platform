import React from 'react';
import { clsx } from 'clsx';

const Skeleton = ({ className }) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        className
      )}
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="card p-4">
      <Skeleton className="w-full h-64 mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default Skeleton;