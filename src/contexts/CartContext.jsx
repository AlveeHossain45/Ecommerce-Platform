import React, { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  Share2, 
  Star, 
  Package,
  Truck,
  Shield,
  RotateCcw,
  Sparkles
} from 'lucide-react'

// Premium Cart Context with enhanced features
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [recentlyAdded, setRecentlyAdded] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [cartAnimation, setCartAnimation] = useState({})

  // Initialize from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('premium_cart')
    const savedWishlist = localStorage.getItem('premium_wishlist')
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart data:', error)
        localStorage.removeItem('premium_cart')
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Error parsing wishlist data:', error)
        localStorage.removeItem('premium_wishlist')
      }
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('premium_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('premium_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Enhanced add to cart with animations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      const newItem = { 
        ...product, 
        quantity,
        addedAt: new Date().toISOString(),
        cartId: `${product.id}-${Date.now()}`
      }
      
      return [...prev, newItem]
    })

    // Set recently added for animation
    setRecentlyAdded(product.id)
    setTimeout(() => setRecentlyAdded(null), 2000)

    // Cart icon animation
    setCartAnimation({ scale: [1, 1.2, 1] })
    setTimeout(() => setCartAnimation({}), 500)
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCart([])
    setRecentlyAdded(null)
  }

  // Wishlist functionality
  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev
      }
      return [...prev, { ...product, addedAt: new Date().toISOString() }]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const moveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  // Enhanced calculations
  const getSubtotal = () => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const getDiscount = () => {
    const subtotal = getSubtotal()
    // Example discount logic - 10% off over $100
    return subtotal > 100 ? subtotal * 0.1 : 0
  }

  const getShipping = () => {
    const subtotal = getSubtotal()
    // Free shipping over $50
    return subtotal > 50 ? 0 : 9.99
  }

  const getTax = () => (getSubtotal() - getDiscount()) * 0.08 // 8% tax

  const getTotal = () => 
    getSubtotal() - getDiscount() + getShipping() + getTax()

  const getCount = () => cart.reduce((sum, item) => sum + item.quantity, 0)

  const getWishlistCount = () => wishlist.length

  // Product recommendations based on cart
  const getRecommendations = () => {
    if (cart.length === 0) return []
    
    const categories = [...new Set(cart.map(item => item.category))]
    // This would typically come from an API
    return []
  }

  // Cart analytics
  const getCartStats = () => {
    const totalItems = getCount()
    const totalValue = getSubtotal()
    const averagePrice = totalItems > 0 ? totalValue / totalItems : 0
    
    return {
      totalItems,
      totalValue,
      averagePrice,
      itemCount: cart.length,
      hasDiscount: getDiscount() > 0,
      freeShipping: getShipping() === 0
    }
  }

  const value = {
    // Core cart state
    cart,
    wishlist,
    isCartOpen,
    setIsCartOpen,
    recentlyAdded,
    cartAnimation,

    // Cart actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    // Wishlist actions
    addToWishlist,
    removeFromWishlist,
    moveToCart,

    // Calculations
    getCartSubtotal: getSubtotal,
    getCartDiscount: getDiscount,
    getCartShipping: getShipping,
    getCartTax: getTax,
    getCartTotal: getTotal,
    getCartItemsCount: getCount,
    getWishlistCount,

    // Enhanced features
    getRecommendations,
    getCartStats
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      
      {/* Global Cart Sidebar */}
      <CartSidebar />
    </CartContext.Provider>
  )
}

// Premium Cart Sidebar Component
const CartSidebar = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTax,
    getCartTotal,
    clearCart,
    recentlyAdded
  } = useCartContext()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Cart ({cart.length})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 transform rotate-45" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Add some items to get started
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          backgroundColor: recentlyAdded === item.id ? 
                            'rgba(59, 130, 246, 0.05)' : 'transparent'
                        }}
                        exit={{ opacity: 0, scale: 0.8, x: 100 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">
                            ${item.price}
                          </p>
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              <Minus size={14} />
                            </button>
                            
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4"
              >
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${getCartSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {getCartDiscount() > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${getCartDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={getCartShipping() === 0 ? 'text-green-600' : ''}>
                      {getCartShipping() === 0 ? 'FREE' : `$${getCartShipping().toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${getCartTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                    Checkout
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Enhanced Cart Hook
export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

// Cart Icon Component with Badge
export const CartIcon = ({ className }) => {
  const { 
    getCartItemsCount, 
    setIsCartOpen, 
    cartAnimation 
  } = useCartContext()

  const itemCount = getCartItemsCount()

  return (
    <motion.button
      animate={cartAnimation}
      onClick={() => setIsCartOpen(true)}
      className={clsx(
        'relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingCart className="w-6 h-6" />
      
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </motion.span>
      )}
    </motion.button>
  )
}

// Usage examples:
/*
// In your main app:
<CartProvider>
  <App />
</CartProvider>

// Using cart in components:
const { 
  addToCart, 
  cart, 
  getCartItemsCount,
  addToWishlist 
} = useCartContext()

// Cart icon in navigation:
<CartIcon />

// Product card with cart actions:
<ProductCard 
  product={product}
  onAddToCart={addToCart}
  onAddToWishlist={addToWishlist}
/>
*/