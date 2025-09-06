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
        "Create professional resumes with intelligent AI assistance and automated formatting.",
    },
    {
      icon: Sparkles,
      title: "Smart Content Generator",
      description:
        "Automatic suggestions and the best keywords to target for your industry.",
    },
    {
      icon: Target,
      title: "ATS Optimization",
      description:
        "Helps you get past ATS systems with guided assistance and best practices.",
    },
  ],
};
