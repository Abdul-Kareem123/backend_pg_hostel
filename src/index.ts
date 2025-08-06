import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/BookingRoutes';
import ownerRoutes from './routes/OwnerRoutes';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import buildingRoutes from './routes/buildingRoutes';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/rooms', roomRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/buildings', buildingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
