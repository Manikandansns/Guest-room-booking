import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { SuccessAlert, ErrorAlert } from '../../components/Alert'; // Adjust path as needed

const CompanyPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [noOfRooms, setNoOfRooms] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [alertType, setAlertType] = useState(''); // To control which alert to show
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const companyData = {
                companyName,
                noOfRooms,
                location: { country, state, district, address },
            };

            // Retrieve token from local storage
            const token = localStorage.getItem('token');

            if (!token) {
                setAlertType('error');
                setAlertMessage('Authentication token is missing. Please log in again.');
                setShowAlert(true);
                return;
            }

            // Send the token in the Authorization header
            const response = await axios.post('http://localhost:5000/api/company', companyData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const companyId = response.data.company._id;
            setAlertType('success');
            setAlertMessage('Company details submitted successfully.');
            setShowAlert(true);

            // Navigate to dashboard after showing alert
            setTimeout(() => {
                setShowAlert(false);
                navigate(`/admin/dashboard?companyId=${companyId}`);
            }, 2000); // Navigate after 2 seconds to let the user see the alert
        } catch (error) {
            setAlertType('error');
            setAlertMessage(`Error submitting details: ${error.response?.data?.message || error.message}`);
            setShowAlert(true);

            // Hide alert after 2 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <div className='company-wrapper'>
            <div className="company-container">
                <h2 className='company-heading'>Company Details</h2>
                <input
                    className='company-input'
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                    className='company-input'
                    type="number"
                    placeholder="Number of Rooms"
                    value={noOfRooms}
                    onChange={(e) => setNoOfRooms(e.target.value)}
                />
                <input
                    className='company-input'
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    className='company-input'
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <input
                    className='company-input'
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                />
                <input
                    className='company-input'
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button className='company-submit-btn' onClick={handleSubmit}>Submit</button>

                {/* Show alert message */}
                {showAlert && (
                    <div className="alert-container">
                        {alertType === 'success' && <SuccessAlert message={alertMessage} />}
                        {alertType === 'error' && <ErrorAlert message={alertMessage} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyPage;
