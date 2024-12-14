import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Details.css";

/**
 * React component for displaying detailed information about a specific carpark.
 *
 * @component
 * @returns {JSX.Element} A detailed view of the selected carpark, including available lots, rates, and more.
 *
 * @description
 * - Fetches carpark details from the backend API based on the selected carpark name and vehicle type.
 * - Displays the details in a table format.
 * - Provides a link to view the carpark location on Google Maps.
 */

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { carparkName, vehicleType } = location.state || {};

    const [carparkDetails, setCarparkDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetches carpark details when the component mounts.
     * Logs and handles errors, updating the component state accordingly.
     */

    useEffect(() => {
        console.log("Carpark Name:", carparkName);
        console.log("Vehicle Type:", vehicleType);

        if (!carparkName) {
            setError("No carpark name provided.");
            setLoading(false);
            return;
        }

        const fetchCarparkDetails = async () => {
            const cleanCarparkName = carparkName.trim();
            console.log(
                `Fetching carpark details with URL: http://localhost:4000/api/carpark-info?carparkName=${encodeURIComponent(
                    cleanCarparkName
                )}&vehicleType=${vehicleType || ""}`
            );

            try {
                const response = await fetch(
                    `https://sg-carpark-eh.onrender.com/api/carpark-info?carparkName=${encodeURIComponent(
                        cleanCarparkName
                    )}&vehicleType=${vehicleType || ""}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch carpark details.");
                }

                const data = await response.json();
                setCarparkDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCarparkDetails();
    }, [carparkName, vehicleType]);

    if (loading) {
        return <p>Loading carpark details...</p>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
                <button className="back-button3" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>
        );
    }

    if (!carparkDetails) {
        return <p>No carpark details available.</p>;
    }

    const {
        availableLots,
        weekdayRate,
        saturdayRate,
        sundayPHRate,
        parkingSystem,
        parkCapacity,
    } = carparkDetails;

    const formattedParkCapacity =
        typeof parkCapacity === "object"
            ? parkCapacity[vehicleType] || "N/A"
            : parkCapacity;

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
                        <td>{availableLots || "N/A"}</td>
                    </tr>
                    <tr>
                        <td>Weekday Rate</td>
                        <td>{weekdayRate || "N/A"}</td>
                    </tr>
                    <tr>
                        <td>Saturday Rate</td>
                        <td>{saturdayRate || "N/A"}</td>
                    </tr>
                    <tr>
                        <td>Sunday/PH Rate</td>
                        <td>{sundayPHRate || "N/A"}</td>
                    </tr>
                    <tr>
                        <td>Parking System</td>
                        <td>{parkingSystem || "N/A"}</td>
                    </tr>
                    <tr>
                        <td>Park Capacity</td>
                        <td>{formattedParkCapacity || "N/A"}</td>
                    </tr>
                </tbody>
            </table>
            <p>
                👉🏻 Click{" "}
                <a
                    href={`https://maps.google.com/?q=${carparkName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>{" "}
                for directions.
            </p>
        </div>
    );
};

export default Details;
