import { useState } from "react";
import { Button, Card, CardMedia, CardContent, Chip } from "@mui/material";
import { Palette, Eye, Download, Zap, Crown, Check } from "lucide-react";

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

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (templateId: string) => {
    console.log("Preview template:", templateId);
    // Add preview logic here
  };

  const handleDownload = () => {
    console.log("Download resume with template:", selectedTemplate);
    // Add download logic here
  };

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
                        },
                        borderRadius: 1,
                        px: 2,
                        py: 0.5,
                        fontSize: "0.75rem",
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
            },
          }}>
          Preview Resume
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
    </div>
  );
};

export default TemplateStep;
