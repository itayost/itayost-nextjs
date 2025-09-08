// src/components/portfolio/PortfolioCTA.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface PortfolioCTAProps {
  locale?: 'en' | 'he';
}

export default function PortfolioCTA({ locale = 'en' }: PortfolioCTAProps) {
  const isRTL = locale === 'he';
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const content = {
    en: {
      preTitle: 'Have a Project in Mind?',
      title: "Let's Build",
      titleOutline: 'Together',
      subtitle: 'Your vision deserves the best execution. We\'re ready to make it happen.',
      buttons: {
        primary: 'Start Your Project',
        secondary: 'Schedule a Call'
      },
      features: [
        { icon: '⚡', text: 'Fast Turnaround' },
        { icon: '🎯', text: 'Result-Driven' },
        { icon: '🚀', text: 'Future-Proof' },
        { icon: '💯', text: 'Satisfaction Guaranteed' }
      ],
      footer: 'Join 100+ companies that transformed their digital presence with us'
    },
    he: {
      preTitle: 'יש לכם פרויקט בראש?',
      title: 'בואו נבנה',
      titleOutline: 'ביחד',
      subtitle: 'החזון שלכם ראוי לביצוע הטוב ביותר. אנחנו מוכנים להגשים אותו.',
      buttons: {
        primary: 'התחילו את הפרויקט',
        secondary: 'קבעו שיחה'
      },
      features: [
        { icon: '⚡', text: 'זמן תגובה מהיר' },
        { icon: '🎯', text: 'מונע תוצאות' },
        { icon: '🚀', text: 'מוכן לעתיד' },
        { icon: '💯', text: 'שביעות רצון מובטחת' }
      ],
      footer: 'הצטרפו ל-100+ חברות ששינו את הנוכחות הדיגיטלית שלהן איתנו'
    }
  };

  const text = content[locale];

  return (
    <section 
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-conic from-cyan-400/10 via-transparent to-cyan-400/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              style={{
                top: `${20 * (i + 1)}%`,
                width: '200%',
                left: '-50%'
              }}
              animate={{
                x: ['-50%', '0%'],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto relative z-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Pre-title */}
          <p className="text-gray-400 text-lg mb-8">
            {text.preTitle}
          </p>

          {/* Title */}
          <h2 className="mb-8">
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
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-12">
            {text.subtitle}
          </p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {text.features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3"
              >
                <span className="text-3xl">{feature.icon}</span>
                <span className="text-gray-400">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/contact">
              <motion.button
                onMouseEnter={() => setHoveredButton('primary')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-4 bg-cyan-400 text-black font-bold uppercase tracking-wider text-sm overflow-hidden group"
              >
                <span className="relative z-10">{text.buttons.primary}</span>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-cyan-500"
                  initial={{ x: '-100%' }}
                  animate={{ x: hoveredButton === 'primary' ? 0 : '-100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
            
            <Link href="/contact">
              <motion.button
                onMouseEnter={() => setHoveredButton('secondary')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-4 border border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider text-sm overflow-hidden group"
              >
                <span className="relative z-10">{text.buttons.secondary}</span>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredButton === 'secondary' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'center' }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm"
          >
            {text.footer}
          </motion.p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner Accents */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-400/20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-400/20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-400/20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.75
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-400/20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.25
            }}
          />
        </div>
      </div>
    </section>
  );
}