import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './RoomForm.css';

const RoomForm = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({
    roomType: '',
    pricing: '',
    availability: 'available',
    description: '',
    location: {
      country: '',
      state: '',
      district: '',
      address: ''
    },
    rating: 1,
    review: '',
    photos: []
  });
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const AdminDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Authentication token is missing. Please log in again.');
          navigate('/');
          return;
        }

        // Fetch Admin and Company Details
        const detailsResponse = await axios.get('http://localhost:5000/api/admin/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdminId(detailsResponse.data.adminId);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized: Please log in again.');
          navigate('/');
        } else {
          setError('Error fetching data');
        }
      }
    };

    AdminDetails();
  }, [navigate]);

  useEffect(() => {
    if (id) {
      const fetchRoom = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            alert('Authentication token is missing. Please log in again.');
            navigate('/');
            return;
          }

          const response = await axios.get(`http://localhost:5000/api/room/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRoom(response.data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setError('Unauthorized: Please log in again.');
            navigate('/');
          } else {
            setError('Error fetching room details');
          }
        }
      };
      fetchRoom();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom(prevRoom => ({
      ...prevRoom,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setRoom(prevRoom => ({
      ...prevRoom,
      location: {
        ...prevRoom.location,
        [name]: value
      }
    }));
  };

  const handlePhotosChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append room details to formData
    Object.keys(room).forEach(key => {
      if (key === 'location') {
        Object.keys(room.location).forEach(locKey => {
          formData.append(`location[${locKey}]`, room.location[locKey]);
        });
      } else if (key !== 'photos') {
        formData.append(key, room[key]);
      }
    });

    // Append photos to formData
    Array.from(photos).forEach(photo => {
      formData.append('photos', photo);
    });

    // Append adminId
    if (adminId) {
      formData.append('adminId', adminId);
    } else {
      alert('Admin ID is missing. Please try again.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token is missing. Please log in again.');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      if (id) {
        // Update existing room
        await axios.put(`http://localhost:5000/api/room/${id}`, formData, config);
        navigate(`/admin/dashboard`);
      } else {
        // Create new room
        await axios.post('http://localhost:5000/api/room', formData, config);
        navigate(`/admin/dashboard`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please log in again.');
        navigate('/');
      } else {
        setError(`Error saving room details: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="room-form">
      <h1>{id ? 'Edit Room' : 'Add Room'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Type</label>
          <select name="roomType" value={room.roomType} onChange={handleChange} required>
            <option value="">Select Room Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="pricing" value={room.pricing} onChange={handleChange} required />
        </div>
        <div>
          <label>Availability</label>
          <select name="availability" value={room.availability} onChange={handleChange} required>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={room.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Country</label>
          <input type="text" name="country" value={room.location.country} onChange={handleLocationChange} required />
        </div>
        <div>
          <label>State</label>
          <input type="text" name="state" value={room.location.state} onChange={handleLocationChange} required />
        </div>
        <div>
          <label>District</label>
          <input type="text" name="district" value={room.location.district} onChange={handleLocationChange} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" value={room.location.address} onChange={handleLocationChange} required />
        </div>
        <div>
          <label>Rating</label>
          <select name="rating" value={room.rating} onChange={handleChange} required>
            {[1, 2, 3, 4, 5].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Review</label>
          <textarea name="review" value={room.review} onChange={handleChange} />
        </div>
        <div>
          <label>Photos</label>
          <input className='upload-input' type="file" name="photos" multiple onChange={handlePhotosChange} />
        </div>
        <button type="submit">{id ? 'Update Room' : 'Add Room'}</button>
      </form>
    </div>
  );
};

export default RoomForm;
