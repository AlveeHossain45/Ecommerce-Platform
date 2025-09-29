import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowLeft, Check, X, Loader, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validatePassword } from '../../services/utils/validators.js';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      calculatePasswordStrength(value);
    }

    if (error) setError('');
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password does not meet security requirements.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'from-gray-400 to-gray-500';
      case 1: return 'from-red-500 to-red-600';
      case 2: return 'from-orange-500 to-orange-600';
      case 3: return 'from-yellow-500 to-yellow-600';
      case 4: return 'from-green-500 to-emerald-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One number', met: /[0-9]/.test(formData.password) },
    { text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) }
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-emerald-200 to-cyan-200 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl opacity-40 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back to Login */}
          <motion.div
            whileHover={{ x: -4 }}
            className="mb-8"
          >
            <Link 
              to="/auth/login" 
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Login</span>
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
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 transform transition-all duration-500 hover:shadow-3xl">
              
              {/* Security Badge */}
              <div className="absolute -top-3 -right-3">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <Shield size={12} />
                  <span>SECURE</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
                        className="relative"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                          <Lock className="text-white" size={32} />
                        </div>
                        {/* Icon Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur-lg opacity-30 -z-10 mx-auto w-20 h-20"></div>
                      </motion.div>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3 tracking-tight"
                      >
                        Reset Password
                      </motion.h2>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-600 dark:text-gray-400 text-sm font-medium"
                      >
                        Create a new strong password for your account
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

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Password Field */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 pr-12"
                            placeholder="Enter your new password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>

                        {/* Password Strength */}
                        {formData.password && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500 dark:text-gray-400">Password strength:</span>
                              <span className={`font-medium ${
                                passwordStrength === 4 ? 'text-emerald-600' :
                                passwordStrength >= 2 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-500`}
                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                              ></div>
                            </div>
                          </motion.div>
                        )}

                        {/* Password Requirements */}
                        {formData.password && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 space-y-2 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl"
                          >
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Password requirements:
                            </p>
                            {passwordRequirements.map((req, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                {req.met ? (
                                  <Check size={12} className="text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <X size={12} className="text-gray-400 flex-shrink-0" />
                                )}
                                <span className={req.met ? 'text-emerald-600' : 'text-gray-500'}>
                                  {req.text}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 pr-12"
                            placeholder="Confirm your new password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs mt-2 flex items-center space-x-1"
                          >
                            <X size={12} />
                            <span>Passwords do not match</span>
                          </motion.p>
                        )}
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-emerald-500 text-xs mt-2 flex items-center space-x-1"
                          >
                            <Check size={12} />
                            <span>Passwords match</span>
                          </motion.p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || !allRequirementsMet || formData.password !== formData.confirmPassword}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 flex items-center justify-center space-x-2 mt-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader size={18} className="animate-spin" />
                            <span>Resetting Password...</span>
                          </>
                        ) : (
                          <>
                            <Lock size={18} />
                            <span>Reset Password</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                      <Check className="text-white" size={32} />
                    </motion.div>

                    {/* Success Message */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Password Reset!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Your password has been successfully reset.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Redirecting to login page...
                    </p>

                    {/* Loading Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2 mt-4 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full"></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
              <Shield size={12} />
              <span>Your password is encrypted and securely stored</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;