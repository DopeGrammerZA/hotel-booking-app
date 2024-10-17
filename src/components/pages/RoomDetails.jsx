import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const RoomDetail = () => {
  const navigate = useNavigate();
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);


  if (!selectedRoom) {
    return <div>Redirecting...</div>; 
  }
  return (
    <div>
      <Navbar />
      <div className="room-detail">
        <h2>{selectedRoom.name}</h2>
        <div className="room-images">
          {selectedRoom.images && selectedRoom.images.length > 0 ? (
            selectedRoom.images.map((image, index) => (
              <img key={index} src={image} alt={`Room ${selectedRoom.name} - Image ${index + 1}`} />
            ))
          ) : (
            <p>No images available for this room.</p>
          )}
        </div>
        <p><strong>Description:</strong> {selectedRoom.description}</p>
        <p><strong>Location:</strong> {selectedRoom.location}</p>
        <p><strong>Rating:</strong> {selectedRoom.rating}</p>
        <p><strong>Price per night:</strong> R{selectedRoom.pricePerNight}</p>
        <p><strong>Amenities:</strong> {Array.isArray(selectedRoom.amenities) ? selectedRoom.amenities.join(', ') : selectedRoom.amenities || 'No amenities listed'}</p>

        <button onClick={() => navigate('/confirm-room')}>Book Room</button>
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetail;
