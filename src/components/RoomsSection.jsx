import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomsSection.css';
import img1 from '../assets/about-pic.jpg';
import img2 from '../assets/room1.jpg';
import img3 from '../assets/room2.jpg';



const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    price: "R 5000/night",
    features: ["King-sized Bed", "Ocean View", "Private Balcony", "Luxury Bath"],
    image: img1
  },
  {
    id: 2,
    name: "Executive Room",
    price: "R 3000/night",
    features: ["Queen-sized Bed", "City View", "Work Desk", "Mini Bar"],
    image: img2
  },
  {
    id: 3,
    name: "Standard Room",
    price: "R 2500/night",
    features: ["Double Bed", "Garden View", "Free Wi-Fi", "Coffee Maker"],
    image: img3
  }
];

const RoomsSection = () => {
  const navigate = useNavigate();

  const handleBookNowClick = (roomId) => {
    navigate(`/roomList`); 
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
