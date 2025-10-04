import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  variant = 'default',
  showNumbers = true,
  showEdgeButtons = false,
  showInfo = false,
  compact = false,
  size = 'md',
  ...props
}) => {
  if (totalPages <= 1) return null;

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, '...', lastPageIndex];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    
    return range(1, totalPages);
  };

  const pages = paginationRange();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const buttonSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };

  const pageSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const variantClasses = {
    default: {
      active: 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/25',
      inactive: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
    },
    outline: {
      active: 'border-primary-500 text-primary-500 bg-primary-50 dark:bg-primary-900/20',
      inactive: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
    },
    minimal: {
      active: 'bg-primary-500 text-white',
      inactive: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    },
    premium: {
      active: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 border-transparent',
      inactive: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10'
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={clsx('flex items-center justify-between', className)} {...props}>
      {/* Page Info */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={clsx('text-gray-600 dark:text-gray-400', sizeClasses[size])}
        >
          Page {currentPage} of {totalPages}
        </motion.div>
      )}

      {/* Pagination Controls */}
      <nav className={clsx('flex items-center space-x-1', compact && 'space-x-0')}>
        {/* First Page Button */}
        {showEdgeButtons && (
          <motion.button
            onClick={() => onPageChange(1)}
            disabled={isFirstPage}
            className={clsx(
              'rounded-lg border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
              buttonSizes[size],
              pageSizes[size],
              'flex items-center justify-center',
              variantClasses[variant].inactive,
              compact && 'rounded-r-none'
            )}
            whileHover={!isFirstPage ? { scale: 1.05 } : {}}
            whileTap={!isFirstPage ? { scale: 0.95 } : {}}
          >
            <ChevronsLeft size={size === 'lg' ? 20 : 16} />
          </motion.button>
        )}

        {/* Previous Button */}
        <motion.button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={clsx(
            'rounded-lg border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            buttonSizes[size],
            pageSizes[size],
            'flex items-center justify-center',
            variantClasses[variant].inactive,
            compact && showEdgeButtons ? 'rounded-l-none border-l-0' : '',
            compact && !showEdgeButtons ? 'rounded-r-none' : ''
          )}
          whileHover={!isFirstPage ? { scale: 1.05 } : {}}
          whileTap={!isFirstPage ? { scale: 0.95 } : {}}
        >
          <ChevronLeft size={size === 'lg' ? 20 : 16} />
        </motion.button>

        {/* Page Numbers */}
        {showNumbers && pages.map((page, index) =>
          page === '...' ? (
            <motion.span
              key={`dots-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={clsx(
                'flex items-center justify-center',
                pageSizes[size],
                'text-gray-500 dark:text-gray-400'
              )}
            >
              <MoreHorizontal size={size === 'lg' ? 20 : 16} />
            </motion.span>
          ) : (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={clsx(
                'rounded-lg border font-medium transition-all duration-200',
                pageSizes[size],
                'flex items-center justify-center',
                sizeClasses[size],
                currentPage === page 
                  ? variantClasses[variant].active
                  : variantClasses[variant].inactive,
                compact && 'rounded-none border-l-0 first:rounded-l-lg last:rounded-r-lg first:border-l'
              )}
              whileHover={currentPage !== page ? { scale: 1.05, y: -1 } : {}}
              whileTap={currentPage !== page ? { scale: 0.95 } : {}}
            >
              {page}
            </motion.button>
          )
        )}

        {/* Next Button */}
        <motion.button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={clsx(
            'rounded-lg border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            buttonSizes[size],
            pageSizes[size],
            'flex items-center justify-center',
            variantClasses[variant].inactive,
            compact && showEdgeButtons ? 'rounded-r-none border-r-0' : '',
            compact && !showEdgeButtons ? 'rounded-l-none' : ''
          )}
          whileHover={!isLastPage ? { scale: 1.05 } : {}}
          whileTap={!isLastPage ? { scale: 0.95 } : {}}
        >
          <ChevronRight size={size === 'lg' ? 20 : 16} />
        </motion.button>

        {/* Last Page Button */}
        {showEdgeButtons && (
          <motion.button
            onClick={() => onPageChange(totalPages)}
            disabled={isLastPage}
            className={clsx(
              'rounded-lg border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
              buttonSizes[size],
              pageSizes[size],
              'flex items-center justify-center',
              variantClasses[variant].inactive,
              compact && 'rounded-l-none'
            )}
            whileHover={!isLastPage ? { scale: 1.05 } : {}}
            whileTap={!isLastPage ? { scale: 0.95 } : {}}
          >
            <ChevronsRight size={size === 'lg' ? 20 : 16} />
          </motion.button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;

// Usage examples:
/*
// Basic pagination
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

// Premium pagination with all features
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="premium"
  size="lg"
  showNumbers={true}
  showEdgeButtons={true}
  showInfo={true}
  compact={false}
  siblingCount={1}
  className="my-8"
/>

// Compact minimal pagination
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="minimal"
  size="sm"
  showNumbers={false}
  showEdgeButtons={true}
  compact={true}
/>

// Outline variant with info
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="outline"
  showInfo={true}
  showEdgeButtons={true}
/>
*/