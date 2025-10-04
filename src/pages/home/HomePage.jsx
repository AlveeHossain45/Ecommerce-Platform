import React from 'react';
import HeroSection from './HeroSection.jsx';
import CategoryGrid from './CategoryGrid.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';
import Testimonials from './Testimonials.jsx';
import { Sparkles, Crown, Zap, TrendingUp, Award, Star, Shield, Clock, Truck, RotateCcw, Headphones } from 'lucide-react';

const HomePage = () => {
  // Premium statistics data - existing logic maintain
  const premiumStats = [
    { icon: Award, value: '10K+', label: 'Premium Products', color: 'text-yellow-600' },
    { icon: Star, value: '50K+', label: 'Happy Customers', color: 'text-blue-600' },
    { icon: Shield, value: '100%', label: 'Quality Assured', color: 'text-green-600' },
    { icon: Clock, value: '24/7', label: 'Support', color: 'text-purple-600' }
  ];

  // Premium services data
  const premiumServices = [
    {
      icon: Truck,
      title: "Free Express Shipping",
      description: "Free 2-day delivery on orders over $50",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "2-Year Warranty",
      description: "Extended protection on all premium products",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 -z-10" />
      
      {/* Main Content - Original structure maintained */}
      <div className="relative z-10">
        <HeroSection />
        
        {/* Premium Stats Bar */}
        <section className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumStats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturedProducts />
        
        {/* Premium Value Proposition */}
        <section className="py-20 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-900/10 dark:to-purple-900/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
                <Crown className="text-yellow-600" size={20} />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Why Choose Us</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium</span> Difference
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience shopping redefined with our commitment to excellence, quality, and unparalleled service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Sparkles,
                  title: "Curated Selection",
                  description: "Every product is handpicked for quality, design, and performance by our expert team.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Shield,
                  title: "Quality Guaranteed",
                  description: "Rigorous quality checks ensure you receive only the finest products every time.",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Zap,
                  title: "Fast & Secure",
                  description: "Lightning-fast delivery with enterprise-grade security for your peace of mind.",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryGrid />
        
        {/* Premium Services Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
                <Zap className="text-blue-600" size={20} />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premium Services</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Exceptional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Beyond products, we deliver an unparalleled service experience that puts you first.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {premiumServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Experience Premium?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of satisfied customers who have elevated their shopping experience with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Start Shopping Now
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Learn More About Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;