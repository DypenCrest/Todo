import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Routes } from "./routes/root.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SnackbarProvider } from 'notistack';

const router = createBrowserRouter([...Routes]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
