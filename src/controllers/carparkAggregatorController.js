import { fetchAggregatedCarparkData } from '../services/carparkAggregatorService.js';

export const getAggregatedCarparkData = async (req, res) => {
  const { vehicleType, query, limit = 10, page = 1 } = req.query;

  try {
    const data = await fetchAggregatedCarparkData(vehicleType, query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error aggregating carpark data:', error);
    res.status(500).json({ error: 'Failed to retrieve aggregated carpark data' });
  }
};
