import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Shield,
  Headphones,
  CheckCircle,
  Sparkles,
  Zap,
  User,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      details: "contact@ultrashop.com",
      link: "mailto:contact@ultrashop.com",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      details: "+1 (555) 123-ULTR",
      link: "tel:+15551238857",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello",
      details: "123 Commerce St, Tech City",
      link: "#",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support 24/7",
      details: "Start chatting now",
      link: "#",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Support",
      description: "Enterprise-grade security protects your data",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support for all your needs",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Headphones,
      title: "Expert Team",
      description: "Knowledgeable specialists ready to assist",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { value: '24/7', label: 'Support', gradient: 'from-blue-600 to-cyan-600' },
    { value: '98%', label: 'Satisfaction', gradient: 'from-green-600 to-emerald-600' },
    { value: '15m', label: 'Avg Response', gradient: 'from-purple-600 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90" />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 mb-6">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-sm font-semibold text-white">We're Here to Help</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Get in{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Have a question? Need assistance? Our premium support team is ready to help you with exceptional care.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="container mx-auto px-4 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.link}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden`}
              >
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${method.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {method.description}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {method.details}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          
          {/* Contact Form - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-gray-700/50">
              
              {/* Form Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Send us a Message
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-semibold text-green-800 dark:text-green-200">
                          Message sent successfully!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          We'll be in touch soon.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {errors.submit}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this regarding?"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
                        errors.subject 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 -translate-x-20 blur-2xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Zap size={16} className="text-yellow-300" />
                  <span className="text-xs font-bold uppercase tracking-wider">Premium Support</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6">Why Choose Our Support?</h3>
                
                <div className="space-y-5">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm text-blue-100 leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
                  <Sparkles size={18} className="text-white" />
                </div>
                Quick Help
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: 'Order Tracking', desc: 'Real-time tracking with live updates', color: 'border-blue-500' },
                  { title: 'Returns & Refunds', desc: '30-day easy returns with instant refunds', color: 'border-green-500' },
                  { title: 'Premium Support', desc: 'Priority support for premium members', color: 'border-purple-500' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`border-l-4 ${item.color} pl-4 py-2 hover:translate-x-1 transition-transform duration-300 cursor-pointer`}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;