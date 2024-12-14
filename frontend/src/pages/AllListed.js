import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AllListed.css';

/**
 * React component for displaying all carparks based on the selected vehicle type.
 * Allows the user to select a carpark and navigate to its detailed view.
 *
 * @component
 * @returns {JSX.Element} A dropdown list of carparks, along with navigation and error handling.
 *
 * @example
 * // Render the component:
 * <AllListed />
 *
 * @description
 * - Fetches carpark data from the backend API based on the vehicle type passed via state.
 * - Displays the carparks in a dropdown menu.
 * - Allows the user to navigate to a detailed view of the selected carpark.
 */

const AllListed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleType } = location.state || {};
  const [carparks, setCarparks] = useState([]);
  const [selectedCarpark, setSelectedCarpark] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches carpark data from the API for the selected vehicle type.
   * Updates the `carparks` state with the fetched data or sets an error if the fetch fails.
   */

  useEffect(() => {
    const fetchCarparks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://sg-carpark-eh.onrender.com/api/aggregated-carparks?vehicleType=${vehicleType}`
        );
        const data = await response.json();
        setCarparks(data.results || []); // Ensure carparks is always an array
      } catch (err) {
        console.error('Error fetching carparks:', err);
        setError('Failed to fetch carpark data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarparks();
  }, [vehicleType]);

  /**
 * Handles navigation to the carpark details page.
 * If no carpark is selected, shows an alert asking the user to select one.
 *
 * @param {string} carparkName - The name of the selected carpark.
 */
const handleCarparkClick = (carparkName) => {
  if (!carparkName) {
    alert('Please select a carpark before proceeding.');
    return;
  }
  // Navigate to Details.js with state
  navigate('/details', { state: { carparkName: carparkName, vehicleType } });
};

return (
  <div className="all-listed-container">
    <button className="back-button4" onClick={() => navigate(-1)}>
      ← Back
    </button>
    <h2>All Carparks for {vehicleType}</h2>
    {loading ? (
      <p>Loading carparks...</p>
    ) : error ? (
      <p className="error-message">{error}</p>
    ) : (
      <div className="dropdown-container">
        <select
          className="dropdown"
          value={selectedCarpark}
          onChange={(e) => setSelectedCarpark(e.target.value)}
        >
          <option value="">Select a carpark</option>
          {carparks.map((carpark, index) => (
            <option key={index} value={carpark.carparkName}>
              {carpark.carparkName}
            </option>
          ))}
        </select>
        <button
          className="navigate-button"
          onClick={() => handleCarparkClick(selectedCarpark)}
        >
          👀 View Details
        </button>
      </div>
    )}
  </div>
);
};

export default AllListed;
