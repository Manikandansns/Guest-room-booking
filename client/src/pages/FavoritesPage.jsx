import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useFavorites } from './FavoritesContext';
import RoomCard from './homepage/roomcard/RoomCard'; 
import SingleCardPage from './singlecardpage/SingleCardPage'; // Adjust path as needed
import '../App.css';

const FavoritesPage = () => {
  const navigate = useNavigate(); 
  const { favorites } = useFavorites();
  const [selectedRoom, setSelectedRoom] = useState(null); // State to store the room selected for the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div>
      <div className="fav-nav-wrapper">
        <div className="fav-nav-logo">
          <h1 className='Fav-title'>Fav Dashboard</h1>
        </div>
        <div className="Fav-nav-btn">           
          <button className='add-room-btn' onClick={() => navigate('/homepage')}>Add Favorites</button>
        </div>
      </div>
      <div className="favorites-page">
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((room) => (
              <RoomCard
                key={room._id} 
                room={room}
                onClick={() => handleRoomClick(room)} // Pass room to handler
              />
            ))
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>
      </div>

      {/* Dialog for showing room details */}
      {selectedRoom && (
        <SingleCardPage
          room={selectedRoom}
          open={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
