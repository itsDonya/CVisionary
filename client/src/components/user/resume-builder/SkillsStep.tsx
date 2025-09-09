import { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
} from "@mui/material";
import {
  Code,
  Languages,
  Plus,
  Trash2,
  Star,
  Zap,
  Brain,
  Globe,
  //   X,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: "technical" | "soft" | "language";
}

const skillCategories = [
  { value: "technical", label: "Technical Skills", icon: Code, color: "blue" },
  { value: "soft", label: "Soft Skills", icon: Brain, color: "purple" },
  { value: "language", label: "Languages", icon: Languages, color: "green" },
];

const skillLevels = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Basic" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

const SkillsStep = () => {
  const { currentResume, addSkill, updateSkill, deleteSkill } = useAppStore();

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: 3,
    category: "technical" as const,
  });

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({
        name: "",
        level: 3,
        category: "technical",
      });
    }
  };

  const handleSkillUpdate = (id: string, field: keyof Skill, value: any) => {
    updateSkill(id, { [field]: value });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const filteredSkills = currentResume.skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const getSkillsByCategory = (category: string) => {
    return currentResume.skills.filter((skill) => skill.category === category);
  };

  //   const getCategoryColor = (category: string) => {
  //     const categoryData = skillCategories.find((cat) => cat.value === category);
  //     return categoryData?.color || "blue";
  //   };

  //   const getCategoryIcon = (category: string) => {
  //     const categoryData = skillCategories.find((cat) => cat.value === category);
  //     return categoryData?.icon || Code;
  //   };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-xl border border-orange-500/30">
            <Zap className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          Showcase your technical skills, soft skills, and language proficiency
        </p>
      </div>

      {/* Add New Skill Section - بهبود یافته */}
      <Card
        sx={{
          background:
            "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.2) 100%)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          border: "1px solid rgba(71, 85, 105, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-xl border border-orange-500/30">
              <Plus className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">
              Add New Skill
            </h3>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Skill Name *
              </label>
              <TextField
                fullWidth
                size="medium"
                placeholder="e.g. React, Leadership, Spanish..."
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                onKeyPress={handleKeyPress}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(51, 65, 85, 0.3)",
                    "& fieldset": {
                      borderColor: "rgba(71, 85, 105, 0.6)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(251, 146, 60, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(251, 146, 60, 0.8)",
                      borderWidth: "2px",
                    },
                    "& input": {
                      color: "rgba(241, 245, 249, 1)",
                      fontSize: "1rem",
                      "&::placeholder": {
                        color: "rgba(148, 163, 184, 0.7)",
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Category *
              </label>
              <div className="flex flex-wrap gap-3">
                {skillCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = newSkill.category === category.value;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() =>
                        setNewSkill({
                          ...newSkill,
                          category: category.value as any,
                        })
                      }
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? `${
                              category.color === "blue"
                                ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                                : category.color === "purple"
                                ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                : "bg-green-500/20 border-green-500/50 text-green-300"
                            } shadow-lg`
                          : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/40"
                      }`}>
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Proficiency Level */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Proficiency Level *
              </label>
              <div className="flex items-center gap-4">
                <Rating
                  value={newSkill.level}
                  onChange={(_, value) => {
                    if (value) {
                      setNewSkill({ ...newSkill, level: value });
                    }
                  }}
                  max={5}
                  size="large"
                  icon={<Star className="w-6 h-6" />}
                  emptyIcon={<Star className="w-6 h-6" />}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "rgba(251, 146, 60, 1)",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "rgba(71, 85, 105, 0.8)",
                    },
                    "& .MuiRating-iconHover": {
                      color: "rgba(251, 146, 60, 0.8)",
                    },
                  }}
                />
                <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg border border-slate-600/50">
                  <span className="text-sm font-medium text-slate-300">
                    {
                      skillLevels.find(
                        (level) => level.value === newSkill.level
                      )?.label
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Add Button */}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleAddSkill}
                disabled={!newSkill.name.trim()}
                startIcon={<Plus className="w-4 h-4" />}
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  backgroundColor: "rgba(251, 146, 60, 0.1)",
                  color: "rgba(251, 146, 60, 1)",
                  border: "1px solid rgba(251, 146, 60, 0.3)",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(251, 146, 60, 0.2)",
                    borderColor: "rgba(251, 146, 60, 0.5)",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    color: "rgba(148, 163, 184, 0.5)",
                    borderColor: "rgba(71, 85, 105, 0.5)",
                    backgroundColor: "rgba(51, 65, 85, 0.3)",
                  },
                  transition: "all 0.2s ease",
                }}>
                Add Skill
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center">
        <ToggleButtonGroup
          value={activeCategory}
          exclusive
          onChange={(_, value) => {
            if (value !== null) {
              setActiveCategory(value);
            }
          }}
          sx={{
            backgroundColor: "rgba(30, 41, 59, 0.6)",
            borderRadius: 3,
            border: "1px solid rgba(71, 85, 105, 0.4)",
            backdropFilter: "blur(10px)",
            "& .MuiToggleButton-root": {
              borderRadius: 3,
              color: "rgba(148, 163, 184, 1)",
              border: "none",
              px: 3,
              py: 1.5,
              "&:hover": {
                backgroundColor: "rgba(51, 65, 85, 0.6)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(251, 146, 60, 0.2)",
                color: "rgba(251, 146, 60, 1)",
              },
            },
          }}>
          <ToggleButton value="all">
            <Globe className="w-4 h-4 mr-2" />
            All ({currentResume.skills.length})
          </ToggleButton>
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const count = getSkillsByCategory(category.value).length;
            return (
              <ToggleButton key={category.value} value={category.value}>
                <Icon className="w-4 h-4 mr-2" />
                {category.label} ({count})
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>

      {/* Skills Display */}
      <div className="space-y-6">
        {skillCategories.map((categoryData) => {
          const categorySkills = getSkillsByCategory(categoryData.value);
          const Icon = categoryData.icon;

          if (
            activeCategory !== "all" &&
            activeCategory !== categoryData.value
          ) {
            return null;
          }

          if (categorySkills.length === 0) {
            return null;
          }

          return (
            <div key={categoryData.value} className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 bg-gradient-to-br rounded-lg border ${
                    categoryData.color === "blue"
                      ? "from-blue-500/20 to-cyan-400/20 border-blue-500/30"
                      : categoryData.color === "purple"
                      ? "from-purple-500/20 to-violet-400/20 border-purple-500/30"
                      : "from-green-500/20 to-emerald-400/20 border-green-500/30"
                  }`}>
                  <Icon
                    className={`w-4 h-4 ${
                      categoryData.color === "blue"
                        ? "text-blue-400"
                        : categoryData.color === "purple"
                        ? "text-purple-400"
                        : "text-green-400"
                    }`}
                  />
                </div>
                <h3 className="font-semibold text-slate-200">
                  {categoryData.label} ({categorySkills.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categorySkills.map((skill) => (
                  <Card
                    key={skill.id}
                    sx={{
                      background: `linear-gradient(135deg, ${
                        categoryData.color === "blue"
                          ? "rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%"
                          : categoryData.color === "purple"
                          ? "rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%"
                          : "rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%"
                      })`,
                      backdropFilter: "blur(10px)",
                      borderRadius: 2.5,
                      border: `1px solid ${
                        categoryData.color === "blue"
                          ? "rgba(59, 130, 246, 0.2)"
                          : categoryData.color === "purple"
                          ? "rgba(168, 85, 247, 0.2)"
                          : "rgba(34, 197, 94, 0.2)"
                      }`,
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    }}>
                    <CardContent sx={{ p: 3 }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <TextField
                            fullWidth
                            size="small"
                            value={skill.name}
                            onChange={(e) =>
                              handleSkillUpdate(
                                skill.id,
                                "name",
                                e.target.value
                              )
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "rgba(51, 65, 85, 0.4)",
                                "& fieldset": {
                                  borderColor: "rgba(71, 85, 105, 0.5)",
                                },
                                "&:hover fieldset": {
                                  borderColor: `rgba(${
                                    categoryData.color === "blue"
                                      ? "59, 130, 246"
                                      : categoryData.color === "purple"
                                      ? "168, 85, 247"
                                      : "34, 197, 94"
                                  }, 0.5)`,
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: `rgba(${
                                    categoryData.color === "blue"
                                      ? "59, 130, 246"
                                      : categoryData.color === "purple"
                                      ? "168, 85, 247"
                                      : "34, 197, 94"
                                  }, 0.8)`,
                                },
                                "& input": {
                                  color: "rgba(241, 245, 249, 1)",
                                  fontSize: "0.9rem",
                                  fontWeight: 500,
                                },
                              },
                            }}
                          />
                        </div>
                        <IconButton
                          onClick={() => deleteSkill(skill.id)}
                          size="small"
                          sx={{
                            ml: 1,
                            color: "rgba(248, 113, 113, 0.7)",
                            "&:hover": {
                              backgroundColor: "rgba(248, 113, 113, 0.1)",
                              color: "rgba(248, 113, 113, 1)",
                            },
                          }}>
                          <Trash2 size={16} />
                        </IconButton>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-300">
                            Proficiency Level
                          </label>
                          <span className="text-sm text-slate-400">
                            {
                              skillLevels.find(
                                (level) => level.value === skill.level
                              )?.label
                            }
                          </span>
                        </div>
                        <Rating
                          value={skill.level}
                          onChange={(_, value) => {
                            if (value) {
                              handleSkillUpdate(skill.id, "level", value);
                            }
                          }}
                          max={5}
                          icon={<Star className="w-4 h-4" />}
                          emptyIcon={<Star className="w-4 h-4" />}
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: `rgba(${
                                categoryData.color === "blue"
                                  ? "59, 130, 246"
                                  : categoryData.color === "purple"
                                  ? "168, 85, 247"
                                  : "34, 197, 94"
                              }, 1)`,
                            },
                            "& .MuiRating-iconEmpty": {
                              color: "rgba(71, 85, 105, 1)",
                            },
                            "& .MuiRating-iconHover": {
                              color: `rgba(${
                                categoryData.color === "blue"
                                  ? "59, 130, 246"
                                  : categoryData.color === "purple"
                                  ? "168, 85, 247"
                                  : "34, 197, 94"
                              }, 0.8)`,
                            },
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-300 mb-2">
              No skills added yet
            </h3>
            <p className="text-slate-400 text-sm">
              {activeCategory === "all"
                ? "Add your first skill using the form above"
                : `Add your first ${skillCategories
                    .find((cat) => cat.value === activeCategory)
                    ?.label.toLowerCase()} skill`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsStep;
