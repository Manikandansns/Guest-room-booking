import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [color, setColor] = useState(false);
  const navigate =useNavigate();

  const changeColor = () => {
    if (window.scrollY >= 2) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  const closeNav = () => {
    setShowNav(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  
    navigate('/');  
};

  return (
    <nav className={color ? 'navbar navbar-bg' : 'navbar'}>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="navbar-logo">Room</Link>
        </div>
        <div className="nav-links">
          <ul className="navbar-menu">
            <li><Link to="/" className="link">Home</Link></li>
            <li><Link to="/about" className="link">About</Link></li>
            <li><Link to="/contact" className="link">Contact</Link></li>
          </ul>
        </div>
        <div className="nav-btn">
          <div className="profile-wrapper">
            <AccountCircleIcon />
            <Link to='/' className='link' onClick={handleLogout}>Logout</Link>
          </div>
          <FaBars className="bars" onClick={() => setShowNav(!showNav)} />
        </div>
      </div>

      <div className={showNav ? 'nav-menu show-nav' : 'nav-menu'}>
        <Link to="/" className="nav-link" onClick={closeNav}>Home</Link>
        <Link to="/about" className="nav-link" onClick={closeNav}>About</Link>
        <Link to="/contact" className="nav-link" onClick={closeNav}>Contact</Link>
        <Link to="/" className="nav-link" onClick={closeNav}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
