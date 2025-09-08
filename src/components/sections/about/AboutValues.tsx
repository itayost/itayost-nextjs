// src/components/about/AboutValues.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface AboutValuesProps {
  locale?: 'en' | 'he';
}

export default function AboutValues({ locale = 'en' }: AboutValuesProps) {
  const isRTL = locale === 'he';
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  const content = {
    en: {
      label: '02 — Core Values',
      title: 'Principles That',
      titleOutline: 'Define Us',
      subtitle: 'These aren\'t just words on a wall. They\'re the code we live by.',
      values: [
        {
          number: '001',
          title: 'Obsessive Craftsmanship',
          description: 'We spend hours perfecting animations that last milliseconds. Because details matter when you\'re building the extraordinary.',
          metric: '∞',
          metricLabel: 'Iterations',
          examples: [
            'Rewrote a component 47 times for perfect animation',
            'Spent 3 days on a 200ms transition',
            'Custom-built every single interaction'
          ]
        },
        {
          number: '002',
          title: 'Radical Innovation',
          description: 'If it\'s been done before, we\'re not interested. We push boundaries, break conventions, and redefine what\'s possible.',
          metric: '0%',
          metricLabel: 'Ordinary',
          examples: [
            'First to implement WebGL in e-commerce',
            'Created impossible layouts that actually work',
            'Built experiences that shouldn\'t exist'
          ]
        },
        {
          number: '003',
          title: 'Human-First Technology',
          description: 'Behind every line of code is a human experience. We build for people, not browsers.',
          metric: '100%',
          metricLabel: 'Empathy',
          examples: [
            'Accessibility is not optional',
            'Performance for everyone, not just fiber users',
            'Experiences that spark emotion'
          ]
        },
        {
          number: '004',
          title: 'Sustainable Speed',
          description: 'Fast doesn\'t mean rushed. We deliver at the speed of excellence, ensuring every project is built to last.',
          metric: '<50ms',
          metricLabel: 'Load Time',
          examples: [
            'Code that scales without breaking',
            'Documentation that actually helps',
            'Solutions that age like wine'
          ]
        }
      ]
    },
    he: {
      label: '02 — ערכי ליבה',
      title: 'עקרונות',
      titleOutline: 'שמגדירים אותנו',
      subtitle: 'אלו לא סתם מילים על הקיר. זה הקוד שאנחנו חיים לפיו.',
      // ... Hebrew translations
      values: [] // Would include Hebrew translations
    }
  };

  const text = content[locale];

  return (
    <section 
      className="py-32 bg-gray-900 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 217, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-cyan-400/10"
            style={{
              left: `${25 * i}%`,
              top: `${20 + i * 15}%`,
              transform: 'rotate(45deg)'
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [45, 50, 45],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="px-8 md:px-16 lg:px-32 max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium">
            {text.label}
          </span>
          <h2 className="mt-4 mb-8">
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {text.values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setActiveValue(index)}
              onMouseLeave={() => setActiveValue(null)}
            >
              {/* Background Number */}
              <div 
                className="absolute -top-8 -left-4 text-8xl font-bold text-gray-800/20 select-none"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                {value.number}
              </div>

              {/* Content Card */}
              <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 p-8 transition-all duration-300 hover:border-cyan-400/50">
                {/* Metric Display */}
                <div 
                  className="absolute top-8 right-8 text-center cursor-pointer"
                  onMouseEnter={() => setHoveredMetric(index)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    {value.metric}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">
                    {value.metricLabel}
                  </div>
                  
                  {/* Metric Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/20 blur-xl -z-10"
                    animate={{
                      scale: hoveredMetric === index ? 1.5 : 1,
                      opacity: hoveredMetric === index ? 0.3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 pr-24">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {value.description}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  {value.examples.map((example, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: activeValue === index ? 1 : 0,
                        x: activeValue === index ? 0 : -20
                      }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                      <span className="text-sm text-gray-500">
                        {example}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Border Animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400 pointer-events-none"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: activeValue === index ? 0.2 : 0,
                    scale: activeValue === index ? 1 : 1.05
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <p className="text-2xl text-gray-400 font-light">
            We don&apos;t just follow these values.
            <span className="text-cyan-400 font-bold"> We breathe them.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}