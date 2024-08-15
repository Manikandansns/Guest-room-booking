import React from 'react';
import './RoomCard.css';
import star from '../../../assets/star.svg';
import like from '../../../assets/like.svg';
import liked from '../../../assets/liked.svg';
import { useFavorites } from '../../FavoritesContext'; 

const RoomCard = ({ room, onClick }) => {
  const [imageSrc, setImageSrc] = React.useState("");
  const [likeGlow, setLikeGlow] = React.useState(like);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  React.useEffect(() => {
    // Set image source if photos are available
    if (room.photos && room.photos.length > 0) {
      setImageSrc(`http://localhost:5000/${room.photos[0]}`);
    }
  }, [room.photos]);

  // Determine if the room is a favorite
  const isFavorite = favorites.some(item => item._id === room._id);

  // Update the button icon based on favorite state
  React.useEffect(() => {
    setLikeGlow(isFavorite ? liked : like);
  }, [isFavorite]);

  // Toggle favorite status
  const handleLikeClick = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    if (isFavorite) {
      removeFavorite(room._id);
    } else {
      addFavorite(room);
    }
  };

  return (
    <div className="room-card" onClick={() => onClick(room)}> {/* Pass room to onClick */}
      <div className="like-button" onClick={handleLikeClick}>
        <img src={likeGlow} alt="Like Button" className="like-icon"/>
      </div>
      <div className="room-info">
        <div className="room-image-container">
          {imageSrc && (
            <img src={imageSrc} alt={room.roomType} className="room-photo" />
          )}
        </div>
        <div className="room-description-container">
          <div className="room-description-head">
            <h2 className="room-location">
              {room.location.district}, {room.location.country}
            </h2>
            <div className="ratings-wrapper">
              <img src={star} alt="rating star" className="rating-star"/>
              <p>{room.rating}</p>
            </div>
          </div>
          <p className="room-title">{room.description}</p>
          <h3 className="room-type">{room.roomType}</h3>
          <p className="price">${room.pricing}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
