import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Crown, 
  Star, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import ProductCard from '../../components/product/product-card.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';

const FeaturedProducts = () => {
  const { addToCart } = useCartContext();
  
  // Enhanced featured products selection
  const featuredProducts = mockProducts
    .filter(product => product.rating >= 4.5 || product.featured)
    .slice(0, 8);

  const premiumStats = [
    { 
      icon: Star, 
      value: '4.8+', 
      label: 'Average Rating',
      gradient: 'from-yellow-500 to-amber-500'
    },
    { 
      icon: Award, 
      value: '100%', 
      label: 'Quality Verified',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: TrendingUp, 
      value: 'Premium', 
      label: 'Curated Selection',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Zap, 
      value: '24/7', 
      label: 'Support',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6 shadow-sm">
            <Crown className="text-yellow-600 dark:text-yellow-400" size={20} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Editor's Picks
            </span>
            <Sparkles className="text-blue-600 dark:text-blue-400" size={16} />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
            Curated Excellence
          </h2>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium products, each meticulously chosen for exceptional quality, 
            innovative design, and outstanding performance.
          </p>
        </motion.div>

        {/* Premium Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 max-w-5xl mx-auto"
        >
          {premiumStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -8 }}
              className="transform-gpu"
            >
              <ProductCard
                product={product}
                onAddToCart={() => addToCart(product)}
                onAddToWishlist={() => console.log('Wishlist:', product.id)}
                onQuickView={() => console.log('Quick View:', product.id)}
                featured={true}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 lg:p-12 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
                <Sparkles size={14} />
                <span>Exclusive Collection</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Experience Premium?
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Explore our complete collection of meticulously curated products designed to elevate your lifestyle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/products" 
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    <span>Explore Full Collection</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/categories" 
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Browse by Category</span>
                    <Sparkles className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-6">
            <ShieldCheck size={16} />
            <span>Trusted by Premium Customers Worldwide</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8 opacity-60">
            {['Quality', 'Excellence', 'Innovation', 'Luxury', 'Premium', 'Elegance'].map((word) => (
              <div 
                key={word} 
                className="flex items-center gap-2 text-gray-400 dark:text-gray-500"
              >
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{word}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;