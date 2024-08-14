import { useState } from 'react';
import axios from 'axios';

const RegisterRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [isAC, setIsAC] = useState(false);
  const [location, setLocation] = useState({
    country: '',
    state: '',
    district: '',
    address: ''
  });
  const [availability, setAvailability] = useState('available');
  const [pricing, setPricing] = useState('');
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [roomPhotos, setRoomPhotos] = useState([]); // New state for storing selected photos

  const handlePhotoChange = (e) => {
    if (e.target.files.length > 5) {
      alert('You can only upload a maximum of 5 images.');
      return;
    }
    setRoomPhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('roomType', roomType);
    formData.append('isAC', isAC);
    formData.append('availability', availability);
    formData.append('pricing', pricing);
    formData.append('rating', rating);
    formData.append('review', review);
    roomPhotos.forEach((photo, index) => formData.append(`photos`, photo));
    formData.append('location', JSON.stringify(location));

    try {
      await axios.post('http://localhost:5000/api/room', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Room registered successfully!');
      // Reset form fields
      setRoomType('');
      setIsAC(false);
      setLocation({ country: '', state: '', district: '', address: '' });
      setAvailability('available');
      setPricing('');
      setRating(1);
      setReview('');
      setRoomPhotos([]);
    } catch (error) {
      console.error('Error registering room:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Room Photos:</label>
        <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
      </div>
      {/* The rest of the form fields */}
      <div>
        <label>Room Type:</label>
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="">Select Room Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>
      </div>
      <div>
        <label>AC/Non-AC:</label>
        <input
          type="checkbox"
          checked={isAC}
          onChange={() => setIsAC(!isAC)}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          placeholder="Country"
          value={location.country}
          onChange={(e) => setLocation({ ...location, country: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={location.state}
          onChange={(e) => setLocation({ ...location, state: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="District"
          value={location.district}
          onChange={(e) => setLocation({ ...location, district: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={location.address}
          onChange={(e) => setLocation({ ...location, address: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Availability:</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
        </select>
      </div>
      <div>
        <label>Pricing:</label>
        <input
          type="number"
          value={pricing}
          onChange={(e) => setPricing(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>{star}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button type="submit">Register Room</button>
    </form>
  );
};

export default RegisterRoom;
