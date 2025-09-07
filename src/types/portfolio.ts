// src/types/portfolio.ts

export type ProjectCategory = 
  | 'web-development'
  | 'mobile-app'
  | 'management-system'
  | 'e-commerce'
  | 'landing-page'
  | 'corporate-site'
  | 'custom-system';

export type ProjectStatus = 'completed' | 'in-progress' | 'maintenance';

export type TechnologyType = 
  | 'frontend'
  | 'backend'
  | 'database'
  | 'deployment'
  | 'api'
  | 'other';

export interface Technology {
  name: string;
  type: TechnologyType;
  icon?: string; // Optional icon name from lucide-react or custom
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectTestimonial {
  content: string;
  author: string;
  role: string;
  company?: string;
  rating?: number;
}

export interface ProjectImage {
  src: string;
  alt: string;
  type: 'desktop' | 'mobile' | 'tablet' | 'logo';
  primary?: boolean; // Is this the main image?
}

export interface ProjectStats {
  duration?: string; // "3 חודשים"
  teamSize?: number;
  features?: number;
  performance?: string; // "99% uptime"
  users?: string; // "500+ משתמשים"
}

export interface Project {
  // Basic Info
  id: string;
  slug: string; // URL-friendly version: "kitchen-optimizer"
  title: string;
  subtitle?: string;
  description: string; // Short description for cards
  longDescription: string; // Full description for detail page
  
  // Categorization
  category: ProjectCategory;
  tags: string[];
  featured: boolean; // Show on homepage?
  order: number; // Display order (lower = first)
  
  // Media
  thumbnail: string; // Main image for cards
  images: ProjectImage[];
  logo?: string;
  color?: string; // Brand color for this project
  
  // Technical Details
  technologies: Technology[];
  features: ProjectFeature[];
  
  // Links
  liveUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  
  // Client Info
  client: string;
  clientLogo?: string;
  clientIndustry?: string;
  
  // Testimonial
  testimonial?: ProjectTestimonial;
  
  // Project Info
  status: ProjectStatus;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  stats?: ProjectStats;
  
  // Content Sections (for detail page)
  challenge?: string; // The problem you solved
  solution?: string; // Your approach
  results?: string; // The outcome/impact
  process?: string[]; // Steps taken
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Helper type for filtering
export interface ProjectFilter {
  category?: ProjectCategory;
  technologies?: string[];
  tags?: string[];
  featured?: boolean;
  status?: ProjectStatus;
  year?: number;
}