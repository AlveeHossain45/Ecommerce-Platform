import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';

const MiniCart = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount } = useCartContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Shopping Cart ({getCartItemsCount()})
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size || ''}-${item.color || ''}`} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                      {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100">-</button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="p-1 text-red-500 hover:text-red-600"><X size={16} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-white">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Link to="/cart" className="btn-secondary w-full text-center block" onClick={onClose}>View Cart</Link>
                <Link to="/checkout" className="btn-primary w-full text-center block" onClick={onClose}>Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniCart;