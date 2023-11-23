import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../api/axios";

const DeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete, isLoading } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (todoId) => {
      try {
        // Remove await since the result is not used
       await $axios.delete(`/api/delete/${todoId}`);
      } catch (error) {
        // Handle errors, e.g., display an error message
        console.error("Error deleting todo:", error);
        throw error; // Re-throw the error to let React Query handle it
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const handleDelete = async (todoId) => {
    try {
      // Trigger the delete mutation
      await mutateDelete(todoId);
    } catch (error) {
      console.log("Error handling delete:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return {
    handleDelete,
    isLoading
  };
};

export default DeleteTodo;
