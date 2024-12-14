import axios from 'axios';
import 'dotenv/config';

const URA_API_URL = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Season_Car_Park_Details';
const ACCESS_KEY = process.env.URA_ACCESS_KEY;
const TOKEN = process.env.URA_TOKEN;

/**
 * Fetches season carpark details data from the URA API.
 *
 * @async
 * @function fetchSeasonCarparkDetails
 * @returns {Promise<Array>} A promise that resolves to an array of season carpark details if the API request is successful.
 * @throws {Error} If the API request fails or returns an unsuccessful status.
 *
 * @example
 * // Example usage:
 * fetchSeasonCarparkDetails()
 *   .then((data) => {
 *     console.log('Season Carpark Details:', data);
 *   })
 *   .catch((error) => {
 *     console.error('Error:', error);
 *   });
 *
 * @description
 * This function sends a GET request to the URA API to retrieve season carpark details.
 * The request includes authentication headers (`AccessKey` and `Token`) from environment variables.
 * If the API response status is 'Success', it returns the `Result` field, which contains an array of carpark details.
 * If the response indicates an error or an issue occurs during the request, the function throws an error.
 */

export const fetchSeasonCarparkDetails = async () => {
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
    console.error('Error fetching URA Season Car Park Details data:', error);
    throw error;
  }
};
