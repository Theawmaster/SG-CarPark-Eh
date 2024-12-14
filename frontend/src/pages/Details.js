import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Details.css";

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { carparkName, vehicleType } = location.state || {};

    const [carparkDetails, setCarparkDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    `http://localhost:4000/api/carpark-info?carparkName=${encodeURIComponent(
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
