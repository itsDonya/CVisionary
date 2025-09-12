import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Template } from "@/types/resume";

interface TemplateCustomization {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    sections: number;
    paragraphs: number;
  };
  layout: {
    columns: 1 | 2;
    headerAlignment: "left" | "center" | "right";
    sectionSpacing: "compact" | "normal" | "spacious";
  };
}

interface TemplateState {
  templates: Template[];
  selectedTemplateId: string | null;
  customizations: Record<string, TemplateCustomization>;
  isLoading: boolean;

  // Actions
  loadTemplates: () => Promise<void>;
  selectTemplate: (templateId: string) => void;
  getSelectedTemplate: () => Template | null;
  updateCustomization: (
    templateId: string,
    customization: Partial<TemplateCustomization>
  ) => void;
  resetCustomization: (templateId: string) => void;
}

const defaultCustomization: TemplateCustomization = {
  colors: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    text: "#1f2937",
    background: "#ffffff",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  spacing: {
    sections: 24,
    paragraphs: 12,
  },
  layout: {
    columns: 1,
    headerAlignment: "left",
    sectionSpacing: "normal",
  },
};

// تمپلیت‌های پیش‌فرض (مطابق با TemplateStep.tsx شما)
const defaultTemplates: Template[] = [
  {
    id: "template-1",
    name: "Modern Professional",
    preview: "/src/assets/images/templates/1.png",
    category: "modern",
    isPremium: false,
    description: "Clean and modern design perfect for tech professionals",
    features: ["ATS Friendly", "Modern Layout", "Color Customization"],
  },
  {
    id: "template-2",
    name: "Executive Classic",
    preview: "/src/assets/images/templates/2.jpg",
    category: "classic",
    isPremium: true,
    description: "Traditional professional layout for senior positions",
    features: ["Executive Style", "Professional", "Timeless Design"],
  },
  {
    id: "template-3",
    name: "Creative Designer",
    preview: "/src/assets/images/templates/3.png",
    category: "creative",
    isPremium: false,
    description: "Eye-catching design for creative professionals",
    features: ["Creative Layout", "Portfolio Ready", "Visual Impact"],
  },
  {
    id: "template-4",
    name: "Minimal Elegance",
    preview: "/src/assets/images/templates/4.jpg",
    category: "minimal",
    isPremium: true,
    description: "Simple and elegant design that focuses on content",
    features: ["Minimal Design", "Content Focus", "Clean Typography"],
  },
];

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: defaultTemplates,
      selectedTemplateId: null,
      customizations: {},
      isLoading: false,

      loadTemplates: async () => {
        set({ isLoading: true });
        try {
          // اینجا می‌تونید از API بارگذاری کنید
          // const response = await fetch('/api/templates');
          // const templates = await response.json();
          // set({ templates });

          // فعلاً از defaultTemplates استفاده می‌کنیم
          set({ templates: defaultTemplates });
        } catch (error) {
          console.error("Failed to load templates:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      selectTemplate: (templateId: string) => {
        set({ selectedTemplateId: templateId });
      },

      getSelectedTemplate: () => {
        const { templates, selectedTemplateId } = get();
        return templates.find((t) => t.id === selectedTemplateId) || null;
      },

      updateCustomization: (
        templateId: string,
        customization: Partial<TemplateCustomization>
      ) => {
        set((state) => ({
          customizations: {
            ...state.customizations,
            [templateId]: {
              ...defaultCustomization,
              ...state.customizations[templateId],
              ...customization,
            },
          },
        }));
      },

      resetCustomization: (templateId: string) => {
        set((state) => ({
          customizations: {
            ...state.customizations,
            [templateId]: defaultCustomization,
          },
        }));
      },
    }),
    {
      name: "template-store",
      partialize: (state) => ({
        selectedTemplateId: state.selectedTemplateId,
        customizations: state.customizations,
      }),
    }
  )
);
