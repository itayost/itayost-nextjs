// src/app/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';

// Dynamic imports for Services sections with no SSR for 3D components
const ServicesHero = dynamic(
  () => import('@/components/sections/services/ServicesHero'),
  { 
    ssr: false,
    loading: () => <SectionLoader title="Initializing Services" />
  }
);

const ServiceGrid = dynamic(
  () => import('@/components/sections/services/ServiceGrid'),
  { 
    ssr: true,
    loading: () => <SectionLoader title="Loading Services" />
  }
);

const ServiceFeatures = dynamic(
  () => import('@/components/sections/services/ServiceFeatures'),
  { ssr: true }
);

const ServicesPricing = dynamic(
  () => import('@/components/sections/services/ServicesPricing'),
  { ssr: true }
);

const ServicesProcess = dynamic(
  () => import('@/components/sections/services/ServicesProcess'),
  { ssr: true }
);

const ServicesCTA = dynamic(
  () => import('@/components/sections/services/ServicesCTA'),
  { ssr: true }
);

// Section Loader Component
function SectionLoader({ title }: { title: string }) {
  return (
    <div className="h-96 bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="flex gap-2 justify-center mb-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse">
          {title}
        </p>
      </motion.div>
    </div>
  );
}

// Loading Screen Component
function ServicesLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
    >
      <div className="relative">
        {/* Animated service icons in orbit */}
        <div className="absolute inset-0 -inset-x-40 -inset-y-40">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 border border-cyan-400/30 rounded"
            animate={{ 
              rotate: 360,
              y: [0, -80, 0],
              x: [0, 40, 0, -40, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 border border-cyan-400/30 rounded-full"
            animate={{ 
              rotate: -360,
              y: [0, 80, 0],
              x: [0, -40, 0, 40, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 border border-cyan-400/30"
            animate={{ 
              rotate: 360,
              x: [0, -80, 0],
              y: [0, 40, 0, -40, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          />
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 border border-cyan-400/30"
            animate={{ 
              rotate: -360,
              x: [0, 80, 0],
              y: [0, -40, 0, 40, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <p className="text-cyan-400 text-sm uppercase tracking-wider mb-2">
            Loading
          </p>
          <h2 className="text-3xl font-bold text-white">
            <span className="text-outline">Services</span>
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [locale, setLocale] = useState<'en' | 'he'>('en');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

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
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Don't render dynamic content until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <main className="bg-black min-h-screen">
        <SectionLoader title="Loading Services" />
        <Footer locale={locale} />
      </main>
    );
  }

  return (
    <>
      <AnimatePresence>
        {loading && <ServicesLoadingScreen />}
      </AnimatePresence>

      <main className="bg-black min-h-screen">
        
        {/* Hero Section with 3D Scene */}
        <ServicesHero 
          locale={locale}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        
        {/* Service Grid Section */}
        <ServiceGrid 
          locale={locale}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        {/* Features Section */}
        <ServiceFeatures 
          locale={locale}
          selectedService={selectedService}
        />
        
        {/* Process Section */}
        <ServicesProcess locale={locale} />
        
        {/* Pricing Section */}
        <ServicesPricing locale={locale} />
        
        {/* CTA Section */}
        <ServicesCTA locale={locale} />
        
        <Footer locale={locale} />
      </main>

      {/* Development Tools */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div 
          className="fixed bottom-4 left-4 z-[200] bg-gray-900/90 backdrop-blur border border-cyan-500/20 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <label className="text-cyan-400 text-xs uppercase block mb-2">Dev Tools</label>
          
          {/* Language Toggle */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setLocale('en')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                locale === 'en' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('he')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                locale === 'he' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              עב
            </button>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode === 'overview' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode === 'detailed' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              Detailed
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}