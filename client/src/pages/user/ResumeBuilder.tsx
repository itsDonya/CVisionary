import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Save,
  Award,
  Palette,
  Eye,
  Download,
  Settings,
} from "lucide-react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppStore } from "@/stores/appStore";
import { useTemplateStore } from "@/stores/templateStore";
import { useResumeExport } from "@/hooks/useResumeExport";

// components
import PersonalInfoStep from "@/components/user/resume-builder/PersonalInfoStep";
import ExperienceStep from "@/components/user/resume-builder/ExperienceStep";
import EducationStep from "@/components/user/resume-builder/EducationStep";
import SkillsStep from "@/components/user/resume-builder/SkillsStep";
import AchievementStep from "@/components/user/resume-builder/AchievementStep";
import TemplateStep from "@/components/user/resume-builder/TemplateStep";
import PreviewPanel from "@/components/user/resume-builder/PreviewPanel";
import TemplateCustomizer from "@/components/user/resume-builder/TemplateCustomizer";

const steps = [
  {
    id: "personal",
    title: "Personal Info",
    icon: User,
    description: "Basic information",
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    description: "Work history",
  },
  {
    id: "achievement",
    title: "Achievement",
    icon: Award,
    description: "Professional Achievements",
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "Academic background",
  },
  {
    id: "skills",
    title: "Skills",
    icon: Wrench,
    description: "Technical & soft skills",
  },
  {
    id: "template",
    title: "Template",
    icon: Palette,
    description: "Choose a template & customize",
  },
];

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentResume,
    createResume,
    loadResume,
    saveCurrentResume,
    isLoading,
    error,
  } = useAppStore();

  const { selectedTemplateId, getSelectedTemplate } = useTemplateStore();
  const { exportResume, isExporting, exportError } = useResumeExport();

  const [activeStep, setActiveStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showCustomizer, setShowCustomizer] = useState(false);

  useEffect(() => {
    if (id && id !== "create") {
      loadResume(id);
    } else {
      createResume();
    }
  }, [id, loadResume, createResume]);

  const selectedTemplate = getSelectedTemplate();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCurrentResume();
      // Show success message
    } catch (error) {
      console.error("Failed to save resume:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const handleExport = (format: "pdf" | "html" | "json") => {
    exportResume(format);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <ExperienceStep />;
      case 2:
        return <AchievementStep />;
      case 3:
        return <EducationStep />;
      case 4:
        return <SkillsStep />;
      case 5:
        return <TemplateStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-slate-400">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-red-400">
            Error Loading Resume
          </h2>
          <p className="text-slate-400">{error}</p>
          <button
            onClick={() => navigate("/panel")}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Main Content */}
        <div
          className={`transition-all duration-300 ${
            // showPreview ? "w-1/2" : "w-full"
            "w-full"
          }`}>
          <div className="max-w-4xlss wf-ull mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-xl border border-purple-500/30">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {currentResume.title || "New Resume"}
                    </h1>
                    <p className="text-slate-400 text-sm">
                      Step {activeStep + 1} of {steps.length} -{" "}
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {selectedTemplate && (
                    <>
                      <Tooltip title="Customize Template">
                        <IconButton
                          onClick={() => setShowCustomizer(true)}
                          sx={{ color: "white" }}>
                          <Settings className="w-4 h-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Toggle Preview">
                        <IconButton
                          onClick={() => setShowPreview(!showPreview)}
                          sx={{ color: "white" }}>
                          <Eye className="w-4 h-4" />
                        </IconButton>
                      </Tooltip>

                      <Button
                        onClick={() => handleExport("pdf")}
                        disabled={isExporting}
                        startIcon={<Download className="w-4 h-4" />}
                        sx={{
                          minWidth: "auto",
                          px: 2,
                          py: 1,
                          background:
                            "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
                          color: "white",
                          fontSize: "0.75rem",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                          },
                          "&:disabled": {
                            opacity: 0.6,
                          },
                        }}>
                        {isExporting ? "Exporting..." : "Export PDF"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;

                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`relative flex items-center cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "scale-110"
                            : "hover:scale-105 opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => handleStepClick(index)}>
                        <div
                          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-purple-500/20 to-cyan-400/20 border-purple-500/50 text-white shadow-lg shadow-purple-500/25"
                              : isCompleted
                              ? "bg-gradient-to-br from-green-500/20 to-emerald-400/20 border-green-500/50 text-green-400"
                              : "bg-slate-700/50 border-slate-600/50 text-slate-400 hover:border-slate-500/50"
                          }`}>
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                          <h3
                            className={`font-medium text-sm transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : isCompleted
                                ? "text-green-400"
                                : "text-slate-400"
                            }`}>
                            {step.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-px mx-4">
                          <div
                            className={`h-full transition-all duration-500 ${
                              index < activeStep
                                ? "bg-gradient-to-r from-green-500 to-green-400"
                                : "bg-slate-700"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">{renderStepContent()}</div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ChevronLeft className="w-4 h-4" />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    color: activeStep === 0 ? "#64748b" : "white",
                    borderColor:
                      activeStep === 0 ? "#64748b" : "rgba(255,255,255,0.3)",
                    "&:hover": {
                      borderColor:
                        activeStep === 0 ? "#64748b" : "rgba(255,255,255,0.5)",
                      backgroundColor:
                        activeStep === 0
                          ? "transparent"
                          : "rgba(255,255,255,0.1)",
                    },
                  }}
                  variant="outlined">
                  Previous
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    startIcon={<Save className="w-4 h-4" />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: "#374151",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#4b5563",
                        transform: "translateY(-1px)",
                      },
                      "&:disabled": {
                        opacity: 0.6,
                      },
                    }}>
                    {isSaving ? "Saving..." : "Save Draft"}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                    endIcon={<ChevronRight className="w-4 h-4" />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background:
                        activeStep === steps.length - 1
                          ? "#374151"
                          : "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
                      color: "white",
                      "&:hover":
                        activeStep === steps.length - 1
                          ? {}
                          : {
                              background:
                                "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                              transform: "translateY(-1px)",
                              boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                            },
                      transition: "all 0.2s ease",
                    }}>
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Export Error */}
            {exportError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{exportError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {/* {showPreview && (
          <div className="w-1/2 border-l border-slate-700/50">
            <div className="sticky top-0 h-screen overflow-auto">
              <PreviewPanel className="h-full" />
            </div>
          </div>
        )} */}
      </div>

      {/* Template Customizer Dialog */}
      {selectedTemplate && (
        <TemplateCustomizer
          open={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          templateId={selectedTemplate.id}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
