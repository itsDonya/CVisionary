import * as homeTypes from "./home.types";
import {
  BrainCircuit,
  MonitorCheck,
  Crown,
  Zap,
  Sparkles,
  Target,
} from "lucide-react";

export const navlinks: homeTypes.Navlink[] = [
  {
    name: "home",
    title: "Home",
    path: "/",
  },
  {
    name: "about",
    title: "About",
    path: "/about",
  },
  {
    name: "contact",
    title: "Contact",
    path: "/contact",
  },
];

export const heroSection: homeTypes.HeroSection = {
  title: "Craft Your Future with AI.",
  tagline: "AI-Powered",
  description:
    "Elevate your career with stunning resumes, intelligent insights, and effortless PDF exports. Your dream job starts here.",
  buttonText: "Get Started Free",
  properties: [
    {
      title: "AI-Generated",
      icon: BrainCircuit,
    },
    {
      title: "ATS-Friendly",
      icon: MonitorCheck,
    },
    {
      title: "Professional",
      icon: Crown,
    },
  ],
};

export const propertiesSection: homeTypes.PropertiesSection = {
  title: "Let AI Build\nYour Career Story.",
  description:
    "Craft impressive, tailored resumes in seconds\nno hassle, just results.",
  items: [
    {
      icon: Zap,
      title: "AI-Powered Resume Builder",
      description:
        "Effortlessly turn your career history into a professional CV with intelligent auto-complete, smart templates, and instant formatting.",
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions & Personalization",
      description:
        "Get adaptive content recommendations—AI analyzes your background and suggests skills, achievements, and keyword optimizations tailored for your dream job.",
    },
    {
      icon: Target,
      title: "Career Insights & Goal Tracking",
      description:
        "Track your job applications, see how your resume compares to others, and get actionable feedback to boost your visibility—powered by real labor market data.",
    },
  ],
};
