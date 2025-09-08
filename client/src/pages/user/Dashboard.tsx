// src/pages/Dashboard.tsx
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { resumes } = useAppStore();

  const stats = {
    total: resumes.length,
    completed: resumes.filter((r) => r.isCompleted).length,
    inProgress: resumes.filter((r) => !r.isCompleted).length,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 1 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          gap: 3,
        }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 0.5,
            }}>
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
            }}>
            Manage your professional resumes
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/panel/resume/create"
          variant="contained"
          startIcon={<Plus size={18} />}
          sx={{
            px: 3,
            py: 1.5,
            fontSize: "0.95rem",
            fontWeight: 600,
            minWidth: 160,
          }}>
          Create Resume
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
              },
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}>
                <FileText size={20} color="#8b5cf6" />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                Total Resumes
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: "2.5rem",
              }}>
              {stats.total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)",
              },
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}>
                <CheckCircle2 size={20} color="#22c55e" />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                Completed
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: "2.5rem",
              }}>
              {stats.completed}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
              },
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                }}>
                <Clock size={20} color="#f59e0b" />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                In Progress
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: "2.5rem",
              }}>
              {stats.inProgress}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Resumes */}
      <Paper sx={{ p: 4, minHeight: "400px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}>
            <FileText size={24} />
            Recent Resumes
          </Typography>
        </Box>

        {resumes.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              textAlign: "center",
            }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 4,
                background: "rgba(139, 92, 246, 0.05)",
                border: "2px dashed rgba(139, 92, 246, 0.2)",
                mb: 3,
              }}>
              <FileText size={48} color="#8b5cf6" />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                mb: 1,
              }}>
              No resumes yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 4,
                maxWidth: 300,
              }}>
              Start building your professional resume to showcase your skills
              and experience
            </Typography>
            <Button
              component={Link}
              to="/panel/resume/create"
              variant="contained"
              startIcon={<Plus size={18} />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}>
              Create Your First Resume
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {resumes.slice(0, 5).map((resume) => (
              <Card
                key={resume.id}
                sx={{
                  background: "rgba(51, 65, 85, 0.3)",
                  border: "1px solid rgba(148, 163, 184, 0.1)",
                  backdropFilter: "blur(8px)",
                  "&:hover": {
                    background: "rgba(51, 65, 85, 0.5)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background:
                            "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                        }}>
                        <FileText size={20} color="#8b5cf6" />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            mb: 0.5,
                          }}>
                          {resume.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            <Calendar size={14} color="#cbd5e1" />
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}>
                              Updated{" "}
                              {new Date(resume.updatedAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              px: 2,
                              py: 0.5,
                              borderRadius: 2,
                              background: resume.isCompleted
                                ? "rgba(34, 197, 94, 0.1)"
                                : "rgba(245, 158, 11, 0.1)",
                              border: resume.isCompleted
                                ? "1px solid rgba(34, 197, 94, 0.2)"
                                : "1px solid rgba(245, 158, 11, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            {resume.isCompleted ? (
                              <CheckCircle2 size={12} color="#22c55e" />
                            ) : (
                              <Clock size={12} color="#f59e0b" />
                            )}
                            <Typography
                              variant="caption"
                              sx={{
                                color: resume.isCompleted
                                  ? "#22c55e"
                                  : "#f59e0b",
                                fontWeight: 500,
                                fontSize: "0.75rem",
                              }}>
                              {resume.isCompleted ? "Complete" : "In Progress"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          background: "rgba(139, 92, 246, 0.1)",
                          color: "primary.main",
                        },
                      }}>
                      <MoreVertical size={18} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
