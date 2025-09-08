import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Menu } from "@mui/icons-material";
import { useAppStore } from "@/stores/appStore";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "@/types/user";
import { Gauge } from "lucide-react";
import Logo from "@/components/UI/Logo";

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/panel",
    icon: <Gauge />,
  },
  {
    id: "create-resume",
    label: "Create Resume",
    path: "/panel/resume/create",
    icon: <Add />,
  },
];

const SIDEBAR_WIDTH = 256;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isSidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  const SidebarContent = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
      {/* Logo/Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-primary-400 bg-clip-text text-transparent">
          CVisionary
        </p>
      </Box>

      {/* Navigation */}
      <List sx={{ p: 0 }}>
        {sidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1.5,
                color: "text.secondary",

                "&.Mui-selected": {
                  backgroundColor: "rgba(139, 92, 246, 0.12)",
                  color: "primary.main",
                },
              }}>
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 40,
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1300,
            bgcolor: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(8px)",
            "&:hover": {
              bgcolor: "rgba(17, 24, 39, 0.9)",
            },
          }}>
          <Menu />
        </IconButton>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              bgcolor: "rgba(17, 24, 39, 0.5)",
              backdropFilter: "blur(8px)",
              borderRight: "1px solid rgba(75, 85, 99, 0.3)",
            },
          }}>
          <SidebarContent />
        </Drawer>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={isSidebarOpen}
          onClose={toggleSidebar}
          sx={{
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              bgcolor: "rgba(17, 24, 39, 0.95)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(75, 85, 99, 0.3)",
            },
          }}>
          <SidebarContent />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
