import express from 'express';
import cors from 'cors';
import uraAvailabilityRoutes from './routes/uraAvailabilityRoutes.js';
import uraCarpardetailsRoutes from './routes/uraCarparkDetailsRoutes.js';
import uraSeaonParkingRoutes from './routes/uraSeasonCarparkRoutes.js';
import carparkAggregatorRoutes from './routes/carparkAggregatorRoutes.js';
import carparkRoutes from './routes/carparkRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

/**
 * Main Express application setup.
 * Configures middleware and routes for the carpark-related API endpoints.
 *
 * @module app
 */

// URA availability endpoint under /api
/**
 * URA carpark availability routes.
 * Handles routes related to carpark availability.
 * @name /api/carpark-availability
 * @memberof module:app
 */

app.use('/api', uraAvailabilityRoutes);


// URA carpark details endpoint under /api
/**
 * URA carpark details routes.
 * Handles routes related to carpark details.
 * @name /api/carpark-details
 * @memberof module:app
 */

app.use('/api', uraCarpardetailsRoutes);

// URA season parking endpoint under /api
/**
 * URA season parking routes.
 * Handles routes related to season parking carparks.
 * @name /api/season-carpark-details
 * @memberof module:app
 */

app.use('/api', uraSeaonParkingRoutes);

// Carpark aggregator endpoint under /api
/**
 * Carpark aggregator routes.
 * Handles routes to aggregate carpark data.
 * @name /api/aggregated-carparks
 * @memberof module:app
 */

app.use('/api', carparkAggregatorRoutes);

// Carpark routes under /api
/**
 * General carpark routes.
 * Handles routes for nearby carparks and carpark information.
 * @name /api/carparks
 * @name /api/carpark-info
 * @memberof module:app
 */

app.use('/api', carparkRoutes);

export default app;
