import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Shield, Truck, CheckCircle } from 'lucide-react'

export const CheckoutLayout = () => {
  const steps = [
    { number: 1, name: 'Cart', href: '/cart', completed: true },
    { number: 2, name: 'Shipping', href: '/checkout', completed: true },
    { number: 3, name: 'Payment', href: '/checkout/payment', completed: false },
    { number: 4, name: 'Confirmation', href: '/checkout/confirmation', completed: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            UltraShop
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                  }`}>
                    {step.completed ? (
                      <CheckCircle size={16} />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step.completed 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    steps[index + 1].completed 
                      ? 'bg-primary-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-primary-50 dark:bg-primary-900/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 text-sm text-primary-700 dark:text-primary-300">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} />
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 UltraShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}