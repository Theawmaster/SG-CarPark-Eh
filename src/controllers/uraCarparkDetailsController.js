/**
 * Controller to fetch URA carpark details data.
 * This function retrieves detailed carpark information from the URA service and sends it as a JSON response.
 *
 * @async
 * @function getCarparkDetails
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void} Sends a JSON response containing carpark details or an error message.
 *
 * @example
 * // Example API request:
 * // GET /api/carparks/details
 *
 * @throws {500} If there is an error while fetching carpark details data from the service.
 */

import { fetchCarparkDetails } from '../services/uraCarparkDetailsService.js';

export const getCarparkDetails = async (req, res) => {
  try {
    const data = await fetchCarparkDetails();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URA carpark details data' });
  }
};
