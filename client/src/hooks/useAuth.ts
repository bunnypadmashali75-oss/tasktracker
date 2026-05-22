import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const logout = useAuthStore((state) => state.logout);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false,
    enabled: Boolean(localStorage.getItem('taskapp_token')),
  });

  useEffect(() => {
    if (data?.data?.user && localStorage.getItem('taskapp_token')) {
      setCredentials(data.data.user, localStorage.getItem('taskapp_token') || '');
    }
    if (isError) {
      logout();
    }
  }, [data, isError, logout, setCredentials]);

  return { data, isLoading, isError };
};
