import HomePage from "../pages/HomePage";
import Background from "../pages/loginRegister/background";
import LoginPage from "../pages/loginRegister/loginPage";
import RegisterPage from "../pages/loginRegister/registerPage";

export const Routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  { path: "/Home", element: <HomePage /> },
];
