import * as Yup from "yup";

export const registerValidation = Yup.object({
  username: Yup.string()
    .min(2, "must be 2-25 characters.")
    .max(25, "must be 2-25 characters.")
    .trim()
    .required("Required"),
  email: Yup.string().trim().required("Required"),
  password: Yup.string().trim().required("Required"),
});

export const loginValidation = Yup.object({
  username: Yup.string().trim().required("Required"),
  password: Yup.string().trim().required("Required"),
});

export const todoValidation = Yup.object({
  title: Yup.string()
    .max(15, "Must be 15 characters or less")
    .min(2, "Must be atleast 2 characters")
    .required("Required"),
  description: Yup.string()
    .max(30, "Must be 30 characters or less")
    .min(5, "Must be atleast 5 characters")
    .required("Required"),
  date: Yup.date().required("Required"),
  isCompleted: Yup.boolean().required("Required"),
});
