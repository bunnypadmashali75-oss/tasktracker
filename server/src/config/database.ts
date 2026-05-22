import mongoose from 'mongoose';
import { appConfig } from './appConfig';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(appConfig.mongoUri, {
    autoIndex: true,
  });
  console.log('MongoDB connected');
};
