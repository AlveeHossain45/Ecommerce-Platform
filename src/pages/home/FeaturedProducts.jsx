import React from 'react';
import ProductCard from '../../components/product/product-card.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';
import { Link } from 'react-router-dom';
import { Sparkles, Crown, Star, ArrowRight, TrendingUp, Award, Zap } from 'lucide-react';

const FeaturedProducts = () => {
  const { addToCart } = useCartContext();
  
  // Enhanced featured products selection with premium criteria
  const featuredProducts = mockProducts
    .filter(product => product.rating >= 4.5 || product.featured)
    .slice(0, 8);

  const premiumStats = [
    { icon: Star, value: '4.8+', label: 'Average Rating' },
    { icon: Award, value: '100%', label: 'Quality Verified' },
    { icon: TrendingUp, value: 'Premium', label: 'Curated Selection' },
    { icon: Zap, value: '24/7', label: 'Support' }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <Crown className="text-yellow-600" size={20} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Editor's Picks</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Curated Excellence
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium products, each meticulously chosen for exceptional quality, 
            innovative design, and outstanding performance.
          </p>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {premiumStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="transform transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => addToCart(product)}
                onAddToWishlist={() => console.log('Wishlist:', product.id)}
                onQuickView={() => console.log('Quick View:', product.id)}
                featured={true}
              />
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Experience Premium?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Explore our complete collection of meticulously curated products designed to elevate your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/products" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Explore Full Collection</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                to="/categories" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Browse by Category</span>
                <Sparkles className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-6">
            Trusted by Premium Customers Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Quality', 'Excellence', 'Innovation', 'Luxury', 'Premium', 'Elegance'].map((word) => (
              <div key={word} className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;