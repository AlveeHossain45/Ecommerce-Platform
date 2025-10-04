import { useState, useEffect, useRef, useCallback } from 'react';

export function useDebounce(value, delay, options = {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [lastImmediateValue, setLastImmediateValue] = useState(value);
  const timeoutRef = useRef(null);
  const firstRenderRef = useRef(true);

  const {
    leading = false,
    trailing = true,
    maxWait,
    equalityFn = (a, b) => a === b
  } = options;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsDebouncing(false);
    }
  }, []);

  const flush = useCallback(() => {
    cancel();
    setDebouncedValue(value);
    setLastImmediateValue(value);
  }, [value, cancel]);

  // Enhanced debounce logic with multiple strategies
  useEffect(() => {
    let shouldSetImmediately = false;
    let maxWaitTimeout = null;

    // Skip first render if configured
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    // Clear existing timeouts
    cancel();

    // Leading edge invocation
    if (leading && !equalityFn(value, lastImmediateValue)) {
      setDebouncedValue(value);
      setLastImmediateValue(value);
    }

    // Max wait timeout
    if (maxWait) {
      maxWaitTimeout = setTimeout(() => {
        if (!equalityFn(value, debouncedValue)) {
          setDebouncedValue(value);
          setLastImmediateValue(value);
          setIsDebouncing(false);
        }
        timeoutRef.current = null;
      }, maxWait);
    }

    // Main debounce timeout
    if (!equalityFn(value, debouncedValue)) {
      setIsDebouncing(true);
      
      timeoutRef.current = setTimeout(() => {
        if (trailing) {
          setDebouncedValue(value);
          setLastImmediateValue(value);
        }
        setIsDebouncing(false);
        timeoutRef.current = null;
      }, delay);
    }

    return () => {
      cancel();
      if (maxWaitTimeout) {
        clearTimeout(maxWaitTimeout);
      }
    };
  }, [value, delay, leading, trailing, maxWait, equalityFn, debouncedValue, lastImmediateValue, cancel]);

  // Immediate value update (bypass debounce)
  const updateImmediately = useCallback((newValue) => {
    cancel();
    setDebouncedValue(newValue);
    setLastImmediateValue(newValue);
    setIsDebouncing(false);
  }, [cancel]);

  // Reset to initial state
  const reset = useCallback(() => {
    cancel();
    setDebouncedValue(value);
    setLastImmediateValue(value);
    setIsDebouncing(false);
  }, [value, cancel]);

  return {
    debouncedValue,
    isDebouncing,
    cancel,
    flush,
    updateImmediately,
    reset,
    lastImmediateValue
  };
}

// Premium hook variants for common use cases
export function useDebouncedCallback(callback, delay, dependencies = []) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay, ...dependencies]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const flush = useCallback((...args) => {
    cancel();
    callbackRef.current(...args);
  }, [cancel]);

  return [debouncedCallback, cancel, flush];
}

export function useThrottle(value, interval, options = {}) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedRef = useRef(Date.now());
  const timeoutRef = useRef(null);

  const { leading = true, trailing = true } = options;

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutedRef.current;

    if (leading && timeSinceLastExecution >= interval) {
      setThrottledValue(value);
      lastExecutedRef.current = now;
    } else if (trailing) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecutedRef.current = Date.now();
      }, interval - timeSinceLastExecution);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval, leading, trailing]);

  return throttledValue;
}

// Advanced composition hook for complex scenarios
export function useSmartDebounce(value, delay, options = {}) {
  const {
    mode = 'default', // 'default', 'aggressive', 'lazy'
    enableAdaptive = false,
    minDelay = 100,
    maxDelay = 2000,
    ...debounceOptions
  } = options;

  const [adaptiveDelay, setAdaptiveDelay] = useState(delay);
  const valueChangeCount = useRef(0);
  const lastChangeTime = useRef(Date.now());

  // Adaptive delay based on user behavior
  useEffect(() => {
    if (enableAdaptive) {
      const now = Date.now();
      const timeSinceLastChange = now - lastChangeTime.current;
      
      if (timeSinceLastChange < 500) { // Rapid changes
        valueChangeCount.current += 1;
        
        if (valueChangeCount.current > 3) {
          setAdaptiveDelay(Math.min(maxDelay, adaptiveDelay * 1.5));
        }
      } else {
        valueChangeCount.current = 0;
        setAdaptiveDelay(delay);
      }
      
      lastChangeTime.current = now;
    }
  }, [value, enableAdaptive, delay, maxDelay, adaptiveDelay]);

  // Mode-based configurations
  const getModeConfig = () => {
    const modes = {
      default: { leading: false, trailing: true },
      aggressive: { leading: true, trailing: false, maxWait: delay * 2 },
      lazy: { leading: false, trailing: true, maxWait: delay * 3 }
    };
    return modes[mode] || modes.default;
  };

  const modeConfig = getModeConfig();
  const finalOptions = { ...modeConfig, ...debounceOptions };

  const debounceResult = useDebounce(
    value, 
    enableAdaptive ? adaptiveDelay : delay, 
    finalOptions
  );

  return {
    ...debounceResult,
    adaptiveDelay: enableAdaptive ? adaptiveDelay : delay,
    mode,
    isAdaptive: enableAdaptive
  };
}

// Utility hook for search/autocomplete scenarios
export function useSearchDebounce(searchTerm, delay = 300) {
  const {
    debouncedValue: debouncedSearch,
    isDebouncing,
    cancel
  } = useDebounce(searchTerm, delay, {
    leading: false,
    trailing: true
  });

  const isSearching = isDebouncing || searchTerm !== debouncedSearch;

  return {
    searchTerm: debouncedSearch,
    isSearching,
    cancelSearch: cancel,
    hasSearchTerm: !!searchTerm.trim(),
    isStale: searchTerm !== debouncedSearch
  };
}

// Performance monitoring hook
export function useDebounceWithMetrics(value, delay, options = {}) {
  const invocationCount = useRef(0);
  const lastInvocationTime = useRef(null);
  const [metrics, setMetrics] = useState({
    totalInvocations: 0,
    averageDelay: 0,
    lastExecutionTime: null
  });

  const debounceResult = useDebounce(value, delay, {
    ...options,
    onFlush: () => {
      const now = Date.now();
      const executionTime = lastInvocationTime.current ? 
        now - lastInvocationTime.current : 0;
      
      setMetrics(prev => ({
        totalInvocations: prev.totalInvocations + 1,
        averageDelay: prev.totalInvocations > 0 ? 
          (prev.averageDelay * prev.totalInvocations + executionTime) / (prev.totalInvocations + 1) : 
          executionTime,
        lastExecutionTime: now
      }));
      
      lastInvocationTime.current = now;
    }
  });

  return {
    ...debounceResult,
    metrics
  };
}

export default useDebounce;