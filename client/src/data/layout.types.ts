export type FooterNavlinkItem = {
  title: string;
  to: string;
};

export type FooterContactItem = {
  text: string;
  href: string;
  icon: React.ElementType;
};

export type Footer = {
  title: string;
  description: string;

  navLinks: FooterNavlinkItem[];

  contactLinks: FooterContactItem[];

  copyright: string;
};
