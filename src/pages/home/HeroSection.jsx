import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Premium Shopping
              <span className="text-gradient"> Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover the finest collection of products with unbeatable quality and exceptional customer service.
              Shop with confidence and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products" className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-3">
                Learn More
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="flex items-center gap-3">
                <Truck className="text-green-500" size={24} />
                <span className="text-gray-700 dark:text-gray-300">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-blue-500" size={24} />
                <span className="text-gray-700 dark:text-gray-300">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-purple-500" size={24} />
                <span className="text-gray-700 dark:text-gray-300">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-yellow-500" size={24} />
                <span className="text-gray-700 dark:text-gray-300">Quality Guarantee</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Premium Shopping"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-500 rounded-2xl opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary-500 rounded-2xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;