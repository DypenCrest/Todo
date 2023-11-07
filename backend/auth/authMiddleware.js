import { User } from "../User/userModel.js";
import jwt from "jsonwebtoken";

export const isUser = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 && splittedArray[1];

    if (!token) {
      throw new Error("Unauthorized");
    }
    const userData = jwt.verify(token, process.env.JWT_ACCESS_Token_SECRET_KEY);
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      throw new Error("Unauthorized");
    }
    req.loggedInUser = user;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
