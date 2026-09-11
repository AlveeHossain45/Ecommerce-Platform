import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/header.jsx';
import Footer from '../../components/layout/footer.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;