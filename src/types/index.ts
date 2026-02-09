export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  current?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  year?: string;
  current?: boolean;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Messages {
  header: {
    name: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    heading: string;
    bio: string;
  };
  experience: {
    heading: string;
    current: string;
    items: ExperienceItem[];
  };
  skills: {
    heading: string;
    categories: {
      languages: string;
      design: string;
      strengths: string;
    };
    items: {
      languages: string[];
      design: string[];
      strengths: string[];
    };
  };
  education: {
    heading: string;
    current: string;
    items: EducationItem[];
  };
  certifications: {
    heading: string;
    items: CertificationItem[];
  };
  footer: {
    copyright: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}
