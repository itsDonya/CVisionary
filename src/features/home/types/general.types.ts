export type AboutUsVisionType = {
  title: string;
  description: string;
  items: AboutUsVisionItem[];
};

export type AboutUsVisionItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type AboutUsMissionType = {
  title: string;
  text: string;
};

export type AboutUsCTAType = {
  title: string;
  description: string;
  buttonText: string;
};

export type AboutUs = {
  tagline: string;

  vision: AboutUsVisionType;

  mission: AboutUsMissionType;

  CTA: AboutUsCTAType;
};
