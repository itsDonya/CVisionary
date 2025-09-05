import type { ReactElement } from "react";

export type Navlink = {
  name: string;
  title: string;
  path: string;
};

export type Property = {
  title: string;
  icon: ReactElement;
};

export type HeroContent = {
  title: string;
  tagline: string;
  description: string;
  buttonText: string;
  properties: Property[];
};
