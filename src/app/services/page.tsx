// src/app/service/page.tsx
import { Metadata } from 'next';

// Import all  service components
import ServiceHero from '@/components/sections/services/ServiceHero';
import ServiceGrid from '@/components/sections/services/ServiceGrid';
import CTA from '@/components/sections/CTA';
import ServicesPricing from '@/components/sections/services/ServicesPricing';
//import ServiceSkills from '@/components/sections/service/serviceSkills';
//import serviceProcess from '@/components/sections/service/serviceProcess';
//import serviceValues from '@/components/sections/service/serviceValues';
//import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'אודות | איתי אוסטרייכר - Full Stack Developer',
  description: 'מפתח Full Stack עם תשוקה לטכנולוגיה ויצירה דיגיטלית',
  // ... rest of metadata
};

export default function servicePage() {
  return (
    <>
      {/* Hero Section - Introduction */}
      <ServiceHero />
      
      {/* Bio Section - Personal Story */}
      <ServiceGrid />

      <ServicesPricing />

      {/* CTA Section - Contact Prompt */}
      <CTA />
    </>
  );
}