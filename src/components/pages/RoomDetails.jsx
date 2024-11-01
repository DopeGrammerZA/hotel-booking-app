import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/RoomDetails.css'; 

const RoomDetail = () => {
  const navigate = useNavigate();
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);

  if (!selectedRoom) {
    return <div>Redirecting...</div>;
  }

  console.log(selectedRoom.images && selectedRoom.images[0]);

  return (
    <div >
      <Navbar />
          <div className='room-detail-container'>
          <div className="room-detail">
            <h2 className="room-title">{selectedRoom.name}</h2>
            <div className="room-images">
            <img className="large-image" src={selectedRoom.roomImage} alt={`Room ${selectedRoom.name} - Main`} />
            </div >
            <div className='room-paragraphs'>
                <p><strong>Description:</strong> {selectedRoom.description}</p>
                <p><strong>Location:</strong> {selectedRoom.location}</p>
                <p><strong>Rating:</strong> {selectedRoom.rating} ⭐</p>
                <p><strong>Price per night:</strong> R{selectedRoom.pricePerNight}</p>
                <p><strong>Amenities:</strong> {Array.isArray(selectedRoom.amenities) ? selectedRoom.amenities.join(', ') : selectedRoom.amenities || 'No amenities listed'}</p>

            </div>
            <button className="book-room-button" onClick={() => navigate('/confirm-room')}>Book Room</button>
          </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomDetail;
