import { createBrowserRouter } from "react-router-dom";

// components
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
