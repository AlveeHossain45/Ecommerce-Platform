import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce.js';

export const useSearch = (initialValue = '', delay = 300) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      // Here you would typically trigger the search API call
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching,
    clearSearch
  };
};