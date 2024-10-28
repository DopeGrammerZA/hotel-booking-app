import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/HeroSection.css';
import Navbar from './Navbar';
import { selectAvailableAccommodations } from '../../redux/accommodationSlice';

const HeroSection = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [numGuests, setNumGuests] = useState('');

  const availableAccommodations = useSelector(selectAvailableAccommodations);
  console.log(availableAccommodations); 

  const handleSearchClick = () => {
    const filteredAccommodations = availableAccommodations.filter(acc => 
      acc.numRooms >= numRooms && acc.numGuests >= numGuests
    );
    
    console.log('Filtered accommodations:', filteredAccommodations);
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
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
          <input
            type="text"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            placeholder="Check-out date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
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
