import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todoSlice"

const store = configureStore({
    reducer: todosReducer
});

export default store
