import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";


const ConfirmedBooking = () => {
  const bookingDetails = useSelector((state) => state.bookings.latestBooking); 

  return (
    <div className="confirmed-booking-container">
      <Navbar />
      <div className="confirmed-booking-content">
        <h2>Your Booking Confirmation</h2>
        {bookingDetails ? (
          <div>
            <p><strong>Room Name:</strong> {bookingDetails.roomName}</p>
            <p><strong>Price:</strong> R {bookingDetails.price}</p>
            <p><strong>Booking Date:</strong> {bookingDetails.bookingDate}</p>
            <p><strong>Amenities:</strong> {bookingDetails.amenities.join(", ")}</p>
            <p><strong>Your Email:</strong> {bookingDetails.userEmail}</p>
          </div>
        ) : (
          <p>No booking details available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmedBooking;
