// src/app/portfolio/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';

// Dynamic imports for Portfolio sections
const PortfolioHero = dynamic(
  () => import('@/components/sections/portfolio/PortfolioHero'),
  { 
    ssr: false,
    loading: () => <SectionLoader />
  }
);

const PortfolioFilters = dynamic(
  () => import('@/components/sections/portfolio/PortfolioFilters'),
  { ssr: true }
);

const PortfolioGrid = dynamic(
  () => import('@/components/sections/portfolio/PortfolioGrid'),
  { ssr: true }
);

const PortfolioStats = dynamic(
  () => import('@/components/sections/portfolio/PortfolioStats'),
  { ssr: true }
);

const PortfolioCTA = dynamic(
  () => import('@/components/sections/portfolio/PortfolioCTA'),
  { ssr: true }
);

// Section Loader Component
function SectionLoader() {
  return (
    <div className="h-96 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-4 mx-auto" />
        <p className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse">
          Loading Projects
        </p>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [locale, setLocale] = useState<'en' | 'he'>('en');
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setMounted(true);
    
    // Detect user locale
    if (typeof window !== 'undefined') {
      const browserLocale = navigator.language.toLowerCase();
      if (browserLocale.includes('he')) {
        setLocale('he');
      }
    }
  }, []);

  // Don't render dynamic content until mounted
  if (!mounted) {
    return (
      <main className="bg-black min-h-screen">
        <SectionLoader />
        <Footer locale={locale} />
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      
      {/* Hero Section */}
      <PortfolioHero locale={locale} />
      
      {/* Filters Section */}
      <PortfolioFilters 
        locale={locale}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {/* Portfolio Grid */}
      <PortfolioGrid 
        locale={locale}
        selectedCategory={selectedCategory}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        viewMode={viewMode}
      />
      
      {/* Stats Section */}
      <PortfolioStats locale={locale} />
      
      {/* CTA Section */}
      <PortfolioCTA locale={locale} />
      
      <Footer locale={locale} />
    </main>
  );
}