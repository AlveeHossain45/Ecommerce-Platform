import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage(key, initialValue, options = {}) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    sync = true,
    compression = false,
    encryption = false,
    ttl = null, // Time to live in milliseconds
    version = '1.0.0',
    validate = null,
    onError = (error) => console.error(`LocalStorage error for key "${key}":`, error),
    onMigrate = null
  } = options;

  const [storedValue, setStoredValue] = useState(() => {
    return getInitialValue(key, initialValue, deserializer, validate, onError);
  });

  const [isPersisting, setIsPersisting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  
  const valueRef = useRef(storedValue);
  const keyRef = useRef(key);

  // Enhanced initial value loader with migration support
  function getInitialValue(key, initialValue, deserializer, validate, onError) {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = deserializer(item);
      
      // Check if data is expired
      if (isExpired(parsed)) {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      // Validate data structure if validator provided
      if (validate && !validate(parsed.data)) {
        throw new Error('Data validation failed');
      }

      // Handle version migration
      if (parsed._version && parsed._version !== version && onMigrate) {
        const migrated = onMigrate(parsed.data, parsed._version, version);
        return migrated;
      }

      return parsed.data || parsed;
    } catch (error) {
      onError(error);
      return initialValue;
    }
  }

  // TTL expiration check
  function isExpired(parsed) {
    if (!parsed || typeof parsed !== 'object') return false;
    if (!parsed._timestamp || !ttl) return false;
    
    return Date.now() - parsed._timestamp > ttl;
  }

  // Enhanced setter with advanced features
  const setValue = useCallback((value) => {
    try {
      setIsPersisting(true);
      setError(null);

      const valueToStore = value instanceof Function ? value(valueRef.current) : value;
      
      // Prepare data with metadata
      const storageData = {
        data: valueToStore,
        _timestamp: Date.now(),
        _version: version,
        _key: key
      };

      // Compress if enabled
      let dataToStore = compression ? compress(storageData) : storageData;
      
      // Encrypt if enabled
      if (encryption) {
        dataToStore = encrypt(dataToStore);
      }

      const serialized = serializer(dataToStore);
      
      window.localStorage.setItem(key, serialized);
      
      setStoredValue(valueToStore);
      valueRef.current = valueToStore;
      setLastUpdated(Date.now());
      
    } catch (error) {
      const enhancedError = new Error(`Failed to set localStorage key "${key}": ${error.message}`);
      setError(enhancedError);
      onError(enhancedError);
    } finally {
      setIsPersisting(false);
    }
  }, [key, serializer, compression, encryption, version, onError]);

  // Remove item with cleanup
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      valueRef.current = initialValue;
      setLastUpdated(Date.now());
      setError(null);
    } catch (error) {
      const enhancedError = new Error(`Failed to remove localStorage key "${key}": ${error.message}`);
      setError(enhancedError);
      onError(enhancedError);
    }
  }, [key, initialValue, onError]);

  // Clear all items with prefix
  const clearWithPrefix = useCallback((prefix = '') => {
    try {
      Object.keys(window.localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => window.localStorage.removeItem(k));
      setLastUpdated(Date.now());
    } catch (error) {
      const enhancedError = new Error(`Failed to clear localStorage with prefix "${prefix}": ${error.message}`);
      setError(enhancedError);
      onError(enhancedError);
    }
  }, [onError]);

  // Get item size in bytes
  const getSize = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? new Blob([item]).size : 0;
    } catch (error) {
      onError(error);
      return 0;
    }
  }, [key, onError]);

  // Check if item exists
  const exists = useCallback(() => {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      onError(error);
      return false;
    }
  }, [key, onError]);

  // Sync across tabs
  useEffect(() => {
    if (!sync) return;

    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== event.oldValue) {
        try {
          const newValue = deserializer(event.newValue);
          setStoredValue(newValue?.data || newValue);
          valueRef.current = newValue?.data || newValue;
          setLastUpdated(Date.now());
        } catch (error) {
          onError(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, sync, deserializer, onError]);

  // Auto-cleanup expired items
  useEffect(() => {
    if (!ttl) return;

    const interval = setInterval(() => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = deserializer(item);
          if (isExpired(parsed)) {
            removeValue();
          }
        }
      } catch (error) {
        onError(error);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [key, ttl, deserializer, removeValue, onError]);

  // Key change handler
  useEffect(() => {
    if (key !== keyRef.current) {
      const newValue = getInitialValue(key, initialValue, deserializer, validate, onError);
      setStoredValue(newValue);
      valueRef.current = newValue;
      keyRef.current = key;
    }
  }, [key, initialValue, deserializer, validate, onError]);

  // Utility functions (simplified implementations)
  function compress(data) {
    // Simple compression - in real app, use libraries like lz-string
    try {
      return {
        ...data,
        _compressed: true
      };
    } catch (error) {
      onError(error);
      return data;
    }
  }

  function encrypt(data) {
    // Simple encryption placeholder - in real app, use Web Crypto API
    try {
      return {
        ...data,
        _encrypted: true
      };
    } catch (error) {
      onError(error);
      return data;
    }
  }

  // Batch operations
  const setMultiple = useCallback((keyValuePairs) => {
    try {
      Object.entries(keyValuePairs).forEach(([k, v]) => {
        const storageData = {
          data: v,
          _timestamp: Date.now(),
          _version: version
        };
        window.localStorage.setItem(k, serializer(storageData));
      });
      setLastUpdated(Date.now());
    } catch (error) {
      const enhancedError = new Error(`Failed to set multiple localStorage items: ${error.message}`);
      setError(enhancedError);
      onError(enhancedError);
    }
  }, [serializer, version, onError]);

  const getMultiple = useCallback((keys) => {
    try {
      return keys.reduce((acc, k) => {
        const item = window.localStorage.getItem(k);
        if (item) {
          acc[k] = deserializer(item)?.data;
        }
        return acc;
      }, {});
    } catch (error) {
      onError(error);
      return {};
    }
  }, [deserializer, onError]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearWithPrefix,
    getSize,
    exists,
    setMultiple,
    getMultiple,
    
    // Metadata
    isPersisting,
    lastUpdated,
    error,
    hasError: !!error,
    
    // Utility functions
    refresh: () => {
      const newValue = getInitialValue(key, initialValue, deserializer, validate, onError);
      setStoredValue(newValue);
      valueRef.current = newValue;
    },
    
    // Statistics
    getQuota: () => {
      try {
        let total = 0;
        for (let key in window.localStorage) {
          if (window.localStorage.hasOwnProperty(key)) {
            total += window.localStorage[key].length;
          }
        }
        return {
          used: total,
          remaining: 5 * 1024 * 1024 - total, // 5MB limit
          percentage: (total / (5 * 1024 * 1024)) * 100
        };
      } catch (error) {
        onError(error);
        return { used: 0, remaining: 0, percentage: 0 };
      }
    }
  };
}

// Specialized hook variants
export function useSessionStorage(key, initialValue, options = {}) {
  return useLocalStorage(key, initialValue, {
    ...options,
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined
  });
}

export function useEncryptedStorage(key, initialValue, options = {}) {
  return useLocalStorage(key, initialValue, {
    ...options,
    encryption: true
  });
}

export function useTTLStorage(key, initialValue, ttl, options = {}) {
  return useLocalStorage(key, initialValue, {
    ...options,
    ttl
  });
}

export function useJSONStorage(key, initialValue, options = {}) {
  return useLocalStorage(key, initialValue, {
    ...options,
    serializer: (value) => JSON.stringify(value, null, 2), // Pretty print
    deserializer: JSON.parse
  });
}

// Batch operations hook
export function useBatchLocalStorage(initialItems = {}, options = {}) {
  const [items, setItems] = useState(initialItems);
  
  const { setMultiple, getMultiple, removeValue, clearWithPrefix } = useLocalStorage('_batch', null, options);

  const setBatch = useCallback((updates) => {
    setMultiple(updates);
    setItems(prev => ({ ...prev, ...updates }));
  }, [setMultiple]);

  const removeBatch = useCallback((keys) => {
    keys.forEach(key => removeValue(key));
    setItems(prev => {
      const newItems = { ...prev };
      keys.forEach(key => delete newItems[key]);
      return newItems;
    });
  }, [removeValue]);

  const refreshBatch = useCallback((keys) => {
    const updated = getMultiple(keys);
    setItems(prev => ({ ...prev, ...updated }));
  }, [getMultiple]);

  return {
    items,
    setBatch,
    removeBatch,
    refreshBatch,
    clearWithPrefix
  };
}

export default useLocalStorage;