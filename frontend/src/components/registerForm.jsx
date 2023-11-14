import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { $axios } from "../api/axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidation } from "./validations";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values) => {
      await $axios.post("/api/user/register", values);
    },
    onSuccess: () => navigate("/"),
    onError: (err) => console.log(err?.response?.data?.message)
  });

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={registerValidation}
        onSubmit={async (values) => {
          console.log(values);
          mutate(values);
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="username">username</label>
          <Field name="username" type="text" />
          <ErrorMessage name="username" />
          <br></br>

          <label htmlFor="email">email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
          <br></br>

          <label htmlFor="password">password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
