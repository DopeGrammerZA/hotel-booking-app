import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSelectedRoom } from '../../firebase/auth/roomsSlice';
import '../css/ConfirmRoom.css';

const ConfirmRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const storedRoom = localStorage.getItem('selectedRoom');
  const initialSelectedRoom = storedRoom ? JSON.parse(storedRoom) : null;
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom) || initialSelectedRoom;

  useEffect(() => {
   
    if (selectedRoom) {
      localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
    }
  }, [selectedRoom]);

  useEffect(() => {
    
    if (!selectedRoom) {
      console.log('No selected room found. Redirecting to /roomlist.');
      navigate('/roomlist');
    }
  }, [navigate, selectedRoom]);

  const handleConfirmBooking = () => {
    if (selectedRoom) {
      navigate('/payment');
    } else {
      console.error('Cannot confirm booking. No room selected.');
      navigate('/roomlist');
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedRoom());
    localStorage.removeItem('selectedRoom'); 
    navigate('/roomlist');
  };

  if (!selectedRoom) {
    
    return <div>Redirecting...</div>;
  }

  return (
    <div className="confirm-room">
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
