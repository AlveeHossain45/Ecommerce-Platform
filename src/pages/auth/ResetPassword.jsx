import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import { validatePassword } from '../../services/utils/validators.js';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  // state and handlers
  return (
    <div className="card p-8">
        <Link to="/auth/login" className="flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6"><ArrowLeft size={16} />Back to Login</Link>
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Your Password</h2>
            <p className="text-gray-600 dark:text-gray-400">Create a new strong password</p>
        </div>
        {/* Form goes here */}
    </div>
  );
};

export default ResetPassword;