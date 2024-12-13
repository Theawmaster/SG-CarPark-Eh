import { fetchCarparkDetails } from './uraCarparkDetailsService.js';

/**
 * Fetches and filters carpark details to return unique carpark names.
 */
export const fetchAggregatedCarparkData = async (vehicleType, query) => {
  try {
    // Fetch carpark details
    const detailsData = await fetchCarparkDetails();

    console.log('Details Data:', detailsData); // Debugging log

    // Use a Set to store unique carpark names
    const uniqueCarparks = new Set();

    // Filter and map the details data
    const filteredData = detailsData.reduce((result, detail) => {
      const ppName = detail.ppName.trim();
      const vehCat = detail.vehCat.trim().toLowerCase();

      // Filter by vehicleType
      if (vehicleType && vehCat !== vehicleType.toLowerCase()) {
        return result;
      }

      // Filter by query
      if (query && !ppName.toLowerCase().includes(query.toLowerCase())) {
        return result;
      }

      // Add carpark name to the Set if it is unique
      if (!uniqueCarparks.has(ppName)) {
        uniqueCarparks.add(ppName);
        result.push({ carparkName: ppName });
      }

      return result;
    }, []);

    // Return filtered and unique carpark names
    return {
      total: filteredData.length,
      results: filteredData,
    };
  } catch (error) {
    console.error('Error in fetchAggregatedCarparkData:', error);
    throw new Error('Failed to aggregate carpark data.');
  }
};
