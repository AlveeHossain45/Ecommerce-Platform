import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  ArrowRight,
  Globe,
  Shield,
  Truck,
  Headphones,
  Sparkles,
  Zap,
  Compass,
  Rocket
} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: Home,
      title: "Homepage",
      description: "Return to our main page",
      path: "/",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Products",
      description: "Browse our collection",
      path: "/products",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: ShoppingCart,
      title: "Shopping Cart",
      description: "Review your items",
      path: "/cart",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "256-bit SSL encryption"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Shipping worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Animated 404 */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Giant 404 */}
            <div className="relative inline-block mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="text-[180px] lg:text-[240px] font-black leading-none bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative"
              >
                404
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center"
              >
                <Compass size={32} className="text-white" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center"
              >
                <Rocket size={32} className="text-white" />
              </motion.div>
            </div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Lost in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Space
              </span>
              ?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              The page you're looking for seems to have drifted into the digital cosmos.
              Don't worry, we'll help you find your way back to amazing shopping experiences.
            </motion.p>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="group block bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                  >
                    {/* Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${link.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" size={20} />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 mb-16 border border-white/50 dark:border-gray-700/50"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-3 border border-blue-100 dark:border-blue-800 mb-4">
                <Search className="text-blue-600 dark:text-blue-400" size={20} />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search Our Catalog</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Can't Find What You Need?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching our entire premium product catalog
              </p>
            </div>

            {/* Search Input */}
            <div className="max-w-2xl mx-auto">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = e.target.search.value.trim();
                  if (query) {
                    navigate(`/products?q=${encodeURIComponent(query)}`);
                  }
                }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-30 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white dark:bg-gray-700 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-600 focus-within:border-blue-500 transition-all duration-300">
                  <Search className="ml-5 text-gray-400" size={24} />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search products, brands, categories..."
                    className="flex-1 px-4 py-4 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-400 text-lg"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="m-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Search</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <Home size={24} />
              <span>Back to Homepage</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
              Need immediate help?{' '}
              <Link 
                to="/contact" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="fixed top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-40 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="fixed top-1/3 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-40 blur-sm"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        className="fixed bottom-1/4 left-20 w-3 h-3 bg-yellow-400 rounded-full opacity-40 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
        className="fixed bottom-1/3 right-10 w-5 h-5 bg-green-400 rounded-full opacity-40 blur-sm"
      />
    </div>
  );
};

export default NotFound;