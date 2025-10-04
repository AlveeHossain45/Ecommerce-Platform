import React from 'react';

const AddressForm = ({ address, onChange, title = "Shipping Address", variant = "default" }) => {
  const handleChange = (field, value) => {
    onChange({
      ...address,
      [field]: value
    });
  };

  const isPremium = variant === "premium";

  return (
    <div className={`rounded-2xl p-8 transition-all duration-300 ${
      isPremium 
        ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-blue-500/10" 
        : "bg-white dark:bg-gray-800 shadow-lg"
    }`}>
      {/* Header Section */}
      <div className={`flex items-center justify-between mb-8 pb-6 ${
        isPremium ? "border-b border-gray-200 dark:border-gray-700" : ""
      }`}>
        <div className="flex items-center space-x-3">
          {isPremium && (
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          )}
          <h3 className={`font-semibold tracking-tight ${
            isPremium 
              ? "text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent" 
              : "text-lg text-gray-900 dark:text-white"
          }`}>
            {title}
          </h3>
        </div>
        
        {isPremium && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Premium</span>
          </div>
        )}
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            First Name *
          </label>
          <div className="relative group">
            <input
              type="text"
              value={address.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full transition-all duration-300 ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            />
            {isPremium && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            Last Name *
          </label>
          <div className="relative group">
            <input
              type="text"
              value={address.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full transition-all duration-300 ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            />
            {isPremium && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className="md:col-span-2 space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            Email Address *
          </label>
          <div className="relative group">
            <input
              type="email"
              value={address.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full transition-all duration-300 ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300 pl-12"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            />
            {isPremium && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Street Address */}
        <div className="md:col-span-2 space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            Street Address *
          </label>
          <div className="relative group">
            <input
              type="text"
              value={address.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`w-full transition-all duration-300 ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300 pl-12"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            />
            {isPremium && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            City *
          </label>
          <div className="relative group">
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full transition-all duration-300 ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300 pl-12"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            />
            {isPremium && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* ZIP Code */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            ZIP Code *
          </label>
          <div className="relative group">
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className={`w-full transition-all duration-300 ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300 pl-12"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            />
            {isPremium && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="md:col-span-2 space-y-2">
          <label className={`block text-sm font-medium transition-colors ${
            isPremium 
              ? "text-gray-700 dark:text-gray-300 group-hover:text-gray-900" 
              : "text-gray-700 dark:text-gray-300"
          }`}>
            Country *
          </label>
          <div className="relative group">
            <select
              value={address.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`w-full transition-all duration-300 appearance-none ${
                isPremium
                  ? "px-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm hover:border-gray-300 pl-12"
                  : "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              }`}
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
            {isPremium && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Premium Features Indicator */}
      {isPremium && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Real-time Validation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Auto-save Progress</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;