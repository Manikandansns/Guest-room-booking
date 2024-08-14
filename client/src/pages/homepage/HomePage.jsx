import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeroSection from './herosection/HeroSection';
import RoomList from '../homepage/roomlist/RoomList';
import Footer from '../../components/footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      {/* <Filters /> */}
      <div className="main-content">
        <aside className="sidebar">
          {/* <Filters /> */}
        </aside>
        <section className="rooms">
          <RoomList/>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
