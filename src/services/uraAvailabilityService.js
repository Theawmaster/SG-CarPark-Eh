import axios from 'axios';
import 'dotenv/config';

const URA_API_URL = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability';
const ACCESS_KEY = process.env.URA_ACCESS_KEY;
const TOKEN = process.env.URA_TOKEN;

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
