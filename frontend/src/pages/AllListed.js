import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AllListed.css';

const AllListed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleType } = location.state || {};
  const [carparks, setCarparks] = useState([]);
  const [selectedCarpark, setSelectedCarpark] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all carparks for the selected vehicle type
  useEffect(() => {
    const fetchCarparks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/aggregated-carparks?vehicleType=${vehicleType}`
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

  const handleCarparkClick = (carparkName) => {
    // Navigate to Details.js with state
    console.log('Navigating to details with carparkName:', carparkName);
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
            disabled={!selectedCarpark}
          >
            👀 View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default AllListed;
