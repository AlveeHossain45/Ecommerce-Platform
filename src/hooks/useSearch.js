import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from './useDebounce.js';

export const useSearch = (initialValue = '', delay = 300, options = {}) => {
  const {
    autoSearch = true,
    minLength = 1,
    maxLength = 100,
    enableSuggestions = false,
    suggestionLimit = 5,
    searchOnType = true,
    preserveHistory = false,
    historyLimit = 10,
    onSearchStart = null,
    onSearchComplete = null,
    onSearchError = null,
    onResultsChange = null,
    validator = null,
    transformer = null
  } = options;

  // State management
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState(null);
  const [searchMetrics, setSearchMetrics] = useState({
    totalSearches: 0,
    lastSearchTime: null,
    averageSearchTime: 0
  });

  // Refs
  const searchStartTimeRef = useRef(null);
  const searchControllerRef = useRef(null);
  const lastSearchTermRef = useRef('');

  // Enhanced debounce with abort capability
  const { debouncedValue: internalDebouncedTerm, cancel: cancelDebounce } = useDebounce(
    searchTerm, 
    delay, 
    { leading: false, trailing: true, maxWait: delay * 2 }
  );

  // Input validation
  const validateSearchTerm = useCallback((term) => {
    if (term.length < minLength) {
      return { isValid: false, error: `Search must be at least ${minLength} characters` };
    }
    if (term.length > maxLength) {
      return { isValid: false, error: `Search must be less than ${maxLength} characters` };
    }
    if (validator && !validator(term)) {
      return { isValid: false, error: 'Search term is invalid' };
    }
    return { isValid: true, error: null };
  }, [minLength, maxLength, validator]);

  // Search history management
  const addToSearchHistory = useCallback((term) => {
    if (!preserveHistory || !term.trim()) return;
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== term);
      const updated = [term, ...filtered].slice(0, historyLimit);
      return updated;
    });
  }, [preserveHistory, historyLimit]);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  // Transform search term if needed
  const transformSearchTerm = useCallback((term) => {
    if (transformer) {
      return transformer(term);
    }
    return term.trim().toLowerCase();
  }, [transformer]);

  // Core search execution
  const executeSearch = useCallback(async (term, options = {}) => {
    const {
      isSuggestion = false,
      force = false,
      silent = false
    } = options;

    // Cancel previous search
    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
    }

    // Validate search term
    const validation = validateSearchTerm(term);
    if (!validation.isValid) {
      if (!silent) {
        setError(validation.error);
        setIsSearching(false);
      }
      return [];
    }

    const transformedTerm = transformSearchTerm(term);

    // Skip if same as last search
    if (!force && lastSearchTermRef.current === transformedTerm) {
      return results;
    }

    // Setup new search
    searchControllerRef.current = new AbortController();
    lastSearchTermRef.current = transformedTerm;

    if (!silent) {
      setIsSearching(true);
      setError(null);
      searchStartTimeRef.current = Date.now();
      onSearchStart?.(transformedTerm, isSuggestion);
    }

    try {
      // Simulate API call - replace with actual search implementation
      const searchPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (searchControllerRef.current?.signal.aborted) {
            reject(new Error('Search cancelled'));
            return;
          }

          // Mock search results - replace with actual API call
          const mockResults = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
            id: `${transformedTerm}-${i}`,
            title: `Result for "${transformedTerm}" #${i + 1}`,
            relevance: Math.random(),
            category: ['tech', 'sports', 'news', 'entertainment'][i % 4]
          }));

          resolve(mockResults);
        }, 500 + Math.random() * 1000); // Simulate network delay
      });

      const searchResults = await searchPromise;

      if (!silent) {
        if (isSuggestion) {
          setSuggestions(searchResults.slice(0, suggestionLimit));
        } else {
          setResults(searchResults);
          setSuggestions([]);
          setDebouncedSearchTerm(transformedTerm);
          addToSearchHistory(transformedTerm);
          
          // Update metrics
          const searchTime = Date.now() - searchStartTimeRef.current;
          setSearchMetrics(prev => ({
            totalSearches: prev.totalSearches + 1,
            lastSearchTime: Date.now(),
            averageSearchTime: prev.totalSearches > 0 
              ? (prev.averageSearchTime * prev.totalSearches + searchTime) / (prev.totalSearches + 1)
              : searchTime
          }));

          onSearchComplete?.(searchResults, transformedTerm, searchTime);
          onResultsChange?.(searchResults, transformedTerm);
        }
      }

      return searchResults;

    } catch (err) {
      if (err.name !== 'AbortError' && !silent) {
        const errorMsg = err.message || 'Search failed';
        setError(errorMsg);
        onSearchError?.(errorMsg, transformedTerm, err);
      }
      return [];
    } finally {
      if (!silent) {
        setIsSearching(false);
        searchControllerRef.current = null;
      }
    }
  }, [
    validateSearchTerm,
    transformSearchTerm,
    results,
    suggestionLimit,
    addToSearchHistory,
    onSearchStart,
    onSearchComplete,
    onSearchError,
    onResultsChange
  ]);

  // Auto-search effect
  useEffect(() => {
    if (!autoSearch || !internalDebouncedTerm) return;

    const term = internalDebouncedTerm.trim();
    if (!term) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    executeSearch(term, { isSuggestion: enableSuggestions });
  }, [internalDebouncedTerm, autoSearch, enableSuggestions, executeSearch]);

  // Suggestion effect
  useEffect(() => {
    if (!enableSuggestions || !searchTerm || searchTerm.length < minLength) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.trim();
    if (term && term !== lastSearchTermRef.current) {
      executeSearch(term, { isSuggestion: true, silent: true });
    }
  }, [searchTerm, enableSuggestions, minLength, executeSearch]);

  // Enhanced search term setter
  const setSearchTermWithValidation = useCallback((value) => {
    const validation = validateSearchTerm(value);
    if (validation.isValid || value === '') {
      setError(null);
      setSearchTerm(value);
    } else {
      setError(validation.error);
    }
  }, [validateSearchTerm]);

  // Manual search trigger
  const triggerSearch = useCallback(async (customTerm = null) => {
    const term = customTerm || searchTerm;
    return await executeSearch(term, { force: true });
  }, [searchTerm, executeSearch]);

  // Quick search for common terms
  const quickSearch = useCallback(async (term) => {
    setSearchTerm(term);
    return await executeSearch(term, { force: true });
  }, [executeSearch]);

  // Cancel ongoing search
  const cancelSearch = useCallback(() => {
    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
    }
    cancelDebounce();
    setIsSearching(false);
    setError(null);
  }, [cancelDebounce]);

  // Clear everything
  const clearSearch = useCallback(() => {
    cancelSearch();
    setSearchTerm('');
    setResults([]);
    setSuggestions([]);
    setError(null);
    setDebouncedSearchTerm('');
  }, [cancelSearch]);

  // Reset to initial state
  const resetSearch = useCallback(() => {
    clearSearch();
    setSearchHistory([]);
    setSearchMetrics({
      totalSearches: 0,
      lastSearchTime: null,
      averageSearchTime: 0
    });
  }, [clearSearch]);

  // Get search analytics
  const getSearchAnalytics = useCallback(() => ({
    ...searchMetrics,
    currentTerm: searchTerm,
    debouncedTerm: debouncedSearchTerm,
    hasResults: results.length > 0,
    hasSuggestions: suggestions.length > 0,
    historyCount: searchHistory.length,
    isActive: isSearching || debouncedSearchTerm.length > 0
  }), [searchMetrics, searchTerm, debouncedSearchTerm, results.length, suggestions.length, searchHistory.length, isSearching]);

  return {
    // Core state
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    results,
    suggestions,
    error,
    
    // Search history
    searchHistory,
    clearSearchHistory,
    
    // Search actions
    setSearchTerm: setSearchTermWithValidation,
    triggerSearch,
    quickSearch,
    cancelSearch,
    clearSearch,
    resetSearch,
    
    // Analytics
    getSearchAnalytics,
    searchMetrics,
    
    // Utility flags and getters
    hasResults: results.length > 0,
    hasSuggestions: suggestions.length > 0,
    hasHistory: searchHistory.length > 0,
    isEmpty: !searchTerm && results.length === 0,
    isValid: validateSearchTerm(searchTerm).isValid,
    isDebouncing: searchTerm !== debouncedSearchTerm,
    
    // Configuration info
    config: {
      delay,
      minLength,
      maxLength,
      autoSearch,
      enableSuggestions,
      preserveHistory
    }
  };
};

// Specialized hook variants
export const useQuickSearch = (initialValue = '', delay = 150) => {
  return useSearch(initialValue, delay, {
    minLength: 0,
    enableSuggestions: true,
    searchOnType: true
  });
};

export const useAdvancedSearch = (initialValue = '', delay = 500) => {
  return useSearch(initialValue, delay, {
    minLength: 2,
    enableSuggestions: true,
    preserveHistory: true,
    historyLimit: 20,
    validator: (term) => term.length >= 2 && /^[a-zA-Z0-9\s]+$/.test(term)
  });
};

export const useSearchWithFilters = (initialValue = '', delay = 400) => {
  const searchHook = useSearch(initialValue, delay);
  const [filters, setFilters] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = searchHook.results;
      
      // Apply your filter logic here
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filtered = filtered.filter(item => item[key] === value);
        }
      });
      
      setFilteredResults(filtered);
    };

    applyFilters();
  }, [searchHook.results, filters]);

  const updateFilter = useCallback((filterKey, filterValue) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterValue
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    ...searchHook,
    filters,
    filteredResults,
    updateFilter,
    clearFilters,
    hasActiveFilters: Object.values(filters).some(value => value !== null && value !== undefined && value !== '')
  };
};

export default useSearch;