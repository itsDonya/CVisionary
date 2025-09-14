export type Navlink = {
  name: string;
  title: string;
  path: string;
};

// ----

export type HeroPropertyItem = {
  title: string;
  icon: React.ElementType;
};

export type HeroSection = {
  title: string;
  tagline: string;
  description: string;
  buttonText: string;
  properties: HeroPropertyItem[];
};

// ----

export type PropertyItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type PropertiesSection = {
  title: string;
  description: string;
  items: PropertyItem[];
};

// ----

export type FeatureItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type FeaturesSection = {
  title: string;
  items: FeatureItem[];
};
