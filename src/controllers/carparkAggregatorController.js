import { fetchAggregatedCarparkData } from '../services/carparkAggregatorService.js';

export const getAggregatedCarparkData = async (req, res) => {
  try {
    const data = await fetchAggregatedCarparkData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error aggregating carpark data:', error);
    res.status(500).json({ error: 'Failed to retrieve aggregated carpark data' });
  }
};
