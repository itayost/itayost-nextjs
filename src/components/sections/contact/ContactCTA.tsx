// src/components/sections/contact/ContactCTA.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Zap, Star } from 'lucide-react';

interface ContactCTAProps {
  locale: 'en' | 'he';
}

export default function ContactCTA({ locale }: ContactCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const isRTL = locale === 'he';

  const content = {
    en: {
      title: 'Ready to',
      titleOutline: 'Start?',
      subtitle: "Let's build something amazing together!",
      primaryCTA: 'Call Now',
      secondaryCTA: 'Send WhatsApp',
      phone: '(+972 54-499-4417)',
      badges: [
        { icon: Star, text: 'Over 500 Happy Clients' },
        { icon: Zap, text: '2 Hour Response Time' },
        { icon: Star, text: '12 Month Warranty' }
      ]
    },
    he: {
      title: 'מוכנים',
      titleOutline: 'להתחיל?',
      subtitle: 'בואו נבנה יחד משהו מדהים!',
      primaryCTA: 'התקשרו עכשיו',
      secondaryCTA: 'שלחו WhatsApp',
      phone: '(054-499-4417)',
      badges: [
        { icon: Star, text: 'מעל 500 לקוחות מרוצים' },
        { icon: Zap, text: 'תגובה תוך 2 שעות' },
        { icon: Star, text: 'אחריות ל-12 חודשים' }
      ]
    }
  };

  const currentContent = content[locale];

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-black overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Rotating Grid */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, cyan 1px, transparent 1px), linear-gradient(-45deg, cyan 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
        </motion.div>

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 blur-3xl"
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 lg:px-24 text-center"
        style={{ scale, opacity }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="inline-flex mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative p-6 bg-black border border-cyan-400/40"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            >
              <Zap className="h-12 w-12 text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-display font-bold mb-6"
        >
          <span className="text-white">{currentContent.title} </span>
          <span className="text-outline">{currentContent.titleOutline}</span>
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          {currentContent.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 ${
            isRTL ? 'sm:flex-row-reverse' : ''
          }`}
        >
          <motion.a
            href="tel:+972544994417"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-cyan-400 text-black text-lg font-bold flex items-center gap-3 group hover:bg-cyan-300 transition-colors duration-300"
          >
            <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            {currentContent.primaryCTA}
            <span className="text-sm opacity-75">{currentContent.phone}</span>
          </motion.a>
          
          <motion.a
            href="https://wa.me/972544994417"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border border-cyan-400 text-cyan-400 text-lg font-bold flex items-center gap-3 group hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            {currentContent.secondaryCTA}
            <ArrowRight className={`h-5 w-5 transition-transform ${
              isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'
            }`} />
          </motion.a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`flex flex-wrap justify-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {currentContent.badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-black border border-cyan-400/20 hover:border-cyan-400/40 transition-colors duration-300"
              >
                <Icon className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-gray-300">{badge.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative inline-block">
            {/* Pulsing Rings */}
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="absolute inset-0 border border-cyan-400/20"
                animate={{
                  scale: [1, 1.5 + index * 0.3],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Infinity,
                }}
                style={{
                  width: 100,
                  height: 100,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
              />
            ))}
            
            {/* Center Diamond */}
            <div 
              className="w-24 h-24 border-2 border-cyan-400 bg-black flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            >
              <div className="w-3 h-3 bg-cyan-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}