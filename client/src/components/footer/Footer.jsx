import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <footer className="footer">
     <div className="footer-wrapper">
     <div className="footer-logo-container">
      <h2 className="footer-logo">Room</h2>
     </div>
     <div className="footer-links-wrapper">
      <ul className="footer-links-container">
        <li className=""><Link className="footer-link">Home</Link></li>
        <li className=""><Link className="footer-link">About</Link></li>
        <li className=""><Link className="footer-link">Service</Link></li>
        <li className=""><Link className="footer-link">Contact Us</Link></li>
      </ul>
     </div>
     <div className="footer-social-wrapper">
      <ul className="footer-social-container">
        <li className=""><Link to='www.whatsapp.com' className="footer-icon-link"><WhatsAppIcon/></Link></li>
        <li className=""><Link to='www.facebook.com' className="footer-icon-link"><FacebookIcon/></Link></li>
        <li className=""><Link to='www.instagram.com' className="footer-icon-link"><InstagramIcon/></Link></li>
        <li className=""><Link to='www.twitter.com' className="footer-icon-link"><TwitterIcon/></Link></li>
      </ul>
     </div>
     <div className='hr-wrapper'>
      <hr className='hr'/>
     </div>
     <div className="copyrights">
     <p>&copy; 2024 Room Admin Management. All rights reserved.</p>
     </div>
     </div>
    </footer>
  );
};

export default Footer;
