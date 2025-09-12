import { useState, useEffect, useMemo } from "react";
import { useAppStore } from "@/stores/appStore";
import { useTemplateStore } from "@/stores/templateStore";
import { useResumeExport } from "@/hooks/useResumeExport";
import { BaseTemplate } from "./templates/BaseTemplate";
import { Button, IconButton, Tooltip } from "@mui/material";
import { ZoomIn, ZoomOut, RotateCcw, Download, Settings } from "lucide-react";

interface PreviewPanelProps {
  className?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ className = "" }) => {
  const { currentResume } = useAppStore();
  const { getSelectedTemplate, selectedTemplateId } = useTemplateStore();
  const { exportResume, isExporting, exportError } = useResumeExport();
  const [zoom, setZoom] = useState(1);

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

  const handleExport = async (format: "pdf" | "html" | "json") => {
    await exportResume(format);
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

          {/* Export Buttons */}
          <div className="flex gap-1">
            <Button
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              startIcon={<Download className="w-4 h-4" />}
              sx={{
                minWidth: "auto",
                px: 2,
                py: 1,
                background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
                color: "white",
                fontSize: "0.75rem",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
                },
                "&:disabled": { opacity: 0.6 },
              }}>
              {isExporting ? "..." : "PDF"}
            </Button>

            <Button
              onClick={() => handleExport("html")}
              disabled={isExporting}
              startIcon={<Download className="w-4 h-4" />}
              sx={{
                minWidth: "auto",
                px: 2,
                py: 1,
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                fontSize: "0.75rem",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                },
                "&:disabled": { opacity: 0.6 },
              }}>
              HTML
            </Button>

            <Button
              onClick={() => handleExport("json")}
              disabled={isExporting}
              startIcon={<Download className="w-4 h-4" />}
              sx={{
                minWidth: "auto",
                px: 2,
                py: 1,
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                color: "white",
                fontSize: "0.75rem",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #047857 0%, #059669 100%)",
                },
                "&:disabled": { opacity: 0.6 },
              }}>
              JSON
            </Button>
          </div>
        </div>
      </div>

      {/* Export Error */}
      {exportError && (
        <div className="mx-4 mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs">
          {exportError}
        </div>
      )}

      {/* Preview Content */}
      <div className="p-4 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            id="resume-preview" // 🎯 این ID خیلی مهمه!
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
