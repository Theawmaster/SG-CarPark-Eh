/**
 * Express router for URA season carpark details endpoint.
 * Handles requests to fetch details for season carparks.
 *
 * @module routes/uraSeasonCarparkRoutes
 */

import express from 'express';
import { getSeasonCarparkDetails } from '../controllers/uraSeasonCarparkController.js';

const router = express.Router();

/**
 * GET /api/season-carpark-details
 * Fetches detailed information about season carparks from the URA service.
 *
 * @example
 * // Request:
 * // GET /api/season-carpark-details
 * @returns {Object} Season carpark details or an error message.
 */

router.get('/season-carpark-details', getSeasonCarparkDetails);

export default router;
