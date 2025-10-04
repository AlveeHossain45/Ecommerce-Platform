import React from 'react';
import { useCartContext } from '../../contexts/CartContext.jsx';

const OrderSummary = ({ variant = "default" }) => {
  const { cart, getCartTotal } = useCartContext();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const isPremium = variant === "premium";

  if (cart.length === 0) {
    return (
      <div className={`rounded-2xl p-8 transition-all duration-300 ${
        isPremium 
          ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-blue-500/10" 
          : "bg-white dark:bg-gray-800 shadow-lg"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold tracking-tight ${
            isPremium 
              ? "text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent" 
              : "text-lg text-gray-900 dark:text-white"
          }`}>
            Order Summary
          </h3>
          {isPremium && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Premium</span>
            </div>
          )}
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className={`font-medium ${
            isPremium ? "text-gray-700 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"
          }`}>
            Your cart is empty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl transition-all duration-300 ${
      isPremium 
        ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-blue-500/10" 
        : "bg-white dark:bg-gray-800 shadow-lg"
    }`}>
      {/* Header */}
      <div className={`p-8 ${isPremium ? "border-b border-gray-200 dark:border-gray-700" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`font-semibold tracking-tight ${
            isPremium 
              ? "text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent" 
              : "text-lg text-gray-900 dark:text-white"
          }`}>
            Order Summary
          </h3>
          {isPremium && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Premium</span>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                isPremium 
                  ? "bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-200" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`object-cover rounded-lg ${
                      isPremium ? "w-14 h-14 ring-2 ring-white dark:ring-gray-700 shadow-sm" : "w-12 h-12 rounded"
                    }`}
                  />
                  {isPremium && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{item.quantity}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className={`font-medium ${
                    isPremium ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"
                  }`}>
                    {item.name}
                  </div>
                  {!isPremium && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </div>
                  )}
                  {isPremium && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={`font-semibold ${
                isPremium ? "text-lg text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"
              }`}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className={`p-8 ${isPremium ? "bg-white/50 dark:bg-gray-800/30 rounded-b-2xl" : ""}`}>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center py-2">
            <span className={`${isPremium ? "text-gray-700 dark:text-gray-300 font-medium" : "text-gray-600 dark:text-gray-400"}`}>
              Subtotal
            </span>
            <span className={`${isPremium ? "text-gray-900 dark:text-white font-semibold" : "text-gray-900 dark:text-white"}`}>
              ${subtotal.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className={`${isPremium ? "text-gray-700 dark:text-gray-300 font-medium" : "text-gray-600 dark:text-gray-400"}`}>
              Shipping
            </span>
            <span className={`font-semibold ${
              shipping === 0 
                ? "text-green-600 dark:text-green-400" 
                : isPremium ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"
            }`}>
              {shipping === 0 ? (
                <span className="flex items-center space-x-1">
                  {isPremium && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>FREE</span>
                </span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className={`${isPremium ? "text-gray-700 dark:text-gray-300 font-medium" : "text-gray-600 dark:text-gray-400"}`}>
              Tax
            </span>
            <span className={`${isPremium ? "text-gray-900 dark:text-white font-semibold" : "text-gray-900 dark:text-white"}`}>
              ${tax.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className={`flex justify-between items-center pt-4 ${
          isPremium ? "border-t border-gray-200 dark:border-gray-700" : "border-t pt-2"
        }`}>
          <span className={`font-semibold ${
            isPremium 
              ? "text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent" 
              : "text-lg text-gray-900 dark:text-white"
          }`}>
            Total
          </span>
          <span className={`font-bold ${
            isPremium 
              ? "text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" 
              : "text-lg text-gray-900 dark:text-white"
          }`}>
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Premium Features */}
        {isPremium && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;