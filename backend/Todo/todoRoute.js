import express from "express";
import { isUser } from "../auth/authMiddleware.js";
import {
  addTodo,
  allTodos,
  deleteTodo,
  editTodo,
  todoDetails,
} from "./todoService.js";

export const router = express.Router();

//Add new Todo
router.post("/api/new-todo", isUser, addTodo);

// Get all Todo
router.get("/api/todos", isUser, allTodos);

//Get todo details
router.get("/api/todo-details/:id", isUser, todoDetails);

//Edit Todo
router.put("/api/edit/:id", isUser, editTodo);

//delete Todo
router.delete("/api/delete/:id", isUser, deleteTodo);
