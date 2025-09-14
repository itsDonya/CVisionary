import { Rocket, Target, Zap } from "lucide-react";
import * as generalTypes from "../types/general.types";

export const aboutUsPage: generalTypes.AboutUs = {
  tagline: "AI-Powered",

  vision: {
    title: "About Our Vision",
    description:
      "Shaping the future of career growth through intelligent, AI-driven resume building.\nWe empower professionals to showcase their true potential, break boundaries, and seize new opportunities—powered by next-generation technology and human-centered design.",
    items: [
      {
        title: "Empowering Ambition",
        description:
          "We unlock unique talent and help you tell your story—so your ambition always shines.",
        icon: Rocket,
      },
      {
        title: "Intelligent Human-Centered Technology",
        description:
          "AI at CVisionary adapts to your path, making your resume more personal, relevant, and authentic.",
        icon: Zap,
      },
      {
        title: " Intelligent Human-Centered Technology",
        description:
          "We prepare you for what’s next—with tools built for tomorrow, not just today.",
        icon: Target,
      },
    ],
  },

  mission: {
    title: "Our Mission",
    text: "To democratize career success by providing visionary, AI-powered tools that empower every professional to tell their story, showcase their strengths, and seize new opportunities.\nWith smart technology built for tomorrow, anyone can unlock their full career potential.",
  },

  CTA: {
    title: "Ready to Transform Your Career?",
    description:
      "Join thousands of professionals who have elevated their careers with our AI-powered platform.",
    buttonText: "Get Started Free",
  },
};
