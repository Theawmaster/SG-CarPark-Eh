import express from 'express';
import { getCarparkDetailsWithAvailability } from '../controllers/carparkDetailsController.js';

const router = express.Router();

// Route for fetching carpark details with availability
router.get('/carpark-info', getCarparkDetailsWithAvailability);


export default router;
