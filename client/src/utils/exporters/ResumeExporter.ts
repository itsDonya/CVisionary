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
      // Create a temporary element with the resume content
      const tempElement = await this.createTemplateElement();
      document.body.appendChild(tempElement);

      // Generate canvas from HTML
      const canvas = await html2canvas(tempElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 794, // A4 width in pixels (at 96 DPI)
        height: 1123, // A4 height in pixels (at 96 DPI)
      });

      // Remove temporary element
      document.body.removeChild(tempElement);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      return pdf.output("blob");
    } catch (error) {
      console.error("PDF export failed:", error);
      throw new Error("Failed to export PDF");
    }
  }

  async exportToHTML(): Promise<string> {
    try {
      const tempElement = await this.createTemplateElement();
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${this.resume.personalInfo?.firstName} ${
        this.resume.personalInfo?.lastName
      } - Resume</title>
          <style>
            ${this.getTemplateCSS()}
          </style>
        </head>
        <body>
          ${tempElement.outerHTML}
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

  private async createTemplateElement(): Promise<HTMLElement> {
    // This would normally create the actual template element
    // For now, we'll create a placeholder
    const element = document.createElement("div");
    element.style.width = "794px";
    element.style.minHeight = "1123px";
    element.style.backgroundColor = "white";
    element.style.padding = "40px";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.top = "0";

    // Add resume content based on template
    element.innerHTML = this.generateTemplateHTML();

    return element;
  }

  private generateTemplateHTML(): string {
    // Generate HTML based on template type
    switch (this.template.id) {
      case "template-1":
        return this.generateModernHTML();
      case "template-2":
        return this.generateClassicHTML();
      case "template-3":
        return this.generateCreativeHTML();
      case "template-4":
        return this.generateMinimalHTML();
      default:
        return this.generateModernHTML();
    }
  }

  private generateModernHTML(): string {
    return `
      <div class="modern-resume">
        <header style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 2rem; margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 700;">
            ${this.resume.personalInfo?.firstName || ""} ${
      this.resume.personalInfo?.lastName || ""
    }
          </h1>
          <h2 style="font-size: 1.25rem; margin-bottom: 1rem; opacity: 0.9;">
            ${this.resume.personalInfo?.title || ""}
          </h2>
          <div style="display: flex; gap: 1.5rem; font-size: 0.875rem;">
            ${
              this.resume.personalInfo?.email
                ? `<span>📧 ${this.resume.personalInfo.email}</span>`
                : ""
            }
            ${
              this.resume.personalInfo?.phone
                ? `<span>📱 ${this.resume.personalInfo.phone}</span>`
                : ""
            }
            ${
              this.resume.personalInfo?.location
                ? `<span>📍 ${this.resume.personalInfo.location}</span>`
                : ""
            }
          </div>
        </header>
        
        ${
          this.resume.personalInfo?.summary
            ? `
        <section style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem;">
            Professional Summary
          </h3>
          <p style="color: #4b5563; line-height: 1.6;">${this.resume.personalInfo.summary}</p>
        </section>
        `
            : ""
        }
        
        ${
          this.resume.experiences && this.resume.experiences.length > 0
            ? `
        <section style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem;">
            Professional Experience
          </h3>
          ${this.resume.experiences
            .map(
              (exp) => `
            <div style="margin-bottom: 1.5rem; border-left: 4px solid #dbeafe; padding-left: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <div>
                  <h4 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">
                    ${exp.position}
                  </h4>
                  <p style="color: #2563eb; font-weight: 500; margin-bottom: 0.25rem;">
                    ${exp.company}
                  </p>
                  ${
                    exp.location
                      ? `<p style="color: #6b7280; font-size: 0.875rem;">${exp.location}</p>`
                      : ""
                  }
                </div>
                <div style="text-align: right; color: #6b7280; font-size: 0.875rem;">
                  <p style="font-weight: 500;">
                    ${exp.startDate} - ${
                exp.isCurrentJob ? "Present" : exp.endDate
              }
                  </p>
                </div>
              </div>
              ${
                exp.description
                  ? `<p style="color: #4b5563; margin-bottom: 0.75rem; line-height: 1.6;">${exp.description}</p>`
                  : ""
              }
              ${
                exp.achievements && exp.achievements.length > 0
                  ? `
                <ul style="list-style-type: disc; margin-left: 1.25rem; color: #4b5563;">
                  ${exp.achievements
                    .map(
                      (achievement) =>
                        `<li style="margin-bottom: 0.25rem;">${achievement}</li>`
                    )
                    .join("")}
                </ul>
              `
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </section>
        `
            : ""
        }
        
        <!-- Add more sections as needed -->
      </div>
    `;
  }

  private generateClassicHTML(): string {
    // Implementation for classic template
    return "<div>Classic Template HTML</div>";
  }

  private generateCreativeHTML(): string {
    // Implementation for creative template
    return "<div>Creative Template HTML</div>";
  }

  private generateMinimalHTML(): string {
    // Implementation for minimal template
    return "<div>Minimal Template HTML</div>";
  }

  private getTemplateCSS(): string {
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
      }
      
      .modern-resume {
        max-width: 794px;
        margin: 0 auto;
        background: white;
      }
      
      @media print {
        body { margin: 0; }
        .modern-resume { box-shadow: none; }
      }
    `;
  }
}

// Helper function to download files
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
