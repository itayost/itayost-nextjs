// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// Dynamic imports for sections
const Hero = dynamic(
  () => import('@/components/sections/Hero'),
  { 
    ssr: false,
    loading: () => <SectionLoader title="Initializing" />
  }
);

const Services = dynamic(
  () => import('@/components/sections/Services'),
  { 
    ssr: true,
    loading: () => <SectionLoader title="Loading Services" />
  }
);

const Work = dynamic(
  () => import('@/components/sections/Work'),
  { 
    ssr: true,
    loading: () => <SectionLoader title="Loading Projects" />
  }
);

const About = dynamic(
  () => import('@/components/sections/About'),
  { 
    ssr: true,
    loading: () => <SectionLoader title="Loading Story" />
  }
);

const Contact = dynamic(
  () => import('@/components/sections/Contact'),
  { 
    ssr: true,
    loading: () => <SectionLoader title="Loading Contact" />
  }
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

// Initial Loading Screen
function InitialLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
    >
      <div className="relative">
        {/* Generative loading animation */}
        <div className="absolute inset-0 -inset-x-20 -inset-y-20">
          <motion.div
            className="w-40 h-40 border-2 border-cyan-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold tracking-tight text-white mb-4"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            ITAYOST
          </motion.h1>
          
          {/* Progress bar */}
          <div className="w-48 h-px bg-gray-800 mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState<'en' | 'he'>('en');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Detect user locale
  useEffect(() => {
    const browserLocale = navigator.language.toLowerCase();
    if (browserLocale.includes('he')) {
      setLocale('he');
    }
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <InitialLoadingScreen />}
      </AnimatePresence>

      <main className="bg-black min-h-screen">
        {/* Navigation */}
        <Navigation locale={locale} />
        
        {/* Hero Section */}
        <Hero locale={locale} />
        
        {/* Services Section */}
        <Services locale={locale} />
        
        {/* Work Section */}
        <Work locale={locale} />
        
        {/* About Section */}
        <About locale={locale} />
        
        {/* Contact Section */}
        <Contact locale={locale} />
        
        {/* Footer */}
        <Footer locale={locale} />
      </main>

      {/* Language Toggle (for testing) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div 
          className="fixed bottom-4 left-4 z-[200] bg-gray-900/90 backdrop-blur border border-cyan-500/20 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <label className="text-cyan-400 text-xs uppercase block mb-2">Language</label>
          <div className="flex gap-2">
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
        </motion.div>
      )}
    </>
  );
}