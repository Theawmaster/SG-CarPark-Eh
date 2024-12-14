import express from "express";
import { getNearbyCarparks} from "../controllers/carparkController.js";
import { getCarparkDetailsWithAvailability } from '../controllers/carparkDetailsController.js';

const router = express.Router();

// Endpoint for nearby carparks
router.get("/carparks", getNearbyCarparks);

// Endpoint for carpark details
router.get('/carpark-info', getCarparkDetailsWithAvailability);

export default router;
