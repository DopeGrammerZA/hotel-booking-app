import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRoom } from '../firebase/auth/roomsSlice';  
import { useNavigate } from 'react-router-dom'; 
import './RoomList.css';

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { rooms, loading, error } = useSelector((state) => state.rooms);


  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);


  const handleRoomSelection = (room) => {
    dispatch(selectRoom(room));  
    navigate('/confirm-room');   
  };

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
            <p className="price">Price per night: R{room.price}</p>
            <button onClick={() => handleRoomSelection(room)}>Select Room</button>
          </div>
        ))
      ) : (
        <p>No rooms available at the moment.</p>
      )}
    </div>
  );
};

export default RoomList;
