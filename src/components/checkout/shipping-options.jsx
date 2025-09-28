import React from 'react';
import { Truck, Clock, Check } from 'lucide-react';

const ShippingOptions = ({ selectedOption, onOptionSelect, subtotal = 0 }) => {
  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: subtotal > 50 ? 0 : 4.99,
      estimatedDays: '5-7 business days',
      icon: Truck,
      freeThreshold: 50
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 9.99,
      estimatedDays: '2-3 business days',
      icon: Clock
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 19.99,
      estimatedDays: '1 business day',
      icon: Check
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Shipping Method
      </h3>
      {shippingOptions.map((option) => {
        const Icon = option.icon;
        const isFree = option.price === 0;

        return (
          <label
            key={option.id}
            className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="shippingOption"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => onOptionSelect(e.target.value)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {option.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {option.estimatedDays}
                  </div>
                  {option.freeThreshold && subtotal < option.freeThreshold && (
                    <div className="text-xs text-green-600">
                      Free on orders over ${option.freeThreshold}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900 dark:text-white">
                {isFree ? 'FREE' : `$${option.price.toFixed(2)}`}
              </div>
            </div>
          </label>
        );
      })}
      {subtotal < 50 && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            Add ${(50 - subtotal).toFixed(2)} more for free standard shipping!
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;