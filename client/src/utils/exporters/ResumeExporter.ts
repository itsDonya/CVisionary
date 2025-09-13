import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export class ResumeExporter {
  private static readonly PDF_CONFIG = {
    format: "a4" as const,
    orientation: "portrait" as const,
    unit: "mm" as const,
    compress: true,
  };

  private static readonly CANVAS_CONFIG = {
    scale: 3,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    logging: false,
    width: 794,
    height: 1123,
    scrollX: 0,
    scrollY: 0,
    windowWidth: 794,
    windowHeight: 1123,
  };

  static async exportToPDF(): Promise<void> {
    try {
      console.log("🚀 شروع export به PDF...");

      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("عنصر resume-preview یافت نشد");
      }

      // ایجاد کپی از element با تمام styles
      const clonedElement = await this.createStyledClone(element);

      // اضافه کردن clone به DOM موقتاً
      document.body.appendChild(clonedElement);

      // تولید canvas از clone
      const canvas = await html2canvas(clonedElement, this.CANVAS_CONFIG);

      // حذف clone از DOM
      document.body.removeChild(clonedElement);

      // تولید PDF
      await this.generatePDFFromCanvas(canvas);

      console.log("✅ PDF با موفقیت تولید شد");
    } catch (error) {
      console.error("❌ خطا در تولید PDF:", error);
      throw error;
    }
  }

  private static async createStyledClone(
    element: HTMLElement
  ): Promise<HTMLElement> {
    // کپی کردن element
    const clone = element.cloneNode(true) as HTMLElement;

    // تنظیمات کلی clone
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "794px";
    clone.style.minHeight = "1123px";
    clone.style.maxWidth = "none";
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.backgroundColor = "#ffffff";
    clone.style.fontFamily = "'Inter', 'Segoe UI', sans-serif";
    clone.style.fontSize = "14px";
    clone.style.lineHeight = "1.5";
    clone.style.color = "#000000";
    clone.style.transform = "none";
    clone.style.boxShadow = "none";

    // اعمال styles به تمام elements
    await this.applyComputedStylesToClone(element, clone);

    return clone;
  }

  private static async applyComputedStylesToClone(
    original: HTMLElement,
    clone: HTMLElement
  ): Promise<void> {
    // اعمال style به element اصلی
    const originalStyle = window.getComputedStyle(original);
    this.copyComputedStyle(originalStyle, clone, original);

    // اعمال styles به child elements
    const originalChildren = original.querySelectorAll("*");
    const cloneChildren = clone.querySelectorAll("*");

    for (let i = 0; i < originalChildren.length; i++) {
      const originalChild = originalChildren[i] as HTMLElement;
      const cloneChild = cloneChildren[i] as HTMLElement;

      if (originalChild && cloneChild) {
        const childStyle = window.getComputedStyle(originalChild);
        this.copyComputedStyle(childStyle, cloneChild, originalChild);
      }
    }
  }

  private static copyComputedStyle(
    computedStyle: CSSStyleDeclaration,
    targetElement: HTMLElement,
    sourceElement: HTMLElement
  ): void {
    const tagName = targetElement.tagName.toLowerCase();
    const className = sourceElement.className || "";

    // استایل‌های اساسی
    const importantStyles = [
      "backgroundColor",
      "color",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "textAlign",
      "padding",
      "margin",
      "border",
      "borderRadius",
      "width",
      "height",
      "display",
      "position",
      "textDecoration",
      "textTransform",
      "letterSpacing",
    ];

    // کپی کردن استایل‌های مهم
    importantStyles.forEach((property) => {
      const value = computedStyle.getPropertyValue(this.camelToKebab(property));
      if (value && value !== "auto" && value !== "normal") {
        targetElement.style.setProperty(
          this.camelToKebab(property),
          value,
          "important"
        );
      }
    });

    // اصلاحات خاص برای Modern Template
    if (
      className.includes("modern-template") ||
      sourceElement.closest(".modern-template")
    ) {
      this.applyModernTemplateStyles(
        targetElement,
        className,
        tagName,
        computedStyle
      );
    }

    // اصلاح backgrounds شفاف
    if (
      computedStyle.backgroundColor === "rgba(0, 0, 0, 0)" ||
      computedStyle.backgroundColor === "transparent"
    ) {
      targetElement.style.setProperty(
        "background-color",
        "transparent",
        "important"
      );
    }

    // اصلاح gradients
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== "none") {
      targetElement.style.setProperty(
        "background-image",
        backgroundImage,
        "important"
      );
    }
  }

  private static applyModernTemplateStyles(
    element: HTMLElement,
    className: string,
    tagName: string,
    computedStyle: CSSStyleDeclaration
  ): void {
    // Header gradient
    if (tagName === "header" || className.includes("bg-gradient")) {
      element.style.setProperty(
        "background",
        "linear-gradient(to right, #2563eb, #1d4ed8)",
        "important"
      );
      element.style.setProperty("color", "#ffffff", "important");
      element.style.setProperty("padding", "32px", "important");
    }

    // Blue elements
    if (className.includes("border-blue-600")) {
      element.style.setProperty("border-color", "#2563eb", "important");
    }

    if (className.includes("text-blue-600")) {
      element.style.setProperty("color", "#2563eb", "important");
    }

    if (className.includes("bg-blue-100")) {
      element.style.setProperty("background-color", "#dbeafe", "important");
    }

    if (className.includes("text-blue-800")) {
      element.style.setProperty("color", "#1e40af", "important");
    }

    // Gray elements
    if (className.includes("bg-gray-50")) {
      element.style.setProperty("background-color", "#f9fafb", "important");
    }

    if (className.includes("text-gray-800")) {
      element.style.setProperty("color", "#1f2937", "important");
    }

    if (className.includes("text-gray-700")) {
      element.style.setProperty("color", "#374151", "important");
    }

    if (className.includes("text-gray-600")) {
      element.style.setProperty("color", "#4b5563", "important");
    }

    // Borders
    if (className.includes("border-l-4")) {
      element.style.setProperty("border-left-width", "4px", "important");
      element.style.setProperty("border-left-style", "solid", "important");
    }

    if (className.includes("border-b-2")) {
      element.style.setProperty("border-bottom-width", "2px", "important");
      element.style.setProperty("border-bottom-style", "solid", "important");
    }

    // Typography
    if (className.includes("text-4xl")) {
      element.style.setProperty("font-size", "2.25rem", "important");
      element.style.setProperty("line-height", "2.5rem", "important");
    }

    if (className.includes("text-2xl")) {
      element.style.setProperty("font-size", "1.5rem", "important");
      element.style.setProperty("line-height", "2rem", "important");
    }

    if (className.includes("text-xl")) {
      element.style.setProperty("font-size", "1.25rem", "important");
      element.style.setProperty("line-height", "1.75rem", "important");
    }

    if (className.includes("font-bold")) {
      element.style.setProperty("font-weight", "700", "important");
    }

    if (className.includes("font-semibold")) {
      element.style.setProperty("font-weight", "600", "important");
    }

    if (className.includes("font-medium")) {
      element.style.setProperty("font-weight", "500", "important");
    }

    // Spacing
    if (className.includes("mb-8")) {
      element.style.setProperty("margin-bottom", "32px", "important");
    }

    if (className.includes("mb-4")) {
      element.style.setProperty("margin-bottom", "16px", "important");
    }

    if (className.includes("mb-2")) {
      element.style.setProperty("margin-bottom", "8px", "important");
    }

    if (className.includes("p-8")) {
      element.style.setProperty("padding", "32px", "important");
    }

    if (className.includes("px-3")) {
      element.style.setProperty("padding-left", "12px", "important");
      element.style.setProperty("padding-right", "12px", "important");
    }

    if (className.includes("py-1")) {
      element.style.setProperty("padding-top", "4px", "important");
      element.style.setProperty("padding-bottom", "4px", "important");
    }

    if (className.includes("pl-6")) {
      element.style.setProperty("padding-left", "24px", "important");
    }

    if (className.includes("pb-2")) {
      element.style.setProperty("padding-bottom", "8px", "important");
    }

    // Rounded corners
    if (className.includes("rounded-lg")) {
      element.style.setProperty("border-radius", "8px", "important");
    }

    if (className.includes("rounded")) {
      element.style.setProperty("border-radius", "4px", "important");
    }
  }

  private static camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

  private static async generatePDFFromCanvas(
    canvas: HTMLCanvasElement
  ): Promise<void> {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF(this.PDF_CONFIG);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(
      pdfWidth / (imgWidth * 0.75),
      pdfHeight / (imgHeight * 0.75)
    );
    const scaledWidth = imgWidth * 0.75 * ratio;
    const scaledHeight = imgHeight * 0.75 * ratio;

    const imgX = (pdfWidth - scaledWidth) / 2;
    const imgY = 0;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      scaledWidth,
      scaledHeight,
      undefined,
      "FAST"
    );

    const fileName = `resume-${Date.now()}.pdf`;
    pdf.save(fileName);
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
            line-height: 1.5;
        }
        .resume-container { 
            max-width: 794px; 
            margin: 0 auto; 
            background: white; 
            min-height: 1123px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1); 
        }
        
        /* Modern Template Styles */
        .modern-template header {
            background: linear-gradient(to right, #2563eb, #1d4ed8) !important;
            color: white !important;
            padding: 32px !important;
        }
        .border-blue-600 { border-color: #2563eb !important; }
        .border-b-2 { border-bottom-width: 2px !important; border-bottom-style: solid !important; }
        .border-l-4 { border-left-width: 4px !important; border-left-style: solid !important; }
        .text-blue-600 { color: #2563eb !important; }
        .text-blue-800 { color: #1e40af !important; }
        .text-gray-800 { color: #1f2937 !important; }
        .text-gray-700 { color: #374151 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        .bg-blue-100 { background-color: #dbeafe !important; }
        .bg-gray-50 { background-color: #f9fafb !important; }
        .text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
        .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
        .text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
        .font-bold { font-weight: 700 !important; }
        .font-semibold { font-weight: 600 !important; }
        .font-medium { font-weight: 500 !important; }
        .mb-8 { margin-bottom: 32px !important; }
        .mb-4 { margin-bottom: 16px !important; }
        .mb-2 { margin-bottom: 8px !important; }
        .p-8 { padding: 32px !important; }
        .px-3 { padding-left: 12px !important; padding-right: 12px !important; }
        .py-1 { padding-top: 4px !important; padding-bottom: 4px !important; }
        .pl-6 { padding-left: 24px !important; }
        .pb-2 { padding-bottom: 8px !important; }
        .rounded-lg { border-radius: 8px !important; }
        .rounded { border-radius: 4px !important; }
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
