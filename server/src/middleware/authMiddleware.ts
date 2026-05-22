import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { appConfig } from '../config/appConfig';

interface JwtPayload {
  userId: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, appConfig.jwtSecret) as JwtPayload;
    const user = await UserModel.findById(payload.userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid session' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (roles: Array<'admin' | 'user'>) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }
  next();
};
