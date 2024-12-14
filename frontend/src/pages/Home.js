import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file

const Home = () => {
  const [vehicleType, setVehicleType] = useState('Car');
  const navigate = useNavigate();

  const handleVehicleChange = (event) => {
    setVehicleType(event.target.value);
  };

  const handleSearchClick = () => {
    navigate('/Search', { state: { vehicleType } });
  };

  const handleAllCarparksClick = () => {
    navigate('/AllListed', { state: { vehicleType } });
  };

  const handleNearbyCarparksClick = () => {
    navigate('/Find', { state: { vehicleType } });
  };

  const handleIntroductoryClick = () => {
    navigate('/');
  };

  return (
    <div className="home">

      {/* Introductory Icon */}
      <button className="introductory-icon" onClick={handleIntroductoryClick}>
        ❓ Help
      </button>

      <div className="vehicle-selection">
        <h3><span style={{color: 'red'}}>*</span>Type of vehicle:</h3>
        <label>
          <input
            type="radio"
            name="vehicleType"
            value="Car"
            checked={vehicleType === 'Car'}
            onChange={handleVehicleChange}
          />
          Car
        </label>
        <label>
          <input
            type="radio"
            name="vehicleType"
            value="Motorcycle"
            checked={vehicleType === 'Motorcycle'}
            onChange={handleVehicleChange}
          />
          Motorcycle
        </label>
        <label>
          <input
            type="radio"
            name="vehicleType"
            value="Heavy Vehicle"
            checked={vehicleType === 'Heavy Vehicle'}
            onChange={handleVehicleChange}
          />
          Heavy Vehicle
        </label>
      </div>

      <div className="button-group">
        <button className="button search-button" onClick={handleSearchClick}>
          🔍 Search Carpark
        </button>
        <button className="button list-button" onClick={handleAllCarparksClick}>
          ⬇ All Carparks Listed
        </button>
        <button className="button nearby-button" onClick={handleNearbyCarparksClick}>
          📍 Find Nearby Carparks
        </button>
      </div>

    </div>
  );
};

export default Home;
