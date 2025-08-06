import express from 'express';
import { registerOwner, loginOwner } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerOwner);
router.post('/login', loginOwner);

export default router;
