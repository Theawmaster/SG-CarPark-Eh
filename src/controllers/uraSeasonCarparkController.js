import { fetchSeasonCarparkDetails } from '../services/uraSeasonCarparkService.js';

export const getSeasonCarparkDetails = async (req, res) => {
  try {
    const data = await fetchSeasonCarparkDetails();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URA season carpark details data' });
  }
};
