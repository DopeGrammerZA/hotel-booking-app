import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSelectedRoom } from '../firebase/auth/roomsSlice';
import './ConfirmRoom.css';

const ConfirmRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve the selected room from local storage or the Redux store
  const storedRoom = localStorage.getItem('selectedRoom');
  const initialSelectedRoom = storedRoom ? JSON.parse(storedRoom) : null;
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom) || initialSelectedRoom;

  useEffect(() => {
    // Save selected room to local storage whenever it changes
    if (selectedRoom) {
      localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
    }
  }, [selectedRoom]);

  useEffect(() => {
    // If no room is selected, navigate to the room list
    if (!selectedRoom) {
      console.log('No selected room found. Redirecting to /roomlist.');
      navigate('/roomlist');
    }
  }, [navigate, selectedRoom]);

  const handleConfirmBooking = () => {
    if (selectedRoom) {
      console.log('Room confirmed:', selectedRoom);
      navigate('/payment');
    } else {
      console.error('Cannot confirm booking. No room selected.');
      navigate('/roomlist');
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedRoom());
    localStorage.removeItem('selectedRoom'); // Clear local storage as well
    navigate('/roomlist');
  };

  if (!selectedRoom) {
    // Render nothing or a loading spinner while redirecting
    return <div>Redirecting...</div>;
  }

  return (
    <div className="confirm-room">
      <h2>Confirm Your Room Selection</h2>
      <div className="room-details">
        <h3>{selectedRoom.name}</h3>
        <p>{selectedRoom.description}</p>
        <p className="price">Price per night: R{selectedRoom.price}</p>
      </div>
      <button onClick={handleConfirmBooking}>Confirm and Proceed to Payment</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmRoom;
