import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/product/product-card.jsx';
// The fix is here: Removed curly braces {} from QuickView import
import QuickView from '../../components/product/quick-view.jsx'; 
import { useCartContext } from '../../contexts/CartContext.jsx';
import { Filter, Grid, List } from 'lucide-react';
import { mockProducts } from '../../data/mockData.js';

const ProductListing = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCartContext();

  const categories = ['all', 'electronics', 'fashion', 'beauty', 'furniture'];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    return filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (product) => addToCart(product);
  const handleAddToWishlist = (product) => console.log('Added to wishlist:', product);
  
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };
  
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Our Products</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover our premium collection</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              {categories.map((cat) => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      </div>
      
      <QuickView 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToWishlist={handleAddToWishlist}
      />
    </>
  );
};

export default ProductListing;