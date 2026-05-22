import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { UserModel } from '../models/User';
import { signToken } from '../utils/jwt';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email is already registered');
    }
    const user = await UserModel.create({ name, email, password, role });
    const token = signToken(user._id.toString());
    res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createHttpError(401, 'Invalid credentials');
    }
    const token = signToken(user._id.toString());
    res.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token } });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, 'Not authorized');
    }
    res.json({ success: true, data: { user: req.user } });
  } catch (error) {
    next(error);
  }
};
