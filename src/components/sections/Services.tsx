// src/components/sections/Services.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ServicesProps {
  locale?: 'en' | 'he';
}

export default function Services({ locale = 'en' }: ServicesProps) {
  const isRTL = locale === 'he';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const content = {
    en: {
      label: '01 — Services',
      title1: 'What We',
      title2: 'Create', // Outline text
      services: [
        {
          title: 'Web Development',
          description: 'Cutting-edge web applications built with modern frameworks and optimized for performance.',
          features: ['React/Next.js', 'TypeScript', 'WebGL/Three.js', 'Performance Optimization']
        },
        {
          title: 'Mobile Applications',
          description: 'Native and cross-platform mobile solutions that deliver exceptional user experiences.',
          features: ['React Native', 'iOS/Android', 'Offline First', 'Push Notifications']
        },
        {
          title: 'UI/UX Design',
          description: 'Stunning interfaces that balance aesthetics with functionality and user needs.',
          features: ['Design Systems', 'Prototyping', 'User Research', 'Motion Design']
        },
        {
          title: 'Digital Strategy',
          description: 'Strategic consulting to transform your digital presence and drive growth.',
          features: ['Technical Architecture', 'Product Strategy', 'Digital Transformation', 'Analytics']
        }
      ]
    },
    he: {
      label: '01 — שירותים',
      title1: 'מה אנחנו',
      title2: 'יוצרים', // Outline text
      services: [
        {
          title: 'פיתוח אתרים',
          description: 'אפליקציות ווב חדשניות הבנויות עם טכנולוגיות מודרניות ומותאמות לביצועים מיטביים.',
          features: ['React/Next.js', 'TypeScript', 'WebGL/Three.js', 'אופטימיזציית ביצועים']
        },
        {
          title: 'אפליקציות מובייל',
          description: 'פתרונות מובייל נייטיבים וחוצי פלטפורמות המספקים חוויות משתמש יוצאות דופן.',
          features: ['React Native', 'iOS/Android', 'Offline First', 'התראות Push']
        },
        {
          title: 'עיצוב UI/UX',
          description: 'ממשקים מדהימים המאזנים בין אסתטיקה לפונקציונליות וצרכי המשתמש.',
          features: ['מערכות עיצוב', 'פרוטוטייפינג', 'מחקר משתמשים', 'עיצוב תנועה']
        },
        {
          title: 'אסטרטגיה דיגיטלית',
          description: 'ייעוץ אסטרטגי לשינוי הנוכחות הדיגיטלית שלך והנעת צמיחה.',
          features: ['ארכיטקטורה טכנית', 'אסטרטגיית מוצר', 'טרנספורמציה דיגיטלית', 'אנליטיקה']
        }
      ]
    }
  };

  const text = content[locale];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }
  };

  return (
    <section 
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Subtle background mesh pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.span 
            variants={itemVariants}
            className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium"
          >
            {text.label}
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className={`mt-4 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <span 
              className="text-white font-bold"
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Space Grotesk, Inter, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: isRTL ? '0' : '-0.03em',
                lineHeight: '1'
              }}
            >
              {text.title1}{' '}
            </span>
            <span 
              className="font-bold"
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Space Grotesk, Inter, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: isRTL ? '0' : '-0.03em',
                lineHeight: '1',
                WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              {text.title2}
            </span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {text.services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Service number */}
              <div 
                className="absolute -top-6 -left-2 text-8xl font-bold text-gray-900/50 select-none pointer-events-none"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                0{index + 1}
              </div>

              <div className="relative z-10">
                {/* Service Title */}
                <h3 
                  className="text-2xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-cyan-400"
                  style={{
                    fontFamily: isRTL 
                      ? 'Heebo, Rubik, -apple-system, sans-serif' 
                      : 'Inter, -apple-system, sans-serif'
                  }}
                >
                  {service.title}
                </h3>

                {/* Service Description */}
                <p 
                  className="text-gray-400 mb-6 leading-relaxed"
                  style={{
                    fontFamily: isRTL 
                      ? 'Heebo, Rubik, -apple-system, sans-serif' 
                      : 'Inter, -apple-system, sans-serif',
                    lineHeight: isRTL ? '1.7' : '1.6'
                  }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs uppercase tracking-wider text-cyan-400 border border-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/40"
                      style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Animated accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-transparent"
                  initial={{ width: '0%' }}
                  animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}