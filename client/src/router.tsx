import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import PanelLayout from "./layouts/Panel";

// components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/About";

// panel
import Dashboard from "./pages/user/Dashboard";
import ResumeBuilder from "./pages/user/ResumeBuilder";

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
        element: <ResumeBuilder />,
      },
      {
        path: "resume/:id",
        element: <ResumeBuilder />,
      },
    ],
  },
]);
