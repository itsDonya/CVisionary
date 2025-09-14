import { createBrowserRouter } from "react-router-dom";

// pages
import Home from "@/features/home/pages/Home";
import AboutUs from "@/features/about/pages/About";

// layouts
import DefaultLayout from "@/shared/layouts/Default";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
]);
