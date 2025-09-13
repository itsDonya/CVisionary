import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export class ResumeExporter {
  private static readonly PDF_CONFIG = {
    format: "a4" as const,
    orientation: "portrait" as const,
    unit: "mm" as const,
    hotfixes: ["px_scaling"],
    compress: true,
  };

  private static readonly CANVAS_CONFIG = {
    scale: 3, // بالاتر برای کیفیت بهتر
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    removeContainer: true,
    imageTimeout: 30000,
    logging: false,
    width: 794, // A4 width در px با scale 1
    height: 1123, // A4 height در px با scale 1
  };

  static async exportToPDF(): Promise<void> {
    try {
      console.log("شروع export به PDF...");

      // پیدا کردن element
      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("عنصر resume-preview یافت نشد");
      }

      // اعمال استایل‌های مخصوص PDF
      await this.applyPdfStyles(element);

      // تولید canvas
      const canvas = await html2canvas(element, this.CANVAS_CONFIG);

      // برگرداندن استایل‌های اصلی
      await this.revertStyles(element);

      // محاسبه ابعاد
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF(this.PDF_CONFIG);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // نسبت‌های صحیح
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
        undefined,
        "FAST"
      );

      // دانلود
      const fileName = `resume-${Date.now()}.pdf`;
      pdf.save(fileName);

      console.log("PDF با موفقیت تولید شد");
    } catch (error) {
      console.error("خطا در تولید PDF:", error);
      throw error;
    }
  }

  private static async applyPdfStyles(element: HTMLElement): Promise<void> {
    // ذخیره استایل‌های فعلی
    element.setAttribute(
      "data-original-style",
      element.getAttribute("style") || ""
    );

    // اعمال استایل‌های PDF
    const pdfStyles = `
      position: relative !important;
      transform: none !important;
      width: 794px !important;
      min-height: 1123px !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 20px !important;
      background: #ffffff !important;
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      color: #000000 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      backdrop-filter: none !important;
      overflow: visible !important;
    `;

    element.setAttribute("style", pdfStyles);

    // اصلاح تمام child elements
    this.fixChildElements(element);

    // صبر برای اعمال تغییرات
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  private static fixChildElements(parent: HTMLElement): void {
    const allElements = parent.querySelectorAll("*");

    allElements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;

      // ذخیره استایل اصلی
      htmlEl.setAttribute(
        "data-original-style",
        htmlEl.getAttribute("style") || ""
      );

      const computedStyle = window.getComputedStyle(htmlEl);
      const currentStyle = htmlEl.getAttribute("style") || "";

      let newStyles = currentStyle;

      // اصلاح رنگ‌ها
      if (computedStyle.color.includes("rgb")) {
        newStyles += `; color: ${this.convertColorToPrint(
          computedStyle.color
        )} !important`;
      }

      if (computedStyle.backgroundColor.includes("rgb")) {
        newStyles += `; background-color: ${this.convertColorToPrint(
          computedStyle.backgroundColor
        )} !important`;
      }

      // اصلاح borders
      if (computedStyle.borderColor.includes("rgb")) {
        newStyles += `; border-color: ${this.convertColorToPrint(
          computedStyle.borderColor
        )} !important`;
      }

      // حذف backdrop filters و effects
      newStyles += `; backdrop-filter: none !important; filter: none !important;`;

      // اصلاح font
      newStyles += `; font-family: 'Inter', 'Segoe UI', sans-serif !important;`;

      // اصلاح positioning
      if (
        computedStyle.position === "fixed" ||
        computedStyle.position === "sticky"
      ) {
        newStyles += `; position: relative !important;`;
      }

      htmlEl.setAttribute("style", newStyles);
    });
  }

  private static convertColorToPrint(color: string): string {
    // تبدیل رنگ‌های شفاف به رنگ‌های solid
    if (color.includes("rgba")) {
      const rgba = color.match(/rgba?\(([^)]+)\)/)?.[1].split(",");
      if (rgba && rgba.length >= 3) {
        return `rgb(${rgba[0].trim()}, ${rgba[1].trim()}, ${rgba[2].trim()})`;
      }
    }
    return color;
  }

  private static async revertStyles(element: HTMLElement): Promise<void> {
    // برگرداندن استایل اصلی
    const originalStyle = element.getAttribute("data-original-style");
    if (originalStyle) {
      element.setAttribute("style", originalStyle);
    } else {
      element.removeAttribute("style");
    }
    element.removeAttribute("data-original-style");

    // برگرداندن استایل‌های child elements
    const allElements = element.querySelectorAll("*");
    allElements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      const originalStyle = htmlEl.getAttribute("data-original-style");
      if (originalStyle) {
        htmlEl.setAttribute("style", originalStyle);
      } else {
        htmlEl.removeAttribute("style");
      }
      htmlEl.removeAttribute("data-original-style");
    });
  }

  static async exportToHTML(): Promise<void> {
    try {
      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("عنصر resume-preview یافت نشد");
      }

      const htmlContent = `
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
        }
        .resume-container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            box-shadow: 0 0 20px rgba(0,0,0,0.1); 
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${element.innerHTML}
    </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${Date.now()}.html`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("خطا در export HTML:", error);
      throw error;
    }
  }
}
