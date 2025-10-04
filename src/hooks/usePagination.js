import { useState, useMemo, useCallback, useEffect } from 'react';

export const usePagination = (
  items,
  itemsPerPage = 12,
  options = {}
) => {
  const {
    initialPage = 1,
    persistKey = null,
    maxPageButtons = 7,
    infiniteScroll = false,
    autoReset = true,
    onPageChange = null,
    onPageSizeChange = null
  } = options;

  // State management with persistence
  const [currentPage, setCurrentPage] = useState(() => {
    if (persistKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`pagination-${persistKey}`);
      if (saved) {
        const { page, timestamp } = JSON.parse(saved);
        // Check if saved state is still valid (within 24 hours)
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          return Math.max(1, Math.min(page, Math.ceil(items.length / itemsPerPage)));
        }
      }
    }
    return initialPage;
  });

  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visitedPages, setVisitedPages] = useState(new Set([initialPage]));

  // Calculate derived values
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);
  const totalItems = items.length;

  // Current page items with memoization
  const currentItems = useMemo(() => {
    if (infiniteScroll) {
      // For infinite scroll, return all items up to current page
      return items.slice(0, endIndex);
    }
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex, infiniteScroll]);

  // Auto-reset to first page when items change significantly
  useEffect(() => {
    if (autoReset && items.length > 0) {
      const shouldReset = currentPage > totalPages || 
                         (items.length > 0 && currentItems.length === 0);
      if (shouldReset) {
        setCurrentPage(1);
      }
    }
  }, [items.length, totalPages, currentPage, autoReset, currentItems.length]);

  // Persistence effect
  useEffect(() => {
    if (persistKey && typeof window !== 'undefined') {
      localStorage.setItem(`pagination-${persistKey}`, JSON.stringify({
        page: currentPage,
        pageSize,
        timestamp: Date.now()
      }));
    }
  }, [currentPage, pageSize, persistKey]);

  // Enhanced navigation methods
  const goToPage = useCallback((page, options = {}) => {
    const { scrollToTop = true, smoothScroll = false } = options;
    
    const newPage = Math.max(1, Math.min(page, totalPages));
    
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setVisitedPages(prev => new Set([...prev, newPage]));
      
      if (scrollToTop && typeof window !== 'undefined') {
        const scrollOptions = smoothScroll ? { behavior: 'smooth' } : {};
        window.scrollTo({ top: 0, left: 0, ...scrollOptions });
      }
      
      onPageChange?.(newPage, currentPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const nextPage = useCallback((options = {}) => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1, options);
    }
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback((options = {}) => {
    if (currentPage > 1) {
      goToPage(currentPage - 1, options);
    }
  }, [currentPage, goToPage]);

  const goToFirst = useCallback((options = {}) => {
    goToPage(1, options);
  }, [goToPage]);

  const goToLast = useCallback((options = {}) => {
    goToPage(totalPages, options);
  }, [goToPage, totalPages]);

  // Page size management
  const changePageSize = useCallback((newSize) => {
    const newPageSize = Math.max(1, newSize);
    const newTotalPages = Math.ceil(items.length / newPageSize);
    
    // Adjust current page if it becomes invalid
    const adjustedPage = Math.min(currentPage, newTotalPages);
    
    setPageSize(newPageSize);
    setCurrentPage(adjustedPage);
    
    onPageSizeChange?.(newPageSize, pageSize);
  }, [items.length, currentPage, pageSize, onPageSizeChange]);

  // Pagination range calculation (smart page numbers)
  const paginationRange = useMemo(() => {
    const delta = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxPageButtons - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxPageButtons) {
      start = Math.max(1, end - maxPageButtons + 1);
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis logic
    const rangeWithDots = [];
    if (pages[0] > 1) {
      rangeWithDots.push(1);
      if (pages[0] > 2) {
        rangeWithDots.push('...');
      }
    }
    
    rangeWithDots.push(...pages);
    
    if (pages[pages.length - 1] < totalPages) {
      if (pages[pages.length - 1] < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }
    
    return rangeWithDots;
  }, [currentPage, totalPages, maxPageButtons]);

  // Infinite scroll functionality
  const loadMore = useCallback(() => {
    if (infiniteScroll && currentPage < totalPages) {
      nextPage({ scrollToTop: false });
    }
  }, [infiniteScroll, currentPage, totalPages, nextPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevPage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextPage();
          break;
        case 'Home':
          event.preventDefault();
          goToFirst();
          break;
        case 'End':
          event.preventDefault();
          goToLast();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevPage, nextPage, goToFirst, goToLast]);

  // Analytics and metrics
  const paginationMetrics = useMemo(() => ({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    startIndex: startIndex + 1, // 1-based for display
    endIndex,
    itemsOnPage: currentItems.length,
    percentageComplete: totalItems > 0 ? (endIndex / totalItems) * 100 : 0,
    hasVisitedAllPages: visitedPages.size === totalPages,
    mostVisitedPage: Array.from(visitedPages).reduce((a, b) => 
      visitedPages.has(a) ? a : b, 1
    )
  }), [currentPage, totalPages, pageSize, totalItems, startIndex, endIndex, currentItems.length, visitedPages]);

  // Bulk actions
  const selectAllOnPage = useCallback(() => {
    return currentItems;
  }, [currentItems]);

  const getItemsForPages = useCallback((pages) => {
    return pages.flatMap(page => {
      const pageStart = (page - 1) * pageSize;
      const pageEnd = pageStart + pageSize;
      return items.slice(pageStart, pageEnd);
    });
  }, [items, pageSize]);

  // Export functionality
  const exportCurrentPage = useCallback((formatter = JSON.stringify) => {
    return formatter({
      data: currentItems,
      metadata: {
        page: currentPage,
        pageSize,
        totalPages,
        exportedAt: new Date().toISOString()
      }
    });
  }, [currentItems, currentPage, pageSize, totalPages]);

  // Reset functionality
  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(itemsPerPage);
    setVisitedPages(new Set([initialPage]));
  }, [initialPage, itemsPerPage]);

  return {
    // Core pagination state
    currentPage,
    totalPages,
    currentItems,
    
    // Navigation methods
    goToPage,
    nextPage,
    prevPage,
    goToFirst,
    goToLast,
    
    // Page size management
    pageSize,
    changePageSize,
    availablePageSizes: [10, 12, 25, 50, 100],
    
    // UI helpers
    paginationRange,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    
    // Infinite scroll
    infiniteScroll,
    loadMore,
    canLoadMore: infiniteScroll && currentPage < totalPages,
    
    // Analytics and metrics
    metrics: paginationMetrics,
    
    // Bulk operations
    selectAllOnPage,
    getItemsForPages,
    
    // Export
    exportCurrentPage,
    
    // Reset
    reset,
    
    // Additional utilities
    startIndex: startIndex + 1, // 1-based for display
    endIndex,
    totalItems,
    itemsOnPage: currentItems.length,
    
    // Status flags
    isEmpty: items.length === 0,
    isSinglePage: totalPages <= 1,
    hasMultiplePages: totalPages > 1
  };
};

// Specialized hook variants
export const useInfinitePagination = (items, itemsPerPage = 12, options = {}) => {
  return usePagination(items, itemsPerPage, {
    ...options,
    infiniteScroll: true
  });
};

export const usePersistentPagination = (items, itemsPerPage = 12, persistKey, options = {}) => {
  return usePagination(items, itemsPerPage, {
    ...options,
    persistKey
  });
};

export const useURLPagination = (items, itemsPerPage = 12, paramName = 'page', options = {}) => {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const page = parseInt(urlParams.get(paramName) || '1');
      return Math.max(1, page);
    }
    return 1;
  });

  const pagination = usePagination(items, itemsPerPage, {
    ...options,
    initialPage: currentPage
  });

  // Sync with URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (pagination.currentPage === 1) {
        url.searchParams.delete(paramName);
      } else {
        url.searchParams.set(paramName, pagination.currentPage.toString());
      }
      
      window.history.replaceState({}, '', url);
    }
  }, [pagination.currentPage, paramName]);

  return pagination;
};

export default usePagination;