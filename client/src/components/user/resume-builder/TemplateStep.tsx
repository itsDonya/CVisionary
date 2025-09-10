import { useState } from "react";
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

import type { Template } from "@/types/resume";

const templates: Template[] = [
  {
    id: "template-1",
    name: "Modern Professional",
    preview: "/src/assets/images/templates/1.png",
    category: "modern",
    isPremium: false,
    description: "Clean and modern design perfect for tech professionals",
    features: ["ATS Friendly", "Modern Layout", "Color Customization"],
  },
  {
    id: "template-2",
    name: "Executive Classic",
    preview: "/src/assets/images/templates/2.jpg",
    category: "classic",
    isPremium: true,
    description: "Traditional professional layout for senior positions",
    features: ["Executive Style", "Professional", "Timeless Design"],
  },
  {
    id: "template-3",
    name: "Creative Designer",
    preview: "/src/assets/images/templates/3.png",
    category: "creative",
    isPremium: false,
    description: "Eye-catching design for creative professionals",
    features: ["Creative Layout", "Portfolio Ready", "Visual Impact"],
  },
  {
    id: "template-4",
    name: "Minimal Elegance",
    preview: "/src/assets/images/templates/4.jpg",
    category: "minimal",
    isPremium: true,
    description: "Simple and elegant design that focuses on content",
    features: ["Minimal Design", "Content Focus", "Clean Typography"],
  },
];

const categoryColors = {
  modern: { bg: "#3b82f6", text: "Modern" },
  classic: { bg: "#6b7280", text: "Classic" },
  creative: { bg: "#8b5cf6", text: "Creative" },
  minimal: { bg: "#10b981", text: "Minimal" },
};

const TemplateStep = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("template-1");
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [imageZoom, setImageZoom] = useState<number>(1);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
      setImageZoom(1); // Reset zoom
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
    console.log("Download resume with template:", selectedTemplate);
    // Add download logic here
  };

  //   const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
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
          const isSelected = selectedTemplate === template.id;
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

              {/* Template Preview - Vertical Rectangle */}
              <div className="relative overflow-hidden">
                <CardMedia
                  component="img"
                  image={template.preview}
                  alt={template.name}
                  sx={{
                    height: 220,
                    width: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                />

                {/* Overlay on Hover */}
                {isHovered && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(template.id);
                      }}
                      startIcon={<Eye className="w-4 h-4" />}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "white",
                          transform: "scale(1.05)",
                        },
                        borderRadius: 1,
                        px: 2,
                        py: 0.5,
                        fontSize: "0.75rem",
                        transition: "all 0.2s ease",
                      }}>
                      Preview
                    </Button>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <CardContent sx={{ p: 2 }}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-200 text-sm truncate">
                        {template.name}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                    <Chip
                      label={categoryInfo.text}
                      size="small"
                      sx={{
                        backgroundColor: `${categoryInfo.bg}20`,
                        color: categoryInfo.bg,
                        fontSize: "0.65rem",
                        height: "20px",
                        fontWeight: 500,
                        ml: 1,
                      }}
                    />
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-slate-600/30 text-slate-300 px-1.5 py-0.5 rounded text-xs">
                        <Zap className="w-2 h-2" />
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 2 && (
                      <span className="inline-flex items-center bg-slate-600/30 text-slate-300 px-1.5 py-0.5 rounded text-xs">
                        +{template.features.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Selection Status */}
                  {isSelected && (
                    <div className="flex items-center gap-1 text-purple-400 text-xs font-medium">
                      <Check className="w-3 h-3" />
                      Selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-6">
        <Button
          onClick={() => handlePreview(selectedTemplate)}
          startIcon={<Eye className="w-4 h-4" />}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            borderColor: "rgba(148, 163, 184, 0.3)",
            color: "rgba(148, 163, 184, 1)",
            "&:hover": {
              borderColor: "rgba(139, 92, 246, 0.5)",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              color: "rgba(139, 92, 246, 1)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}>
          Preview Selected Template
        </Button>

        <Button
          onClick={handleDownload}
          startIcon={<Download className="w-4 h-4" />}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
              transform: "translateY(-1px)",
              boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
            },
            transition: "all 0.2s ease",
          }}>
          Generate Resume
        </Button>
      </div>

      {/* Template Stats */}
      <div className="bg-gradient-to-r from-slate-700/20 to-slate-800/20 backdrop-blur-sm rounded-lg border border-slate-600/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {templates.length}
            </div>
            <div className="text-slate-400 text-sm">Templates Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {templates.filter((t) => !t.isPremium).length}
            </div>
            <div className="text-slate-400 text-sm">Free Templates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-1">
              {templates.filter((t) => t.isPremium).length}
            </div>
            <div className="text-slate-400 text-sm">Premium Templates</div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(51, 65, 85, 0.3)",
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}>
        <DialogTitle sx={{ p: 0 }}>
          <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-lg border border-purple-500/30">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-200">
                  {previewTemplate?.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Chip
                    label={
                      categoryColors[previewTemplate?.category || "modern"].text
                    }
                    size="small"
                    sx={{
                      backgroundColor: `${
                        categoryColors[previewTemplate?.category || "modern"].bg
                      }20`,
                      color:
                        categoryColors[previewTemplate?.category || "modern"]
                          .bg,
                      fontSize: "0.7rem",
                      height: "22px",
                    }}
                  />
                  {previewTemplate?.isPremium && (
                    <Chip
                      label="Premium"
                      size="small"
                      icon={<Crown className="w-3 h-3" />}
                      sx={{
                        backgroundColor: "rgba(251, 191, 36, 0.2)",
                        color: "#fbbf24",
                        fontSize: "0.7rem",
                        height: "22px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg p-1">
                <IconButton
                  onClick={handleZoomOut}
                  disabled={imageZoom <= 0.5}
                  size="small"
                  sx={{
                    color: "rgba(148, 163, 184, 1)",
                    "&:hover": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
                  }}>
                  <ZoomOut className="w-4 h-4" />
                </IconButton>

                <span className="text-slate-400 text-sm min-w-[60px] text-center">
                  {Math.round(imageZoom * 100)}%
                </span>

                <IconButton
                  onClick={handleZoomIn}
                  disabled={imageZoom >= 3}
                  size="small"
                  sx={{
                    color: "rgba(148, 163, 184, 1)",
                    "&:hover": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
                  }}>
                  <ZoomIn className="w-4 h-4" />
                </IconButton>

                <IconButton
                  onClick={handleResetZoom}
                  size="small"
                  sx={{
                    color: "rgba(148, 163, 184, 1)",
                    "&:hover": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
                  }}>
                  <RotateCcw className="w-4 h-4" />
                </IconButton>
              </div>

              <IconButton
                onClick={handleClosePreview}
                sx={{
                  color: "rgba(148, 163, 184, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                  },
                }}>
                <X className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
        </DialogTitle>

        <DialogContent sx={{ p: 0, overflow: "hidden" }}>
          <div className="p-6">
            {/* Template Description */}
            <div className="mb-6 p-4 bg-gradient-to-r from-slate-700/20 to-slate-800/20 rounded-lg border border-slate-600/30">
              <p className="text-slate-300 mb-3">
                {previewTemplate?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {previewTemplate?.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-slate-600/30 text-slate-300 px-2 py-1 rounded text-sm">
                    <Zap className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Template Image Preview */}
            <div
              className="flex justify-center overflow-auto max-h-[60vh] bg-slate-900/50 rounded-lg p-4"
              style={{ scrollbarWidth: "thin" }}>
              {previewTemplate && (
                <img
                  src={previewTemplate.preview}
                  alt={previewTemplate.name}
                  style={{
                    transform: `scale(${imageZoom})`,
                    transition: "transform 0.3s ease",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  }}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-600/30">
              <Button
                onClick={() => {
                  if (previewTemplate) {
                    handleTemplateSelect(previewTemplate.id);
                    handleClosePreview();
                  }
                }}
                startIcon={<Check className="w-4 h-4" />}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  color: "rgba(139, 92, 246, 1)",
                  "&:hover": {
                    borderColor: "rgba(139, 92, 246, 0.8)",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                }}>
                Select This Template
              </Button>

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
