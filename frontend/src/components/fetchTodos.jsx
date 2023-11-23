import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { $axios } from "../api/axios";
import { toggleCheckbox } from "../redux/slices/todoSlice";

const Todos = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Fetch data using React Query
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await $axios.get("/api/ToDos"),
  });

  // Extract todoList from the fetched data
  const todoList = data?.data?.todos;
  // Handle checkbox toggle
  const handleCheckboxToggle = async (todoId) => {
    try {
      const todoToUpdate = todoList.find((todo) => todo._id === todoId);

      if (!todoToUpdate) {
        console.error("Todo not found in the todoList");
        return;
      }

      // Dispatch action to update the state
      dispatch(toggleCheckbox(todoId));
      // Make the API call asynchronously without waiting for it to complete
      $axios.put(`/api/edit/${todoId}`, {
        isCompleted: !todoToUpdate.isCompleted,
      });

      // Update the cache immediately
      queryClient.setQueryData(["todos"], (prevData) => {
        // Update the specific todo in the cached data
        const updatedData = {
          data: {
            todos: prevData.data.todos.map((todo) =>
              todo._id === todoId
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo
            ),
          },
        };
        return updatedData;
      });
    } catch (err) {
      console.log("Error updating isCompleted in the database:", err);
    }
  };

  const remainingTodos = todoList?.filter((todo) => !todo.isCompleted);
  const completedTodos = todoList?.filter((todo) => todo.isCompleted);

  return {
    isLoading,
    todoList,
    handleCheckboxToggle,
    remainingTodos,
    completedTodos,
  };
};

export default Todos;
