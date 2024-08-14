import React from 'react';
import './SingleCardPage.css';
import star from '../../assets/star.svg'
import {
  Dialog,
  Button,
} from '@mui/material';

const SingleCardPage = ({ room, open, onClose }) => {
  const handleCart = () => {
    // Implement adding to cart functionality here
  };

  return (
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

            
          <p className="single-room-location"> {room.location.address}, {room.location.district}, {room.location.state}, {room.location.country}
          </p>
          <p className="single-room-price-container"><span className="single-room-price">$ {room.pricing}</span> <span className="per-day">/day</span> </p>
          <p className="single-room-reviews">
            <strong>Reviews:</strong> {room.review}
          </p>

        </div>
        <Button variant="contained" color="primary" onClick={handleCart}>
          Book Now
        </Button>
        <button className='close-btn' onClick={onClose}>X</button>
        </div>

        </div>
    
    </Dialog>
  );
};

export default SingleCardPage;
