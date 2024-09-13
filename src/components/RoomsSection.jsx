import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomsSection.css';
import img from '../assets/about-pic.jpg'; 

const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    price: "R 299/night",
    features: ["King-sized Bed", "Ocean View", "Private Balcony", "Luxury Bath"],
    image: "../assets/bg-pic.jpg"
  },
  {
    id: 2,
    name: "Executive Room",
    price: "R 199/night",
    features: ["Queen-sized Bed", "City View", "Work Desk", "Mini Bar"],
    image: "../assets/bg-pic.jpg"
  },
  {
    id: 3,
    name: "Standard Room",
    price: "R 129/night",
    features: ["Double Bed", "Garden View", "Free Wi-Fi", "Coffee Maker"],
    image: "../assets/bg-pic.jpg"
  }
];

const RoomsSection = () => {
  const navigate = useNavigate();

  const handleBookNowClick = (roomId) => {
    navigate(`/adminDashboard/${roomId}`); 
  };
  
  return (
    <section className="rooms-section">
      <h2>Our Rooms</h2>
      <div className="rooms-container">
        {rooms.map(room => (
          <div key={room.id} className="room-card"> 
            <img src={room.image} alt={room.name} className="room-image" />
            <div className="room-details">
              <h3>{room.name}</h3>
              <p className="room-price">{room.price}</p>
              <ul className="room-features">
                {room.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="btn-book-room" onClick={() => handleBookNowClick(room.id)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;
