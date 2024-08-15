import React, { useState } from 'react';
import axios from 'axios';
import '../../../App.css';
import { Link } from 'react-router-dom';
import { SuccessAlert, ErrorAlert } from '../../../components/Alert'; 
import { useNavigate } from 'react-router-dom';

const UserSignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [alertType, setAlertType] = useState(''); // To control which alert to show
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/register', { name, email, phone, password });
            localStorage.setItem('token', response.data.token);
            // Set alert message and type for success
            setAlertType('success');
            setAlertMessage('Registration successful');
            setShowAlert(true);

            // Hide alert after 5 seconds
            setTimeout(() => {
                setShowAlert(false);
                navigate('/company');
            }, 2000);
        } catch (error) {
            setAlertType('error');
            setAlertMessage('Error registering');
            setShowAlert(true);

            // Hide alert after 5 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <div className='signup-wrapper'>
            <div className="signup-container">
                <h2 className='signup-heading'>Admin Registration</h2>
                <input className='signup-name' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className='signup-email' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='signup-phone' type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className='signup-password' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='register-btn' onClick={handleRegister}>Register</button>

                <div className="login-router-wrapper">
                    <p className="">Already have an account?</p>
                    <Link to='/Admin-login' className='login-link'>Login</Link>
                </div>
            </div>

            {/* Show alert message */}
            {showAlert && (
                <div className="alert-container">
                    {alertType === 'success' && <SuccessAlert message={alertMessage} />}
                    {alertType === 'error' && <ErrorAlert message={alertMessage} />}
                </div>
            )}
        </div>
    );
};

export default UserSignUpPage;
