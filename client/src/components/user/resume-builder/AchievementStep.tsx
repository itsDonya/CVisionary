import { useState, useEffect } from "react";
import { TextField, Button, IconButton, Collapse, Chip } from "@mui/material";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Target,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";

import type { Achievement } from "@/types/resume";

const achievementCategories = [
  { value: "award", label: "Award", icon: Trophy, color: "#f59e0b" },
  {
    value: "certification",
    label: "Certification",
    icon: Award,
    color: "#3b82f6",
  },
  { value: "recognition", label: "Recognition", icon: Star, color: "#8b5cf6" },
  { value: "achievement", label: "Achievement", icon: Medal, color: "#10b981" },
  { value: "milestone", label: "Milestone", icon: Target, color: "#ef4444" },
  {
    value: "performance",
    label: "Performance",
    icon: TrendingUp,
    color: "#6366f1",
  },
];

const AchievementStep = () => {
  const { currentResume, updateCurrentResume } = useAppStore(); // درست شد!

  // Get achievements from store or initialize empty array
  const [achievements, setAchievements] = useState<Achievement[]>(
    currentResume.achievements || []
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Update store when achievements change
  useEffect(() => {
    updateCurrentResume({ achievements });
  }, [achievements, updateCurrentResume]);

  // Sync with store when currentResume changes
  useEffect(() => {
    if (currentResume.achievements) {
      setAchievements(currentResume.achievements);
    }
  }, [currentResume.achievements]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
      category: "achievement",
      date: "",
      description: "",
      issuer: "",
    };
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);

    // Auto-expand the new achievement
    setExpandedItems((prev) => new Set([...prev, newAchievement.id]));
  };

  const handleAchievementUpdate = (
    id: string,
    field: keyof Achievement,
    value: string
  ) => {
    const updatedAchievements = achievements.map((achievement) =>
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updatedAchievements);
  };

  const handleDeleteAchievement = (id: string) => {
    const updatedAchievements = achievements.filter(
      (achievement) => achievement.id !== id
    );
    setAchievements(updatedAchievements);

    // Remove from expanded items
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.delete(id);
      return newExpanded;
    });
  };

  // باقی کد UI همونه...
  const getCategoryInfo = (category: string) => {
    return (
      achievementCategories.find((c) => c.value === category) ||
      achievementCategories[0]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-400/20 rounded-xl border border-amber-500/30">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Achievements & Awards
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          Showcase your accomplishments, certifications, and recognitions
        </p>
      </div>

      <div className="space-y-6">
        {achievements.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-slate-700/20 to-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-600/30">
            <div className="p-4 bg-amber-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              No Achievements Added Yet
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Start by adding your professional achievements, awards, and
              certifications
            </p>
            <Button
              onClick={handleAddAchievement}
              startIcon={<Plus className="w-4 h-4" />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                backgroundColor: "transparent",
                color: "rgba(245, 158, 11, 1)",
                border: "2px dashed rgba(245, 158, 11, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  borderColor: "rgba(245, 158, 11, 0.5)",
                },
              }}>
              Add Your First Achievement
            </Button>
          </div>
        ) : (
          <>
            {achievements.map((achievement: Achievement) => {
              const categoryInfo = getCategoryInfo(achievement.category);
              const CategoryIcon = categoryInfo.icon;

              return (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 overflow-hidden transition-all duration-300 hover:from-slate-700/40 hover:to-slate-800/40">
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg border transition-all duration-200"
                          style={{
                            backgroundColor: `${categoryInfo.color}20`,
                            borderColor: `${categoryInfo.color}30`,
                          }}>
                          <CategoryIcon
                            className="w-4 h-4"
                            style={{ color: categoryInfo.color }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-200">
                            {achievement.title || "Achievement Title"}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Chip
                              label={categoryInfo.label}
                              size="small"
                              sx={{
                                backgroundColor: `${categoryInfo.color}20`,
                                color: categoryInfo.color,
                                fontSize: "0.7rem",
                                height: "20px",
                              }}
                            />
                            {achievement.date && (
                              <span className="text-xs text-slate-400">
                                • {achievement.date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconButton
                          onClick={() => toggleExpanded(achievement.id)}
                          sx={{
                            color: "rgba(148, 163, 184, 1)",
                            "&:hover": {
                              backgroundColor: "rgba(51, 65, 85, 0.5)",
                              color: "rgba(192, 132, 252, 1)",
                            },
                            transition: "all 0.2s ease",
                          }}>
                          {expandedItems.has(achievement.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleDeleteAchievement(achievement.id)
                          }
                          sx={{
                            color: "rgba(248, 113, 113, 0.7)",
                            "&:hover": {
                              backgroundColor: "rgba(248, 113, 113, 0.1)",
                              color: "rgba(248, 113, 113, 1)",
                              transform: "scale(1.05)",
                            },
                            transition: "all 0.2s ease",
                          }}>
                          <Trash2 size={18} />
                        </IconButton>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                          <Trophy className="w-4 h-4" />
                          Achievement Title *
                        </label>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="e.g. Employee of the Year 2023"
                          value={achievement.title}
                          onChange={(e) =>
                            handleAchievementUpdate(
                              achievement.id,
                              "title",
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
                                borderColor: categoryInfo.color + "80",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: categoryInfo.color,
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
                          <Calendar className="w-4 h-4" />
                          Date Received
                        </label>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="e.g. December 2023"
                          value={achievement.date || ""}
                          onChange={(e) =>
                            handleAchievementUpdate(
                              achievement.id,
                              "date",
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
                                "&::placeholder": {
                                  color: "rgba(148, 163, 184, 0.7)",
                                },
                              },
                            },
                          }}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                          <Star className="w-4 h-4" />
                          Category
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                          {achievementCategories.map((category) => {
                            const Icon = category.icon;
                            const isSelected =
                              achievement.category === category.value;
                            return (
                              <button
                                key={category.value}
                                onClick={() =>
                                  handleAchievementUpdate(
                                    achievement.id,
                                    "category",
                                    category.value
                                  )
                                }
                                className={`p-2 rounded-lg border transition-all text-xs font-medium ${
                                  isSelected
                                    ? "border-blue-400 bg-blue-500/20 text-blue-300 scale-95"
                                    : "border-slate-600/50 bg-slate-700/30 text-slate-400 hover:border-slate-500 hover:bg-slate-600/30"
                                }`}>
                                <Icon size={16} className="mx-auto mb-1" />
                                {category.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <Collapse
                      in={expandedItems.has(achievement.id)}
                      timeout={300}>
                      <div className="mt-6 space-y-4 border-t border-slate-600/30 pt-4">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Award className="w-4 h-4" />
                            Description
                          </label>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Describe the achievement, what you accomplished, and its impact..."
                            value={achievement.description || ""}
                            onChange={(e) =>
                              handleAchievementUpdate(
                                achievement.id,
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

                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Medal className="w-4 h-4" />
                            Issued By
                          </label>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="e.g. Google, Microsoft, AWS, etc."
                            value={achievement.issuer || ""}
                            onChange={(e) =>
                              handleAchievementUpdate(
                                achievement.id,
                                "issuer",
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
                      </div>
                    </Collapse>
                  </div>
                </div>
              );
            })}

            <div className="text-center">
              <Button
                onClick={handleAddAchievement}
                startIcon={<Plus className="w-4 h-4" />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  backgroundColor: "transparent",
                  color: "rgba(245, 158, 11, 1)",
                  border: "2px dashed rgba(245, 158, 11, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    borderColor: "rgba(245, 158, 11, 0.5)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}>
                Add Another Achievement
              </Button>
            </div>
          </>
        )}

        {achievements.length > 0 && (
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-400/10 backdrop-blur-sm rounded-xl border border-amber-500/20 p-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-semibold text-slate-200 text-sm">
                  {achievements.length} Achievement
                  {achievements.length > 1 ? "s" : ""} Added
                </h3>
                <p className="text-slate-400 text-xs">
                  Your accomplishments are automatically saved as drafts
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementStep;
