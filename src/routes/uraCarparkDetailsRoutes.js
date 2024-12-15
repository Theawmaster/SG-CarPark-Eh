/**
 * Express router for URA carpark details endpoint.
 * Handles requests to fetch detailed carpark information.
 *
 * @module routes/uraCarparkDetailsRoutes
 */

import express from 'express';
import { getCarparkDetails } from '../controllers/uraCarparkDetailsController.js';

const router = express.Router();
const BASE_URL = 'https://sg-carpark-eh.onrender.com';

/**
 * GET /api/carpark-details
 * Fetches detailed carpark information from the URA service.
 *
 * @example
 * // Request:
 * // GET /api/carpark-details
 * @returns {Object} Detailed carpark information or an error message.
 */

router.get(`/carpark-details`, getCarparkDetails);

export default router;
