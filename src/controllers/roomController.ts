import Room from '../models/rooms';
import Booking from '../models/Booking';
import { Request, Response } from 'express';
import building from '../models/Building';

export const checkAvailability = async (req: Request, res: Response) => {
  const { roomId, startDate, endDate } = req.query;
  
  try {
    const overlappingBooking = await Booking.findOne({
      room: roomId,
      startDate: { $lt: new Date(endDate as string) },
      endDate: { $gt: new Date(startDate as string) }
    });
    const check = new Date(endDate as string);

    if (overlappingBooking) {
      return res.status(200).json({ available: false });
    }

    res.status(200).json({ available: true });
  } catch (error) {
    res.status(500).json({ error: 'Error checking availability' });
  }
};


export const getAllAvailableRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'floor',
        populate: {
          path: 'building',
          select: 'name address'
        }
      });
    const formatted = rooms.map(room => ({
      id: room._id,
      number: room.number,
      sharingType: room.sharingType,
      rent: room.rent,
      floor: (room.floor as any)?.number,
      building: (room.floor as any)?.building?.name,
      address: (room.floor as any)?.building?.address
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Error fetching available rooms' });
  }
};

