import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
  enabled = true,
  triggerOnce = false,
  delay = 0,
  trackVisibility = false,
  trackRatio = false,
  onEnter,
  onLeave,
  onVisible,
  onHidden,
  onChange
} = {}) => {
  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const targetRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);

  const frozen = useMemo(() => 
    entry?.isIntersecting && freezeOnceVisible, 
    [entry?.isIntersecting, freezeOnceVisible]
  );

  // Enhanced callback handlers with debouncing
  const handleIntersection = useCallback(([newEntry]) => {
    if (!newEntry) return;

    const wasVisible = isVisible;
    const nowVisible = newEntry.isIntersecting;
    const ratio = newEntry.intersectionRatio;
    
    setEntry(newEntry);
    setVisibilityRatio(ratio);

    // Delayed execution for performance
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // Basic visibility state
      setIsVisible(nowVisible);

      // Callback handlers with lifecycle tracking
      if (onChange) {
        onChange(newEntry, { wasVisible, nowVisible, ratio });
      }

      // Enter/Leave callbacks
      if (!wasVisible && nowVisible && onEnter) {
        onEnter(newEntry);
      }
      
      if (wasVisible && !nowVisible && onLeave) {
        onLeave(newEntry);
      }

      // Visibility state callbacks
      if (nowVisible && onVisible) {
        onVisible(newEntry);
        
        // Trigger once functionality
        if (triggerOnce && !hasTriggered) {
          setHasTriggered(true);
        }
      }
      
      if (!nowVisible && onHidden) {
        onHidden(newEntry);
      }

    }, delay);
  }, [
    isVisible, 
    onChange, 
    onEnter, 
    onLeave, 
    onVisible, 
    onHidden, 
    delay, 
    triggerOnce, 
    hasTriggered
  ]);

  // Advanced observer initialization
  useEffect(() => {
    const element = targetRef.current;
    if (!element || !enabled || frozen) {
      setIsInitialized(false);
      return;
    }

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const options = {
      threshold: Array.isArray(threshold) ? threshold : [threshold],
      root,
      rootMargin,
      trackVisibility: trackVisibility && 'IntersectionObserver' in window && 
                      'isVisible' in IntersectionObserverEntry.prototype,
      delay: Math.max(0, delay)
    };

    try {
      observerRef.current = new IntersectionObserver(handleIntersection, options);
      observerRef.current.observe(element);
      setIsInitialized(true);
    } catch (error) {
      console.error('IntersectionObserver initialization failed:', error);
      setIsInitialized(false);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsInitialized(false);
    };
  }, [
    threshold,
    root,
    rootMargin,
    freezeOnceVisible,
    enabled,
    trackVisibility,
    delay,
    frozen,
    handleIntersection
  ]);

  // Manual control methods
  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
      setIsInitialized(false);
    }
  }, []);

  const reconnect = useCallback(() => {
    if (targetRef.current && enabled && !frozen && !observerRef.current) {
      const element = targetRef.current;
      const options = {
        threshold: Array.isArray(threshold) ? threshold : [threshold],
        root,
        rootMargin,
        trackVisibility: trackVisibility && 'IntersectionObserver' in window && 
                        'isVisible' in IntersectionObserverEntry.prototype,
        delay: Math.max(0, delay)
      };
      
      observerRef.current = new IntersectionObserver(handleIntersection, options);
      observerRef.current.observe(element);
      setIsInitialized(true);
    }
  }, [
    threshold,
    root,
    rootMargin,
    trackVisibility,
    delay,
    enabled,
    frozen,
    handleIntersection
  ]);

  const refresh = useCallback(() => {
    disconnect();
    setTimeout(reconnect, 10);
  }, [disconnect, reconnect]);

  // Utility getters
  const intersectionRatio = useMemo(() => 
    entry?.intersectionRatio ?? 0, 
    [entry?.intersectionRatio]
  );

  const isFullyVisible = useMemo(() => 
    isVisible && intersectionRatio >= 0.99, 
    [isVisible, intersectionRatio]
  );

  const isPartiallyVisible = useMemo(() => 
    isVisible && intersectionRatio > 0 && intersectionRatio < 0.99, 
    [isVisible, intersectionRatio]
  );

  const visibilityPercentage = useMemo(() => 
    Math.round(intersectionRatio * 100), 
    [intersectionRatio]
  );

  const boundingRect = useMemo(() => 
    entry?.boundingClientRect ?? null, 
    [entry?.boundingClientRect]
  );

  const rootBounds = useMemo(() => 
    entry?.rootBounds ?? null, 
    [entry?.rootBounds]
  );

  // Performance monitoring
  const [metrics, setMetrics] = useState({
    observationCount: 0,
    firstVisibleTime: null,
    totalVisibleTime: 0,
    lastVisibilityChange: null
  });

  useEffect(() => {
    if (isVisible) {
      setMetrics(prev => ({
        ...prev,
        observationCount: prev.observationCount + 1,
        firstVisibleTime: prev.firstVisibleTime || Date.now(),
        lastVisibilityChange: Date.now()
      }));
    } else if (metrics.lastVisibilityChange) {
      const visibleDuration = Date.now() - metrics.lastVisibilityChange;
      setMetrics(prev => ({
        ...prev,
        totalVisibleTime: prev.totalVisibleTime + visibleDuration,
        lastVisibilityChange: null
      }));
    }
  }, [isVisible]);

  // Multiple targets support
  const [observedElements, setObservedElements] = useState(new Map());
  
  const observeElement = useCallback((element, customId = null) => {
    if (!element || !observerRef.current) return null;
    
    const id = customId || `obs-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    observerRef.current.observe(element);
    setObservedElements(prev => new Map(prev.set(id, element)));
    
    return id;
  }, []);

  const unobserveElement = useCallback((id) => {
    const element = observedElements.get(id);
    if (element && observerRef.current) {
      observerRef.current.unobserve(element);
      setObservedElements(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }
  }, [observedElements]);

  return {
    // Core functionality
    targetRef,
    isVisible,
    entry,
    
    // Enhanced state
    visibilityRatio: intersectionRatio,
    visibilityPercentage,
    isFullyVisible,
    isPartiallyVisible,
    hasTriggered,
    isInitialized,
    
    // Geometry data
    boundingRect,
    rootBounds,
    
    // Metrics and analytics
    metrics,
    
    // Manual controls
    disconnect,
    reconnect,
    refresh,
    
    // Multi-target support
    observeElement,
    unobserveElement,
    observedElements: Array.from(observedElements.keys()),
    
    // Utility flags
    isSupported: typeof IntersectionObserver !== 'undefined',
    isTracking: isInitialized && !frozen,
    
    // Quick status checkers
    isAboveViewport: entry ? entry.boundingClientRect.top < 0 : false,
    isBelowViewport: entry ? entry.boundingClientRect.bottom > (window.innerHeight || 0) : false,
    isInViewport: isVisible && boundingRect !== null
  };
};

// Specialized hook variants
export const useLazyLoad = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
    ...observerOptions
  } = options;

  const intersection = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: once,
    ...observerOptions
  });

  return {
    ...intersection,
    shouldLoad: intersection.isVisible || intersection.hasTriggered,
    isLoaded: intersection.hasTriggered
  };
};

export const useScrollSpy = (selectors, options = {}) => {
  const [activeId, setActiveId] = useState('');
  const [elements, setElements] = useState([]);
  
  const { threshold = 0.5, rootMargin = '-20% 0px -80% 0px' } = options;

  useEffect(() => {
    if (typeof selectors === 'string') {
      setElements(Array.from(document.querySelectorAll(selectors)));
    } else if (Array.isArray(selectors)) {
      setElements(selectors.flatMap(selector => 
        Array.from(document.querySelectorAll(selector))
      ));
    }
  }, [selectors]);

  const handleIntersection = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        setActiveId(entry.target.id);
      }
    });
  }, [threshold]);

  const { observeElement, unobserveElement } = useIntersectionObserver({
    threshold,
    rootMargin,
    onChange: handleIntersection
  });

  useEffect(() => {
    elements.forEach(element => {
      if (element.id) {
        observeElement(element, element.id);
      }
    });

    return () => {
      elements.forEach(element => {
        if (element.id) {
          unobserveElement(element.id);
        }
      });
    };
  }, [elements, observeElement, unobserveElement]);

  return {
    activeId,
    elements: elements.map(el => ({ id: el.id, element: el })),
    isActive: (id) => activeId === id
  };
};

export const useViewportTracker = (options = {}) => {
  const {
    trackEnter = true,
    trackLeave = true,
    trackProgress = false,
    ...observerOptions
  } = options;

  const [viewportState, setViewportState] = useState({
    isInViewport: false,
    entryTime: null,
    exitTime: null,
    progress: 0
  });

  const handleChange = useCallback((entry, { wasVisible, nowVisible }) => {
    setViewportState(prev => {
      const newState = { ...prev };
      
      if (trackEnter && !wasVisible && nowVisible) {
        newState.entryTime = Date.now();
        newState.isInViewport = true;
      }
      
      if (trackLeave && wasVisible && !nowVisible) {
        newState.exitTime = Date.now();
        newState.isInViewport = false;
      }
      
      if (trackProgress && nowVisible) {
        newState.progress = Math.min(100, Math.round(entry.intersectionRatio * 100));
      }
      
      return newState;
    });
  }, [trackEnter, trackLeave, trackProgress]);

  return {
    ...useIntersectionObserver({
      onChange: handleChange,
      ...observerOptions
    }),
    viewportState,
    timeInViewport: viewportState.entryTime ? 
      (viewportState.exitTime || Date.now()) - viewportState.entryTime : 0
  };
};

export default useIntersectionObserver;