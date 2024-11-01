import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import '../css/HeroSection.css';
import Navbar from './Navbar';
import { selectAvailableAccommodations } from '../../redux/accommodationSlice';

const HeroSection = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const availableAccommodations = useSelector(selectAvailableAccommodations);
  console.log(availableAccommodations); 

  const navigate = useNavigate(); 

  const handleSearchClick = () => {
    
    if (!checkInDate || !checkOutDate || !numRooms || !numGuests) {
      setErrorMessage('Please fill in all fields'); 
      return; 
    }

    
    setErrorMessage('');
    navigate('/roomlist');
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
