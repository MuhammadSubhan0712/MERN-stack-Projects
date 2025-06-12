import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusVariant = {
  todo: "secondary",
  "in-progress": "default",
  done: "success",
  backlog: "outline",
  archived: "destructive",
};

const priorityVariant = {
  low: "secondary",
  medium: "default",
  high: "destructive",
  critical: "destructive",
};

const TaskList = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => api.get("/tasks").then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Manage your team's tasks</CardDescription>
            </div>

            <Button>New Task</Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell className="font-medium">{task.title}</TableCell>

                  <TableCell>
                    <Badge variant={statusVariant[task.status]}>
                      {task.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant={priorityVariant[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell>
                    {task.assignedTo?.map((user) => user.name).join(", ") ||
                      "-"}
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default TaskList;
