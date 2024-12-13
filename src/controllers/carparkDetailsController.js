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

    // Check for multiple matching records and sum lotsAvailable
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

    // Aggregate rates and other details
    matchingDetails.forEach((detail) => {
      if (!aggregatedDetails.weekdayRate.includes(detail.weekdayRate)) {
        aggregatedDetails.weekdayRate.push(`${detail.weekdayRate} (${detail.startTime} - ${detail.endTime})`);
      }
      if (!aggregatedDetails.saturdayRate.includes(detail.satdayRate)) {
        aggregatedDetails.saturdayRate.push(`${detail.satdayRate} (${detail.startTime} - ${detail.endTime})`);
      }
      if (!aggregatedDetails.sundayPHRate.includes(detail.sunPHRate)) {
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

    // Concatenate rates into strings
    aggregatedDetails.weekdayRate = aggregatedDetails.weekdayRate.join(', ');
    aggregatedDetails.saturdayRate = aggregatedDetails.saturdayRate.join(', ');
    aggregatedDetails.sundayPHRate = aggregatedDetails.sundayPHRate.join(', ');

    res.status(200).json(aggregatedDetails);
  } catch (error) {
    console.error('Error fetching carpark details:', error);
    res.status(500).json({ error: 'Failed to fetch carpark details' });
  }
};
