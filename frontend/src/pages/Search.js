import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Search.css';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleType } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/aggregated-carparks?vehicleType=${vehicleType}&query=${searchTerm}`
        );
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging log
        setResults(data.results || []); // Ensure results is always an array
      } catch (err) {
        console.error('Error fetching carparks:', err);
        setError('Failed to fetch carpark data.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, vehicleType]);

  const handleResultClick = (result) => {
    // Navigate to Details.js with state
    navigate('/details', { state: { carparkDetails: result } });
  };

  useEffect(() => {
    console.log('Results state updated:', results);
  }, [results]);

  return (
    <div className="search-container">
      <button className="back-button2" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>CarParks for {vehicleType}</h2>
      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search for car parks..."
          className="search-input"
        />
      </div>
      <div className="results-section">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && results && results.length > 0 ? (
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index} className="result-item" onClick={() => handleResultClick(result)}>
                {result.carparkName}
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && searchTerm.trim() && <p>No carparks found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
