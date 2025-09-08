// src/components/portfolio/PortfolioHero.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic 3D Scene
const PortfolioScene = dynamic(
  () => import('../../three/PortfolioScene'),
  { ssr: false }
);

interface PortfolioHeroProps {
  locale?: 'en' | 'he';
}

export default function PortfolioHero({ locale = 'en' }: PortfolioHeroProps) {
  const isRTL = locale === 'he';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const content = {
    en: {
      label: 'Our Portfolio',
      title1: 'Digital',
      title2: 'Masterpieces', // Outline
      subtitle: 'Every project is a story of innovation, creativity, and relentless pursuit of perfection.',
      stats: [
        { number: '127+', label: 'Projects' },
        { number: '52', label: 'Awards' },
        { number: '98%', label: 'Happy Clients' }
      ],
      scroll: 'Explore Our Work'
    },
    he: {
      label: 'התיק שלנו',
      title1: 'יצירות מופת',
      title2: 'דיגיטליות', // Outline
      subtitle: 'כל פרויקט הוא סיפור של חדשנות, יצירתיות ומרדף בלתי פוסק אחר שלמות.',
      stats: [
        { number: '127+', label: 'פרויקטים' },
        { number: '52', label: 'פרסים' },
        { number: '98%', label: 'לקוחות מרוצים' }
      ],
      scroll: 'גלו את העבודות שלנו'
    }
  };

  const text = content[locale];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-50">
        <PortfolioScene mousePosition={mousePosition} />
      </div>

      {/* Animated Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y }}
      >
        <div 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
            style={{
              left: `${20 * (i + 1)}%`,
              height: '100%'
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-8 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Label */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-cyan-400 text-sm uppercase tracking-[0.3em] font-medium mb-8"
        >
          {text.label}
        </motion.span>
        
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.span 
            className="block text-white font-bold mb-2"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9',
              transform: `translateX(${mousePosition.x * 10}px)`
            }}
          >
            {text.title1}
          </motion.span>
          
          <motion.span 
            className="block font-bold"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9',
              WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
              WebkitTextFillColor: 'transparent',
              transform: `translateX(${-mousePosition.x * 10}px)`
            }}
          >
            {text.title2}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto"
        >
          {text.subtitle}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex justify-center gap-12"
        >
          {text.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-cyan-400">
                {stat.number}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
              {text.scroll}
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}