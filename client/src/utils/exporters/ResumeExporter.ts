import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export class ResumeExporter {
  static async exportToPDF(): Promise<void> {
    try {
      console.log("🚀 شروع export PDF...");

      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("عنصر resume-preview یافت نشد");
      }

      // اضافه کردن کلاس pdf-export
      element.classList.add("pdf-export");

      // صبر برای اعمال استایل‌ها
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        foreignObjectRendering: false,
        removeContainer: false,
      });

      // حذف کلاس
      element.classList.remove("pdf-export");

      // تولید PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgData = canvas.toDataURL("image/png", 0.95);
      const pdfWidth = 210;
      const pdfHeight = 297;

      const canvasRatio = canvas.width / canvas.height;
      let width = pdfWidth - 0; // کاهش margin از 20 به 10
      let height = width / canvasRatio;

      if (height > pdfHeight - 0) {
        height = pdfHeight - 0;
        width = height * canvasRatio;
      }

      const x = (pdfWidth - width) / 2;
      const y = 0; // کاهش margin بالا از 10 به 5

      pdf.addImage(imgData, "PNG", x, y, width, height);

      const fileName = `resume-${Date.now()}.pdf`;
      pdf.save(fileName);

      console.log("✅ PDF تولید شد!");
    } catch (error) {
      console.error("❌ خطا در تولید PDF:", error);
      throw error;
    }
  }
}
