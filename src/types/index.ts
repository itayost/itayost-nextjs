// Type definitions for the website

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  image: string;
  images?: string[];
  link?: string;
  github?: string;
  featured: boolean;
  completedAt: string;
  client?: string;
  testimonial?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  price?: {
    from: number;
    to?: number;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}
