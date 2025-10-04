import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, CheckCircle, ThumbsUp, MessageCircle, Award, Sparkles } from 'lucide-react';

const ReviewSection = ({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  onAddReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    name: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return {
      stars,
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
    };
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating > 0 && newReview.title && newReview.comment) {
      onAddReview({
        ...newReview,
        date: new Date().toISOString(),
        verified: true
      });
      setNewReview({ rating: 0, title: '', comment: '', name: '' });
      setShowReviewForm(false);
    }
  };

  const StarRating = ({ rating, onRate, interactive = false, size = 20 }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type={interactive ? "button" : "div"}
            onClick={interactive ? () => onRate(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            className={`transition-all duration-200 ${
              interactive ? 'cursor-pointer hover:scale-110' : ''
            }`}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
          >
            <Star
              size={size}
              className={`${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              } transition-colors duration-200`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Average Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="text-6xl font-bold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex flex-col items-start">
                <StarRating rating={averageRating} size={24} />
                <div className="text-gray-600 dark:text-gray-400 mt-2">
                  {totalReviews} verified reviews
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={() => setShowReviewForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Write a Review
            </motion.button>
          </div>

          {/* Rating Distribution */}
          <div className="col-span-2 space-y-4">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <motion.div
                key={stars}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stars * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="flex items-center gap-2 w-20">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stars}
                  </span>
                  <Star size={18} className="text-yellow-400 fill-current" />
                </div>
                
                <div className="flex-1 relative">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: stars * 0.2 }}
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full shadow-lg shadow-yellow-400/25"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-20 justify-end">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {count}
                  </span>
                  <span className="text-xs text-gray-500">({percentage.toFixed(0)}%)</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <MessageCircle size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Write Your Review</h3>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  How would you rate this product? *
                </label>
                <div className="flex items-center gap-4">
                  <StarRating 
                    rating={newReview.rating} 
                    onRate={(rating) => setNewReview({...newReview, rating})}
                    interactive={true}
                    size={32}
                  />
                  <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    {newReview.rating > 0 ? `${newReview.rating}.0` : 'Select rating'}
                  </span>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  placeholder="Summarize your experience..."
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Your Review *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share details of your experience with this product..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 resize-none"
                />
              </div>

              {/* Name (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  placeholder="How should we display your name?"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  type="submit"
                  disabled={!newReview.rating || !newReview.title || !newReview.comment}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle size={20} />
                  Submit Review
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customer Reviews ({totalReviews})
          </h3>
          
          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
              <option>Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name?.charAt(0) || <User size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.name || 'Anonymous'}
                        </h4>
                        {review.verified && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                            <CheckCircle size={14} />
                            <span>Verified Purchase</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <StarRating rating={review.rating} size={14} />
                        <span>•</span>
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200">
                    <ThumbsUp size={18} className="text-gray-400 hover:text-blue-500" />
                  </button>
                </div>

                <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  {review.title}
                </h5>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {review.comment}
                </p>

                {review.isFeatured && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <Award size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                      Featured Review
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💬</div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No reviews yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to share your thoughts about this product!
            </p>
            <motion.button
              onClick={() => setShowReviewForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Write the First Review
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;