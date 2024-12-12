import { fetchCarparkAvailability } from './uraAvailabilityService.js';
import { fetchCarparkDetails } from './uraCarparkDetailsService.js';

/**
 * Aggregates data from availability and details endpoints to produce a simplified structure:
 * [
 *   {
 *     "carparkCode": "A0004",
 *     "carparkName": "ALIWAL STREET",
 *     "availableLots": 20,
 *     "parkCapacity": 69,
 *     "vehCat": "Car",
 *     "weekdayRate": "$0.50"
 *   },
 *   ...
 * ]
 */
export const fetchAggregatedCarparkData = async () => {
  // Fetch raw data
  const [availabilityData, detailsData] = await Promise.all([
    fetchCarparkAvailability(),
    fetchCarparkDetails()
  ]);

  // Convert details into a map for quick lookup by ppCode
  const detailsMap = {};
  for (const detail of detailsData) {
    // Normalize codes if needed. Assuming ppCode and carparkNo can be directly matched.
    detailsMap[detail.ppCode] = detail;
  }

  const aggregated = [];

  for (const avail of availabilityData) {
    const code = avail.carparkNo; // from availability
    const detail = detailsMap[code];

    if (detail) {
      aggregated.push({
        carparkCode: detail.ppCode,
        carparkName: detail.ppName.trim(),       // assuming trim to clean up trailing spaces
        availableLots: parseInt(avail.lotsAvailable, 10),
        parkCapacity: detail.parkCapacity,
        vehCat: detail.vehCat,
        weekdayRate: detail.weekdayRate
      });
    }
  }

  return aggregated;
};
