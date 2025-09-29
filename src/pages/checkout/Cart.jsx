import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import CartSummary from '../../components/cart/cart-summary.jsx'; 
import CartItem from '../../components/cart/cart-item.jsx'; 

const Cart = () => {
  const { cart, clearCart } = useCartContext();

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to add items to your cart</p>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <button onClick={clearCart} className="text-red-500 hover:text-red-600 flex items-center gap-2 text-sm font-medium">
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={`${item.id}-${item.size || ''}-${item.color || ''}`} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
             <CartSummary showCheckoutButton={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;