import express from 'express';
import { getAllBuildings } from '../controllers/buildingController';

const router = express.Router();

router.get('/', getAllBuildings);

export default router;
