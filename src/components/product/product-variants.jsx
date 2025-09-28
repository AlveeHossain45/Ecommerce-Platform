import React from 'react'

export const ProductVariants = ({ 
  variants, 
  selectedVariant, 
  onVariantSelect 
}) => {
  if (!variants || variants.length === 0) return null

  return (
    <div className="space-y-4">
      {variants.map((variantType) => (
        <div key={variantType.name}>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            {variantType.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {variantType.options.map((option) => {
              const isSelected = selectedVariant?.[variantType.name] === option.value
              const isAvailable = option.inStock !== false

              return (
                <button
                  key={option.value}
                  onClick={() => onVariantSelect(variantType.name, option.value)}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 border rounded-lg text-sm font-medium transition-colors
                    ${isSelected
                      ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300'
                    }
                    ${!isAvailable && 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  {option.value}
                  {!isAvailable && ' (Out of Stock)'}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}