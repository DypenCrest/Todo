import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [] },
  reducers: {

    toggleCheckbox: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos.find((todo) => todo._id === todoId);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
  },
});

export const { toggleCheckbox } = todoSlice.actions;
export default todoSlice.reducer;
