import express from "express";
import { loginUser, registerUser } from "./userService.js";
import { isUser } from "../auth/authMiddleware.js";
import { Todo } from "../Todo/todoModel.js";

export const router = express.Router();
//register
router.post("/api/user/register", registerUser);
//login
router.post("/api/user/login", loginUser);

//delete
router.post("/api/user/delete", isUser, async (req, res) => {
  const user = req.loggedInUser;
  await Todo.deleteMany({ user: user._id });
  await user.deleteOne({ _id: user._id });
  return res
    .status(200)
    .send({ message: "Your account has been permanently deleted!" });
});
