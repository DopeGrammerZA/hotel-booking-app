import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSelectedRoom } from '../firebase/auth/roomsSlice';
import './Payment.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase-config';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state) => state.rooms.selectedRoom);
  const db = getFirestore(app);

  useEffect(() => {
    if (!selectedRoom) {
      navigate('/roomlist');
      return;
    }

   
    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        if (document.getElementById('paypal-script')) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=ARssujueJx8vqVKCnN0nM3Dj9XUvos2Xk3fBMpaDa4VjbqI6PgpzP7r3Fkh92s9mGIrj-VagybipbyOk";
        script.id = 'paypal-script';
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
      });
    };

    loadPayPalScript()
      .then(() => {
        if (window.paypal) {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: selectedRoom.price.toFixed(2),
                  },
                }],
              });
            },
            onApprove: async (data, actions) => {
              await actions.order.capture();
              console.log('Payment successful:', data);
              await handlePaymentSuccess(); 
            },
            onError: (err) => {
              console.error('PayPal payment error:', err);
            },
          }).render('#paypal-button-container');
        }
      })
      .catch(err => {
        console.error('PayPal script load error:', err);
      });

    return () => {
   
      const script = document.getElementById('paypal-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [navigate, selectedRoom]);

  const handlePaymentSuccess = async () => {
    try {
      
      const bookingsCollection = collection(db, 'bookings');
      await addDoc(bookingsCollection, {
        roomName: selectedRoom.name,
        description: selectedRoom.description,
        price: parseFloat(selectedRoom.price).toFixed(2),
        date: new Date(),
      });

      dispatch(clearSelectedRoom());
      localStorage.removeItem('selectedRoom');
      navigate('/confirmation');
      alert('You have successfully booked');
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  if (!selectedRoom) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="payment">
      <div className="room-details">
        <h3>{selectedRoom.name}</h3>
        <p>{selectedRoom.description}</p>
        <p className="price">Price per night: R{selectedRoom.price.toFixed(2)}</p>
        <div id="paypal-button-container"></div>
      </div>
    </div>
  );
};

export default Payment;
