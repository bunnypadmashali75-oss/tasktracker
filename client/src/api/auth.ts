import axiosClient from './axiosClient';

export type AuthPayload = {
  name?: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
};

export const registerUser = async (payload: AuthPayload) => {
  const response = await axiosClient.post('/auth/register', payload);
  return response.data;
};

export const loginUser = async (payload: AuthPayload) => {
  const response = await axiosClient.post('/auth/login', payload);
  return response.data;
};

export const fetchMe = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};
