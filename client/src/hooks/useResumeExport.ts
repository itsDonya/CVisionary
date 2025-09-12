import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { useTemplateStore } from "@/stores/templateStore";
import { ResumeExporter, downloadFile } from "@/utils/exporters/ResumeExporter";

export const useResumeExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const { currentResume } = useAppStore();
  const { getSelectedTemplate, customizations } = useTemplateStore();

  const exportResume = async (format: "pdf" | "html" | "json") => {
    const selectedTemplate = getSelectedTemplate();

    if (!selectedTemplate) {
      setExportError("No template selected");
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      const customization = customizations[selectedTemplate.id];
      const exporter = new ResumeExporter(
        currentResume,
        selectedTemplate,
        customization
      );

      const firstName = currentResume.personalInfo?.firstName || "Resume";
      const lastName = currentResume.personalInfo?.lastName || "";
      const baseFilename = `${firstName}${
        lastName ? "_" + lastName : ""
      }_Resume`;

      switch (format) {
        case "pdf": {
          const pdfBlob = await exporter.exportToPDF();
          downloadFile(pdfBlob, `${baseFilename}.pdf`, "application/pdf");
          break;
        }

        case "html": {
          const htmlContent = await exporter.exportToHTML();
          const htmlBlob = new Blob([htmlContent], { type: "text/html" });
          downloadFile(htmlBlob, `${baseFilename}.html`, "text/html");
          break;
        }

        case "json": {
          const jsonContent = await exporter.exportToJSON();
          const jsonBlob = new Blob([jsonContent], {
            type: "application/json",
          });
          downloadFile(jsonBlob, `${baseFilename}.json`, "application/json");
          break;
        }

        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    } catch (error) {
      console.error("Export failed:", error);
      setExportError(error instanceof Error ? error.message : "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportResume,
    isExporting,
    exportError,
    clearError: () => setExportError(null),
  };
};
