import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// providers
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

// styles
import "@/assets/style/main.css";

// router
import { router } from "./router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={{}}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
