// src/components/sections/services/ServicesHero.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of 3D scene
const ServicesScene = dynamic(
  () => import('@/components/three/ServicesScene'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse opacity-40">
          Initializing Services...
        </div>
      </div>
    )
  }
);

interface ServicesHeroProps {
  locale: 'en' | 'he';
  selectedService?: string | null;
  setSelectedService?: (service: string | null) => void;
}

export default function ServicesHero({ locale, selectedService, setSelectedService }: ServicesHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const isRTL = locale === 'he';

  const content = {
    en: {
      label: '01 — What We Do',
      title1: 'Digital',
      title2: 'Services',
      title3: 'Excellence',
      subtitle: 'End-to-end solutions powered by cutting-edge technology and generative design',
      scroll: 'Scroll to explore'
    },
    he: {
      label: '01 — מה אנחנו עושים',
      title1: 'שירותים',
      title2: 'דיגיטליים',
      title3: 'מתקדמים',
      subtitle: 'פתרונות מקצה לקצה המופעלים על ידי טכנולוגיה חדשנית ועיצוב גנרטיבי',
      scroll: 'גלול לחקור'
    }
  };

  const currentContent = content[locale];

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen bg-black overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* 3D Scene Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <ServicesScene />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24"
        style={{ y }}
      >
        <div className={`max-w-7xl mx-auto w-full ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Section Label */}
          <motion.span
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block text-cyan-400 text-sm uppercase tracking-wider mb-8"
          >
            {currentContent.label}
          </motion.span>

          {/* Main Title */}
          <motion.h1 
            className="text-mega font-bold leading-[0.9] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span 
              className="block text-white"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentContent.title1}
            </motion.span>
            <motion.span 
              className="block text-outline"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {currentContent.title2}
            </motion.span>
            <motion.span 
              className="block text-white"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {currentContent.title3}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12"
          >
            {currentContent.subtitle}
          </motion.p>

          {/* Service Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {[
              { id: 'web', label: locale === 'en' ? 'Web Development' : 'פיתוח אתרים' },
              { id: 'mobile', label: locale === 'en' ? 'Mobile Apps' : 'אפליקציות' },
              { id: 'design', label: locale === 'en' ? 'UI/UX Design' : 'עיצוב' },
              { id: 'cloud', label: locale === 'en' ? 'Cloud Solutions' : 'פתרונות ענן' }
            ].map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService?.(service.id)}
                className={`
                  px-6 py-3 border border-cyan-400/20 rounded-none
                  text-sm uppercase tracking-wider
                  transition-all duration-300
                  ${selectedService === service.id 
                    ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400' 
                    : 'hover:border-cyan-400/40 hover:bg-cyan-400/5 text-gray-400 hover:text-cyan-400'
                  }
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {service.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider text-gray-500">
            {currentContent.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Side Navigation Dots */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className={`fixed top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 ${
          isRTL ? 'left-8' : 'right-8'
        }`}
      >
        {['hero', 'grid', 'features', 'process', 'pricing'].map((section, index) => (
          <motion.button
            key={section}
            onClick={() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`
              w-2 h-2 rounded-full border border-cyan-400/40
              transition-all duration-300
              ${index === 0 ? 'bg-cyan-400' : 'group-hover:bg-cyan-400/50'}
            `} />
            <span className={`
              absolute ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2
              text-xs uppercase tracking-wider text-gray-500
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              whitespace-nowrap
            `}>
              {section}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}