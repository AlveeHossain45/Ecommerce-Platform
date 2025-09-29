import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="card group relative overflow-hidden flex flex-col"
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onAddToWishlist(product)} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"><Heart size={16} /></button>
        </div>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onQuickView(product)} className="bg-white text-gray-900 px-4 py-2 rounded font-medium">Quick View</button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 h-12">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">{[...Array(Math.floor(product.rating))].map((_, i) => <Star key={i} size={14} className="fill-current" />)}</div>
          <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>}
        </div>
        <button onClick={() => onAddToCart(product)} className="btn-primary w-full flex items-center justify-center gap-2">
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;