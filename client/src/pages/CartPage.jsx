import React, { useState, useEffect } from 'react';
import '../App.css';
import star from '../assets/star.svg';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const userId = localStorage.getItem('userId');
    const userCart = storedCart.filter(item => item.userId === userId);
    setCart(userCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.pricing, 0);
  };

  const handleProceedToPay = () => {
    navigate('/checkout'); // Navigate to the payment/checkout page
  };

  return (
    <div className='cart-wrapper'>
      <div className="admin-nav-wrapper">
        <div className="admin-nav-logo">
          <h1 className='admin-title'>Cart</h1>
        </div>
        <div className="admin-nav-btn">           
          <button className='add-room-btn' onClick={() => navigate('/homepage')}>Add more Room</button>
        </div>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className='cart-container'>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img 
                src={`http://localhost:5000/${item.photos[0]}`} 
                alt={item.roomType} 
                className="cart-item-image" 
              />
              <div className="cart-item-details">
                <div className="cart-title-wrapper">
                  <h3 className='cart-title'>{item.description}</h3>
                  <div className="cart-rating-wrapper">
                    <img className="" src={star} alt="Rating" />
                    <p>{item.rating}</p>
                  </div>
                </div>
                <p className='cart-roomtype'>{item.roomType}</p>
                <p className='cart-location'>{item.location.district}, {item.location.state}, {item.location.country}</p>
                <p><span className="cart-price">$ {item.pricing}</span><span className="cart-per-day"> /month</span></p>
                <button 
                  className="remove-button" 
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Bill Card */}
      {cart.length > 0 && (
        <div className="bill-card">
          <h2>Bill Summary</h2>
          <ul className="bill-item-list">
            {cart.map((item, index) => (
              <li key={index} className="bill-item">
                <span className="bill-room-name">{item.description}</span>
                <span className="bill-room-price">$ {item.pricing}</span>
              </li>
            ))}
          </ul>
          <div className="bill-total">
            <span>Total Amount:</span>
            <span>$ {calculateTotal()}</span>
          </div>
          <button 
            className="proceed-to-pay-button" 
            onClick={handleProceedToPay}
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
