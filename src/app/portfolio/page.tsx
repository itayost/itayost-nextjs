// src/app/portfolio/page.tsx
import { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'תיק עבודות | ItayOst - פרויקטים מובילים',
  description: 'צפו בפרויקטים המרשימים שלנו - אתרים, אפליקציות ומערכות ניהול מתקדמות',
  keywords: 'תיק עבודות, פרויקטים, אתרים, אפליקציות, עיצוב, פיתוח',
  openGraph: {
    title: 'תיק העבודות שלנו | ItayOst',
    description: 'פרויקטים מובילים בפיתוח דיגיטלי',
    type: 'website',
    locale: 'he_IL',
    url: 'https://itayost.com/portfolio',
    siteName: 'ItayOst',
    images: [
      {
        url: '/og-portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'ItayOst Portfolio',
      },
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}