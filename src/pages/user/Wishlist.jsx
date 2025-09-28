import React from 'react';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';

const mockWishlist = [
  { id: '1', name: 'Premium Headphones', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', addedDate: '2024-01-15' },
];

const Wishlist = () => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (item) => addToCart(item);
  const handleRemove = (id) => console.log('Remove item:', id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>
      {mockWishlist.length > 0 ? (
        <div className="space-y-4">
          {mockWishlist.map(item => (
            <div key={item.id} className="card p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary-600 font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleAddToCart(item)} className="btn-primary p-2"><ShoppingCart size={16} /></button>
                <button onClick={() => handleRemove(item.id)} className="btn-secondary p-2 text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
        </div>
      )}
    </div>
  );
};

export default Wishlist;