/**
 * Express router for URA carpark availability endpoint.
 * Handles requests to fetch real-time carpark availability data.
 *
 * @module routes/uraAvailabilityRoutes
 */

import express from 'express';
import { getCarparkAvailability } from '../controllers/uraAvailabilityController.js';

const router = express.Router();

/**
 * GET /api/carpark-availability
 * Fetches real-time availability data for carparks.
 *
 * @example
 * // Request:
 * // GET /api/carpark-availability
 * @returns {Object} Real-time carpark availability data or an error message.
 */

router.get('/carpark-availability', getCarparkAvailability);

export default router;

 