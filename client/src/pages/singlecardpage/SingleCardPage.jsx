import React, { useState } from 'react';
import './SingleCardPage.css';
import star from '../../assets/star.svg';
import { Dialog, Button } from '@mui/material';
import { SuccessAlert, ErrorAlert } from '../../components/Alert'; // Adjust path as needed

const SingleCardPage = ({ room, open, onClose }) => {
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCart = () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
  
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const newCartItem = {
        userId, // Store the userId with each cart item
        roomId: room._id,
        roomType: room.roomType,
        description: room.description,
        location: room.location,
        pricing: room.pricing,
        rating: room.rating,
        photos: room.photos,
      };
      
      cart.push(newCartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Set success alert
      setAlertType('success');
      setAlertMessage('Room added to cart successfully!');
      setShowAlert(true);
  
      // Hide alert after 2 seconds and close dialog
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 2000);
    } catch (error) {
      // Set error alert
      setAlertType('error');
      setAlertMessage('Failed to add room to cart.');
      setShowAlert(true);
  
      // Hide alert after 2 seconds
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
            <Button variant="contained" color="primary" onClick={handleCart}>
              Add to Cart
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
