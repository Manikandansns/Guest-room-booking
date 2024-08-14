import React, { useEffect, useState } from "react";
import "./RoomCard.css";
import star from "../../../assets/star.svg";

const RoomCard = ({ room, onClick }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (room.photos && room.photos.length > 0) {
      setImageSrc(`http://localhost:5000/${room.photos[0]}`);
    }
  }, [room.photos]);

  return (
    <div className="room-card" onClick={onClick}>
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
