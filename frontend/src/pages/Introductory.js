import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Introductory.css'; // Import the CSS file

/**
 * Introductory component for displaying a guide about the carpark application.
 *
 * @component
 * @returns {JSX.Element} The introductory guide interface.
 *
 * @description
 * - Provides a brief introduction to the application's features.
 * - Features a styled list explaining key functionalities.
 * - Includes a button to navigate to the Home page after reading the guide.
 */

const Introductory = () => {
  const navigate = useNavigate();

  /**
     * Handles navigation to the Home page when the "OK" button is clicked.
     */

  const handleOkClick = () => {
    navigate('/Home'); // Redirect to Home page
  };

  return (
    <div className="parent-container">
      <div className="intro-box">
        <h2>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '10px', color: '#f39c12' }} />
            Introduction Guide
        </h2>
        <ol className="intro-list">
          <li>Display carpark available lots and parking rates based on vehicle type.</li>
          <li>Search function to search carpark by street name and postal code.</li>

          <li>A dropdown list to display all carparks listed in Singapore.</li>
          <li>Can search carpark nearby your location up to 3km.</li>
          <li><strong>Not all carparks are listed </strong>(future updates will include more).</li>
        </ol>
        <button onClick={handleOkClick} className="button1">OK</button>
      </div>
    </div>
  );
};

export default Introductory;
