import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Our Store</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Welcome to Bangladesh's premier ecommerce destination, where quality meets convenience
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, we started as a small local business with a big vision - to revolutionize online shopping in Bangladesh. Today, we're proud to be one of the fastest-growing ecommerce platforms in the country.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We connect thousands of customers with trusted sellers, offering everything from electronics and fashion to home essentials and beyond.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50K+</div>
                  <div className="text-gray-500">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-500">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">64</div>
                  <div className="text-gray-500">Cities Served</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Our Team" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Our Warehouse" 
                className="rounded-lg shadow-md mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best online shopping experience in Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                description: "Quick delivery across Bangladesh with multiple shipping options"
              },
              {
                icon: "🛡️",
                title: "Secure Payment",
                description: "100% secure payment gateway with SSL encryption"
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                description: "Hassle-free return policy within 7 days"
              },
              {
                icon: "📞",
                title: "24/7 Support",
                description: "Round-the-clock customer support in Bengali & English"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make online shopping accessible, reliable, and enjoyable for every Bangladeshi. We strive to bring the best products at competitive prices with exceptional customer service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Bangladesh's most trusted ecommerce platform, empowering local businesses and delighting customers with seamless shopping experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers shopping with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Shopping
            </button>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;