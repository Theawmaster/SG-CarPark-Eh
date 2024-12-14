/**
 * Controller to fetch URA carpark availability data.
 * This function retrieves the latest carpark availability data from the URA service and sends it as a JSON response.
 *
 * @async
 * @function getCarparkAvailability
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void} Sends a JSON response containing carpark availability data or an error message.
 *
 * @example
 * // Example API request:
 * // GET /api/carparks/availability
 *
 * @throws {500} If there is an error while fetching carpark availability data from the service.
 */

import { fetchCarparkAvailability } from '../services/uraAvailabilityService.js';

export const getCarparkAvailability = async (req, res) => {
  try {
    const data = await fetchCarparkAvailability();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URA carpark availability data' });
  }
};
