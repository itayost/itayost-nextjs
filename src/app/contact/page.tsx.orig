// src/app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';

// Dynamic imports for Contact sections with no SSR for 3D components
const ContactHero = dynamic(
  () => import('@/components/sections/contact/ContactHero'),
  { 
    ssr: false,
    loading: () => <SectionLoader title="Initializing Contact" />
  }
);

const ContactStats = dynamic(
  () => import('@/components/sections/contact/ContactStats'),
  { ssr: true }
);

const ContactTestimonials = dynamic(
  () => import('@/components/sections/contact/ContactTestimonials'),
  { ssr: true }
);

const ContactLocation = dynamic(
  () => import('@/components/sections/contact/ContactLocation'),
  { ssr: true }
);

const ContactCTA = dynamic(
  () => import('@/components/sections/contact/ContactCTA'),
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
function ContactLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
    >
      <div className="relative">
        {/* Network animation */}
        <div className="absolute inset-0 -inset-x-40 -inset-y-40">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-cyan-400/40"
              animate={{
                x: [0, 100, 100, 0, 0],
                y: [0, 0, 100, 100, 0],
                scale: [1, 1.5, 1, 1.5, 1],
                opacity: [0.3, 1, 0.3, 1, 0.3]
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity
              }}
              style={{
                left: `${25 + (i % 2) * 50}%`,
                top: `${25 + Math.floor(i / 2) * 50}%`
              }}
            />
          ))}
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.line
              x1="25%" y1="25%" x2="75%" y2="25%"
              stroke="#00D9FF"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.line
              x1="75%" y1="25%" x2="75%" y2="75%"
              stroke="#00D9FF"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
            <motion.line
              x1="75%" y1="75%" x2="25%" y2="75%"
              stroke="#00D9FF"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
            />
            <motion.line
              x1="25%" y1="75%" x2="25%" y2="25%"
              stroke="#00D9FF"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
            />
          </svg>
        </div>
        
        <div className="relative z-10 text-center">
          <p className="text-cyan-400 text-sm uppercase tracking-wider mb-2">
            Connecting
          </p>
          <h2 className="text-3xl font-bold text-white">
            <span className="text-outline">Contact</span>
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [locale, setLocale] = useState<'en' | 'he'>('en');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formView, setFormView] = useState<'contact' | 'consultation'>('contact');

  useEffect(() => {
    setMounted(true);
    
    // Detect user locale
    if (typeof window !== 'undefined') {
      const browserLocale = navigator.language.toLowerCase();
      if (browserLocale.includes('he')) {
        setLocale('he');
      }

      // Check for consultation hash
      if (window.location.hash === '#consultation') {
        setFormView('consultation');
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
        <SectionLoader title="Loading Contact" />
        <Footer locale={locale} />
      </main>
    );
  }

  return (
    <>
      <AnimatePresence>
        {loading && <ContactLoadingScreen />}
      </AnimatePresence>

      <main className="bg-black min-h-screen">
        <SectionLoader title="Loading Contact" />

        {/* Hero Section with 3D Scene */}
        <ContactHero locale={locale} />

        {/* Stats Section */}
        <ContactStats locale={locale} />
        
        {/* Testimonials Section */}
        <ContactTestimonials locale={locale} />
        
        {/* Location Section */}
        <ContactLocation locale={locale} />
        
        {/* CTA Section */}
        <ContactCTA locale={locale} />
        
        <Footer locale={locale} />
      </main>

      {/* Development Tools */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div 
          className="fixed bottom-4 left-4 z-[200] bg-gray-900/90 backdrop-blur border border-cyan-500/20 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <label className="text-cyan-400 text-xs uppercase block mb-2">Dev Tools</label>
          
          {/* Language Toggle */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setLocale('en')}
              className={`px-3 py-1 text-xs transition-colors ${
                locale === 'en' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('he')}
              className={`px-3 py-1 text-xs transition-colors ${
                locale === 'he' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              עב
            </button>
          </div>
          
          {/* Form View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setFormView('contact')}
              className={`px-3 py-1 text-xs transition-colors ${
                formView === 'contact' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setFormView('consultation')}
              className={`px-3 py-1 text-xs transition-colors ${
                formView === 'consultation' 
                  ? 'bg-cyan-500 text-black' 
                  : 'bg-gray-800 text-gray-400 hover:text-cyan-400'
              }`}
            >
              Consult
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}