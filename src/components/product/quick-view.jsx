import React, { useState } from 'react';
import Modal from '../ui/modal.jsx'; 
import { Star, Heart } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';

const QuickView = ({ product, isOpen, onClose, onAddToWishlist }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={product.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(Math.floor(product.rating))].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1">-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1">+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1 py-3">Add to Cart</button>
            <button onClick={() => onAddToWishlist(product)} className="p-3 border rounded hover:bg-gray-100" title="Add to Wishlist"><Heart size={20} /></button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Ensure it has a default export
export default QuickView;