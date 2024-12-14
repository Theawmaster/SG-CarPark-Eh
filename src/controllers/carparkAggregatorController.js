/**
 * Controller for fetching aggregated carpark data.
 * This function handles an HTTP request to retrieve carpark data based on the provided query parameters.
 *
 * @async
 * @function getAggregatedCarparkData
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.query - Query parameters from the HTTP request.
 * @param {string} req.query.vehicleType - Type of vehicle to filter carparks (e.g., 'car', 'motorcycle', 'heavyVehicle').
 * @param {string} [req.query.query] - Search query or filter criteria for carparks.
 * @param {number} [req.query.limit=10] - Number of results to return per page (default is 10).
 * @param {number} [req.query.page=1] - The page number for paginated results (default is 1).
 * @param {Object} res - The HTTP response object.
 * @returns {void} Sends a JSON response with aggregated carpark data or an error message.
 *
 * @example
 * // Example API request:
 * // GET /api/carparks?vehicleType=car&query=central&limit=5&page=2
 *
 * @throws {500} If there is an error during the aggregation of carpark data, sends a JSON error response.
 *
 * @description
 * The function calls the `fetchAggregatedCarparkData` service to fetch carpark data.
 * It extracts query parameters from the request, such as `vehicleType`, `query`, `limit`, and `page`.
 * If successful, it responds with a JSON object containing the aggregated data.
 * If an error occurs, it logs the error and sends a 500 status with an error message.
 */

import { fetchAggregatedCarparkData } from '../services/carparkAggregatorService.js';


export const getAggregatedCarparkData = async (req, res) => {
  const { vehicleType, query, limit = 10, page = 1 } = req.query;

  try {
    const data = await fetchAggregatedCarparkData(vehicleType, query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error aggregating carpark data:', error);
    res.status(500).json({ error: 'Failed to retrieve aggregated carpark data' });
  }
};
