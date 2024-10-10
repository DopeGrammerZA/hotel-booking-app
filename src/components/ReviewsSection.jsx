import React from 'react';
import './ReviewsSection.css';
import pic from '../assets/room2.jpg';
import review from '../assets/review.jpg';

const reviews = [
  {
    id: 1,
    reviewer: "John Doe",
    rating: 5,
    review: "Amazing stay! The Deluxe Suite was luxurious, and the view was breathtaking. Highly recommend!",
    image: review
  },
  {
    id: 2,
    reviewer: "Jane Smith",
    rating: 4,
    review: "The Executive Room was comfortable and the city view was great. Will definitely be coming back!",
    image: pic
  },
  {
    id: 3,
    reviewer: "Emily Johnson",
    rating: 5,
    review: "Excellent service and the Standard Room was cozy. Loved the free Wi-Fi and coffee maker!",
    image: review
  },{
    id: 4,
    reviewer: "Jane Smith",
    rating: 4,
    review: "The Executive Room was comfortable and the city view was great. Will definitely be coming back!",
    image: review
  },
  {
    id: 5,
    reviewer: "Emily Johnson",
    rating: 5,
    review: "Excellent service and the Standard Room was cozy. Loved the free Wi-Fi and coffee maker!",
    image: pic
  },{
    id: 6,
    reviewer: "Jane Smith",
    rating: 4,
    review: "The Executive Room was comfortable and the city view was great. Will definitely be coming back!",
    image: pic
  },
  {
    id: 7,
    reviewer: "Emily Johnson",
    rating: 5,
    review: "Excellent service and the Standard Room was cozy. Loved the free Wi-Fi and coffee maker!",
    image: pic
  }
];

const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <h2>What Our Guests Are Saying</h2>
      <div className="reviews-container">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <img src={review.image} alt={review.reviewer} className="review-image" />
            <div className="review-content">
              <h3>{review.reviewer}</h3>
              <div className="review-rating">Rating: {review.rating}⭐</div>
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
