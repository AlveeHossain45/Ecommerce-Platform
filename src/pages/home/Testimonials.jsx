import React from 'react';
import { Star, Quote } from 'lucide-react';
import Carousel, { CarouselItem } from '../../components/ui/carousel.jsx';

const Testimonials = () => {
  const testimonials = [
    { id: '1', name: 'Sarah Johnson', role: 'Fashion Blogger', image: '...', rating: 5, comment: 'Exceptional quality and service!' },
    { id: '2', name: 'Mike Chen', role: 'Tech Enthusiast', image: '...', rating: 5, comment: 'Fast shipping and genuine products.' },
    { id: '3', name: 'Emily Davis', role: 'Interior Designer', image: '...', rating: 5, comment: 'Beautiful items that transformed my space.' }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <Carousel
            items={testimonials.map(t => (
              <CarouselItem key={t.id}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mx-4 text-center">
                  <Quote className="text-primary-500 mb-4 mx-auto" size={32} />
                  <div className="flex justify-center mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} size={20} className="text-yellow-400 fill-current" />)}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 italic">"{t.comment}"</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t.role}</p>
                </div>
              </CarouselItem>
            ))}
            autoPlay={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;