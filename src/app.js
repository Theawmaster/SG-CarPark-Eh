import express from 'express';
import cors from 'cors';
import uraAvailabilityRoutes from './routes/uraAvailabilityRoutes.js';
import uraCarpardetailsRoutes from './routes/uraCarparkDetailsRoutes.js';
import uraSeaonParkingRoutes from './routes/uraSeasonCarparkRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// URA availability endpoint under /api
app.use('/api', uraAvailabilityRoutes);

// URA carpark details endpoint under /api
app.use('/api', uraCarpardetailsRoutes);

// URA season parking endpoint under /api
app.use('/api', uraSeaonParkingRoutes);

export default app;
