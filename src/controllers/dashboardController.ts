import Floor from '../models/Floors';
import Room from '../models/rooms';
import { Request, Response } from 'express';

export const roomsPerFloor = async (req: Request, res: Response) => {
  try {
    const floors = await Floor.find().populate('rooms');
    const data = floors.map(floor => ({
      floorNumber: floor.number,
      totalRooms: floor.rooms.length,
      availableRooms: floor.rooms.filter((r: any) => r.isAvailable).length
    }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
};
