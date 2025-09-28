import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/register-form.jsx';
// The fix is here: Added curly braces {} around SocialAuth
import { SocialAuth } from '../../components/auth/social-auth.jsx'; 
import { useAuth } from '../../contexts/AuthContext.jsx';

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
    <div className="card p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h2>
        <p className="text-gray-600 dark:text-gray-400">Join us and start shopping!</p>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      
      <SocialAuth />
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-medium text-primary-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;