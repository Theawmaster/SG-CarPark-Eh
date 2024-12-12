import { fetchCarparkAvailability } from '../services/uraAvailabilityService.js';

export const getCarparkAvailability = async (req, res) => {
  try {
    const data = await fetchCarparkAvailability();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URA carpark availability data' });
  }
};
