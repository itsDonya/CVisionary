// src/components/layout/Sidebar.tsx
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
import { Plus, Menu, FileText, Gauge } from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "@/types/user";

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/panel",
    icon: <Gauge size={18} />,
  },
  {
    id: "create-resume",
    label: "Create Resume",
    path: "/panel/resume/create",
    icon: <Plus size={18} />,
  },
];

const SIDEBAR_WIDTH = 280;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isSidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  const SidebarContent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 3,
        height: "100%",
      }}>
      {/* Logo/Brand */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 1 }}>
        <p className="text-2xl bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 bg-clip-text text-transparent font-bold">
          CVisionary
        </p>
      </Box>

      {/* Navigation */}
      <List sx={{ p: 0 }}>
        {sidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1.5,
                color: "text.secondary",
                background:
                  location.pathname === item.path
                    ? "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)"
                    : "transparent",
                border:
                  location.pathname === item.path
                    ? "1px solid rgba(139, 92, 246, 0.2)"
                    : "1px solid transparent",
                "&:hover": {
                  background: "rgba(139, 92, 246, 0.08)",
                  border: "1px solid rgba(139, 92, 246, 0.1)",
                  color: "text.primary",
                },
                "&.Mui-selected": {
                  color: "primary.main",
                  fontWeight: 600,
                },
              }}>
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 36,
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: "inherit",
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
            top: 20,
            left: 20,
            zIndex: 1300,
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            "&:hover": {
              background: "rgba(30, 41, 59, 0.9)",
            },
          }}>
          <Menu size={20} />
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
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(20px)",
              border: "none",
              borderRight: "1px solid rgba(148, 163, 184, 0.1)",
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
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(148, 163, 184, 0.1)",
            },
          }}>
          <SidebarContent />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
