/**
 * Express router for aggregated carpark data.
 * This router handles API endpoints related to aggregated carpark data.
 *
 * @module routes/aggregatedCarparkRoutes
 * @requires express
 * @requires ../controllers/carparkAggregatorController
 */

import express from 'express';
import { getAggregatedCarparkData } from '../controllers/carparkAggregatorController.js';

const router = express.Router();

/**
 * Route to fetch aggregated carpark data.
 *
 * @name GET /api/aggregated-carparks
 * @function
 * @memberof module:routes/aggregatedCarparkRoutes
 * @param {string} path - Express route path.
 * @param {function} getAggregatedCarparkData - Controller to handle the request.
 * 
 * @example
 * // Example API request:
 * // GET /api/aggregated-carparks?vehicleType=car&query=central&limit=5&page=1
 *
 * @returns {Object} Response object containing aggregated carpark data or an error message.
 * @throws {500} If an error occurs in fetching the carpark data.
 */

// GET /api/aggregated-carparks
router.get('/aggregated-carparks', getAggregatedCarparkData);

export default router;
