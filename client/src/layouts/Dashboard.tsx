import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

// components
import Sidebar from "@/components/layout/user/Sidebar";

const SIDEBAR_WIDTH = 256;

const PanelLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          // ml: { md: `${SIDEBAR_WIDTH}px` },
          p: 3,
          bgcolor: "background.default",
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PanelLayout;
