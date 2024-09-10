import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RoomDetails.css';

const rooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    price: "R 299/night",
    features: ["King-sized Bed", "Ocean View", "Private Balcony", "Luxury Bath"],
    image: "/assets/bg-pic.jpg",
    description: "Enjoy the luxury of our Deluxe Suite with stunning ocean views and all the amenities you need for a perfect stay."
  },
  {
    id: 2,
    name: "Executive Room",
    price: "R 199/night",
    features: ["Queen-sized Bed", "City View", "Work Desk", "Mini Bar"],
    image: "/assets/bg-pic.jpg",
    description: "The Executive Room offers a comfortable and elegant space ideal for business travelers, featuring a work desk and mini bar."
  },
  {
    id: 3,
    name: "Standard Room",
    price: "R 129/night",
    features: ["Double Bed", "Garden View", "Free Wi-Fi", "Coffee Maker"],
    image: "/assets/bg-pic.jpg",
    description: "Our Standard Room provides a cozy and affordable option with a lovely garden view and essential amenities."
  }
];

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(room => room.id === parseInt(id, 10));

  if (!room) {
    return <p>Room not found!</p>;
  }

  return (
    <section className="room-details-container">
      <img src={room.image} alt={room.name} className="room-details-image" />
      <div className="room-details-info">
        <h1 className="room-details-name">{room.name}</h1>
        <p className="room-details-price">{room.price}</p>
        <p className="room-details-description">{room.description}</p>
        <ul className="room-details-features">
          {room.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button className="login-button" onClick={() => navigate('/register')}>
          Book now
        </button>
      </div>
    </section>
  );
};

export default RoomDetails;
