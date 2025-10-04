import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../../data/mockData.js';
import { Sparkles, ArrowRight, Star, TrendingUp, Zap, Crown, Shirt, Gem, Home, TrendingUp as TrendingUpIcon, Watch, Camera, Headphones } from 'lucide-react';

const CategoryGrid = () => {
  // Enhanced category data with premium details
  const premiumCategoryData = {
    electronics: {
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      description: 'Cutting-edge technology',
      featured: true
    },
    fashion: {
      icon: Shirt,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
      description: 'Latest trends & styles',
      featured: true
    },
    beauty: {
      icon: Gem,
      gradient: 'from-purple-500 to-fuchsia-500',
      bgGradient: 'from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20',
      description: 'Luxury skincare',
      featured: false
    },
    home: {
      icon: Home,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      description: 'Elegant living',
      featured: false
    },
    sports: {
      icon: TrendingUpIcon,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      description: 'Professional gear',
      featured: false
    },
    accessories: {
      icon: Crown,
      gradient: 'from-amber-500 to-yellow-500',
      bgGradient: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
      description: 'Premium accessories',
      featured: true
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <Sparkles className="text-blue-600" size={20} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premium Collections</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Curated Categories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our meticulously organized collections, each offering the finest selection of premium products
          </p>
        </div>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mockCategories.map((category) => {
            const categoryInfo = premiumCategoryData[category.id] || {};
            const Icon = categoryInfo.icon || Crown;
            const isFeatured = categoryInfo.featured;

            return (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        <Star size={12} className="fill-current" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Category Icon */}
                  <div className={`absolute top-4 right-4 p-3 rounded-2xl bg-gradient-to-r ${categoryInfo.gradient || 'from-gray-500 to-gray-700'} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={20} />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold capitalize">{category.name}</h3>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                    </div>
                    
                    <p className="text-blue-100 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {categoryInfo.description || 'Explore premium collection'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                        {category.productCount} premium items
                      </span>
                      {category.trending && (
                        <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                          <TrendingUp size={12} />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Bottom Info Bar */}
                <div className="p-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Explore Collection
                    </span>
                    <div className="flex items-center gap-1 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      <span className="text-xs font-medium">View</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link
            to="/categories"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>View All Categories</span>
            <Sparkles size={20} />
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mockCategories.length}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Premium Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {mockCategories.reduce((sum, cat) => sum + cat.productCount, 0)}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Curated Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Quality Assured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;