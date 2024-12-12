import React, { useState } from 'react';
import '../styles/Home.css'; // Import the CSS file

const Home = () => {
  const [vehicleType, setVehicleType] = useState('Car');

  const handleVehicleChange = (event) => {
    setVehicleType(event.target.value);
  };

  const handleSearchClick = () => {
    alert('Search Carpark clicked');
  };

  const handleAllCarparksClick = () => {
    alert('View All Carparks clicked');
  };

  const handleNearbyCarparksClick = () => {
    alert('Find Nearby Carparks clicked');
  };

  return (
    <div className="home">

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