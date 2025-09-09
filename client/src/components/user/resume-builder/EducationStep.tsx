import { useState } from "react";
import {
  TextField,
  Switch,
  Button,
  IconButton,
  Collapse,
  MenuItem,
} from "@mui/material";
import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Award,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

const degreeTypes = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Professional Certificate",
  "Other",
];

const EducationStep = () => {
  const { currentResume, addEducation, updateEducation, deleteEducation } =
    useAppStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleEducationUpdate = (
    id: string,
    field: keyof Education,
    value: any
  ) => {
    updateEducation(id, { [field]: value });
  };

  const handleAddEducation = () => {
    const newEducation = {
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    };
    addEducation(newEducation);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-xl border border-green-500/30">
            <GraduationCap className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Education
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          Add your educational background and academic achievements
        </p>
      </div>

      <div className="space-y-6">
        {currentResume.education.map((edu, index) => (
          <div
            key={edu.id}
            className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg border border-green-500/30">
                    <School className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">
                      {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      {edu.school && ` - ${edu.school}`}
                    </h3>
                    <p className="text-sm text-slate-400">
                      Education #{index + 1}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => toggleExpanded(edu.id)}
                    sx={{
                      color: "rgba(148, 163, 184, 1)",
                      "&:hover": {
                        backgroundColor: "rgba(51, 65, 85, 0.5)",
                        color: "rgba(34, 197, 94, 1)",
                      },
                    }}>
                    {expandedItems.has(edu.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => deleteEducation(edu.id)}
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
                    <School className="w-4 h-4" />
                    School/University *
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. Stanford University"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationUpdate(edu.id, "school", e.target.value)
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
                    <GraduationCap className="w-4 h-4" />
                    Degree *
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationUpdate(edu.id, "degree", e.target.value)
                    }
                    placeholder="Select degree type"
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
                        "& .MuiSelect-select": {
                          color: "rgba(241, 245, 249, 1)",
                          fontSize: "0.9rem",
                        },
                        "& .MuiSelect-icon": {
                          color: "rgba(148, 163, 184, 1)",
                        },
                      },
                    }}>
                    {degreeTypes.map((degree) => (
                      <MenuItem key={degree} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <BookOpen className="w-4 h-4" />
                    Field of Study *
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. Computer Science"
                    value={edu.field}
                    onChange={(e) =>
                      handleEducationUpdate(edu.id, "field", e.target.value)
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
                      Currently Studying
                    </label>
                    <Switch
                      checked={edu.current}
                      onChange={(e) =>
                        handleEducationUpdate(
                          edu.id,
                          "current",
                          e.target.checked
                        )
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "rgba(34, 197, 94, 1)",
                          "&:hover": {
                            backgroundColor: "rgba(34, 197, 94, 0.08)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "rgba(34, 197, 94, 1)",
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
                    value={edu.startDate}
                    onChange={(e) =>
                      handleEducationUpdate(edu.id, "startDate", e.target.value)
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
                    disabled={edu.current}
                    value={edu.current ? "" : edu.endDate || ""}
                    onChange={(e) =>
                      handleEducationUpdate(edu.id, "endDate", e.target.value)
                    }
                    placeholder={edu.current ? "Present" : ""}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: edu.current
                          ? "rgba(51, 65, 85, 0.2)"
                          : "rgba(51, 65, 85, 0.4)",
                        "& fieldset": {
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        },
                        "&:hover fieldset": {
                          borderColor: edu.current
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

              <Collapse in={expandedItems.has(edu.id)} timeout={300}>
                <div className="mt-6 space-y-4 border-t border-slate-600/30 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <Award className="w-4 h-4" />
                        GPA (Optional)
                      </label>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="e.g. 3.8/4.0"
                        value={edu.gpa || ""}
                        onChange={(e) =>
                          handleEducationUpdate(edu.id, "gpa", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(51, 65, 85, 0.4)",
                            "& fieldset": {
                              borderColor: "rgba(51, 65, 85, 0.7)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(245, 158, 11, 0.5)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgba(245, 158, 11, 0.8)",
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

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <BookOpen className="w-4 h-4" />
                      Description (Optional)
                    </label>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Relevant coursework, honors, activities, or achievements..."
                      value={edu.description || ""}
                      onChange={(e) =>
                        handleEducationUpdate(
                          edu.id,
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
                </div>
              </Collapse>
            </div>
          </div>
        ))}

        <div className="text-center">
          <Button
            onClick={handleAddEducation}
            startIcon={<Plus className="w-4 h-4" />}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              backgroundColor: "transparent",
              color: "rgba(34, 197, 94, 1)",
              border: "2px dashed rgba(34, 197, 94, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderColor: "rgba(34, 197, 94, 0.5)",
              },
            }}>
            Add Education
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationStep;
