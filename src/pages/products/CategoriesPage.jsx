// src/pages/products/CategoriesPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import { ChevronRight } from 'lucide-react';

const CategoriesPage = () => {
  // mockData থেকে সব ইউনিক ক্যাটাগরি বের করা
  const categories = [...new Set(mockProducts.map(p => p.category))];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Explore Our Categories
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Find what you're looking for from our wide range of product categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                  {category}
                </h2>
                <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Shop the collection
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;