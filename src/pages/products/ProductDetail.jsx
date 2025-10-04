import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Shield, Truck, RotateCcw, Check } from 'lucide-react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { mockProducts } from '../../data/mockData.js';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-rose-100 to-teal-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-200 to-teal-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">😔</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            We couldn't find the product you're looking for. It might have been moved or no longer available.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const features = [
    { icon: Truck, text: 'Free shipping & returns' },
    { icon: Shield, text: '2-year warranty' },
    { icon: RotateCcw, text: '30-day money back guarantee' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
            <Check size={20} />
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>›</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="aspect-square overflow-hidden rounded-xl mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg border border-gray-200 dark:border-gray-700">
                  <feature.icon size={24} className="mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            className={`${
                              i < Math.floor(product.rating) 
                                ? 'fill-current' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {product.reviewCount} reviews
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      In Stock
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={toggleWishlist}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
                  <button className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <Truck size={18} />
                  Free shipping available
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-700">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-6 py-4 text-xl font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-8 py-4 text-xl font-bold text-gray-900 dark:text-white min-w-20 text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-6 py-4 text-xl font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Buy Now Button */}
                <button className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Product Details</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Electronics</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Brand:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">PremiumTech</span>
                  </li>
                  <li className="flex justify-between">
                    <span>SKU:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">PT{product.id}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Shipping Info</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-3">
                    <Truck size={18} className="text-blue-600" />
                    <span>Free standard shipping</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield size={18} className="text-green-600" />
                    <span>2-year warranty included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <RotateCcw size={18} className="text-purple-600" />
                    <span>30-day returns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;