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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
       {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTasks || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.inProgress || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completedToday || 0}</div>
          </CardContent>
        </Card>
      </div>

    </div>
    </>
  )
}

export default Dashboard