import * as Yup from "yup";

export const registerValidation = Yup.object({
  username: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must be 2 - 25 characters")
    .trim()
    .required("Username is required!"),

  email: Yup.string()
    .email("Invalid email address!")
    .trim()
    .required("Email is required!")
    .lowercase()
    .matches(/^\S+@\S+\.\S+$/, "Invalid email format!"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(16, "Password must be 8 - 16 characters!")
    .trim()
    .required("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number, and special character!"
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match !')
    .required('Confirm Password is required !'),
  
});

export const loginValidation = Yup.object({
  username: Yup.string().trim().required("Required"),
  password: Yup.string().trim().required("Required"),
});

export const todoValidation = Yup.object({
  title: Yup.string()
    .max(15, "Must be 15 characters or less")
    .min(2, "Must be at least 2 characters")
    .required("Required"),
  description: Yup.string()
    .max(125, "Must be 125 characters or less")
    .min(5, "Must be at least 5 characters")
    .required("Required"),
  date: Yup.date().required("Required").min(new Date(), "Invalid! Date cannot be past!"),
  isCompleted: Yup.boolean().required("Required"),
});
