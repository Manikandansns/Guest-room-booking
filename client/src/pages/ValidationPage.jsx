// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ValidationPage.css';

const ValidationPage = () => {
    const navigate = useNavigate();

    const goToAdminLogin = () => {
        navigate('/admin-login');
    };

    const goToCustomerLogin = () => {
        navigate('/user-login');
    };

    return (
        <div className='common-container'>
        <div className='validation-wrapper'>
       
            <h2 className='valid-heading'>Login Portal</h2>
            <div className="valid-btn-wrapper">
            <button onClick={goToAdminLogin} className='admin-login'>Login as Host</button>
            <button onClick={goToCustomerLogin} className='customer-login'>Login as Customer</button>
            </div>
        </div>
        </div>
    );
};

export default ValidationPage;
