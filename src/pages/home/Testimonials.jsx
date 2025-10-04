import React from 'react';
import { Star, Quote, Sparkles, Crown, Award } from 'lucide-react';
import Carousel, { CarouselItem } from '../../components/ui/carousel.jsx';

const Testimonials = () => {
  const testimonials = [
    { 
      id: '1', 
      name: 'Sarah Johnson', 
      role: 'Fashion Blogger', 
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&h=150&q=80', 
      rating: 5, 
      comment: 'The quality of products here is absolutely exceptional. Every item feels premium and lasts much longer than expected. Customer service is outstanding!',
      verified: true,
      featured: true
    },
    { 
      id: '2', 
      name: 'Mike Chen', 
      role: 'Tech Enthusiast', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80', 
      rating: 5, 
      comment: 'Fast shipping and genuine products. The attention to detail in packaging and delivery shows they truly care about customer experience.',
      verified: true,
      featured: false
    },
    { 
      id: '3', 
      name: 'Emily Davis', 
      role: 'Interior Designer', 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80', 
      rating: 5, 
      comment: 'Beautiful items that completely transformed my living space. The premium quality is evident in every product. Highly recommended!',
      verified: true,
      featured: true
    },
    { 
      id: '4', 
      name: 'Alex Rodriguez', 
      role: 'Business Owner', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', 
      rating: 5, 
      comment: 'Outstanding service and premium products. The seamless shopping experience and quick resolution of queries impressed me the most.',
      verified: true,
      featured: false
    },
    { 
      id: '5', 
      name: 'Priya Patel', 
      role: 'Lifestyle Influencer', 
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&h=150&q=80', 
      rating: 5, 
      comment: 'Absolutely love the curated collections! Each product feels special and well-thought-out. My go-to for premium shopping.',
      verified: true,
      featured: true
    }
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '98%', label: 'Recommend Us' }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl transform -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform translate-x-32 translate-y-32" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <Sparkles className="text-yellow-600" size={20} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Customer Stories</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Voices of Excellence
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of premium customers trust us for exceptional quality and unparalleled service experiences.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            items={testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id}>
                <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mx-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 transform hover:scale-105 ${
                  testimonial.featured ? 'ring-2 ring-yellow-400/20' : ''
                }`}>
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="text-blue-600/20 dark:text-blue-400/20" size={48} />
                    {testimonial.featured && (
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                        <Crown size={16} />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={`${
                            i < testimonial.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 text-center italic">
                    "{testimonial.comment}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
                      />
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <Award size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                      {testimonial.verified && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified Buyer</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
            autoPlay={true}
            interval={5000}
            showDots={true}
            showArrows={true}
          />
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-6">
            Trusted by Premium Customers Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Quality', 'Excellence', 'Trust', 'Premium', 'Service', 'Satisfaction'].map((word) => (
              <div key={word} className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;