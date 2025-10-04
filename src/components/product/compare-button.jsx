import React, { useState, useEffect } from 'react';
import { BarChart3, Sparkles, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { Tooltip } from '../ui/tooltip.jsx';

const CompareButton = ({ productId, className, onCompare, isPremium = false }) => {
  const [isInCompare, setIsInCompare] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCompareToggle = () => {
    if (!isInCompare) {
      setIsAnimating(true);
    }
    setIsInCompare(!isInCompare);
    onCompare?.(productId);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <Tooltip 
      content={
        <div className="flex items-center gap-1">
          {isInCompare ? "Remove from comparison" : "Add to comparison"}
          {isPremium && <Sparkles size={12} className="text-amber-400" />}
        </div>
      }
    >
      <button
        onClick={handleCompareToggle}
        className={clsx(
          'group relative flex items-center justify-center p-2 rounded-full border transition-all duration-300',
          'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu',
          'backdrop-blur-sm shadow-sm hover:shadow-md',
          isInCompare
            ? [
                'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/80 text-blue-600',
                'hover:from-blue-100 hover:to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
                'dark:border-blue-500/30 dark:text-blue-400 focus:ring-blue-500'
              ]
            : [
                'bg-white/80 border-gray-200/80 text-gray-500 hover:bg-white',
                'dark:bg-gray-800/80 dark:border-gray-600/80 dark:text-gray-400 dark:hover:bg-gray-700/80',
                'focus:ring-gray-400 dark:focus:ring-gray-500'
              ],
          isPremium && [
            'shadow-lg hover:shadow-xl',
            isInCompare 
              ? 'ring-1 ring-blue-200/50 dark:ring-blue-500/20' 
              : 'ring-1 ring-gray-200/30 dark:ring-gray-600/30'
          ],
          isAnimating && 'animate-pulse-scale',
          className
        )}
      >
        {/* Premium shimmer effect */}
        {isPremium && (
          <div className={clsx(
            'absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            isInCompare && 'via-blue-50/50 dark:via-blue-900/20'
          )} />
        )}
        
        {/* Animated checkmark for added state */}
        <div className="relative flex items-center justify-center">
          <BarChart3 
            size={20} 
            className={clsx(
              'transition-all duration-300',
              isInCompare && 'scale-110'
            )} 
          />
          
          {/* Success checkmark */}
          {isInCompare && (
            <Check 
              size={14} 
              className={clsx(
                'absolute -top-1 -right-1 text-white bg-blue-500 rounded-full p-0.5',
                'transition-all duration-300 transform-gpu',
                isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              )}
            />
          )}
        </div>

        {/* Premium badge */}
        {isPremium && !isInCompare && (
          <div className="absolute -top-1 -right-1">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-0.5">
              <Sparkles size={8} className="text-white" />
            </div>
          </div>
        )}
      </button>
    </Tooltip>
  );
};

// Add CSS for the custom animation
const styles = `
@keyframes pulse-scale {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.animate-pulse-scale {
  animation: pulse-scale 0.6s ease-in-out;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CompareButton;