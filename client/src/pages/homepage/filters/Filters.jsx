import React, { useEffect, useState } from 'react';
import './Filters.css';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AnchorTemporaryDrawer from '../../Drawer';

const Filters = ({ filters, onFilterChange }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [value, setValue] = useState([filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    const handleScroll = () => {
      const filterElement = document.querySelector('.filters');
      const stickyThreshold = filterElement.offsetTop;

      if (window.scrollY > stickyThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    onFilterChange({ target: { name: 'minPrice', value: newValue[0] } });
    onFilterChange({ target: { name: 'maxPrice', value: newValue[1] } });
  };

  const FilterSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
    },
    '& .MuiSlider-track': {
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: 3,
    },
  }));

  return (
    <div className={`filters ${isSticky ? 'sticky' : ''}`}>
      <form className="filter-form">
        <div className="filter-group">
          <label>Room Type:</label>
          <select name="roomType" value={filters.roomType} onChange={onFilterChange}>
            <option value="">All</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        </div>
        <hr />
        <div className="filter-group range">
          <label>Price Range: ${filters.minPrice} - ${filters.maxPrice}</label>
          <Box sx={{ width: 300 }}>
            <FilterSlider
              value={value}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={20000}
              step={1000}
            />
          </Box>
        </div>
        <hr />
        <div className="filter-group">
          <label>Availability:</label>
          <select name="availability" value={filters.availability} onChange={onFilterChange}>
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
        <hr />
        <div className="filter-group anchor">
          <AnchorTemporaryDrawer filters={filters} onFilterChange={onFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default Filters;
