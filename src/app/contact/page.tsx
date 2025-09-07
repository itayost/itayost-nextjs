// src/app/contact/page.tsx
'use client';

import ContactHero from '@/components/sections/contact/ContactHero';
import ContactMethods from '@/components/sections/contact/ContactMethods';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactFAQ from '@/components/sections/contact/ContactFAQ';
import CTASection from '@/components/sections/CTA';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      
      <ContactMethods />
      
      <ContactForm />
      
      <ContactFAQ />
      
      <CTASection
        title="מוכנים להתחיל?"
        description="אנחנו כאן כדי להפוך את הרעיון שלכם למציאות דיגיטלית"
        variant="default"
        primaryButton={{
          text: "התקשרו עכשיו",
          href: "tel:054-499-4417"
        }}
        secondaryButton={{
          text: "שלחו WhatsApp",
          href: "https://wa.me/972544994417"
        }}
      />
    </>
  );
}
