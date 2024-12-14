import React, { useState, useEffect } from "react";
import "../styles/Find.css";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * React component to find nearby carparks based on the user's current location.
 *
 * @component
 * @returns {JSX.Element} A table listing nearby carparks or error/loading messages.
 *
 * @description
 * - Uses the browser's Geolocation API to fetch the user's current coordinates.
 * - Sends a request to the backend API to retrieve nearby carparks based on the location and selected vehicle type.
 * - Deduplicates and filters carpark data before displaying it in a table.
 * - Allows the user to navigate to a detailed view for a specific carpark.
 */

const Find = () => {
    const [carparks, setCarparks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const vehicleType = location.state?.vehicleType || "Car";

    /**
     * Fetches nearby carparks using the user's current location.
     * Deduplicates and filters the carpark data and handles errors if location access is unavailable.
     */

    const fetchNearbyCarparks = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(
                        `https://sg-carpark-eh.onrender.com/api/carparks?latitude=${latitude}&longitude=${longitude}&radius=3&vehicleType=${vehicleType}`
                    );
                    const data = await response.json();

                    if (data.nearbyCarparks && data.nearbyCarparks.length > 0) {

                        // Deduplicate by ppName and filter only valid carparks
                        const uniqueCarparks = Array.from(
                            new Map(data.nearbyCarparks.map((carpark) => [carpark.ppName, carpark])).values()
                        ).filter((carpark) => carpark.ppName); // Ensure ppName exists

                        setCarparks(uniqueCarparks);
                    } else {
                        setError("No carparks found for the selected vehicle type.");
                    }
                } catch (err) {
                    setError("Error fetching carparks. Please try again.");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setError("Unable to retrieve your location.");
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        fetchNearbyCarparks();
    }, []);

    /**
     * Navigates to the carpark details page with the selected carpark name.
     *
     * @param {string} carparkName - The name of the selected carpark.
     */

    const handleCarparkClick = (carparkName) => {
        navigate("/details", { state: { carparkName, vehicleType } });
    };

    return (
        <div className="find-container">
            <button className="back-button5" onClick={() => navigate(-1)}>
                Back
            </button>
            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading">Loading nearby carparks...</div>}
            {carparks.length > 0 && (
                <table className="carpark-table">
                    <thead>
                        <tr>
                            <th>Carpark Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carparks.map((carpark) => (
                            <tr
                                key={carpark.ppName}
                                onClick={() => handleCarparkClick(carpark.ppName)}
                            >
                                <td>{carpark.ppName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Find;
