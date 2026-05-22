import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const appConfig = {
  port: Number(process.env.SERVER_PORT) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/taskapp',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  clientUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
