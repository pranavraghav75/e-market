import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  campus: string;
}

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    console.error('Error in protect middleware:', err);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};