import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'

export const Confirmation = () => {
  const location = useLocation()
  const order = location.state?.order || {
    id: `ORD-${Date.now()}`,
    total: 299.99,
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 }
    ],
    status: 'confirmed',
    date: new Date().toISOString()
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Order Confirmed!
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-4 text-left mb-6">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
            <p className="font-semibold">${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Order Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/orders" className="btn-primary">
          View Order Details
        </Link>
        <Link to="/products" className="btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}