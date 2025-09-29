import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Shield, Truck, Headphones, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Onzero', path: '/about' },
        { name: 'Our Story', path: '/story' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press Kit', path: '/press' },
        { name: 'Sustainability', path: '/sustainability' }
      ]
    },
    {
      title: 'Shop',
      links: [
        { name: 'All Products', path: '/products' },
        { name: 'New Arrivals', path: '/products?filter=new' },
        { name: 'Best Sellers', path: '/products?filter=bestsellers' },
        { name: 'Premium Collection', path: '/products?filter=premium' },
        { name: 'Limited Edition', path: '/products?filter=limited' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Help Center', path: '/help' },
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns & Exchanges', path: '/returns' },
        { name: 'Size Guide', path: '/size-guide' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: Shield,
      title: '2-Year Warranty',
      description: 'Product protection'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated help center'
    },
    {
      icon: Globe,
      title: 'Global Shipping',
      description: 'Worldwide delivery'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="inline-block mb-6">
                  <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Onzero
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">onexero.netlify.app</p>
                </Link>
                
                <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                  Redefining excellence in premium e-commerce. Experience the future of online shopping with curated collections and unparalleled service.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                    <Mail size={16} className="text-blue-400" />
                    <span>hello@onzero.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                    <Phone size={16} className="text-green-400" />
                    <span>+1 (555) 123-ONZE</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                    <MapPin size={16} className="text-red-400" />
                    <span>New York, NY 10001</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                  {section.title}
                  <ArrowRight size={16} className="ml-2 text-blue-400" />
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-t border-gray-800/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                Join the Onzero Community
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Be the first to know about new collections, exclusive offers, and insider updates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from Onzero.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} <span className="text-white font-semibold">Onzero</span>. All rights reserved. 
                <span className="mx-2">•</span>
                <span className="text-blue-400">onexero.netlify.app</span>
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <span>Accepted Payments:</span>
              <div className="flex items-center space-x-2">
                {['💳', '🅿️', '💰', '💸'].map((emoji, index) => (
                  <span key={index} className="text-lg">{emoji}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 opacity-10">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;