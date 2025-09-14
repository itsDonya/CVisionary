import { Mail, MessageSquare } from "lucide-react";
import type { Header, Footer } from "../types/default";

export const header: Header = {
  title: "CVisionary",
  links: [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about-us",
    },
    // {
    //   title: "Contact",
    //   path: "/contact-us",
    // },
  ],
};

export const footer: Footer = {
  title: "CVisionary",
  description:
    "آینده شغلی خود را با قدرت هوش مصنوعی بسازید.\nرزومه‌های حرفه‌ای در چند ثانیه.",

  navLinks: [
    {
      title: "About Us",
      to: "/about-us",
    },
    {
      title: "Contact Us",
      to: "/contact-us",
    },
    {
      title: "Terms",
      to: "/terms",
    },
    {
      title: "Privay Policy",
      to: "/privacy-policy",
    },
  ],
  contactLinks: [
    {
      icon: Mail,
      text: "donya.codes@gmail.com",
      href: "mailto:donya.codes@gmail.com",
    },
    {
      icon: MessageSquare,
      text: "doniverse1",
      href: "https://t.me/doniverse1",
    },
  ],
  copyright: "© 2025 CVisionary. All rights reserved.",
};
