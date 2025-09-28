import React from 'react'
import { useCartContext } from '../../contexts/CartContext'

export const OrderSummary = () => {
  const { cart, getCartTotal } = useCartContext()

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 4.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Order Summary
      </h3>

      {/* Cart Items */}
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Qty: {item.quantity}
                </div>
              </div>
            </div>
            <div className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
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

        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}