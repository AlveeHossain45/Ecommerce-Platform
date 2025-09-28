import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/login-form.jsx';
// The fix is here: Added curly braces {} around SocialAuth
import { SocialAuth } from '../../components/auth/social-auth.jsx'; 
import { useAuth } from '../../contexts/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="card p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</h2>
        <p className="text-gray-600 dark:text-gray-400">Sign in to continue to UltraShop</p>
      </div>
      
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      
      <SocialAuth />
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-medium text-primary-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;