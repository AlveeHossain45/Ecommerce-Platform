import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle2, Zap } from 'lucide-react';
import { clsx } from 'clsx';

const PaymentMethods = ({ selectedMethod, onMethodChange, variant = "default" }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const isPremium = variant === "premium";

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <CreditCard size={isPremium ? 28 : 24} />,
      description: 'Pay with your credit card',
      premiumBadge: isPremium ? 'Fast & Secure' : null
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: (
        <svg className={isPremium ? "w-7 h-7" : "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 14.25c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9zM20.25 6.75c0-1.2-1-2.2-2.2-2.2H6.7c-1.2 0-2.2 1-2.2 2.2v10.5c0 1.2 1 2.2 2.2 2.2h11.4c1.2 0 2.2-1 2.2-2.2V6.75z"/>
        </svg>
      ),
      description: 'Pay with your PayPal account',
      premiumBadge: isPremium ? '1-Click Pay' : null
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: (
        <svg className={isPremium ? "w-7 h-7" : "w-6 h-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
        </svg>
      ),
      description: 'Direct bank transfer',
      premiumBadge: isPremium ? 'No Fees' : null
    }
  ];

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'number') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length <= 19) {
        setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === 'expiry') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 3);
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className={clsx('rounded-2xl p-8 transition-all duration-300', {
      'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-blue-500/10': isPremium,
      'bg-white dark:bg-gray-800 shadow-lg': !isPremium
    })}>
      {/* Header */}
      <div className={clsx('flex items-center justify-between mb-8 pb-6', {
        'border-b border-gray-200 dark:border-gray-700': isPremium
      })}>
        <div className="flex items-center space-x-3">
          {isPremium && (
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <Zap size={24} className="text-white" />
            </div>
          )}
          <div>
            <h3 className={clsx('font-semibold tracking-tight', {
              'text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent': isPremium,
              'text-lg text-gray-900 dark:text-white': !isPremium
            })}>
              Payment Method
            </h3>
            {isPremium && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose your preferred payment method
              </p>
            )}
          </div>
        </div>
        
        {isPremium && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Secure</span>
          </div>
        )}
      </div>

      {/* Security Banner */}
      <div className={clsx('flex items-center gap-3 p-4 rounded-xl mb-6', {
        'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800': isPremium,
        'bg-gray-100 dark:bg-gray-700': !isPremium
      })}>
        <div className={clsx('flex items-center justify-center w-8 h-8 rounded-full', {
          'bg-blue-100 dark:bg-blue-800': isPremium,
          'bg-gray-200 dark:bg-gray-600': !isPremium
        })}>
          <Lock size={16} className={isPremium ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"} />
        </div>
        <div>
          <span className={clsx('text-sm font-medium', {
            'text-blue-900 dark:text-blue-100': isPremium,
            'text-gray-700 dark:text-gray-300': !isPremium
          })}>
            Your payment information is secure and encrypted
          </span>
          {isPremium && (
            <div className="flex items-center space-x-4 mt-1 text-xs text-blue-700 dark:text-blue-300">
              <span className="flex items-center space-x-1">
                <Shield size={12} />
                <span>256-bit SSL</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 size={12} />
                <span>PCI Compliant</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map(method => (
          <label 
            key={method.id} 
            className={clsx(
              'flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 group',
              {
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md scale-[1.02]': selectedMethod === method.id && isPremium,
                'border-green-500 bg-green-50 dark:bg-green-900/20': selectedMethod === method.id && !isPremium,
                'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md': selectedMethod !== method.id && isPremium,
                'border-gray-300 dark:border-gray-600 hover:border-gray-400': selectedMethod !== method.id && !isPremium
              }
            )}
          >
            <input 
              type="radio" 
              name="paymentMethod" 
              value={method.id} 
              checked={selectedMethod === method.id} 
              onChange={(e) => onMethodChange(e.target.value)} 
              className={clsx('focus:ring-2 focus:ring-offset-2', {
                'text-blue-500 focus:ring-blue-500': isPremium,
                'text-green-500 focus:ring-green-500': !isPremium
              })} 
            />
            
            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center gap-4">
                <div className={clsx('p-2 rounded-lg transition-colors', {
                  'bg-white dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20': isPremium,
                  'bg-gray-100 dark:bg-gray-700': !isPremium
                })}>
                  {method.icon}
                </div>
                <div>
                  <div className={clsx('font-semibold', {
                    'text-gray-900 dark:text-white': true
                  })}>
                    {method.name}
                  </div>
                  <div className={clsx('text-sm', {
                    'text-gray-600 dark:text-gray-400': true
                  })}>
                    {method.description}
                  </div>
                </div>
              </div>

              {isPremium && method.premiumBadge && (
                <div className={clsx('px-2 py-1 rounded-full text-xs font-medium', {
                  'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': method.id === 'credit-card',
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': method.id === 'paypal',
                  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': method.id === 'bank-transfer'
                })}>
                  {method.premiumBadge}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Credit Card Form */}
      {selectedMethod === 'credit-card' && (
        <div className={clsx('rounded-xl p-6 space-y-6 transition-all duration-300', {
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg': isPremium,
          'bg-gray-50 dark:bg-gray-700': !isPremium
        })}>
          <div className="flex items-center justify-between">
            <h4 className={clsx('font-semibold', {
              'text-lg text-gray-900 dark:text-white': isPremium,
              'font-medium text-gray-900 dark:text-white': !isPremium
            })}>
              Card Details
            </h4>
            {isPremium && (
              <div className="flex items-center space-x-2">
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/amex.svg" alt="American Express" className="h-6" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className={clsx('block text-sm font-medium mb-3', {
                'text-gray-700 dark:text-gray-300': isPremium,
                'text-gray-700 dark:text-gray-300': !isPremium
              })}>
                Card Number
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="number" 
                  value={cardDetails.number} 
                  onChange={handleCardInputChange} 
                  placeholder="1234 5678 9012 3456" 
                  maxLength={19} 
                  className={clsx('w-full transition-all duration-300 pl-12', {
                    'px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm': isPremium,
                    'px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600': !isPremium
                  })} 
                />
                {isPremium && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <CreditCard size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={clsx('block text-sm font-medium mb-3', {
                  'text-gray-700 dark:text-gray-300': isPremium,
                  'text-gray-700 dark:text-gray-300': !isPremium
                })}>
                  Expiry Date
                </label>
                <input 
                  type="text" 
                  name="expiry" 
                  value={cardDetails.expiry} 
                  onChange={handleCardInputChange} 
                  placeholder="MM/YY" 
                  maxLength={5} 
                  className={clsx('w-full transition-all duration-300', {
                    'px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm': isPremium,
                    'px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600': !isPremium
                  })} 
                />
              </div>
              <div>
                <label className={clsx('block text-sm font-medium mb-3', {
                  'text-gray-700 dark:text-gray-300': isPremium,
                  'text-gray-700 dark:text-gray-300': !isPremium
                })}>
                  CVV
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="cvv" 
                    value={cardDetails.cvv} 
                    onChange={handleCardInputChange} 
                    placeholder="123" 
                    maxLength={3} 
                    className={clsx('w-full transition-all duration-300 pr-12', {
                      'px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm': isPremium,
                      'px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600': !isPremium
                    })} 
                  />
                  {isPremium && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Shield size={16} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className={clsx('block text-sm font-medium mb-3', {
                'text-gray-700 dark:text-gray-300': isPremium,
                'text-gray-700 dark:text-gray-300': !isPremium
              })}>
                Cardholder Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={cardDetails.name} 
                onChange={handleCardInputChange} 
                placeholder="John Doe" 
                className={clsx('w-full transition-all duration-300', {
                  'px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm': isPremium,
                  'px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600': !isPremium
                })} 
              />
            </div>
          </div>

          {isPremium && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 size={16} />
                <span>3D Secure Enabled</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Lock size={14} />
                <span>End-to-end encrypted</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;