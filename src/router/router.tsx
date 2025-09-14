import { createBrowserRouter } from "react-router-dom";

// pages
import Home from "@/features/home/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
