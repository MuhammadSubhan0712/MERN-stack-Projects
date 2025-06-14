import React from 'react'
import { useQuery } from "@tanstack/react-query";
import api from "../api/index";

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get('/tasks/stats').then(res => res.data.data)
  });

  const { data: recentTasks, isLoading: tasksLoading } = useQuery({
        queryKey: ['recent-tasks'],
    queryFn: () => api.get('/tasks?limit=5&sort=-createdAt').then(res => res.data.data)
  })
  
  if (statsLoading || tasksLoading) return <div> Loading Dashboard... </div>


  return (
    <>
    
    </>
  )
}

export default Dashboard