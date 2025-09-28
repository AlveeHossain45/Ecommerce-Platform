import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Carousel = ({
  items,
  autoPlay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const timer = setInterval(() => nextSlide(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  const goToSlide = (index) => setCurrentIndex(index);

  if (!items || items.length === 0) return null;

  return (
    <div className={clsx('relative overflow-hidden rounded-lg', className)}>
      <div className="relative h-64 md:h-96">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showControls && items.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"><ChevronRight size={24} /></button>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={clsx('w-3 h-3 rounded-full transition-all', index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70')} />
          ))}
        </div>
      )}
    </div>
  );
};

export const CarouselItem = ({ children, className }) => (
  <div className={clsx('w-full h-full flex items-center justify-center', className)}>
    {children}
  </div>
);

export default Carousel;