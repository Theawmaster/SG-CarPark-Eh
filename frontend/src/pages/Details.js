import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Details.css';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carparkDetails } = location.state || {};

  if (!carparkDetails) {
    return <p>No carpark details available.</p>;
  }

  const {
    carparkName,
    availableLots,
    weekdayRate,
    saturdayRate,
    sundayPHRate,
    parkingSystem,
    parkCapacity,
  } = carparkDetails;

  return (
    <div className="details-container">
      <button className="back-button3" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>{carparkName}</h2>
      <table className="details-table">
        <tbody>
          <tr>
            <td>Available Lots</td>
            <td>{availableLots || 'N/A'}</td>
          </tr>
          <tr>
            <td>Weekday Rate</td>
            <td>{weekdayRate || 'N/A'}</td>
          </tr>
          <tr>
            <td>Saturday Rate</td>
            <td>{saturdayRate || 'N/A'}</td>
          </tr>
          <tr>
            <td>Sunday/PH Rate</td>
            <td>{sundayPHRate || 'N/A'}</td>
          </tr>
          <tr>
            <td>Parking System</td>
            <td>{parkingSystem || 'N/A'}</td>
          </tr>
          <tr>
            <td>Park Capacity</td>
            <td>{parkCapacity || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
      <p>
        Click <a href={`https://maps.google.com/?q=${carparkName}`} target="_blank" rel="noopener noreferrer">here</a> for directions.
      </p>
    </div>
  );
};

export default Details;