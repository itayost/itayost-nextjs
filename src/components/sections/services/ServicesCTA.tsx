// src/components/sections/services/ServicesCTA.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface ServicesCTAProps {
  locale: 'en' | 'he';
}

export default function ServicesCTA({ locale }: ServicesCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  const isRTL = locale === 'he';

  const content = {
    en: {
      label: '05 — Get Started',
      title: "Let's Build",
      titleOutline: 'Together',
      subtitle: 'Transform your vision into reality with our expert team',
      primaryCTA: 'Start Your Project',
      secondaryCTA: 'Schedule Consultation',
      features: [
        'Free Initial Consultation',
        'Custom Solutions',
        '24/7 Support',
        'Flexible Pricing'
      ]
    },
    he: {
      label: '05 — בואו נתחיל',
      title: 'בואו נבנה',
      titleOutline: 'ביחד',
      subtitle: 'הפכו את החזון שלכם למציאות עם הצוות המומחה שלנו',
      primaryCTA: 'התחל פרויקט',
      secondaryCTA: 'קבע פגישת ייעוץ',
      features: [
        'ייעוץ ראשוני חינם',
        'פתרונות מותאמים אישית',
        'תמיכה 24/7',
        'תמחור גמיש'
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-400/30 to-transparent blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-20"
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-cyan-400/30 to-transparent blur-3xl" />
        </motion.div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 lg:px-24 text-center"
        style={{ scale, opacity }}
      >
        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block text-cyan-400 text-sm uppercase tracking-wider mb-8"
        >
          {currentContent.label}
        </motion.span>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-display font-bold mb-6"
        >
          <span className="block text-white">{currentContent.title}</span>
          <span className="block text-outline">{currentContent.titleOutline}</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          {currentContent.subtitle}
        </motion.p>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {currentContent.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <div className="w-2 h-2 bg-cyan-400 transform rotate-45" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className={`flex flex-col sm:flex-row gap-4 justify-center ${
            isRTL ? 'sm:flex-row-reverse' : ''
          }`}
        >
          {/* Primary CTA */}
          <Link href="/contact">
            <motion.button
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-cyan-400 text-black font-bold uppercase tracking-wider overflow-hidden group"
            >
              <span className="relative z-10">{currentContent.primaryCTA}</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? 0 : "-100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/contact#consultation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-cyan-400 text-cyan-400 uppercase tracking-wider hover:bg-cyan-400/10 transition-colors duration-300"
            >
              {currentContent.secondaryCTA}
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="relative">
            {/* Animated Rings */}
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="absolute inset-0 border border-cyan-400/20 rounded-full"
                animate={{
                  scale: [1, 1.5 + index * 0.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: 60,
                  height: 60,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
            
            {/* Center Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-cyan-400/40 flex items-center justify-center"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            >
              <div className="w-2 h-2 bg-cyan-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}