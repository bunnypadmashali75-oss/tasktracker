import { NotificationModel } from '../models/Notification';
import { Types } from 'mongoose';

export const createNotification = async (userId: Types.ObjectId, message: string, meta = {}) => {
  return NotificationModel.create({ user: userId, message, meta });
};
