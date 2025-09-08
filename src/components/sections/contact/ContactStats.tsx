// src/components/sections/contact/ContactStats.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Users, Clock, CheckCircle } from 'lucide-react';

interface ContactStatsProps {
  locale: 'en' | 'he';
}

export default function ContactStats({ locale }: ContactStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const isRTL = locale === 'he';

  const stats = {
    en: [
      { 
        icon: Clock, 
        value: '2', 
        suffix: 'Hours', 
        label: 'Average Response Time',
        color: 'from-cyan-400 to-cyan-500'
      },
      { 
        icon: Users, 
        value: '500', 
        suffix: '+', 
        label: 'Happy Clients',
        color: 'from-cyan-500 to-blue-500'
      },
      { 
        icon: CheckCircle, 
        value: '98', 
        suffix: '%', 
        label: 'Client Satisfaction',
        color: 'from-blue-500 to-cyan-400'
      },
      { 
        icon: Zap, 
        value: '24/7', 
        suffix: '', 
        label: 'Technical Support',
        color: 'from-cyan-400 to-blue-400'
      }
    ],
    he: [
      { 
        icon: Clock, 
        value: '2', 
        suffix: 'שעות', 
        label: 'זמן תגובה ממוצע',
        color: 'from-cyan-400 to-cyan-500'
      },
      { 
        icon: Users, 
        value: '500', 
        suffix: '+', 
        label: 'לקוחות מרוצים',
        color: 'from-cyan-500 to-blue-500'
      },
      { 
        icon: CheckCircle, 
        value: '98', 
        suffix: '%', 
        label: 'שביעות רצון',
        color: 'from-blue-500 to-cyan-400'
      },
      { 
        icon: Zap, 
        value: '24/7', 
        suffix: '', 
        label: 'תמיכה טכנית',
        color: 'from-cyan-400 to-blue-400'
      }
    ]
  };

  const currentStats = stats[locale];

  return (
    <section 
      ref={containerRef}
      className="relative py-20 bg-gray-900 border-y border-cyan-400/10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24"
        style={{ opacity }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {currentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} blur-xl opacity-30`} />
                    
                    {/* Icon Box */}
                    <div className="relative p-4 border border-cyan-400/20 bg-black group-hover:border-cyan-400/40 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-cyan-400" />
                    </div>
                  </div>
                </motion.div>

                {/* Value */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="mb-2"
                >
                  <span className="text-4xl lg:text-5xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-2xl lg:text-3xl text-cyan-400">
                    {stat.suffix}
                  </span>
                </motion.div>

                {/* Label */}
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 h-px bg-gray-800 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ 
                      duration: 1.5, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}