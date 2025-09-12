import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Zoom,
} from "@mui/material";
import {
  Palette,
  Eye,
  Download,
  Zap,
  Crown,
  Check,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

import { useTemplateStore } from "@/stores/templateStore";
import type { Template } from "@/types/resume";

const categoryColors = {
  modern: { bg: "#3b82f6", text: "Modern" },
  classic: { bg: "#6b7280", text: "Classic" },
  creative: { bg: "#8b5cf6", text: "Creative" },
  minimal: { bg: "#10b981", text: "Minimal" },
};

const TemplateStep = () => {
  const {
    templates,
    selectedTemplateId,
    selectTemplate,
    loadTemplates,
    isLoading,
  } = useTemplateStore();

  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [imageZoom, setImageZoom] = useState<number>(1);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleTemplateSelect = (templateId: string) => {
    selectTemplate(templateId);
  };

  const handlePreview = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
      setImageZoom(1);
      setPreviewOpen(true);
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewTemplate(null);
    setImageZoom(1);
  };

  const handleZoomIn = () => {
    setImageZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setImageZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setImageZoom(1);
  };

  const handleDownload = () => {
    if (selectedTemplateId) {
      console.log("Generate resume with template:", selectedTemplateId);
      // اینجا منطق تولید رزومه اضافه کنید
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-slate-400 mt-2">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* باقی کد مثل قبل... */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-lg border border-purple-500/30">
            <Palette className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Template
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          Select a professional template that matches your style and industry
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          const isHovered = hoveredTemplate === template.id;
          const categoryInfo = categoryColors[template.category];

          return (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "ring-2 ring-purple-400 bg-gradient-to-br from-slate-700/40 to-slate-800/40"
                  : "bg-gradient-to-br from-slate-700/30 to-slate-800/30 hover:from-slate-700/40 hover:to-slate-800/40"
              }`}
              sx={{
                borderRadius: 2,
                border: "1px solid rgba(51, 65, 85, 0.3)",
                backdropFilter: "blur(10px)",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => handleTemplateSelect(template.id)}>
              {/* Premium Badge */}
              {template.isPremium && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    Premium
                  </div>
                </div>
              )}

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-purple-500 text-white p-1 rounded-md">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              )}

              {/* Template Preview Image */}
              <CardMedia
                component="div"
                sx={{
                  height: 240,
                  backgroundImage: `url(${template.preview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.3s ease",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  position: "relative",
                }}>
                {/* Hover Overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(template.id);
                      }}
                      startIcon={<Eye className="w-4 h-4" />}
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                      variant="outlined">
                      Preview
                    </Button>
                  </div>
                )}
              </CardMedia>

              <CardContent sx={{ p: 2 }}>
                <div className="space-y-2">
                  {/* Template Name */}
                  <h3 className="font-medium text-white text-sm truncate">
                    {template.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {template.description}
                  </p>

                  {/* Category */}
                  <Chip
                    label={categoryInfo.text}
                    size="small"
                    sx={{
                      backgroundColor: categoryInfo.bg,
                      color: "white",
                      fontSize: "0.7rem",
                      height: 20,
                    }}
                  />

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 text-xs text-slate-300">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {template.features.length > 2 && (
                      <span className="text-xs text-slate-400">
                        +{template.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Selected Status */}
                  {isSelected && (
                    <div className="flex items-center gap-1 text-xs text-purple-400">
                      <Check className="w-3 h-3" />
                      <span>Selected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button
          onClick={() =>
            selectedTemplateId && handlePreview(selectedTemplateId)
          }
          disabled={!selectedTemplateId}
          startIcon={<Eye className="w-4 h-4" />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            borderColor: "rgba(139, 92, 246, 0.5)",
            color: selectedTemplateId ? "#a855f7" : "#64748b",
            "&:hover": {
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
            },
          }}
          variant="outlined">
          Preview Selected Template
        </Button>

        <Button
          onClick={handleDownload}
          disabled={!selectedTemplateId}
          startIcon={<Download className="w-4 h-4" />}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            background: selectedTemplateId
              ? "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
              : "#374151",
            color: "white",
            "&:hover": selectedTemplateId
              ? {
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                }
              : {},
            transition: "all 0.2s ease",
          }}>
          Generate with This Template
        </Button>
      </div>

      {/* Template Stats */}
      <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-xl border border-slate-600/30 p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-400">
              {templates.length}
            </div>
            <div className="text-sm text-slate-400">Total Templates</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-400">
              {templates.filter((t) => !t.isPremium).length}
            </div>
            <div className="text-sm text-slate-400">Free Templates</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-400">
              {templates.filter((t) => t.isPremium).length}
            </div>
            <div className="text-sm text-slate-400">Premium Templates</div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1e293b",
            backgroundImage: "none",
            border: "1px solid rgba(51, 65, 85, 0.3)",
          },
        }}>
        <DialogTitle
          sx={{
            color: "white",
            borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <span>{previewTemplate?.name} Preview</span>
          <div className="flex gap-2">
            <IconButton onClick={handleZoomOut} sx={{ color: "white" }}>
              <ZoomOut className="w-4 h-4" />
            </IconButton>
            <IconButton onClick={handleResetZoom} sx={{ color: "white" }}>
              <RotateCcw className="w-4 h-4" />
            </IconButton>
            <IconButton onClick={handleZoomIn} sx={{ color: "white" }}>
              <ZoomIn className="w-4 h-4" />
            </IconButton>
            <IconButton onClick={handleClosePreview} sx={{ color: "white" }}>
              <X className="w-4 h-4" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent sx={{ p: 3, textAlign: "center" }}>
          {previewTemplate && (
            <div style={{ overflow: "auto", maxHeight: "70vh" }}>
              <Zoom in={previewOpen}>
                <img
                  src={previewTemplate.preview}
                  alt={previewTemplate.name}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    transform: `scale(${imageZoom})`,
                    transition: "transform 0.3s ease",
                    border: "1px solid rgba(51, 65, 85, 0.3)",
                    borderRadius: 8,
                  }}
                />
              </Zoom>
            </div>
          )}
          <div className="mt-4 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                {previewTemplate?.name}
              </h3>
              <p className="text-slate-400 text-sm">
                {previewTemplate?.description}
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleDownload}
                startIcon={<Download className="w-4 h-4" />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                  },
                  transition: "all 0.2s ease",
                }}>
                Generate with This Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateStep;
