import express from "express";
import { Todo } from "./todoModel.js";
import { validateTodoSchema } from "./todoValidation.js";
import { isUser } from "../auth/authMiddleware.js";
import mongoose from "mongoose";

export const router = express.Router();

//Add new Todo
router.post("/api/new-todo", isUser, async (req, res) => {
  const newTodo = req.body;
  console.log(newTodo);

  try {
    await validateTodoSchema.validateAsync(newTodo);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  newTodo.userId = req.loggedInUser._id;
  await Todo.create(newTodo);
  return res.status(201).send({ message: "Todo added successfully!" });
});

//Get all Todo
router.post("/api/ToDos", isUser, async (req, res) => {
  let match = {};
  const todos = await Todo.aggregate([
    {
      $match: match,
    },
    { $sort: { date: 1 } },
    {
      $project: {
        title: 1,
        description: 1,
        date: 1,
        isCompleted: 1,
      },
    },
  ]);
  return res.status(200).send({ todos });
});

//Edit Todo
router.put("/api/edit/:id", isUser, async (req, res) => {
  const todoId = req.params.id;
  const newValues = req.body;

  const isValidMongoId = mongoose.Types.ObjectId.isValid(todoId);

  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  try {
    await validateTodoSchema.validateAsync(newValues);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
  const todo = await Todo.findOne({ _id: todoId });

  if (!todo) {
    return res.status(400).send({ message: "Todo doesnt exists!" });
  }
  await Todo.updateOne({ _id: todoId }, newValues);
  return res.status(200).send({ message: "Todo updated successfully!" });
});

//delete Todo
router.delete("/api/delete/:id", isUser, async (req, res) => {
  const todoId = req.params.id;

  const isValidMongoId = mongoose.Types.ObjectId.isValid(todoId);
  if (!isValidMongoId) {
    return res.status(400).send({ message: "invalid mongo id." });
  }
  const todo = await Todo.findOne({ _id: todoId });
  if (!todo) {
    return res.status(404).send({ message: "todo doesn't exists!" });
  }
  await Todo.deleteOne({ _id: todoId });
  return res.status(200).send({ message: "Todo Deleted!" });
});
