import { useState } from "react";
import { TextField, Avatar, Button } from "@mui/material";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  FileText,
  Briefcase,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";

const PersonalInfoStep = () => {
  const { currentResume, updatePersonalInfo } = useAppStore();
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        updatePersonalInfo({ photo: photoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        updatePersonalInfo({ photo: photoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-xl border border-purple-500/30">
            <User className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Personal Information
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          Let's start with your basic information and contact details
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Upload className="w-4 h-4" />
          Profile Photo
          <span className="text-slate-500">(Optional)</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <Avatar
              src={currentResume.personalInfo.photo}
              sx={{
                width: 120,
                height: 120,
                border: "3px solid",
                borderColor: "rgba(139, 92, 246, 0.3)",
                backgroundColor: "rgba(51, 65, 85, 0.5)",
                fontSize: "2rem",
                color: "rgba(168, 162, 158, 1)",
              }}>
              <User size={48} />
            </Avatar>
          </div>

          <div
            className={`flex-1 min-w-0 p-6 border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer
              ${
                dragActive
                  ? "border-purple-400 bg-purple-500/10 scale-105"
                  : "border-slate-600/50 bg-gradient-to-br from-purple-500/5 to-cyan-400/5"
              } backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/10`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById("photo-upload")?.click()}>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-300 font-medium">
                  {dragActive
                    ? "Drop your photo here"
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />

          {currentResume.personalInfo.photo && (
            <Button
              onClick={() => updatePersonalInfo({ photo: undefined })}
              sx={{
                color: "rgba(248, 113, 113, 1)",
                borderColor: "rgba(248, 113, 113, 0.3)",
                "&:hover": {
                  borderColor: "rgba(248, 113, 113, 0.5)",
                  backgroundColor: "rgba(248, 113, 113, 0.1)",
                },
              }}
              variant="outlined"
              size="small">
              Remove
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <User className="w-4 h-4" />
            Full Name *
          </label>
          <TextField
            fullWidth
            placeholder="Enter your full name"
            value={currentResume.personalInfo.fullName || ""}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            InputProps={{
              startAdornment: <User className="w-4 h-4 text-slate-400 mr-3" />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(51, 65, 85, 0.3)",
                "& fieldset": {
                  borderColor: "rgba(51, 65, 85, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(139, 92, 246, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(139, 92, 246, 0.8)",
                  borderWidth: 2,
                },
                "& input": {
                  color: "rgba(241, 245, 249, 1)",
                  fontSize: "0.95rem",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.7)",
                    opacity: 1,
                  },
                },
              },
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Mail className="w-4 h-4" />
            Email Address *
          </label>
          <TextField
            fullWidth
            type="email"
            placeholder="your.email@example.com"
            value={currentResume.personalInfo.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            InputProps={{
              startAdornment: <Mail className="w-4 h-4 text-slate-400 mr-3" />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(51, 65, 85, 0.3)",
                "& fieldset": {
                  borderColor: "rgba(51, 65, 85, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(34, 197, 94, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(34, 197, 94, 0.8)",
                  borderWidth: 2,
                },
                "& input": {
                  color: "rgba(241, 245, 249, 1)",
                  fontSize: "0.95rem",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.7)",
                    opacity: 1,
                  },
                },
              },
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Phone className="w-4 h-4" />
            Phone Number
          </label>
          <TextField
            fullWidth
            placeholder="+1 (555) 123-4567"
            value={currentResume.personalInfo.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            InputProps={{
              startAdornment: <Phone className="w-4 h-4 text-slate-400 mr-3" />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(51, 65, 85, 0.3)",
                "& fieldset": {
                  borderColor: "rgba(51, 65, 85, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.8)",
                  borderWidth: 2,
                },
                "& input": {
                  color: "rgba(241, 245, 249, 1)",
                  fontSize: "0.95rem",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.7)",
                    opacity: 1,
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
            placeholder="City, State/Country"
            value={currentResume.personalInfo.location || ""}
            onChange={(e) => handleInputChange("location", e.target.value)}
            InputProps={{
              startAdornment: (
                <MapPin className="w-4 h-4 text-slate-400 mr-3" />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(51, 65, 85, 0.3)",
                "& fieldset": {
                  borderColor: "rgba(51, 65, 85, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(236, 72, 153, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(236, 72, 153, 0.8)",
                  borderWidth: 2,
                },
                "& input": {
                  color: "rgba(241, 245, 249, 1)",
                  fontSize: "0.95rem",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.7)",
                    opacity: 1,
                  },
                },
              },
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Globe className="w-4 h-4" />
            Website/Portfolio
          </label>
          <TextField
            fullWidth
            placeholder="https://yourwebsite.com"
            value={currentResume.personalInfo.website || ""}
            onChange={(e) => handleInputChange("website", e.target.value)}
            InputProps={{
              startAdornment: <Globe className="w-4 h-4 text-slate-400 mr-3" />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(51, 65, 85, 0.3)",
                "& fieldset": {
                  borderColor: "rgba(51, 65, 85, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(34, 211, 238, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(34, 211, 238, 0.8)",
                  borderWidth: 2,
                },
                "& input": {
                  color: "rgba(241, 245, 249, 1)",
                  fontSize: "0.95rem",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.7)",
                    opacity: 1,
                  },
                },
              },
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Briefcase className="w-4 h-4" />
            Job Title
          </label>
          <TextField
            fullWidth
            placeholder="e.g. Senior Frontend Developer"
            value={currentResume.personalInfo.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
            InputProps={{
              startAdornment: (
                <Briefcase className="w-4 h-4 text-slate-400 mr-3" />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(51, 65, 85, 0.3)",
                "& fieldset": {
                  borderColor: "rgba(51, 65, 85, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.8)",
                  borderWidth: 2,
                },
                "& input": {
                  color: "rgba(241, 245, 249, 1)",
                  fontSize: "0.95rem",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.7)",
                    opacity: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <FileText className="w-4 h-4" />
          Professional Summary
          <span className="text-slate-500">(Optional)</span>
        </label>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Write a brief summary about yourself, your experience, and your career goals..."
          value={currentResume.personalInfo.summary || ""}
          onChange={(e) => handleInputChange("summary", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "rgba(51, 65, 85, 0.3)",
              "& fieldset": {
                borderColor: "rgba(51, 65, 85, 0.7)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(139, 92, 246, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(139, 92, 246, 0.8)",
                borderWidth: 2,
              },
              "& textarea": {
                color: "rgba(241, 245, 249, 1)",
                fontSize: "0.95rem",
                "&::placeholder": {
                  color: "rgba(148, 163, 184, 0.7)",
                  opacity: 1,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
