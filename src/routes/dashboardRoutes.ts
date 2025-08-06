import express from 'express';
import { roomsPerFloor } from '../controllers/dashboardController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/rooms-per-floor', protect, roomsPerFloor);

export default router;
