// src/types/service.ts

export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceTechnology {
  name: string;
  logo?: string;
  category?: 'frontend' | 'backend' | 'database' | 'tool' | 'framework';
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ServicePricing {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    period?: 'once' | 'monthly' | 'yearly' | 'project';
  };
  features: string[];
  highlighted?: boolean;
  cta?: {
    text: string;
    href: string;
  };
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  image?: string;
}

export interface ServiceProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  caseStudyUrl?: string;
  liveUrl?: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  longDescription?: string;
  icon: React.ReactNode;
  image?: string;
  heroImage?: string;
  category: 'development' | 'design' | 'consulting' | 'marketing' | 'support';
  features: ServiceFeature[];
  technologies?: ServiceTechnology[];
  process?: ServiceProcess[];
  pricing?: ServicePricing[];
  benefits?: string[];
  deliverables?: string[];
  timeline?: string;
  startingPrice?: {
    amount: number;
    currency: string;
    unit: string;
  };
  projects?: ServiceProject[];
  testimonials?: ServiceTestimonial[];
  faqs?: ServiceFAQ[];
  relatedServices?: string[]; // Array of service slugs
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}