import { createBrowserRouter } from "react-router-dom";

// components
import Home from "./pages/Home";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
