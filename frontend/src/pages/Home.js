import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file

/**
 * Home component for selecting a vehicle type and navigating to various carpark-related functionalities.
 *
 * @component
 * @returns {JSX.Element} The Home page interface.
 *
 * @description
 * - Allows users to select a vehicle type (Car, Motorcycle, or Heavy Vehicle).
 * - Provides navigation to search for carparks, view all carparks, or find nearby carparks.
 * - Includes a help button for introductory guidance.
 */

const Home = () => {
  const [vehicleType, setVehicleType] = useState('Car');
  const navigate = useNavigate();

  /**
   * Handles changes to the selected vehicle type.
   *
   * @param {Object} event - The event object from the radio button input.
   */

  const handleVehicleChange = (event) => {
    setVehicleType(event.target.value);
  };

  /**
   * Navigates to the search carpark page with the selected vehicle type.
   */

  const handleSearchClick = () => {
    navigate('/Search', { state: { vehicleType } });
  };

  /**
   * Navigates to the all carparks listed page with the selected vehicle type.
   */

  const handleAllCarparksClick = () => {
    navigate('/AllListed', { state: { vehicleType } });
  };

   /**
   * Navigates to the find nearby carparks page with the selected vehicle type.
   */

  const handleNearbyCarparksClick = () => {
    navigate('/Find', { state: { vehicleType } });
  };

  /**
   * Navigates to the introductory page.
   */

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
