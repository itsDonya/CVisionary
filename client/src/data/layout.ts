import { Globe, Mail } from "lucide-react";
import type { Footer } from "./layout.types";

export const footer: Footer = {
  title: "CVisionary",
  description:
    "آینده شغلی خود را با قدرت هوش مصنوعی بسازید.\nرزومه‌های حرفه‌ای در چند ثانیه.",
  sections: [
    {
      title: "Quick Access",
      links: [
        {
          title: "About Us",
          href: "/about-us",
        },
        {
          title: "Contact Us",
          href: "/contact-us",
        },
        {
          title: "Terms",
          href: "/terms",
        },
        {
          title: "Privay Policy",
          href: "/privacy-policy",
        },
      ],
    },
  ],
  contact: {
    title: "Contact Us",
    items: [
      {
        icon: Mail,
        text: "donya.codes@gmail.com",
        href: "mailto:donya.codes@gmail.com",
      },
      {
        icon: Globe,
        text: "doniverse1",
        href: "https://t.me/doniverse1",
      },
    ],
  },
  copyright: "© 2025 CVisionary. All rights reserved.",
};
