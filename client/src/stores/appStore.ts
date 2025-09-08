import { create } from "zustand";
import type { Resume } from "@/types/resume";

interface AppState {
  resumes: Resume[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  addResume: (resume: Resume) => void;
}

export const useAppStore = create<AppState>((set) => ({
  resumes: [],
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  addResume: (resume) =>
    set((state) => ({
      resumes: [...state.resumes, resume],
    })),
}));
