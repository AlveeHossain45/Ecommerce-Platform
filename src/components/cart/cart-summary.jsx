import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext.jsx';

const CartSummary = ({ showCheckoutButton = true, className }) => {
  const { cart, getCartTotal, getCartItemsCount } = useCartContext();
  if (cart.length === 0) return null;

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal ({getCartItemsCount()} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {showCheckoutButton && (
        <Link to="/checkout" className="block w-full btn-primary text-center py-3">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
};

export default CartSummary;