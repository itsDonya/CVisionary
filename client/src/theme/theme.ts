import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e35181",
      light: "#e35181",
      dark: "#e35181",
    },
    background: {
      default: "#030712",
      paper: "rgba(17, 24, 39, 0.5)",
    },
    text: {
      primary: "#0c0c0c",
      //   secondary: '#9ca3af',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(75, 85, 99, 0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});
