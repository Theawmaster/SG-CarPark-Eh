import { fetchCarparkDetails } from './uraCarparkDetailsService.js';

/**
 * Fetches and aggregates carpark data, filtering by vehicle type and search query,
 * and returns a list of unique carpark names.
 *
 * @async
 * @function fetchAggregatedCarparkData
 * @param {string} [vehicleType] - The type of vehicle to filter carparks (e.g., 'car', 'motorcycle').
 * @param {string} [query] - A search term to filter carparks by name.
 * @returns {Promise<Object>} An object containing the total number of results and an array of unique carpark names.
 *
 * @example
 * // Fetch carpark data for 'car' vehicle type with 'central' in the name:
 * const data = await fetchAggregatedCarparkData('car', 'central');
 * console.log(data);
 * // Output:
 * // {
 * //   total: 5,
 * //   results: [
 * //     { carparkName: 'Central Mall' },
 * //     { carparkName: 'Central Square' },
 * //     ...
 * //   ]
 * // }
 *
 * @throws {Error} If there is an issue fetching or aggregating the carpark data.
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
