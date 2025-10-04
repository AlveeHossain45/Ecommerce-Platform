import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  if (!images || images.length === 0) return null;

  const handleZoom = (e) => {
    if (!isZoomed) {
      setIsZoomed(true);
      return;
    }

    if (imageRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - container.left) / container.width) * 100;
      const y = ((e.clientY - container.top) / container.height) * 100;
      setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setIsZoomed(false);
  };

  const navigateImage = (direction) => {
    setSelectedImage((prev) => {
      if (direction === 'next') {
        return prev === images.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
    });
    setIsZoomed(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-6">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all duration-500 ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'cursor-zoom-in'
        }`}
        onMouseMove={isZoomed ? handleZoom : undefined}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={!isZoomed ? () => setIsZoomed(true) : undefined}
      >
        {/* Main Image */}
        <motion.img
          key={selectedImage}
          ref={imageRef}
          src={images[selectedImage]}
          alt={`Product view ${selectedImage + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
            transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
            cursor: isZoomed ? 'move' : 'zoom-in'
          }}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft 
                size={24} 
                className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200" 
              />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight 
                size={24} 
                className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200" 
              />
            </motion.button>
          </>
        )}

        {/* Zoom Controls */}
        <AnimatePresence>
          {(isHovering || isZoomed || isFullscreen) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 right-6 flex gap-3"
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                  if (isZoomed) setZoomPosition({ x: 50, y: 50 });
                }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isZoomed ? (
                  <ZoomOut size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-200" />
                ) : (
                  <ZoomIn size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
                )}
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreen();
                }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize2 size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-500 transition-colors duration-200" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        )}

        {/* Zoom Indicator */}
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium"
          >
            250%
          </motion.div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 relative ${
                selectedImage === index
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/25'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Selected Indicator */}
              {selectedImage === index && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            <button
              onClick={handleFullscreen}
              className="absolute top-8 right-8 text-white text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/70 transition-colors duration-200"
            >
              Exit Fullscreen (ESC)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};