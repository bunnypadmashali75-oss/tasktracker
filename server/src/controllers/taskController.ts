import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../services/taskService';
import { createNotification } from '../services/notificationService';

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id.toString();
    const { page, limit, status, priority, search } = req.query;
    const result = await getTasks(userId, {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 12,
      status: status as string,
      priority: priority as string,
      search: search as string,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const createNewTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await createTask({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      dueDate: req.body.dueDate,
      tags: req.body.tags,
      createdBy: req.user?._id,
      assignedTo: req.body.assignedTo || req.user?._id,
    });
    await createNotification(req.user?._id, `Task created: ${task.title}`, { type: 'task_created', taskId: task._id });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateExistingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await updateTask(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      dueDate: req.body.dueDate,
      tags: req.body.tags,
      assignedTo: req.body.assignedTo,
    });
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }
    await createNotification(req.user?._id, `Task updated: ${task.title}`, { type: 'task_updated', taskId: task._id });
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const removeTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await deleteTask(req.params.id);
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }
    await createNotification(req.user?._id, `Task deleted: ${task.title}`, { type: 'task_deleted', taskId: task._id });
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
