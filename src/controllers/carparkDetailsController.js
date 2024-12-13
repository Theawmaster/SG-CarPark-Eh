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
      console.log('No matching details found for the given carpark name and vehicle type.');
      return res.status(404).json({ error: 'Carpark not found' });
    }

    // Extract ppCodes to match with carparkNo in availability data
    const ppCodes = matchingDetails.map((detail) => detail.ppCode.trim().toLowerCase());
    console.log('PP Codes:', ppCodes);

    // Filter availability data by ppCodes and lotType
    const matchingAvailability = availabilityData.filter(
      (avail) =>
        ppCodes.includes(avail.carparkNo.trim().toLowerCase()) &&
        avail.lotType.trim().toUpperCase() === lotType
    );

    console.log('Filtered Availability Data:', matchingAvailability);

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
