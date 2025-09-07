// src/types/contact.ts

export type ContactMethod = 'email' | 'phone' | 'whatsapp' | 'form';
export type ServiceType = 'web-development' | 'mobile-app' | 'management-system' | 'e-commerce' | 'ui-ux' | 'consulting' | 'other';
export type ProjectBudget = 'under-10k' | '10k-25k' | '25k-50k' | '50k-100k' | 'above-100k' | 'not-sure';
export type ProjectTimeline = 'asap' | '1-month' | '2-3-months' | '3-6-months' | 'above-6-months' | 'flexible';

export interface ContactFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  
  // Project Information
  serviceType: ServiceType;
  projectDescription: string;
  budget?: ProjectBudget;
  timeline?: ProjectTimeline;
  
  // Additional
  referralSource?: string;
  message?: string;
  newsletter?: boolean;
  agreeToTerms: boolean;
}

export interface ContactInfo {
  type: 'phone' | 'email' | 'address' | 'hours';
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
  description?: string;
}

export interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  link: string;
  color: string;
  available?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    friday: string;
    saturday: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  image?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
  estimatedResponse?: string;
}