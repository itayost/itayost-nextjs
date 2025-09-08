// Src/components/sections/Hero.tsx
'use client';

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';

// Dynamic 3D Scene import
const ThreeScene = dynamic(
  () => import('../three/ThreeScene'),
  { ssr: false }
);

interface HeroProps {
  locale?: 'en' | 'he';
  sceneType?: 'fabric' | 'minimal' | 'auto';
}

export default function Hero({ locale = 'en' }: HeroProps) {
  const isRTL = locale === 'he';
  const [isLoaded, setIsLoaded] = useState(false);
  const [] = useState(() => Date.now() + Math.random());

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const content = {
    en: {
      line1: 'BUILDING',
      line2: 'DIGITAL',  // This will have outline effect
      line3: 'FUTURES',
      subtitle: 'Where code meets creativity. We craft innovative digital experiences that push boundaries and redefine possibilities.',
      cta: 'Start Project',
      scroll: 'Scroll',
    },
    he: {
      line1: 'בונים',
      line2: 'עתידים',  // This will have outline effect
      line3: 'דיגיטליים',
      subtitle: 'המקום בו קוד פוגש יצירתיות. אנו יוצרים חוויות דיגיטליות חדשניות שפורצות גבולות ומגדירות מחדש אפשרויות.',
      cta: 'התחל פרויקט',
      scroll: 'גלול',
    }
  };

  const text = content[locale];

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0] // Cubic bezier for smooth animation
      }
    })
  };

  return (
    <section 
      className="relative h-screen bg-black overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Generative 3D Mesh Background */}
      <div className="absolute inset-0 opacity-60">
        <ThreeScene />
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-32">
          <div className="w-full max-w-[1400px]">
            {/* Massive Typography */}
            <motion.h1 
              className={`${isRTL ? 'text-right' : 'text-left'}`}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Line 1 */}
              <motion.span
                custom={0}
                variants={titleVariants}
                className="block font-bold text-white leading-[0.85]"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Space Grotesk, Inter, sans-serif',
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  letterSpacing: isRTL ? '0' : '-0.04em'
                }}
              >
                {text.line1}
              </motion.span>

              {/* Line 2 - With Outline Effect */}
              <motion.span
                custom={1}
                variants={titleVariants}
                className="block font-bold leading-[0.85]"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Space Grotesk, Inter, sans-serif',
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  letterSpacing: isRTL ? '0' : '-0.04em',
                  WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                {text.line2}
              </motion.span>

              {/* Line 3 */}
              <motion.span
                custom={2}
                variants={titleVariants}
                className="block font-bold text-white leading-[0.85]"
                style={{
                  fontFamily: isRTL 
                    ? 'Heebo, Rubik, -apple-system, sans-serif' 
                    : 'Space Grotesk, Inter, sans-serif',
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  letterSpacing: isRTL ? '0' : '-0.04em'
                }}
              >
                {text.line3}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`mt-8 max-w-lg text-gray-300 text-lg leading-relaxed ${
                isRTL ? 'text-right ml-auto' : 'text-left'
              }`}
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Inter, -apple-system, sans-serif',
                lineHeight: isRTL ? '1.7' : '1.6'
              }}
            >
              {text.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className={`mt-12 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-cyan-400/30 text-white font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400/50"
                style={{
                  fontFamily: 'Inter, -apple-system, sans-serif'
                }}
              >
                {text.cta}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="pb-8 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
            {text.scroll}
          </span>
          <div className="relative w-[1px] h-[60px] bg-gradient-to-b from-gray-500 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-5 bg-cyan-400"
              animate={{ y: ["-20px", "80px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle animated accent lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          animate={{ opacity: [0, 1, 0], y: [0, 100, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          animate={{ opacity: [0, 1, 0], y: [0, -100, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>
    </section>
  );
}