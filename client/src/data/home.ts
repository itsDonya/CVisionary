export type Navlink = {
  name: string;
  title: string;
  path: string;
};

export const navlinks: Navlink[] = [
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

export const heroContent = {
  title: "Craft Your Future with AI.",
  description:
    "Elevate your career with stunning resumes, intelligent insights, and effortless PDF exports. Your dream job starts here.",
  buttonText: "Get Started",
};
