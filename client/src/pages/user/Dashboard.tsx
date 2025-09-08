import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import { Add, Description, Schedule, CheckCircle } from "@mui/icons-material";
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "text.primary" }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Manage your resumes
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/panel/resume/create"
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}>
          Create Resume
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}>
                Total Resumes
              </Typography>
              <Description sx={{ color: "text.secondary", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "text.primary" }}>
              {stats.total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}>
                Completed
              </Typography>
              <CheckCircle sx={{ color: "#22c55e", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "text.primary" }}>
              {stats.completed}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}>
                In Progress
              </Typography>
              <Schedule sx={{ color: "#eab308", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "text.primary" }}>
              {stats.inProgress}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Resumes */}
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
          Recent Resumes
        </Typography>

        {resumes.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 6,
              textAlign: "center",
            }}>
            <Description sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}>
              No resumes yet
            </Typography>
            <Typography variant="body2" sx={{ color: "text.disabled", mb: 3 }}>
              Create your first resume to get started
            </Typography>
            <Button
              component={Link}
              to="/panel/resume/create"
              variant="contained"
              startIcon={<Add />}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}>
              Create Resume
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {resumes.slice(0, 5).map((resume) => (
              <Card
                key={resume.id}
                sx={{
                  bgcolor: "rgba(55, 65, 81, 0.5)",
                  "&:hover": {
                    bgcolor: "rgba(55, 65, 81, 0.8)",
                  },
                  transition: "background-color 0.2s",
                }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "rgba(139, 92, 246, 0.2)",
                        }}>
                        <Description
                          sx={{ color: "primary.main", fontSize: 16 }}
                        />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500, color: "text.primary" }}>
                          {resume.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.disabled" }}>
                          Updated{" "}
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={resume.isCompleted ? "Complete" : "In Progress"}
                      size="small"
                      sx={{
                        bgcolor: resume.isCompleted
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(234, 179, 8, 0.2)",
                        color: resume.isCompleted ? "#22c55e" : "#eab308",
                        fontWeight: 500,
                      }}
                    />
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
