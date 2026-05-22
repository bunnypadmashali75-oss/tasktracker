import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

interface AuthState {
  user: User | null;
  token: string | null;
  setCredentials: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setCredentials: (user, token) => {
    localStorage.setItem('taskapp_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('taskapp_token');
    set({ user: null, token: null });
  },
}));
