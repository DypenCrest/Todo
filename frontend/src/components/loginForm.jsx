import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { $axios } from "../api/axios.js";
import { loginValidation } from "./validations.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => {
      return await $axios.post("/api/user/login", values);
    },
    onSuccess: (res) => {
      console.log(res?.data?.message);
      localStorage.setItem("username", res?.data?.user?.username);
      localStorage.setItem("email", res?.data?.user?.email);
      localStorage.setItem("accesstoken", res?.data?.token);
      navigate("/Home");
    },
    onError: (err) => {
      console.log(err?.response?.data?.message);
    },
  });
  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidation}
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

          <label htmlFor="password">password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
