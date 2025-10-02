import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  ArrowRight,
  Globe,
  Shield,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

const NotFound = () => {
  const quickLinks = [
    {
      icon: <Home className="w-5 h-5" />,
      title: "Homepage",
      description: "Return to our main page",
      path: "/"
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Product Search",
      description: "Find what you're looking for",
      path: "/products"
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "Shopping Cart",
      description: "Review your items",
      path: "/cart"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "256-bit SSL encryption"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Always here to help"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Shipping worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Animated 404 */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative">
                404
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-10 blur-xl"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-400 rounded-full animate-bounce"></div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Oops! Page Lost in Space
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have drifted into the digital cosmos. 
              Don't worry, we'll help you find your way back to amazing shopping experiences.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {link.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Search Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Can't Find What You Need?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching our entire product catalog
              </p>
            </div>
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-4"
              >
                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4 shadow-lg border border-gray-100 dark:border-gray-700">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Back to Homepage
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              Need immediate help?{' '}
              <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-float"></div>
      <div className="fixed top-1/3 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-1/4 left-20 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-1/3 right-10 w-5 h-5 bg-green-400 rounded-full opacity-25 animate-float" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default NotFound;