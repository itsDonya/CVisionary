import { createBrowserRouter } from "react-router-dom";

// pages
import Home from "@/features/home/pages/Home";
import AboutUs from "@/features/about/pages/About";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

// layouts
import DefaultLayout from "@/shared/layouts/Default";
import AuthLayout from "@/features/auth/layouts/Auth";

export const router = createBrowserRouter([
  // general
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
  // auth
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
