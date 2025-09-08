// src/components/about/AboutStory.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface AboutStoryProps {
  locale?: 'en' | 'he';
}

export default function AboutStory({ locale = 'en' }: AboutStoryProps) {
  const isRTL = locale === 'he';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const content = {
    en: {
      label: '01 — The Origin Story',
      title: 'From Mad Dreams to',
      titleOutline: 'Digital Reality',
      chapters: [
        {
          year: '2017',
          title: 'The Spark',
          story: 'It started with a simple question: "What if websites could feel alive?" In a small Tel Aviv apartment, surrounded by energy drink cans and endless sketches, ITAYOST was born. We weren\'t satisfied with static pages and boring interfaces.',
          highlight: 'First line of code written at 3 AM',
          icon: '💡'
        },
        {
          year: '2019',
          title: 'The Breakthrough',
          story: 'Our first major client took a leap of faith. We delivered a 3D interactive experience that crashed their servers from traffic. It was beautiful chaos. We learned, adapted, and came back stronger.',
          highlight: 'First million-dollar project delivered',
          icon: '🚀'
        },
        {
          year: '2021',
          title: 'The Evolution',
          story: 'Pandemic? We called it an opportunity. While the world went remote, we went global. Our team grew from 4 to 20, spanning 7 countries. Distance made us stronger, not weaker.',
          highlight: 'Became a remote-first company',
          icon: '🌍'
        },
        {
          year: '2023',
          title: 'The Revolution',
          story: 'We were among the first to integrate AI into our design process. Not to replace creativity, but to amplify it. The results? Mind-blowing experiences delivered in half the time.',
          highlight: 'Pioneered AI-assisted design systems',
          icon: '🤖'
        },
        {
          year: '2025',
          title: 'The Present',
          story: 'Today, we\'re not just building websites. We\'re crafting digital ecosystems that breathe, think, and evolve. Every project is a chance to redefine what\'s possible.',
          highlight: 'Building the future, one pixel at a time',
          icon: '✨'
        }
      ],
      quote: {
        text: '"We don\'t just code. We craft experiences that make people feel something."',
        author: 'Itay Ostraich',
        role: 'Founder & CEO'
      }
    },
    he: {
      label: '01 — סיפור המקור',
      title: 'מחלומות מטורפים',
      titleOutline: 'למציאות דיגיטלית',
      chapters: [
        {
          year: '2017',
          title: 'הניצוץ',
          story: 'הכל התחיל עם שאלה פשוטה: "מה אם אתרים יכלו להרגיש חיים?" בדירה קטנה בתל אביב, מוקפים בפחיות משקאות אנרגיה וסקיצות אינסופיות, ITAYOST נולד.',
          highlight: 'שורת הקוד הראשונה נכתבה ב-3 לפנות בוקר',
          icon: '💡'
        },
        // ... Hebrew translations for other chapters
      ],
      quote: {
        text: '"אנחנו לא רק מקודדים. אנחנו יוצרים חוויות שגורמות לאנשים להרגיש משהו."',
        author: 'איתי אוסטרייך',
        role: 'מייסד ומנכ"ל'
      }
    }
  };

  const text = content[locale];

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
            style={{
              top: `${20 * (i + 1)}%`,
              width: '200%',
              left: '-50%'
            }}
            animate={{
              x: ['-50%', '0%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: i * 3,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <motion.div 
        className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto relative z-10"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium">
            {text.label}
          </span>
          <h2 className="mt-4 mb-16">
            <span className="text-white font-bold text-5xl md:text-6xl block mb-2">
              {text.title}
            </span>
            <span 
              className="font-bold text-5xl md:text-6xl"
              style={{
                WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {text.titleOutline}
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-800">
            <motion.div
              className="absolute top-0 left-0 w-full bg-cyan-400"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>

          {/* Chapters */}
          <div className="space-y-24">
            {text.chapters.map((chapter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-8"
                onMouseEnter={() => setHoveredChapter(index)}
                onMouseLeave={() => setHoveredChapter(null)}
              >
                {/* Year & Icon */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center relative z-10 border-2 border-gray-800 group-hover:border-cyan-400 transition-colors">
                      <span className="text-2xl">{chapter.icon}</span>
                    </div>
                    <div className="text-cyan-400 font-bold text-2xl">
                      {chapter.year}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-10 md:pl-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {chapter.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {chapter.story}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-400 text-sm font-medium">
                      {chapter.highlight}
                    </span>
                  </div>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-transparent"
                    initial={{ width: '0%' }}
                    animate={{ width: hoveredChapter === index ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-3xl md:text-4xl font-light text-white mb-8 relative">
              <span className="absolute -top-8 -left-4 text-6xl text-cyan-400/20">&quot;</span>
              {text.quote.text}
              <span className="absolute -bottom-8 -right-4 text-6xl text-cyan-400/20">&quot;</span>
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-cyan-400" />
              <div>
                <p className="text-cyan-400 font-bold">{text.quote.author}</p>
                <p className="text-gray-500 text-sm">{text.quote.role}</p>
              </div>
              <div className="w-12 h-px bg-cyan-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}