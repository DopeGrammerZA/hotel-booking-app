import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config/firebase-config'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';
import '../css/ReviewsSection.css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewer: '',
    rating: 5,
    review: '',
    image: 'path/to/default/image.jpg',
  });

  
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(db, 'reviews');
      const reviewSnapshot = await getDocs(reviewsCollection);
      const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewList);
    };

    fetchReviews();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'reviews'), newReview);
      setReviews([...reviews, newReview]);
      setNewReview({ reviewer: '', rating: 5, review: '', image: '' }); 
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  return (
    <section className="reviews-section">
      <h2>What Our Guests Are Saying</h2>
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <img src={review.image} alt={review.reviewer} className="review-image" />
              <div className="review-content">
                <h3>{review.reviewer}</h3>
                <div className="review-rating">Rating: {review.rating}⭐</div>
                <p>{review.review}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to add yours!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="add-review-form">
        <h3>Add Your Review</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.reviewer}
          onChange={(e) => setNewReview({ ...newReview, reviewer: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Review"
          value={newReview.review}
          onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
          required
        />
        <label>
          Rating:
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          >
            <option value={1}>1⭐</option>
            <option value={2}>2⭐</option>
            <option value={3}>3⭐</option>
            <option value={4}>4⭐</option>
            <option value={5}>5⭐</option>
          </select>
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
};

export default ReviewsSection;
