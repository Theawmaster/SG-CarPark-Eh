import axios from 'axios';
import 'dotenv/config';

const URA_API_URL = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability';
const ACCESS_KEY = process.env.URA_ACCESS_KEY;
const TOKEN = process.env.URA_TOKEN;

/**
 * Fetches real-time carpark availability data from the URA API.
 *
 * @async
 * @function fetchCarparkAvailability
 * @returns {Promise<Array>} A promise that resolves to an array of carpark availability data if successful.
 * @throws {Error} If the API request fails or returns an unsuccessful status.
 *
 * @example
 * // Example usage:
 * fetchCarparkAvailability()
 *   .then((data) => {
 *     console.log('Carpark Availability:', data);
 *   })
 *   .catch((error) => {
 *     console.error('Error:', error);
 *   });
 *
 * @description
 * This function sends a GET request to the URA API to retrieve real-time carpark availability data.
 * It uses the `AccessKey` and `Token` from environment variables for authentication.
 * If the API response is successful, it returns the `Result` field, which contains an array of carpark data.
 * If the response is unsuccessful or if an error occurs during the request, the function throws an error.
 */

export const fetchCarparkAvailability = async () => {
  try {
    const response = await axios.get(URA_API_URL, {
      headers: {
        AccessKey: ACCESS_KEY,
        Token: TOKEN
      }
    });

    // Check if the response is successful
    if (response.data.Status === 'Success') {
      return response.data.Result; // This should be an array of carparks
    } else {
      throw new Error(`URA API Error: ${response.data.Message}`);
    }
  } catch (error) {
    console.error('Error fetching URA Car Park Availability data:', error);
    throw error;
  }
};
