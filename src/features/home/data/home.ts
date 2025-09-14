import * as homeTypes from "../types/home.types";
import {
  BrainCircuit,
  MonitorCheck,
  Crown,
  Zap,
  Sparkles,
  Target,
  TrendingUp,
  MousePointerClick,
  Palette,
  CircleCheckBig,
  Loader,
  WandSparkles,
  Trophy,
  ChartColumnIncreasing,
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
    path: "/about-us",
  },
  // {
  //   name: "contact",
  //   title: "Contact",
  //   path: "/contact-us",
  // },
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

export const featuresSection: homeTypes.FeaturesSection = {
  title: "Elevate your career,\nwith smart resume technology.",
  items: [
    {
      title: "AI-powered resume editor",
      description:
        "Effortlessly build and refine your resume with real-time, intelligent content suggestions.",
      icon: Sparkles,
    },
    {
      title: "Instant ATS optimization",
      description:
        "Automatically tailor your CV to beat Applicant Tracking Systems and attract recruiters.",
      icon: TrendingUp,
    },
    {
      title: "Dynamic templates",
      description:
        "Choose from modern, professionally designed templates that adapt to your career path.",
      icon: Palette,
    },
    {
      title: "Personalized content assistant",
      description:
        "Get unique, AI-generated phrasing and achievements based on your background and industry.",
      icon: WandSparkles,
    },
    {
      title: "Smart job targeting",
      description:
        "Receive the best-fit keywords and skills for your desired roles, powered by labor market data.",
      icon: CircleCheckBig,
    },
    {
      title: "One-click export",
      description:
        "Download a perfectly formatted PDF or ready-to-share link with just one click.",
      icon: MousePointerClick,
    },
    {
      title: "Performance insights",
      description:
        "Receive actionable analytics about your resume's strengths, weaknesses, and real-world visibility.",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Career progress tracker",
      description:
        "Set your job search goals and track applications and networking—all in one place.",
      icon: Loader,
    },
    {
      title: "Competitive benchmarking",
      description:
        "See how your CV stacks up against other candidates in your field, with actionable tips for improvement.",
      icon: Trophy,
    },
  ],
};
