import jwt from 'jsonwebtoken';
import { appConfig } from '../config/appConfig';

export const signToken = (userId: string) => {
  const options: jwt.SignOptions = { expiresIn: appConfig.jwtExpiresIn as jwt.SignOptions['expiresIn'] };
  return jwt.sign({ userId }, appConfig.jwtSecret as jwt.Secret, options);
};
