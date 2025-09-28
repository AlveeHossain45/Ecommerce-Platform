import React, { useState } from 'react';
import { Star, User, CheckCircle } from 'lucide-react';

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
    comment: ''
  });

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
      onAddReview(newReview);
      setNewReview({ rating: 0, title: '', comment: '' });
      setShowReviewForm(false);
    } else {
      alert("Please fill all fields and provide a rating.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Based on {totalReviews} reviews</div>
        </div>
        <div className="col-span-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm text-gray-600 dark:text-gray-400">{stars}</span>
                <Star size={16} className="text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} /></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* ... Review Form and List ... */}
      
    </div>
  );
};

export default ReviewSection;