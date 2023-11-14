import express from "express";
import { router as todoRoutes } from "./Todo/todoRoute.js";
import { router as userRoutes } from "./User/userRoute.js";
import { dbConnection } from "./dbConnection.js";
import cors from "cors"

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

await dbConnection();

const port = process.env.PORT;
app.use(todoRoutes);
app.use(userRoutes);
app.listen(port, async () => {
  await console.log("App listening on port " + port);
});
