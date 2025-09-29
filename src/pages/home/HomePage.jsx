import React from 'react';
import HeroSection from './HeroSection.jsx';
import CategoryGrid from './CategoryGrid.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';
import Testimonials from './Testimonials.jsx';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <Testimonials />
    </div>
  );
};

export default HomePage;