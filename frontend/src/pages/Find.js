import React, { useState, useEffect } from "react";
import "../styles/Find.css";
import { useNavigate, useLocation } from "react-router-dom";

const Find = () => {
    const [carparks, setCarparks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const vehicleType = location.state?.vehicleType || "Car";

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
                        `http://localhost:4000/api/carparks?latitude=${latitude}&longitude=${longitude}&radius=3&vehicleType=${vehicleType}`
                    );
                    const data = await response.json();

                    if (data.nearbyCarparks && data.nearbyCarparks.length > 0) {
                        console.log("Fetched Carpark Data:", data.nearbyCarparks);

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

    const handleCarparkClick = (carparkName) => {
        console.log("Navigating to details with carparkName:", carparkName);
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
