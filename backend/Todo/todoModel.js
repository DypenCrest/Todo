import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: {type: 'string'},
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,  
},
  isCompleted: {
    type: Boolean,
    default: false,

  },
});

export const Todo = mongoose.model("Todo", todoSchema);
