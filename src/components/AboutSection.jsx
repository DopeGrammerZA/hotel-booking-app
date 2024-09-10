import React from 'react';
import './AboutSection.css'; 

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h2>Experience Unmatched Luxury</h2>
          <p>
            At [Your Hotel Name], we offer a unique blend of comfort and elegance. Our luxurious rooms are designed to make your stay unforgettable, with top-notch amenities and personalized services.
          </p>
          <ul>
            <li>✨ Spacious Rooms with Stunning Views</li>
            <li>🍽️ Gourmet Dining Options</li>
            <li>🧖‍♂️ Spa and Wellness Facilities</li>
            <li>🏊‍♂️ Infinity Pool with Panoramic Views</li>
          </ul>
          <p>
            Discover the perfect getaway with us. Whether you're here for relaxation or adventure, our dedicated staff is here to ensure your stay is nothing short of extraordinary.
          </p>
        </div>
        <div className="about-image">
          <img src="../assets/about-pic.jpg" alt="Luxurious hotel interior" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
