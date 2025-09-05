import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// providers
import { RouterProvider } from "react-router-dom";

// styles
import "@/assets/style/main.css";

// router
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
