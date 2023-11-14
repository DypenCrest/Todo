import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../api/axios";
import { useDispatch } from "react-redux";
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

  if (isLoading) {
    return <>Loading...</>;
  }

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

  //handling empty todo list
  if (!todoList || todoList.length === 0) {
    return (
      <>
        <h1>No todos added!</h1>
      </>
    );
  }

  const uncheckedTodos = todoList.filter((todo) => !todo.isCompleted);
  const checkedTodos = todoList.filter((todo) => todo.isCompleted);

  return (
    <div>
      <h1>ToDos</h1>

      <div>
        <h2>Remaining Todos</h2>
        {uncheckedTodos.length > 0 ? (
          <ol>
            {uncheckedTodos?.map((todo) => (
              <li key={todo._id}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted} // Use checked attribute to reflect the state
                  onChange={() => handleCheckboxToggle(todo._id)}
                />
                {todo.title}:<br />
                {todo.description}
                <br />
              </li>
            ))}
          </ol>
        ) : (
          <h3>Empty</h3>
        )}
      </div>

      <div>
        <h2>Completed Todos</h2>
        {checkedTodos.length > 0 ? (
          <ol>
            {checkedTodos?.map((todo) => (
              <li key={todo._id}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted} // Use checked attribute to reflect the state
                  onChange={() => handleCheckboxToggle(todo._id)}
                />
                <span className="completed">{todo.title}:</span>
                <br />
              </li>
            ))}
          </ol>
        ) : (
          <h3>Empty</h3>
        )}
      </div>
    </div>
  );
};

export default Todos;
