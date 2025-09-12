import React from "react";
import { useTemplateStore } from "@/stores/templateStore";
import type { Template } from "@/types/resume";
import type { Resume } from "@/types/resume";

// Import template components
import { ModernTemplate } from "./modern/ModernTemplate";
import { ClassicTemplate } from "./classic/ClassicTemplate";
import { CreativeTemplate } from "./creative/CreativeTemplate";
import { MinimalTemplate } from "./minimal/MinimalTemplate";

interface BaseTemplateProps {
  template: Template;
  resume: Resume;
  isPreview?: boolean;
  className?: string;
}

const templateComponents = {
  "template-1": ModernTemplate,
  "template-2": ClassicTemplate,
  "template-3": CreativeTemplate,
  "template-4": MinimalTemplate,
};

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  template,
  resume,
  isPreview = false,
  className = "",
}) => {
  const { customizations } = useTemplateStore();

  // Get template component
  const TemplateComponent =
    templateComponents[template.id as keyof typeof templateComponents];

  if (!TemplateComponent) {
    return (
      <div className={`p-8 text-center ${className}`}>
        <p className="text-slate-500">Template component not found</p>
      </div>
    );
  }

  // Get customizations for this template
  const templateCustomization = customizations[template.id];

  // Apply CSS variables for dynamic theming
  const cssVariables = templateCustomization
    ? ({
        "--color-primary": templateCustomization.colors.primary,
        "--color-secondary": templateCustomization.colors.secondary,
        "--color-text": templateCustomization.colors.text,
        "--color-background": templateCustomization.colors.background,
        "--font-heading": templateCustomization.fonts.heading,
        "--font-body": templateCustomization.fonts.body,
        "--spacing-sections": `${templateCustomization.spacing.sections}px`,
        "--spacing-paragraphs": `${templateCustomization.spacing.paragraphs}px`,
      } as React.CSSProperties)
    : {};

  return (
    <div
      className={`resume-template ${className}`}
      style={cssVariables}
      data-template-id={template.id}
      data-is-preview={isPreview}>
      <TemplateComponent
        template={template}
        resume={resume}
        customization={templateCustomization}
        isPreview={isPreview}
      />
    </div>
  );
};
