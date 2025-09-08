// src/components/sections/services/ServicesProcess.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ServicesProcessProps {
  locale: 'en' | 'he';
}

export default function ServicesProcess({ locale }: ServicesProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const isRTL = locale === 'he';

  const content = {
    en: {
      label: '03 — Our Process',
      title: 'How We',
      titleOutline: 'Work',
      subtitle: 'A streamlined approach from concept to deployment',
      steps: [
        {
          number: '01',
          title: 'Discovery',
          description: 'Understanding your vision, goals, and requirements through detailed consultation'
        },
        {
          number: '02',
          title: 'Design',
          description: 'Creating wireframes and prototypes with generative design principles'
        },
        {
          number: '03',
          title: 'Development',
          description: 'Building scalable solutions using cutting-edge technologies'
        },
        {
          number: '04',
          title: 'Testing',
          description: 'Rigorous quality assurance and performance optimization'
        },
        {
          number: '05',
          title: 'Deployment',
          description: 'Seamless launch with continuous monitoring and support'
        }
      ]
    },
    he: {
      label: '03 — התהליך שלנו',
      title: 'איך אנחנו',
      titleOutline: 'עובדים',
      subtitle: 'גישה יעילה מהרעיון ועד להשקה',
      steps: [
        {
          number: '01',
          title: 'גילוי',
          description: 'הבנת החזון, המטרות והדרישות שלכם דרך ייעוץ מפורט'
        },
        {
          number: '02',
          title: 'עיצוב',
          description: 'יצירת סקיצות ואבות טיפוס עם עקרונות עיצוב גנרטיביים'
        },
        {
          number: '03',
          title: 'פיתוח',
          description: 'בניית פתרונות ניתנים להרחבה באמצעות טכנולוגיות מתקדמות'
        },
        {
          number: '04',
          title: 'בדיקות',
          description: 'בקרת איכות קפדנית ואופטימיזציה של ביצועים'
        },
        {
          number: '05',
          title: 'השקה',
          description: 'השקה חלקה עם ניטור ותמיכה מתמשכים'
        }
      ]
    }
  };

  const currentContent = content[locale];

  return (
    <section 
      ref={containerRef}
      id="process"
      className="relative py-32 bg-gray-900"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            #00D9FF 35px,
            #00D9FF 36px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-20 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <span className="text-cyan-400 text-sm uppercase tracking-wider">
            {currentContent.label}
          </span>
          <h2 className="text-display mt-4">
            <span className="text-white">{currentContent.title} </span>
            <span className="text-outline">{currentContent.titleOutline}</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl">
            {currentContent.subtitle}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className={`absolute top-0 bottom-0 w-px bg-gray-800 ${
            isRTL ? 'right-12' : 'left-12'
          } hidden md:block`}>
            <motion.div
              className="w-full bg-cyan-400"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          {currentContent.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-start gap-8 mb-16 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Step Number */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-24 h-24 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-black border border-cyan-400/20 transform rotate-45" />
                <span className="relative text-cyan-400 text-xl font-bold">
                  {step.number}
                </span>
              </motion.div>

              {/* Step Content */}
              <div className="flex-1 pt-6">
                <motion.h3
                  whileHover={{ x: isRTL ? -10 : 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-2xl font-bold text-white mb-3 cursor-pointer"
                >
                  {step.title}
                </motion.h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 h-px bg-gray-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    transition={{ 
                      duration: 2, 
                      delay: 0.5 + index * 0.1,
                      ease: "easeInOut"
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 mb-6">
            {locale === 'en' 
              ? 'Ready to start your project?' 
              : 'מוכנים להתחיל את הפרויקט שלכם?'}
          </p>
          <button className="px-8 py-4 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 uppercase tracking-wider">
            {locale === 'en' ? 'Get Started' : 'בואו נתחיל'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}