// app/page.tsx - Homepage Assembly
import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Stats  from '@/components/sections/Stats';
import  CTA  from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'ItayOst - פיתוח דיגיטלי מתקדם | אתרים ואפליקציות',
  description: 'פתרונות תוכנה מותאמים אישית ברמה הגבוהה ביותר. פיתוח אתרים, אפליקציות, ומערכות עם טכנולוגיות מתקדמות ועיצוב מינימליסטי.',
  keywords: 'פיתוח אתרים, אפליקציות, React, Next.js, TypeScript, UI/UX',
  openGraph: {
    title: 'ItayOst - פיתוח דיגיטלי מתקדם',
    description: 'בונים את העתיד הדיגיטלי שלך',
    type: 'website',
    locale: 'he_IL',
    url: 'https://itayost.com',
    siteName: 'ItayOst',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ItayOst -  Bold Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ItayOst - פיתוח דיגיטלי מתקדם',
    description: 'בונים את העתיד הדיגיטלי שלך',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://itayost.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950">
      {/* Hero Section - Full viewport */}
      <Hero />
      
      {/* Services Section */}
      <Services />
      
      {/* Portfolio Section */}
      <Portfolio />
      
      {/* Stats Section */}
      <Stats />
      
      {/* CTA Section */}
      <CTA />
    </main>
  );
}
