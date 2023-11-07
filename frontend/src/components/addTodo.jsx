import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { todoValidation } from "./validations";

export const addTodoForm = () => {
  return (
    <Formik
      initialValues={{ title: "", description: "", date: "" }}
      validationSchema={todoValidation}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" />

        <label htmlFor="description">Description</label>
        <Field
          className="form-textarea"
          as="textarea"
          name="description"
          type="text"
        />
        <ErrorMessage name="description" />

        <label htmlFor="date">Date</label>
        <Field name="date" type="date" />
        <ErrorMessage name="date" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
