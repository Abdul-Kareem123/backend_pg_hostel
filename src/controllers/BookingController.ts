import Booking from '../models/Booking';
import { Request, Response } from 'express';
import { bookingSchema } from '../utils/validators';



export const createBooking = async (req: Request, res: Response) => {
   const parsed = bookingSchema.safeParse(req.body);
   if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
   }

  const { customerName, customerEmail, room, startDate, endDate } = req.body;

  try {
    const overlappingBooking = await Booking.findOne({
      room,
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) }
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: 'Room is already booked for those dates' });
    }

    const booking = new Booking({
      customerName,
      customerEmail,
      room,
      startDate,
      endDate
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
};
