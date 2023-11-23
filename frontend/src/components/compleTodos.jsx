import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteTodo from "./deleteTodo";
import Todos from "./fetchTodos";
import dayjs from "dayjs";

const CompletedTodos = () => {
  const { isLoading, completedTodos, handleCheckboxToggle } = Todos(); // Call Todos function to get the object
  const { handleDelete } = DeleteTodo();
  console.log(completedTodos);
  let counter = 0;
  return (
    <Grid container>
      {completedTodos && completedTodos.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          {completedTodos?.map((todo) => (
            <List
              key={todo._id}
              sx={{
                mb: "5px",
                width: "50%",
                boxShadow:
                  " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(216, 242, 156) 0px 0px 0px 3px",
              }}
            >
              <ListItem
                secondaryAction={
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={() => handleDelete(todo._id)}
                  >
                    <DeleteIcon />
                  </Button>
                }
              >
                <Checkbox
                  id="check"
                  size="large"
                  color="success"
                  edge="start"
                  checked={todo.isCompleted}
                  tabIndex={-1}
                  onChange={() => handleCheckboxToggle(todo._id)}
                />

                <ListItemButton
                  sx={{
                    mr: "3rem",
                    boxShadow:
                      "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(165, 229, 123, 0.9) 0px 0px 0px 1px",
                  }}
                  onClick={() => handleCheckboxToggle(todo._id)}
                >
                  <ListItemText
                    primary={
                      <Typography>
                        {`${++counter}. `}
                        <span className="completed">{todo.title}</span>
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ))}
        </Box>
      ) : (
        <Typography variant="h5" color={"grey"}>
          Completed todos not found !
        </Typography>
      )}
    </Grid>
  );
};

export default CompletedTodos;
