import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../axios/utils";
import { toast } from "react-toastify";

//Fetch All tasks
export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { isLoading, data, isError };
};

//Create Task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (task) =>
      customFetch.post("/", {
        title: task,
      }),
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task Added");
    },
  });
  return { createTask, isLoading };
};

//Update Task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      customFetch.patch(`/${taskId}`, {
        isDone,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task Updated");
    },
  });
  return { editTask };
};

//Delete Task

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: (taskId) => {
      customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task Deleted");
    },
  });
  return { deleteTask, isLoading };
};
