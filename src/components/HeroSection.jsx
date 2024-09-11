// HeroSection.js
import React, { useState } from 'react';
import './HeroSection.css';
import Navbar from './Navbar';

const HeroSection = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numRooms, setNumRooms] = useState();
  const [numGuests, setNumGuests] = useState();

  const handleSearchClick = () => {
    console.log('Searching availability for:', {
      checkInDate,
      checkOutDate,
      numRooms,
      numGuests,
    });
  };

  return (
    <div className="hero-container">
      <Navbar />
      <div className="hero-content">
        <h1>Welcome to Your Dream Stay</h1>
        <p>Experience luxury and comfort at our hotel</p>
        <div className="booking-form">
          <input
            type="text"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            placeholder="Check-in date"
            onFocus={(e) => e.target.type = 'date'}
            onBlur={(e) => e.target.type = 'text'}
          />
          <input
            type="text"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            placeholder="Check-out date"
            onFocus={(e) => e.target.type = 'date'}
            onBlur={(e) => e.target.type = 'text'}
          />
          <input
            type="number"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
            placeholder="Rooms"
          />
          <input
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            placeholder="Guests"
          />
          <button className="btn-book-now" onClick={handleSearchClick}>
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
