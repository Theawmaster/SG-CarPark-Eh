/**
 * Express router for carpark-related API endpoints.
 * This router handles requests related to nearby carparks and detailed carpark information.
 *
 * @module routes/carparkRoutes
 * @requires express
 * @requires ../controllers/carparkController
 * @requires ../controllers/carparkDetailsController
 */

import express from "express";
import { getNearbyCarparks} from "../controllers/carparkController.js";
import { getCarparkDetailsWithAvailability } from '../controllers/carparkDetailsController.js';

const router = express.Router();
const BASE_URL = 'https://sg-carpark-eh.onrender.com';

/**
 * GET /api/carparks
 * Fetches nearby carparks based on user coordinates, radius, and vehicle type.
 *
 * @example
 * // Request:
 * // GET /api/carparks?latitude=1.3521&longitude=103.8198&radius=5&vehicleType=car
 * @returns {Object} Nearby carparks or an error message.
 */

// Endpoint for nearby carparks
router.get(`/carparks`, getNearbyCarparks);

/**
 * GET /api/carpark-info
 * Fetches carpark details with availability for a specific carpark and vehicle type.
 *
 * @example
 * // Request:
 * // GET /api/carpark-info?carparkName=Central Mall&vehicleType=car
 * @returns {Object} Carpark details with availability or an error message.
 */

// Endpoint for carpark details
router.get(`/carpark-info`, getCarparkDetailsWithAvailability);

export default router;
