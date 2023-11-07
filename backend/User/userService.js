import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginSchema, validateRegisterSchema } from "./userValidate.js";
import { User } from "./userModel.js";

export const registerUser = async (req, res) => {
  const newUser = req.body;

  try {
    // use validateRegisterSchema on the new user object
    await validateRegisterSchema.validateAsync(newUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  //Check if the username or email is already registered
  const user = await User.findOne({
    $or: [{ email: newUser.email }, { username: newUser.username }],
  });

  if (user) {
    return res.status(409).send({ message: "User already exists!" });
  }

  //hash the new user password and update
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;

  //create new user
  await User.create(newUser);
  return res.status(201).send({ message: "User registered successfully." });
};

export const loginUser = async (req, res) => {
  const loginCredentials = req.body;

  //validate loginCredentials
  try {
    await validateLoginSchema.validateAsync(loginCredentials);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  const user = await User.findOne({ username: loginCredentials.username });

  if (!user) {
    return res.status(404).send({ message: "Invalid Credentials!" });
  }

  const validPassword = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );
  if (!validPassword) {
    return res.status(404).send({ message: "Invalid Credentials!" });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    }
  );

  user.password = undefined;

  return res.status(200).json({ message:"Login Successful!", user, token });
};
