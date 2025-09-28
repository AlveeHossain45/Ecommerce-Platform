export const APP_CONFIG = {
  name: 'Ultra Premium Ecommerce',
  version: '1.0.0',
  supportEmail: 'support@ultrashop.com',
  phone: '+1 (555) 123-4567'
}

export const CURRENCY_CONFIG = {
  symbol: '$',
  code: 'USD',
  locale: 'en-US'
}

export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 4.99,
    estimatedDays: '5-7 business days'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 9.99,
    estimatedDays: '2-3 business days'
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 19.99,
    estimatedDays: '1 business day'
  }
]

export const PAYMENT_METHODS = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: 'credit-card'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: 'bank'
  }
]