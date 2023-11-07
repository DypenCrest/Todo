import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: "string", min: 2, max: 25, trim: true, required: true },
  email: { type: "string", trim: true, required: true },
  password: { type: "string", min: 8, max: 16, trim: true, required: true },
});

export const User = mongoose.model("User", userSchema);
