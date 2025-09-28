import React from 'react';
import ProductCard from '../../components/product/product-card.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { addToCart } = useCartContext();

  // Assuming mockProducts has more items, we take the first 4 as featured
  const featuredProducts = mockProducts.slice(0, 4);

  const handleAddToCart = (product) => addToCart(product);
  const handleAddToWishlist = (product) => console.log('Wishlist:', product);
  const handleQuickView = (product) => console.log('Quick View:', product);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully selected premium products that combine quality and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="btn-primary px-8 py-3">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;