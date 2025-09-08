// src/components/about/AboutProcess.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface AboutProcessProps {
  locale?: 'en' | 'he';
}

export default function AboutProcess({ locale = 'en' }: AboutProcessProps) {
  const isRTL = locale === 'he';
  const [] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '50%', '100%']);

  const content = {
    en: {
      label: '04 — How We Work',
      title: 'The ITAYOST',
      titleOutline: 'Method',
      subtitle: 'From chaos to clarity in 4 phases',
      phases: [
        {
          phase: 'Discovery',
          number: '01',
          duration: 'Week 1-2',
          title: 'Deep Dive & Dream',
          description: 'We don\'t just listen to your requirements. We become your business, understand your users, and dream bigger than you thought possible.',
          activities: [
            { name: 'Research', icon: '🔍', description: 'Market analysis & competitor deep dive' },
            { name: 'Strategy', icon: '🎯', description: 'Define goals & success metrics' },
            { name: 'Ideation', icon: '💡', description: 'Brainstorm without boundaries' },
            { name: 'Concept', icon: '✨', description: 'Create the impossible' }
          ],
          deliverables: ['Project Brief', 'User Personas', 'Technical Spec', 'Creative Direction'],
          color: 'from-cyan-400/20 to-transparent'
        },
        {
          phase: 'Design',
          number: '02',
          duration: 'Week 3-6',
          title: 'Pixels & Prototypes',
          description: 'This is where magic happens. We transform abstract ideas into tangible experiences that make people say "wow".',
          activities: [
            { name: 'Wireframes', icon: '📐', description: 'Structure the experience' },
            { name: 'Visual Design', icon: '🎨', description: 'Create stunning interfaces' },
            { name: 'Prototypes', icon: '🔄', description: 'Make it interactive' },
            { name: 'Motion', icon: '✨', description: 'Add life to every pixel' }
          ],
          deliverables: ['Design System', 'Interactive Prototypes', 'Animation Specs', 'Style Guide'],
          color: 'from-cyan-500/20 to-transparent'
        },
        {
          phase: 'Development',
          number: '03',
          duration: 'Week 7-12',
          title: 'Code & Coffee',
          description: 'We write code like poetry - beautiful, efficient, and meaningful. Every function has purpose, every line has impact.',
          activities: [
            { name: 'Architecture', icon: '🏗️', description: 'Build solid foundations' },
            { name: 'Coding', icon: '💻', description: 'Transform designs to reality' },
            { name: 'Integration', icon: '🔗', description: 'Connect all the pieces' },
            { name: 'Testing', icon: '🧪', description: 'Break it until it\'s unbreakable' }
          ],
          deliverables: ['Production Code', 'API Documentation', 'Test Suite', 'Performance Report'],
          color: 'from-cyan-600/20 to-transparent'
        },
        {
          phase: 'Launch',
          number: '04',
          duration: 'Week 13+',
          title: 'Blast Off & Beyond',
          description: 'Launch isn\'t the end, it\'s the beginning. We deploy, optimize, and celebrate, then keep making it better.',
          activities: [
            { name: 'Deployment', icon: '🚀', description: 'Go live with confidence' },
            { name: 'Optimization', icon: '⚡', description: 'Speed up everything' },
            { name: 'Training', icon: '📚', description: 'Empower your team' },
            { name: 'Support', icon: '🛡️', description: '24/7 peace of mind' }
          ],
          deliverables: ['Live Product', 'Documentation', 'Training Materials', 'Support Plan'],
          color: 'from-cyan-700/20 to-transparent'
        }
      ]
    },
    he: {
      // Hebrew translations would go here
      label: '04 — איך אנחנו עובדים',
      title: 'שיטת',
      titleOutline: 'ITAYOST',
      subtitle: 'מכאוס לבהירות ב-4 שלבים',
      phases: [] // Would include Hebrew translations
    }
  };

  const text = content[locale];

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-gray-900 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
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
          <h2 className="mt-4 mb-4">
            <span className="text-white font-bold text-5xl md:text-6xl">
              {text.title}{' '}
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
          <p className="text-gray-400 text-lg">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-800">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-cyan-600"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Phases */}
          <div className="space-y-32">
            {text.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Phase Number Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-900 border-2 border-cyan-400 rounded-full flex items-center justify-center z-20">
                  <span className="text-cyan-400 font-bold text-xl">
                    {phase.number}
                  </span>
                </div>

                {/* Content Card */}
                <motion.div
                  className={`bg-black/50 backdrop-blur-sm border border-gray-800 p-8 ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-bold text-white">
                      {phase.phase}
                    </h3>
                    <span className="text-cyan-400 text-sm">
                      {phase.duration}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-xl text-cyan-400 mb-3">
                    {phase.title}
                  </h4>
                  <p className="text-gray-400 mb-6">
                    {phase.description}
                  </p>

                  {/* Activities Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {phase.activities.map((activity, idx) => (
                      <motion.div
                        key={idx}
                        className="group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{activity.icon}</span>
                          <span className="text-white font-medium text-sm">
                            {activity.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                          {activity.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Deliverables:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables.map((deliverable, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-800 text-gray-400"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${phase.color} pointer-events-none`}
                  />
                </motion.div>

                {/* Visual Element */}
                <div className={`relative h-64 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="w-48 h-48 border-2 border-cyan-400/20 rounded-full" />
                    <div className="absolute w-32 h-32 border-2 border-cyan-400/30 rounded-full" />
                    <div className="absolute w-16 h-16 border-2 border-cyan-400/40 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <p className="text-2xl text-gray-400 mb-8">
            Ready to start your journey with our proven process?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider text-sm hover:bg-cyan-400 hover:text-black transition-all"
          >
            Let&apos;s Talk Process
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}