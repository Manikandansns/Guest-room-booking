import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [admin, setAdmin] = useState(null); // State to store admin details
    const [company, setCompany] = useState(null); // State to store company details
    const [error, setError] = useState(null);
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

                // Store the full admin object, not just the ID
                setAdmin(detailsResponse.data.admin);
                setCompany(detailsResponse.data.company);

                // Fetch Rooms
                const roomsResponse = await axios.get('http://localhost:5000/api/room', {
                    params: {
                        adminId: detailsResponse.data.admin._id, // Send adminId as a query parameter
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRooms(roomsResponse.data);
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

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token is missing. Please log in again.');
                navigate('/');
                return;
            }

            await axios.delete(`http://localhost:5000/api/room/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRooms(rooms.filter(room => room._id !== id));
        } catch (error) {
            setError('Error deleting room');
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-room/${id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  
        navigate('/');  
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-nav-wrapper">
                <div className="admin-nav-logo">
                    <h1 className='admin-title'>Host Dashboard</h1>
                </div>
                <div className="admin-nav-btn">           
                    <button className='add-room-btn' onClick={() => navigate('/admin/add-room')}>Add Room</button>
                    <button className='log-out' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="admin-container">
                {error && <p>{error}</p>}
                {admin && <h2 className='welcome-note'>Welcome, {admin.name}</h2>}
                {company && <h3 className='company-name'>Company: {company.companyName}</h3>}

                <table>
                    <thead>
                        <tr>
                            <th>Image</th> {/* Added Image Column */}
                            <th>Description</th>
                            <th>Room Type</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room._id}>
                                <td>
                                    {/* Assuming room.photos[0] contains the image path */}
                                    {room.photos && room.photos.length > 0 && (
                                        <img
                                            src={`http://localhost:5000/${room.photos[0]}`}
                                            alt={room.description}
                                            className="room-image"
                                        />
                                    )}
                                </td>
                                <td>{room.description}</td>
                                <td>{room.roomType}</td>
                                <td>${room.pricing}</td>
                                <td>{room.availability}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => handleEdit(room._id)}>Edit</button>
                                    <button className='delete-btn' onClick={() => handleDelete(room._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
