import mongoose from "mongoose";
import { Todo } from "./todoModel.js";
import { validateTodoSchema } from "./todoValidation.js";
//Add
export const addTodo = async (req, res) => {
  const newTodo = req.body;
  try {
    await validateTodoSchema.validateAsync(newTodo);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  newTodo.userId = req.loggedInUser._id;
  await Todo.create(newTodo);
  console.log(newTodo);
  return res.status(201).send({ message: "Todo added successfully!" });
};

//Get
export const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.loggedInUser._id });
    console.log(todos);
    return res.status(200).send({ todos });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

//Details
export const todoDetails = async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findById(todoId);
  return res.status(200).send({ todo });
};

//Edit
export const editTodo = async (req, res) => {
  const todoId = req.params.id;
  console.log("User ID:", req.loggedInUser._id);
  console.log("Todo ID:", todoId);
  const newValues = req.body;
  const todo = await Todo.findOne({ _id: todoId });
  // check for Todo ownership
  const isOwnerOfTodo = todo.userId === req.loggedInUser._id.toString();
  // Log the result of the ownership check
  console.log("Is Owner of Todo:", isOwnerOfTodo);
  console.log("Todo User ID:", todo.userId);
  // if no match, not allowed
  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: "You are not owner of this todo." });
  }
  // Check MongoId
  const isValidMongoId = mongoose.Types.ObjectId.isValid(todoId);
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  //Validate todo with joiSchema
  try {
    await validateTodoSchema.validateAsync(newValues);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  if (!todo) {
    return res.status(400).send({ message: "Todo doesn't exists!" });
  }
  await Todo.updateOne({ _id: todoId }, newValues);
  return res.status(200).send({ message: "Todo updated successfully!" });
};

//Delete
export const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findOne({ _id: todoId });
  // check for Todo ownership
  const isOwnerOfTodo = todo && todo.userId === req.loggedInUser._id.toString();
  // if no match, not allowed
  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: "You are not owner of this todo." });
  }
  //Check MongoID
  const isValidMongoId = mongoose.Types.ObjectId.isValid(todoId);
  if (!isValidMongoId) {
    return res.status(400).send({ message: "invalid mongo id." });
  }
  if (!todo) {
    return res.status(404).send({ message: "todo doesn't exists!" });
  }
  await Todo.deleteOne({ _id: todoId });
  return res.status(200).send({ message: "Todo Deleted!" });
};
