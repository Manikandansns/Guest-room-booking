import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Ensure room and dates are available in the state
  const room = state?.room;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dates, setDates] = useState([startDate, endDate]);

  if (!room) {
    return <p>No room data available.</p>;
  }

  const handleProceedToPayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/proceed-payment', {
        roomId: room._id,
        dates
      });

      if (response.data.success) {
        navigate('/payment-success');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const calculateTotalPrice = () => {
    const nights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    return nights * room.pricing;
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <div className="cart-item">
        <h2>{room.roomType}</h2>
        <p><strong>Location:</strong> {`${room.location.address}, ${room.location.district}, ${room.location.state}, ${room.location.country}`}</p>
        
        <div className="date-picker">
          <label>
            <strong>Check-in:</strong>
            <DatePicker 
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setDates([date, endDate]);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
            />
          </label>
          
          <label>
            <strong>Check-out:</strong>
            <DatePicker 
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setDates([startDate, date]);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
            />
          </label>
        </div>
        
        <p><strong>Check-in:</strong> {new Date(startDate).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> {new Date(endDate).toLocaleDateString()}</p>
        <p><strong>Total Price:</strong> ${calculateTotalPrice()}</p>
        <button className="proceed-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPage;
