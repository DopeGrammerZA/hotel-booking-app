import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSelectedRoom } from '../../redux/roomsSlice';
import { listenToAuthChanges, selectUser } from '../../redux/authSlice'; // Import selectUser
import '../css/ConfirmRoom.css';
import Footer from './Footer';

const ConfirmRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const user = useSelector(selectUser); // Get user state directly using the selector

  useEffect(() => {
    // Listen to authentication state changes
    dispatch(listenToAuthChanges());

    if (!selectedRoom) {
      console.log('No selected room found. Redirecting to /roomlist.');
      navigate('/roomlist');
    }
  }, [navigate, selectedRoom, dispatch]);

  const handleConfirmBooking = () => {
    if (user) { // Check if user is logged in
      if (selectedRoom) {
        navigate('/payment'); // Proceed to payment if room is selected
      } else {
        console.error('Cannot confirm booking. No room selected.');
        navigate('/roomlist');
      }
    } else {
      console.error('User not logged in. Redirecting to login.');
      navigate('/login'); // Redirect to login if user is not logged in
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedRoom());
    navigate('/roomlist');
  };

  if (!selectedRoom) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <div className="confirm-room">
        <div className="room-details">
          <h3 className="room-title">{selectedRoom.name}</h3>
          <p className="room-description">{selectedRoom.description}</p>
          <p className="room-price">Price per night: <strong>R {selectedRoom.pricePerNight}</strong></p>
          <p className="room-amenities">
            <strong>Amenities:</strong> {Array.isArray(selectedRoom.amenities) ? selectedRoom.amenities.join(', ') : selectedRoom.amenities || 'No amenities listed'}
          </p>
        </div>
        <div className="confirmation-buttons">
          <button className="confirm-button" onClick={handleConfirmBooking}>✨ Confirm and Proceed to Payment ✨</button>
          <button className="cancel-button" onClick={handleCancel}>❌ Cancel</button>
        </div>
        <div className="booking-info">
          <h4>Why book with us?</h4>
          <ul>
            <li>✅ Best Price Guarantee</li>
            <li>✅ Flexible Cancellation Policy</li>
            <li>✅ Exceptional Customer Support</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmRoom;
