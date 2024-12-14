import axios from 'axios';
import 'dotenv/config';

const URA_API_URL = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details';
const ACCESS_KEY = process.env.URA_ACCESS_KEY;
const TOKEN = process.env.URA_TOKEN;

/**
 * Fetches carpark details data from the URA API.
 *
 * @async
 * @function fetchCarparkDetails
 * @returns {Promise<Array>} A promise that resolves to an array of carpark details if the API request is successful.
 * @throws {Error} If the API request fails or returns an unsuccessful status.
 *
 * @example
 * // Example usage:
 * fetchCarparkDetails()
 *   .then((data) => {
 *     console.log('Carpark Details:', data);
 *   })
 *   .catch((error) => {
 *     console.error('Error:', error);
 *   });
 *
 * @description
 * This function sends a GET request to the URA API to retrieve carpark details.
 * The request includes authentication headers (`AccessKey` and `Token`) from environment variables.
 * On success, the function returns the `Result` field from the API response, which contains an array of carpark details.
 * If the API response status is unsuccessful or an error occurs during the request, the function throws an error.
 */

export const fetchCarparkDetails = async () => {
  try {
    const response = await axios.get(URA_API_URL, {
      headers: {
        AccessKey: ACCESS_KEY,
        Token: TOKEN
      }
    });

    if (response.data.Status === 'Success') {
      return response.data.Result; 
    } else {
      throw new Error(`URA API Error: ${response.data.Message}`);
    }
  } catch (error) {
    console.error('Error fetching URA Car Park Details data:', error);
    throw error;
  }
};
