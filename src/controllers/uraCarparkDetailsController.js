import { fetchCarparkDetails } from '../services/uraCarparkDetailsService.js';

export const getCarparkDetails = async (req, res) => {
  try {
    const data = await fetchCarparkDetails();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URA carpark details data' });
  }
};
