import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export class ResumeExporter {
  private static readonly PDF_CONFIG = {
    orientation: "portrait" as const,
    unit: "mm" as const,
    format: "a4" as const,
    compress: true,
    precision: 2,
  };

  private static readonly CANVAS_CONFIG = {
    scale: 3, // افزایش scale برای کیفیت بهتر
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    logging: true, // فعال کردن logging برای debug
    removeContainer: true,
    imageTimeout: 0,
    foreignObjectRendering: false,
  };

  static async exportToPDF(): Promise<void> {
    try {
      console.log("🚀 شروع export به PDF...");

      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("عنصر resume-preview یافت نشد");
      }

      // مخفی کردن scroll bars
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // ایجاد کپی optimized
      const clonedElement = await this.createOptimizedClone(element);

      // اضافه کردن به DOM
      document.body.appendChild(clonedElement);

      // صبر برای render کامل
      await this.waitForRender();

      // محاسبه ابعاد دقیق
      const dimensions = this.calculateOptimalDimensions(clonedElement);

      console.log("📊 Calculated dimensions:", dimensions);

      // تولید canvas با ابعاد محاسبه شده
      const canvas = await html2canvas(clonedElement, {
        ...this.CANVAS_CONFIG,
        width: dimensions.width,
        height: dimensions.height,
        windowWidth: dimensions.width,
        windowHeight: dimensions.height,
      });

      // حذف clone
      document.body.removeChild(clonedElement);
      document.body.style.overflow = originalOverflow;

      // تولید PDF
      await this.generateOptimizedPDF(canvas);

      console.log("✅ PDF با موفقیت تولید شد");
    } catch (error) {
      console.error("❌ خطا در تولید PDF:", error);
      throw error;
    }
  }

  private static async createOptimizedClone(
    element: HTMLElement
  ): Promise<HTMLElement> {
    const clone = element.cloneNode(true) as HTMLElement;

    // تنظیمات بهینه برای clone
    clone.style.position = "absolute";
    clone.style.left = "-10000px";
    clone.style.top = "0";
    clone.style.width = "210mm"; // عرض A4
    clone.style.minHeight = "auto";
    clone.style.maxWidth = "210mm";
    clone.style.margin = "0";
    clone.style.padding = "20mm"; // padding مناسب
    clone.style.backgroundColor = "#ffffff";
    clone.style.boxSizing = "border-box";
    clone.style.overflow = "visible";
    clone.style.transform = "none";
    clone.style.boxShadow = "none";
    clone.style.border = "none";
    clone.style.outline = "none";

    // تنظیمات فونت
    clone.style.fontFamily =
      "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    clone.style.fontSize = "12px";
    clone.style.lineHeight = "1.6";
    clone.style.color = "#000000";
    clone.style.fontSmoothing = "antialiased";
    clone.style.webkitFontSmoothing = "antialiased";

    // حذف تمام انیمیشن‌ها و transition ها
    const allElements = clone.querySelectorAll("*");
    allElements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.animation = "none";
      htmlEl.style.transition = "none";
      htmlEl.style.transform = "none";
      htmlEl.style.boxShadow = "none";
    });

    // بهینه‌سازی تصاویر
    const images = clone.querySelectorAll("img");
    for (const img of images) {
      if (img.src) {
        try {
          await this.preloadImage(img.src);
        } catch (error) {
          console.warn("خطا در بارگذاری تصویر:", img.src);
        }
      }
    }

    return clone;
  }

  private static calculateOptimalDimensions(element: HTMLElement): {
    width: number;
    height: number;
  } {
    // محاسبه ابعاد بر اساس محتوا
    const rect = element.getBoundingClientRect();
    const scrollWidth = element.scrollWidth;
    const scrollHeight = element.scrollHeight;

    // تبدیل mm به px (96 DPI)
    const mmToPx = (mm: number) => Math.round(mm * 3.7795275591);

    const a4WidthPx = mmToPx(210); // 794px
    const a4HeightPx = mmToPx(297); // 1123px

    return {
      width: Math.max(scrollWidth, a4WidthPx),
      height: Math.max(scrollHeight, a4HeightPx),
    };
  }

  private static async generateOptimizedPDF(
    canvas: HTMLCanvasElement
  ): Promise<void> {
    const pdf = new jsPDF(this.PDF_CONFIG);

    // ابعاد PDF در mm
    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // تبدیل canvas به base64
    const imgData = canvas.toDataURL("image/png", 1.0);

    // محاسبه ابعاد بهینه
    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;

    let finalWidth: number;
    let finalHeight: number;

    if (canvasAspectRatio > pdfAspectRatio) {
      // canvas عریض‌تر است - fit به عرض
      finalWidth = pdfWidth - 10; // 5mm margin از هر طرف
      finalHeight = finalWidth / canvasAspectRatio;
    } else {
      // canvas بلندتر است - fit به ارتفاع
      finalHeight = pdfHeight - 10; // 5mm margin از بالا و پایین
      finalWidth = finalHeight * canvasAspectRatio;
    }

    // مرکز کردن در صفحه
    const x = (pdfWidth - finalWidth) / 2;
    const y = 5; // 5mm از بالا

    console.log("📄 PDF Layout:", {
      pdfWidth,
      pdfHeight,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      finalWidth,
      finalHeight,
      x,
      y,
    });

    // اضافه کردن تصویر به PDF
    pdf.addImage(
      imgData,
      "PNG",
      x,
      y,
      finalWidth,
      finalHeight,
      undefined,
      "FAST"
    );

    // اگر محتوا طولانی است، صفحات اضافی ایجاد کن
    if (finalHeight > pdfHeight - 10) {
      await this.handleMultiPageContent(
        pdf,
        canvas,
        finalWidth,
        pdfWidth,
        pdfHeight
      );
    }

    const fileName = `resume-${Date.now()}.pdf`;
    pdf.save(fileName);
  }

  private static async handleMultiPageContent(
    pdf: jsPDF,
    canvas: HTMLCanvasElement,
    finalWidth: number,
    pdfWidth: number,
    pdfHeight: number
  ): Promise<void> {
    // برای محتوای طولانی، تقسیم به چند صفحه
    const pageHeight = pdfHeight - 10; // با margin
    const canvasHeight = canvas.height;
    const scaleFactor = finalWidth / canvas.width;
    const scaledCanvasHeight = canvasHeight * scaleFactor;

    const totalPages = Math.ceil(scaledCanvasHeight / pageHeight);

    for (let page = 1; page < totalPages; page++) {
      pdf.addPage();

      const sourceY = (page * pageHeight) / scaleFactor;
      const sourceHeight = Math.min(
        pageHeight / scaleFactor,
        canvasHeight - sourceY
      );

      // ایجاد canvas موقت برای این قسمت
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d")!;

      tempCanvas.width = canvas.width;
      tempCanvas.height = sourceHeight;

      tempCtx.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        sourceHeight,
        0,
        0,
        canvas.width,
        sourceHeight
      );

      const tempImgData = tempCanvas.toDataURL("image/png", 1.0);

      pdf.addImage(
        tempImgData,
        "PNG",
        (pdfWidth - finalWidth) / 2,
        5,
        finalWidth,
        sourceHeight * scaleFactor,
        undefined,
        "FAST"
      );
    }
  }

  private static async preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }

  private static async waitForRender(): Promise<void> {
    // صبر برای render کامل DOM
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // صبر برای تمام تصاویر
    const images = document.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  }
}
