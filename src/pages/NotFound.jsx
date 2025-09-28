import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-9xl font-bold text-primary-500">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn-primary px-6 py-3">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;