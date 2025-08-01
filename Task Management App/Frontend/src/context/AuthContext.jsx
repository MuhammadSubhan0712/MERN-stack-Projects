import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check auth status initial load:
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.data);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const loginMutation = useMutation({
    mutationFn: (credentials) => api.post("/auth/login", credentials),
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem("token", data.data.token);
      queryClient.invalidateQueries();
      navigate("/dashboard");
      toast({ title: "Login successful" });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  onSuccess: (data) => {
    setUser(data.data.user);
    localStorage.setItem('token', data.data.token);
    queryClient.invalidateQueries();
    navigate("/");
    toast.success("Login successful");
  }

  const signupMutation = useMutation({
    mutationFn: (userData) => api.post("/auth/signup", userData),
    onSuccess: () => {
      toast({ title: "Account created successfully" });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      localStorage.removeItem("token");
      queryClient.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          login: loginMutation.mutate,
          isLoggingIn: loginMutation.isPending,
          signup: signupMutation.mutate,
          isSigningUp: signupMutation.isPending,
          logout,
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);


