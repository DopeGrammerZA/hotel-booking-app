import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/Payment.css";
import { useNavigate } from "react-router-dom";
import { db, addDoc, collection, doc, updateDoc } from "../../firebase/config/firebase-config";

const Payment = () => {
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedRoom) {
      console.error("No room selected for payment.");
    }
  }, [selectedRoom]);

  const handlePaymentSuccess = async (details) => {
    console.log("Payment successful:", details);
    alert("Payment successful! Thank you for your booking.");

    const bookingData = {
      roomId: selectedRoom.id,
      userId: user.uid,
      userEmail: user.email,
      roomName: selectedRoom.name,
      price: selectedRoom.pricePerNight,
      bookingDate: new Date().toISOString(),
      amenities: selectedRoom.amenities,
    };

    try {
      
      await addDoc(collection(db, "bookings"), bookingData);
      console.log("Booking data saved to Firebase:", bookingData);

     
      const roomRef = doc(db, "accommodations", selectedRoom.id.toString());
      await updateDoc(roomRef, { isAvailable: false });

      
      navigate("/confirmedBooking");
    } catch (error) {
      console.error("Error saving booking data to Firebase:", error);
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    alert(
      "There was an error processing your payment. Please try again. Details: " +
        error.message
    );
  };

  const loadPayPalScript = () => {
    if (document.querySelector(`script[src*="paypal.com/sdk/js"]`)) {
      console.log("PayPal SDK already loaded.");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=ARssujueJx8vqVKCnN0nM3Dj9XUvos2Xk3fBMpaDa4VjbqI6PgpzP7r3Fkh92s9mGIrj-VagybipbyOk`;
    script.onload = () => {
      if (!window.paypal) {
        console.error("PayPal SDK failed to load.");
        return;
      }

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            const price = selectedRoom.pricePerNight.toString();
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      value: price,
                    },
                  },
                ],
              })
              .catch((error) => {
                console.error("Error creating order:", error);
                throw error;
              });
          },
          onApprove: (data, actions) => {
            return actions.order
              .capture()
              .then((details) => {
                handlePaymentSuccess(details);
              })
              .catch(handlePaymentError);
          },
          onError: handlePaymentError,
        })
        .render("#paypal-button-container");
    };

    script.onerror = () => {
      console.error("Failed to load the PayPal SDK.");
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (selectedRoom) {
      loadPayPalScript();
    }
  }, [selectedRoom]);

  if (!selectedRoom) {
    return (
      <div className="payment">
        No room selected. Please go back to select a room.
      </div>
    );
  }

  return (
    <div className="payment-container">
      <Navbar />
      <div className="payment-inner-contain">
        <div className="payment">
          <h2 className="payment-title">Payment for {selectedRoom.name}</h2>
          <div className="payment-details">
            <p className="price">
              <strong>Price:</strong> R {selectedRoom.pricePerNight}
            </p>
            <p className="description">
              <strong>Description:</strong> {selectedRoom.description}
            </p>
            <p className="max-guests">
              <strong>Max Guests:</strong> {selectedRoom.maxOccupancy}
            </p>
            <p className="amenities">
              <strong>Amenities:</strong>{" "}
              {Array.isArray(selectedRoom.amenities) &&
              selectedRoom.amenities.length > 0
                ? selectedRoom.amenities.join(", ")
                : "No amenities listed"}
            </p>
          </div>
          <div id="paypal-button-container" className="paypal-button"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
