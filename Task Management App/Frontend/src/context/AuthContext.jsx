import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from "@/components/ui/use-toast";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Check auth status initial load:
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/users/me');
        setUser(data.data);

      } catch (error) {
        setUser(null);
      }
    }
    checkAuth();
  }, []);

  const loginMutation = useMutation({
    mutationFn: (credentials) => api.post('/auth/login', credentials),
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem('token', data.data.token);
      queryClient.invalidateQueries();
      navigate('/dashboard');
      toast({ title: 'Login successful' });
    },
    onError: (error) => {
      toast({
         title: 'Login failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive'
      });
    }
  })
  
  return (
    <>
    </>
  )
}

export default AuthProvider