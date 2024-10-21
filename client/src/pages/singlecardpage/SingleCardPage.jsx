import React, { useState, useEffect } from 'react';
import './SingleCardPage.css';
import star from '../../assets/star.svg';
import { Dialog, Button } from '@mui/material';
import { SuccessAlert, ErrorAlert } from '../../components/Alert';

const SingleCardPage = ({ room, open, onClose }) => {
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const userId = localStorage.getItem('userId');
    const existingCartItem = cart.find(item => item.roomId === room._id && item.userId === userId);

    setIsInCart(!!existingCartItem); 
  }, [room._id]);

  const handleCartToggle = () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingCartItemIndex = cart.findIndex(item => item.roomId === room._id && item.userId === userId);

      if (existingCartItemIndex !== -1) {
        // If the item is already in the cart, remove it
        cart.splice(existingCartItemIndex, 1);
        setAlertType('success');
        setAlertMessage('Room removed from cart successfully!');
        setIsInCart(false);
      } else {
        // If the item is not in the cart, add it
        const newCartItem = {
          userId,
          roomId: room._id,
          roomType: room.roomType,
          description: room.description,
          location: room.location,
          pricing: room.pricing,
          rating: room.rating,
          photos: room.photos,
        };

        cart.push(newCartItem);
        setAlertType('success');
        setAlertMessage('Room added to cart successfully!');
        setIsInCart(true);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        if (isInCart) onClose(); 
      }, 2000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Failed to update cart.');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <div className="single-room-wrapper">
          <div className="single-room-image-container">
            {room.photos && room.photos.length > 0 && (
              <img
                src={`http://localhost:5000/${room.photos[0]}`}
                alt={room.roomType}
                className="single-room-image"
              />
            )}
          </div>
          <div className="single-room-details-wrapper">
            <div className="single-room-details">
              <div className="ratings-wrapper single-card-title-wrapper">
                <p className="single-room-title">
                  {room.description}
                </p>
                <img src={star} alt="rating star" className="rating-star"/>
                <p>{room.rating}</p>
              </div>
              <p className="single-room-location">
                {room.location.address}, {room.location.district}, {room.location.state}, {room.location.country}
              </p>
              <p className="single-room-price-container">
                <span className="single-room-price">$ {room.pricing}</span> <span className="per-day">/month</span> 
              </p>
              <p className="single-room-reviews">
                <strong>Reviews:</strong> {room.review}
              </p>
            </div>
            <Button 
              variant="contained" 
              // color={isInCart ? "secondary" : "primary"} 
              sx={{
    backgroundColor: isInCart ? "orangered" : "primary.main",
    '&:hover': {
      backgroundColor: isInCart ? "#d04a00" : "primary.dark",
    },
  }} 
              onClick={handleCartToggle}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
            <button className='close-btn' onClick={onClose}>X</button>
          </div>
        </div>
      </Dialog>

      {/* Show alert message */}
      {showAlert && (
        <div className="alert-container">
          {alertType === 'success' && <SuccessAlert message={alertMessage} />}
          {alertType === 'error' && <ErrorAlert message={alertMessage} />}
        </div>
      )}
    </>
  );
};

export default SingleCardPage;
