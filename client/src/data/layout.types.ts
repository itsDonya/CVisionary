export type FooterSection = {
  title: string;
  links: FooterSectionItem[];
};

export type FooterSectionItem = {
  title: string;
  href: string;
};

export type FooterContactItem = {
  text: string;
  href: string;
  icon: React.ElementType;
};

export type Footer = {
  title: string;
  description: string;

  sections: FooterSection[];

  contact: {
    title: string;
    items: FooterContactItem[];
  };

  copyright: string;
};
