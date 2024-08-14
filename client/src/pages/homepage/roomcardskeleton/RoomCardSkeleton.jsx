import React from 'react';
import './RoomCardSkeleton.css';

const RoomCardSkeleton = () => {
  return (
    <div className="skeleton-room-card">
      <div className="skeleton-room-info">
        <div className="skeleton-room-image-container skeleton skeleton-image">
           <div className="image-skeleton"></div>
        </div>
        <div className="skeleton-room-description-container">
          <div className="skeleton-room-description-head">
            <div className="skeleton skeleton-text skeleton-title"></div>
            <div className="ratings-wrapper">
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
          <div className="skeleton skeleton-text skeleton-type"></div>
          <div className="skeleton skeleton-text skeleton-price"></div>
        </div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
