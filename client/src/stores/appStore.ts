import type { Experience } from "@/types/resume";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// types
interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  title?: string;
  summary?: string;
  photo?: string;
}

// interface Experience {
//   id: string;
//   company: string;
//   position: string;
//   startDate: string;
//   endDate?: string;
//   current: boolean;
//   description: string;
//   location?: string;
// }

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: "technical" | "soft" | "language";
}

interface Resume {
  id?: string;
  title: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  createdAt?: string;
  updatedAt?: string;
  isPublic?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: "free" | "premium";
}

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;

  // Resumes
  resumes: Resume[];
  currentResume: Resume;
  isLoading: boolean;
  error: string | null;

  // Actions - User
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;

  // Actions - Resume
  createResume: (title?: string) => void;
  loadResume: (id: string) => Promise<void>;
  updateCurrentResume: (resumeData: Partial<Resume>) => void;
  saveCurrentResume: () => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  duplicateResume: (id: string) => Promise<void>;
  loadUserResumes: () => Promise<void>;

  // Actions - Personal Info
  updatePersonalInfo: (personalInfo: Partial<PersonalInfo>) => void;

  // Actions - Experience
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Actions - Achievement
  addAchievement: (experienceId: string, achievement: string) => void;
  updateAchievement: (
    experienceId: string,
    achievementIndex: number,
    achievement: string
  ) => void;
  removeAchievement: (experienceId: string, achievementIndex: number) => void;

  // Actions - Education
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;

  // Actions - Skills
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Utilities
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Default Resume Template
const createDefaultResume = (): Resume => ({
  title: "New Resume",
  personalInfo: {},
  experience: [],
  education: [],
  skills: [],
  isPublic: false,
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      resumes: [],
      currentResume: createDefaultResume(),
      isLoading: false,
      error: null,

      // User Actions
      login: (user) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          resumes: [],
          currentResume: createDefaultResume(),
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },

      // Resume Actions
      createResume: (title = "New Resume") => {
        const newResume: Resume = {
          ...createDefaultResume(),
          id: `resume_${Date.now()}`,
          title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({ currentResume: newResume });
      },

      loadResume: async (id) => {
        set({ isLoading: true, error: null });

        try {
          const { resumes } = get();
          const resume = resumes.find((r) => r.id === id);

          if (resume) {
            set({ currentResume: resume, isLoading: false });
          } else {
            // اگر resume پیدا نشد، می‌تونی از API بخونی
            throw new Error("Resume not found");
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load resume",
            isLoading: false,
          });
        }
      },

      updateCurrentResume: (resumeData) => {
        const currentResume = get().currentResume;
        set({
          currentResume: {
            ...currentResume,
            ...resumeData,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      saveCurrentResume: async () => {
        set({ isLoading: true, error: null });

        try {
          const { currentResume, resumes } = get();

          // اگر resume جدیده، اضافه کن، وگرنه آپدیت کن
          const existingIndex = resumes.findIndex(
            (r) => r.id === currentResume.id
          );

          let updatedResumes;
          if (existingIndex >= 0) {
            updatedResumes = resumes.map((r) =>
              r.id === currentResume.id ? currentResume : r
            );
          } else {
            updatedResumes = [...resumes, currentResume];
          }

          set({
            resumes: updatedResumes,
            isLoading: false,
          });

          // اینجا می‌تونی به API هم بفرستی
          // await api.saveResume(currentResume);
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to save resume",
            isLoading: false,
          });
        }
      },

      deleteResume: async (id) => {
        set({ isLoading: true, error: null });

        try {
          const { resumes } = get();
          const updatedResumes = resumes.filter((r) => r.id !== id);

          set({
            resumes: updatedResumes,
            isLoading: false,
          });

          // API call
          // await api.deleteResume(id);
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to delete resume",
            isLoading: false,
          });
        }
      },

      duplicateResume: async (id) => {
        set({ isLoading: true, error: null });

        try {
          const { resumes } = get();
          const originalResume = resumes.find((r) => r.id === id);

          if (originalResume) {
            const duplicatedResume: Resume = {
              ...originalResume,
              id: `resume_${Date.now()}`,
              title: `${originalResume.title} (Copy)`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            set({
              resumes: [...resumes, duplicatedResume],
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to duplicate resume",
            isLoading: false,
          });
        }
      },

      loadUserResumes: async () => {
        set({ isLoading: true, error: null });

        try {
          // اینجا از API می‌خونی
          // const userResumes = await api.getUserResumes();
          // set({ resumes: userResumes, isLoading: false });

          // فعلاً فیک دیتا:
          set({ isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load resumes",
            isLoading: false,
          });
        }
      },

      // Personal Info Actions
      updatePersonalInfo: (personalInfo) => {
        const currentResume = get().currentResume;
        set({
          currentResume: {
            ...currentResume,
            personalInfo: {
              ...currentResume.personalInfo,
              ...personalInfo,
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      // Experience Actions
      addExperience: () => {
        const newExperience: Experience = {
          // id: uuidv4(),
          id: String(Math.random()),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrentJob: false,
          description: "",
          achievements: [],
        };

        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: [...state.currentResume.experience, newExperience],
          },
        }));
      },

      updateExperience: (id: string, updates: Partial<Experience>) => {
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          },
        }));
      },

      deleteExperience: (id: string) => {
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.filter(
              (exp) => exp.id !== id
            ),
          },
        }));
      },

      addAchievement: (experienceId: string, achievement: string) => {
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.map((exp) =>
              exp.id === experienceId
                ? { ...exp, achievements: [...exp.achievements, achievement] }
                : exp
            ),
          },
        }));
      },

      updateAchievement: (
        experienceId: string,
        achievementIndex: number,
        achievement: string
      ) => {
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.map((exp) =>
              exp.id === experienceId
                ? {
                    ...exp,
                    achievements: exp.achievements.map((ach, index) =>
                      index === achievementIndex ? achievement : ach
                    ),
                  }
                : exp
            ),
          },
        }));
      },

      removeAchievement: (experienceId: string, achievementIndex: number) => {
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience: state.currentResume.experience.map((exp) =>
              exp.id === experienceId
                ? {
                    ...exp,
                    achievements: exp.achievements.filter(
                      (_, index) => index !== achievementIndex
                    ),
                  }
                : exp
            ),
          },
        }));
      },

      // Education Actions
      addEducation: (education) => {
        const currentResume = get().currentResume;
        const newEducation: Education = {
          ...education,
          id: `edu_${Date.now()}`,
        };

        set({
          currentResume: {
            ...currentResume,
            education: [...currentResume.education, newEducation],
            updatedAt: new Date().toISOString(),
          },
        });
      },

      updateEducation: (id, education) => {
        const currentResume = get().currentResume;
        const updatedEducation = currentResume.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        );

        set({
          currentResume: {
            ...currentResume,
            education: updatedEducation,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      deleteEducation: (id) => {
        const currentResume = get().currentResume;
        const updatedEducation = currentResume.education.filter(
          (edu) => edu.id !== id
        );

        set({
          currentResume: {
            ...currentResume,
            education: updatedEducation,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      // Skills Actions
      addSkill: (skill) => {
        const currentResume = get().currentResume;
        const newSkill: Skill = {
          ...skill,
          id: `skill_${Date.now()}`,
        };

        set({
          currentResume: {
            ...currentResume,
            skills: [...currentResume.skills, newSkill],
            updatedAt: new Date().toISOString(),
          },
        });
      },

      updateSkill: (id, skill) => {
        const currentResume = get().currentResume;
        const updatedSkills = currentResume.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s
        );

        set({
          currentResume: {
            ...currentResume,
            skills: updatedSkills,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      deleteSkill: (id) => {
        const currentResume = get().currentResume;
        const updatedSkills = currentResume.skills.filter((s) => s.id !== id);

        set({
          currentResume: {
            ...currentResume,
            skills: updatedSkills,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      // Utilities
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "resume-app-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        resumes: state.resumes,
        // currentResume رو persist نمی‌کنیم چون temporary هست
      }),
    }
  )
);
