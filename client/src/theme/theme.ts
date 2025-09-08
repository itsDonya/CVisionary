// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e35181",
    },
    secondary: {
      main: "#06b6d4",
      light: "#67e8f9",
      dark: "#0891b2",
    },
    background: {
      default: "#0f172a",
      paper: "rgba(30, 41, 59, 0.4)",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
    },
    divider: "rgba(148, 163, 184, 0.12)",
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          background: "rgba(30, 41, 59, 0.4)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 12,
          backdropFilter: "blur(8px)",
        },
        contained: {
          background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
          },
        },
      },
    },
  },
});
