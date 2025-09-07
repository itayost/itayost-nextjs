// src/app/services/page.tsx
import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'שירותי פיתוח דיגיטליים | ItayOst - פתרונות מקצה לקצה',
  description: 'שירותי פיתוח מתקדמים: אתרים, אפליקציות, חנויות אונליין ופתרונות דיגיטליים מותאמים אישית. ייעוץ חינם ותמחור שקוף.',
  keywords: [
    'פיתוח אתרים',
    'אפליקציות מובייל',
    'חנויות אונליין',
    'עיצוב UI/UX',
    'קידום אתרים',
    'תחזוקת אתרים',
    'פתרונות דיגיטליים'
  ],
  openGraph: {
    title: 'שירותי פיתוח דיגיטליים מקצועיים | ItayOst',
    description: 'פתרונות דיגיטליים מותאמים אישית עם טכנולוגיות מתקדמות וביצועים מעולים',
    type: 'website',
    locale: 'he_IL',
    url: 'https://itayost.com/services',
    siteName: 'ItayOst',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'שירותי פיתוח דיגיטליים | ItayOst',
    description: 'פתרונות דיגיטליים מקצועיים מקצה לקצה',
  },
  alternates: {
    canonical: 'https://itayost.com/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}