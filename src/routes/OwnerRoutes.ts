import express from 'express';
import { updateRoomAvailability } from '../controllers/OwnerController';
import { protect } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/room/update', protect, updateRoomAvailability);

export default router;
