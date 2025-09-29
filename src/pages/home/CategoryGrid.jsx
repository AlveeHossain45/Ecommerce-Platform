import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'electronics', name: 'Electronics', image: '...', count: 156 },
  { id: 'fashion', name: 'Fashion', image: '...', count: 289 },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`} className="group relative">
              <div className="absolute inset-0 bg-black/50 text-white p-6 flex flex-col justify-end rounded-2xl">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <span className="text-sm">{category.count} products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoryGrid;