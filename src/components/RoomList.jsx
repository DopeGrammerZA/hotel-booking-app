import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../firebase/auth/roomsSlice';  // Fetch rooms action from roomsSlice
import './RoomList.css';  // Import the CSS file for styling

const RoomList = () => {
  const dispatch = useDispatch();

  // Get rooms, loading, and error state from Redux
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  // Fetch rooms when the component mounts
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  if (error) {
    return <p>Error fetching rooms: {error}</p>;
  }

  return (
    <div className="room-list">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p className="price">Price per night: ${room.pricePerNight}</p>
            <button onClick={() => handleRoomSelection(room)}>Select Room</button>
          </div>
        ))
      ) : (
        <p>No rooms available at the moment.</p>
      )}
    </div>
  );
};

// Example function to handle room selection
const handleRoomSelection = (room) => {
  console.log('Selected Room:', room);
  // Redirect to booking page or store selected room in Redux
};

export default RoomList;
