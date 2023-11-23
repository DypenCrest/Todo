import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteTodo from "./deleteTodo";
import EditTodoForm from "./editTodo";
import Todos from "./fetchTodos";
import dayjs from "dayjs";
import 'dayjs/locale/en'; // Import any additional locale if needed
import relativeTime from 'dayjs/plugin/relativeTime';

// Enable relative time plugin
dayjs.extend(relativeTime);

const RemainTodos = () => {
  const { isLoading, remainingTodos, handleCheckboxToggle } = Todos();
  const { handleDelete } = DeleteTodo();
  const [openItems, setOpenItems] = useState({});
  let counter = 0;

  //delete popper
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeletePop = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setOpen(true);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleDeleteConfirmation = (todoId) => {
    handleDelete(todoId);
    handleClosePopper();
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  //List accordition
  const handleClick = (id) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  };

  return (
    <Grid container>
      {isLoading ? (
        <Box
          sx={{
            width: "30vw",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : remainingTodos && remainingTodos.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          {remainingTodos?.map((todo) => (
            <List
              key={todo._id}
              sx={{
                mb: "5px",
                width: "50%",
                boxShadow:
                  " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(254, 226, 180) 0px 0px 0px 3px",
              }}
            >
              <ListItem
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <ListItemIcon>
                  <Checkbox
                    id="check"
                    size="large"
                    edge="start"
                    checked={todo.isCompleted}
                    tabIndex={-1}
                    onChange={() => handleCheckboxToggle(todo._id)}
                  />
                </ListItemIcon>
                <ListItemButton
                  sx={{
                    boxShadow:
                      "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(229, 123, 123, 0.9) 0px 0px 0px 1px",
                  }}
                  onClick={() => handleClick(todo._id)}
                >
                  <ListItemText primary={`${++counter}. ${todo.title}`} secondary ={dayjs(todo.date).fromNow()} />
                  {openItems[todo._id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse in={openItems[todo._id]} timeout="auto" unmountOnExit>
                <List>
                  <ListItemText
                    secondary={
                      <Box
                        sx={{
                          overflowWrap: "break-word",
                        }}
                        ml={9}
                        mr={2}
                      >
                        {todo.description}
                      </Box>
                    }
                  />
                  <ListItem
                    sx={{ mt: "1rem" }}
                    secondaryAction={
                      <Stack spacing={2} direction="row">
                        <EditTodoForm todo={todo} />
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          aria-describedby={id}
                          type="button"
                          onClick={(e)=>handleDeletePop(e)}
                        >
                          <DeleteIcon />
                          Delete
                        </Button>
                        <Popper
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          transition
                        >
                          {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                              <Paper sx={{ p: 1 }}>
                                <Typography p={1}>
                                  Delete {todo.title} ?
                                </Typography>
                                <Stack spacing={2} direction="row">
                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteConfirmation(todo._id)}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="inherit"
                                    size="small"
                                    onClick={handleClosePopper}
                                  >
                                    Cancel
                                  </Button>
                                </Stack>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                      </Stack>
                    }
                  />
                </List>
              </Collapse>
            </List>
          ))}
        </Box>
      ) : (
        <Typography variant="h5" color={"grey"}>
          No todos added !
        </Typography>
      )}
    </Grid>
  );
};

export default RemainTodos;
