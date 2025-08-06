import express from 'express';
import { checkAvailability, getAllAvailableRooms } from '../controllers/roomController';

const router = express.Router();

router.get('/availability', checkAvailability);
router.get('/allAvailableRooms', getAllAvailableRooms);
export default router;
