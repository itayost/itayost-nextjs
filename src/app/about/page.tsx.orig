// src/app/about/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';

// Dynamic imports for About sections with no SSR for 3D components
const AboutHero = dynamic(
  () => import('@/components/sections/about/AboutHero'),
  { 
    ssr: false,
    loading: () => <SectionLoader />
  }
);

const AboutStory = dynamic(
  () => import('@/components/sections/about/AboutStory'),
  { ssr: true }
);

const AboutValues = dynamic(
  () => import('@/components/sections/about/AboutValues'),
  { ssr: true }
);

const AboutTeam = dynamic(
  () => import('@/components/sections/about/AboutTeam'),
  { ssr: true }
);

const AboutProcess = dynamic(
  () => import('@/components/sections/about/AboutProcess'),
  { ssr: true }
);

const AboutAchievements = dynamic(
  () => import('@/components/sections/about/AboutAchievements'),
  { ssr: true }
);

const AboutCulture = dynamic(
  () => import('@/components/sections/about/AboutCulture'),
  { ssr: true }
);

const AboutCTA = dynamic(
  () => import('@/components/sections/about/AboutCTA'),
  { ssr: true }
);

// Section Loader Component
function SectionLoader() {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-4 mx-auto" />
        <p className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

// Loading Screen Component
function AboutLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
    >
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-4 mx-auto" />
        <p className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse">
          Loading Story
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const [locale, setLocale] = useState<'en' | 'he'>('en');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect user locale
    if (typeof window !== 'undefined') {
      const browserLocale = navigator.language.toLowerCase();
      if (browserLocale.includes('he')) {
        setLocale('he');
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render dynamic content until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <main className="bg-black min-h-screen">
        <SectionLoader />
        <Footer locale={locale} />
      </main>
    );
  }

  return (
    <>
      <AnimatePresence>
        {loading && <AboutLoadingScreen />}
      </AnimatePresence>

      <main className="bg-black min-h-screen">
        
        {/* Hero Section */}
        <AboutHero locale={locale} />
        
        {/* Story Section */}
        <AboutStory locale={locale} />
        
        {/* Values Section */}
        <AboutValues locale={locale} />
        
        {/* Team Section */}
        <AboutTeam locale={locale} />
        
        {/* Process Section */}
        <AboutProcess locale={locale} />
        
        {/* Achievements Section */}
        <AboutAchievements locale={locale} />
        
        {/* Culture Section */}
        <AboutCulture locale={locale} />
        
        {/* CTA Section */}
        <AboutCTA locale={locale} />
        
        <Footer locale={locale} />
      </main>
    </>
  );
}