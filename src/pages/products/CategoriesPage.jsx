// src/pages/products/CategoriesPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import { ChevronRight, Sparkles, ArrowRight, Star, TrendingUp, Zap, Crown, Heart, ShoppingBag, Watch, Camera, Headphones, Laptop, Shirt, Gem, Car, Home, Gamepad } from 'lucide-react';

const CategoriesPage = () => {
  // mockData থেকে সব ইউনিক ক্যাটাগরি বের করা
  const categories = [...new Set(mockProducts.map(p => p.category))];

  // Premium category data with icons and descriptions
  const categoryData = {
    electronics: {
      icon: Zap,
      description: 'Cutting-edge technology and innovative gadgets',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      count: mockProducts.filter(p => p.category === 'electronics').length,
      featured: true
    },
    fashion: {
      icon: Shirt,
      description: 'Latest trends and premium apparel collections',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
      count: mockProducts.filter(p => p.category === 'fashion').length,
      featured: true
    },
    beauty: {
      icon: Gem,
      description: 'Luxury skincare and beauty essentials',
      gradient: 'from-purple-500 to-fuchsia-500',
      bgGradient: 'from-purple-50 to-fuchsia-50',
      count: mockProducts.filter(p => p.category === 'beauty').length
    },
    home: {
      icon: Home,
      description: 'Elegant home decor and living essentials',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      count: mockProducts.filter(p => p.category === 'home').length
    },
    sports: {
      icon: TrendingUp,
      description: 'Professional gear and fitness equipment',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      count: mockProducts.filter(p => p.category === 'sports').length
    },
    lifestyle: {
      icon: Crown,
      description: 'Premium lifestyle and luxury goods',
      gradient: 'from-amber-500 to-yellow-500',
      bgGradient: 'from-amber-50 to-yellow-50',
      count: mockProducts.filter(p => p.category === 'lifestyle').length,
      featured: true
    }
  };

  // Get featured categories
  const featuredCategories = categories.filter(cat => categoryData[cat]?.featured);
  const regularCategories = categories.filter(cat => !categoryData[cat]?.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
              <Sparkles className="text-blue-600" size={20} />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premium Collections</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Curated Categories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Explore our meticulously organized collections, each crafted to bring you the finest selection 
              of premium products in every category.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Premium Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{mockProducts.length}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Curated Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Quality Assured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Collections
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Our most exclusive and popular categories
                </p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Star size={20} className="fill-current" />
                <span className="font-semibold">Premium Picks</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCategories.map((category) => {
                const data = categoryData[category];
                const Icon = data?.icon || ShoppingBag;
                
                return (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${data?.bgGradient} dark:opacity-10 opacity-30 group-hover:opacity-40 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-4 rounded-2xl bg-gradient-to-r ${data?.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="text-white" size={32} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                              {category}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {data?.count} premium products
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                          <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                        {data?.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                          <TrendingUp size={16} />
                          Featured Collection
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Explore Now →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Categories */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse through our complete range of premium product categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const data = categoryData[category];
              const Icon = data?.icon || ShoppingBag;
              const isFeatured = data?.featured;
              
              return (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                >
                  {/* Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${data?.bgGradient} dark:opacity-5 opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${data?.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      {isFeatured && (
                        <Star size={16} className="text-yellow-400 fill-current" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize mb-2">
                      {category}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {data?.description || 'Explore premium products in this category'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {data?.count || mockProducts.filter(p => p.category === category).length} products
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        <span className="text-sm font-medium">Explore</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Our personal shopping assistants are here to help you discover the perfect products
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Browse All Products
                </Link>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Contact Personal Shopper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;