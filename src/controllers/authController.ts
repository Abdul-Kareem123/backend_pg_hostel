import Owner from '../models/Owner';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export const registerOwner = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;

  try {
    const existing = await Owner.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const owner = await Owner.create({ name, email, phone, password });
    const token = generateToken(owner._id.toString());

    res.status(201).json({ token, owner });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginOwner = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const owner = await Owner.findOne({ email }).exec();
    if (!owner) {
    return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await owner.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("=========", owner._id);
    const token = generateToken(owner._id.toString());
    res.status(200).json({ token, owner });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
