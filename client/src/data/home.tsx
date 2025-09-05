import * as homeTypes from "./home.types";
import { BrainCircuit, MonitorCheck, Crown } from "lucide-react";

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

export const heroContent: homeTypes.HeroContent = {
  title: "Craft Your Future with AI.",
  tagline: "AI-Powered",
  description:
    "Elevate your career with stunning resumes, intelligent insights, and effortless PDF exports. Your dream job starts here.",
  buttonText: "Get Started Free",
  properties: [
    {
      title: "AI-Generated",
      icon: <BrainCircuit className="size-4 text-white" />,
    },
    {
      title: "ATS-Friendly",
      icon: <MonitorCheck className="size-4 text-white" />,
    },
    {
      title: "Professional",
      icon: <Crown className="size-4 text-white" />,
    },
  ],
};
