import Building from '../models/Building';
import { Request, Response } from 'express';

export const getAllBuildings = async (req: Request, res: Response) => {
  try {
    const buildings = await Building.find().populate('owner', 'name email');
    res.status(200).json(buildings);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    res.status(500).json({ error: 'Error fetching buildings' });
  }
};
