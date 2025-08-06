import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Owner from '../models/Owner';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const owner = await Owner.findById(decoded.id);
    if (!owner) return res.status(401).json({ error: 'Invalid token' });

    req.body.owner = owner;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
