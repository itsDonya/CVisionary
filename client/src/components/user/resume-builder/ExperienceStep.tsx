import { useState } from "react";
import { TextField, Switch, Button, IconButton, Collapse } from "@mui/material";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Award,
  X,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";
import type { Experience } from "@/types/resume";

const ExperienceStep = () => {
  const {
    currentResume,
    addExperience,
    updateExperience,
    deleteExperience,
    addAchievement,
    updateAchievement,
    removeAchievement,
  } = useAppStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [newAchievements, setNewAchievements] = useState<
    Record<string, string>
  >({});

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleExperienceUpdate = (
    id: string,
    field: keyof Experience,
    value: any
  ) => {
    updateExperience(id, { [field]: value });
  };

  const handleAddAchievement = (experienceId: string) => {
    const achievement = newAchievements[experienceId]?.trim();
    if (achievement) {
      addAchievement(experienceId, achievement);
      setNewAchievements((prev) => ({ ...prev, [experienceId]: "" }));
    }
  };

  const handleNewAchievementChange = (experienceId: string, value: string) => {
    setNewAchievements((prev) => ({ ...prev, [experienceId]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, experienceId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAchievement(experienceId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-400/20 rounded-xl border border-blue-500/30">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          Add your work history and professional achievements
        </p>
      </div>

      <div className="space-y-6">
        {currentResume.experience.map((exp, index) => (
          <div
            key={exp.id}
            className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-400/20 rounded-lg border border-blue-500/30">
                    <Building className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">
                      {exp.position || "Position Title"}{" "}
                      {exp.company && `at ${exp.company}`}
                    </h3>
                    <p className="text-sm text-slate-400">
                      Experience #{index + 1}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => toggleExpanded(exp.id)}
                    sx={{
                      color: "rgba(148, 163, 184, 1)",
                      "&:hover": {
                        backgroundColor: "rgba(51, 65, 85, 0.5)",
                        color: "rgba(192, 132, 252, 1)",
                      },
                    }}>
                    {expandedItems.has(exp.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => deleteExperience(exp.id)}
                    sx={{
                      color: "rgba(248, 113, 113, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(248, 113, 113, 0.1)",
                        color: "rgba(248, 113, 113, 1)",
                      },
                    }}>
                    <Trash2 size={18} />
                  </IconButton>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Briefcase className="w-4 h-4" />
                    Job Title *
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. Senior Frontend Developer"
                    value={exp.position}
                    onChange={(e) =>
                      handleExperienceUpdate(exp.id, "position", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "rgba(51, 65, 85, 0.4)",
                        "& fieldset": {
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(59, 130, 246, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(59, 130, 246, 0.8)",
                        },
                        "& input": {
                          color: "rgba(241, 245, 249, 1)",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "rgba(148, 163, 184, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Building className="w-4 h-4" />
                    Company *
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. Google Inc."
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceUpdate(exp.id, "company", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "rgba(51, 65, 85, 0.4)",
                        "& fieldset": {
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(34, 197, 94, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(34, 197, 94, 0.8)",
                        },
                        "& input": {
                          color: "rgba(241, 245, 249, 1)",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "rgba(148, 163, 184, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. San Francisco, CA"
                    value={exp.location || ""}
                    onChange={(e) =>
                      handleExperienceUpdate(exp.id, "location", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "rgba(51, 65, 85, 0.4)",
                        "& fieldset": {
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(168, 85, 247, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(168, 85, 247, 0.8)",
                        },
                        "& input": {
                          color: "rgba(241, 245, 249, 1)",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "rgba(148, 163, 184, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <Calendar className="w-4 h-4" />
                      Current Job
                    </label>
                    <Switch
                      checked={exp.isCurrentJob}
                      onChange={(e) =>
                        handleExperienceUpdate(
                          exp.id,
                          "isCurrentJob",
                          e.target.checked
                        )
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "rgba(59, 130, 246, 1)",
                          "&:hover": {
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "rgba(59, 130, 246, 1)",
                          },
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Calendar className="w-4 h-4" />
                    Start Date *
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleExperienceUpdate(
                        exp.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "rgba(51, 65, 85, 0.4)",
                        "& fieldset": {
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(34, 211, 238, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(34, 211, 238, 0.8)",
                        },
                        "& input": {
                          color: "rgba(241, 245, 249, 1)",
                          fontSize: "0.9rem",
                        },
                      },
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    type="month"
                    disabled={exp.isCurrentJob}
                    value={exp.isCurrentJob ? "" : exp.endDate || ""}
                    onChange={(e) =>
                      handleExperienceUpdate(exp.id, "endDate", e.target.value)
                    }
                    placeholder={exp.isCurrentJob ? "Present" : ""}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: exp.isCurrentJob
                          ? "rgba(51, 65, 85, 0.2)"
                          : "rgba(51, 65, 85, 0.4)",
                        "& fieldset": {
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        },
                        "&:hover fieldset": {
                          borderColor: exp.isCurrentJob
                            ? "rgba(51, 65, 85, 0.7)"
                            : "rgba(34, 211, 238, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(34, 211, 238, 0.8)",
                        },
                        "& input": {
                          color: "rgba(241, 245, 249, 1)",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "rgba(148, 163, 184, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <Collapse in={expandedItems.has(exp.id)} timeout={300}>
                <div className="mt-6 space-y-4 border-t border-slate-600/30 pt-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <Briefcase className="w-4 h-4" />
                      Job Description
                    </label>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Describe your role, responsibilities, and key projects..."
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceUpdate(
                          exp.id,
                          "description",
                          e.target.value
                        )
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          backgroundColor: "rgba(51, 65, 85, 0.4)",
                          "& fieldset": {
                            borderColor: "rgba(51, 65, 85, 0.7)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(139, 92, 246, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "rgba(139, 92, 246, 0.8)",
                          },
                          "& textarea": {
                            color: "rgba(241, 245, 249, 1)",
                            fontSize: "0.9rem",
                            "&::placeholder": {
                              color: "rgba(148, 163, 184, 0.7)",
                            },
                          },
                        },
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <Award className="w-4 h-4" />
                      Key Achievements
                    </label>

                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3">
                        <div className="flex-1">
                          <TextField
                            fullWidth
                            size="small"
                            value={achievement}
                            onChange={(e) =>
                              updateAchievement(
                                exp.id,
                                achIndex,
                                e.target.value
                              )
                            }
                            placeholder="e.g. Increased website performance by 40%"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "rgba(51, 65, 85, 0.3)",
                                "& fieldset": {
                                  borderColor: "rgba(51, 65, 85, 0.6)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "rgba(34, 197, 94, 0.5)",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "rgba(34, 197, 94, 0.8)",
                                },
                                "& input": {
                                  color: "rgba(241, 245, 249, 1)",
                                  fontSize: "0.9rem",
                                  "&::placeholder": {
                                    color: "rgba(148, 163, 184, 0.7)",
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                        <IconButton
                          onClick={() => removeAchievement(exp.id, achIndex)}
                          size="small"
                          sx={{
                            color: "rgba(248, 113, 113, 0.7)",
                            "&:hover": {
                              backgroundColor: "rgba(248, 113, 113, 0.1)",
                              color: "rgba(248, 113, 113, 1)",
                            },
                          }}>
                          <X size={16} />
                        </IconButton>
                      </div>
                    ))}

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Add a new achievement..."
                          value={newAchievements[exp.id] || ""}
                          onChange={(e) =>
                            handleNewAchievementChange(exp.id, e.target.value)
                          }
                          onKeyPress={(e) => handleKeyPress(e, exp.id)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "rgba(51, 65, 85, 0.3)",
                              "& fieldset": {
                                borderColor: "rgba(51, 65, 85, 0.6)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(34, 197, 94, 0.5)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "rgba(34, 197, 94, 0.8)",
                              },
                              "& input": {
                                color: "rgba(241, 245, 249, 1)",
                                fontSize: "0.9rem",
                                "&::placeholder": {
                                  color: "rgba(148, 163, 184, 0.7)",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => handleAddAchievement(exp.id)}
                        disabled={!newAchievements[exp.id]?.trim()}
                        sx={{
                          minWidth: "80px",
                          borderRadius: 2,
                          backgroundColor: "rgba(34, 197, 94, 0.1)",
                          color: "rgba(34, 197, 94, 1)",
                          border: "1px solid rgba(34, 197, 94, 0.3)",
                          "&:hover": {
                            backgroundColor: "rgba(34, 197, 94, 0.2)",
                          },
                          "&:disabled": {
                            color: "rgba(148, 163, 184, 0.5)",
                            borderColor: "rgba(51, 65, 85, 0.5)",
                          },
                        }}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ))}

        <div className="text-center">
          <Button
            onClick={addExperience}
            startIcon={<Plus className="w-4 h-4" />}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              backgroundColor: "transparent",
              color: "rgba(59, 130, 246, 1)",
              border: "2px dashed rgba(59, 130, 246, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.5)",
              },
            }}>
            Add Work Experience
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStep;
