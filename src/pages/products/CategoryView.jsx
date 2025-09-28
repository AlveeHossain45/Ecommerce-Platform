import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/product/product-grid.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';
const CategoryView = () => {
const { category } = useParams();
const { addToCart } = useCartContext();
const categoryProducts = mockProducts.filter(p => p.category.toLowerCase() === category?.toLowerCase());
const handleAddToCart = (product) => addToCart(product);
const handleAddToWishlist = (product) => console.log('Wishlist:', product);
const handleQuickView = (product) => console.log('Quick View:', product);
return (
<div className="container mx-auto px-4 py-8">
<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">{category}</h1>
<p className="text-gray-600 dark:text-gray-400">{categoryProducts.length} products found</p>
</div>
<ProductGrid
products={categoryProducts}
onAddToCart={handleAddToCart}
onAddToWishlist={handleAddToWishlist}
onQuickView={handleQuickView}
/>
</div>
);
};
export default CategoryView;