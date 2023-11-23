import ChecklistSharpIcon from "@mui/icons-material/ChecklistSharp";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { $axios } from "../api/axios.js";
import { useSnackbarUtils } from "../utils/snackbar.jsx";
import { todoValidation } from "./validations.jsx";

const AddTodoForm = () => {
  const { showSnackbar } = useSnackbarUtils();

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (values) => await $axios.post("/api/new-todo", values),
    onSuccess: (res) => {
      console.log(res?.data?.message);
      queryClient.invalidateQueries(["todos"]);
      showSnackbar("Todo added successfully!", "success");
    },
    onError: (err) => {
      showSnackbar(err?.response?.data?.message, "error");
      console.log(err);
    },
  });
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        date: new Date(), // Set the initial date to the current date and time
        isCompleted: false,
      }}
      validationSchema={todoValidation}
      onSubmit={async (values, { resetForm }) => {
        try {
          // Ensure values.date is a valid Date object
          const dateObject =
            values.date instanceof Date ? values.date : new Date();

          // Format the date
          const formattedDate = format(dateObject, "yyyy-MM-dd'T'HH:mm");

          const updatedValues = {
            ...values,
            date: formattedDate,
          };

          console.log(updatedValues);
          await mutate(updatedValues);
          resetForm();
        } catch (error) {
          console.error("Error processing date:", error);
        }
      }}
    >
      <Box
        sx={{
          m: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ChecklistSharpIcon />
        </Avatar>
        <Typography component="h1" variant="h5" marginBottom={2}>
          New ToDo
        </Typography>

        <Form className="custom-form" style={{ width: "100%" }}>
          <Field
            label="Title"
            name="title"
            type="text"
            as={TextField}
            required
            fullWidth
          />
          <div className="field-error">
            <ErrorMessage name="title" />
          </div>

          <Field
            label="Description"
            name="description"
            type="description"
            as={TextField}
            required
            fullWidth
            multiline  // Enable multiline
            rows={4}
          />
          <div className="field-error">
            <ErrorMessage name="description" />
          </div>

          <Field
            label="Date"
            name="date"
            type="datetime-local"
            as={TextField}
            required
            fullWidth
            focused
          />
          <div className="field-error">
            <ErrorMessage name="date" />
          </div>

          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Add
          </Button>

          <Button type="reset" color="warning" variant="contained" fullWidth>
            Reset
          </Button>
        </Form>
      </Box>
    </Formik>
  );
};

export default AddTodoForm;
