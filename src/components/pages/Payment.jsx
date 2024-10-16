import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer'

const Payment = () => {
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);

  useEffect(() => {
    if (!selectedRoom) {
      console.error('No room selected for payment.');
    }
  }, [selectedRoom]);

  const handlePaymentSuccess = (details) => {
    console.log('Payment successful:', details);
    alert('Payment successful! Thank you for your booking.');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert('There was an error processing your payment. Please try again. Details: ' + error.message);
  };

  const loadPayPalScript = () => {
    
    if (document.querySelector(`script[src*="paypal.com/sdk/js"]`)) {
      console.log('PayPal SDK already loaded.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=ARssujueJx8vqVKCnN0nM3Dj9XUvos2Xk3fBMpaDa4VjbqI6PgpzP7r3Fkh92s9mGIrj-VagybipbyOk`; 
    script.onload = () => {
      if (!window.paypal) {
        console.error('PayPal SDK failed to load.');
        return;
      }

      window.paypal.Buttons({
        createOrder: () => {
          return window.paypal.order.create({
            purchase_units: [{
              amount: {
                value: selectedRoom.pricePerNight.toFixed(2),
              },
            }],
          }).catch(error => {
            console.error('Error creating order:', error);
          });
        },
        onApprove: (data) => {
          return window.paypal.order.capture(data.orderID).then((details) => {
            handlePaymentSuccess(details);
          }).catch(handlePaymentError);
        },
        onError: handlePaymentError,
      }).render('#paypal-button-container');
    };

    script.onerror = () => {
      console.error('Failed to load the PayPal SDK.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (selectedRoom) {
      loadPayPalScript();
    }
  }, [selectedRoom]);

  if (!selectedRoom) {
    return <div className="payment">No room selected. Please go back to select a room.</div>;
  }

  return (
    <div>
      <Navbar/>
        <div className="payment">
      <h2 className="payment-title">Payment for {selectedRoom.name}</h2>
      <div className="payment-details">
        <p className="price">
          <strong>Price:</strong> R{selectedRoom.pricePerNight}
        </p>
        <p className="description">
          <strong>Description:</strong> {selectedRoom.description}
        </p>
        <p className="max-guests">
          <strong>Max Guests:</strong> {selectedRoom.maxGuests}
        </p>
        <p className="amenities">
          <strong>Amenities:</strong> {Array.isArray(selectedRoom.amenities) && selectedRoom.amenities.length > 0
            ? selectedRoom.amenities.join(', ')
            : 'No amenities listed'}
        </p>
      </div>
      <div id="paypal-button-container" className="paypal-button"></div>
    </div>

    <Footer/>
    </div>
    
  );
};

export default Payment;
