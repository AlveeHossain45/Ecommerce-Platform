import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Carousel = ({
  items,
  autoPlay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  showProgress = true,
  className,
  variant = 'default',
  overlayContent = false,
  enableZoom = false,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [isPlaying, interval, items.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleZoom = (item) => {
    if (enableZoom && item.props['data-zoom-src']) {
      setZoomImage(item.props['data-zoom-src']);
    }
  };

  if (!items || items.length === 0) return null;

  const variants = {
    default: 'rounded-xl',
    modern: 'rounded-2xl',
    minimal: 'rounded-lg'
  };

  const controlVariants = {
    default: 'bg-black/50 hover:bg-black/70',
    modern: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    minimal: 'bg-transparent hover:bg-black/20'
  };

  return (
    <>
      <div 
        className={clsx(
          'relative overflow-hidden bg-gray-100 dark:bg-gray-900',
          variants[variant],
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        {/* Main Carousel Container */}
        <div className="relative h-64 md:h-96 lg:h-[500px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0 w-full h-full"
            >
              {React.cloneElement(items[currentIndex], {
                className: clsx(
                  'w-full h-full object-cover',
                  items[currentIndex].props.className
                ),
                onClick: () => handleZoom(items[currentIndex])
              })}
            </motion.div>
          </AnimatePresence>

          {/* Overlay Content */}
          {overlayContent && items[currentIndex].props['data-content'] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            >
              <div className="text-white">
                {items[currentIndex].props['data-content']}
              </div>
            </motion.div>
          )}

          {/* Zoom Button */}
          {enableZoom && items[currentIndex].props['data-zoom-src'] && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleZoom(items[currentIndex])}
              className={clsx(
                'absolute top-4 right-4 p-2 rounded-full text-white backdrop-blur-md',
                controlVariants[variant]
              )}
            >
              <ZoomIn size={20} />
            </motion.button>
          )}
        </div>

        {/* Navigation Controls */}
        {showControls && items.length > 1 && (
          <>
            {/* Previous Button */}
            <motion.button
              onClick={prevSlide}
              className={clsx(
                'absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white rounded-full transition-all duration-300 backdrop-blur-md',
                controlVariants[variant],
                isHovering ? 'opacity-100' : 'opacity-0'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              className={clsx(
                'absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white rounded-full transition-all duration-300 backdrop-blur-md',
                controlVariants[variant],
                isHovering ? 'opacity-100' : 'opacity-0'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Play/Pause Button */}
            {autoPlay && (
              <motion.button
                onClick={togglePlay}
                className={clsx(
                  'absolute top-4 left-4 p-2 text-white rounded-full transition-all duration-300 backdrop-blur-md',
                  controlVariants[variant],
                  isHovering ? 'opacity-100' : 'opacity-0'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
            )}
          </>
        )}

        {/* Progress Bar */}
        {showProgress && autoPlay && items.length > 1 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: interval / 1000, 
                ease: "linear" 
              }}
              key={currentIndex}
            />
          </div>
        )}

        {/* Indicators */}
        {showIndicators && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={clsx(
                  'rounded-full transition-all duration-300 backdrop-blur-md',
                  index === currentIndex 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={clsx(
                    'rounded-full transition-all',
                    index === currentIndex ? 'w-8 h-2' : 'w-2 h-2'
                  )}
                  layout
                />
              </motion.button>
            ))}
          </div>
        )}

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-md">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setZoomImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={zoomImage}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <ChevronRight size={24} className="rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const CarouselItem = ({ children, className, ...props }) => (
  <div className={clsx('w-full h-full flex items-center justify-center', className)} {...props}>
    {children}
  </div>
);

export default Carousel;