// src/types/about.ts

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'soft';
  level: number; // 1-100
  yearsOfExperience?: number;
  icon?: React.ReactNode;
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company?: string;
  type: 'job' | 'freelance' | 'project' | 'education';
  startDate: string;
  endDate?: string; // undefined means current
  description: string;
  achievements?: string[];
  technologies?: string[];
  link?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear?: string;
  description?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
  logo?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'award' | 'project' | 'milestone' | 'certification' | 'other';
  icon?: React.ReactNode;
  link?: string;
  image?: string;
}

export interface PersonalValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

export interface WorkProcess {
  id: string;
  step: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  duration?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  image?: string;
  projectId?: string;
}

export interface AboutHero {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  clientsSatisfied: number;
  availability: 'available' | 'busy' | 'unavailable';
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
}

export interface AboutContent {
  hero: AboutHero;
  bio: {
    title: string;
    content: string[];
    highlights?: string[];
  };
  mission: {
    title: string;
    description: string;
    points?: string[];
  };
  vision: {
    title: string;
    description: string;
    points?: string[];
  };
  approach: {
    title: string;
    description: string;
    values: PersonalValue[];
  };
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    dribbble?: string;
    behance?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AboutStats {
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
  hoursOfCode: number;
  technologies: number;
  coffeesCups: number;
}