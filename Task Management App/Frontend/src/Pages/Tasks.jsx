import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";
import api from "../api";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Tasks = () => {
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => api.get("/tasks").then((res) => res.data.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast({ title: "Task deleted successfully" });
    },
    onError: (error) => {
      toast({
        title: "Error deleting task",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button onClick={() => setIsCreating(true)}>Create Task</Button>
        </div>

        {isCreating && (
          <div className="mb-8">
            <TaskForm
              onSuccess={() => {
                setIsCreating(false);
                queryClient.invalidateQueries(["tasks"]);
              }}
              onCancel={() => setIsCreating(false)}
            />
          </div>
        )}

        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default Tasks;
