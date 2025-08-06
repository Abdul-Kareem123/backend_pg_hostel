import Room from '../models/rooms';
import { Request, Response } from 'express';

export const updateRoomAvailability = async (req: Request, res: Response) => {
  const { roomId, isAvailable } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.isAvailable = isAvailable;
    await room.save();

    res.status(200).json({ message: 'Room availability updated', room });
  } catch (error) {
    res.status(500).json({ error: 'Error updating room' });
  }
};
