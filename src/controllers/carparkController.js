/**
 * Controller to get nearby carparks based on user coordinates.
 * This function fetches carpark details, filters them by vehicle type, 
 * and returns those within a specified radius from the provided coordinates.
 *
 * @async
 * @function getNearbyCarparks
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.query - Query parameters from the HTTP request.
 * @param {number} req.query.latitude - Latitude of the user's location.
 * @param {number} req.query.longitude - Longitude of the user's location.
 * @param {number} [req.query.radius=3] - Radius in kilometers to search for nearby carparks (default is 3km).
 * @param {string} req.query.vehicleType - Vehicle type for filtering carparks (e.g., 'car', 'motorcycle').
 * @param {Object} res - The HTTP response object.
 * @returns {void} Sends a JSON response containing nearby carparks or an error message.
 *
 * @example
 * // Example API request:
 * // GET /api/carparks/nearby?latitude=1.3521&longitude=103.8198&radius=5&vehicleType=car
 *
 * @throws {400} If latitude, longitude, or vehicleType is missing in the request.
 * @throws {500} If there is an error while fetching carpark details.
 */

import { filterCarparksByRadius } from "../services/coordinateService.js";
import { fetchCarparkDetails } from "../services/uraCarparkDetailsService.js";

export const getNearbyCarparks = async (req, res) => {
  const { latitude, longitude, radius = 3, vehicleType } = req.query;

  if (!latitude || !longitude || !vehicleType) {
    return res
      .status(400)
      .json({ error: "Latitude, longitude, and vehicleType are required." });
  }

  const userCoords = [parseFloat(latitude), parseFloat(longitude)];

  try {
    // Fetch carpark details dynamically from URA API
    const carparkData = await fetchCarparkDetails();

    // Flatten the data to include multiple coordinates for each carpark
    const formattedCarparkData = carparkData
      .filter((carpark) => carpark.vehCat === vehicleType) // Filter by vehicle type
      .flatMap((carpark) =>
        carpark.geometries.map((geometry, index) => ({
          id: `${carpark.ppCode}-${index}`, // Unique ID
          ppName: carpark.ppName || "Unnamed Carpark", // Use ppName or fallback
          coordinates: geometry.coordinates, // Coordinates
          vehicleType: carpark.vehCat, // Vehicle type
        }))
      );

    // Filter carparks by radius
    const nearbyCarparks = filterCarparksByRadius(userCoords, formattedCarparkData, radius);

    if (nearbyCarparks.length === 0) {
      return res.json({
        message: "No carparks found for the specified vehicle type.",
        nearbyCarparks: [],
      });
    }

    res.json({ nearbyCarparks });
  } catch (error) {
    console.error("Error fetching carpark details:", error);
    res.status(500).json({ error: "Failed to fetch carpark data." });
  }
};

export const getCarparkDetails = async (req, res) => {
  const { carparkName, vehicleType } = req.query;

  if (!carparkName || !vehicleType) {
    return res.status(400).json({
      error: "Carpark name and vehicle type are required.",
    });
  }

  try {
    const carparkData = await fetchCarparkDetails();

    const details = carparkData.find(
      (carpark) =>
        carpark.ppName.toLowerCase() === carparkName.toLowerCase() &&
        carpark.vehCat === vehicleType
    );

    if (!details) {
      return res.status(404).json({
        message: "Carpark details not found for the specified name and vehicle type.",
      });
    }

    res.json(details);
  } catch (error) {
    console.error("Error fetching carpark details:", error);
    res.status(500).json({ error: "Failed to fetch carpark details." });
  }
};
