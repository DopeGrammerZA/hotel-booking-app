import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Welcome to Your Dream Stay</h1>
        <p>Experience luxury and comfort at our hotel</p>
        <button className="btn-book-now">Book Now</button>
      </div>
    </div>
  );
};

export default HeroSection;

