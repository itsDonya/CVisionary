import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import type { Resume, Template } from "@/types/resume";

export class ResumeExporter {
  private resume: Resume;
  private template: Template;
  private customization?: any;

  constructor(resume: Resume, template: Template, customization?: any) {
    this.resume = resume;
    this.template = template;
    this.customization = customization;
  }

  async exportToPDF(): Promise<Blob> {
    try {
      const previewElement = document.getElementById("resume-preview");

      if (!previewElement) {
        throw new Error("Preview element not found");
      }

      // تنظیمات خیلی محافظه‌کارانه
      const canvas = await html2canvas(previewElement, {
        scale: 1.5, // کمتر کردیم
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        foreignObjectRendering: false,
        // فقط محتوای ساده
        onclone: (clonedDoc) => {
          // تمام gradient ها و CSS مدرن رو حذف کن
          const allElements = clonedDoc.getElementsByTagName("*");
          for (let element of Array.from(allElements)) {
            if (element instanceof HTMLElement) {
              const style = element.style;

              // هر چیزی که oklch داره رو پاک کن
              for (let prop of Array.from(style)) {
                if (style.getPropertyValue(prop).includes("oklch")) {
                  style.removeProperty(prop);
                }
              }

              // رنگ‌های ساده بذار
              if (element.classList.contains("bg-gradient-to-r")) {
                element.style.background = "#8b5cf6";
              }
            }
          }
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

      return pdf.output("blob");
    } catch (error) {
      console.error("PDF export failed:", error);
      throw new Error(`PDF Export Error: ${error}`);
    }
  }

  // المنت کلون شده با استایل‌های ساده
  private createCleanElement(element: HTMLElement): HTMLElement {
    const cloned = element.cloneNode(true) as HTMLElement;

    // استایل‌های inline مشکل‌دار رو پاک کن
    this.cleanModernCSS(cloned);

    // استایل‌های ساده اضافه کن
    cloned.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 794px;
      min-height: 1123px;
      background: white;
      font-family: Arial, sans-serif;
      color: #333;
      padding: 0;
      margin: 0;
    `;

    return cloned;
  }

  private cleanModernCSS(element: HTMLElement): void {
    // تمام المنت‌ها و فرزندانشون رو پاک کن
    const walkElements = (el: HTMLElement) => {
      // استایل‌های مشکل‌دار رو حذف کن
      const style = el.style;

      // oklch, hsl(), rgb() مدرن و ... رو با رنگ‌های ساده جایگزین کن
      if (
        style.backgroundColor &&
        (style.backgroundColor.includes("oklch") ||
          style.backgroundColor.includes("hsl") ||
          style.backgroundColor.includes("rgb"))
      ) {
        if (
          style.backgroundColor.includes("purple") ||
          style.backgroundColor.includes("violet")
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

      if (
        style.color &&
        (style.color.includes("oklch") ||
          style.color.includes("hsl") ||
          style.color.includes("rgb"))
      ) {
        style.color = "#333333";
      }

      // gradient ها رو ساده کن
      if (style.background && style.background.includes("gradient")) {
        if (style.background.includes("purple")) {
          style.background = "#8b5cf6";
        } else if (style.background.includes("blue")) {
          style.background = "#3b82f6";
        } else {
          style.background = "#ffffff";
        }
      }

      // backdrop-filter رو حذف کن
      if (style.backdropFilter) {
        style.backdropFilter = "none";
      }

      // CSS custom properties رو حذف کن
      Array.from(style).forEach((prop) => {
        if (prop.startsWith("--")) {
          style.removeProperty(prop);
        }
      });

      // فرزندان رو هم پردازش کن
      Array.from(el.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          walkElements(child);
        }
      });
    };

    walkElements(element);
  }

  async exportToHTML(): Promise<string> {
    try {
      const previewElement = document.getElementById("resume-preview");

      if (!previewElement) {
        throw new Error("Preview element not found");
      }

      const resumeElement =
        previewElement.querySelector(".resume-template") ||
        previewElement.querySelector(".creative-template") ||
        previewElement.querySelector("[data-template-id]") ||
        previewElement;

      if (!resumeElement) {
        throw new Error("Resume template element not found");
      }

      // المنت کلین شده
      const cleanElement = this.createCleanElement(
        resumeElement as HTMLElement
      );

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${this.resume.personalInfo?.firstName || "Resume"} ${
        this.resume.personalInfo?.lastName || ""
      }</title>
          <style>
            ${this.getBaseCSS()}
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${cleanElement.outerHTML}
          </div>
        </body>
        </html>
      `;

      return html;
    } catch (error) {
      console.error("HTML export failed:", error);
      throw new Error("Failed to export HTML");
    }
  }

  async exportToJSON(): Promise<string> {
    try {
      const exportData = {
        resume: this.resume,
        template: this.template,
        customization: this.customization,
        exportDate: new Date().toISOString(),
        version: "1.0",
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error("JSON export failed:", error);
      throw new Error("Failed to export JSON");
    }
  }

  private getBaseCSS(): string {
    return `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #f5f5f5;
        padding: 20px;
      }
      
      .resume-container {
        max-width: 210mm;
        margin: 0 auto;
        background: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
      }

      /* رنگ‌های ساده برای جایگزینی */
      .bg-purple-600 { background-color: #8b5cf6 !important; }
      .bg-blue-600 { background-color: #3b82f6 !important; }
      .text-purple-600 { color: #8b5cf6 !important; }
      .text-blue-600 { color: #3b82f6 !important; }
      .text-gray-800 { color: #1f2937 !important; }
      .text-gray-700 { color: #374151 !important; }
      .text-gray-600 { color: #4b5563 !important; }
      .text-gray-500 { color: #6b7280 !important; }
      
      @media print {
        body { 
          margin: 0; 
          padding: 0;
          background: white;
        }
        .resume-container { 
          box-shadow: none; 
          margin: 0;
          max-width: none;
        }
      }
      
      @page {
        size: A4;
        margin: 0;
      }
    `;
  }
}

// Helper function
export const downloadFile = (
  blob: Blob,
  filename: string,
  mimeType: string
) => {
  const url = URL.createObjectURL(new Blob([blob], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
