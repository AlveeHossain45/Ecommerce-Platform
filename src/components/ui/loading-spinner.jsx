import React from 'react';
import { clsx } from 'clsx';
const LoadingSpinner = ({ size = 'md', className }) => {
const sizeClasses = {
sm: 'w-4 h-4 border-2',
md: 'w-8 h-8 border-4',
lg: 'w-12 h-12 border-4'
};
return (
<div
className={clsx(
'animate-spin rounded-full border-gray-300 dark:border-gray-600 border-t-primary-500',
sizeClasses[size],
className
)}
/>
);
};
export const PageLoader = () => {
return (
<div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
<div className="text-center">
<LoadingSpinner size="lg" className="mx-auto mb-4" />
<p className="text-gray-600 dark:text-gray-400">Loading...</p>
</div>
</div>
);
};
export default LoadingSpinner;