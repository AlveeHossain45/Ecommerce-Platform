import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Premium Shopping <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover the finest collection of products with unbeatable quality and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products" className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-3">Learn More</Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="Premium Shopping"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;