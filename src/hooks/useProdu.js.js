import { useState, useEffect, useCallback, useRef } from 'react';
import { productAPI } from '../services/api/productAPI.js';

export const useProducts = (initialFilter = {}, options = {}) => {
  const {
    autoLoad = true,
    cacheEnabled = true,
    cacheTimeout = 5 * 60 * 1000, // 5 minutes
    debounceDelay = 300,
    enableRealtime = false,
    realtimeInterval = 30000, // 30 seconds
    maxRetries = 3,
    retryDelay = 1000,
    onProductsUpdate = null,
    onError = null
  } = options;

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilter);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 24,
    total: 0,
    totalPages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Refs for cache and realtime
  const cacheRef = useRef(new Map());
  const abortControllerRef = useRef(null);
  const realtimeIntervalRef = useRef(null);
  const retryCountRef = useRef(0);

  // Cache management
  const getCacheKey = useCallback((params = {}) => {
    const baseKey = JSON.stringify({
      filters,
      searchQuery,
      pagination: { page: pagination.page, limit: pagination.limit },
      sortBy,
      sortOrder,
      ...params
    });
    return `products_${btoa(baseKey)}`;
  }, [filters, searchQuery, pagination.page, pagination.limit, sortBy, sortOrder]);

  const isCacheValid = useCallback((cacheKey) => {
    if (!cacheEnabled) return false;
    const cached = cacheRef.current.get(cacheKey);
    if (!cached) return false;
    return Date.now() - cached.timestamp < cacheTimeout;
  }, [cacheEnabled, cacheTimeout]);

  const setCache = useCallback((cacheKey, data) => {
    if (cacheEnabled) {
      cacheRef.current.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }
  }, [cacheEnabled]);

  const clearCache = useCallback((pattern = null) => {
    if (pattern) {
      Array.from(cacheRef.current.keys()).forEach(key => {
        if (key.includes(pattern)) {
          cacheRef.current.delete(key);
        }
      });
    } else {
      cacheRef.current.clear();
    }
  }, []);

  // Enhanced product loading with retry logic
  const loadProducts = useCallback(async (overrideFilters = {}, options = {}) => {
    const {
      forceRefresh = false,
      silent = false,
      page = pagination.page,
      limit = pagination.limit
    } = options;

    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (!silent) {
        setLoading(true);
        setError(null);
      }

      retryCountRef.current = 0;

      const requestParams = {
        ...filters,
        ...overrideFilters,
        page,
        limit,
        search: searchQuery,
        sortBy,
        sortOrder,
        signal: abortControllerRef.current.signal
      };

      const cacheKey = getCacheKey({ ...overrideFilters, page, limit });

      // Check cache first
      if (!forceRefresh && isCacheValid(cacheKey)) {
        const cached = cacheRef.current.get(cacheKey);
        setProducts(cached.data.products);
        setPagination(cached.data.pagination);
        if (!silent) setLoading(false);
        onProductsUpdate?.(cached.data.products, 'cache');
        return cached.data;
      }

      const executeRequest = async () => {
        const response = await productAPI.getProducts(requestParams);
        
        // Validate response
        if (!response || !Array.isArray(response.products)) {
          throw new Error('Invalid response format');
        }

        const result = {
          products: response.products,
          pagination: response.pagination || {
            page,
            limit,
            total: response.total || response.products.length,
            totalPages: Math.ceil((response.total || response.products.length) / limit)
          }
        };

        // Update cache
        setCache(cacheKey, result);

        // Update state
        setProducts(result.products);
        setPagination(result.pagination);
        if (!silent) setLoading(false);

        onProductsUpdate?.(result.products, 'api');
        retryCountRef.current = 0;

        return result;
      };

      return await executeRequest();

    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was cancelled
      }

      // Retry logic
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        await new Promise(resolve => setTimeout(resolve, retryDelay * retryCountRef.current));
        return loadProducts(overrideFilters, { ...options, silent: true });
      }

      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      if (!silent) setLoading(false);
      onError?.(errorMessage, err);
      throw err;
    }
  }, [filters, searchQuery, pagination.page, pagination.limit, sortBy, sortOrder, getCacheKey, isCacheValid, setCache, maxRetries, retryDelay, onProductsUpdate, onError]);

  // Debounced search
  const searchProducts = useCallback(async (query, searchOptions = {}) => {
    const {
      immediate = false,
      ...loadOptions
    } = searchOptions;

    setSearchQuery(query);

    if (immediate || !query.trim()) {
      return loadProducts({ search: query }, loadOptions);
    }

    // Debounced search
    const timeoutId = setTimeout(() => {
      loadProducts({ search: query }, loadOptions);
    }, debounceDelay);

    return () => clearTimeout(timeoutId);
  }, [loadProducts, debounceDelay]);

  // Filter management
  const updateFilters = useCallback((newFilters, options = {}) => {
    const { merge = true, resetPagination = true } = options;
    
    setFilters(prev => merge ? { ...prev, ...newFilters } : newFilters);
    
    if (resetPagination) {
      setPagination(prev => ({ ...prev, page: 1 }));
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilter);
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
    clearCache();
  }, [initialFilter, clearCache]);

  // Pagination controls
  const goToPage = useCallback((page) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const changePageSize = useCallback((limit) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
  }, []);

  // Sorting
  const updateSorting = useCallback((field, order = 'asc') => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  const toggleSortOrder = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  // Real-time updates
  useEffect(() => {
    if (enableRealtime && !loading) {
      realtimeIntervalRef.current = setInterval(() => {
        loadProducts({}, { silent: true, forceRefresh: true });
      }, realtimeInterval);

      return () => {
        if (realtimeIntervalRef.current) {
          clearInterval(realtimeIntervalRef.current);
        }
      };
    }
  }, [enableRealtime, realtimeInterval, loadProducts, loading]);

  // Auto-load on dependencies change
  useEffect(() => {
    if (autoLoad) {
      loadProducts();
    }
  }, [filters, pagination.page, pagination.limit, sortBy, sortOrder, autoLoad, loadProducts]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (realtimeIntervalRef.current) {
        clearInterval(realtimeIntervalRef.current);
      }
    };
  }, []);

  // Product mutations
  const createProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      const newProduct = await productAPI.createProduct(productData);
      
      // Update local state optimistically
      setProducts(prev => [newProduct, ...prev]);
      clearCache(); // Invalidate cache
      
      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product';
      setError(errorMessage);
      onError?.(errorMessage, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearCache, onError]);

  const updateProduct = useCallback(async (productId, updates) => {
    try {
      setLoading(true);
      const updatedProduct = await productAPI.updateProduct(productId, updates);
      
      // Update local state optimistically
      setProducts(prev => prev.map(product =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      ));
      clearCache(); // Invalidate cache
      
      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      onError?.(errorMessage, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearCache, onError]);

  const deleteProduct = useCallback(async (productId) => {
    try {
      setLoading(true);
      await productAPI.deleteProduct(productId);
      
      // Update local state optimistically
      setProducts(prev => prev.filter(product => product.id !== productId));
      clearCache(); // Invalidate cache
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      setError(errorMessage);
      onError?.(errorMessage, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearCache, onError]);

  // Analytics and metrics
  const getProductStats = useCallback(() => {
    const totalProducts = pagination.total || products.length;
    const inStock = products.filter(p => p.stock > 0).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    const averagePrice = products.length > 0 
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
      : 0;

    return {
      totalProducts,
      inStock,
      outOfStock,
      lowStock,
      averagePrice: Math.round(averagePrice * 100) / 100,
      stockRatio: totalProducts > 0 ? (inStock / totalProducts) * 100 : 0
    };
  }, [products, pagination.total]);

  return {
    // Core state
    products,
    loading,
    error,
    filters,
    searchQuery,
    
    // Pagination
    pagination,
    goToPage,
    changePageSize,
    
    // Sorting
    sortBy,
    sortOrder,
    updateSorting,
    toggleSortOrder,
    
    // Search and filters
    searchProducts,
    updateFilters,
    clearFilters,
    
    // Data operations
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: () => loadProducts({}, { forceRefresh: true }),
    
    // Cache management
    clearCache,
    cacheEnabled,
    
    // Analytics
    getProductStats,
    
    // Utility flags
    hasProducts: products.length > 0,
    isEmpty: products.length === 0,
    isSearching: !!searchQuery.trim(),
    hasFilters: Object.keys(filters).length > 0,
    canLoadMore: pagination.page < pagination.totalPages,
    
    // Real-time status
    realtimeEnabled: enableRealtime
  };
};

// Specialized hook variants
export const useFeaturedProducts = (options = {}) => {
  return useProducts({ featured: true }, { ...options, autoLoad: true });
};

export const useProductSearch = (initialQuery = '', options = {}) => {
  const { searchProducts, ...productHook } = useProducts({}, {
    ...options,
    autoLoad: false
  });

  useEffect(() => {
    if (initialQuery) {
      searchProducts(initialQuery, { immediate: true });
    }
  }, [initialQuery, searchProducts]);

  return {
    ...productHook,
    searchProducts
  };
};

export const useProductById = (productId, options = {}) => {
  const { products, loading, error, refetch } = useProducts({}, {
    ...options,
    autoLoad: false
  });

  const product = products.find(p => p.id === productId) || null;

  useEffect(() => {
    if (productId) {
      refetch();
    }
  }, [productId, refetch]);

  return {
    product,
    loading,
    error,
    refetch,
    exists: !!product
  };
};

export default useProducts;