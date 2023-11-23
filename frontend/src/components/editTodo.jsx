import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { $axios } from "../api/axios";
import Todos from "./fetchTodos";
import { todoValidation } from "./validations";

const EditTodoForm = ({ todo }) => {
  //EditForm
  const [openForm, setOpenForm] = useState(false);
  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const { remainingTodos } = Todos();
  console.log(remainingTodos);
  const queryClient = useQueryClient();
  const { mutate: updateMutation } = useMutation({
    mutationKey: ["edit-todo"],
    mutationFn: async (values) => {
      const { _id: todoId } = todo;
      await $axios.put(`/api/edit/${todoId}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  const initialValues = {
    title: todo?.title,
    description: todo?.description,
    date: todo?.date && dayjs(todo.date).format("YYYY-MM-DDTHH:mm"),
    isCompleted: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={todoValidation}
      onSubmit={async (values) => {
        console.log("Form values:", values);
        await updateMutation(values);
        // Close the dialog
        handleClose();
      }}
    >
      <>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClickOpen}
        >
          Edit
        </Button>
        <Dialog open={openForm} onClose={handleClose}>
          <Form>
            <DialogTitle color={"grey"} fontWeight={600} fontSize={30}>EDIT {todo.title}</DialogTitle>
            <DialogContent >
              <DialogContentText color={"orange"}>
                Warning! you are editing the details of {todo.title}.
              </DialogContentText>
              <Field
                margin="dense"
                label="Title"
                name="title"
                type="text"
                as={TextField}
                variant="standard"
                required
                fullWidth
              />
              <div className="field-error">
                <ErrorMessage name="title" />
              </div>

              <Field
                margin="dense"
                variant="outlined"
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
                margin="dense"
                variant="standard"
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
            </DialogContent>
            <DialogActions>
              <Button size="small" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button size="small" color="success" type="submit">
                Save
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      </>
    </Formik>
  );
};

export default EditTodoForm;
