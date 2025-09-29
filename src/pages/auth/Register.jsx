import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterForm from '../../components/auth/register-form.jsx';
import { SocialAuth } from '../../components/auth/social-auth.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { ShoppingBag, Sparkles, ArrowLeft, Gem, Crown } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      navigate('/');
    } else {
      setError('Failed to create an account. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/70 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-32 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl opacity-40 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Left Side - Premium Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
          {/* Background Graphics */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float delay-1000"></div>
          </div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 text-center max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="relative mb-12"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Crown className="text-white" size={48} />
              </div>
              {/* Icon Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-red-500 rounded-3xl blur-2xl opacity-30 -z-10 mx-auto w-32 h-32 animate-pulse"></div>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight"
            >
              Join{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                UltraShop
              </span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed font-medium"
            >
              Become part of our exclusive community and unlock premium benefits, 
              early access to new collections, and personalized shopping experiences.
            </motion.p>
            
            {/* Premium Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 gap-6 text-left max-w-md mx-auto"
            >
              {[
                { text: 'Exclusive Member Deals', color: 'from-green-500 to-emerald-500' },
                { text: 'Early Product Access', color: 'from-blue-500 to-cyan-500' },
                { text: 'Free Premium Shipping', color: 'from-purple-500 to-pink-500' },
                { text: '24/7 Priority Support', color: 'from-orange-500 to-red-500' }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className={`w-3 h-3 bg-gradient-to-r ${benefit.color} rounded-full ring-2 ring-white dark:ring-gray-800 shadow-lg group-hover:scale-125 transition-transform duration-300`}></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Back to Home */}
            <motion.div
              whileHover={{ x: -4 }}
              className="mb-8"
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </motion.div>

            {/* Premium Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 transform transition-all duration-500 hover:shadow-3xl">
                
                {/* Premium Badge */}
                <div className="absolute -top-3 -left-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Gem size={12} />
                    <span>EXCLUSIVE</span>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      <ShoppingBag className="text-white" size={32} />
                    </div>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 -z-10 mx-auto w-20 h-20"></div>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3 tracking-tight"
                  >
                    Join UltraShop
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 dark:text-gray-400 text-sm font-medium"
                  >
                    Create your account and start your premium shopping journey
                  </motion.p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.8 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.8 }}
                      className="p-4 bg-red-50/80 dark:bg-red-900/30 border border-red-200/50 dark:border-red-800/50 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium mb-6 backdrop-blur-sm shadow-lg"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Register Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center my-8"
                >
                  <div className="flex-1 border-t border-gray-200/60 dark:border-gray-700/60"></div>
                  <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-1 rounded-full">or continue with</span>
                  <div className="flex-1 border-t border-gray-200/60 dark:border-gray-700/60"></div>
                </motion.div>

                {/* Social Auth */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <SocialAuth />
                </motion.div>

                {/* Sign In Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link 
                      to="/auth/login" 
                      className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Sign in now
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-6"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                🔒 Your data is securely encrypted and protected
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;