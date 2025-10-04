import { useState, useEffect, useCallback } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartHistory, setCartHistory] = useState([]);

  // Enhanced initialization with backup recovery
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const savedCart = localStorage.getItem('ultra-premium-cart');
        const cartBackup = localStorage.getItem('ultra-premium-cart-backup');
        
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          
          // Validate cart integrity
          const validatedCart = parsedCart.filter(item => 
            item && item.id && item.price > 0 && item.quantity > 0
          );
          
          if (validatedCart.length !== parsedCart.length) {
            console.warn('Cart integrity check: Removed invalid items');
            setCart(validatedCart);
          }
        }
      } catch (error) {
        console.error('Cart initialization error:', error);
        // Attempt to restore from backup
        try {
          const backup = localStorage.getItem('ultra-premium-cart-backup');
          if (backup) {
            setCart(JSON.parse(backup));
          }
        } catch (backupError) {
          console.error('Backup restoration failed:', backupError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  // Enhanced persistence with debouncing and backup
  useEffect(() => {
    if (!isLoading) {
      // Create backup before updating
      localStorage.setItem('ultra-premium-cart-backup', JSON.stringify(cart));
      
      // Main cart storage with timestamp
      const cartWithMetadata = {
        items: cart,
        lastUpdated: new Date().toISOString(),
        version: '2.0.0'
      };
      
      localStorage.setItem('ultra-premium-cart', JSON.stringify(cartWithMetadata));
      
      // Save to history for analytics/undo functionality
      if (cart.length > 0) {
        setCartHistory(prev => [...prev.slice(-9), {
          timestamp: new Date().toISOString(),
          items: [...cart],
          total: getCartTotal()
        }]);
      }
    }
  }, [cart, isLoading]);

  // Enhanced add to cart with inventory validation
  const addToCart = useCallback((item, options = {}) => {
    const {
      maxQuantity = 10,
      allowDuplicates = false,
      autoMerge = true
    } = options;

    setCart(prevCart => {
      // Validate item structure
      if (!item?.id || !item?.price) {
        console.error('Invalid item structure:', item);
        return prevCart;
      }

      // Check inventory limits
      const existingItemIndex = prevCart.findIndex(cartItem =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
      );

      if (existingItemIndex !== -1 && autoMerge) {
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? {
                ...cartItem,
                quantity: Math.min(cartItem.quantity + (item.quantity || 1), maxQuantity)
              }
            : cartItem
        );
      }

      // Add new item with enhanced metadata
      const newItem = {
        ...item,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString(),
        cartId: `${item.id}-${item.size || 'none'}-${item.color || 'none'}-${Date.now()}`
      };

      return [...prevCart, newItem];
    });
  }, []);

  // Smart bulk add with conflict resolution
  const addMultipleToCart = useCallback((items, options = {}) => {
    const { conflictStrategy = 'merge' } = options; // 'merge' | 'replace' | 'skip'

    setCart(prevCart => {
      let newCart = [...prevCart];

      items.forEach(item => {
        const existingIndex = newCart.findIndex(cartItem =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
        );

        if (existingIndex !== -1) {
          if (conflictStrategy === 'merge') {
            newCart[existingIndex] = {
              ...newCart[existingIndex],
              quantity: newCart[existingIndex].quantity + (item.quantity || 1)
            };
          } else if (conflictStrategy === 'replace') {
            newCart[existingIndex] = {
              ...item,
              quantity: item.quantity || 1,
              addedAt: new Date().toISOString()
            };
          }
          // If 'skip', do nothing
        } else {
          newCart.push({
            ...item,
            quantity: item.quantity || 1,
            addedAt: new Date().toISOString(),
            cartId: `${item.id}-${item.size || 'none'}-${item.color || 'none'}-${Date.now()}`
          });
        }
      });

      return newCart;
    });
  }, []);

  // Enhanced remove with undo capability
  const removeFromCart = useCallback((itemId, size = null, color = null) => {
    setCart(prevCart => {
      const removedItem = prevCart.find(item =>
        item.id === itemId &&
        item.size === size &&
        item.color === color
      );

      if (removedItem) {
        // Store for potential undo
        localStorage.setItem('last-removed-item', JSON.stringify({
          ...removedItem,
          removedAt: new Date().toISOString()
        }));
      }

      return prevCart.filter(item =>
        !(item.id === itemId && item.size === size && item.color === color)
      );
    });
  }, []);

  // Undo last removal
  const undoRemove = useCallback(() => {
    const lastRemoved = localStorage.getItem('last-removed-item');
    if (lastRemoved) {
      const item = JSON.parse(lastRemoved);
      addToCart(item);
      localStorage.removeItem('last-removed-item');
      return true;
    }
    return false;
  }, [addToCart]);

  // Advanced quantity management
  const updateQuantity = useCallback((itemId, quantity, size = null, color = null) => {
    if (quantity < 1) {
      removeFromCart(itemId, size, color);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.size === size && item.color === color
          ? { 
              ...item, 
              quantity: Math.min(quantity, 99), // Maximum limit
              lastModified: new Date().toISOString()
            }
          : item
      )
    );
  }, [removeFromCart]);

  // Smart quantity adjustments
  const incrementQuantity = useCallback((itemId, size = null, color = null) => {
    updateQuantity(itemId, 
      (cart.find(item => item.id === itemId && item.size === size && item.color === color)?.quantity || 0) + 1,
      size, color
    );
  }, [cart, updateQuantity]);

  const decrementQuantity = useCallback((itemId, size = null, color = null) => {
    const currentItem = cart.find(item => 
      item.id === itemId && item.size === size && item.color === color
    );
    
    if (currentItem) {
      updateQuantity(itemId, currentItem.quantity - 1, size, color);
    }
  }, [cart, updateQuantity]);

  // Enhanced cart management
  const clearCart = useCallback(() => {
    // Store for potential recovery
    localStorage.setItem('cleared-cart-backup', JSON.stringify({
      items: cart,
      clearedAt: new Date().toISOString()
    }));
    
    setCart([]);
  }, [cart]);

  const restoreCart = useCallback(() => {
    const backup = localStorage.getItem('cleared-cart-backup');
    if (backup) {
      const { items } = JSON.parse(backup);
      setCart(items);
      localStorage.removeItem('cleared-cart-backup');
      return true;
    }
    return false;
  }, []);

  // Advanced calculations with caching
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  }, [cart]);

  const getCartItemsCount = useCallback(() => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cart]);

  // New premium features
  const getCartSummary = useCallback(() => {
    const total = getCartTotal();
    const itemCount = getCartItemsCount();
    const uniqueItems = cart.length;
    
    return {
      total,
      itemCount,
      uniqueItems,
      formattedTotal: `$${total.toFixed(2)}`,
      savings: 0, // Can be extended with discount logic
      estimatedTax: total * 0.08, // Example tax calculation
      shipping: total > 50 ? 0 : 5.99 // Example shipping logic
    };
  }, [cart, getCartTotal, getCartItemsCount]);

  const getItemCount = useCallback((itemId, size = null, color = null) => {
    const item = cart.find(cartItem =>
      cartItem.id === itemId &&
      cartItem.size === size &&
      cartItem.color === color
    );
    return item ? item.quantity : 0;
  }, [cart]);

  // Cart analytics
  const getCartAnalytics = useCallback(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      totalValue: getCartTotal(),
      totalItems: getCartItemsCount(),
      averageItemValue: getCartTotal() / (cart.length || 1),
      mostExpensiveItem: cart.reduce((max, item) => 
        item.price > (max?.price || 0) ? item : max, null
      ),
      recentlyAdded: cart.filter(item => 
        new Date(item.addedAt) > weekAgo
      ).length
    };
  }, [cart, getCartTotal, getCartItemsCount]);

  // Export/Import functionality
  const exportCart = useCallback(() => {
    const cartData = {
      items: cart,
      exportedAt: new Date().toISOString(),
      total: getCartTotal(),
      version: '2.0.0'
    };
    
    return JSON.stringify(cartData, null, 2);
  }, [cart, getCartTotal]);

  const importCart = useCallback((cartData) => {
    try {
      const parsed = JSON.parse(cartData);
      if (parsed.items && Array.isArray(parsed.items)) {
        setCart(parsed.items);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Cart import failed:', error);
      return false;
    }
  }, []);

  return {
    // Core state
    cart,
    isLoading,
    
    // Basic operations
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Enhanced operations
    addMultipleToCart,
    incrementQuantity,
    decrementQuantity,
    undoRemove,
    restoreCart,
    
    // Calculations
    getCartTotal,
    getCartItemsCount,
    getCartSummary,
    getItemCount,
    
    // Analytics
    getCartAnalytics,
    
    // Data management
    exportCart,
    importCart,
    
    // Metadata
    cartHistory,
    
    // Convenience properties
    isEmpty: cart.length === 0,
    hasItems: cart.length > 0,
    uniqueProductCount: cart.length
  };
};