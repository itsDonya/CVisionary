import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { useTemplateStore } from "@/stores/templateStore";
import { ResumeExporter } from "@/utils/exporters/ResumeExporter";

export const useResumeExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const { currentResume } = useAppStore();
  const { getSelectedTemplate, customizations } = useTemplateStore();

  const exportResume = async (format: "pdf" | "html" | "json") => {
    if (!currentResume) {
      setExportError("No resume data available");
      return;
    }

    const selectedTemplate = getSelectedTemplate();
    if (!selectedTemplate && format !== "json") {
      setExportError("No template selected");
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      if (format === "pdf") {
        // راه حل خاص برای PDF
        await exportToPDFSafe();
      } else {
        // برای HTML و JSON از exporter عادی استفاده کن
        const exporter = new ResumeExporter(
          currentResume,
          selectedTemplate!,
          customizations[selectedTemplate?.id || ""]
        );

        if (format === "html") {
          const htmlContent = await exporter.exportToHTML();
          downloadFile(
            new Blob([htmlContent], { type: "text/html" }),
            `${currentResume.title || "resume"}.html`,
            "text/html"
          );
        } else if (format === "json") {
          const jsonContent = await exporter.exportToJSON();
          downloadFile(
            new Blob([jsonContent], { type: "application/json" }),
            `${currentResume.title || "resume"}.json`,
            "application/json"
          );
        }
      }
    } catch (error) {
      console.error(`Export failed:`, error);
      setExportError(error instanceof Error ? error.message : "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  // تابع خاص برای PDF که CSS مدرن رو handle میکنه
  const exportToPDFSafe = async () => {
    try {
      // 1. پیدا کردن المنت preview
      const previewElement = document.getElementById("resume-preview");

      if (!previewElement) {
        throw new Error(
          "Resume preview not found. Please make sure preview panel is visible."
        );
      }

      // 2. پیدا کردن المنت اصلی رزومه
      const resumeElement =
        previewElement.querySelector(".resume-template") ||
        previewElement.querySelector(".creative-template") ||
        previewElement.querySelector("[data-template-id]") ||
        previewElement.firstElementChild;

      if (!resumeElement) {
        throw new Error("Resume content not found");
      }

      // 3. ایجاد یک نسخه کلین از المنت
      const cleanElement = createCleanResumeElement(
        resumeElement as HTMLElement
      );

      // 4. اضافه کردن به DOM موقتی
      document.body.appendChild(cleanElement);

      // 5. import های dynamic
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      try {
        // 6. تنظیمات خیلی محافظه‌کارانه برای html2canvas
        const canvas = await html2canvas(cleanElement, {
          scale: 1.2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          width: 794,
          height: 1123,
          scrollX: 0,
          scrollY: 0,
          logging: false,
          // غیرفعال کردن rendering های پیچیده
          foreignObjectRendering: false,
          imageTimeout: 15000,
          removeContainer: false,
          // فیلتر کردن المنت های مشکل دار
          ignoreElements: (element) => {
            const tagName = element.tagName.toLowerCase();
            const classList = element.classList;

            // المنت هایی که مشکل ایجاد میکنن رو نادیده بگیر
            return (
              tagName === "script" ||
              tagName === "style" ||
              classList?.contains("backdrop-blur") ||
              classList?.contains("backdrop-filter") ||
              element.style?.backdropFilter ||
              false
            );
          },
        });

        // 7. ساخت PDF
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // اضافه کردن صفحه اول
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // اگر محتوا بیشتر از یک صفحه بود، صفحات بعدی رو اضافه کن
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // 8. دانلود فایل
        const blob = pdf.output("blob");
        downloadFile(
          blob,
          `${currentResume.title || "resume"}.pdf`,
          "application/pdf"
        );

        console.log("✅ PDF exported successfully");
      } finally {
        // 9. پاک کردن المنت موقتی
        if (document.body.contains(cleanElement)) {
          document.body.removeChild(cleanElement);
        }
      }
    } catch (error) {
      console.error("❌ PDF Export Error:", error);
      throw new Error(
        `PDF export failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return {
    exportResume,
    isExporting,
    exportError,
  };
};

// تابع برای ساخت المنت کلین
function createCleanResumeElement(originalElement: HTMLElement): HTMLElement {
  const cloned = originalElement.cloneNode(true) as HTMLElement;

  // استایل container اصلی
  cloned.style.cssText = `
    position: absolute;
    top: -10000px;
    left: -10000px;
    width: 794px !important;
    min-height: 1123px !important;
    max-width: 794px !important;
    background: white !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif !important;
    color: #1f2937 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
    transform: none !important;
    filter: none !important;
    backdrop-filter: none !important;
    box-shadow: none !important;
  `;

  // پاک کردن تمام CSS مدرن
  cleanAllModernCSS(cloned);

  return cloned;
}

function cleanAllModernCSS(element: HTMLElement): void {
  // تابع recursive برای پاک کردن CSS مدرن
  const processElement = (el: HTMLElement) => {
    const style = el.style;
    const computedStyle = window.getComputedStyle(el);

    // لیست property هایی که باید پاک شن
    const problematicProps = [
      "backdrop-filter",
      "filter",
      "transform",
      "transition",
      "animation",
      "box-shadow",
      "text-shadow",
    ];

    // پاک کردن property های مشکل دار
    problematicProps.forEach((prop) => {
      style.removeProperty(prop);
    });

    // تبدیل رنگ های مدرن به ساده
    if (style.backgroundColor) {
      if (
        style.backgroundColor.includes("oklch") ||
        style.backgroundColor.includes("hsl") ||
        style.backgroundColor.includes("rgb(") ||
        style.backgroundColor.includes("rgba(")
      ) {
        // تشخیص رنگ و جایگزینی
        if (
          style.backgroundColor.includes("purple") ||
          computedStyle.backgroundColor.includes("139, 92, 246")
        ) {
          style.backgroundColor = "#8b5cf6";
        } else if (style.backgroundColor.includes("blue")) {
          style.backgroundColor = "#3b82f6";
        } else if (
          style.backgroundColor.includes("gray") ||
          style.backgroundColor.includes("slate")
        ) {
          style.backgroundColor = "#6b7280";
        } else {
          style.backgroundColor = "#ffffff";
        }
      }
    }

    // تبدیل رنگ متن
    if (style.color) {
      if (
        style.color.includes("oklch") ||
        style.color.includes("hsl") ||
        style.color.includes("rgb")
      ) {
        style.color = "#1f2937";
      }
    }

    // حذف gradient ها
    if (style.background && style.background.includes("gradient")) {
      if (style.background.includes("purple")) {
        style.background = "#8b5cf6";
      } else if (style.background.includes("blue")) {
        style.background = "#3b82f6";
      } else {
        style.background = "#ffffff";
      }
    }

    // حذف CSS variables
    Array.from(style).forEach((prop) => {
      if (prop.startsWith("--")) {
        style.removeProperty(prop);
      }
    });

    // حذف کلاس های مشکل دار
    const problematicClasses = [
      "backdrop-blur",
      "backdrop-filter",
      "bg-gradient",
      "from-",
      "to-",
      "via-",
    ];

    problematicClasses.forEach((className) => {
      Array.from(el.classList).forEach((cls) => {
        if (cls.includes(className)) {
          el.classList.remove(cls);
        }
      });
    });

    // پردازش فرزندان
    Array.from(el.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        processElement(child);
      }
    });
  };

  processElement(element);
}

// تابع helper برای دانلود
function downloadFile(blob: Blob, filename: string, mimeType: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // پاک کردن URL بعد از مدتی
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
