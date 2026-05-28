export type Service = {
  icon: string;
  title: string;
  description: string;
};

export type PortfolioItem = {
  image: string;
  category: string;
  title: string;
  href: string;
  platform: "behance" | "github" | "figma";
};

export type SocialLink = {
  href: string;
  icon: "github" | "linkedin" | "behance" | "instagram";
  label: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};
