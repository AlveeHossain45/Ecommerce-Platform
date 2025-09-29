import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../../data/mockData.js';

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Explore our curated collections.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 aspect-w-1 aspect-h-1">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{category.productCount} products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;