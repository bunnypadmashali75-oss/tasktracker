import axiosClient from './axiosClient';

export type TaskPayload = {
  title: string;
  description?: string;
  status?: 'Todo' | 'In Progress' | 'Completed';
  priority?: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  tags?: string[];
  assignedTo?: string;
};

export const getTasks = async (params?: Record<string, any>) => {
  const response = await axiosClient.get('/tasks', { params });
  return response.data;
};

export const getTask = async (id: string) => {
  const response = await axiosClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (payload: TaskPayload) => {
  const response = await axiosClient.post('/tasks', payload);
  return response.data;
};

export const updateTask = async (id: string, payload: Partial<TaskPayload>) => {
  const response = await axiosClient.put(`/tasks/${id}`, payload);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosClient.delete(`/tasks/${id}`);
  return response.data;
};
