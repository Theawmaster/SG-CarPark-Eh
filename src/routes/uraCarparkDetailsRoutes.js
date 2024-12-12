import express from 'express';
import { getCarparkDetails } from '../controllers/uraCarparkDetailsController.js';

const router = express.Router();

router.get('/carpark-details', getCarparkDetails);

export default router;
