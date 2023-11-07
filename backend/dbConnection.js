import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection established.");
  } catch (err) {
    console.log("database connection error!");
    console.log(err.message);
  }
};
