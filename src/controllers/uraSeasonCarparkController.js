/**
 * Controller to fetch URA season carpark details data.
 * This function retrieves season parking details from the URA service and sends it as a JSON response.
 *
 * @async
 * @function getSeasonCarparkDetails
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void} Sends a JSON response containing season carpark details or an error message.
 *
 * @example
 * // Example API request:
 * // GET /api/carparks/seasonDetails
 *
 * @throws {500} If there is an error while fetching season carpark details from the service.
 */

import { fetchSeasonCarparkDetails } from '../services/uraSeasonCarparkService.js';

export const getSeasonCarparkDetails = async (req, res) => {
  try {
    const data = await fetchSeasonCarparkDetails();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URA season carpark details data' });
  }
};
