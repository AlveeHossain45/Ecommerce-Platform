import React from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartContext } from '../../contexts/CartContext'

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartContext()

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
        <p className="text-primary-600 font-medium">${item.price.toFixed(2)}</p>
        {item.size && <p className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}</p>}
        {item.color && <p className="text-sm text-gray-600 dark:text-gray-400">Color: {item.color}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id, item.size, item.color)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}