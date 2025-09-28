import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/header.jsx';
import Footer from '../components/layout/footer.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;