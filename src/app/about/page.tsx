// src/app/about/page.tsx
import { Metadata } from 'next';

// Import all  About components
import AboutHero from '@/components/sections/about/AboutHero';
import AboutBio from '@/components/sections/about/AboutBio';
import AboutSkills from '@/components/sections/about/AboutSkills';
import AboutProcess from '@/components/sections/about/AboutProcess';
import AboutValues from '@/components/sections/about/AboutValues';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'אודות | איתי אוסטרייכר - Full Stack Developer',
  description: 'מפתח Full Stack עם תשוקה לטכנולוגיה ויצירה דיגיטלית',
  // ... rest of metadata
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Introduction */}
      <AboutHero />
      
      {/* Bio Section - Personal Story */}
      <AboutBio />
      
      {/* Skills Section - Technical Expertise */}
      <AboutSkills />
      
      {/* Process Section - Work Methodology */}
      <AboutProcess />
      
      {/* Values Section - Core Principles */}
      <AboutValues />
      
      {/* CTA Section - Contact Prompt */}
      <CTA />
    </>
  );
}