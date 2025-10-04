import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, Award, Sparkles, Star, Crown, Zap, Play, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const premiumFeatures = [
    { icon: Award, text: 'Premium Quality', subtext: 'Curated Excellence' },
    { icon: Truck, text: 'Free Shipping', subtext: 'On Orders $50+' },
    { icon: Shield, text: 'Secure Payment', subtext: '256-bit Encryption' },
    { icon: Clock, text: '24/7 Support', subtext: 'Always Available' }
  ];

  const stats = [
    { number: '10K+', label: 'Premium Products' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-4">
              <Sparkles className="text-blue-600" size={20} />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Premium Collection Launch</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Elevate Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lifestyle
              </span>{' '}
              with Premium Excellence
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              Discover meticulously curated products that redefine quality, design, and performance. 
              Experience the pinnacle of shopping with our exclusive collection.
            </p>

            {/* Feature List */}
            <div className="space-y-3">
              {[
                'Handpicked premium products',
                'Exceptional customer service',
                'Fast & free shipping',
                'Secure payment processing'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link 
                to="/products" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Explore Collection</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative" />
              </Link>
              
              <Link 
                to="/about" 
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-semibold rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>Watch Story</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 max-w-md">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                alt="Premium Shopping Experience"
                className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform rotate-6">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Premium</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform -rotate-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {premiumFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{feature.text}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{feature.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;