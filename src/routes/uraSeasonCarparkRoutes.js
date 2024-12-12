import express from 'express';
import { getSeasonCarparkDetails } from '../controllers/uraSeasonCarparkController.js';

const router = express.Router();

router.get('/season-carpark-details', getSeasonCarparkDetails);

export default router;
