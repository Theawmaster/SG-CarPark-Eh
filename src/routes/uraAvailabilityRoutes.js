import express from 'express';
import { getCarparkAvailability } from '../controllers/uraAvailabilityController.js';

const router = express.Router();

router.get('/carpark-availability', getCarparkAvailability);

export default router;

 