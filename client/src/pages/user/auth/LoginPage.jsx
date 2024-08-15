import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SuccessAlert, ErrorAlert } from '../../../components/Alert';
import '../../../App.css';

const UserLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertType, setAlertType] = useState(''); 
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password });

            // Assuming response contains userId and token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);

            // Set alert message and type for success
            setAlertType('success');
            setAlertMessage('Login successful!');
            setShowAlert(true);

            // Hide alert after 2 seconds and navigate to homepage
            setTimeout(() => {
                setShowAlert(false);
                navigate('/homepage');
            }, 2000);
        } catch (error) {
            setAlertType('error');
            setAlertMessage('Invalid credentials');
            setShowAlert(true);

            // Hide alert after 2 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <div className='login-wrapper'>
            <div className="login-container">
                <h2 className='login-heading'>User Login</h2>
                <input className='login-email' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='login-password' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='login-btn' onClick={handleLogin}>Login</button>

                <div className="register-router-wrapper">
                    <p className="">Don't have an account?</p>
                    <Link to='/user-register'  className='register-link'>Register</Link>
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

export default UserLoginPage;
