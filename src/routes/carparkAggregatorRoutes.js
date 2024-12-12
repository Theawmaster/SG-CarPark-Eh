import express from 'express';
import { getAggregatedCarparkData } from '../controllers/carparkAggregatorController.js';

const router = express.Router();

// GET /api/aggregated-carparks
router.get('/aggregated-carparks', getAggregatedCarparkData);

export default router;
