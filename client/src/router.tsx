import { createBrowserRouter, Navigate } from "react-router-dom";

// components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/About";
import PanelLayout from "./layouts/Dashboard";
import Dashboard from "./pages/user/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },

  {
    path: "/panel",
    element: <Navigate to="/panel" replace />,
  },
  {
    path: "/panel",
    element: <PanelLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "resume/create",
        element: <p>Resume Create Page</p>,
      },
    ],
  },
]);
