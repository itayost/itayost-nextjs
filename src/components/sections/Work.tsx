// src/components/sections/Work.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface WorkProps {
  locale?: 'en' | 'he';
}

export default function Work({ locale = 'en' }: WorkProps) {
  const isRTL = locale === 'he';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const content = {
    en: {
      label: '02 — Selected Work',
      title1: 'Featured',
      title2: 'Projects', // Outline text
      projects: [
        {
          title: 'E-Commerce Platform',
          category: 'Web Development',
          year: '2024',
          description: 'Next-gen shopping experience with AI recommendations'
        },
        {
          title: 'Financial Dashboard',
          category: 'UI/UX Design',
          year: '2024',
          description: 'Real-time analytics for trading platforms'
        },
        {
          title: 'Healthcare App',
          category: 'Mobile Development',
          year: '2023',
          description: 'Telemedicine solution connecting patients and doctors'
        },
        {
          title: 'AI Analytics Tool',
          category: 'Web Development',
          year: '2023',
          description: 'Machine learning powered business intelligence'
        }
      ]
    },
    he: {
      label: '02 — עבודות נבחרות',
      title1: 'פרויקטים',
      title2: 'מובחרים', // Outline text
      projects: [
        {
          title: 'פלטפורמת מסחר אלקטרוני',
          category: 'פיתוח ווב',
          year: '2024',
          description: 'חוויית קנייה מהדור הבא עם המלצות AI'
        },
        {
          title: 'לוח בקרה פיננסי',
          category: 'עיצוב UI/UX',
          year: '2024',
          description: 'אנליטיקה בזמן אמת לפלטפורמות מסחר'
        },
        {
          title: 'אפליקציית בריאות',
          category: 'פיתוח מובייל',
          year: '2023',
          description: 'פתרון רפואה מרחוק המחבר בין מטופלים לרופאים'
        },
        {
          title: 'כלי אנליטיקה AI',
          category: 'פיתוח ווב',
          year: '2023',
          description: 'בינה עסקית מונעת למידת מכונה'
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
        staggerChildren: 0.15,
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
      className="py-32 bg-gray-900 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 217, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
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
                textStroke: '2px rgba(0, 217, 255, 0.5)',
                color: 'transparent'
              }}
            >
              {text.title2}
            </span>
          </motion.h2>
        </motion.div>

        {/* Projects Grid - Asymmetric Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-12 gap-8"
        >
          {text.projects.map((project, index) => {
            // Asymmetric grid spans
            const spans = [
              'col-span-12 md:col-span-7',
              'col-span-12 md:col-span-5',
              'col-span-12 md:col-span-5',
              'col-span-12 md:col-span-7'
            ];
            
            const heights = ['h-96', 'h-80', 'h-80', 'h-96'];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${spans[index]} group relative overflow-hidden cursor-pointer`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`relative ${heights[index]} bg-black border border-gray-700/50 overflow-hidden`}>
                  {/* Project Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                    {/* Generative pattern for each project */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(${45 + index * 30}deg, transparent 40%, rgba(0, 217, 255, 0.1) 50%, transparent 60%)`,
                        backgroundSize: '200% 200%',
                        animation: hoveredIndex === index ? 'gradient 3s ease infinite' : 'none'
                      }}
                    />
                  </div>

                  {/* Project Number */}
                  <div 
                    className="absolute top-8 left-8 text-8xl font-bold text-gray-800/30 select-none"
                    style={{ 
                      fontFamily: 'Space Grotesk, Inter, sans-serif',
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    0{index + 1}
                  </div>

                  {/* Project Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="space-y-2">
                      {/* Category & Year */}
                      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-cyan-400 text-xs uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400"
                        style={{
                          fontFamily: isRTL 
                            ? 'Heebo, Rubik, -apple-system, sans-serif' 
                            : 'Inter, -apple-system, sans-serif'
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p 
                        className="text-gray-400 text-sm leading-relaxed"
                        style={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-cyan-400"
                      initial={{ width: '0%' }}
                      animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}