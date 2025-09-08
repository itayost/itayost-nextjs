// src/components/about/AboutCTA.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface AboutCTAProps {
  locale?: 'en' | 'he';
}

export default function AboutCTA({ locale = 'en' }: AboutCTAProps) {
  const isRTL = locale === 'he';
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const content = {
    en: {
      preTitle: 'Now You Know Our Story',
      title: 'Ready to Write',
      titleOutline: 'Yours?',
      subtitle: 'Let\'s create something extraordinary together. Your vision, our expertise, infinite possibilities.',
      cta: {
        primary: 'Start Your Project',
        secondary: 'View Our Work'
      },
      options: [
        { emoji: '💬', label: 'Free Consultation', time: '30 min call' },
        { emoji: '📧', label: 'hello@itayost.com', time: 'Quick response' },
        { emoji: '🚀', label: 'Project in 2 weeks', time: 'Fast delivery' }
      ]
    },
    he: {
      preTitle: 'עכשיו אתם מכירים את הסיפור שלנו',
      title: 'מוכנים לכתוב את',
      titleOutline: 'שלכם?',
      subtitle: 'בואו ניצור משהו יוצא דופן ביחד. החזון שלכם, המומחיות שלנו, אפשרויות אינסופיות.',
      cta: {
        primary: 'התחילו את הפרויקט',
        secondary: 'צפו בעבודות שלנו'
      },
      options: [
        { emoji: '💬', label: 'ייעוץ חינם', time: 'שיחה של 30 דקות' },
        { emoji: '📧', label: 'hello@itayost.com', time: 'תגובה מהירה' },
        { emoji: '🚀', label: 'פרויקט תוך שבועיים', time: 'משלוח מהיר' }
      ]
    }
  };

  const text = content[locale];

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <motion.div 
        className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto relative z-10 text-center"
        style={{ scale, opacity }}
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg mb-8"
        >
          {text.preTitle}
        </motion.p>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span 
            className="block text-white font-bold mb-2"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9'
            }}
          >
            {text.title}
          </span>
          <span 
            className="block font-bold"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9',
              WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {text.titleOutline}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-xl max-w-3xl mx-auto mb-12"
        >
          {text.subtitle}
        </motion.p>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {text.options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-3xl">{option.emoji}</span>
              <div className="text-left">
                <p className="text-white font-medium">{option.label}</p>
                <p className="text-gray-500 text-sm">{option.time}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-cyan-400 text-black font-bold uppercase tracking-wider text-sm hover:bg-cyan-500 transition-colors"
            >
              {text.cta.primary}
            </motion.button>
          </Link>
          
          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider text-sm hover:bg-cyan-400 hover:text-black transition-all"
            >
              {text.cta.secondary}
            </motion.button>
          </Link>
        </motion.div>

        {/* Animated lines */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>
      </motion.div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-20 relative z-10"
      >
        <p className="text-gray-500 text-sm">
          PS: We&apos;re excited already. Are you? 
          <span className="text-cyan-400"> Let&apos;s build something amazing.</span>
        </p>
      </motion.div>
    </section>
  );
}