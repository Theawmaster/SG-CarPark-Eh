/**
 * Controller to get carpark details along with availability data.
 * This function fetches carpark details and availability, filters the data based on carpark name and vehicle type,
 * and returns aggregated details including available lots, rates, parking system, and capacity.
 *
 * @async
 * @function getCarparkDetailsWithAvailability
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.query - Query parameters from the HTTP request.
 * @param {string} req.query.carparkName - Name of the carpark to search for (case-insensitive).
 * @param {string} req.query.vehicleType - Vehicle type to filter (e.g., 'Car', 'Motorcycle', 'Heavy Vehicle').
 * @param {Object} res - The HTTP response object.
 * @returns {void} Sends a JSON response containing aggregated carpark details or an error message.
 *
 * @example
 * // Example API request:
 * // GET /api/carparks/detailsWithAvailability?carparkName=Central Mall&vehicleType=Car
 *
 * @throws {400} If carparkName or vehicleType is missing, or an invalid vehicle type is provided.
 * @throws {404} If no matching carpark details are found for the specified name and vehicle type.
 * @throws {500} If there is an error while fetching carpark details or availability data.
 */

import { fetchCarparkDetails } from '../services/uraCarparkDetailsService.js';
import { fetchCarparkAvailability } from '../services/uraAvailabilityService.js';

export const getCarparkDetailsWithAvailability = async (req, res) => {
  const { carparkName, vehicleType } = req.query;

  if (!carparkName) {
    return res.status(400).json({ error: 'Carpark name is required' });
  }

  if (!vehicleType) {
    return res.status(400).json({ error: 'Vehicle type is required' });
  }

  // Map vehicleType to lotType
  const vehicleTypeMap = {
    Car: 'C',
    Motorcycle: 'M',
    'Heavy Vehicle': 'H',
  };

  const lotType = vehicleTypeMap[vehicleType];
  if (!lotType) {
    return res.status(400).json({ error: 'Invalid vehicle type provided.' });
  }

  try {
    const [availabilityData, detailsData] = await Promise.all([
      fetchCarparkAvailability(),
      fetchCarparkDetails(),
    ]);

    // Filter details by carparkName and vehicleType
    const matchingDetails = detailsData.filter(
      (detail) =>
        detail.ppName.trim().toLowerCase() === carparkName.trim().toLowerCase() &&
        detail.vehCat.toLowerCase() === vehicleType.toLowerCase()
    );

    if (matchingDetails.length === 0) {
      return res.status(404).json({ error: 'Carpark not found' });
    }

    // Extract ppCodes to match with carparkNo in availability data
    const ppCodes = matchingDetails.map((detail) => detail.ppCode.trim().toLowerCase());

    // Filter availability data by ppCodes and lotType
    const matchingAvailability = availabilityData.filter(
      (avail) =>
        ppCodes.includes(avail.carparkNo.trim().toLowerCase()) &&
        avail.lotType.trim().toUpperCase() === lotType
    );

    // Sum lotsAvailable, handling undefined values gracefully
    const totalLotsAvailable = matchingAvailability.reduce((total, avail) => {
      const lots = parseInt(avail.lotsAvailable, 10);
      return total + (isNaN(lots) ? 0 : lots);
    }, 0);

    const availableLots = totalLotsAvailable > 0 ? totalLotsAvailable : 'N/A';

    // Prepare response object
    const aggregatedDetails = {
      carparkName: carparkName.trim(),
      availableLots: availableLots,
      weekdayRate: [],
      saturdayRate: [],
      sundayPHRate: [],
      parkingSystem: '',
      parkCapacity: 0,
    };

    // Helper to generate descriptive rates
    const groupRates = (rates) => {
      const validRates = rates
        .map((rate) => {
          const match = rate.match(/\$\d+(\.\d+)?/); // Extract valid rates
          return match ? parseFloat(match[0].slice(1)) : null;
        })
        .filter((rate) => rate !== null); // Remove undefined/null

      if (validRates.length === 0) return 'N/A';
      const uniqueRates = [...new Set(validRates)];
      if (uniqueRates.length === 1) return `$${uniqueRates[0].toFixed(2)}`; // Single value if all rates are the same
      return `$${Math.min(...validRates).toFixed(2)} - $${Math.max(...validRates).toFixed(2)}`;
    };

    // Aggregate rates and other details
    matchingDetails.forEach((detail) => {
      if (detail.weekdayRate && detail.startTime && detail.endTime) {
        aggregatedDetails.weekdayRate.push(`${detail.weekdayRate} (${detail.startTime} - ${detail.endTime})`);
      }
      if (detail.satdayRate && detail.startTime && detail.endTime) {
        aggregatedDetails.saturdayRate.push(`${detail.satdayRate} (${detail.startTime} - ${detail.endTime})`);
      }
      if (detail.sunPHRate && detail.startTime && detail.endTime) {
        aggregatedDetails.sundayPHRate.push(`${detail.sunPHRate} (${detail.startTime} - ${detail.endTime})`);
      }

      aggregatedDetails.parkingSystem =
        detail.parkingSystem === 'B'
          ? 'Electronic Parking System'
          : detail.parkingSystem === 'C'
          ? 'Coupon Parking System'
          : 'Unknown System';

      aggregatedDetails.parkCapacity = detail.parkCapacity || 0;
    });

    // Generate succinct rates
    aggregatedDetails.weekdayRate = groupRates(aggregatedDetails.weekdayRate);
    aggregatedDetails.saturdayRate = groupRates(aggregatedDetails.saturdayRate);
    aggregatedDetails.sundayPHRate = groupRates(aggregatedDetails.sundayPHRate);

    res.status(200).json(aggregatedDetails);
  } catch (error) {
    console.error('Error fetching carpark details:', error);
    res.status(500).json({ error: 'Failed to fetch carpark details' });
  }
};
