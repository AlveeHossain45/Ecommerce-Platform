import { useState, useEffect } from 'react';
import { productAPI } from '../services/api/productAPI.js';

export const useProducts = (initialFilter) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilter || {});

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getProducts(filters);
      setProducts(response.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadProducts();
  }, [filters]);


  const searchProducts = async (query) => {
    try {
      setLoading(true);
      const results = await productAPI.searchProducts(query);
      setProducts(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(initialFilter || {});
  };

  return {
    products,
    loading,
    error,
    filters,
    searchProducts,
    updateFilters,
    clearFilters,
    refetch: loadProducts
  };
};