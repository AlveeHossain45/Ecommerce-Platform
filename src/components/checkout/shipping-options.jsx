import React from 'react';
import { Truck, Clock, Check, Zap, Rocket } from 'lucide-react';

const ShippingOptions = ({ selectedOption, onOptionSelect, subtotal = 0, variant = "default" }) => {
  const isPremium = variant === "premium";

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: subtotal > 50 ? 0 : 4.99,
      estimatedDays: '5-7 business days',
      icon: Truck,
      freeThreshold: 50,
      premiumBadge: isPremium ? 'Free over $50' : null,
      premiumColor: 'blue'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 9.99,
      estimatedDays: '2-3 business days',
      icon: Clock,
      premiumBadge: isPremium ? 'Popular' : null,
      premiumColor: 'purple'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 19.99,
      estimatedDays: '1 business day',
      icon: Rocket,
      premiumBadge: isPremium ? 'Fastest' : null,
      premiumColor: 'green'
    }
  ];

  const getPremiumColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    };
    return colors[color] || colors.blue;
  };

  const getBadgeColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`rounded-2xl p-8 transition-all duration-300 ${
      isPremium 
        ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-blue-500/10" 
        : "bg-white dark:bg-gray-800 shadow-lg"
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between mb-8 pb-6 ${
        isPremium ? "border-b border-gray-200 dark:border-gray-700" : ""
      }`}>
        <div className="flex items-center space-x-3">
          {isPremium && (
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Truck size={24} className="text-white" />
            </div>
          )}
          <div>
            <h3 className={`font-semibold tracking-tight ${
              isPremium 
                ? "text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent" 
                : "text-lg text-gray-900 dark:text-white"
            }`}>
              Shipping Method
            </h3>
            {isPremium && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose your preferred delivery option
              </p>
            )}
          </div>
        </div>
        
        {isPremium && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 rounded-full">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Fast Delivery</span>
          </div>
        )}
      </div>

      {/* Shipping Options */}
      <div className="space-y-4">
        {shippingOptions.map((option) => {
          const Icon = option.icon;
          const isFree = option.price === 0;
          const isSelected = selectedOption === option.id;

          return (
            <label
              key={option.id}
              className={`flex items-center justify-between p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 group ${
                isPremium
                  ? isSelected
                    ? `${getPremiumColorClasses(option.premiumColor)} border-${option.premiumColor}-500 shadow-lg scale-[1.02]`
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md bg-white dark:bg-gray-800/50'
                  : isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="radio"
                  name="shippingOption"
                  value={option.id}
                  checked={isSelected}
                  onChange={(e) => onOptionSelect(e.target.value)}
                  className={isPremium ? "text-blue-500 focus:ring-blue-500" : "text-primary-500 focus:ring-primary-500"}
                />
                
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg transition-colors ${
                    isPremium
                      ? isSelected
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-600'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon size={isPremium ? 24 : 20} className={
                      isPremium 
                        ? isSelected 
                          ? `text-${option.premiumColor}-500` 
                          : 'text-gray-600 dark:text-gray-400'
                        : 'text-primary-500'
                    } />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-semibold ${
                        isPremium ? "text-gray-900 dark:text-white text-lg" : "text-gray-900 dark:text-white"
                      }`}>
                        {option.name}
                      </span>
                      {isPremium && option.premiumBadge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColorClasses(option.premiumColor)}`}>
                          {option.premiumBadge}
                        </span>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-4 ${
                      isPremium ? "text-sm" : "text-sm"
                    }`}>
                      <span className={`${isPremium ? "text-gray-600 dark:text-gray-400" : "text-gray-600 dark:text-gray-400"}`}>
                        {option.estimatedDays}
                      </span>
                      
                      {option.freeThreshold && subtotal < option.freeThreshold && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Free on orders over ${option.freeThreshold}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right ml-4">
                <div className={`font-bold ${
                  isPremium 
                    ? isFree 
                      ? "text-green-600 dark:text-green-400 text-xl" 
                      : "text-gray-900 dark:text-white text-xl"
                    : isFree 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-gray-900 dark:text-white"
                }`}>
                  {isFree ? 'FREE' : `$${option.price.toFixed(2)}`}
                </div>
                {isPremium && !isFree && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Additional charge
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Free Shipping Banner */}
      {subtotal < 50 && (
        <div className={`mt-6 p-4 rounded-xl transition-all duration-300 ${
          isPremium
            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
            : "bg-green-50 dark:bg-green-900/20"
        }`}>
          <div className="flex items-center gap-3">
            {isPremium && (
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                <Zap size={16} className="text-white" />
              </div>
            )}
            <div>
              <p className={`font-medium ${
                isPremium 
                  ? "text-green-800 dark:text-green-200 text-sm" 
                  : "text-green-800 dark:text-green-200 text-sm"
              }`}>
                Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more for free standard shipping!
              </p>
              {isPremium && (
                <div className="w-full bg-green-200 dark:bg-green-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Premium Features */}
      {isPremium && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <Check size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Real-time Tracking</span>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <Check size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Insurance Included</span>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <Check size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">24/7 Support</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;