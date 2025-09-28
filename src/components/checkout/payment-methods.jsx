import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react'; // Simplified imports
import { clsx } from 'clsx';

const PaymentMethods = ({ selectedMethod, onMethodChange }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <CreditCard size={24} />,
      description: 'Pay with your credit card'
    },
    // Add PayPal and Bank Transfer if you implement them later
  ];

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Lock size={16} />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <div className="space-y-3">
        {paymentMethods.map(method => (
          <label key={method.id} className={clsx('flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all', selectedMethod === method.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400')}>
            <input type="radio" name="paymentMethod" value={method.id} checked={selectedMethod === method.id} onChange={(e) => onMethodChange(e.target.value)} className="text-primary-500 focus:ring-primary-500" />
            <div className="flex items-center gap-3">
              {method.icon}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{method.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {selectedMethod === 'credit-card' && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Card Details</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
            <input type="text" name="number" value={formatCardNumber(cardDetails.number)} onChange={handleCardInputChange} placeholder="1234 5678 9012 3456" maxLength={19} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
              <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardInputChange} placeholder="MM/YY" maxLength={5} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
              <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardInputChange} placeholder="123" maxLength={3} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
            <input type="text" name="name" value={cardDetails.name} onChange={handleCardInputChange} placeholder="John Doe" className="input-field" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;