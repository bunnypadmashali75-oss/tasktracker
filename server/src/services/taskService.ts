import { TaskModel, ITask } from '../models/Task';
import { Types } from 'mongoose';

interface TaskQuery {
  status?: string;
  priority?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const createTask = async (taskData: Partial<ITask>) => {
  return TaskModel.create(taskData);
};

export const getTaskById = async (id: string) => {
  return TaskModel.findById(id).populate('createdBy assignedTo', 'name email avatar role');
};

export const updateTask = async (id: string, updates: Partial<ITask>) => {
  return TaskModel.findByIdAndUpdate(id, updates, { new: true }).populate('createdBy assignedTo', 'name email avatar role');
};

export const deleteTask = async (id: string) => {
  return TaskModel.findByIdAndDelete(id);
};

export const getTasks = async (userId: string, query: TaskQuery) => {
  const page = query.page ?? 1;
  const limit = query.limit ?? 12;
  const filters: Record<string, any> = { createdBy: userId };
  if (query.status) filters.status = query.status;
  if (query.priority) filters.priority = query.priority;
  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { tags: { $regex: query.search, $options: 'i' } },
    ];
  }

  const tasks = await TaskModel.find(filters)
    .sort({ updatedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('createdBy assignedTo', 'name email avatar');

  const total = await TaskModel.countDocuments(filters);
  return { tasks, total, page, limit };
};
