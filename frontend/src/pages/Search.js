import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Search.css';

/**
 * Search component for filtering and displaying carparks based on user input.
 *
 * @component
 * @returns {JSX.Element} A searchable interface for finding carparks by name or keyword.
 *
 * @description
 * - Allows users to search for carparks by typing a query.
 * - Dynamically fetches and displays search results based on the selected vehicle type and input term.
 * - Provides navigation to detailed carpark information for selected results.
 */

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleType } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches carpark data based on the search term and vehicle type.
   * Debounces user input to minimize unnecessary API calls.
   */

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
          `https://sg-carpark-eh.onrender.com/api/aggregated-carparks?vehicleType=${vehicleType}&query=${searchTerm}`
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

  /**
   * Handles navigation to the carpark details page for a selected result.
   *
   * @param {Object} result - The selected carpark result object.
   */

  const handleResultClick = (result) => {
    console.log('Navigating to details with carparkName:', result.carparkName);
    navigate('/details', { state: { carparkName: result.carparkName, vehicleType } });
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
