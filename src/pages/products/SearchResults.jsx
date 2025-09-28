import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/product/product-grid.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCartContext();

  const filteredProducts = mockProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  const handleAddToCart = (product) => addToCart(product);
  const handleAddToWishlist = (product) => console.log('Wishlist:', product);
  const handleQuickView = (product) => console.log('Quick View:', product);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search Results</h1>
        <p className="text-gray-600 dark:text-gray-400">{filteredProducts.length} results for "{query}"</p>
      </div>
      {filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={handleQuickView}
        />
      ) : (
        <div className="text-center py-16">
          <Search size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold">No products found for "{query}"</h3>
          <Link to="/products" className="btn-primary mt-6">Browse All Products</Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;