const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const paymentAPI = {
  async processPayment(paymentData) {
    const response = await fetch(`${API_BASE_URL}/payments/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    })

    if (!response.ok) {
      throw new Error('Payment processing failed')
    }

    return response.json()
  },

  async createPaymentIntent(amount) {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'usd' })
    })

    if (!response.ok) {
      throw new Error('Failed to create payment intent')
    }

    return response.json()
  },

  async getPaymentMethods() {
    const response = await fetch(`${API_BASE_URL}/payments/methods`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment methods')
    }

    return response.json()
  }
}