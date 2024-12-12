import axios from 'axios';
import 'dotenv/config';

const URA_API_URL = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Season_Car_Park_Details';
const ACCESS_KEY = process.env.URA_ACCESS_KEY;
const TOKEN = process.env.URA_TOKEN;

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
