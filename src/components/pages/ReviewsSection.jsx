import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase/config/firebase-config'; 
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { 
  Star, 
  MessageSquare, 
  User, 
  Calendar,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [newReview, setNewReview] = useState({
    reviewer: '',
    rating: 5,
    review: '',
    role: '',
    stayDate: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsCollection = collection(db, 'reviews');
        const reviewSnapshot = await getDocs(reviewsCollection);
        const reviewList = reviewSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        
        // Sort by date, newest first
        reviewList.sort((a, b) => b.createdAt - a.createdAt);
        setReviews(reviewList);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.reviewer.trim() || !newReview.review.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      const reviewToAdd = {
        ...newReview,
        createdAt: Timestamp.now(),
        verified: false, // Admin can verify reviews later
      };

      await addDoc(collection(db, 'reviews'), reviewToAdd);
      
      // Update local state
      const newReviewWithId = {
        id: Date.now().toString(), // Temporary ID for local state
        ...reviewToAdd,
        createdAt: new Date()
      };
      
      setReviews([newReviewWithId, ...reviews]);
      
      // Reset form
      setNewReview({
        reviewer: '',
        rating: 5,
        review: '',
        role: '',
        stayDate: '',
      });
      
      toast.success('Thank you for your review!');
    } catch (error) {
      console.error("Error adding review: ", error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-luxury-gold fill-current' 
            : 'text-luxury-gray-light'
        }`}
      />
    ));
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getInitials = (name) => {
    if (!name) return 'GU';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const paginatedReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  if (loading) {
    return (
      <section className="section-spacing bg-luxury-black">
        <div className="container-narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-luxury-gold"></div>
              <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
                Loading Reviews
              </span>
              <div className="h-px w-12 bg-luxury-gold"></div>
            </div>
            <div className="text-luxury-text-light">Loading guest experiences...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-luxury-black">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-luxury-gold"></div>
            <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
              Guest Experiences
            </span>
            <div className="h-px w-12 bg-luxury-gold"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-display-sm font-serif font-light text-luxury-text mb-6">
            What Our Guests Are Saying
          </h2>
          
          <p className="text-lg text-luxury-text-light max-w-2xl mx-auto font-light leading-relaxed">
            Discover why discerning travelers choose Peaceful Hotel for 
            their most memorable stays.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-luxury-gray border border-luxury-gray-light p-8 transition-all duration-300 hover:border-luxury-gold/30 group"
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Avatar */}
                    <div className="w-16 h-16 border border-luxury-gold/30 flex items-center justify-center group-hover:border-luxury-gold transition-colors">
                      {review.image ? (
                        <img 
                          src={review.image} 
                          alt={review.reviewer}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-luxury-gold text-xl font-serif">
                          {getInitials(review.reviewer)}
                        </span>
                      )}
                    </div>
                    
                    {/* Reviewer Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-light text-luxury-text mb-1">
                        {review.reviewer || 'Anonymous Guest'}
                      </h3>
                      {review.role && (
                        <div className="text-sm text-luxury-gold mb-2">{review.role}</div>
                      )}
                      
                      {/* Stars & Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                        {review.stayDate && (
                          <div className="flex items-center gap-1 text-sm text-luxury-text-light">
                            <Calendar className="w-3 h-3" />
                            {formatDate(review.stayDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-6">
                    <div className="text-luxury-text-light leading-relaxed">
                      "{review.review}"
                    </div>
                  </div>

                  {/* Verified Badge */}
                  {review.verified && (
                    <div className="inline-flex items-center gap-2 text-xs text-luxury-gold border border-luxury-gold/30 px-3 py-1">
                      <Star className="w-3 h-3" />
                      Verified Stay
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mb-16">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="w-10 h-10 border border-luxury-gray-light flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
                        currentPage === index
                          ? 'bg-luxury-gold text-black'
                          : 'text-luxury-text-light hover:text-luxury-gold'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="w-10 h-10 border border-luxury-gray-light flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Overall Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16 pt-8 border-t border-luxury-gray-light"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="text-4xl font-serif font-light text-luxury-gold mb-2">
                    {reviews.length > 0 
                      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                      : '5.0'
                    }
                  </div>
                  <div className="flex gap-1 justify-center md:justify-start mb-2">
                    {renderStars(5)}
                  </div>
                  <div className="text-sm text-luxury-text-light">
                    Based on {reviews.length} guest reviews
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="text-sm text-luxury-text-light w-8">{rating} stars</div>
                        <div className="w-32 bg-luxury-gray-light h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-luxury-gold h-full rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-luxury-text-light w-8 text-right">
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12 border border-luxury-gray-light"
          >
            <MessageSquare className="w-12 h-12 text-luxury-gold/50 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-light text-luxury-text mb-2">
              No Reviews Yet
            </h3>
            <p className="text-luxury-text-light">
              Be the first to share your experience!
            </p>
          </motion.div>
        )}

        {/* Add Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-luxury-gray border border-luxury-gray-light p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-luxury-gold flex items-center justify-center">
              <User className="w-5 h-5 text-luxury-gold" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-light">Share Your Experience</h3>
              <p className="text-sm text-luxury-text-light">
                Tell us about your stay at Peaceful Hotel
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-luxury-text-light mb-2 font-light">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={newReview.reviewer}
                  onChange={(e) => setNewReview({...newReview, reviewer: e.target.value})}
                  className="w-full bg-luxury-black border border-luxury-gray-light px-4 py-3 text-luxury-text-light placeholder-luxury-text-light/50 focus:outline-none focus:border-luxury-gold transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Role/Occupation */}
              <div>
                <label className="block text-sm text-luxury-text-light mb-2 font-light">
                  Your Role (Optional)
                </label>
                <input
                  type="text"
                  value={newReview.role}
                  onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                  className="w-full bg-luxury-black border border-luxury-gray-light px-4 py-3 text-luxury-text-light placeholder-luxury-text-light/50 focus:outline-none focus:border-luxury-gold transition-colors"
                  placeholder="e.g., Business Traveler, Honeymooner"
                />
              </div>
            </div>

            {/* Stay Date */}
            <div>
              <label className="block text-sm text-luxury-text-light mb-2 font-light">
                When Did You Stay? (Optional)
              </label>
              <input
                type="month"
                value={newReview.stayDate}
                onChange={(e) => setNewReview({...newReview, stayDate: e.target.value})}
                className="w-full bg-luxury-black border border-luxury-gray-light px-4 py-3 text-luxury-text-light placeholder-luxury-text-light/50 focus:outline-none focus:border-luxury-gold transition-colors"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm text-luxury-text-light mb-3 font-light">
                Your Rating *
              </label>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating})}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= newReview.rating
                          ? 'text-luxury-gold fill-current'
                          : 'text-luxury-gray-light'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-luxury-gold ml-2 text-sm">
                  {newReview.rating}.0
                </span>
              </div>
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm text-luxury-text-light mb-2 font-light">
                Your Review *
              </label>
              <textarea
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                className="w-full bg-luxury-black border border-luxury-gray-light px-4 py-3 text-luxury-text-light placeholder-luxury-text-light/50 focus:outline-none focus:border-luxury-gold transition-colors min-h-[120px] resize-none"
                placeholder="Share your experience with our hotel..."
                required
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
              
              <p className="text-xs text-luxury-text-light/70 mt-3">
                Your review will be visible after verification. We appreciate your feedback!
              </p>
            </div>
          </form>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-luxury-gray-light text-center"
        >
          <p className="text-lg font-serif italic text-luxury-text-light max-w-2xl mx-auto">
            "We believe every guest's experience matters. Your feedback helps us 
            continue delivering exceptional luxury and service."
          </p>
          <div className="text-luxury-gold font-serif mt-4">— Peaceful Hotel Team</div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;