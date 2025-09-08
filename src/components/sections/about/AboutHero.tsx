// src/components/about/AboutHero.tsx
"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamic 3D Scene
const DNAHelix = dynamic(
  () => import('../../three/DNAHelix'),
  { ssr: false }
);

interface AboutHeroProps {
  locale?: 'en' | 'he';
}

export default function AboutHero({ locale = 'en' }: AboutHeroProps) {
  const isRTL = locale === 'he';
  const particlesRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      label: 'About ITAYOST',
      title1: 'We Transform',
      title2: 'Ideas Into', // Outline
      title3: 'Digital Reality',
      subtitle: 'A collective of dreamers, builders, and digital architects crafting tomorrow\'s web experiences today.',
      scroll: 'Discover Our Journey'
    },
    he: {
      label: 'אודות ITAYOST',
      title1: 'אנחנו הופכים',
      title2: 'רעיונות', // Outline
      title3: 'למציאות דיגיטלית',
      subtitle: 'קולקטיב של חולמים, בונים ואדריכלים דיגיטליים היוצרים את חוויות הרשת של מחר כבר היום.',
      scroll: 'גלו את המסע שלנו'
    }
  };

  const text = content[locale];

  // Floating particles effect
  useEffect(() => {
    if (!particlesRef.current || typeof window === 'undefined') return;

    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${10 + Math.random() * 20}s linear infinite`;
      particlesRef.current.appendChild(particle);

      setTimeout(() => {
        if (particle && particle.parentNode) {
          particle.remove();
        }
      }, 30000);
    };

    // Only create particles on client side
    const interval = setInterval(createParticle, 2000);
    
    // Create initial particles with delay to ensure client-side only
    const timeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < 10; i++) {
      const timeout = setTimeout(createParticle, i * 200 + 100);
      timeouts.push(timeout);
    }

    return () => {
      clearInterval(interval);
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* 3D DNA Helix Background */}
      <div className="absolute inset-0 opacity-30">
        <DNAHelix />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-cyan-400 text-sm uppercase tracking-[0.3em] font-medium mb-8"
        >
          {text.label}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.span 
            className="block text-white font-bold mb-2"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9'
            }}
          >
            {text.title1}
          </motion.span>
          
          <motion.span 
            className="block font-bold my-4"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9',
              WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {text.title2}
          </motion.span>
          
          <motion.span 
            className="block text-white font-bold"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9'
            }}
          >
            {text.title3}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto"
          style={{
            fontFamily: isRTL 
              ? 'Heebo, Rubik, -apple-system, sans-serif' 
              : 'Inter, -apple-system, sans-serif'
          }}
        >
          {text.subtitle}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
              {text.scroll}
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent"
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}