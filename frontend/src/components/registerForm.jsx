import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { $axios } from "../api/axios";
import { registerValidation } from "./validations";
import { useSnackbarUtils } from "../utils/snackbar";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarUtils();
  const { mutate, isError, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({confirmPassword,...values}) => {
      await $axios.post("/api/user/register", values);
    },
    onSuccess: () => {
      navigate("/");
      showSnackbar("Registration successful!", "success");
    },
    onError: (err) => console.log(err?.response?.data?.message),
  });
  const errorMessage = error?.response?.data?.message.toLowerCase();

  return (
    <Grid container component="main" sx={{ height: "100dvh", width: "100dvw" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        lg={8}
        sx={{
          backgroundImage: "url(https://wallpapercave.com/wp/wp7881177.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        component={Paper}
        elevation={6}
        square
      >
        {isError && (
          <Alert severity="error">
            Failed to register! Please check fields below.
          </Alert>
        )}
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidation}
          onSubmit={async (values) => {
            console.log(values);
            await mutate(values);
          }}
        >
          <Box
            sx={{
              m: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" marginBottom={2}>
              Sign up
            </Typography>

            <Form className="custom-form" style={{ width: "100%" }}>
              <Field
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
                as={TextField}
                required
                autoFocus
                fullWidth
              />
              <div className="field-error">
                {isError && errorMessage.includes("username") ? (
                  <>{errorMessage}</>
                ) : (
                  <ErrorMessage name="username" />
                )}
              </div>

              <Field
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                as={TextField}
                required
                fullWidth
              />
              <div className="field-error">
                {isError && errorMessage.includes("email") ? (
                  <>{errorMessage}</>
                ) : (
                  <ErrorMessage name="email" />
                )}
              </div>

              <Field
                label="Password"
                name="password"
                type="password"
                as={TextField}
                required
                fullWidth

              />
              <div className="field-error">
                <ErrorMessage name="password" />
              </div>

              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                as={TextField}
                required
                fullWidth
              />
              <div className="field-error">
                <ErrorMessage name="confirmPassword" />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="center">
                <Link href="/" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Form>
          </Box>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
