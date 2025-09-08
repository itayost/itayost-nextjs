// src/components/about/AboutAchievements.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface AboutAchievementsProps {
  locale?: 'en' | 'he';
}

export default function AboutAchievements({ locale = 'en' }: AboutAchievementsProps) {
  const isRTL = locale === 'he';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      label: '05 — Track Record',
      title: 'Numbers That',
      titleOutline: 'Matter',
      subtitle: 'Data doesn\'t lie. Neither do happy clients.',
      stats: [
        { 
          number: 127, 
          suffix: '+', 
          label: 'Projects Launched',
          description: 'Each one better than the last',
          icon: '🚀'
        },
        { 
          number: 98, 
          suffix: '%', 
          label: 'Client Satisfaction',
          description: 'The other 2% became friends',
          icon: '😊'
        },
        { 
          number: 3.2, 
          suffix: 's', 
          label: 'Average Load Time',
          description: 'Speed is our religion',
          icon: '⚡'
        },
        { 
          number: 47, 
          suffix: '', 
          label: 'Awards Won',
          description: 'But who\'s counting?',
          icon: '🏆'
        },
        { 
          number: 24, 
          suffix: '/7', 
          label: 'Support Available',
          description: 'We never sleep (much)',
          icon: '🛡️'
        },
        { 
          number: 0, 
          suffix: '', 
          label: 'Unhappy Clients',
          description: 'Our proudest achievement',
          icon: '💯'
        }
      ],
      milestones: [
        { year: '2017', achievement: 'Founded ITAYOST', impact: 'The journey begins' },
        { year: '2018', achievement: 'First International Client', impact: 'Went global' },
        { year: '2019', achievement: '$1M Revenue Milestone', impact: 'Proved the model' },
        { year: '2020', achievement: 'Remote-First Transition', impact: 'Ahead of the curve' },
        { year: '2021', achievement: 'Team Grew to 20+', impact: 'Quality over quantity' },
        { year: '2022', achievement: 'Launched Design System', impact: 'Scaled excellence' },
        { year: '2023', achievement: 'AI Integration Pioneer', impact: 'Future-proofed' },
        { year: '2024', achievement: 'Best Agency Award', impact: 'Industry recognition' },
        { year: '2025', achievement: 'Building Tomorrow', impact: 'Just getting started' }
      ]
    },
    he: {
      // Hebrew translations would go here
      label: '05 — רקורד הישגים',
      title: 'מספרים',
      titleOutline: 'שמדברים',
      subtitle: 'נתונים לא משקרים. גם לא לקוחות מרוצים.',
      stats: [],
      milestones: []
    }
  };

  const text = content[locale];

  // Observe when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => {
            // Use deterministic positioning based on index
            const positions = [
              { left: '10%', top: '15%' },
              { left: '70%', top: '20%' },
              { left: '20%', top: '60%' },
              { left: '80%', top: '70%' },
              { left: '40%', top: '30%' },
              { left: '60%', top: '80%' },
            ];
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-cyan-400/5"
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                  left: positions[i].left,
                  top: positions[i].top,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {text.stats.map((stat, index) => (
            <StatCard 
              key={index} 
              stat={stat} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </div>

        {/* Milestones Timeline */}
        <div className="relative">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Our Journey in Milestones
          </motion.h3>

          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-800" />

          {/* Milestones */}
          <div className="space-y-12">
            {text.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Milestone Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full z-10" />

                {/* Milestone Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-4">
                    <div className="flex items-center gap-4 justify-between">
                      <div>
                        <p className="text-cyan-400 font-bold">{milestone.year}</p>
                        <h4 className="text-white font-bold">{milestone.achievement}</h4>
                        <p className="text-gray-500 text-sm">{milestone.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Stat Card Component
function StatCard({ stat, index, isVisible }: any) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = stat.number / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(increment * currentStep, stat.number));
      } else {
        clearInterval(timer);
        setCount(stat.number);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [isVisible, stat.number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-8 text-center transition-all duration-300 hover:border-cyan-400/50">
        {/* Icon */}
        <div className="text-4xl mb-4">{stat.icon}</div>
        
        {/* Number */}
        <div className="text-5xl font-bold text-cyan-400 mb-2">
          {typeof stat.number === 'number' ? count.toFixed(stat.number % 1 !== 0 ? 1 : 0) : stat.number}
          <span className="text-3xl">{stat.suffix}</span>
        </div>
        
        {/* Label */}
        <h4 className="text-white font-bold mb-2">{stat.label}</h4>
        
        {/* Description */}
        <p className="text-gray-500 text-sm">{stat.description}</p>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  );
}