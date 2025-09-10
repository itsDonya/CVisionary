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
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";

// steps
import PersonalInfoStep from "@/components/user/resume-builder/PersonalInfoStep";
import ExperienceStep from "@/components/user/resume-builder/ExperienceStep";
import EducationStep from "@/components/user/resume-builder/EducationStep";
import SkillsStep from "@/components/user/resume-builder/SkillsStep";
import AchievementStep from "@/components/user/resume-builder/AchievementStep";

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
    description: "Proessional Achievements",
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

  const [activeStep, setActiveStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id && id !== "create") {
      loadResume(id);
    } else {
      createResume();
    }
  }, [id, loadResume, createResume]);

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
      // show success message here
    } catch (error) {
      console.error("Failed to save resume:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
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
            onClick={() => navigate("/panel/resumes")}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Back to Resumes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
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
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => handleStepClick(index)}>
                    <div
                      className={`
                      relative w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-br from-purple-500 to-cyan-400 border-transparent text-white shadow-lg scale-110"
                          : isCompleted
                          ? "bg-gradient-to-br from-green-500/20 to-emerald-400/20 border-green-500/50 text-green-400"
                          : "bg-slate-700/50 border-slate-600/30 text-slate-400 group-hover:border-purple-500/50 group-hover:text-purple-400"
                      }
                    `}>
                      <StepIcon className="w-5 h-5" />
                      {isActive && (
                        <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-xl blur-sm"></div>
                      )}
                    </div>

                    <div className="mt-2 text-center">
                      <p
                        className={`text-sm font-medium transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-300"
                        }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 relative">
                      <div className="absolute inset-0 bg-slate-700/30 rounded-full"></div>
                      {index < activeStep && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 min-h-[600px]">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
              ${
                activeStep === 0
                  ? "bg-slate-700/30 text-slate-500 cursor-not-allowed"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white"
              }
            `}>
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
                ${
                  isSaving
                    ? "bg-slate-700/50 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500 shadow-lg hover:shadow-purple-500/25"
                }
              `}>
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
              ${
                activeStep === steps.length - 1
                  ? "bg-slate-700/30 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500 shadow-lg hover:shadow-purple-500/25"
              }
            `}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
