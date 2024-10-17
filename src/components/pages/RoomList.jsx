import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRoom } from '../../redux/roomsSlice';  
import { useNavigate } from 'react-router-dom'; 
import '../css/RoomList.css';
import Navbar from './Navbar';
import Footer from './Footer'

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleRoomSelection = (room) => {
    dispatch(selectRoom(room));  
    navigate('/room/:id');   
  };

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  if (error) {
    return <p>Error fetching rooms: {error}</p>;
  }

  return (
    <div className='room-list-container'>
      <Navbar/>
      <div className='room-list-title'>
          <h2 className="room-list-title">Available Rooms</h2>
      </div>
      
      <div className="room-list">
      
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3 className="room-name">{room.name}</h3>
            <p className="room-description">{room.description}</p>
            <p className="room-location">Location: {room.location}</p>
            <p className="room-rating">Rating: {room.rating}</p>
            <p className="price">Price per night: R{room.pricePerNight}</p>
            <p className="room-amenities">
              Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities || 'No amenities listed'}
            </p>
            <button className="select-button" onClick={() => handleRoomSelection(room)}>Select Room</button>
          </div>
        ))
      ) : (
        <p>No rooms available at the moment.</p>
      )}
    </div>
    <Footer/>
    </div>
    
  );
};

export default RoomList;
