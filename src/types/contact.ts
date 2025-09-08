// src/types/contact.ts

// Use a different name to avoid conflict
export type ContactMethodType = 'email' | 'phone' | 'whatsapp' | 'form';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  message: string;
  preferredContact?: ContactMethodType;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: {
    en: string;
    he: string;
  };
  hours: {
    en: string;
    he: string;
  };
}

// If you need the interface, rename it
export interface ContactMethodDetails {
  type: ContactMethodType;
  value: string;
  label: {
    en: string;
    he: string;
  };
  icon?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}
