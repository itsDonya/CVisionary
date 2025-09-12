import { useState, useEffect, useMemo } from "react";
import { useAppStore } from "@/stores/appStore";
import { useTemplateStore } from "@/stores/templateStore";
import { BaseTemplate } from "./templates/BaseTemplate";
import { Button, IconButton, Tooltip } from "@mui/material";
import { ZoomIn, ZoomOut, RotateCcw, Download, Settings } from "lucide-react";

interface PreviewPanelProps {
  className?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ className = "" }) => {
  const { currentResume } = useAppStore();
  const { getSelectedTemplate, selectedTemplateId } = useTemplateStore();
  const [zoom, setZoom] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  const selectedTemplate = useMemo(() => {
    return getSelectedTemplate();
  }, [selectedTemplateId, getSelectedTemplate]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleExport = async () => {
    if (!selectedTemplate) return;

    setIsExporting(true);
    try {
      // اینجا منطق export اضافه کنید
      console.log("Exporting resume with template:", selectedTemplate.id);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!selectedTemplate) {
    return (
      <div
        className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 ${className}`}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
            <Settings className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              No Template Selected
            </h3>
            <p className="text-slate-400 text-sm">
              Choose a template to see your resume preview
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 ${className}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div>
          <h3 className="font-semibold text-white">{selectedTemplate.name}</h3>
          <p className="text-sm text-slate-400">Live Preview</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-700/30 rounded-lg p-1">
            <Tooltip title="Zoom Out">
              <IconButton
                size="small"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                sx={{ color: "white" }}>
                <ZoomOut className="w-4 h-4" />
              </IconButton>
            </Tooltip>

            <span className="text-xs text-slate-300 px-2">
              {Math.round(zoom * 100)}%
            </span>

            <Tooltip title="Zoom In">
              <IconButton
                size="small"
                onClick={handleZoomIn}
                disabled={zoom >= 2}
                sx={{ color: "white" }}>
                <ZoomIn className="w-4 h-4" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reset Zoom">
              <IconButton
                size="small"
                onClick={handleResetZoom}
                sx={{ color: "white" }}>
                <RotateCcw className="w-4 h-4" />
              </IconButton>
            </Tooltip>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            disabled={isExporting}
            startIcon={<Download className="w-4 h-4" />}
            sx={{
              minWidth: "auto",
              px: 2,
              py: 1,
              background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
              color: "white",
              fontSize: "0.75rem",
              "&:hover": {
                background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
              },
              "&:disabled": {
                opacity: 0.6,
              },
            }}>
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              transition: "transform 0.2s ease",
            }}>
            <BaseTemplate
              template={selectedTemplate}
              resume={currentResume}
              isPreview={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
