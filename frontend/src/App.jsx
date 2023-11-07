import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "./App.css";
import { todoValidation } from "../src/components/validations";

const addTodoForm = () => {
  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", date: "" }}
        validationSchema={todoValidation}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
          <Field name="date" type="date" />
          <ErrorMessage name="date" />
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default addTodoForm;
