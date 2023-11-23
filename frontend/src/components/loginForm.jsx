import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { $axios } from "../api/axios.js";
import { loginValidation } from "./validations.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate, isError, error } = useMutation({
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
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
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
        {isError && <Alert severity="error">{errorMessage}</Alert>}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidation}
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
              Sign in
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
                <ErrorMessage name="username" />
              </div>

              <Field
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                as={TextField}
                required
                fullWidth
                focused
              />
              <div className="field-error">
                <ErrorMessage name="password" />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Form>
          </Box>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
