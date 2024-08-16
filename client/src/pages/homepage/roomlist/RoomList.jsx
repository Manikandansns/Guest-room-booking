import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../roomcard/RoomCard';
import RoomCardSkeleton from '../roomcardskeleton/RoomCardSkeleton';
import Filters from '../filters/Filters';
import SingleCardPage from '../../singlecardpage/SingleCardPage'; // Import the SingleCardPage component
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    roomType: '',
    minPrice: 0,
    maxPrice: 20000,
    availability: '',
    location: '',
    rating: '',
    isAc: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to handle the selected room

  // Fetch rooms data from the API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/rooms');
        setRooms(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on selected filters
  useEffect(() => {
    const filterRooms = () => {
      let filtered = rooms;

      if (filters.roomType) {
        filtered = filtered.filter(room => room.roomType === filters.roomType);
      }

      filtered = filtered.filter(room => room.pricing >= filters.minPrice && room.pricing <= filters.maxPrice);

      if (filters.availability && filters.availability !== 'all') {
        filtered = filtered.filter(room => room.availability === filters.availability);
      }

      if (filters.location) {
        filtered = filtered.filter(room => room.location.district === filters.location);
      }

      if (filters.rating) {
        filtered = filtered.filter(room => room.rating === Number(filters.rating));
      }

      if (filters.isAc) {
        filtered = filtered.filter(room => room.isAc === filters.isAc);
      }

      setFilteredRooms(filtered);
    };

    filterRooms();
  }, [filters, rooms]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleCardClick = (room) => {
    setSelectedRoom(room); // Set the selected room to open the popup
  };

  const handleCloseDialog = () => {
    setSelectedRoom(null); // Close the popup by clearing the selected room
  };

  return (
    <div className="room-list-container">
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className="room-list">
        {loading ? (
          Array.from(new Array(4)).map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))
        ) : (
          filteredRooms.map((room) => (
            <RoomCard 
              key={room._id} 
              room={room} 
              onClick={() => handleCardClick(room)} // Trigger the popup
            />
          ))
        )}
      </div>

      {/* Render SingleCardPage as a popup */}
      {selectedRoom && (
        <SingleCardPage 
          room={selectedRoom} 
          open={!!selectedRoom} 
          onClose={handleCloseDialog} 
        />
      )}
    </div>
  );
};

export default RoomList;
