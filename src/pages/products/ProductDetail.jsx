import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2 } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js'; // Using mock data

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  // Find the product from mock data. In a real app, this would be an API call.
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="btn-primary mt-4">Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => addToCart({ ...product, quantity });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div><img src={product.images[0]} alt={product.name} className="w-full h-auto object-cover rounded-lg"/></div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <div className="flex items-center gap-2 my-4">
            <div className="flex text-yellow-400">{[...Array(Math.floor(product.rating))].map((_, i) => <Star key={i} size={16} className="fill-current"/>)}</div>
            <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded"><button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2">-</button><span className="px-4">{quantity}</span><button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2">+</button></div>
            <button onClick={handleAddToCart} className="btn-primary flex-1 py-3">Add to Cart</button>
            <button className="p-3 border rounded"><Heart size={20}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;