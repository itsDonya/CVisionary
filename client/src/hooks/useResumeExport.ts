import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { ResumeExporter } from "@/utils/exporters/ResumeExporter";

export const useResumeExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const { currentResume } = useAppStore();

  const exportResume = async (format: "pdf" | "html" | "json") => {
    if (!currentResume) {
      setExportError("هیچ رزومه‌ای برای export موجود نیست");
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      switch (format) {
        case "pdf":
          await ResumeExporter.exportToPDF();
          break;
        case "html":
          await ResumeExporter.exportToHTML();
          break;
        case "json":
          await exportToJSON();
          break;
        default:
          throw new Error("فرمت نامعتبر");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "خطای ناشناخته";
      setExportError(errorMessage);
      console.error("خطا در export:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    try {
      const dataStr = JSON.stringify(currentResume, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `resume-${Date.now()}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      throw new Error("خطا در export JSON");
    }
  };

  return {
    exportResume,
    isExporting,
    exportError,
  };
};
