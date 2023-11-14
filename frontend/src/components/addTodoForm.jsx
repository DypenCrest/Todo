import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { todoValidation } from "./validations.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../api/axios.js";

const AddTodoForm = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (values) => await $axios.post("/api/new-todo", values),
    onSuccess: (res) => {
      console.log(res?.data?.message);
      queryClient.invalidateQueries(["addTodo"]);
    },
    onError: (err) => {
      alert(err?.response?.data?.message);
    },
  });
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          date: "",
          isCompleted: false,
        }}
        validationSchema={todoValidation}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          await mutate(values);
          resetForm();
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" />
          <br></br>

          <label htmlFor="description">Description</label>
          <Field
            className="form-textarea"
            as="textarea"
            name="description"
            type="text"
          />
          <ErrorMessage name="description" />
          <br></br>
          <label htmlFor="date">Date</label>
          <Field name="date" type="datetime-local" />
          <ErrorMessage name="date" />
          <br></br>
          <Field type="hidden" name="isComplete" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTodoForm;
