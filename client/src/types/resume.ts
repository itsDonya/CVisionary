export interface Resume {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  personalInfo?: PersonalInfo;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
  achievements?: Achievement[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date?: string;
  description?: string;
  issuer?: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  category: "modern" | "classic" | "creative" | "minimal";
  isPremium: boolean;
  description: string;
  features: string[];
}
