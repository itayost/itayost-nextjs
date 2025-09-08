// Fixed CTA Section Component
'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CTASectionProperties {
  readonly locale?: 'en' | 'he';
}

// Generate stable particle positions based on index
function getParticlePosition(index: number) {
  // Use deterministic calculations instead of Math.random()
  const positions = [
    { left: 20, top: 30 },
    { left: 80, top: 20 },
    { left: 10, top: 70 },
    { left: 90, top: 60 },
    { left: 50, top: 10 },
    { left: 30, top: 90 },
    { left: 70, top: 40 },
    { left: 40, top: 80 },
    { left: 60, top: 50 },
    { left: 25, top: 25 },
  ];
  
  return positions[index] || { left: 50, top: 50 };
}

export default function CTASection({ locale = 'en' }: CTASectionProps) {
  const isRTL = locale === 'he';
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  
  // Only show particles after mount to avoid hydration issues
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <motion.section 
      className="py-32 bg-black relative overflow-hidden" 
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ scale, opacity }}
    >
      {/* Complex animated background */}
      <div className="absolute inset-0">
        {/* Rotating mesh */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div 
            className="w-full h-full opacity-20"
            style={{
              background: 'conic-gradient(from 0deg, transparent, #00D9FF, transparent, #00B8D4, transparent)',
            }}
          />
        </motion.div>
        
        {/* Floating particles - only render after mount */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => {
              const pos = getParticlePosition(i);
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + (i * 0.2),
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto px-8 md:px-16 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="mb-8 font-bold leading-[0.9] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontFamily: isRTL ? 'Heebo, Rubik, -apple-system, sans-serif' : 'Space Grotesk, Inter, sans-serif'
            }}
          >
            {isRTL ? 'מוכנים' : 'Ready to'}{' '}
            <span 
              style={{
                WebkitTextStroke: '2px #00D9FF',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {isRTL ? 'להתחיל?' : 'Start?'}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {isRTL 
              ? 'בואו נהפוך את הרעיון שלכם למציאות דיגיטלית. אנחנו כאן כדי לעזור לכם לבנות משהו מדהים.'
              : "Let's transform your idea into digital reality. We're here to help you build something amazing."
            }
          </p>
          
          <div className={`flex gap-6 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.button 
              className="px-8 py-4 bg-cyan-500 text-black font-medium transition-all duration-300 hover:bg-cyan-400"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #00D9FF 0%, #00B8D4 100%)'
              }}
            >
              {isRTL ? 'התחל פרויקט' : 'Start Project'}
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 border border-cyan-500 text-cyan-400 font-medium transition-all duration-300 hover:bg-cyan-500/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRTL ? 'קבע פגישה' : 'Schedule Call'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}